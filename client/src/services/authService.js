const API_BASE_URL = "http://localhost:5000/api/auth";

export const checkEmailExists = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/check-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        return response.ok ? false : true; // Ако email съществува → true
    } catch (error) {
        console.error("Error checking email:", error);
        return false;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
