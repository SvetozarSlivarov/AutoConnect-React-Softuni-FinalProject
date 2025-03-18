import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/styles/DetailPage.css";

const CarDetailPage = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cars/${id}`);
                if (!response.ok) {
                    throw new Error("Car not found");
                }
                const data = await response.json();
                setCar(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <img src={car.images[0]} className="img-fluid main-image" alt={car.model} />
                    <div className="image-gallery mt-3">
                        {car.images.slice(1).map((img, index) => (
                            <img key={index} src={img} className="gallery-image" alt={`Gallery ${index}`} />
                        ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    <h2>{car.make} {car.model}</h2>
                    <h3 className="text-primary">${car.price}</h3>
                    <p className="text-muted">Condition: <strong>{car.condition}</strong></p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Year: {car.year}</li>
                        <li className="list-group-item">Mileage: {car.mileage} km</li>
                        <li className="list-group-item">Fuel Type: {car.fuelType}</li>
                        <li className="list-group-item">Transmission: {car.transmission}</li>
                        <li className="list-group-item">Drivetrain: {car.drivetrain}</li>
                        <li className="list-group-item">Power: {car.power} HP</li>
                        <li className="list-group-item">Seats: {car.seats}</li>
                        <li className="list-group-item">Doors: {car.doors}</li>
                    </ul>
                    <button className="btn btn-success mt-3 w-100">Save Listing</button>
                    <div className="seller-info mt-4 p-3 bg-light border rounded">
                        <h5>Seller Information</h5>
                        <p><strong>Name:</strong> {car.owner.firstName} {car.owner.lastName}</p>
                        <p><strong>Email:</strong> {car.owner.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;