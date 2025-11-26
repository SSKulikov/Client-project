import React from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";

function Navbar({ user, logout }) {
  return (
    <>
      {!user && (
        <>
          <Button as={Link} to="/registration">
            Зарегистрироваться
          </Button>
          <Button as={Link} to="/login">
            Войти
          </Button>
        </>
      )}
      {!!user && (
        <>
          <Button onClick={logout}>Выйти</Button>
        </>
      )}
    </>
  );
}

export default Navbar;
