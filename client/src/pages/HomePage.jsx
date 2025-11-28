import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import PropertyCard from "../entities/PropertyCard";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../shared/style/Homepage.module.css";
import CradsPage from "./CradsPage";
import Form from "react-bootstrap/Form";

function HomePage({
  user,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  favoriteProperties,
  sendMessage,
}) {
  const [properties, setProperties] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const isInitializingRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/property", {
        params: {
          name: "bob",
        },
      })
      .then(({ data }) => setProperties(data));
  }, []);
 const handleCardClick = (propertyId) => {
    navigate(`/api/card/${propertyId}`);
  };
  console.log(properties);

  // Загрузка скрипта Яндекс.Карт API и инициализация карты
  useEffect(() => {
    // Проверяем, не создана ли уже карта или не идет ли инициализация
    if (mapInstanceRef.current || isInitializingRef.current) {
      return;
    }

    const initializeMap = () => {
      if (
        !mapRef.current ||
        mapInstanceRef.current ||
        isInitializingRef.current
      ) {
        return;
      }

      isInitializingRef.current = true;

      window.ymaps.ready(() => {
        if (!mapRef.current || mapInstanceRef.current) {
          isInitializingRef.current = false;
          return;
        }

        try {
          mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
            center: [55.7558, 37.6173], // Москва по умолчанию
            zoom: 10,
          });
          isInitializingRef.current = false;
        } catch (error) {
          console.error("Ошибка при создании карты:", error);
          isInitializingRef.current = false;
        }
      });
    };

    // Если API уже загружен
    if (window.ymaps && window.ymaps.ready) {
      initializeMap();
    } else {
      // Проверяем, не добавлен ли уже скрипт
      const existingScript = document.querySelector(
        'script[src*="api-maps.yandex.ru"]'
      );

      if (!existingScript) {
        // Загружаем скрипт
        const script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU";
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        // Скрипт уже есть, проверяем загружен ли API
        const checkInterval = setInterval(() => {
          if (window.ymaps && window.ymaps.ready) {
            clearInterval(checkInterval);
            initializeMap();
          }
        }, 100);

        // Очищаем интервал через 5 секунд, если API не загрузился
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      isInitializingRef.current = false;
    };
  }, []);

  // Обновление меток на карте при изменении properties
  useEffect(() => {
    if (!mapInstanceRef.current || !window.ymaps || properties.length === 0) {
      return;
    }

    // Добавляем новые метки
    const coordinates = [];
    properties.forEach((property) => {
      if (property.latitude && property.longitude) {
        const placemark = new window.ymaps.Placemark(
          [property.latitude, property.longitude],
          {
            balloonContent: `
              <div>
                <strong>${property.type}</strong><br>
                ${property.descriptions}<br>
                Цена: ${property.price} руб<br>
                Адрес: ${property.addres}
              </div>
            `,
          }
        );
        mapInstanceRef.current.geoObjects.add(placemark);
        coordinates.push([property.latitude, property.longitude]);
      }
    });

    // Центрируем карту на метках, если они есть
    if (coordinates.length > 0) {
      mapInstanceRef.current.setBounds(
        mapInstanceRef.current.geoObjects.getBounds(),
        { duration: 300 }
      );
    }
  }, [properties]);
  console.log(user, "<------- user здесь");

  console.log(properties);
  return (
    <div>
      <Container>
        <>
          {user && user.type === "locataire" && (
            <Row className="mb-4 align-items-center">
              <Col>
                <h2>Добро пожаловать в сервис аренды, {user.name}!</h2>
                <p className="text-muted mb-0">
                  Здесь вы можете найти подходящий объект недвижимости и
                  добавить его в избранное.
                </p>
              </Col>
            </Row>
          )}
          {!user && (
            <Row className="mb-4 align-items-center">
              <Col>
                <h2>Добро пожаловать в сервис аренды!</h2>
                <p className="text-muted mb-0">
                  Здесь вы можете найти подходящий объект недвижимости и
                  добавить его в избранное.
                </p>
              </Col>
            </Row>
          )}
        </>
        <Row>
          {/* <Col md={2}>
            <h6>Тип жилья</h6>
            <Form>
              <Form.Check
                type="radio"
                id="type-apartment"
                name="type"
                label="Квартира"
                value="apartment"
              />
              <Form.Check
                type="radio"
                id="type-room"
                name="type"
                label="Комната"
                value="room"
              />
              <Form.Check
                type="radio"
                id="type-house"
                name="type"
                label="Дом"
                value="house"
              />
              <Form.Label>Цена</Form.Label>
              <InputGroup size="sm">
                <Form.Control
                  type="number"
                  placeholder="0"
                  min="0"
                  max="50000"
                />
                <InputGroup.Text>-</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="300 000"
                  min="0"
                  max="300000"
                />
              </InputGroup>
              <Button>Найти</Button>
            </Form>
          </Col> */}
          <Col md={12}>
            <div
              ref={mapRef}
              style={{ width: "100%", height: "500px", marginBottom: "20px" }}
            />
          </Col>
        </Row>
        <Row className={styles.cardsRow}>
          {properties.map((property) => {
            return (
              <Col key={property.id} md={4} className={styles.cardColumn}>
                <PropertyCard
                  property={property}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  onCardClick={handleCardClick}
                  isFavorite={isFavorite(property.id)}
                  user={user}
                  sendMessage={sendMessage}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
