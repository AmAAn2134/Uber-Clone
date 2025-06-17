import React, { useEffect } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = (
   {children}
) => {
    const token = localStorage.getItem('token')
    const { user } = React.useContext(UserDataContext)
    const navigate = useNavigate()

    console.log(token);
    
    useEffect(() => {
      if (!token) {
        navigate('/login', { replace: true })
      }
    } ,[token])
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
