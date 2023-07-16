import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { createContext, useState } from 'react'

export const loginProvider = createContext()

export const Login = () => {
  
  const navigate = useNavigate();
  //const [loggedUserEmail, setLoggedUserEmail] = useState('none')
  let loggedUserAddress=''
  let loggedUserEmail = ''//home page ilott kodukkan seller req show cheyyano vndayonnum cart okke settakkan

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(15)
  })

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const userRef = collection(db, 'user')

  const onUserLogin = async (data) => {
    let temp = true;
    const userDocs = await getDocs(userRef);
    userDocs.forEach((doc)=>{
      if(doc.data().email===data.email && doc.data().password===data.password){
        loggedUserEmail=doc.data().email
        loggedUserAddress=doc.data().address
        navigate('/home', {
          state: {
            loggedUserEmail:{loggedUserEmail},
            loggedUserAddress:{loggedUserAddress}
          }
        });
        temp = false;
      }
    })
    if(temp){alert('Email or password incorrect!')}
  }

  return (
    <div className= ' h-screen flex justify-center items-center'>
      <div className='bg-white h-[500px] w-[400px] shadow-2xl'>
        <form onSubmit={handleSubmit(onUserLogin)} className='flex flex-col items-center space-y-9 py-[90px]'>
          <h1 className='text-2xl font-bold'>Welcome to FarmEasy</h1>
          <br/>
          <input type="text" className="outline outline-transparent " placeholder='Enter registered email...' {...register('email')}/>
          <input type="password" className="outline outline-transparent " placeholder='Enter password...' {...register('password')}/>
          <input type="submit" value='Log in' className=' font-normal rounded-md bg-yellow outline outline-offset-0 bg-green-200 outline-transparent p-2 hover:bg-green-300 cursor-pointer'/>
          <Link to='/register' className='opacity-40'>New user? Register here</Link>
        </form>
      </div>
    </div>
    
  )
}