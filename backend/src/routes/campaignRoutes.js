import express from "express";
import {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    getCampaignsByUserId,
    updateCampaign,
    deleteCampaign
} from "../controllers/campaignController.js";

const router = express.Router();

// Campaign routes
router.post("/", createCampaign);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.get("/user/:userId", getCampaignsByUserId);
router.put("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;

