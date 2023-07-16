import React from 'react'

const OrderView = (props) => {
  return (
    <div className=' flex mx-28 bg-white h-20 items-center shadow-md rounded-md border border-gray-300'>
      <div className=' flex flex-row'>
        <h1 className='pl-10 w-96'><span className=' font-bold text-lg'>Product Name:</span> {props.orderDetails.productName}</h1>
        <h1 className=' pl-20'><span className=' font-bold text-lg'>Seller Email:</span> {props.orderDetails.sellerEmail}</h1>
        <h1 className=' pl-20'><span className=' font-bold text-lg'>Delivery Status:</span> {props.orderDetails.delivered?'Order Delivered':'The order is being processed...'}</h1>
      </div>
    </div>
  )
}

export default OrderView