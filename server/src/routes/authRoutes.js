import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { checkEmailController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-email", checkEmailController);


export default router;