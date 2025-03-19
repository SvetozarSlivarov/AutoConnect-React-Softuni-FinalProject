import React from "react";
import '../../public/styles/Footer.css'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">About AutoCONNECT</h5>
                        <p>AutoCONNECT is the leading platform connecting car buyers and sellers.</p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/catalog" className="text-light text-decoration-none">Shop</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
                            <li><a href="/blog" className="text-light text-decoration-none ">Blog</a></li>
                        </ul>
                    </div>

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
                <div className="text-center mt-4">
                    <p className="mb-0">&copy; 2025 AutoCONNECT. All rights reserved.</p>
                    <div className="text-center mt-4">
                        <p className="mb-0">
                            <a href="/privacy-policy" className="policy-terms-link text-link">Privacy Policy</a>
                            <span>|</span>
                            <a href="/terms-and-conditions" className="policy-terms-link text-link">Terms &
                                Conditions</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
