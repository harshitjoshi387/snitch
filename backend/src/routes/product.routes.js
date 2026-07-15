import{Router} from 'express'
import {authenticateSeller}from "../middleware/auth.middleware.js"
import { createProduct } from '../controllers/product.controller.js';
const router = express.Router()


router.post("/product",authenticateSeller,createProduct)




export default ProductRouter