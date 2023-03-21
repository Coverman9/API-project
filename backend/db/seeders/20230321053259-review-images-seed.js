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
   options.tableName = 'ReviewImages'
   return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://www.probuilder.com/sites/probuilder/files/styles/pb_list/public/Dahlin-Group-Luminosa-home-design-outdoor-living-min.jpg?itok=z0C5L3GW'
    },
    {
      reviewId: 2,
      url: 'https://www.probuilder.com/sites/probuilder/files/styles/pb_list/public/Dahlin-Group-Luminosa-home-design-outdoor-living-min.jpg?itok=z0C5L3GW'
    },
    {
      reviewId: 3,
      url: 'https://www.probuilder.com/sites/probuilder/files/styles/pb_list/public/Dahlin-Group-Luminosa-home-design-outdoor-living-min.jpg?itok=z0C5L3GW'
    },
    {
      reviewId: 4,
      url: 'https://www.probuilder.com/sites/probuilder/files/styles/pb_list/public/Dahlin-Group-Luminosa-home-design-outdoor-living-min.jpg?itok=z0C5L3GW'
    },
    {
      reviewId: 5,
      url: 'https://www.probuilder.com/sites/probuilder/files/styles/pb_list/public/Dahlin-Group-Luminosa-home-design-outdoor-living-min.jpg?itok=z0C5L3GW'
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
    options.tableName = 'ReviewImages'
    return queryInterface.bulkDelete(options, {})
  }
};
