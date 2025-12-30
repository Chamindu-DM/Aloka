import pool from "../config/db.js";

const createCampaignsTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        raised DECIMAL(15, 2) DEFAULT 0,
        goal DECIMAL(15, 2) NOT NULL,
        donors INTEGER DEFAULT 0,
        category VARCHAR(50) NOT NULL,
        location VARCHAR(100),
        days_left INTEGER DEFAULT 30,
        is_urgent BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        organizer VARCHAR(100),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
        await pool.query(queryText);
        console.log("✅ Campaigns table created or already exists.");
    } catch (error) {
        console.error("❌ Error creating campaigns table:", error.message);
        throw error;
    }
};

export default createCampaignsTable;

