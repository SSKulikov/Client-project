import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropertyAdd from "../entities/PropertyAdd";
import { useState } from "react";
import { useEffect } from "react";
import axiosinstance from "../shared/axiosinstance";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "../shared/style/Homepage.module.css";

function LandlordPage({ setProperties, properties }) {
  const [addedProperties, setAddedProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    descriptions: "",
    addres: "",
    image: "",
  });

  useEffect(() => {
    axiosinstance
      .get("/landlord/jhj")
      .then((res) => setAddedProperties(res.data))
      .catch((err) => console.error("Ошибка загрузки объявлений:", err));
  }, []);

  const handleEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      type: property.type,
      price: property.price,
      descriptions: property.descriptions,
      addres: property.addres,
      image: property.image,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axiosinstance.put(`/landlord/${id}`, formData);
      setAddedProperties((prev) => prev.map((p) => (p.id === id ? data : p)));
      setEditingId(null);
      setFormData({
        type: "",
        price: "",
        descriptions: "",
        addres: "",
        image: "",
      });
    } catch (err) {
      console.error("Ошибка обновления объявления:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      type: "",
      price: "",
      descriptions: "",
      addres: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelet = async (id) => {
    await axiosinstance.delete(`/property/${id}`);
    setAddedProperties((prev) => prev.filter((p) => p.id !== id));
  };

  console.log(addedProperties);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <PropertyAdd
              setProperties={setProperties}
              properties={properties}
            />
          </Col>
        </Row>
        <Row className={styles.cardsRow}>
          {addedProperties.map((property) => {
            const isEditing = editingId === property.id;
            return (
              <Col key={property.id} md={4} className={styles.cardColumn}>
                <Card style={{ width: "100%", height: "100%" }}>
                  {isEditing ? (
                    <>
                      <Card.Body>
                        <Card.Title>Редактирование</Card.Title>
                        <div className="mb-3">
                          <label className="form-label">Тип жилья</label>
                          <input
                            type="text"
                            name="type"
                            className="form-control"
                            value={formData.type}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Цена</label>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Описание</label>
                          <textarea
                            name="descriptions"
                            className="form-control"
                            value={formData.descriptions}
                            onChange={handleChange}
                            rows={3}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Адрес</label>
                          <input
                            type="text"
                            name="addres"
                            className="form-control"
                            value={formData.addres}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Изображение</label>
                          <input
                            type="text"
                            name="image"
                            className="form-control"
                            value={formData.image}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="d-flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleUpdate(property.id)}
                          >
                            Сохранить
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancel}
                          >
                            Отмена
                          </Button>
                        </div>
                      </Card.Body>
                    </>
                  ) : (
                    <>
                      <Card.Img variant="top" src={property.image} />
                      <Card.Body>
                        <Card.Title>{property.type}</Card.Title>
                        <Card.Text>{property.descriptions}</Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          Цена: {property.price} руб
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Адрес: {property.addres}
                        </ListGroup.Item>
                      </ListGroup>
                      <Card.Body>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(property)}
                        >
                          Изменить
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleDelet(property.id)}
                        >
                          Удалить
                        </Button>
                      </Card.Body>
                    </>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default LandlordPage;
