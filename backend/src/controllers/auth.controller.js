import userModel from "../models/user.model.js"



export const register =async (req,res)=>{
    const{email,contact,password,fullname}=req.body

    try{
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
}