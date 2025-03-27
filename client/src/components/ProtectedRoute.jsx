import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        return (
        <Navigate 
            to="/login" 
            replace 
            state={{
            message: "You must be logged in to access this page.",
            from: location.pathname,
            }} 
        />  
        );
    }

    return children;
};

export default ProtectedRoute;
