'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Properties',
      [
        {
          type: 'Дом',
          price: 35000,
          addres: 'Ленина 12',
          userId: null,
<<<<<<< HEAD
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0TQy3qoMk0GmRf8iYT_aII518GaAK-MYfFg&s',
=======
          image: 'https://koldunov.com/wp-content/uploads/2021/03/08.jpg',
>>>>>>> main
          descriptions:
            'Просторный двухэтажный дом для аренды с современным ремонтом и большим садом. Идеально для семьи',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Квартира',
          price: 25000,
          addres: 'Центральная 45, кв. 18',
          image: 'https://koldunov.com/wp-content/uploads/2021/03/08.jpg',
          userId: null,
          descriptions:
            'Светлая трехкомнатная квартира для долгосрочной аренды в новом жилом комплексе',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Комната',
          price: 12000,
          addres: 'Студенческая 23, к. 4',
          image: 'https://koldunov.com/wp-content/uploads/2021/03/08.jpg',
          userId: null,
          descriptions:
            'Уютная комната в современной трехкомнатной квартире для аренды. Все соседи - студенты',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Квартира',
          price: 18000,
          addres: 'Проспект Мира 67, кв. 304',
          image: 'https://koldunov.com/wp-content/uploads/2021/03/08.jpg',
          userId: null,
          descriptions:
            'Уютная однокомнатная квартира для аренды с готовым ремонтом и всей необходимой техникой',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Комната',
          price: 8000,
          addres: 'Рабочая 15, к. 7',
          image: 'https://koldunov.com/wp-content/uploads/2021/03/08.jpg',
          userId: null,
          descriptions:
            'Комната в двухкомнатной квартире для аренды. Подходит для одного человека, рядом метро',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {});
  },
};
