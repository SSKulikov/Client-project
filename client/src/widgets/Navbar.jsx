import React from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";
import styles from "./Navbar.module.css";

function Navbar({ user, logout, favoriteCount, className }) {
  const navClassName = [styles.nav, className].filter(Boolean).join(" ");

  return (
    <Nav className={navClassName} navbarScroll>
      <Nav.Link className={styles.link} as={Link} to="/">
        Главная
      </Nav.Link>

      {!user && (
        <div className={styles.actions}>
          <Nav.Link className={styles.link} as={Link} to="/registration">
            Регистрация
          </Nav.Link>
          <Button as={Link} to="/login" className={styles.button}>
            Войти
          </Button>
        </div>
      )}

      {!!user && (
        <div className={styles.actions}>
          {user.type === "landlord" && (
            <Button as={Link} to="/landlord" className={styles.button}>
              Мои объявления
            </Button>
          )}
          {user.type === "locataire" && (
            <Button as={Link} to="/locataire" className={styles.button}>
              Избранные {favoriteCount > 0 && `(${favoriteCount})`}
            </Button>
          )}
          <Button onClick={logout} className={`${styles.button} ${styles.secondary}`}>
            Выйти
          </Button>
        </div>
      )}
    </Nav>
  );
}

export default Navbar;
