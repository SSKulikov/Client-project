import React from "react";
import Footer from "../widgets/Footer";
import { Outlet } from "react-router";
import Header from "../widgets/Header";

function Layout({ user, logout }) {
  return (
    <>
      <Header user={user} logout={logout} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
