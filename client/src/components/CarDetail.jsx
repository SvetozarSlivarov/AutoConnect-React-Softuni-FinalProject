import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../public/styles/DetailPage.module.css";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${id}`);
        if (!response.ok) throw new Error("Car not found");
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/cars/${car._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to delete");
        navigate("/catalog");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  const isOwner = user && car?.owner === user._id;
  console.log(isOwner, user, car?.owner)

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!car) return null;

  return (
    <div className={`container ${styles.container}`}>
      <div className="row">
        <div className="col-lg-6">
          <img
            src={car.images?.[0]?.url || "/placeholder.jpg"}
            className={styles.mainImage}
            alt={car.model}
          />
          <div className={styles.imageGallery}>
            {car.images?.slice(1).map((img, index) => (
              <img
                key={index}
                src={img.url}
                className={styles.galleryImage}
                alt={`Gallery ${index}`}
              />
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <h2>{car.brand} {car.model}</h2>
          <h3 className="text-primary">${car.price}</h3>
          <p className="text-muted">
            Condition: <strong>{car.condition}</strong>
          </p>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">Year: {car.year}</li>
            <li className="list-group-item">Mileage: {car.mileage} km</li>
            <li className="list-group-item">Fuel Type: {car.fuelType}</li>
            <li className="list-group-item">Transmission: {car.transmission}</li>
            {car.drivetrain && <li className="list-group-item">Drivetrain: {car.drivetrain}</li>}
            <li className="list-group-item">Power: {car.power} HP</li>
          </ul>

          {/* Owner-only actions */}
          {isOwner && (
            <div className="d-flex gap-2 car-detail-buttons mb-3">
              <Link to={`/cars/edit/${car._id}`} className="btn btn-warning w-50">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger w-50">
                Delete
              </button>
            </div>
          )}

          <div className={styles.sellerInfo}>
            <h5>Seller Information</h5>
            <p><strong>Name:</strong> {car.owner?.firstName || "N/A"} {car.owner?.lastName || ""}</p>
            <p><strong>Email:</strong> {car.owner?.email || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
