import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../public/styles/Navbar.css'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">AutoCONNECT</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalog">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button className="star-profile btn btn-outline-secondary me-2">
                            <i className="fas fa-star"></i>
                        </button>
                        <div className="dropdown">
                            <button className="star-profile btn btn-outline-secondary dropdown-toggle me-2" type="button" data-bs-toggle="dropdown">
                                <i className="fas fa-user"></i>
                            </button>
                            <ul className="dropdown-menu">
                                {user ? (
                                    <>
                                        <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        {user.role === "admin" && (
                                            <li><Link className="dropdown-item" to="/admin">Admin</Link></li>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                        <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;