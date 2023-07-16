import React, { useEffect, useState } from 'react';
import {getDocs, collection} from 'firebase/firestore'
import {db} from '../config/firebase'
import  SellerView from '../components/SellerView'
import { SellerReqView } from '../components/SellerReqView'


const AdminDash = () => {

    const [toggleViews, setToggleViews] = useState(false)

    const userRef = collection(db,'user')

    const [usersDetails, setUsersDetails] = useState(null)

    const getUserDetails = async () => {
      const userDocs = await getDocs(userRef)
        console.log(userDocs)
        setUsersDetails(userDocs.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    

    useEffect(()=>{
      getUserDetails();
    },[])

  return (
    <div className=' h-screen w-full'>
      
      {/*admin navbar */}

      <div className=' bg-black bg-opacity-50 h-28 mb-20 w-full px-9 flex items-center'>
        <div>
            <h1 className=' font-extrabold text-3xl text-white'>ADMIN PANEL</h1>
        </div>
        <div className='flex justify-end w-full space-x-9 text-xl text-white'>
              <button className=' active:text-gray-300' onClick={()=>setToggleViews(false)}>Registered Sellers</button>
              <button className=' border-l-2 pl-6 active:text-gray-300' onClick={()=>setToggleViews(true)}>Seller Requests</button>
        </div>

    </div>

      <div className=' flex flex-col space-y-7'>
        {toggleViews===false? usersDetails?.map((userDetail)=>userDetail.isSeller===true? <SellerView userDetail={userDetail}/> : '') 
            : usersDetails?.map((userDetail)=>userDetail.sellerReq===true? <SellerReqView userDetail={userDetail}/> : '')}
      </div>

    </div>
  )
}

export default AdminDash