import { neon } from "@neondatabase/serverless";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const sql = neon(process.env.DATABASE_URL);

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, key] = stored.split(":");

  if (!salt || !key) return false;

  const hash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(key, "hex");

  return (
    hash.length === storedHash.length &&
    timingSafeEqual(hash, storedHash)
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { action, name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // SIGNUP
    if (action === "signup") {
      if (!name || name.trim().length < 2) {
        return res.status(400).json({
          error: "Please enter your full name"
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          error: "Password must be at least 8 characters"
        });
      }

      const existing = await sql`
        SELECT id FROM users
        WHERE email = ${cleanEmail}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return res.status(409).json({
          error: "Email already registered"
        });
      }

      const passwordHash = hashPassword(password);

      const result = await sql`
        INSERT INTO users (name, email, password_hash)
        VALUES (${name.trim()}, ${cleanEmail}, ${passwordHash})
        RETURNING id, name, email
      `;

      return res.status(201).json({
        success: true,
        user: result[0]
      });
    }

    // LOGIN
    if (action === "login") {
      const result = await sql`
        SELECT id, name, email, password_hash
        FROM users
        WHERE email = ${cleanEmail}
        LIMIT 1
      `;

      if (result.length === 0) {
        return res.status(401).json({
          error: "Invalid email or password"
        });
      }

      const user = result[0];

      if (!verifyPassword(password, user.password_hash)) {
        return res.status(401).json({
          error: "Invalid email or password"
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }

    return res.status(400).json({
      error: "Invalid action"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error"
    });
  }
}
