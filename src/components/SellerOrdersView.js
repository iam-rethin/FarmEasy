import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useState } from 'react'

const SellerOrdersView = (props) => {


  const markAsDelivered = async () => {
    const orderRef = doc(db, 'basket', props.order.docId)
    await updateDoc(orderRef,{
      delivered:true
    })
    window.location.reload(false);
  }
  const [toggle, setToggle] = useState(false)

  return (
    <div className=' h-96 w-80 bg-white shadow-2xl rounded-xl'>
        <div className=' h-60 rounded-t-xl'>
            {toggle&&<p className=' text-xl p-12'>{props.order.buyerAddress}</p>}
            {toggle===false&&<img className=' h-full w-full rounded-t-xl' src={props.order.imageUrl} alt='product img'/>}
        </div>
        <div className=' h-20 flex flex-col items-center pt-3'>
            <p className=' text-2xl font-medium'>{props.order.productName}</p>
            <p>Price: {props.order.productPrice} INR</p>
        </div>
        <div className='h-16 flex justify-center space-x-8'>
            <button onClick={markAsDelivered} className=' text-gray-600 hover:text-black h-14 w-28 bg-green-400 shadow-sm rounded-xl hover:bg-green-600'>Mark as Delivered</button>
            <button onClick={()=>setToggle(!toggle)} className=' text-gray-600 hover:text-black h-14 w-28 px-2 bg-teal-400 shadow-sm rounded-xl hover:bg-teal-600'>View Address</button>
        </div>
    </div>
  )
}

export default SellerOrdersView