import apiClient from '@/app/apiClient';

export async function createProduct(formData) {
  const response = await apiClient.post('/product', formData);
  return response.data;
}

export async function getSellerProduct() {
  const response = await apiClient.get('/product/seller');
  return response.data;
}

const productApi = {
  createProduct,
  getSellerProduct,
};

export default productApi;
