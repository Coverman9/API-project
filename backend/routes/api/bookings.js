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

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req;
  let { startDate, endDate } = req.body;

  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let currentDate = new Date();

  const validationErrors = {};
  const conflictErrors = {};

  const bookings = await Booking.findByPk(req.params.bookingId);
  if (!bookings) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (bookings.userId != user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  if (startDate < currentDate) {
    validationErrors.startDate = "startDate cannot be before current date";
  }
  if (endDate <= startDate) {
    validationErrors.endDate = "endDate cannot be on or before startDate";
  }
  if (Object.keys(validationErrors).length) {
    const err = Error("Validation Error");
    err.errors = validationErrors;
    err.status = 400;
    return next(err);
  }
  if (bookings.endDate < currentDate) {
    const err = Error("Past bookings can't be modified");
    err.status = 403;
    return next(err);
  }

  const existingBookings = await Booking.findAll({
    where: { spotId: bookings.spotId },
  });

  const otherExistingBookings = [];

  if (existingBookings.length) {
    existingBookings.forEach((booking) =>
      otherExistingBookings.push(booking.toJSON())
    );
  } else {
    otherExistingBookings.push(existingBookings);
  }

  for (let book of otherExistingBookings) {
    if (!Object.keys(book).length) break;
    if (book.id === parseInt(req.params.bookingId)) {
      continue;
    }

    if (startDate >= book.startDate && endDate <= book.endDate) {
      conflictErrors.startDate =
        "Start date conflicts with an existing booking";
      conflictErrors.endDate = "End date conflicts with an existing booking";
    } else if (startDate.getTime() === book.startDate.getTime()) {
      conflictErrors.startDate =
        "Start date conflicts with an existing booking";
    } else if (startDate < book.startDate && endDate > book.startDate) {
      conflictErrors.endDate = "End date conflicts with an existing booking";
    } else if (startDate > book.startDate && startDate < book.endDate) {
      conflictErrors.startDate =
        "Start date conflicts with an existing booking";
    }
  }

  if (Object.keys(conflictErrors).length) {
    const err = Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.errors = conflictErrors;
    err.status = 403;
    return next(err);
  }

  bookings.update({
    startDate,
    endDate,
  });
  res.status(200);
  res.json(bookings);
});

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req;

  let booking = await Booking.findByPk(req.params.bookingId, {
    include: [{ model: Spot, attributes: ["ownerId"] }],
  });
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
  book = booking.toJSON();

  if (book.userId === user.id || book.Spot.ownerId === user.id) {
    startDate = new Date(book.startDate);
    const currentDate = new Date();

    if (startDate < currentDate) {
      const err = new Error("Bookings that have been started can't be deleted");
      err.status = 403;
      return next(err);
    }

    await booking.destroy();
    res.status(200);
    res.json({
      message: "Successfully deleted",
    });
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
});


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
