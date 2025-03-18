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
export const checkEmailController = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const emailExists = await authService.checkEmailExists(email);

        if (emailExists) {
            return res.status(400).json({ message: "This email is already in use." });
        }

        return res.status(200).json({ message: "Email is available." });
    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};
