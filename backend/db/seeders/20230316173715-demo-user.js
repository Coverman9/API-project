'use strict';
const bcrypt = require("bcryptjs")
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Users'
   return queryInterface.bulkInsert(options, [
    {
      firstName: 'Mirbek',
      lastName: 'Atabekov',
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      firstName: 'Egor',
      lastName: 'Creed',
      email: 'user1@user.io', 
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      firstName: 'Tambi',
      lastName: 'Masaev',
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync('password3')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
