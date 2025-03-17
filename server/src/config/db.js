import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/ReactProject";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};
export default connectDB;