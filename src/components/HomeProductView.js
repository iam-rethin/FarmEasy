import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../config/firebase'

const HomeProductView = (props) => {

  const basketRef = collection(db,'basket')
  const mapping = async() => {
    await addDoc(basketRef,{
      ...props.product,
      quantity: 1,
      orderPlaced: false,
      buyerEmail: props.loggedUser,
      buyerAddress: props.loggedUserAddress,
      addToBasket: true,
      delivered: false,
    })

  }
  return (
    <div className=' h-96 w-80 bg-white shadow-2xl rounded-xl'>
        <div className='h-60 '>
            <img className=' h-full w-full rounded-t-xl' src={props.product.imageUrl} alt='product img'/>
        </div>
        <div className=' h-20 flex flex-col items-center pt-3'>
            <p className=' text-2xl font-medium'>{props.product.productName}</p>
            <p>Price: {props.product.productPrice} INR</p>
        </div>
        <div className='h-16 flex justify-center'>
            <button onClick={mapping} className=' h-12 w-36 bg-yellow-400 shadow-sm rounded-xl px-3 text-gray-600 hover:bg-yellow-500 hover:text-gray-700'>Add to Basket</button>
        </div>
    </div>
  )
}

export default HomeProductView