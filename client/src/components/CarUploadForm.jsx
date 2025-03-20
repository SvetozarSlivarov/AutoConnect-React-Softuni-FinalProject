import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";

const CarUploadForm = () => {
  const { user } = useContext(AuthContext);
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // 📌 Обработка на полетата във формата
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };
  console.log("Current user state:", user);

  // 📌 Обработка на файловете (изображения)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCarData({ ...carData, images: files });
  };

  // 📌 Изпращане на формата
  const handleSubmit = async (e) => {
    console.log("User before submitting:", user);
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
      console.log(user._id);
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
      setTimeout(() => navigate("/catalog"), 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className="text-center mb-4">Sell Your Car</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Car listed successfully!</Alert>}

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

        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} required />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading} className={styles.submitButton}>
          {loading ? "Uploading..." : "Submit Listing"}
        </Button>
      </Form>
    </div>
  );
};

export default CarUploadForm;
