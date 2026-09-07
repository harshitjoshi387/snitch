import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '@/features/products/hooks/useProduct'

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct()
  const products = useSelector(state => state.product.sellerProducts)
  console.log(products)
  useEffect(() => {
    handleGetSellerProduct();
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
