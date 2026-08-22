import { neon } from "@neondatabase/serverless";
import {
    randomBytes,
    scryptSync,
    timingSafeEqual
} from "node:crypto";

const sql = neon(process.env.DATABASE_URL);


/* =========================================================
   PASSWORD HASHING
   ========================================================= */

function hashPassword(password) {

    const salt = randomBytes(16).toString("hex");

    const hash = scryptSync(
        password,
        salt,
        64
    ).toString("hex");

    return `${salt}:${hash}`;
}


/* =========================================================
   PASSWORD VERIFICATION
   ========================================================= */

function verifyPassword(password, storedPassword) {

    if (!storedPassword || !storedPassword.includes(":")) {
        return false;
    }

    const [salt, storedKey] =
        storedPassword.split(":");

    if (!salt || !storedKey) {
        return false;
    }

    try {

        const passwordKey = scryptSync(
            password,
            salt,
            64
        );

        const storedKeyBuffer =
            Buffer.from(storedKey, "hex");

        if (
            passwordKey.length !==
            storedKeyBuffer.length
        ) {
            return false;
        }

        return timingSafeEqual(
            passwordKey,
            storedKeyBuffer
        );

    } catch (error) {

        console.error(
            "Password verification error:",
            error
        );

        return false;
    }
}


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}


/* =========================================================
   API HANDLER
   ========================================================= */

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }


    try {

        const body =
            typeof req.body === "string"
                ? JSON.parse(req.body)
                : req.body || {};

        const action =
            String(body.action || "")
                .trim()
                .toLowerCase();

        const name =
            String(body.name || "").trim();

        const email =
            String(body.email || "")
                .trim()
                .toLowerCase();

        const password =
            String(body.password || "");


        /* =================================================
           BASIC VALIDATION
           ================================================= */

        if (!action) {

            return res.status(400).json({
                success: false,
                error: "Action is required"
            });
        }


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                error: "Email and password are required"
            });
        }


        if (!isValidEmail(email)) {

            return res.status(400).json({
                success: false,
                error: "Please enter a valid email address"
            });
        }


        /* =================================================
           SIGNUP
           ================================================= */

        if (action === "signup") {

            if (name.length < 2) {

                return res.status(400).json({
                    success: false,
                    error: "Please enter your full name"
                });
            }


            if (password.length < 8) {

                return res.status(400).json({
                    success: false,
                    error:
                        "Password must contain at least 8 characters"
                });
            }


            /* ---------------------------------------------
               CHECK EXISTING USER
               --------------------------------------------- */

            const existingUser = await sql`
                SELECT id
                FROM users
                WHERE email = ${email}
                LIMIT 1
            `;


            if (existingUser.length > 0) {

                return res.status(409).json({
                    success: false,
                    error:
                        "An account with this email already exists"
                });
            }


            /* ---------------------------------------------
               HASH PASSWORD
               --------------------------------------------- */

            const passwordHash =
                hashPassword(password);


            /* ---------------------------------------------
               CREATE USER
               --------------------------------------------- */

            const result = await sql`
                INSERT INTO users (
                    name,
                    email,
                    password_hash
                )
                VALUES (
                    ${name},
                    ${email},
                    ${passwordHash}
                )
                RETURNING
                    id,
                    name,
                    email,
                    created_at
            `;


            const newUser = result[0];


            return res.status(201).json({

                success: true,

                message:
                    "Account created successfully",

                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    createdAt: newUser.created_at
                }

            });
        }


        /* =================================================
           LOGIN
           ================================================= */

        if (action === "login") {

            const result = await sql`
                SELECT
                    id,
                    name,
                    email,
                    password_hash,
                    created_at
                FROM users
                WHERE email = ${email}
                LIMIT 1
            `;


            if (result.length === 0) {

                return res.status(401).json({
                    success: false,
                    error:
                        "Invalid email or password"
                });
            }


            const dbUser = result[0];


            /* ---------------------------------------------
               VERIFY PASSWORD
               --------------------------------------------- */

            const passwordCorrect =
                verifyPassword(
                    password,
                    dbUser.password_hash
                );


            if (!passwordCorrect) {

                return res.status(401).json({
                    success: false,
                    error:
                        "Invalid email or password"
                });
            }


            /* ---------------------------------------------
               LOGIN SUCCESS
               --------------------------------------------- */

            return res.status(200).json({

                success: true,

                message:
                    "Login successful",

                user: {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email,
                    createdAt: dbUser.created_at
                }

            });
        }


        /* =================================================
           UNKNOWN ACTION
           ================================================= */

        return res.status(400).json({
            success: false,
            error: "Invalid action"
        });


    } catch (error) {

        console.error(
            "AUTH API ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            error:
                "Server error. Please try again later."
        });
    }
          }
