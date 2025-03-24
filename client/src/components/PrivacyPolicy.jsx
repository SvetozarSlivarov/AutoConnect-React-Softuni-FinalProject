import React from "react";
import styles from "../public/styles/PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
    return (
        <div className={styles.privacyContainer}>
            <header className={styles.header}>
                <div className={styles.textContainer}>
                    <h1>Privacy Policy</h1>
                    <p>Your privacy is critically important to us.</p>
                </div>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.section}>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to AutoCONNECT! Your privacy is critically important to us.
                        This privacy policy outlines how we collect, use, and protect your personal information when you use our platform.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Information We Collect</h2>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and payment details when you register or perform transactions.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including IP address, browser type, and device information.</li>
                        <li><strong>Cookies and Tracking Technologies:</strong> Data collected through cookies to improve your experience.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use the information collected to:</p>
                    <ol>
                        <li>Provide and operate our platform.</li>
                        <li>Facilitate transactions between buyers and sellers.</li>
                        <li>Improve user experience through personalized recommendations.</li>
                        <li>Communicate updates, promotions, and support.</li>
                    </ol>
                </section>

                <section className={styles.section}>
                    <h2>4. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access and update your personal information.</li>
                        <li>Request the deletion of your data.</li>
                        <li>Opt-out of marketing communications.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;