import authService from "../services/authService.js";

export const registerUser = async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { token, user } = await authService.authenticateUser(req.body);
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};