import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <span className={styles.brand}>EasyStay</span>
          <span>© {new Date().getFullYear()} Лучшие решения для аренды.</span>
          <div className={styles.links}>
            <a href="/" className={styles.link}>
              Политика
            </a>
            <a href="/" className={styles.link}>
              Контакты
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
