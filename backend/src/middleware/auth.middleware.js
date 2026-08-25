import jwt from "jsonwebtoken"

import config from "../config/config.js"
import UserModel from "../models/user.model.js";

export const authenticateSeller = async (req, res, next) => {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised"
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }
        if (user.role !== "seller") {
            return res.status(401).json({
                message: "Unauthorised"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Unauthorised"
        });
    }
};