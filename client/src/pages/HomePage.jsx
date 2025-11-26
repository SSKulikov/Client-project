import React, { useEffect, useState } from "react";
import "../shared/style/Homepage.module.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

function HomePage({ user }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/property").then(({ data }) => setProperties(data));
  }, []);

  console.log(properties);
//как добавить стили для дива
  return (
    <>
      {properties.map((el) => {
        return (
          <>
            <div>{el.type}</div>
            <div>{el.price}</div>
            <div>{el.addres}</div>
          </>
        )
      })}
    </>
  );
}

export default HomePage;
