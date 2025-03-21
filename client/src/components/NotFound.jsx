import React from "react";
import { Link } from "react-router-dom";
import styles from '../public/styles/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notfound}>
        <div className={styles.notfoundEmoji}></div>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! Page Not Be Found</h2>
        <p className={styles.description}>
          Sorry but the page you are looking for does not exist, has been removed, name changed or is temporarily unavailable.
        </p>
        <Link to="/" className={styles.link}>Back to homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
