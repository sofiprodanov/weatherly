import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";
import { Outlet } from 'react-router';

/**
 * Estructura principal de la web.
 * Contiene el Sidebar y el Navbar.
 */

const Layout = () => {
 
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebarContainer}>
        <Sidebar />
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.navbarContainer}>
            <Navbar />
          </div>
          <div className={styles.logo}>
            <span className={styles.logoText}>Weatherly</span>
          </div>
        </div>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;