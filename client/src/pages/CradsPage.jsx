import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
function CradsPage() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/card/${id}`);
        setCard(response.data);
      } catch (err) {
        setError("Ошибка прир загрузке");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCard();
    }
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!card) return <div>Недвижимость не найдена</div>;
  return (
    <div>
      <h1>Карточка недвижимости</h1>
      <div>
        {card.image && (
          <img src={card.image} alt={card.type} style={{ width: "300px" }} />
        )}
        <h2>{card.type}</h2>
        <p>Цена:{card.price} руб</p>
        <p>Адрес:{card.adres}</p>
        <p>Описание:{card.description}</p>
      </div>
    </div>
  );
}
export default CradsPage;
