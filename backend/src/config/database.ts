import mongoose from "mongoose"


export const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        console.error('Error connecting to database',error)
        throw error
    }
}