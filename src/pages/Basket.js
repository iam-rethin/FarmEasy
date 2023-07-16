import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import BasketProduct from '../components/BasketProduct';
import { db } from '../config/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const Basket = () => {
  const location = useLocation();
  const loggedUser = location.state.loggedUser
  const hideSellerReg = location.state.hideSellerReg
  const [basketProducts, setBasketProducts] = useState(null)
  let filteredBasketProducts = []


    const productRef = collection(db, 'basket')
    const findingBasketProducts = async() => {
        const productDocs = await getDocs(productRef)
        setBasketProducts(productDocs.docs.map((doc)=>doc.data().addToBasket===true && doc.data().buyerEmail===loggedUser? {...doc.data(), docId: doc.id}:null))
    }

    const filtering = () => {
      filteredBasketProducts = basketProducts?.filter(product=>{return product!==null})
    }

    const placeOrder = () => {
      filtering();
      filteredBasketProducts?.forEach(async(product)=>{
        const docRef = doc(db, 'basket', product.docId)
        await updateDoc(docRef, {
          orderPlaced: true,
          addToBasket: false
        })
      })
      window.location.reload(false);
    }
  
    


    useEffect(()=>{findingBasketProducts()},[])

  return (
    <div className='flex flex-col h-full w-full'>
      <div>
        <Navbar loggedUser={loggedUser} hideSellerReg={hideSellerReg}/>
      </div>

        <div className=' bg-white rounded-2xl h-fit w-[1200px] self-center px-20 py-20 mb-80'>
        <div className='grid grid-cols-3 grid-flow-col space-x-11'>
         { basketProducts?.map((product)=>product!=null?<BasketProduct product={product}/>:null)}
        </div>
        
        <div className='flex justify-center'>
        
        {<button onClick={placeOrder} className=' h-20 w-60 bg-yellow-300 rounded-2xl text-2xl self-end mt-20 hover:bg-yellow-500'>Place Order</button>}
        </div>

      </div>

    </div>
  )
}

export default Basket;