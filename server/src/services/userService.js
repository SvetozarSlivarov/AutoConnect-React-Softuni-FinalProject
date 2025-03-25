import User from "../models/User.js";
import Car from "../models/Car.js";

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

export const getUserProfileData = async (userId) => {
  const user = await User.findById(userId).select("-password").lean();
  if (!user) throw new Error("User not found");

  const createdCars = await Car.find({ owner: userId });
  const watchlistCars = await Car.find({ _id: { $in: user.watchlist || [] } });

  return { user, createdCars, watchlistCars };
};
export const toggleCarInWatchlist = async (userId, carId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
  
    const carExists = await Car.exists({ _id: carId });
    if (!carExists) throw new Error("Car not found");
  
    const alreadyInWatchlist = user.watchlist.includes(carId);
  
    if (alreadyInWatchlist) {
      user.watchlist.pull(carId);
    } else {
      user.watchlist.push(carId);
    }
  
    await user.save();
  
    return {
      status: alreadyInWatchlist ? "removed" : "added",
      watchlist: user.watchlist,
    };
  };