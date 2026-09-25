import { Router } from 'express'
import { authenticateSeller } from "../middleware/auth.middleware.js"
import { createProduct, getSellerProducts,getProductDetail,getAllProducts } from '../controllers/product.controller.js';
import { createProductValidator } from "../validator/product.validator.js"
import multer from "multer"

const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

/**
 * @route POST /api/product
 * @description create a new product
 * @access private (Seller Only)
 */
router.post("/", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

/**
 * @route GET /api/product/seller
 * @description Get all the products of the authenticated seller
 * @access private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts)
/**
 * @route GET /api/product/all
 * @description Get all listed products (public)
 * @access Public
 */
router.get("/all", getAllProducts);
/**
 * @route GET /api/product/detail/:id
 * @description GET all the detail of the product 
 * @access Public
 */
router.get("/detail/:id",getProductDetail)

export default router