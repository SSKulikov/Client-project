import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import styles from "./CardDetails.module.css";

function CardsPage() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`api/card/${id}`);
        setCard(response.data);
      } catch (err) {
        setError("Ошибка при загрузке");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCard();
    }
  }, [id]);

  const calculateTotal = () => {
    if (!startDate || !endDate || !card?.price) return 0;

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * card.price;
  };

  const handleBooking = () => {
    const total = calculateTotal();
    alert(
      `Забронировано с ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()}\nОбщая стоимость: ${total} руб`
    );
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!card) return <div>Недвижимость не найдена</div>;

  return (
    <Container className={styles.page}>
      <h1 className={styles.heading}>Карточка недвижимости</h1>

      <div className={styles.content}>
        <div className={styles.media}>
          {card.image && (
            <img src={card.image} alt={card.type} className={styles.image} />
          )}
          <div className={styles.infoList}>
            <h2>{card.type}</h2>
            <p>
              <strong>Цена:</strong> {card.price} руб/ночь
            </p>
            <p>
              <strong>Адрес:</strong> {card.addres}
            </p>
            <p>
              <strong>Описание:</strong> {card.descriptions}
            </p>
          </div>
        </div>

        <div className={styles.bookingCard}>
          <h3>Забронировать</h3>

          <div className={styles.field}>
            <label htmlFor="start-date">Дата заезда</label>
            <DatePicker
              id="start-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="end-date">Дата выезда</label>
            <DatePicker
              id="end-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>

          <div className={styles.summary}>
            <p>
              <strong>Заезд:</strong> {startDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Выезд:</strong> {endDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Ночей:</strong>{" "}
              {Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24))}
            </p>
            <p>
              <strong>Общая стоимость:</strong> {calculateTotal()} руб
            </p>
          </div>

          <button className={styles.bookingButton} onClick={handleBooking}>
            Забронировать
          </button>
        </div>
      </div>
    </Container>
  );
}

export default CardsPage;
