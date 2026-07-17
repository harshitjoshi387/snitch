import {createProduct,getSellerProduct} from "../service/product.api"

export const useProduct =()=>{
    async function handleCreateProduct(formData) {
        const data= createProduct(formData)
        return data.product
    }
}
