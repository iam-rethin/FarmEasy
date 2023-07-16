import React from 'react'
import Navbar from '../components/Navbar'
import HomeProductView from '../components/HomeProductView'
import { useLocation } from 'react-router-dom'

const Vegetables = () => {
    const location = useLocation();
    const productDetails = location.state.productDetails.productDetails;
  return (
    <div  className=' bg-green-300 h-full w-full'>
        <div>
          <Navbar hideSellerReg={location.state.hideSellerReg.hideSellerReg} loggedUser={location.state.loggedUserEmail.loggedUserEmail}/>
        </div>
        <div className=' grid gap-16 grid-cols-4 px-36'>
          
            {productDetails?.map((product)=>product.category==='veg'? <HomeProductView product={product} loggedUser={location.state.loggedUserEmail.loggedUserEmail} loggedUserAddress={location.state.loggedUserAddress.loggedUserAddress}/>:'')}
            
      </div>
    </div>
  )
}

export default Vegetables