import express from "express";
import connectDB from "./config/db.js";
import configureExpress from "./config/express.js";
import authRoutes from "./routes/authRoutes.js";
import seedAdminUser from "./config/seedAdmin.js";
import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';

const PORT = 5000;
const app = express();
configureExpress(app);

// Connect to MongoDB
connectDB().then(() => seedAdminUser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);


app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));