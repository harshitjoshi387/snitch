import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI is not defined in environment variable")
}

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};