import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(localStorage.getItem("token"));
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken); // Запазваме декодираните данни в user
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
    }, []);

    const login = (token, userData) => {
      localStorage.setItem("token", token);
      setUser(userData); // Запазваме user данните в state
      navigate("/");
  };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
