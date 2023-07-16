import React from 'react'

const ErrorPage = () => {
  return (
    <div className= ' h-screen flex justify-center items-center'>
        <div className='bg-white h-[400px] w-[400px] shadow-2xl flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Sorry!<br/><span className=' text-gray-600'>Page Not Found</span></h1>
        </div>
      </div>
  )
}

export default ErrorPage