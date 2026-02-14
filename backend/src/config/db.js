import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_DATABASE || !process.env.DB_PASSWORD || !process.env.DB_DBPORT) {
    throw new Error("Missing required environment variables for database connection.");
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_DBPORT,
    ssl: false, // Disable SSL for local/Docker connections
});

pool.on("connect", () =>{
    console.log("Connection pool established with Database!");
});

export default pool;
