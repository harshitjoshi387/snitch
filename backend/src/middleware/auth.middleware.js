import jwt from "jsonwebtoken"

import config from "../config/config.js"
import UserModel from "../models/user.model.js";

export const authenticateSeller =async (req,res,next)=>{
    const token= req.cookie.token

    if(!token){
       return  res.status(401).json({
            message:"Unauthorised"
        })
    }

    try{
        const decoded= jwt.verify(token, config,JWT_SECRET)
        const user =await UserModel.findbyId(decoded.id)
        
    if(!user){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }
    if(user.id!=="seller"){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    }
    catch (err){
        console.log(err)
        return res.status(401).json({
            message:"Unauthorised"
        })
    }
}