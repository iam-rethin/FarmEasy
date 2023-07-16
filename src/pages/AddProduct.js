import React, { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import check from '../assets/check.png'
import { useNavigate } from 'react-router-dom';

import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from 'uuid'
import SellerDash from './SellerDash';

const AddProduct = (props) => {

    const[name, setName] = useState('')

    const navigate = useNavigate();

    const [imageUpload, setImageUpload] = useState(null);
    const modifiedName = imageUpload==null? '' : imageUpload.name+v4()
    const [imageName, setImageName] = useState('')
    

    const [postButton, setPostButton] = useState(false);

    const [url, setUrl] = useState('')

    const location = useLocation();
    const loggedUser = location.state.loggedUser;


    const schema = yup.object().shape({
        name: yup.string().required().min(3),
        category: yup.string().required(),
        price: yup.number().integer().positive().required(),
        //image: yup.mixed().required()
    })

    const { register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    })

    const productsRef = collection(db, 'products')


    const addProduct = async (data) => {

        if(url===''){
            const imageListRef = ref(storage,'images/')
            listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>item.name===modifiedName? getDownloadURL(item).then((url)=>{setUrl(url)}) && setImageName(item.name) : '')
            setPostButton(true)
        })
        }
        
        else if(url!==''){
            await addDoc(productsRef,{
                productName: data.name,
                category: data.category,
                productPrice: data.price,
                sellerEmail: loggedUser,
                imageUrl: url,
                imageName: imageName
            })
            
            setName(data.name)
            
        }
    }


    //thazhott image uploading

    const uploadProductImage = () => {

        if (imageUpload == null) return;
        const storageRef = ref(storage, `images/${modifiedName}`)
        uploadBytes(storageRef,imageUpload).then(()=>{
            alert('Image Uploaded')
        })
        
    }


  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='bg-white flex flex-col items-center py-20 shadow-xl'>
            <div className='mb-14 text-2xl font-bold'>
                <h1>Add new product</h1>
            </div>
            <div className='flex flex-col items-center'>
                <input type='file' onChange={(event)=>{setImageUpload(event.target.files[0]);}} className=' pl-24'/>
                <button onClick={uploadProductImage} className=' bg-slate-300 w-20 rounded-md my-10 px-2 py-1 hover:cursor-pointer hover:bg-slate-400'>Upload</button>
            </div>

            <div>
                <form onSubmit={handleSubmit(addProduct)} className='flex flex-col items-center space-y-14'>
                    <input type='text' placeholder='Enter the product name...' {...register('name')}/>
                    <select {...register('category')} className=' bg-slate-200 w-60 h-8 px-2 opacity-60'>
                        <option value=''>Select Category</option>
                        <option value='fruit'>Fruit</option>
                        <option value='veg'>Vegetable</option>
                        <option value='plant'>Plant</option>
                    </select>
                    <input type='number' placeholder='Enter its price...' {...register('price')}/>
                    
                    { postButton===false? 
                        <input type='submit' value='Post' className='font-normal rounded-md bg-yellow outline outline-offset-0 bg-green-200 outline-transparent py-2 px-4 hover:bg-green-300 cursor-pointer'/>
                        : <img className="h-14 w-14" src={check} alt="check logo"/> }
        
                    { postButton===false? '':<button onClick={()=>addProduct} className=" mt-4 text-gray-500 hover:text-gray-600">Goto Dashboard</button>}
                </form>
            </div>
        </div>
    </div>    
  )
}

export default AddProduct