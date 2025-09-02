import { NavLink, Outlet } from "react-router-dom";
import styles from "../styles/Header.module.css";
import "../styles/theme.css";

export default function Layout(){
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.navWrap}>
            <div className={styles.brand}>
              <span className={styles.logo} role="img" aria-label="rocket">🚀</span>
              <span className={styles.title}>Space Travel</span>
            </div>
            <nav className={styles.nav}>
              <NavLink to="/" end className={({isActive})=>isActive?styles.active:styles.link}>
                <span className="emoji-icon" role="img" aria-label="house">🏠 </span>Home
              </NavLink>
              <NavLink to="/spacecrafts" className={({isActive})=>isActive?styles.active:styles.link}>
                <span className="emoji-icon" role="img" aria-label="ship">🛰️ </span>Spacecrafts
              </NavLink>
              <NavLink to="/planets" className={({isActive})=>isActive?styles.active:styles.link}>
                <span className="emoji-icon" role="img" aria-label="earth">🌍 </span>Planets
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}