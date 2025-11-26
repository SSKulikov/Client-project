import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const allListings = async() => {
    const response = await axios.get("/api/listings");
    return response.data;
}

const favoritesListings = async() => {
    const response = await axios.get("/api/listings/favorites");
    return response.data;
}  

function LandlordPage() {
  const [allListings, setAllListings] = useState([]);
  const [favoritesListings, setFavoritesListings] = useState([]);
  const [listingsToShow, setListingsToShow] = useState(allListings);
  useEffect(() => {
    allListings().then(setAllListings);
    favoritesListings().then(setFavoritesListings);
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    photos: null,
    descriptions: "",
    addres: "",
    passportScan: null,
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
              descriptions: formData.descriptions,
              addres: formData.addres,
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
        descriptions: formData.descriptions,
        addres: formData.addres,
      };
      setListings((prev) => [...prev, newListing]);
    }

    setFormData({
      type: "",
      price: "",
      photos: null,
      descriptions: "",
      addres: "",
      passportScan: null,
    });
  };

  const handleEdit = (el) => {
    setEditingId(el.id);
    setFormData({
      type: el.type,
      price: el.price,
      photos: null,
      descriptions: el.descriptions,
      addres: el.addres,
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
                name="descriptions"
                placeholder="Опишите объект недвижимости"
                value={formData.descriptions}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Адрес (точка на карте)</Form.Label>
              <Form.Control
                type="text"
                name="addres"
                placeholder="Укажите адрес или координаты"
                value={formData.addres}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassport">
              <Form.Label>Загрузка паспорта</Form.Label>
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
          {listingsToShow.length === 0 ? (
            <p>У вас пока нет объявлений.</p>
          ) : (
            listingsToShow.map((el) => (
              <Card key={el.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{el.type}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Цена: {el.price} ₽
                  </Card.Subtitle>
                  <Card.Text>{el.descriptions}</Card.Text>
                  <Card.Text>
                    <strong>Адрес:</strong> {el.addres}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(el)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(el.id)}
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
