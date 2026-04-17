import express from "express";
import { getAllFarmers, getFarmerByMobile, deleteFarmer, updateFarmer, addFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/", addFarmer);

router.get("/all", getAllFarmers);

// GET FARMER
router.get("/:mobile", getFarmerByMobile);

// DELETE
router.delete("/:id", deleteFarmer);

// UPDATE
router.put("/:id", updateFarmer);

export default router;
