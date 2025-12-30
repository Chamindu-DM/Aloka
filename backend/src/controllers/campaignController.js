import {
    createCampaignService,
    getAllCampaignsService,
    getCampaignByIdService,
    getCampaignsByUserIdService,
    updateCampaignService,
    deleteCampaignService
} from "../models/campaignModel.js";

const handleResponse = (res, status, message, data) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

// Create a new campaign
export const createCampaign = async (req, res, next) => {
    try {
        const { userId, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer } = req.body;

        if (!title || !goal || !category) {
            return handleResponse(res, 400, "Title, goal, and category are required", null);
        }

        const newCampaign = await createCampaignService(
            userId, title, description, image, goal, category, location, daysLeft || 30, isUrgent || false, isFeatured || false, organizer
        );

        handleResponse(res, 201, "Campaign created successfully", newCampaign);
    } catch (err) {
        next(err);
    }
};

// Get all campaigns
export const getAllCampaigns = async (req, res, next) => {
    try {
        const campaigns = await getAllCampaignsService();
        handleResponse(res, 200, "Campaigns retrieved successfully", campaigns);
    } catch (err) {
        next(err);
    }
};

// Get campaign by ID
export const getCampaignById = async (req, res, next) => {
    try {
        const campaign = await getCampaignByIdService(req.params.id);
        if (!campaign) {
            return handleResponse(res, 404, "Campaign not found", null);
        }
        handleResponse(res, 200, "Campaign retrieved successfully", campaign);
    } catch (err) {
        next(err);
    }
};

// Get campaigns by user ID
export const getCampaignsByUserId = async (req, res, next) => {
    try {
        const campaigns = await getCampaignsByUserIdService(req.params.userId);
        handleResponse(res, 200, "User campaigns retrieved successfully", campaigns);
    } catch (err) {
        next(err);
    }
};

// Update campaign
export const updateCampaign = async (req, res, next) => {
    try {
        const { title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer, status } = req.body;

        const updatedCampaign = await updateCampaignService(
            req.params.id, title, description, image, goal, category, location, daysLeft, isUrgent, isFeatured, organizer, status
        );

        if (!updatedCampaign) {
            return handleResponse(res, 404, "Campaign not found", null);
        }
        handleResponse(res, 200, "Campaign updated successfully", updatedCampaign);
    } catch (err) {
        next(err);
    }
};

// Delete campaign
export const deleteCampaign = async (req, res, next) => {
    try {
        const deletedCampaign = await deleteCampaignService(req.params.id);
        if (!deletedCampaign) {
            return handleResponse(res, 404, "Campaign not found", null);
        }
        handleResponse(res, 200, "Campaign deleted successfully", deletedCampaign);
    } catch (err) {
        next(err);
    }
};

