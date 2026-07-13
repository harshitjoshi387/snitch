import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";



export const register =async (req,res)=>{
    const{email,contact,password,fullname,isSeller}=req.body

    try{
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const user = await userModel.create({
            email,
            contact,
            password,
            fullname
        })
        return res.status(201).json({message:"User created successfully"})
    } catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || "supersecret", 
            { expiresIn: "1d" }
        );
        return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const getMe = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}