import React from 'react'
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className=' bg-center bg-[url(https://media.istockphoto.com/id/847380272/vector/parking-lot-design.jpg?s=612x612&w=0&k=20&c=JvLlIEjI8cY2UNqKIeKadtLw_FzXDPs7-XMe_Y7iYnw=)] bg-bg-cover h-screen pt-5  flex justify-between flex-col w-full'>
        <h1 className='text-2xl font-bold  px-6'>Uber</h1>
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
          <button onClick={()=>{
            navigate('/login');
          }} className='w-full bg-black text-white py-3  rounded mt-5'>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Start;
