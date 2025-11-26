import React from "react";
import Footer from "../widgets/Footer";
import { Outlet } from "react-router";
import Header from "../widgets/Header";
import { Container } from "react-bootstrap";

function Layout({ user, logout }) {
  return (
    <>
      <Container>
        <Header user={user} logout={logout} />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
