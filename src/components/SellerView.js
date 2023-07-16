import { doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../config/firebase';

const SellerView = (props) => {

  const userRef = doc(db,'user',props.userDetail.id)

  const removeSeller = () => {
    updateDoc(userRef,{
      isSeller:false
    })
    window.location.reload(false);
  }

  return (
    <div className=' flex mx-28 bg-white h-20 items-center shadow-md rounded-md border border-gray-300'>
      <div className=' flex flex-row'>
        <h1 className='pl-10 w-96'><span className=' font-bold text-lg'>Name:</span> {props.userDetail.userName}</h1>
        <h1 className=' pl-20'><span className=' font-bold text-lg'>Email:</span> {props.userDetail.email}</h1>
        <h1 className=' pl-20'><span className=' font-bold text-lg'>Address:</span> {props.userDetail.address}</h1>
      </div>
      <div className=' flex w-full justify-end mr-14'>
        <button onClick={removeSeller} className=' bg-red-400 p-2 rounded-md text-white hover:bg-red-600'>Remove</button>
      </div>
    </div>
  )
}

export default SellerView;