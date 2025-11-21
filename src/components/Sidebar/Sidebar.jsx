import styles from "./Sidebar.module.css";
import { FaHome, FaMapMarkedAlt, FaRegStar } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import ThemeSwitch from "../UI/ThemeSwitch"; // ← Esta línea debe ser así

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <img
          src="/iconweatherly.svg"
          alt="Weatherly"
          className={styles.logoIcon}
        />
      </div>

      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${location.pathname === '/' ? styles.active : ''}`}
        >
          <Link to="/">
            <FaHome className={styles.menuIcon} />
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${location.pathname === '/favoritos' ? styles.active : ''}`}
        >
          <Link to="/favoritos">
            <FaRegStar className={styles.menuIcon} />
          </Link>
        </li>
        <li className={styles.menuItem}>
          <FaMapMarkedAlt className={styles.menuIcon} />
        </li>
      </ul>

      <div className={styles.settings}>
        <ThemeSwitch /> {/* ← Así se usa el componente */}
      </div>
    </nav>
  );
};

export default Sidebar;