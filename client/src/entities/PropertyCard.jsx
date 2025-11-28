import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
function PropertyCard({
  property,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  user,
  sendMessage,
}) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleFavoriteClick = () => {
    
   
   
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(property, messageText);
      setMessageText("");
      setShowMessageModal(false);
      alert("Сообщение отправлено!");
    }
  };

  return (
    <>
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Img variant="top" src={property.image} />
        <Card.Body>
          <Card.Title>{property.type}</Card.Title>
          <Card.Text>{property.descriptions}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> Цена: {property.price} руб</ListGroup.Item>
          <ListGroup.Item>Адрес: {property.addres}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {user ? (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => setShowMessageModal(true)}
              className="me-2"
            >
              Написать
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              size="sm"
              disabled
              className="me-2"
            >
              Написать
            </Button>
          )}
          {user?.type === "locataire" ? (
            <Button
              variant={isFavorite ? "danger" : "outline-primary"}
              size="sm"
              onClick={handleFavoriteClick}
              style={{
                marginLeft: "10px",
                backgroundColor: isFavorite ? "#dc3545" : "transparent",
                borderColor: isFavorite ? "#dc3545" : "#007bff",
                color: isFavorite ? "white" : "#007bff",
              }}
            >
              {!isFavorite ? "Добавить в избранное" : "Удалить из избранного"}
            </Button>
          ) : (
            <Card.Link
              href="#"
              style={{ color: "#6c757d", cursor: "not-allowed" }}
              onClick={(e) => e.preventDefault()}
            >
              Избранное
            </Card.Link>
          )}
        </Card.Body>
      </Card>

      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Написать сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Объект:</strong> {property.type}
          </p>
          <p>
            <strong>Адрес:</strong> {property.addres}
          </p>
          <p>
            <strong>Цена:</strong> {property.price} руб/месяц
          </p>

          <Form.Group className="mb-3">
            <Form.Label>Ваше сообщение:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Введите ваше сообщение владельцу..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMessageModal(false)}
          >
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Отправить сообщение
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PropertyCard;
