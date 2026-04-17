import express from "express";
import { addProduct, deleteProduct, getAllProducts, getDashboardStats, updateProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, addProduct);

router.get("/", isAdmin, getAllProducts);

// DASHBOARD STATS
router.get("/stats", isAdmin, getDashboardStats);

// DELETE
router.delete("/:id", isAdmin, deleteProduct);

// UPDATE
router.put("/:id", isAdmin, updateProduct);



export default router;
