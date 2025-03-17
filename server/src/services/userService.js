import User from "../models/User.js";

export const getAllUsers = async () => {
    try {
        return await User.find().select("-password");
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserById = async (id) => {
    try {
        return await User.findById(id).select("-password");
    } catch (error) {
        throw new Error("User not found");
    }
};

export const updateUser = async (id, updateData) => {
    try {
        return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("User not found");
    }
};