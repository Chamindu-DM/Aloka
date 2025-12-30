import  express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import userRoutes from "./routes/userRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createCampaignsTable from "./data/createCampaignsTable.js";
import createDonationsTable from "./data/createDonationsTable.js";
import { seedCampaigns, seedDonations } from "./data/seedData.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);

// Error handling middleware
app.use(errorHandling);

// Testing POSTGRES connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Start server after creating table
const startServer = async () => {
    try {
        // Wait for database connection
        await pool.connect();
        console.log("✅ Connected to PostgreSQL database");
        
        // Create tables before starting server
        await createUserTable();
        console.log("✅ User table initialized");
        
        await createCampaignsTable();
        console.log("✅ Campaigns table initialized");

        await createDonationsTable();
        console.log("✅ Donations table initialized");

        // Seed initial data
        await seedCampaigns();
        await seedDonations();

        // Start the server
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();