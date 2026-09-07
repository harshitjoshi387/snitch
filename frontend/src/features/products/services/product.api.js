import axios from "axios"

const productApiIstance = axios.create({
  baseURL:"/api/products",
  withCredentials:true
})

export async function createProduct(formData){
  const response =await productApiIstance.post("/",formData)
  return response.data
}

export async function getSellerProduct(){
  const response =await productApiIstance.get("/seller")
  return response.data
}




