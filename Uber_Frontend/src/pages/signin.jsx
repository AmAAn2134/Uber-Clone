import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import  axios  from 'axios';

const Signin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);

  async function SubmitHandle(){
    // submit form logic here
    console.log(email, password);
    const user = {
      email:email,
      password:password
    };
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }else{
      alert('Invalid email or password');
    }

    setUserData({email, password});
    setEmail('');
    setPassword('');
  }
  return (
    <div className='bg-white h-screen flex flex-col justify-between p-5'>   
        <div className='bg-white'>
          <h1 className='font-bold text-3xl mb-5'> Uber</h1>
          <form action="" className='' onSubmit={(e)=>{
            e.preventDefault();
            SubmitHandle();
          }}>
            <h3 className='mb-2 text-lg font-medium'>What's your email</h3>
            <input 
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
              type="email"
              required 
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              placeholder='email@example.com'
            />
            <h3 className='mt-5 mb-2 font-medium text-lg'> Enter Password</h3>
            <input
             className='bg-[#eeeeee] w-full rounded px-4 py-2 border '
              type="password" 
              required 
              placeholder='password' 
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button className='w-full mt-7 justify-center items-center text-white bg-black p-3 rounded-lg font-semibold'>Login</button>

          <div className='bg-white flex items-center justify-center mt-1'>
              <span className='text-gray-500'>Don't have an account? </span>
              <a href='/signup' className='text-blue-500'>Sign Up</a>
          </div>

         </form>
         </div>
        <div>
          <div className='bg-white'>
              <button className='w-full mt-2 justify-center items-center text-white bg-yellow-700 p-2 rounded-lg font-semibold ' onClick={()=>{
                navigate('/caption-login');
              }}>Signin a Caption</button>
          </div>

          <div className='bg-white flex items-center justify-center pt-2'>
            <span className='text-gray-500'>Don't have an account for caption? </span>
            <a href='/caption-signup' className='text-blue-500'>Sign Up</a>
          </div>
        </div>
        
     </div>
  )
}

export default Signin
