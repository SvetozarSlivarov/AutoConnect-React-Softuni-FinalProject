import express from "express";
import { register, login, me, checkEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.get("/check-email/:email", checkEmail);


export default router;