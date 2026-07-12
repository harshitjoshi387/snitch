import {Router}from "express"
import {validRegisterUser} from "../validator/auth.validator.js"
import { register, login } from "../controllers/auth.controller.js"

const router =Router()

router.post('/register', register)
router.post('/login', login)

export default router