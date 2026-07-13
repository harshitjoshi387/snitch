import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String},
    contact:{type:String},
    fullname:{type:String},
    googleId:{type:String, unique:true, sparse:true},
    avatar:{type:String},
    role:{type:String, enum:["buyer", "seller"], default:"buyer"}
})
userSchema.pre("save",async function (){
    if(!this.isModified("password") || !this.password) return;
    const hash= await bcrypt.hash(this.password,10);
    this.password=hash;
})
userSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password,this.password);
}
    
const UserModel = mongoose.model("User",userSchema);
export default UserModel;
