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

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const image = await SpotImage.findByPk(req.params.imageId, {
    include: [
      {
        model: Spot,
        attributes: ["ownerId"],
      },
    ],
  });
  if (!image) {
    const err = new Error("Spot image couldn't be found");
    err.status = 404;
    return next(err);
  }
  const deleteImage = image.toJSON();
  if (deleteImage.Spot.ownerId != user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  await image.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
