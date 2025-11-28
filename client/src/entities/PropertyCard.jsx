import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./PropertyCard.module.css";
function PropertyCard({
  property,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  user,
  sendMessage,
  onCardClick,
}) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleFavoriteClick = (event) => {
    event?.stopPropagation();
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

  const handleCardNavigation = () => {
    if (onCardClick) {
      onCardClick(property.id);
    }
  };

  const openMessageModal = (event) => {
    event.stopPropagation();
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  const handleKeyDown = (event) => {
    if (!onCardClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick(property.id);
    }
  };

  return (
    <>
      <Card
        className={styles.card}
        onClick={handleCardNavigation}
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.imageWrapper}>
          <Card.Img variant="top" src={property.image} className={styles.image} />
        </div>
        <Card.Body className={styles.body}>
          <Card.Title className={styles.title}>{property.type}</Card.Title>
          <Card.Text className={styles.description}>{property.descriptions}</Card.Text>
        </Card.Body>
        <ListGroup className={`list-group-flush ${styles.metaList}`}>
          <ListGroup.Item className={styles.metaItem}>
            <span>Цена</span>
            <span>{property.price} ₽</span>
          </ListGroup.Item>
          <ListGroup.Item className={styles.metaItem}>
            <span>Адрес</span>
            <span>{property.addres}</span>
          </ListGroup.Item>
        </ListGroup>
        <div className={styles.actions}>
          {user ? (
            <Button
              onClick={openMessageModal}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Написать
            </Button>
          ) : (
            <Button disabled className={`${styles.button} ${styles.buttonSecondary}`}>
              Написать
            </Button>
          )}
          {user?.type === "locataire" ? (
            <Button
              onClick={handleFavoriteClick}
              className={`${styles.button} ${styles.buttonSecondary} ${
                isFavorite ? styles.favoriteActive : ""
              }`}
            >
              {!isFavorite ? "В избранное" : "В избранном"}
            </Button>
          ) : (
            <Card.Link
              href="#"
              className={styles.disabledLink}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Избранное
            </Card.Link>
          )}
        </div>
      </Card>

      <Modal show={showMessageModal} onHide={closeMessageModal}>
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
          <Button variant="secondary" onClick={closeMessageModal}>
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
