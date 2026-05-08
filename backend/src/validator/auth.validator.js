import {body,validationResult}from "express-validator"








export const validateRegisterUser=[
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .noEmpty().withMessage("Contact is required")
        .matches(/^id{10}$/).withMessage("contact must be a 10-digit number"),
]