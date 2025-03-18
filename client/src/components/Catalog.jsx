import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/styles/Catalog.css";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const filterCars = (searchTerm, sortBy) => {
    let filtered = cars.filter((car) =>
      car.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "year") {
      filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredCars(filtered);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterCars(value, sort);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    filterCars(search, value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Explore Our Cars</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by brand..."
          className="form-control w-50"
          value={search}
          onChange={handleSearch}
        />
        <select className="form-select w-25" value={sort} onChange={handleSort}>
          <option value="price">Sort by Price</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <div className="row">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="col-lg-4 col-md-6 mb-4" key={car._id}>
              <div className="card car-card">
                <img
                  src={car.imageUrl}
                  className="card-img-top car-image"
                  alt={`${car.make} ${car.model}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{car.make} {car.model}</h5>
                  <p className="card-text"><strong>Year:</strong> {car.year}</p>
                  <p className="card-text"><strong>Price:</strong> ${car.price}</p>
                  <Link to={`/cars/${car._id}`} className="btn btn-primary w-100">
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
