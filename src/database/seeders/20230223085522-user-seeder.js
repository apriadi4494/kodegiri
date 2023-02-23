'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '9a10e4e9-7477-433a-acfd-c3a7d255c7d8',
          email: 'admin@admin.com',
          password:
            '$2b$08$jwurorQhqBK7UpjJFEUXaOMONxw.ttpc7bDg96/Kad/b3j/nj5wry',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
