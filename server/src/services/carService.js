import Car from "../models/Car.js";

// (GET ALL)
export const getAllCars = async () => {
    return await Car.find();
};

// (GET ONE)
export const getCarById = async (id) => {
    return await Car.findById(id);
};

// (POST)
export const createCar = async (carData, imageUrls) => {
    return await Car.create({ ...carData, images: imageUrls });
};

// (PUT)
export const updateCar = async (id, updateData) => {
    return await Car.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

//(DELETE)
export const deleteCar = async (id) => {
    return await Car.findByIdAndDelete(id);
};
