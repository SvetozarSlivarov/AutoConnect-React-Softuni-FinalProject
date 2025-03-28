import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";
import featureCategories from "../constants/featureCategories";


const CarUploadForm = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

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

        try {
            const formData = new FormData();

            formData.append("brand", carData.brand);
            formData.append("model", carData.model);
            formData.append("year", carData.year);
            formData.append("price", carData.price);
            formData.append("fuelType", carData.fuelType);
            formData.append("transmission", carData.transmission);
            formData.append("power", carData.power);
            formData.append("mileage", carData.mileage);
            formData.append("color", carData.color);
            formData.append("description", carData.description);
            formData.append("condition", carData.condition);
            formData.append("features", JSON.stringify(carData.features));

            carData.images.forEach((img) => {
                formData.append("images", img);
            });

            const response = await fetch("http://localhost:5000/api/cars", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to upload car.");
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate("/catalog");
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <h2 className="text-center mb-4">Sell Your Car</h2>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {["brand", "model", "year", "price", "power", "mileage", "color", "description"].map((field) => (
                    <Form.Group className="mb-3" key={field}>
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control
                            as={field === "description" ? "textarea" : "input"}
                            type="text"
                            name={field}
                            value={carData[field] || ""}
                            onChange={handleChange}
                            required={field !== "description"}
                        />
                    </Form.Group>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select name="fuelType" value={carData.fuelType} onChange={handleChange}>
                        {["Petrol", "Diesel", "Electric", "Hybrid", "CNG"].map((opt) => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Select name="transmission" value={carData.transmission} onChange={handleChange}>
                        <option>Manual</option>
                        <option>Automatic</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select name="condition" value={carData.condition} onChange={handleChange}>
                        <option>New</option>
                        <option>Used</option>
                    </Form.Select>
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
                    <Form.Control type="file" multiple onChange={handleFileChange} accept="image/*" />
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