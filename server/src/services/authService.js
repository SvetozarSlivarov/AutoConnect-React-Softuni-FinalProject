import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET =  "mysecretkey";

// Регистрация на нов потребител
export const registerUser = async (firstName, lastName, email, password) => {
    // Проверка за съществуващ потребител
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Хеширане на паролата
    const hashedPassword = await bcrypt.hash(password, 10);

    // Запазване в базата
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    return { message: "User created successfully" };
};

// Логин на потребител
export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    // Проверка на паролата
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Генериране на токен
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    };
};

// Проверка на текущ потребител
export const getCurrentUser = async (token) => {
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) throw new Error("User not found");

    return user;
};

export const emailExists = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
};