import {toggleCarInWatchlist ,getUserProfileData ,getAllUsers, getUserById, updateUser, deleteUser } from "../services/userService.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await getUserProfileData(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  export const updateWatchlistController = async (req, res) => {
    try {
        console.log("Received user:", req.user);
        console.log("Received carId:", req.body.carId);
      const { carId } = req.body;
      const userId = req.user.id;
  
      if (!carId) {
        return res.status(400).json({ message: "Car ID is required." });
      }
  
      const result = await toggleCarInWatchlist(userId, carId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };