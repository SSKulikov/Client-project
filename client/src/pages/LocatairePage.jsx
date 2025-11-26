import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { PersonCircle, HeartFill, HouseDoorFill } from "react-bootstrap-icons";

// Заглушки: в реальном приложении данные нужно получать с сервера
const allListingsMock = [
  {
    id: 1,
    title: "Уютная студия в центре",
    price: 45000,
    description: "Рядом метро, магазины и парки.",
  },
  {
    id: 2,
    title: "Большая квартира для семьи",
    price: 75000,
    description: "Тихий район, рядом школа и детский сад.",
  },
];

const favoritesMock = [allListingsMock[0]];

function LocatairePage() {
  const [showFavorites, setShowFavorites] = useState(false);

  const listingsToShow = showFavorites ? favoritesMock : allListingsMock;

  const handleGoHome = () => {
    // здесь можно использовать useNavigate() из react-router-dom
    // navigate('/');
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
          {/* Иконка личного кабинета */}
          <Button variant="outline-secondary">
            <PersonCircle size={20} className="me-1" />
            Личный кабинет
          </Button>

          {/* Кнопка избранное */}
          <Button
            variant={showFavorites ? "primary" : "outline-primary"}
            onClick={() => setShowFavorites((prev) => !prev)}
          >
            <HeartFill size={18} className="me-1" />
            Избранное
          </Button>

          {/* Кнопка на главную */}
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
        {listingsToShow.length === 0 ? (
          <Col>
            <p>
              {showFavorites
                ? "У вас пока нет избранных объектов."
                : "Пока нет доступных объявлений."}
            </p>
          </Col>
        ) : (
          listingsToShow.map((item) => (
            <Col md={4} key={item.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.price} ₽ / месяц
                  </Card.Subtitle>
                  <Card.Text>{item.description}</Card.Text>
                  {/* В будущем тут можно добавить кнопку "Добавить в избранное" */}
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
