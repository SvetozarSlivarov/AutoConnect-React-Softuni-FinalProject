import { registerUser, loginUser, getCurrentUser, emailExists } from "../services/authService.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = await registerUser(firstName, lastName, email, password);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const me = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const user = await getCurrentUser(token);
        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const exists = await emailExists(email);
        res.json({ exists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
