import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            fetch("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                
                .then((data) => {
                    console.log("User from API:", data.user);
                    setUser(data.user);
                })
                .catch(() => setUser(null));

        }
    }, [token]);

    const login = async (token, userData) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContext;