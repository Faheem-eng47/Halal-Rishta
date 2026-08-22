import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const {
            action,
            userId,
            targetId
        } = req.body || {};

        const swiperId = Number(userId);
        const targetUserId = Number(targetId);

        if (!Number.isInteger(swiperId) ||
            !Number.isInteger(targetUserId)) {

            return res.status(400).json({
                error: "Valid user IDs are required"
            });
        }

        if (swiperId === targetUserId) {
            return res.status(400).json({
                error: "You cannot swipe on yourself"
            });
        }

        if (!["like", "pass", "superlike"].includes(action)) {
            return res.status(400).json({
                error: "Invalid swipe action"
            });
        }

        // Make sure both users exist
        const users = await sql`
            SELECT id
            FROM users
            WHERE id IN (${swiperId}, ${targetUserId})
        `;

        if (users.length !== 2) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Save or update swipe
        await sql`
            INSERT INTO swipes (
                swiper_id,
                target_id,
                action
            )
            VALUES (
                ${swiperId},
                ${targetUserId},
                ${action}
            )
            ON CONFLICT (swiper_id, target_id)
            DO UPDATE SET
                action = EXCLUDED.action,
                created_at = NOW()
        `;

        // Only likes can create a match
        if (action === "like" || action === "superlike") {

            const reciprocal = await sql`
                SELECT id
                FROM swipes
                WHERE swiper_id = ${targetUserId}
                  AND target_id = ${swiperId}
                  AND action IN ('like', 'superlike')
                LIMIT 1
            `;

            if (reciprocal.length > 0) {

                const userOne =
                    Math.min(swiperId, targetUserId);

                const userTwo =
                    Math.max(swiperId, targetUserId);

                const existingMatch = await sql`
                    SELECT id
                    FROM matches
                    WHERE user_one_id = ${userOne}
                      AND user_two_id = ${userTwo}
                    LIMIT 1
                `;

                if (existingMatch.length > 0) {

                    return res.status(200).json({
                        success: true,
                        action,
                        matched: true,
                        matchId: existingMatch[0].id
                    });
                }

                const match = await sql`
                    INSERT INTO matches (
                        user_one_id,
                        user_two_id
                    )
                    VALUES (
                        ${userOne},
                        ${userTwo}
                    )
                    RETURNING id, user_one_id, user_two_id, created_at
                `;

                return res.status(200).json({
                    success: true,
                    action,
                    matched: true,
                    match: match[0]
                });
            }
        }

        return res.status(200).json({
            success: true,
            action,
            matched: false
        });

    } catch (error) {

        console.error("Swipe API error:", error);

        return res.status(500).json({
            error: "Server error"
        });
    }
}
