import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    sellerProducts: [],
    singleProduct: null,
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { setSellerProducts, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;