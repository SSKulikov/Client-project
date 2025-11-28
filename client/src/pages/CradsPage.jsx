import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        const response = await axios.get(`/api/card/${id}`);
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
   
    if (!startDate || !endDate || !card?.price) return 0 ;
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * card.price;
  };

  const handleBooking = () => {
    const total = calculateTotal();
    alert(`Забронировано с ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()}\nОбщая стоимость: ${total} руб`);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!card) return <div>Недвижимость не найдена</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Карточка недвижимости</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        flexWrap: 'wrap',
        alignItems: 'flex-start',
       
      }}>
       
        <div style={{ flex: '1', minWidth: '300px' }}>
          {card.image && (
            <img 
              src={card.image} 
              alt={card.type} 
              style={{ 
                width: "100%", 
                maxWidth: "500px", 
                borderRadius: '8px',
                marginBottom: '20px'
              }} 
            />
          )}
          <h2>{card.type}</h2>
          <p><strong><h4>Цена:</h4></strong> {card.price} руб/ночь</p>
          <p><strong><h4>Адрес:</h4></strong> {card.addres}</p>
          <p><strong><h4>Описание: </h4>"</strong> {card.descriptions}"</p>
        </div>

     
        <div style={{ 
          flex: '0 0 400px', 
          border: '4px solid #ddd', 
          padding: '20px', 
          borderRadius: '8px'
          
        }}>
          <h3>Забронировать</h3>
          
   
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Дата заезда:
            </label>
            <DatePicker
           
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

         
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Дата выезда:
            </label>
            <DatePicker
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

        
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            backgroundColor: '#e9f7ef',
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            <h4>Детали бронирования:</h4>
            <p><strong>Заезд:</strong> {startDate.toLocaleDateString()}</p>
            <p><strong>Выезд:</strong> {endDate.toLocaleDateString()}</p>
            <p><strong>Ночей:</strong> {Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24))}</p>
            <p><strong>Общая стоимость:</strong> {calculateTotal()} руб</p>
          </div>

          
          <button 
            onClick={handleBooking}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardsPage;