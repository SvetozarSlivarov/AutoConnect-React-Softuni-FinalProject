import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../public/styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className="container">
        <Link className={`navbar-brand fw-bold ${styles.navbarBrand}`} to="/">AutoCONNECT</Link>

        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
        </button>

        <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarNav">
          <ul className={`navbar-nav ms-auto ${styles.navbarNav}`}>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/catalog">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/contact">Contact</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="/cars/add">Sell Car</Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            <button className={`btn btn-outline-secondary me-2 ${styles.starProfile}`}>
              <i className="fas fa-star"></i>
            </button>

            <div className="dropdown">
              <button
                className={`btn btn-outline-secondary dropdown-toggle me-2 ${styles.starProfile}`}
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user"></i>
              </button>
              <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                {user ? (
                  <>
                    <li><Link className={`dropdown-item ${styles.dropdownItem}`} onClick={logout}>Logout</Link></li>
                    <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="/profile">Profile</Link></li>
                    {user.role === "admin" && (
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="/admin">Admin</Link></li>
                    )}
                  </>
                ) : (
                  <>
                    <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="/login">Login</Link></li>
                    <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="/register">Register</Link></li>
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
