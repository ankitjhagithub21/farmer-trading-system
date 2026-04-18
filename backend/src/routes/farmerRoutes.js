import { Router } from "express";
import { getFarmers, addFarmer, login, getFarmerProducts } from "../controllers/farmerController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.get("/", isAdmin, getFarmers);
router.post("/", isAdmin, addFarmer);
router.post("/login", login)
router.get("/:id/products", getFarmerProducts)

export default router;