import express from "express";
import upload from "../middlewares/upload.js";
import {
    getAllCarsController,
    getCarController,
    createCarController,
    updateCarController,
    deleteCarController
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getAllCarsController); // 📝 GET ALL CARS
router.get("/:id", getCarController); // 📝 GET ONE CAR
router.post("/", upload.array("images", 5), createCarController); // ➕ ADD CAR (с качване на снимки)
router.put("/:id", updateCarController); // ✏️ UPDATE CAR
router.delete("/:id", deleteCarController); // 🗑 DELETE CAR

export default router;
