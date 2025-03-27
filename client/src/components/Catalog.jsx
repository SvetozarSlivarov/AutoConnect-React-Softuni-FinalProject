import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../public/styles/Catalog.module.css";
import Filters from "./Filters";
import SortSelector from "./SortSelector";

const Catalog = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sort, setSort] = useState("default");
    const [showFilters, setShowFilters] = useState(false);

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

                // Default sort only on initial load
                const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setFilteredCars(sorted);
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

        switch (sort) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "year-asc":
                filtered.sort((a, b) => a.year - b.year);
                break;
            case "year-desc":
                filtered.sort((a, b) => b.year - a.year);
                break;
            case "createdAt-asc":
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "createdAt-desc":
            case "default":
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        setFilteredCars(filtered);
    };

    return (
        <div className={`container mt-5 ${styles.catalogContainer}`}>
            <h2 className={`text-center mb-4 ${styles.catalogTitle}`}>Explore Our Cars</h2>

            <div className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center mb-3">
                <input
                    type="text"
                    name="brand"
                    placeholder="Search by brand..."
                    className="form-control w-50"
                    value={filters.brand}
                    onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                />
                <SortSelector sort={sort} setSort={setSort} />
                <button className="btn btn-outline-secondary" onClick={() => setShowFilters(prev => !prev)}>
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {showFilters && (
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            )}

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