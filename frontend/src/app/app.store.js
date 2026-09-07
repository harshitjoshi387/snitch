import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import productReducer from '@/features/products/store/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
