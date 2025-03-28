import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1886 },
    price: { type: Number, required: true },
    fuelType: { 
      type: String, 
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"], 
      required: true 
    },
    transmission: { 
      type: String, 
      enum: ["Manual", "Automatic"], 
      required: true 
    },
    power: { type: Number, required: true },
    mileage: { type: Number, required: true },
    color: { type: String, required: true },
    description: { type: String },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      }
    ],
    condition: { 
      type: String, 
      enum: ["New", "Used"], 
      required: true 
    },
    features: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
