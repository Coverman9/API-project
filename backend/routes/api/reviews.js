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

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: {
      userId: user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
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
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  const reviewObjects = [];
  if (reviews.length) {
    reviews.forEach((review) => reviewObjects.push(review.toJSON()));
  } else {
    reviewObjects.push(reviews);
  }
  for (let review of reviewObjects) {
    if (!Object.keys(review).length) break;
    if (review.Spot.SpotImages.length) {
      const filterTrue = review.Spot.SpotImages.filter(
        (image) => image.preview === true
      );
      if (filterTrue.length) {
        review.Spot.previewImage = filterTrue[0].url;
      } else {
        review.Spot.previewImage = "No Preview Image Available";
      }
    } else {
      review.Spot.previewImage = "No Preview Image Available";
    }
    delete review.Spot.SpotImages;
  }

  res.json({
    Reviews: reviewObjects,
  });
});



module.exports = router;
