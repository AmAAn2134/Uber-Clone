import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'   

const CaptainProtectWrapper = (
   {children}
) => {
    const token = localStorage.getItem('token');
    const { captain,setCaptain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    console.log(token);
    
    useEffect(() => {
      if (!token) {
        navigate('/caption-login', { replace: true })
      }
    } ,[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}`, {
         headers:{
             Authorization: `Bearer ${token}` 
            }
         })
     .then(response => {
        if(response.status === 200){
          const data = response.data;
          console.log(data);
          setCaptain(response.data)
          setLoading(false);
        }
    }).catch(error => {
        navigate('/caption-login', { replace: true })
        console.log(error);
    });
    // return null

  
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper
