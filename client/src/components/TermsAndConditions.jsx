import React from "react";
import styles from "../public/styles/TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <header className={styles.header}>
        <div className="container text-center">
          <h1>Terms and Conditions</h1>
          <p>Please read these terms and conditions carefully before using AutoCONNECT.</p>
        </div>
      </header>

      <main className="container py-5">
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>Welcome to AutoCONNECT! By accessing or using our platform, you agree to be bound by these terms and conditions.</p>
        </section>

        <section className={styles.section}>
          <h2>2. User Responsibilities</h2>
          <ul>
            <li>Provide accurate and up-to-date information when creating an account.</li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>Comply with all applicable laws while using the platform.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Prohibited Activities</h2>
          <p>Users are prohibited from:</p>
          <ul>
            <li>Posting false or misleading information.</li>
            <li>Engaging in fraudulent or deceptive practices.</li>
            <li>Violating the intellectual property rights of others.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Limitation of Liability</h2>
          <p>AutoCONNECT is not responsible for any direct, indirect, incidental, or consequential damages arising from the use of our platform.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Modifications to Terms</h2>
          <p>We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on this page.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Governing Law</h2>
          <p>These terms and conditions are governed by the laws of the jurisdiction in which AutoCONNECT operates.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Contact Us</h2>
          <p>If you have any questions about these terms, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:support@autoconnect.com">support@autoconnect.com</a></li>
            <li><strong>Address:</strong> 123 Car Street, Motor City, USA</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditions;
