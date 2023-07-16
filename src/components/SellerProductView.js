import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../config/firebase'
import { deleteObject, ref } from 'firebase/storage'

const SellerProductView = (props) => {


  const removeProd = async () => {
    const productRef = doc(db, 'products', props.product.docId)
    await deleteDoc(productRef)
    const imageRef = ref(storage,`images/${props.product.imageName}`)
    deleteObject(imageRef).then(()=>{
      alert('Product removed successfully')
      window.location.reload(false);
    }).catch((error) => {
      console.log('Error occurred!')
    })
  }

  return (
    <div className=' h-96 w-80 bg-white shadow-2xl rounded-xl'>
        <div className=' bg-black h-60 rounded-t-xl'>
            <img className=' h-full w-full rounded-t-xl' src={props.product.imageUrl} alt='product img'/>
        </div>
        <div className=' h-20 flex flex-col items-center pt-3'>
            <p className=' text-2xl font-medium'>{props.product.productName}</p>
            <p>Price: {props.product.productPrice} INR</p>
        </div>
        <div className='h-16 flex justify-center'>
            <button onClick={removeProd} className=' h-12 w-28 bg-red-400 shadow-sm rounded-xl text-white hover:bg-red-600'>Remove</button>
        </div>
    </div>
  )
}

export default SellerProductView