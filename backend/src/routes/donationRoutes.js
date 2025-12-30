import express from "express";
import {
    createDonation,
    getAllDonations,
    getDonationById,
    getDonationsByUserId,
    getDonationsByCampaignId,
    getRecentDonations,
    getUserDonationStats
} from "../controllers/donationController.js";

const router = express.Router();

// Donation routes
router.post("/", createDonation);
router.get("/", getAllDonations);
router.get("/recent", getRecentDonations);
router.get("/:id", getDonationById);
router.get("/user/:userId", getDonationsByUserId);
router.get("/user/:userId/stats", getUserDonationStats);
router.get("/campaign/:campaignId", getDonationsByCampaignId);

export default router;

