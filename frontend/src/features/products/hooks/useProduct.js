import { useDispatch } from 'react-redux';
import { setSellerProducts, setSingleProduct, setAllProducts } from '@/features/products/store/productSlice';
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

  async function handleGetProductById(productId) {
    const data = await productApi.getProductById(productId);
    dispatch(setSingleProduct(data));
    return data.product;
  }
  async function handleGetAllProducts() {
  const data = await productApi.getAllProducts();
  dispatch(setAllProducts(data.products));
  return data.products;
}

  return { handleCreateProduct, handleGetSellerProduct, handleGetProductById,handleGetAllProducts };
};

export default useProduct;