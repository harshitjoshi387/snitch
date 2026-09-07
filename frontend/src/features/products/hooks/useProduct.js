import { useDispatch } from 'react-redux';
import { setSellerProducts } from '@/features/products/store/productSlice';
import productApi from '@/features/products/services/product.api';

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await productApi.createProduct(formData);
    return data.product;
  }

  async function handleGetSellerProduct() {
    const data = await productApi.getSellerProduct();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  return { handleCreateProduct, handleGetSellerProduct };
};

export default useProduct;
