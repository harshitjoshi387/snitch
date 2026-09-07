import apiClient from './apiClient';

export async function createProduct(formData) {
  const response = await apiClient.post('/product', formData);
  return response.data;
}

export async function getSellerProduct() {
  const response = await apiClient.get('/product/seller');
  return response.data;
}

const productService = {
  createProduct,
  getSellerProduct,
};

export default productService;
