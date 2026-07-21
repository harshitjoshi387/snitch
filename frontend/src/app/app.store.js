import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/products/states/auth.slice'
import productReducer from '@/features/products/states/product.slice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})