import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

// В реальном приложении эти данные нужно получать с сервера
const mockListings = [
  {
    id: 1,
    type: "Квартира",
    price: 50000,
    description: "Светлая квартира в центре города",
    address: "Москва, ул. Примерная, д. 1",
  },
];

function LandlordPage() {
  const [listings, setListings] = useState(mockListings);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    photos: null,
    description: "",
    address: "",
    passportScan: null, // поле для будущей верификации паспорта
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
              ...item,
              type: formData.type,
              price: formData.price,
              description: formData.description,
              address: formData.address,
            }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newListing = {
        id: Date.now(),
        type: formData.type,
        price: formData.price,
        description: formData.description,
        address: formData.address,
      };
      setListings((prev) => [...prev, newListing]);
    }

    setFormData({
      type: "",
      price: "",
      photos: null,
      description: "",
      address: "",
      passportScan: null,
    });
  };

  const handleEdit = (listing) => {
    setEditingId(listing.id);
    setFormData({
      type: listing.type,
      price: listing.price,
      photos: null,
      description: listing.description,
      address: listing.address,
      passportScan: null,
    });
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Мои объявления</h2>

      <Row>
        <Col md={6}>
          <h4 className="mb-3">
            {editingId ? "Редактирование объявления" : "Добавить новое объявление"}
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Тип жилья</Form.Label>
              <Form.Control
                type="text"
                name="type"
                placeholder="Квартира, дом, студия и т.п."
                value={formData.type}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Укажите цену"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhotos">
              <Form.Label>Загрузка фотографий</Form.Label>
              <Form.Control
                type="file"
                name="photos"
                multiple
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Опишите объект недвижимости"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Адрес (точка на карте)</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Укажите адрес или координаты"
                value={formData.address}
                onChange={handleChange}
              />
              {/* Здесь в будущем можно встроить компонент карты */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassport">
              <Form.Label>Загрузка паспорта (для будущей верификации)</Form.Label>
              <Form.Control
                type="file"
                name="passportScan"
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {editingId ? "Сохранить изменения" : "Добавить объявление"}
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h4 className="mb-3">Список моих объявлений</h4>
          {listings.length === 0 ? (
            <p>У вас пока нет объявлений.</p>
          ) : (
            listings.map((listing) => (
              <Card key={listing.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{listing.type}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Цена: {listing.price} ₽
                  </Card.Subtitle>
                  <Card.Text>{listing.description}</Card.Text>
                  <Card.Text>
                    <strong>Адрес:</strong> {listing.address}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(listing)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Удалить
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LandlordPage;
