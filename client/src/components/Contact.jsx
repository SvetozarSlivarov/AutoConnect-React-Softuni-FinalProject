import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import GoogleMapComponent from "./GoogleMap";
import styles from "../public/styles/Contact.module.css";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className={styles.contactContainer}>
            <h2>Get in Touch</h2>
            <div className={styles.contactContent}>
                <div className={styles.contactInfo}>
                    <h4>Contact Information</h4>
                    <p><FaMapMarkerAlt className={styles.icon} /> 123 Car Street, Motor City, USA</p>
                    <div className={styles.mapContainer}><GoogleMapComponent /></div>
                    <p><FaPhoneAlt className={styles.icon} /> +1 (555) 123-4567</p>
                    <p><FaEnvelope className={styles.icon} /> support@autoconnect.com</p>
                    <h5>Follow Us</h5>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialLink}><FaFacebook /></a>
                        <a href="#" className={styles.socialLink}><FaTwitter /></a>
                        <a href="#" className={styles.socialLink}><FaInstagram /></a>
                        <a href="#" className={styles.socialLink}><FaLinkedin /></a>
                    </div>
                </div>

                <div className={styles.formBox}>
                    <h4>Send Us a Message</h4>
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <input type="text" name="name" placeholder="Your Name" value={formData.name}
                            onChange={handleChange} className="form-control mb-3" required />
                        <input type="email" name="email" placeholder="Your Email" value={formData.email}
                            onChange={handleChange} className="form-control mb-3" required />
                        <textarea name="message" placeholder="Your Message" value={formData.message}
                            onChange={handleChange} rows="4" className="form-control mb-3" required></textarea>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                    {submitted && <p className={styles.successMessage}>Your message has been sent successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default Contact;