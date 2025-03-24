import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../public/styles/Catalog.module.css";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [sort, setSort] = useState("price");

  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    priceFrom: "",
    priceTo: "",
    fuelType: "",
    transmission: "",
    condition: "",
    color: "",
    features: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  useEffect(() => {
    filterCars();
  }, [filters, sort]);

  const filterCars = () => {
    let filtered = [...cars];

    if (filters.brand) filtered = filtered.filter(car => car.brand?.toLowerCase().includes(filters.brand.toLowerCase()));
    if (filters.model) filtered = filtered.filter(car => car.model?.toLowerCase().includes(filters.model.toLowerCase()));
    if (filters.year) filtered = filtered.filter(car => car.year?.toString() === filters.year);
    if (filters.priceFrom) filtered = filtered.filter(car => car.price >= parseFloat(filters.priceFrom));
    if (filters.priceTo) filtered = filtered.filter(car => car.price <= parseFloat(filters.priceTo));
    if (filters.fuelType) filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    if (filters.transmission) filtered = filtered.filter(car => car.transmission === filters.transmission);
    if (filters.condition) filtered = filtered.filter(car => car.condition === filters.condition);
    if (filters.color) filtered = filtered.filter(car => car.color?.toLowerCase() === filters.color.toLowerCase());

    if (filters.features.length > 0) {
      filtered = filtered.filter(car =>
        filters.features.every(f => car.features?.includes(f))
      );
    }

    if (sort === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "year") {
      filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const updatedFeatures = checked
        ? [...prev.features, value]
        : prev.features.filter(f => f !== value);
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className={`container mt-5 ${styles.catalogContainer}`}>
      <h2 className={`text-center mb-4 ${styles.catalogTitle}`}>Explore Our Cars</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            name="brand"
            placeholder="Search by brand..."
            className="form-control"
            value={filters.brand}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={sort} onChange={handleSort}>
            <option value="price">Sort by Price</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
      </div>

      {/* Филтри */}
      <div className="row mb-4">
        <div className="col-md-2">
          <input name="model" className="form-control" placeholder="Model" value={filters.model} onChange={handleFilterChange} />
        </div>
        <div className="col-md-2">
          <input name="year" className="form-control" placeholder="Year" value={filters.year} onChange={handleFilterChange} />
        </div>
        <div className="col-md-2">
          <input name="priceFrom" className="form-control" placeholder="Price From" value={filters.priceFrom} onChange={handleFilterChange} />
        </div>
        <div className="col-md-2">
          <input name="priceTo" className="form-control" placeholder="Price To" value={filters.priceTo} onChange={handleFilterChange} />
        </div>
        <div className="col-md-2">
          <select name="fuelType" className="form-select" value={filters.fuelType} onChange={handleFilterChange}>
            <option value="">Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
            <option>CNG</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="transmission" className="form-select" value={filters.transmission} onChange={handleFilterChange}>
            <option value="">Transmission</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-2">
          <select name="condition" className="form-select" value={filters.condition} onChange={handleFilterChange}>
            <option value="">Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
        </div>
        <div className="col-md-2">
          <input name="color" className="form-control" placeholder="Color" value={filters.color} onChange={handleFilterChange} />
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <strong>Features:</strong>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {["Air Conditioning", "Sunroof", "Bluetooth", "Navigation", "Backup Camera"].map((feature) => (
            <div key={feature} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={feature}
                checked={filters.features.includes(feature)}
                onChange={handleFeatureChange}
                id={`feature-${feature}`}
              />
              <label className="form-check-label" htmlFor={`feature-${feature}`}>
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Карти с коли */}
      <div className="row">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="col-lg-4 col-md-6 mb-4" key={car._id}>
              <div className={`card ${styles["car-card"]}`}>
                <img
                  src={car.images?.[0]?.url || "src/public/pictures/No_image_available.svg.png"}
                  className={`card-img-top ${styles["car-image"]}`}
                  alt={`${car.brand} ${car.model}`}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text"><strong>Year:</strong> {car.year}</p>
                  <p className="card-text"><strong>Price:</strong> ${car.price}</p>
                  <Link to={`/cars/${car._id}`} className="btn btn-primary w-100 mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No cars found</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
