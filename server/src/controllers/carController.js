import Car from "../models/Car.js";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../services/carService.js";

//  GET ALL 
export const getAllCarsController = async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  GET ONE 
export const getCarController = async (req, res) => {
    try {
        const car = await getCarById(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ message: "Car not found" });
    }
};

//  POST (със снимки)
export const createCarController = async (req, res) => {
    try {
      const {
        brand,
        model,
        year,
        price,
        fuelType,
        transmission,
        power,
        mileage,
        color,
        description,
        condition,
        doors,
        seats,
        drivetrain,
        features
      } = req.body;
  
      // 🖼️ Extract image URLs (assuming you're using Cloudinary or similar)
      const imageUrls = req.files.map(file => file.path);
  
      // 📌 Parse features (if it's sent as a JSON string)
      const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
  
      // 🚫 DO NOT trust owner from req.body!
      const newCar = await Car.create({
        brand,
        model,
        year,
        price,
        fuelType,
        transmission,
        power,
        mileage,
        color,
        description,
        condition,
        doors,
        seats,
        drivetrain,
        features: parsedFeatures,
        images: imageUrls,
        owner: req.user.id, // ✅ Owner comes from the verified token
      });
  
      res.status(201).json(newCar);
    } catch (error) {
      console.error("Create Car Error:", error);
      res.status(400).json({ message: error.message || "Failed to create car." });
    }
  };

//  PUT
export const updateCarController = async (req, res) => {
    try {
        const updatedCar = await updateCar(req.params.id, req.body);
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE
export const deleteCarController = async (req, res) => {
    try {
        await deleteCar(req.params.id);
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Car not found" });
    }
};
