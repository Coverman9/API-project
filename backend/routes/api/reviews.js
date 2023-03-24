const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const createReviewValidation = require('../../utils/review-validation.js')
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

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const reviewId = parseInt(req.params.reviewId);

  const reviews = await Review.findAll();
  const reviewsArr = [];
  let isExist = false;
  reviews.forEach((review) => reviewsArr.push(review.toJSON()));
  for (let review of reviewsArr) {
    if (review.id == reviewId) {
      isExist = true;
      break;
    }
  }
  if (!isExist) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId,
    },
  });
  if (reviewImages.length > 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 404;
    return next(err);
  }
  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });
  res.json({
    id: newImage.id,
    url: newImage.url,
  });
});

//Edit a Review
router.put("/:reviewId", requireAuth, createReviewValidation, async (req, res, next) => {
  const { user } = req;
  const { review, stars } = req.body;
  const updatedReview = await Review.findByPk(req.params.reviewId);
  if (!updatedReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (updatedReview.toJSON().userId == user.id) {
    await updatedReview.update({
      review,
      stars,
    });
  } else {
    const err = new Error("Forbidden");
    err.status = 404;
    return next(err);
  }
  res.json(updatedReview);
});

//Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const deleteReview = await Review.findByPk(req.params.reviewId);
  if (!deleteReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
  if (deleteReview.toJSON().userId == user.id) {
    await deleteReview.destroy();
    res.status(200);
    res.json({
      message: "Successfully deleted",
    });
  } else {
    const err = new Error("Forbidden");
    return next(err);
  }
});

module.exports = router;
