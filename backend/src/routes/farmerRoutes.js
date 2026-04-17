import { Router } from "express";
import { getFarmers, addFarmer } from "../controllers/farmerController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.get("/", isAdmin, getFarmers);
router.post("/", isAdmin, addFarmer);

export default router;