import React from "react";
import Navbar from "./Navbar";

function Header({ user, logout }) {
  return (
    <header>
      <div className="title">Регистрация-скелет</div>
      <Navbar user={user} logout={logout} />
    </header>
  );
}

export default Header;
