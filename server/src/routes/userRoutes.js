import express from "express";
import { getUserController, getAllUsersController, updateUserController, deleteUserController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
