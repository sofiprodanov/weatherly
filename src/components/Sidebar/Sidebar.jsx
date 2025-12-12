import styles from "./Sidebar.module.css";
import { FaHome, FaMapMarkedAlt, FaRegStar, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import ThemeSwitch from "../UI/ThemeSwitch";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    navigate("/");
    setTimeout(() => {
      logout();
    }, 10);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/iconweatherly.svg" alt="Weatherly" className={styles.logoIcon} />
      </div>

      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${location.pathname === '/' ? styles.active : ''}`}>
          <Link to="/"><FaHome className={styles.menuIcon} /></Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname === '/favoritos' ? styles.active : ''}`}>
          <Link to="/favoritos"><FaRegStar className={styles.menuIcon} /></Link>
        </li>
      </ul>

      <div className={styles.bottomSection}>
        <div className={styles.settings}>
          <ThemeSwitch />
        </div>

        <div className={styles.authSection}>
          {user ? (
            <button onClick={handleLogout} className={styles.authButton} title="Cerrar sesión">
              <FaSignOutAlt className={styles.authIcon} />
            </button>
          ) : (
            <Link to="/login" className={`${styles.authButton} ${location.pathname === '/login' ? styles.active : ''}`} title="Iniciar sesión">
              <FaSignInAlt className={styles.authIcon} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;