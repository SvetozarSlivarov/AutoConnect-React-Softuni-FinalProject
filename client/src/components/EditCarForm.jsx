import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";
import featureCategories from "../constants/featureCategories";

const EditCarForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

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
        newImages: [],
        existingImages: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch car data");
                const data = await res.json();
                setCarData(prev => ({
                    ...prev,
                    ...data,
                    features: data.features || [],
                    existingImages: data.images || []
                }));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = carData.newImages.length + files.length;
        if (totalImages > 5) {
            const allowed = files.slice(0, 5 - carData.newImages.length);
            setCarData((prev) => ({ ...prev, newImages: [...prev.newImages, ...allowed] }));
            setError("Maximum 5 images allowed.");
            setTimeout(() => setError(null), 3000);
        } else {
            setCarData((prev) => ({ ...prev, newImages: [...prev.newImages, ...files] }));
        }
    };

    const handleRemoveNewImage = (index) => {
        setCarData((prev) => ({
            ...prev,
            newImages: prev.newImages.filter((_, i) => i !== index)
        }));
    };

    const handleRemoveExistingImage = (public_id) => {
        setCarData((prev) => ({
            ...prev,
            existingImages: prev.existingImages.filter(img => img.public_id !== public_id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            const fields = ["brand", "model", "year", "price", "fuelType", "transmission", "power", "mileage", "color", "description", "condition"];
            fields.forEach((key) => formData.append(key, carData[key]));
            formData.append("features", JSON.stringify(carData.features));
            formData.append("existingImages", JSON.stringify(carData.existingImages));
            carData.newImages.forEach((img) => formData.append("images", img));

            const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) throw new Error("Update failed");

            setSuccess(true);
            setTimeout(() => navigate(`/cars/${id}`), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading || !carData) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className={styles.uploadContainer}>
            <h2 className="text-center mb-4">Edit Your Car</h2>
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
                    <Form.Label>Features</Form.Label>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowFeatures((prev) => !prev)}
                    >
                        {showFeatures ? "Hide Features" : "Show Features"}
                    </Button>

                    {showFeatures && (
                        <div className="mt-3 p-3 border rounded bg-light">
                            {Object.entries(featureCategories).map(([category, features]) => (
                                <div key={category} className="mb-3">
                                    <h6>{category}</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {features.map((feature) => (
                                            <Form.Check
                                                key={feature}
                                                type="checkbox"
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
                    <Form.Label>Upload New Images (max 5)</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} accept="image/*" />
                </Form.Group>

                {carData.existingImages.length > 0 && (
                    <div className="mb-3">
                        <h5>Existing Images</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {carData.existingImages.map((img) => (
                                <div key={img.public_id} className={styles.imageWrapper}>
                                    <img src={img.url} alt={img.public_id} className={styles.imagePreview} />
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveExistingImage(img.public_id)} className={styles.removeButton}>
                                        ✕
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {carData.newImages.length > 0 && (
                    <div className="mb-3">
                        <h5>New Images</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {carData.newImages.map((file, i) => (
                                <div key={i} className={styles.imageWrapper}>
                                    <img src={URL.createObjectURL(file)} alt={`preview-${i}`} className={styles.imagePreview} />
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveNewImage(i)} className={styles.removeButton}>
                                        ✕
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Button type="submit" variant="primary" disabled={loading} className={styles.submitButton}>
                    {loading ? "Saving..." : "Update Listing"}
                </Button>
            </Form>

            <div className={styles.alertContainer}>
                {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                {success && <Alert variant="success" dismissible onClose={() => setSuccess(false)}>Car updated successfully!</Alert>}
            </div>
        </div>
    );
};

export default EditCarForm;
