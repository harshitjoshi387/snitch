import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI is not defined in environment variable")
}
if(!process.env.GOOGLE_CLIENT_ID){
  throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL:GOOGLE_CALLBACK_URL

};