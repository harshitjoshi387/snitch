import{Router} from 'express'
import {authenticateSeller}from "../middleware/auth.middleware.js"
import { createProduct } from '../controllers/product.controller.js';
import multer from "multer"
const router = express.Router()

const upload= multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024
    }
})

router.post("/product",authenticateSeller,upload.array("images",7),createProduct)




export default ProductRouter