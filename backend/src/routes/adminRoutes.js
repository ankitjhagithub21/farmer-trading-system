import express from "express";
import { login, getAdmin } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/login", login);
router.get("/", isAdmin, getAdmin);

export default router;