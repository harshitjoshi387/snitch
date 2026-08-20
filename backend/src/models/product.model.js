import mongoose from "mongoose"

export const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    price:{
        amount:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            enum:["USD","EUR","GBP","JPY","INR"],
            default:"INR"
        }
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
            alt:{
                type:String,
                required:true
            }
        }
    ]
})

export const productModel = mongoose.model("product", productSchema)