import {body,validationRequest}from "express-validator"








export const validateRegisterUser=[
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .noEmpty().withMessage("Contact is required")
        .matches(/^id{10}$/).withMessage("contact must be a 10-digit number"),
    body("password")
        .isLength({min:6}).withMessage("password must be at least 6 character"),
    body("fullname")
        .notEmpty().withMessage("full name is required")
        .length({min: 3}).withMessage("Full name must be at least "),
        
    body("isSeller")
        .notEmpty().withMessage("isSeller is required")
        .isBoolean().withMessage("isSeller must be a boolean"),
    validateRequest
]