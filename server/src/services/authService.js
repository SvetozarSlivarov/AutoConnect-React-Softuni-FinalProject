import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

const createUser = async ({ firstName, lastName, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔵 Получени данни:", { firstName, lastName, email, password });

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });

        console.log("🟢 Преди запис в MongoDB:", newUser);

        const savedUser = await newUser.save();

        console.log("✅ Успешно записан:", savedUser);
        return savedUser;

    } catch (error) {
        console.error("❌ Грешка при запис:", error.message);
        console.error("📝 Stack trace:", error.stack);
        throw error;
    }
};

const authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    // Връщаме токен + сигурни user данни
    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            role: user.role,
        },
    };
};

export default { createUser, authenticateUser };