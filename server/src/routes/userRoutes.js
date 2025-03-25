import express from "express";
import {updateWatchlistController  ,getUserController, getAllUsersController, updateUserController, deleteUserController } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.put("/watchlist",verifyToken
  , updateWatchlistController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.get("/:id/profile", verifyToken, getUserProfile);


export default router;
