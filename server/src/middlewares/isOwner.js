import Car from "../models/Car.js";

export const isOwner = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this listing" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
