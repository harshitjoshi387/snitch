import { body, validationResult } from "express-validator"

export const createProductValidator = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string"),

    body("price.amount")
        .notEmpty().withMessage("Price amount is required")
        .isNumeric().withMessage("Price amount must be a number"),

    body("price.currency")
        .optional()
        .isIn(["USD", "EUR", "GBP", "JPY", "INR"]).withMessage("Invalid currency"),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]