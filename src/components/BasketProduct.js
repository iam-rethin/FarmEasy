import React, { useState } from 'react'
import { db } from '../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

const BasketProduct = (props) => {
    let [quantity, setQuantity] = useState(1)
    const product = props.product


    const removeFromBasket = async () => {
      const basketProductRef = doc(db,'basket',product.docId)
      await deleteDoc(basketProductRef)
      window.location.reload(false);
    }
    


  return (
    <div className='h-[400px] w-80 bg-white shadow-2xl rounded-xl flex flex-col items-center'>
        <img src={product?.imageUrl} className=' h-60 w-64 rounded-xl my-6 mx-6'/>
        <p className=' text-xl'>{product?.productName}</p>
        <div className='flex flex-row justify-center mt-6'>
            <button onClick={()=>quantity===1?'':setQuantity(--quantity)} className='hover:bg-slate-300 bg-slate-200 w-8 h-8 rounded-full font-semibold mr-4'>-</button>
            <p>{quantity}</p>
            <button onClick={()=>setQuantity(++quantity)} className='hover:bg-slate-300 bg-slate-200 w-8 h-8 rounded-full font-semibold ml-4'>+</button>
            <button onClick={removeFromBasket} className=' bg-red-300 hover:bg-red-400 h-10 w-20 rounded-xl ml-11'>Remove</button>
        </div>
    </div>
  )
}

export default BasketProduct