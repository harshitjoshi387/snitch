import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI is not defined in environment variable")
}
if(!process.env.GOOGLE_CLIENT_ID){
  throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
  throw new error("imgaekit private key is not define")
}

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
};