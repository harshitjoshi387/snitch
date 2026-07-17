import{ createSlice } from "@reduxjs/toolkit"



const productSlice = createSlice({
    name:"product",
    initialState:{
        selllerProducts:[]
    },
    reducers:{
        setSellerProducts:(State,action)=>{
            state.sellerProducts=action.payload
        }
    }

})

export const {setSellerProducts}= productSlice.actions
export default productSlice.reducer