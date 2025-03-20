import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailExists, registerUser } from "../services/authService";
import { isValidEmail, isValidPassword } from "../utils/registerValidation";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const navigate = useNavigate();

    // Обработване на промени в input полетата
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Изпращане на формата
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Проверка дали email вече е зает
            const emailExists = await checkEmailExists(formData.email);
            console.log(emailExists);
            if (emailExists) {
                setError("❌ This email is already in use.");
                setEmailTaken(true);
                setLoading(false);
                return;
            }

            // Проверка за валиден email
            if (!isValidEmail(formData.email)) {
                setError("❌ Invalid email format.");
                setLoading(false);
                return;
            }

            // Проверка за силна парола
            if (!isValidPassword(formData.password)) {
                setError("❌ Password must be at least 6 characters long and include at least one letter and one number.");
                setLoading(false);
                return;
            }

            // Проверка дали паролите съвпадат
            if (formData.password !== formData.confirmPassword) {
                setError("❌ Passwords do not match.");
                setLoading(false);
                return;
            }

            // Проверка дали потребителят е приел условията
            if (!formData.agreeTerms) {
                setError("❌ You must accept the terms and conditions.");
                setLoading(false);
                return;
            }

            // Изпращане на регистрацията
            await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-5 shadow" style={{ borderRadius: "15px", width: "400px" }}>
                <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${emailTaken ? "is-invalid" : ""}`}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {emailTaken && <div className="invalid-feedback">This email is already taken.</div>}
                    </div>

                    <div className="mb-2">
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

                    <div className="mb-2">
                        <label className="form-label">Repeat your password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-check d-flex justify-content-center mb-3">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">
                            I agree to the{" "}
                            <a href="/terms-and-conditions" className="text-body">
                                <u>Terms and conditions</u>
                            </a>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-success btn-block w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>

                    <p className="text-center text-muted mt-3">
                        Have an account?{" "}
                        <a href="/login" className="fw-bold text-body">
                            <u>Login here</u>
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
