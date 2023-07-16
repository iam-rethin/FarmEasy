
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export const SellerReqView = (props) => {
  
  const userRef = doc(db,'user',props.userDetail.id)

  const decline = () => {
    updateDoc(userRef,{
      sellerReq: false
    })
    window.location.reload(false);
  }

  const accept = () => {
    updateDoc(userRef,{
      sellerReq: false,
      isSeller:true
    })
    window.location.reload(false);
  }

  return (
    <div className=' flex mx-28 bg-white h-20 items-center shadow-md rounded-md border border-gray-300'>
      <div className=' space-x-40 flex w-full ml-14'>
        <h1><span className=' font-bold text-lg'>Name:</span> {props.userDetail.userName}</h1>
        <h1 className=''><span className=' font-bold text-lg'>Email:</span> {props.userDetail.email}</h1>
        <h1 className=''><span className=' font-bold text-lg'>Address:</span> {props.userDetail.address}</h1>
      </div>
      <div className=' flex flex-row mr-14 space-x-9'>
      <button onClick={accept} className=' bg-green-500 p-2 rounded-md text-white hover:bg-green-700'>Accept</button>
        <button onClick={decline} className=' bg-red-400 p-2 rounded-md text-white hover:bg-red-600'>Decline</button>
      </div>
    </div>
  )
}

//export default SellerReqView;