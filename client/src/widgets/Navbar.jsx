import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";

function Navbar({ user, logout }) {
  return (
    <>
      <Nav.Link as={Link} to="/">
        Главная страница
      </Nav.Link>
      {!user && (
        <>
          <Nav.Link as={Link} to="/registration">
            Зарегистрироваться
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Войти
          </Nav.Link>
        </>
      )}
      {!!user && (
        <>
          <Nav.Link onClick={logout}>Выйти</Nav.Link>
        </>
      )}
    </>
  );
}

export default Navbar;
