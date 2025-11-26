import React, { useState } from "react";

function HomePage({ user }) {
  const [property, setProperty] = useState([])

  return <div>Привет, {user && user.name}</div>;
}

export default HomePage;
