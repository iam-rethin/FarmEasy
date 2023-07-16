import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import {db} from '../config/firebase.js'
import OrderView from '../components/OrderView'

const ViewOrders = () => {

  const location = useLocation()
  const [orders, setOrders] = useState(null)

  const orderDocsRef = collection(db, 'basket')
  const getOrders = async () => {
    const orderDocs = await getDocs(orderDocsRef)
    setOrders(orderDocs.docs.map((doc)=>doc.data().buyerEmail===location.state.loggedUser && doc.data().orderPlaced===true? {...doc.data()}:null))
  }
  useEffect(()=>{
    getOrders();
  },[])

  return (
    <div>
        <div>
          <Navbar hideSellerReg={location.state.hideSellerReg.hideSellerReg} loggedUser={location.state.loggedUser}/>
        </div>
        <div className=' flex flex-col space-y-7'>
          {orders?.map((data)=>data!==null?<OrderView orderDetails={data}/>:'')}
        </div>
        <div className=' flex justify-center mt-9'>
          <button onClick={()=>window.history.go(-1)} className=' bg-yellow-300 p-2 rounded-md hover:bg-yellow-400'>Go back to Home Page</button>
        </div>
    </div>
  )
}

export default ViewOrders