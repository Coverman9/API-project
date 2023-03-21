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
   options.tableName = 'Spots'
   return queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '3510 Canyon Pass Dr',
      city: 'Austin',
      country: 'USA',
      lat: 53.343,
      lng: 162.567,
      name: 'The Bloomhouse',
      description: 'When you stay at the Bloomhouse, you are entering a place where magic can and will happen.',
      price: 591
    },
    {
      ownerId: 2,
      address: '1558 S National Ave',
      city: 'Springfield',
      country: 'USA',
      lat: 63.744,
      lng: 242.757,
      name: 'Earthouse',
      description: 'Earthouse offers unique architectural design providing guests with an open inviting interior complete with high-end furnishings, modern decor, and abundant natural light.',
      price: 357
    },
    {
      ownerId: 3,
      address: '550 W Chance Cutoff',
      city: 'Lumberton',
      country: 'USA',
      lat: 54.133,
      lng: 172.457,
      name: 'Naturalist Boudoir',
      description: 'Nestled in the heart of the Big Thicket, our Naturalist Boudoir B&B has everything you need to revitalize your senses.',
      price: 380
    },
    {
      ownerId: 3,
      address: '3405 Kleimann Ave',
      city: 'Galveston',
      country: 'USA',
      lat: 83.343,
      lng: 742.567,
      name: 'Kettle House',
      description: 'This home has foam insulation and central AC for ultimate comfort!',
      price: 355
    },
    {
      ownerId: 1,
      address: 'De Los Pinos 71',
      city: 'Morelos',
      country: 'Mexico',
      lat: 93.897,
      lng: 982.667,
      name: 'Casa Xochi',
      description: 'Beautiful residence of minimalist construction.',
      price: 397
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
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options, {})
  }
};
