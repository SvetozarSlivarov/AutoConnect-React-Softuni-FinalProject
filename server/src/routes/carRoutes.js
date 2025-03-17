import express from "express";
import { getAllCarsController, getCarController, createCarController, updateCarController, deleteCarController } from "../controllers/carController.js";

const router = express.Router();

router.get("/", getAllCarsController); // 📝 GET ALL CARS
router.get("/:id", getCarController); // 📝 GET ONE CAR
router.post("/", createCarController); // ➕ ADD CAR
router.put("/:id", updateCarController); // ✏️ UPDATE CAR
router.delete("/:id", deleteCarController); // 🗑 DELETE CAR

export default router;
