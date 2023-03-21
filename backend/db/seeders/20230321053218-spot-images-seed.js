'use strict';
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
   options.tableName = 'SpotImages'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: '../../../../../images/1.webp',
      preview: true
    },
    {
      spotId: 2,
      url: '../../../../../images/2.jpeg',
      preview: true
    },
    {
      spotId: 3,
      url: '../../../../../images/3.webp',
      preview: true
    },
    {
      spotId: 4,
      url: '../../../../../images/4.webp',
      preview: true
    },
    {
      spotId: 5,
      preview: false
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    return queryInterface.bulkDelete(options, {})
  }
};
