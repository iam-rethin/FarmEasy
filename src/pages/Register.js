import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import {db} from '../config/firebase.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const schema = yup.object().shape({
        userName: yup.string().required().min(4).max(15),
        email: yup.string().email().required(),
        district: yup.string().required(),
        PIN: yup.string().required().max(6).min(6),
        address: yup.string().required().max(50).min(15),
        password: yup.string().required().min(6).max(15),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required()
    })

    const {register, handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    //referencing to the collection
    const userRef = collection(db, 'user')

    let emailCheck = false; //ith just true or false aakkan vndi use chythatha
    const onFormSubmit = async (data) => {
        const userDocs = await getDocs(userRef)
        userDocs.forEach((doc)=>{
            if(doc.data().email===data.email){
                emailCheck=true;
            }
        })
        if(emailCheck){
            alert('Email already registered!')
        }
        else if(data.PIN!=='691554' && data.PIN!=='691523'){
            alert('Service to entered pincode not available!')
        }

        else{
            await addDoc(userRef,{
                userName: data.userName,
                email: data.email,
                district: data.district,
                pincode: data.PIN,
                password: data.password,
                isSeller: false,
                sellerReq: false,
                address: data.address
            })
            navigate('/')
        }
    }

  return (

    <div className= ' h-screen flex justify-center items-center'>
        <div className='bg-white h-[950px] w-[400px] shadow-2xl'>
            <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col items-center space-y-9 py-[90px]'>
                <h1 className=' text-2xl font-bold'>Be a part of FarmEasy!</h1>
                <br/>
                <input type='text' className="outline outline-transparent " placeholder='Enter your name...' {...register('userName')}/>
                <p>{errors.userName?.message}</p>
                <input type='text' className="outline outline-transparent " placeholder='Enter your email...' {...register('email')}/>
                <p>{errors.email?.message}</p>
                <select {...register('district')} className=' bg-slate-200 w-60 h-8 px-2 opacity-60'>
                    <option value="">Select district</option>
                    <option value="pathanamthitta">Pathanamthitta</option>
                </select>
                <p>{errors.email?.message}</p>
                <input type='text' className="outline outline-transparent " placeholder='Enter your PIN...' {...register('PIN')}/>
                <p>{errors.PIN?.message}</p>
                <input type='text' className=' border p-2' placeholder='Enter your address...' {...register('address')}/>
                <input type='password' className="outline outline-transparent " placeholder='Enter a password...' {...register('password')}/>
                <p>{errors.password?.message}</p>
                <input type='password' className="outline outline-transparent " placeholder='Confirm password...' {...register('confirmPassword')}/>
                <p>{errors.confirmPassword?.message}</p>
                <input type='submit' value='Register' className=' font-light bg-yellow outline outline-offset-0 bg-green-200 outline-transparent px-3 py-2 shadow-lg hover:bg-green-300 cursor-pointer'/>
            </form>
        </div>
    </div>
    
  )
}

export default Register