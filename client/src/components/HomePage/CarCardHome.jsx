import React from "react";
import { Link } from "react-router-dom";
import styles from "../../public/styles/CarCardHome.module.css";

const CarCard = ({ car }) => {
  const imageUrl = Array.isArray(car.images) ? car.images[0]?.url : "../../public/pictures/No_image_available.svg.png";

  return (
    <div className="col-lg-6 col-md-12 mb-4">
      <Link to={`/cars/${car._id}`} className={styles.cardLink}>
        <div className={styles.carCard}>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt={`${car.brand} ${car.model}`} className={styles.carImage} />
          </div>
          <div className={styles.details}>
            <h3 className={styles.title}>{car.brand} {car.model}</h3>
            <p className={styles.price}>${car.price?.toLocaleString()}</p>
            <ul className={styles.infoList}>
              <li>{car.year}</li>
              <li>{car.mileage} km</li>
              <li>{car.transmission}</li>
              <li>{car.fuelType}</li>
              <li>{car.color}</li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
