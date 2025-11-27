import axios from "axios";
import React, { useState } from "react";
import axiosinstance from "../shared/axiosinstance";

function PropertyAdd({ properties, setProperties }) {
  const [newProperty, setNewProperty] = useState({});

  async function addProperty(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const newProp = Object.fromEntries(form)
    const {data} = axiosinstance.post("/property", newProp)
    setProperties(()=>[...properties, data])
    e.target.reset()
  }
  console.log(newProperty);
  
  return (
    <form onSubmit={(e) => addProperty(e)}>
      <input
        type="text"
        name="type"
        placeholder="Тип жилья"
        value={newProperty.type}
        onChange={(e) =>
          setNewProperty({ ...newProperty, type: e.target.value })
        }
      />
      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={newProperty.price}
        onChange={(e) =>
          setNewProperty({ ...newProperty, price: e.target.value })
        }
      />
      <input
        type="text"
        name="description"
        placeholder="Описание"
        value={newProperty.description}
        onChange={(e) =>
          setNewProperty({ ...newProperty, description: e.target.value })
        }
      />
      <input
        type="text"
        name="addres"
        placeholder="Адрес"
        value={newProperty.addres}
        onChange={(e) =>
          setNewProperty({ ...newProperty, addres: e.target.value })
        }
      />
      <input
        type="text"
        name="image"
        placeholder="Изображение"
        value={newProperty.image}
        onChange={(e) =>
          setNewProperty({ ...newProperty, image: e.target.value })
        }
      />
      <button>Создать объявление</button>
    </form>
  );
}

export default PropertyAdd;
