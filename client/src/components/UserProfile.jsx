import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../public/styles/UserProfile.module.css";

const UserProfile = () => {
    const { user, token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user._id) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/users/${user._id}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Error loading profile:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, token]);

    // Докато user не е готов, не рендираме нищо
    if (!user || !user._id) return <div className="text-center mt-5">Loading user...</div>;

    if (loading) return <div className="text-center mt-5">Loading profile...</div>;
    if (!profile) return <div className="text-center text-danger">Profile not found</div>;

    return (
        <div className={`container ${styles.profileContainer}`}>
            <h2 className="text-center mb-4">Welcome, {profile.user.firstName}!</h2>

            <section className={styles.section}>
                <h4>Your Listings</h4>
                <div className="row">
                    {profile.createdCars.map((car) => (
                        <div key={car._id} className="col-md-4 mb-3">
                            <div className={styles.card} onClick={() => navigate(`/cars/${car._id}`)}>
                                <img src={car.images?.[0]?.url || "/placeholder.jpg"} alt={car.model} />
                                <div>
                                    <strong>{car.brand} {car.model}</strong>
                                    <p>${car.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h4>Saved Cars</h4>
                <div className="row">
                    {profile.watchlistCars.length > 0 ? (
                        profile.watchlistCars.map((car) => (
                            <div key={car._id} className="col-md-4 mb-3">
                                <div className={styles.card} onClick={() => navigate(`/cars/${car._id}`)}>
                                    <img src={car.images?.[0]?.url || "/placeholder.jpg"} alt={car.model} />
                                    <div>
                                        <strong>{car.brand} {car.model}</strong>
                                        <p>${car.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No saved cars.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
