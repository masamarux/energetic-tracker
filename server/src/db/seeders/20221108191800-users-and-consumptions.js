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
        "tag": "Luz de casa mes passado",
        "consumption": 900,
        "date": "2022-10-10T04:41:57.906Z",
        "value": 120000,
        "discount": 0,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt out",
        "consumption": 700,
        "date": "2022-10-13T04:41:57.906Z",
        "value": 80000,
        "discount": 5000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz de casa novembro",
        "consumption": 850,
        "date": "2022-11-10T04:41:57.906Z",
        "value": 90000,
        "discount": 10000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Luz do apt 11/2022",
        "consumption": 650,
        "date": "2022-11-10T04:41:57.906Z",
        "value": 80000,
        "discount": 10000,
        "userId": 1, //Fulano
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "tag": "Energia casa de praia",
        "consumption": 200,
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
