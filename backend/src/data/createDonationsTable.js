import pool from "../config/db.js";

const createDonationsTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
        amount DECIMAL(15, 2) NOT NULL,
        donor_name VARCHAR(100),
        is_anonymous BOOLEAN DEFAULT FALSE,
        message TEXT,
        receipt_url TEXT,
        payment_method VARCHAR(50) DEFAULT 'manual',
        payment_status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
        await pool.query(queryText);
        console.log("✅ Donations table created or already exists.");
    } catch (error) {
        console.error("❌ Error creating donations table:", error.message);
        throw error;
    }
};

export default createDonationsTable;

