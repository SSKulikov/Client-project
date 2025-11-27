import React from "react";
import Footer from "../widgets/Footer";
import { Outlet } from "react-router";
import Header from "../widgets/Header";
import { Container } from "react-bootstrap";

function Layout({ user, logout, favoriteCount }) {
  return (
    <>
      <Container>
        <Header user={user} logout={logout} favoriteCount={favoriteCount} />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
