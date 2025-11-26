import React from "react";

function HomePage({ user }) {
  return <div>Привет, {user && user.name}</div>;
}

export default HomePage;
