import mongoose from "mongoose";
import dns from "dns";
import config from "./config.js";

const connectDB = async () => {
  try {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (_dnsErr) {
      // ignore if custom DNS server override is restricted
    }
    await mongoose.connect(config.mongoUri);
    console.log(`✅ MongoDB connected`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`); 
    process.exit(1);
  }
};

export default connectDB;
