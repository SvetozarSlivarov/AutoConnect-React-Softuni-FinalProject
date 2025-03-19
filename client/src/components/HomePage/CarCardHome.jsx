import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="col-lg-6 col-md-12">
      <div className="custom-car-card">
        <div className="row g-0">

          <div className="col-6 custom-card-image">
            <img src={car.image} className="custom-car-image" alt={car.name} />
          </div>

          <div className="col-6 custom-card-body">
            <h3 className="custom-car-title">{car.name}</h3>
            <p className="custom-car-price">{car.price}</p>
            <ul className="custom-car-info">
              <li><i className="fas fa-calendar"></i> {car.year}</li>
              <li><i className="fas fa-gauge"></i> {car.mileage}</li>
              <li><i className="fas fa-car"></i> {car.transmission}</li>
              <li><i className="fas fa-gas-pump"></i> {car.fuel}</li>
              <li><i className="fas fa-palette"></i> {car.color}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;