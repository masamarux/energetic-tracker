'use strict';
const {hash} = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      name: 'Fulano de tal',
      email: 'fulano@email.com',
      password: await hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('consumption', [
      {
        "tag": "Energia da casa 1",
        "consumption": 70000,
        "date": "2022-08-10T04:41:57.906Z",
        "value": 60000,
        "discount": 0,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt 1",
        "consumption": 70000,
        "date": "2022-08-13T04:41:57.906Z",
        "value": 80000,
        "discount": 15000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz da cada de praia",
        "consumption": 40000,
        "date": "2022-09-10T04:41:57.906Z",
        "value": 50000,
        "discount": 1000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt 1",
        "consumption": 65000,
        "date": "2022-09-10T04:41:57.906Z",
        "value": 80000,
        "discount": 10000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Energia casa de praia",
        "consumption": 20000,
        "date": "2022-09-05T04:41:57.906Z",
        "value": 40000,
        "discount": 2500,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz de casa mes passado",
        "consumption": 90000,
        "date": "2022-10-10T04:41:57.906Z",
        "value": 120000,
        "discount": 0,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt out",
        "consumption": 70000,
        "date": "2022-10-13T04:41:57.906Z",
        "value": 80000,
        "discount": 5000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz de casa novembro",
        "consumption": 85000,
        "date": "2022-11-10T04:41:57.906Z",
        "value": 90000,
        "discount": 10000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt 11/2022",
        "consumption": 65000,
        "date": "2022-11-10T04:41:57.906Z",
        "value": 80000,
        "discount": 10000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Energia casa de praia",
        "consumption": 20000,
        "date": "2022-11-05T04:41:57.906Z",
        "value": 40000,
        "discount": 2500,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consumption', null, {});
    await queryInterface.bulkDelete('user', null, {});
  }
};
