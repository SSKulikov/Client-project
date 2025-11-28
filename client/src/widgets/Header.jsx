import React from "react";
import Navbar from "./Navbar";
import styles from "./Header.module.css";

function Header({ user, logout }) {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <img
          src="https://static.rfstat.com/logo-presets/2246/thumbnail_2ea47c0f9382_1x.webp"
          alt="Логотип сервиса аренды"
        />
        <span className={styles.brandText}>EasyStay</span>
      </a>
      <Navbar className={styles.navMenu} user={user} logout={logout} />
    </header>
  );
}

export default Header;
