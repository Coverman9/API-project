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

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const review = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!review.length) {
    const err = new Error("Spot couldn't be found");
    res.status(404);
    return next(err);
  }

  res.json({
    Reviews: review,
  });
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { review, stars } = req.body;
  const spotId = parseInt(req.params.spotId)

  const reviews = await Review.findAll()
  const reviewsArr = []
  reviews.forEach(review => reviewsArr.push(review.toJSON()))
  for (let review of reviewsArr) {
    if (review.userId == user.id && review.spotId == req.params.spotId) {
      const err = new Error("User already has a review for this page")
      res.status(403)
      return next(err)
    } else if (review.spotId != spotId) {
      const err = new Error("Spot couldn't be found")
      res.status(404)
      return next(err)
    }
  }
  const newReview = await Review.create({
    userId: user.id,
    spotId: spotId,
    review,
    stars
  });
  res.status(201)

  res.json(newReview)
});

//Get al Spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
  });

  const spotObjects = [];
  if (spots.length) {
    spots.forEach((spot) => spotObjects.push(spot.toJSON()));
  } else {
    spotObjects.push(spots);
  }

  for (let spot of spotObjects) {
    if (!Object.keys(spot).length) break;
    const review = await Review.findOne({
      where: {
        spotId: spot.id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });
    if (review && review.toJSON().avgRating > 0) {
      spot.avgRating = Number(review.toJSON().avgRating).toFixed(1);
    } else spot.avgRating = "No Reviews exist for this spot";

    if (spot.SpotImages.length) {
      const filterTrue = spot.SpotImages.filter(
        (image) => image.preview === true
      );
      if (filterTrue.length) {
        spot.previewImage = filterTrue[0].url;
      } else {
        spot.previewImage = "No Preview Image Available";
      }
    } else {
      spot.previewImage = "No Preview Image Available";
    }
    delete spot.SpotImages;
  }

  res.json({
    Spots: spotObjects,
  });
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const currents = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
  });

  const spotObjects = [];
  if (currents.length) {
    currents.forEach((currentSpot) => spotObjects.push(currentSpot.toJSON()));
  } else {
    spotObjects.push(currents);
  }

  for (let spot of spotObjects) {
    //console.log(spot);
    if (!Object.keys(spot).length) break;
    const review = await Review.findOne({
      where: {
        spotId: spot.id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });
    if (review && review.toJSON().avgRating > 0) {
      spot.avgRating = Number(review.toJSON().avgRating).toFixed(1);
    } else spot.avgRating = "No Reviews exist for this spot";

    if (spot.SpotImages.length) {
      const filterTrue = spot.SpotImages.filter(
        (image) => image.preview === true
      );
      if (filterTrue.length) {
        spot.previewImage = filterTrue[0].url;
      } else {
        spot.previewImage = "No Preview Image Available";
      }
    } else {
      spot.previewImage = "No Preview Image Available";
    }
    delete spot.SpotImages;
  }

  res.json({
    Spots: spotObjects,
  });
});

//Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404);
    return next(err);
  }

  const spotObject = spot.toJSON();

  const review = await Review.findOne({
    where: {
      spotId: spot.id,
    },
    attributes: [
      [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      [sequelize.fn("COUNT", sequelize.col("stars")), "numReviews"],
    ],
  });

  if (review) {
    spotObject.numReviews = review.toJSON().numReviews;
    spotObject.avgStarRating = review.toJSON().avgRating;
  } else {
    spotObject.numReviews = 0;
    spotObject.avgStarRating = "No Reviews exist for this spot";
  }

  if (spotObject.User) {
    spotObject.Owner = spotObject.User;
    delete spotObject.User;
  }

  res.json(spotObject);
});

//Create a Spot
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  res.json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404);
    return next(err);
  }
  const newImg = await spot.createSpotImage({
    url,
    preview,
  });

  res.status(200);
  res.json({
    id: newImg.id,
    url: newImg.url,
    preview: newImg.preview,
  });
});

//Edit a Spot
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404);
    return next(err);
  } 
  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.json(spot);
});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;

  const deleteSpot = await Spot.findByPk(req.params.spotId);
  if (!deleteSpot) {
    const err = new Error("Spot couldn't be found");
    res.status(404);
    return next(err);
  }

  await deleteSpot.destroy();
  res.status(200);
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
