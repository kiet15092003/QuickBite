import React, { useState } from 'react'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

const AuthScreen = () => {

  const [activeSite, setActiveSite] = useState<string>('login')

  return (
    <div className='w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-white'>
      <div
        className='absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url("/images/foodBgAuth.jpg")`,
        }}
      ></div>
      
      <div className='relative z-10 backdrop-blur-md bg-white/80 rounded-md p-5'>
        {
          activeSite === 'login' ? 
            (<Login setActiveSite={setActiveSite}/>) : 
            (<Register setActiveSite={setActiveSite}/>)
        }
      </div>
    </div>
  )
}

export default AuthScreen
