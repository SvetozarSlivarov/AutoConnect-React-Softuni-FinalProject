import express from "express";
import upload from "../middlewares/upload.js";
import { isOwner } from "../middlewares/isOwner.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import {
    getAllCarsController,
    getCarController,
    createCarController,
    updateCarController,
    deleteCarController
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getAllCarsController);
router.get("/:id", getCarController);
router.post("/", verifyToken, upload.array("images", 5), createCarController);
router.put("/:id", verifyToken, isOwner, updateCarController);
router.delete("/:id", verifyToken, isOwner, deleteCarController);

export default router;
