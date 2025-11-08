import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        account_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
        await pool.query(queryText);
        console.log("✅ User table created or already exists.");
        
        // Check if table was created
        const checkTable = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'users'
        `);
        
        if (checkTable.rows.length > 0) {
            console.log("✅ Verified: 'users' table exists in database");
        }
    } catch (error) {
        console.error("❌ Error creating user table:", error.message);
        throw error;
    }
};

export default createUserTable;