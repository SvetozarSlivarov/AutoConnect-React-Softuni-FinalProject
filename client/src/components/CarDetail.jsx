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
	const [owner, setOwner] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	useEffect(() => {
		const fetchCarAndOwner = async () => {
			try {
				const carRes = await fetch(`http://localhost:5000/api/cars/${id}`);
				if (!carRes.ok) throw new Error("Car not found");
				const carData = await carRes.json();
				setCar(carData);

				if (user?.watchlist?.includes(carData._id)) {
					setIsInWatchlist(true);
				}

				if (carData.owner) {
					const ownerRes = await fetch(`http://localhost:5000/api/users/${carData.owner}`);
					if (!ownerRes.ok) throw new Error("Owner not found");
					const ownerData = await ownerRes.json();
					setOwner(ownerData);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCarAndOwner();
	}, [id, user]);

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

	const handleToggleWatchlist = async () => {
		if (!token) {
			alert("You must be logged in to use the watchlist.");
			return;
		}

		try {
			console.log(token);
			console.log(car._id);
			const res = await fetch('http://localhost:5000/api/users/watchlist', {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ carId: car._id }),
			});

			if (!res.ok) throw new Error("Failed to update watchlist");

			const result = await res.json();
			setIsInWatchlist(result.status === "added");
		} catch (err) {
			console.error("Watchlist error:", err.message);
		}
	};

	const isOwner = user && car?.owner === user._id;

	if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>Loading...</div>;
	if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
	if (!car) return null;

	return (
		<div className={`container ${styles.container}`}>
			<div className="row">
				<div className="col-lg-6">
					<img
						src={car.images?.[selectedImageIndex]?.url || "/placeholder.jpg"}
						className={styles.mainImage}
						alt={car.model}
					/>
					<div className={styles.imageGallery}>
						{car.images?.map((img, index) => (
							<img
								key={index}
								src={img.url}
								className={`${styles.galleryImage} ${index === selectedImageIndex ? styles.activeThumb : ""}`}
								alt={`Gallery ${index}`}
								onClick={() => setSelectedImageIndex(index)}
							/>
						))}
					</div>
					<div className={`${styles.descriptionWrapper} d-none d-lg-block`}>
						<p className={styles.descriptionText}>{car.description}</p>
					</div>
				</div>

				<div className="col-lg-6">
					<h2>{car.brand} {car.model}</h2>
					<div className={`${styles.descriptionWrapper} d-block d-lg-none`}>
						<p className={styles.descriptionText}>{car.description}</p>
					</div>
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
					{user && (
						isOwner ? (
							<div className="d-flex gap-2 car-detail-buttons mb-3">
								<Link to={`/cars/edit/${car._id}`} className="btn btn-warning w-50">
									Edit
								</Link>
								<button onClick={handleDelete} className="btn btn-danger w-50">
									Delete
								</button>
							</div>
						) : (
							<div className="mb-3">
								<button
									onClick={handleToggleWatchlist}
									className={`btn ${isInWatchlist ? "btn-outline-secondary" : "btn-outline-primary"} w-100`}
								>
									{isInWatchlist ? "✓ Remove from Watchlist" : "★ Add to Watchlist"}
								</button>
							</div>
						)
					)}


					<div className={styles.sellerInfo}>
						<h5>Seller Information</h5>
						{owner ? (
							<>
								<p><strong>Name:</strong> {owner.firstName} {owner.lastName}</p>
								<p><strong>Email:</strong> {owner.email}</p>
							</>
						) : (
							<p>Owner information not available.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarDetailPage;
