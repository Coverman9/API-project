const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const createReviewValidation = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

module.exports = createReviewValidation;
