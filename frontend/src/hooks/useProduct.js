import { useDispatch } from 'react-redux';
import { setSellerProducts } from '@/store/productSlice';
import productService from '@/services/productService';

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await productService.createProduct(formData);
    return data.product;
  }

  async function handleGetSellerProduct() {
    const data = await productService.getSellerProduct();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  return { handleCreateProduct, handleGetSellerProduct };
};

export default useProduct;
