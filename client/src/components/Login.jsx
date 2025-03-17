import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext); // Извличаме login функцията от AuthContext
    const navigate = useNavigate();

    // Обработване на промяна в полетата
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Изпращане на формата
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
    
            login(data.token, data.user); // Изпращаме токена и user данните
    
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-5" style={{ borderRadius: "15px", width: "400px" }}>
                <h2 className="text-uppercase text-center mb-4">Login</h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success btn-block w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-muted mt-3">
                        Don't have an account? <a href="/register" className="fw-bold text-body"><u>Register here</u></a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
