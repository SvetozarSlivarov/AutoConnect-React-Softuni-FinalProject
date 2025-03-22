import Car from "../models/Car.js";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../services/carService.js";
import { v2 as cloudinary } from "cloudinary";
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
        features
      } = req.body;
  
      const parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
  
      // 🔄 Extract both URL and public_id
      const images = req.files.map(file => ({
        url: file.path,
        public_id: file.filename, // this is the cloudinary public_id
      }));
  
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
        features: parsedFeatures,
        images,
        owner: req.user.id,
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
      const { features, existingImages } = req.body;
      const carId = req.params.id;
  
      const car = await Car.findById(carId);
      if (!car) throw new Error("Car not found");
  
      // 🔎 1. Определи кои снимки да останат (от клиента)
      const keptImages = existingImages ? JSON.parse(existingImages) : [];
  
      // 🗑️ 2. Намери кои снимки трябва да се изтрият
      const removedImages = car.images.filter(
        (img) => !keptImages.some((kept) => kept.public_id === img.public_id)
      );
  
      // ☁️ 3. Изтрий ги от Cloudinary
      for (const img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
  
      // 📸 4. Новите снимки, ако има
      const newImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
  
      // 📦 5. Обедини останалите със новите
      const finalImages = [...keptImages, ...newImages];
  
      // 🛠️ 6. Финална структура
      const updatedData = {
        ...req.body,
        features: features ? JSON.parse(features) : [],
        images: finalImages,
      };
  
      const updatedCar = await Car.findByIdAndUpdate(carId, updatedData, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json(updatedCar);
    } catch (error) {
      console.error("Update error:", error);
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
