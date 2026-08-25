import { body, validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validRegisterUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .notEmpty().withMessage("Contact is required")
        .customSanitizer(val => String(val ?? ""))
        .matches(/^\d{10}$/).withMessage("Contact must be a 10-digit number"),
    body("password")
        .isLength({min: 6}).withMessage("password must be at least 6 characters"),
    body("fullname")
        .notEmpty().withMessage("full name is required")
        .isLength({min: 3}).withMessage("Full name must be at least 3 characters"),
        
    body("isSeller")
        .optional()
        .isBoolean().withMessage("isSeller must be a boolean"),
    validateRequest
];