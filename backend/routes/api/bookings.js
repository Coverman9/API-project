const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [{ model: SpotImage, attributes: ["url", "preview"] }],
      },
    ],
  });

  const bookingObject = [];
  if (bookings.length) {
    bookings.forEach((booking) => bookingObject.push(booking.toJSON()));
  } else {
    bookingObject.push(bookings);
  }
  for (let booking of bookingObject) {
    if (!Object.keys(booking).length) break;
    if (booking.Spot.SpotImages.length) {
      const filterTrue = booking.Spot.SpotImages.filter(
        (book) => book.preview === true
      );
      if (filterTrue.length) {
        booking.Spot.previewImage = filterTrue[0].url;
      } else {
        booking.Spot.previewImage = "No Preview Image Available";
      }
    } else {
      booking.Spot.previewImage = "No Preview Image Available";
    }
    delete booking.Spot.SpotImages;
  }
  res.json({
    Bookings: bookingObject,
  });
});

module.exports = router;
