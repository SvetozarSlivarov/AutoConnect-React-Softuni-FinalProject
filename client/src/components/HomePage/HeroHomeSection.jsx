import styles from '../../public/styles/HomeHeroSection.module.css';
import { Link } from "react-router-dom";

const HeroHomeSection = () => {
  return (
    <header className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.heroTitle}>Welcome to AutoCONNECT</h1>
        <p className={styles.heroText}>Connecting Buyers and Sellers to Drive Deals Forward!</p>

        <Link to="/catalog" className={`btn btn-light btn-lg ${styles.btnBrowse}`}>
          Browse Cars
        </Link>

        <Link to="/cars/add" className={`btn btn-light btn-lg ${styles.btnSell}`}>
          Sell Car
        </Link>
      </div>
    </header>
  );
};

export default HeroHomeSection;
