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
   options.tableName = 'Reviews'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      review: 'This house was a complete disappointment. The photos made it look much nicer than it actually was.',
      stars: 3
    },
    {
      spotId: 2,
      userId: 3,
      review: 'I stayed in this beautiful house for a weekend getaway and I was blown away by how comfortable and luxurious it was.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 2,
      review: 'The furniture was old and worn, the bathroom was dirty and outdated, and there were a number of maintenance issues that were not addressed.',
      stars: 3
    },
    {
      spotId: 4,
      userId: 1,
      review: 'The house had plenty of room for all of us, with multiple bedrooms and bathrooms.',
      stars: 4
    },
    {
      spotId: 5,
      userId: 3,
      review: 'This historic house was absolutely stunning! The architecture was breathtaking and the interior was beautifully decorated.',
      stars: 4
    },
    {
      spotId: 5,
      userId: 3,
      review: 'I stayed in this beautiful house for a weekend getaway and I was blown away by how comfortable and luxurious it was.',
      stars: 5
    },
    {
      spotId: 4,
      userId: 2,
      review: 'This historic house was absolutely stunning! The architecture was breathtaking and the interior was beautifully decorated.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 1,
      review: 'The furniture was old and worn, the bathroom was dirty and outdated, and there were a number of maintenance issues that were not addressed.',
      stars: 2
    },
    {
      spotId: 2,
      userId: 1,
      review: 'This historic house was absolutely stunning! The architecture was breathtaking and the interior was beautifully decorated.',
      stars: 4
    },
    {
      spotId: 1,
      userId: 3,
      review: 'The house had plenty of room for all of us, with multiple bedrooms and bathrooms.',
      stars: 4
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
    options.tableName = 'Reviews'
    return queryInterface.bulkDelete(options, {})
  }
};
