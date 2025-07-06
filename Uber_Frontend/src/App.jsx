import React, { useContext } from 'react'
import { Route,Routes} from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Captainsignin from './pages/Captainsignin'
import Captainsignup from './pages/Captainsignup'
import { UserDataContext } from './context/userContext'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/captainHome'
import CaptainProtectWrapper from './pages/captainProtectWrapper'
import Riding from './pages/riding'
const App = () => {
  const ans = useContext(UserDataContext) // Assuming AuthContext is defined elsewhere
   
  return (
    <div className='text-1xl bg-red-400'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/caption-signup' element={<Captainsignup />} />
        <Route path='/caption-login' element={<Captainsignin />} />
        <Route path='/home' element={
            <Home />
        } />
        <Route path='users/logout' element={
          <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
        }
        />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          } 
        />

        {/* Add more routes as needed */}
        {/* Make sure to add UserProtectWrapper around the routes that require authentication */}

      </Routes>
    </div>
  )
}

export default App
