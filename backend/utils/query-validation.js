const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const spotQueryValidation = [
    check('page')
        .optional()
        .isInt({min: 1})
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .isInt({min: 1})
        .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
        .optional()
        .isFloat({min: 0, max: 200 })
        .withMessage("Maximum latitude is invalid"),
    check('maxLat')
        .optional()
        .isFloat({ min: 0, max: 200 })
        .withMessage("Minimum latitude is invalid"),
    check('minLng')
        .optional()
        .isFloat({ min: 0, max: 200 })
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .optional()
        .isFloat({ min: 0, max: 200 })
        .withMessage("Maximum longitude is invalid"),
    check('minPrice')
        .optional()
        .isFloat({ min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),

    handleValidationErrors
];


module.exports = spotQueryValidation;
