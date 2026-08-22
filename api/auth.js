import { neon } from "@neondatabase/serverless";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const sql = neon(process.env.DATABASE_URL);

function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");

    return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
    if (!stored || !stored.includes(":")) {
        return false;
    }

    const [salt, key] = stored.split(":");

    if (!salt || !key) {
        return false;
    }

    try {
        const hash = scryptSync(password, salt, 64);
        const storedHash = Buffer.from(key, "hex");

        return (
            hash.length === storedHash.length &&
            timingSafeEqual(hash, storedHash)
        );
    } catch (error) {
        console.error("Password verification error:", error);
        return false;
    }
}

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const {
            action,
            name,
            email,
            password
        } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const cleanEmail =
            String(email).trim().toLowerCase();

        const cleanPassword =
            String(password);

        // =========================
        // SIGN UP
        // =========================

        if (action === "signup") {

            if (!name || String(name).trim().length < 2) {
                return res.status(400).json({
                    error: "Please enter your full name"
                });
            }

            if (cleanPassword.length < 8) {
                return res.status(400).json({
                    error: "Password must be at least 8 characters"
                });
            }

            const existing = await sql`
                SELECT id
                FROM users
                WHERE email = ${cleanEmail}
                LIMIT 1
            `;

            if (existing.length > 0) {
                return res.status(409).json({
                    error: "Email already registered"
                });
            }

            const passwordHash =
                hashPassword(cleanPassword);

            const result = await sql`
                INSERT INTO users (
                    name,
                    email,
                    password_hash
                )
                VALUES (
                    ${String(name).trim()},
                    ${cleanEmail},
                    ${passwordHash}
                )
                RETURNING id, name, email
            `;

            return res.status(201).json({
                success: true,
                user: result[0]
            });
        }

        // =========================
        // LOGIN
        // =========================

        if (action === "login") {

            const result = await sql`
                SELECT
                    id,
                    name,
                    email,
                    password_hash
                FROM users
                WHERE email = ${cleanEmail}
                LIMIT 1
            `;

            if (result.length === 0) {
                return res.status(401).json({
                    error: "Invalid email or password"
                });
            }

            const dbUser = result[0];

            const validPassword =
                verifyPassword(
                    cleanPassword,
                    dbUser.password_hash
                );

            if (!validPassword) {
                return res.status(401).json({
                    error: "Invalid email or password"
                });
            }

            return res.status(200).json({
                success: true,
                user: {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email
                }
            });
        }

        return res.status(400).json({
            error: "Invalid action"
        });

    } catch (error) {

        console.error("Auth API error:", error);

        return res.status(500).json({
            error: "Server error"
        });
    }
}
