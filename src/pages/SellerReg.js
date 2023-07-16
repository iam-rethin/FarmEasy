import { useEffect, useState } from "react"
import check from '../assets/check.png'
import { Link, useLocation } from "react-router-dom"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"


const SellerReg = () => {

    const location = useLocation()
    const loggedUser = location.state.loggedUser
    const [registerButton, setRegisterButton] = useState(false)
    const [id, setId] = useState('')
    const [alreadyReq, setAlreadyReq] = useState(false)

    const collectionRef = collection(db,'user')

    const getId = async () => {
      const userDocs = await getDocs(collectionRef)
      userDocs.docs.forEach((doc)=>doc.data().email===loggedUser && setId(doc.id))
      userDocs.docs.forEach((doc)=>doc.data().sellerReq===true && doc.data().email===loggedUser && setAlreadyReq(true))
    }

    const setRequest = async () => {
      const userRef = doc(db, 'user', id)
      await updateDoc(userRef,{
        sellerReq: true
      })
      setRegisterButton(true)
    }

    useEffect(()=>{
      getId()
    })
    
    return (
      <div className= ' bg-green-300 h-screen flex justify-center items-center'>

        {
          alreadyReq===false? 
          <div className='bg-white h-[400px] w-[400px] shadow-2xl flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold'>Ready to be a seller?<br/>Request Easy</h1>
          <br/>
          <p className=" px-20 mb-9 text-gray-500">A quality assurance team will visit your farm and proceed accordingly.</p>

          { registerButton===false? 
          <button onClick={setRequest} className=' font-normal bg-yellow outline outline-offset-0 bg-green-200 
              outline-transparent p-2 rounded-md hover:bg-green-300 cursor-pointer'>Request</button>
               : <img className="h-14 w-14" src={check} alt="check logo"/> }
          
          { registerButton===false? '':<Link className=" mt-4 text-gray-500 hover:text-gray-600" to='/home' state={{loggedUserEmail: loggedUser}}>Goto Home</Link>}
      </div>

          :

          <div className='bg-white h-[400px] w-[400px] shadow-2xl flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>You have already Requested !</h1>
            <br/>
            <p className=" px-20 mb-9 text-gray-500">Wait for the quality assurance team to visit your farm.</p>
          </div>

        }

        
      </div>
    )
}


export default SellerReg