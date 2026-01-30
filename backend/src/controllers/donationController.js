import {
    createDonationService,
    getAllDonationsService,
    getDonationByIdService,
    getDonationsByUserIdService,
    getDonationsByCampaignIdService,
    getRecentDonationsService,
    getUserDonationStatsService
} from "../models/donationModel.js";
import { updateCampaignDonationService } from "../models/campaignModel.js";

const handleResponse = (res, status, message, data) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

// Create a new donation
export const createDonation = async (req, res, next) => {
    try {
        const { userId, campaignId, amount, donorName, isAnonymous, message, receiptUrl, paymentMethod } = req.body;

        if (!campaignId || !amount) {
            return handleResponse(res, 400, "Campaign ID and amount are required", null);
        }

        if (amount < 100) {
            return handleResponse(res, 400, "Minimum donation amount is LKR 100", null);
        }

        // Create donation
        const newDonation = await createDonationService(
            userId, campaignId, amount, donorName, isAnonymous || false, message, receiptUrl, paymentMethod || 'manual'
        );

        // Update campaign raised amount and donors count
        await updateCampaignDonationService(campaignId, amount);

        handleResponse(res, 201, "Donation created successfully", newDonation);
    } catch (err) {
        next(err);
    }
};

// Get all donations
export const getAllDonations = async (req, res, next) => {
    try {
        const donations = await getAllDonationsService();
        handleResponse(res, 200, "Donations retrieved successfully", donations);
    } catch (err) {
        next(err);
    }
};

// Get donation by ID
export const getDonationById = async (req, res, next) => {
    try {
        const donation = await getDonationByIdService(req.params.id);
        if (!donation) {
            return handleResponse(res, 404, "Donation not found", null);
        }
        handleResponse(res, 200, "Donation retrieved successfully", donation);
    } catch (err) {
        next(err);
    }
};

// Get donations by user ID
export const getDonationsByUserId = async (req, res, next) => {
    try {
        const donations = await getDonationsByUserIdService(req.params.userId);
        handleResponse(res, 200, "User donations retrieved successfully", donations);
    } catch (err) {
        next(err);
    }
};

// Get donations by campaign ID
export const getDonationsByCampaignId = async (req, res, next) => {
    try {
        const donations = await getDonationsByCampaignIdService(req.params.campaignId);
        handleResponse(res, 200, "Campaign donations retrieved successfully", donations);
    } catch (err) {
        next(err);
    }
};

// Get recent donations
export const getRecentDonations = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const donations = await getRecentDonationsService(limit);
        handleResponse(res, 200, "Recent donations retrieved successfully", donations);
    } catch (err) {
        next(err);
    }
};

// Get user donation stats
export const getUserDonationStats = async (req, res, next) => {
    try {
        const stats = await getUserDonationStatsService(req.params.userId);
        handleResponse(res, 200, "User donation stats retrieved successfully", stats);
    } catch (err) {
        next(err);
    }
};

