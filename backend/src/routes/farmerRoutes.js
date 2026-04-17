import express from "express";
import { getAllFarmers, getFarmerByMobile, deleteFarmer, updateFarmer, addFarmer, getDashboardStats } from "../controllers/farmerController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, addFarmer);

router.get("/", isAdmin, getAllFarmers);

// DASHBOARD STATS
router.get("/dashboard/stats", isAdmin, getDashboardStats);

// GET FARMER
router.get("/:mobile", isAdmin, getFarmerByMobile);

// DELETE
router.delete("/:id", isAdmin, deleteFarmer);

// UPDATE
router.put("/:id", isAdmin, updateFarmer);

export default router;
