import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { loginUser } from "../services/authService";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext); // Взимаме функцията login от AuthContext
    const navigate = useNavigate();

    // Обработване на промяна в input полетата
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Изпращане на формата
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(formData.email, formData.password);
            login(data.token, data.user); // Записваме user-а в контекста
            navigate("/"); // Пренасочваме към началната страница
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-5 shadow" style={{ borderRadius: "15px", width: "400px" }}>
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
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-center text-muted mt-3">
                        Don't have an account?{" "}
                        <Link to='/register' className="fw-bold text-body">
                            <u>Register here</u>
                        </Link>

                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
