import pool from "../config/db.js";

// Create a new campaign
export const createCampaignService = async (userId, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer) => {
    const result = await pool.query(
        `INSERT INTO campaigns (user_id, title, description, image, goal, category, location, days_left, is_urgent, is_featured, organizer)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [userId, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer]
    );
    return result.rows[0];
};

// Get all campaigns
export const getAllCampaignsService = async () => {
    const result = await pool.query(
        `SELECT * FROM campaigns WHERE status = 'active' ORDER BY created_at DESC`
    );
    return result.rows;
};

// Get campaign by ID
export const getCampaignByIdService = async (id) => {
    const result = await pool.query(
        `SELECT * FROM campaigns WHERE id = $1`,
        [id]
    );
    return result.rows[0];
};

// Get campaigns by user ID
export const getCampaignsByUserIdService = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM campaigns WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};

// Update campaign
export const updateCampaignService = async (id, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer, status) => {
    const result = await pool.query(
        `UPDATE campaigns 
         SET title = COALESCE($2, title),
             description = COALESCE($3, description),
             image = COALESCE($4, image),
             goal = COALESCE($5, goal),
             category = COALESCE($6, category),
             location = COALESCE($7, location),
             days_left = COALESCE($8, days_left),
             is_urgent = COALESCE($9, is_urgent),
             is_featured = COALESCE($10, is_featured),
             organizer = COALESCE($11, organizer),
             status = COALESCE($12, status),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [id, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer, status]
    );
    return result.rows[0];
};

// Delete campaign
export const deleteCampaignService = async (id) => {
    const result = await pool.query(
        `DELETE FROM campaigns WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};

// Update campaign raised amount and donors count
export const updateCampaignDonationService = async (campaignId, amount) => {
    const result = await pool.query(
        `UPDATE campaigns 
         SET raised = raised + $2,
             donors = donors + 1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [campaignId, amount]
    );
    return result.rows[0];
};

