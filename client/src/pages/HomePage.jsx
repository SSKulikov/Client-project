import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import PropertyCard from "../entities/PropertyCard";
import { useNavigate } from "react-router";
import styles from "../shared/style/Homepage.module.css";
import CradsPage from "./CradsPage";

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
    <div className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <h2 className={styles.heroTitle}>
            {user ? `Добро пожаловать, ${user.name}!` : "Добро пожаловать в сервис аренды!"}
          </h2>
          <p className={styles.heroSubtitle}>
            Находите актуальные объекты, следите за ценами и управляйте избранным в один клик.
          </p>
        </section>

        <section className={styles.mapSection}>
          <div ref={mapRef} className={styles.map} />
        </section>

        <section className="page-section">
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Актуальные предложения</h3>
            <span className="text-muted">{properties.length} объектов</span>
          </div>
          <Row className={styles.cardsRow}>
            {properties.map((property) => {
              return (
                <Col key={property.id} md={6} lg={4} className={styles.cardColumn}>
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
        </section>
      </Container>
    </div>
  );
}

export default HomePage;
