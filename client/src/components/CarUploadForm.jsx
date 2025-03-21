import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../public/styles/CarUploadForm.module.css";

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

  const featureCategories = {
    "Comfort": [
      "Air Conditioning",
      "Climate Control",
      "Heated Seats",
      "Heated Steering Wheel",
      "Leather Interior",
      "Seat Memory",
      "Sunroof",
      "Panoramic Sunroof",
      "Split Folding Rear Seats",
      "Armrest",
      "Adjustable Steering Wheel",
      "Rear Air Vents",
      "Ventilated Seats"
    ],
    "Safety": [
      "ABS (Anti-lock Braking System)",
      "Airbags - Driver",
      "Airbags - Passenger",
      "Airbags - Side",
      "Blind Spot Monitoring",
      "Lane Departure Warning",
      "Lane Assist",
      "Hill Start Assist",
      "Parking Sensors - Front",
      "Parking Sensors - Rear",
      "Rear View Camera",
      "Backup Camera",
      "Reversing Camera",
      "Daytime Running Lights",
      "Fog Lights",
      "LED Headlights",
      "Traffic Sign Recognition",
      "ESP (Electronic Stability Program)",
      "Tyre Pressure Monitoring System",
      "Adaptive Cruise Control",
      "Auto Emergency Braking",
      "Traction Control"
    ],
    "Technology": [
      "Bluetooth",
      "USB Port",
      "Wireless Charging",
      "Navigation System",
      "Apple CarPlay",
      "Android Auto",
      "Satellite Radio",
      "Voice Control",
      "Multi-Function Steering Wheel",
      "Keyless Entry",
      "Start/Stop System",
      "Remote Central Locking",
      "Heads-Up Display",
      "Touchscreen Display",
      "Digital Dashboard",
      "Smartphone Integration"
    ],
    "Exterior": [
      "Alloy Wheels",
      "Steel Wheels",
      "Electric Mirrors",
      "Heated Mirrors",
      "Electric Windows",
      "Automatic Headlights",
      "Rain Sensors",
      "Tow Bar",
      "Roof Rails",
      "Power Tailgate",
      "Hands-Free Trunk Access",
      "Tinted Windows",
      "Chrome Trim",
      "Sunshade",
      "Sport Body Kit"
    ],
    "Drivetrain & Handling": [
      "FWD (Front-Wheel Drive)",
      "RWD (Rear-Wheel Drive)",
      "AWD (All-Wheel Drive)",
      "4WD (4x4)",
      "Limited Slip Differential",
      "Sport Suspension",
      "Adaptive Suspension",
      "Hydraulic Steering",
      "Electric Steering",
      "Adjustable Suspension",
      "Paddle Shifters"
    ],
    "Lighting & Visibility": [
      "Bi-Xenon Headlights",
      "Matrix LED",
      "Cornering Lights",
      "Automatic High Beam",
      "Rear Fog Lights",
      "Front Fog Lights",
      "Light Sensor",
      "Headlight Washers"
    ],
    "Interior": [
      "Ambient Lighting",
      "Leather Steering Wheel",
      "Wood Trim",
      "Aluminium Trim",
      "Third Row Seating",
      "Fold-Flat Seats",
      "ISOFIX (Child Seat Anchors)",
      "Sun Blinds",
      "Floor Mats",
      "Cargo Cover"
    ],
    "Vehicle Details": [
      "2 Doors",
      "3 Doors",
      "4 Doors",
      "5 Doors",
      "2 Seats",
      "4 Seats",
      "5 Seats",
      "7 Seats",
      "8+ Seats",
      "Left-Hand Drive",
      "Right-Hand Drive",
      "Euro 4",
      "Euro 5",
      "Euro 6",
      "Original Paint",
      "Garage Kept",
      "Non-Smoker Vehicle"
    ]
  };
  



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
      console.log(token)
      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ⬅ важно: трябва да е token от user или AuthContext
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
            <div
              id="features-collapse"
              style={{
                marginTop: "15px",
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              {Object.entries(featureCategories).map(([category, features]) => (
                <div key={category} style={{ marginBottom: "20px" }}>
                  <h6 style={{ borderBottom: "1px solid #ddd" }}>{category}</h6>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
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
                          setCarData((prevData) => ({
                            ...prevData,
                            features: checked
                              ? [...prevData.features, value]
                              : prevData.features.filter((f) => f !== value),
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
