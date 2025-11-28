import React, { useState } from "react";
import axiosinstance from "../shared/axiosinstance";
import { useNavigate } from "react-router";
import styles from "./PropertyAdd.module.css";

function PropertyAdd({ properties, setProperties }) {
  const [newProperty, setNewProperty] = useState({
    type: "",
    price: "",
    description: "",
    addres: "",
    image: "",
  });
  const navigate = useNavigate();

  async function addProperty(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const newProp = Object.fromEntries(form);
    const { data } = axiosinstance.post("/property", newProp);
    setProperties(() => [...properties, data]);
    navigate("/");
  }

  console.log(newProperty);

  const handleChange = (field, value) => {
    setNewProperty((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className={styles.formCard} onSubmit={addProperty}>
      <div>
        <h3 className={styles.title}>Новое объявление</h3>
        <p className={styles.label}>Заполните информацию об объекте</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="property-type">
          Тип жилья
        </label>
        <input
          id="property-type"
          type="text"
          name="type"
          className={styles.input}
          placeholder="Например, квартира"
          value={newProperty.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="property-price">
          Цена, ₽
        </label>
        <input
          id="property-price"
          type="number"
          name="price"
          className={styles.input}
          placeholder="50000"
          value={newProperty.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="property-description">
          Краткое описание
        </label>
        <textarea
          id="property-description"
          name="description"
          className={styles.input}
          placeholder="Опишите особенности объекта"
          rows={3}
          value={newProperty.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="property-address">
          Адрес
        </label>
        <input
          id="property-address"
          type="text"
          name="addres"
          className={styles.input}
          placeholder="Город, улица, дом"
          value={newProperty.addres}
          onChange={(e) => handleChange("addres", e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="property-image">
          Ссылка на изображение
        </label>
        <input
          id="property-image"
          type="text"
          name="image"
          className={styles.input}
          placeholder="https://"
          value={newProperty.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />
      </div>

      <button className={styles.submit}>Создать объявление</button>
    </form>
  );
}

export default PropertyAdd;
