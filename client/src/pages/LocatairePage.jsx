import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { PersonCircle, HeartFill, HouseDoorFill } from "react-bootstrap-icons";

function LocatairePage({ user }) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/property")
      .then((res) => setAllProperties(res.data))
      .catch((err) => console.error("Ошибка загрузки объектов:", err));

    axios
      .get("/api/property/favorites")
      .then((res) => setFavoriteProperties(res.data))
      .catch((err) => console.error("Ошибка загрузки избранного:", err));
  }, []);

  const propertiesToShow = showFavorites ? favoriteProperties : allProperties;

  const handleGoHome = () => {
    navigate("/");
  };

  const addToFavorites = async (id) => {
    try {
      await axios.post(`/api/property/${id}/favorite`);
      const res = await axios.get("/api/property/favorites");
      setFavoriteProperties(res.data);
      setShowFavorites(true);
    } catch (err) {
      console.error("Ошибка добавления в избранное:", err);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Row className="mb-4 align-items-center">
          <Col>
            <h2>Добро пожаловать в сервис аренды, {user.name}!</h2>
            <p className="text-muted mb-0">
              Здесь вы можете посмотреть на выбранные объекты недвижимости
            </p>
          </Col>
        </Row>
      </Row>

      <Row className="mb-3">
        <Col>
          <h4>Избранные объекты</h4>
        </Col>
      </Row>

      <Row>
        {propertiesToShow.length === 0 ? (
          <Col>
            <p>
              {showFavorites
                ? "У вас пока нет избранных объектов."
                : "Пока нет доступных объявлений."}
            </p>
          </Col>
        ) : (
          favoriteProperties.map((item) => (
            <Col md={4} key={item.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.type}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Title>{item.type}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.price} ₽ / месяц
                  </Card.Subtitle>
                  <Card.Text>{item.descriptions}</Card.Text>
                  <Card.Text>{item.addres}</Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => addToFavorites(item.id)}
                  >
                    Добавить в избранное
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default LocatairePage;
