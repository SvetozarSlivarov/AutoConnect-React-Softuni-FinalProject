import React from "react";
import { Link } from "react-router-dom";
import styles from '../public/styles/Footer.module.css'; // 🆕 модулен CSS

const Footer = () => {
  return (
    <footer className={`footer bg-dark text-light py-5 ${styles.footer}`}>
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">About AutoCONNECT</h5>
            <p>AutoCONNECT is the leading platform connecting car buyers and sellers.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/catalog" className="text-light text-decoration-none">Shop</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/blog" className="text-light text-decoration-none">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <p><i className="fas fa-map-marker-alt me-2"></i>123 Car Street, Motor City, USA</p>
            <p><i className="fas fa-phone me-2"></i>+1 (555) 123-4567</p>
            <p><i className="fas fa-envelope me-2"></i>support@autoconnect.com</p>
            <div className="social-icons mt-3">
              <a href="#" className="text-light me-3"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-light"><i className="fab fa-linkedin fa-lg"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 AutoCONNECT. All rights reserved.</p>
          <div className="text-center mt-4">
            <p className="mb-0">
              <Link to="/privacy-policy" className={`${styles.policyTermsLink} ${styles.textLink}`}>
                Privacy Policy
              </Link>
              <span className="mx-2">|</span>
              <Link to="/terms-and-conditions" className={`${styles.policyTermsLink} ${styles.textLink}`}>
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
