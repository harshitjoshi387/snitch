import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useProduct} from '@/hooks/useProduct'
const Dashboard = () => {
  const{handleSellerProduct }=useProduct()
  const products= useSelector()
  useEffect(()=>{
    handleSellerProduct();
  },[])
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard