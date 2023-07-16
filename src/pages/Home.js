import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getDocs, collection} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import veggies from '../assets/veggies.jpeg'
import fruits from '../assets/fruits.jpeg'
import plants from '../assets/plants.jpeg'

const Home = () => {

  const navigate = useNavigate()
  
  let [productDetails, setProductDetails] = useState(null)
  const location = useLocation(); //login pagil ninnan ith vannath using useNavigate ividunn ini navbar ilott pokum avidunn sellerdash
  const loggedUserEmail = location.state.loggedUserEmail.loggedUserEmail;
  const loggedUserAddress = location.state.loggedUserAddress.loggedUserAddress;
  const userRef = collection(db, "user");
  const [hideSellerReg, setHideSellerReg] = useState(false)
  const getUserDocs = async () => {
    const userDocs = await getDocs(userRef)
    userDocs.forEach((doc)=>{if(doc.data().email===loggedUserEmail)setHideSellerReg(doc.data().isSeller)})
  }
//product listing
  const productRef = collection(db, 'products')

  const getProducts = async () => {
    const productDocs = await getDocs(productRef)
    setProductDetails(productDocs.docs.map((doc)=>({...doc.data()})))
  }

  useEffect(()=>{
    getUserDocs();
    getProducts();
  },[])

  //product listing according to category

  return (
    <div className=' h-full w-full'>
      <div>
          <Navbar hideSellerReg={hideSellerReg} loggedUser={loggedUserEmail} loggedUserAddress={loggedUserAddress}/>
      </div>

      <div className='flex justify-center space-x-40 py-16'>
       
        <div className='h-[600px] w-96 hover:h-[620px] hover:w-[404px] shadow-black shadow-2xl'><button onClick={()=>navigate('/veggies',{state:{loggedUserEmail: {loggedUserEmail}, loggedUserAddress:{loggedUserAddress}, hideSellerReg:{hideSellerReg}, productDetails:{productDetails}}})} className=' h-full w-full'><img src={veggies} alt='veggie thumbnail' className=' h-full w-full'/></button></div>
        <div className='h-[600px] w-96 hover:h-[620px] hover:w-[404px] shadow-black shadow-2xl'><button onClick={()=>navigate('/fruits',{state:{loggedUserEmail: {loggedUserEmail}, loggedUserAddress:{loggedUserAddress}, hideSellerReg:{hideSellerReg}, productDetails:{productDetails}}})} className=' h-full w-full'><img src={fruits} alt='fruits thumbnail' className=' h-full w-full'/></button></div>
        <div className='h-[600px] w-96 hover:h-[620px] hover:w-[404px] shadow-black shadow-2xl'><button onClick={()=>navigate('/plants',{state:{loggedUserEmail: {loggedUserEmail}, loggedUserAddress:{loggedUserAddress}, hideSellerReg:{hideSellerReg}, productDetails:{productDetails}}})} className=' h-full w-full'><img src={plants} alt='plants thumbnail' className=' h-full w-full'/></button></div>

      </div>
  
    </div>
  )
}

export default Home