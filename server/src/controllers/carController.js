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
        const { brand, model, price, description } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }

        // Извличаме URL-ите на качените снимки
        const imageUrls = req.files.map((file) => file.path);

        const newCar = await createCar({ brand, model, price, description }, imageUrls);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
