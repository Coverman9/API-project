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
   options.tableName = 'Bookings'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      startDate: new Date("2023-09-29"),
      endDate: new Date("2023-10-11")
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date("2023-06-04"),
      endDate: new Date("2023-06-10")
    },
    {
      spotId: 3,
      userId: 4,
      startDate: new Date("2023-05-01"),
      endDate: new Date("2023-06-01")
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date("2023-06-23"),
      endDate: new Date("2023-06-25")
    },
    {
      spotId: 5,
      userId: 3,
      startDate: new Date("2023-08-08"),
      endDate: new Date("2023-08-24")
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
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options, {})
  }
};
