import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";

const CarUploadForm = () => {
  const { user } = useContext(AuthContext);
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
    doors: "",
    seats: "",
    drivetrain: "FWD",
    features: [],
    images: [],
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
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
      Object.keys(carData).forEach((key) => {
        if (key === "images") {
          carData.images.forEach((image) => formData.append("images", image));
        } else if (key === "features") {
          formData.append("features", JSON.stringify(carData.features));
        } else {
          formData.append(key, carData[key]);
        }
      });
      formData.append("owner", user._id);

      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
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

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" name="brand" value={carData.brand} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control type="text" name="model" value={carData.model} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" name="year" value={carData.year} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control type="number" name="price" value={carData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Select name="fuelType" value={carData.fuelType} onChange={handleChange}>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
            <option>CNG</option>
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
          <Form.Label>Power (HP)</Form.Label>
          <Form.Control type="number" name="power" value={carData.power} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mileage (km)</Form.Label>
          <Form.Control type="number" name="mileage" value={carData.mileage} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" name="color" value={carData.color} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={carData.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Select name="condition" value={carData.condition} onChange={handleChange}>
            <option>New</option>
            <option>Used</option>
          </Form.Select>
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Images (max 5)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} accept="image/*" />
        </Form.Group>

        {/* Preview */}
        {carData.images.length > 0 && (
          <div className="mb-3">
            <h5>Selected Images</h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {carData.images.map((file, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
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

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          minWidth: "250px",
        }}
      >
        {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
        {success && <Alert variant="success" dismissible onClose={() => setSuccess(false)}>Car listed successfully!</Alert>}
      </div>
    </div>
  );
};

export default CarUploadForm;
