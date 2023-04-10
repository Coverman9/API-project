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
      url: 'https://images.coolhouseplans.com/plans/44207/44207-b600.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i.ytimg.com/vi/bBQp3mPnKSs/maxresdefault.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://images.adsttc.com/media/images/63c0/a935/7643/4a39/8498/948f/large_jpg/casa-tunich-apiron_13.jpg?1673570670',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://cdn.luxe.digital/media/20230126160156/biggest-houses-in-the-world-reviews-luxe-digital.jpg',
      preview: true
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
