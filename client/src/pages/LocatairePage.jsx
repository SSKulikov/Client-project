import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Button, Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";

function LocatairePage({ user, favoriteProperties, removeFromFavorites }) {
  const [activeTab, setActiveTab] = useState("favorites");
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/property")
      .then((res) => {
        setAllProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки объектов:", err);
        setLoading(false);
      });

    loadMessages(); //
  }, []);

  const loadMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/property/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Ошибка загрузки сообщений:", err);

      setMessages([]);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
  };

  const handleDeleteAllMessages = () => {
    setMessages([]);
    alert("Все сообщения удалены");
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Добро пожаловать, {user.name}!</h2>
          <p className="text-muted mb-0">
            Здесь вы можете посмотреть на выбранные Вами объекты недвижимости
          </p>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-4"
      >
        <Tab
          eventKey="favorites"
          title={`Избранные варианты (${favoriteProperties.length})`}
        >
          <Row>
            {favoriteProperties.length === 0 ? (
              <Col>
                <p>У вас пока нет избранных объектов.</p>
              </Col>
            ) : (
              favoriteProperties.map((property) => (
                <Col md={4} key={property.id} className="mb-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={property.image}
                      alt={property.type}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{property.type}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {property.price} ₽ / месяц
                      </Card.Subtitle>
                      <Card.Text>{property.descriptions}</Card.Text>
                      <Card.Text>
                        <small className="text-muted">{property.addres}</small>
                      </Card.Text>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromFavorites(property.id)}
                      >
                        Удалить из избранного
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>
        <Tab eventKey="messages" title={`Сообщения (${messages.length})`}>
          <Row>
            <Col>
              {messages.length === 0 ? (
                <div>
                  <p>У вас пока нет сообщений.</p>
                  <p className="text-muted">
                    Напишите владельцам недвижимости на главной странице!
                  </p>
                </div>
              ) : (
                <div>
                  {messages.map((message) => (
                    <Card key={message.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <Card.Title className="h6">
                              Объект: {message.propertyType}
                            </Card.Title>
                            <Card.Text>{message.message}</Card.Text>
                            <Card.Text>
                              <small className="text-muted">
                                Отправлено:{" "}
                                {new Date(message.timestamp).toLocaleString()}
                              </small>
                            </Card.Text>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDeleteAllMessages}
                    className="mt-3"
                  >
                    Удалить все сообщения
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default LocatairePage;
