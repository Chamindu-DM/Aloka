import pool from "../config/db.js";

// Create a new donation
export const createDonationService = async (userId, campaignId, amount, donorName, isAnonymous, message) => {
    const result = await pool.query(
        `INSERT INTO donations (user_id, campaign_id, amount, donor_name, is_anonymous, message)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [userId, campaignId, amount, donorName, isAnonymous, message]
    );
    return result.rows[0];
};

// Get all donations
export const getAllDonationsService = async () => {
    const result = await pool.query(
        `SELECT d.*, c.title as campaign_title, c.image as campaign_image, c.category as campaign_category
         FROM donations d
         LEFT JOIN campaigns c ON d.campaign_id = c.id
         ORDER BY d.created_at DESC`
    );
    return result.rows;
};

// Get donation by ID
export const getDonationByIdService = async (id) => {
    const result = await pool.query(
        `SELECT d.*, c.title as campaign_title, c.image as campaign_image
         FROM donations d
         LEFT JOIN campaigns c ON d.campaign_id = c.id
         WHERE d.id = $1`,
        [id]
    );
    return result.rows[0];
};

// Get donations by user ID
export const getDonationsByUserIdService = async (userId) => {
    const result = await pool.query(
        `SELECT d.*, c.title as campaign_title, c.image as campaign_image, c.category as campaign_category, c.organizer
         FROM donations d
         LEFT JOIN campaigns c ON d.campaign_id = c.id
         WHERE d.user_id = $1
         ORDER BY d.created_at DESC`,
        [userId]
    );
    return result.rows;
};

// Get donations by campaign ID
export const getDonationsByCampaignIdService = async (campaignId) => {
    const result = await pool.query(
        `SELECT d.*, u.first_name, u.last_name
         FROM donations d
         LEFT JOIN users u ON d.user_id = u.id
         WHERE d.campaign_id = $1
         ORDER BY d.created_at DESC`,
        [campaignId]
    );
    return result.rows;
};

// Get recent donations (for activity feed)
export const getRecentDonationsService = async (limit = 10) => {
    const result = await pool.query(
        `SELECT d.*, c.title as campaign_title, u.first_name, u.last_name
         FROM donations d
         LEFT JOIN campaigns c ON d.campaign_id = c.id
         LEFT JOIN users u ON d.user_id = u.id
         ORDER BY d.created_at DESC
         LIMIT $1`,
        [limit]
    );
    return result.rows;
};

// Get user donation stats
export const getUserDonationStatsService = async (userId) => {
    const result = await pool.query(
        `SELECT 
            COUNT(*) as total_donations,
            COALESCE(SUM(amount), 0) as total_amount,
            COUNT(DISTINCT campaign_id) as campaigns_supported
         FROM donations
         WHERE user_id = $1`,
        [userId]
    );
    return result.rows[0];
};

