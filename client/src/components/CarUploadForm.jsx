import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";
import featureCategories from "../constants/featureCategories";
import validateCarForm from "../utils/validateCarForm";

const CarUploadForm = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const firstErrorRef = useRef(null);

    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        fuelType: "Petrol",
        transmission: "Manual",
        power: "",
        mileage: "",
        color: "",
        description: "",
        condition: "Used",
        features: [],
        images: [],
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = carData.images.length + files.length;

        if (totalImages > 5) {
            const allowedFiles = files.slice(0, 5 - carData.images.length);
            setCarData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...allowedFiles],
            }));
            setError("You can upload a maximum of 5 images.");
            setTimeout(() => setError(null), 3000);
        } else {
            setCarData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...files],
            }));
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setCarData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (carData.images.length === 0) {
            setError("At least one image is required.");
            setLoading(false);
            return;
        }
        if (carData.images.length > 5) {
            setError("Maximum 5 images allowed (total).");
            setLoading(false);
            return;
        }

        const errors = validateCarForm(carData);
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            if (firstErrorRef.current) {
                firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        try {
            const formData = new FormData();
            const fields = [
                "brand", "model", "year", "price", "fuelType",
                "transmission", "power", "mileage", "color",
                "description", "condition"
            ];
            fields.forEach((field) => formData.append(field, carData[field]));
            formData.append("features", JSON.stringify(carData.features));
            carData.images.forEach((img) => formData.append("images", img));

            const response = await fetch("http://localhost:5000/api/cars", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to upload car.");

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate("/catalog");
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <h2 className="text-center mb-4">Sell Your Car</h2>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {["brand", "model", "year", "price", "power", "mileage", "color", "description"].map((field, index) => (
                    <Form.Group
                        className="mb-3"
                        key={field}
                        ref={index === 0 ? firstErrorRef : null}
                    >
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control
                            as={field === "description" ? "textarea" : "input"}
                            type="text"
                            name={field}
                            value={carData[field] || ""}
                            onChange={handleChange}
                            isInvalid={!!validationErrors[field]}
                            required={field !== "description"}
                        />
                        {validationErrors[field] && (
                            <Form.Text className="text-danger">{validationErrors[field]}</Form.Text>
                        )}
                    </Form.Group>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select
                        name="fuelType"
                        value={carData.fuelType}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.fuelType}
                    >
                        {["Petrol", "Diesel", "Electric", "Hybrid", "CNG"].map((opt) => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </Form.Select>
                    {validationErrors.fuelType && (
                        <Form.Text className="text-danger">{validationErrors.fuelType}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Select
                        name="transmission"
                        value={carData.transmission}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.transmission}
                    >
                        <option>Manual</option>
                        <option>Automatic</option>
                    </Form.Select>
                    {validationErrors.transmission && (
                        <Form.Text className="text-danger">{validationErrors.transmission}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select
                        name="condition"
                        value={carData.condition}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.condition}
                    >
                        <option>New</option>
                        <option>Used</option>
                    </Form.Select>
                    {validationErrors.condition && (
                        <Form.Text className="text-danger">{validationErrors.condition}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{ display: "block" }}>Features</Form.Label>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowFeatures((prev) => !prev)}
                        aria-controls="features-collapse"
                        aria-expanded={showFeatures}
                    >
                        {showFeatures ? "Hide Features" : "Show Features"}
                    </Button>

                    {showFeatures && (
                        <div id="features-collapse" className="mt-3 p-3 border rounded bg-light">
                            {Object.entries(featureCategories).map(([category, features]) => (
                                <div key={category} className="mb-3">
                                    <h6>{category}</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {features.map((feature) => (
                                            <Form.Check
                                                key={feature}
                                                type="checkbox"
                                                id={`feature-${feature}`}
                                                label={feature}
                                                value={feature}
                                                checked={carData.features.includes(feature)}
                                                onChange={(e) => {
                                                    const { checked, value } = e.target;
                                                    setCarData((prev) => ({
                                                        ...prev,
                                                        features: checked
                                                            ? [...prev.features, value]
                                                            : prev.features.filter((f) => f !== value),
                                                    }));
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Upload Images (max 5)</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        isInvalid={!!validationErrors.images}
                    />
                    {validationErrors.images && (
                        <Form.Text className="text-danger">{validationErrors.images}</Form.Text>
                    )}
                </Form.Group>

                {carData.images.length > 0 && (
                    <div className="mb-3">
                        <h5>Selected Images</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {carData.images.map((file, i) => (
                                <div key={i} style={{ position: "relative" }}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${i}`}
                                        style={{ width: "100px", borderRadius: "8px" }}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveImage(i)}
                                        style={{ position: "absolute", top: 0, right: 0 }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Button type="submit" variant="primary" disabled={loading} className={styles.submitButton}>
                    {loading ? "Uploading..." : "Submit Listing"}
                </Button>
            </Form>

            <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, minWidth: "250px" }}>
                {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                {success && <Alert variant="success" dismissible onClose={() => setSuccess(false)}>Car listed successfully!</Alert>}
            </div>
        </div>
    );
};

export default CarUploadForm;
