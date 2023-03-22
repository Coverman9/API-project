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

router.get('/current', requireAuth, async(req, res) => {
    const { user } = req
    const review = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]

    })

    res.json({
        Reviews: review
    })
})





module.exports = router;
