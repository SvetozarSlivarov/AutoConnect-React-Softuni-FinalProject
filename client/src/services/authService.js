export const registerUser = async (userData) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const loginUser = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const checkEmailExists = async (email) => {
    try {
        const res = await fetch(`http://localhost:5000/api/auth/check-email/${email}`);

        if (!res.ok) {
            throw new Error("Error checking email availability");
        }

        const data = await res.json();
        console.log("Email check response:", data); // Дебъгване на отговора
        return data.exists; // Връща `true`, ако имейлът съществува, иначе `false`
    } catch (error) {
        console.error("Error checking email:", error);
        return false; // Ако има грешка, по-добре да върнем `false`, за да не блокираме регистрацията
    }
};
