import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { PersonCircle, HeartFill, HouseDoorFill } from "react-bootstrap-icons";


const allProperties = async() => {
    const response = await axios.get("/api/properties");
    return response.data;
}

const favoritesProperty = async() => {
    const response = await axios.get("/api/properties/favorites");
    return response.data;
}

function LocatairePage() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [favoritesProperty, setFavoritesProperty] = useState([]);

  useEffect(() => {
    allProperties().then(setAllProperties);
    favoritesProperty().then(setFavoritesProperty);
  }, []);

  const propertiesToShow = showFavorites ? favoritesProperty : allProperties;

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Добро пожаловать в сервис аренды!</h2>
          <p className="text-muted mb-0">
            Здесь вы можете найти подходящий объект недвижимости и добавить его в избранное.
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center gap-2">
          <Button variant="outline-secondary">
            <PersonCircle size={20} className="me-1" />
            Личный кабинет
          </Button>
          <Button
            variant={showFavorites ? "primary" : "outline-primary"}
            onClick={() => setShowFavorites((prev) => !prev)}
          >
            <HeartFill size={18} className="me-1" />
            Избранное
          </Button>

          <Button variant="outline-dark" onClick={handleGoHome}>
            <HouseDoorFill size={18} className="me-1" />
            На главную
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h4>
            {showFavorites
              ? "Избранные объекты"
              : "Все объекты недвижимости"}
          </h4>
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
          propertiesToShow.map((item) => (
            <Col md={4} key={item.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Type>{item.type}</Card.Type>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.price} ₽ / месяц
                  </Card.Subtitle>
                  <Card.Text>{item.descriptions}</Card.Text>
                  <Card.Text>{item.addres}</Card.Text>
                  <Button variant="outline-primary" size="sm" className="me-2">
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
