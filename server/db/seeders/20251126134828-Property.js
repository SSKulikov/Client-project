'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
<<<<<<< HEAD
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Properties',
      [
        {
          type: 'Дом',
          price: 35000,
          addres: 'Ленина 12',
          userId: null,
          descriptions:
            'Просторный двухэтажный дом для аренды с современным ремонтом и большим садом. Идеально для семьи',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Квартира',
          price: 25000,
          addres: 'Центральная 45, кв. 18',
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
=======
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Properties', [
      {
        type: 'Квартира',
        price: 125000,
        addres: 'ул. Тверская, д. 15, кв. 34',
        userId: null,
        descriptions:
          'Однокомнатная квартира в историческом центре Москвы, станция метро Тверская в 5 минутах ходьбы',
      },
      {
        type: 'Комната',
        price: 35000,
        addres: 'пр. Мира, д. 42, к. 1, комн. 12',
        userId: null,
        descriptions:
          'Комната в трехкомнатной квартире, спальный район, рядом станция метро Алексеевская',
      },
      {
        type: 'Дом',
        price: 280000,
        addres: 'пос. Внуково, ул. Центральная, д. 17',
        userId: null,
        descriptions:
          'Кирпичный дом в черте Москвы, участок 6 соток, развитая инфраструктура района',
      },
      {
        type: 'Квартира',
        price: 185000,
        addres: 'ул. Ленинский проспект, д. 88, кв. 156',
        userId: null,
        descriptions:
          'Двухкомнатная квартира в панельном доме, станция метро Ленинский проспект в 10 минутах ходьбы',
      },
      {
        type: 'Комната',
        price: 28000,
        addres: 'ул. Молдагуловой, д. 33, комн. 8',
        userId: null,
        descriptions:
          'Комната в двухкомнатной квартире, район Выхино-Жулебино, рядом станция метро Выхино',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
>>>>>>> main
  },
};
