'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('my_friends', [
      {name: 'Maria', gender: 'F'},
      {name: 'Sebastián', gender: 'M'},
      {name: 'Raúl', gender: 'M'},
      {name: 'Matias', gender: 'M'},
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('my_friends', null, {});
  }
};