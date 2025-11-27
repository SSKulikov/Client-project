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
        {user.type === "landlord" && (
            <Button as={Link} to="/landlord" className="me-2">
              Мои объявления
            </Button>
          )}
          {user.type === "locataire" && (
            <Button as={Link} to="/locataire" className="me-2">
              Поиск жилья
            </Button>
          )}
          <Button onClick={logout}>Выйти</Button>
        </>
      )}
    </>
  );
}

export default Navbar;
