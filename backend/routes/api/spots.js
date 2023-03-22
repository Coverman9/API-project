const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.json({
    Spots: spots,
  });
});

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const current = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  });
  res.json({
    Spots: current,
  });
});

router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  res.json(spot);
});

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

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
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

router.put("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.findByPk(req.params.spotId);
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

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;

  const deleteSpot = await Spot.findByPk(req.params.spotId)
  if (deleteSpot.ownerId !== user.id) {
    const err = new Error('You can delete only your spot')
    err.status(404)
    return next(err)
  }

  await deleteSpot.destroy()
  res.status(200)
  res.json({
    "message": "Successfully deleted"
  })
});






module.exports = router;
