import { body, validationResult } from "express-validator"

export const createProductValidator = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isString().withMessage("Description must be a string"),

    body("price")
        .custom((value) => {
            let amt = value;
            if (typeof value === "string") {
                try {
                    const parsed = JSON.parse(value);
                    if (typeof parsed === "object" && parsed !== null) {
                        amt = parsed.amount;
                    }
                } catch (_e) {
                    amt = value;
                }
            } else if (typeof value === "object" && value !== null) {
                amt = value.amount;
            }

            if (amt === undefined || amt === null || amt === "") {
                throw new Error("Price amount is required");
            }
            if (isNaN(Number(amt))) {
                throw new Error("Price amount must be a number");
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]