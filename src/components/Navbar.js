import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className=' bg-black bg-opacity-50 h-28 w-full px-9 flex items-center mb-16'>
        <div>
            <h1 className=' font-extrabold text-3xl text-white'>FARM EASY</h1>
        </div>
        <div className='flex justify-end w-full space-x-9 text-xl text-white'>
              {props.hideSellerReg===true? <Link to='/seller-dash' state={{loggedUser:props.loggedUser}}>Seller Dashboard</Link> : <Link to='/seller-reg' state={{loggedUser:props.loggedUser}}>Become a Seller</Link>}
              <Link to='/basket' state={{loggedUser: props.loggedUser, hideSellerReg: props.hideSellerReg}}>Basket</Link>
              <Link to='/view-orders' state={{loggedUser: props.loggedUser, hideSellerReg: props.hideSellerReg}}>View Orders</Link>
              <Link to='/' className=' border-l-2 pl-6'>Log Out</Link>
        </div>

    </div>
  )
}

export default Navbar