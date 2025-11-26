import React from "react";
import Navbar from "./Navbar";
import "./Header.module.css";
import { Col, Container, Row } from "react-bootstrap";

function Header({ user, logout }) {
  return (
    <>
    <header>
      <div className="title">Регистрация-скелет</div>
      <Navbar user={user} logout={logout} />
    </header>
    </>
  );
}

export default Header;
