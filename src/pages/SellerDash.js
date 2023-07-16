import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { db } from '../config/firebase';
import SellerProductView from '../components/SellerProductView';
import SellerOrdersView from '../components/SellerOrdersView';

const SellerDash = () => {
    const location = useLocation()
    const loggedUser = location.state?.loggedUser
    let [productDetails, setProductDetails] = useState(null)
    let [orderDetails, setOrderDetails] = useState(null)
    const [toggle, setToggle] = useState(false)

    const productRef = collection(db,'products')
    const orderRef = collection(db, 'basket')
    const getProductDocs = async () => {
        const productDocs = await getDocs(productRef)
        setProductDetails(productDocs.docs.map((doc)=>doc.data().sellerEmail===loggedUser? {...doc.data(), docId: doc.id} : null))
    }
    const getOrderDocs = async () => {
        const orderDocs = await getDocs(orderRef)
        setOrderDetails(orderDocs.docs.map((doc)=>doc.data().sellerEmail===loggedUser && doc.data().delivered===false && doc.data().orderPlaced===true? {...doc.data(), docId: doc.id} : null))
    }


    useEffect(()=>{
        getProductDocs();
        getOrderDocs();
    },[])

  return (
    <div className='w-full h-screen '>
        <div className=' bg-black bg-opacity-50 h-28 mb-20 w-full px-9 flex items-center'>
            <div>
                <h1 className=' font-extrabold text-3xl text-white'>SELLER DASHBOARD</h1>
            </div>
            <div className='flex justify-end w-full space-x-9 text-xl text-white'>
                {toggle===false?<button onClick={()=>setToggle(true)} className=' active:text-gray-300'>View Recieved Orders</button>:<button onClick={()=>setToggle(false)} className=' active:text-gray-300'>Show Added Products</button>}
                <Link to='/add-prod' state={{loggedUser: loggedUser}} className=' border-l-2 pl-6 active:text-gray-300'>Add a Product</Link>
            </div>
        </div>

        {
        toggle===false? <div className=' grid gap-16 grid-cols-4 px-36 '>{productDetails?.map((product)=>product&&<SellerProductView product={product}/>)}</div>
        : <div className=' grid gap-16 grid-cols-4 px-36 '>{orderDetails?.map((order)=>order&&<SellerOrdersView order={order}/>)}</div>}
        

    </div>
  )
}

export default SellerDash