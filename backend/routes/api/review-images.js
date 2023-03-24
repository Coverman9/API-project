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
  const image = await ReviewImage.findByPk(req.params.imageId, {
    include: [
      {
        model: Review,
        attributes: ["ownerId"],
      },
    ],
  });
  if (!image) {
    const err = new Error("Review Image couldn't be found");
    err.status = 404;
    return next(err);
  }
  const deleteImage = image.toJSON();
  if (deleteImage.Review.ownerId != user.id) {
    const err = new Error("Cannot delete not yours review image");
    err.status = 403;
    return next(err);
  }

  await image.destroy();
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
