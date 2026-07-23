import apiClient from './apiClient';

export async function createProduct(formData) {
  const response = await apiClient.post('/products/create', formData);
  return response.data;
}

export async function getSellerProduct() {
  const response = await apiClient.get('/products/seller');
  return response.data;
}

const productService = {
  createProduct,
  getSellerProduct,
};

export default productService;
