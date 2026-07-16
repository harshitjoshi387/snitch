import{Router} from 'express'
import {authenticateSeller}from "../middleware/auth.middleware.js"
import { createProduct, getSellerProducts } from '../controllers/product.controller.js';
import multer from "multer"
const router = express.Router()

const upload= multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024
    }
})

/**
 * @route post/api/products
 * @description create a new product
 * @access private (Seller Only)
 */

router.post("/product",authenticateSeller,createProductValidator,upload.array("images",7),createProduct)

/**
 * @route Get/api/product/seller
 * @description Get all the products of the authenticated seller
 * @access private(Seller only )
 */
router.get("/seller",getSellerProducts)


export default ProductRouter