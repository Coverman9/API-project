const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const createSpotValidation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name is required"),
    check('description')
        .isLength({ min:30 })
        .withMessage("Description needs a minimum of 30 characters"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];



module.exports = createSpotValidation;
