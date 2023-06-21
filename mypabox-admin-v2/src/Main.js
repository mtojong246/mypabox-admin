import React from 'react'
import logo from './My PA Box - Logo Polychrome Horizontal.png'
import { Link, useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()

  //Clears the username in local storage
  //Clears the password in local storage
  //Navigates user to login page
  const signOut = () => {
    localStorage.clear('username')
    localStorage.clear('password')
    navigate('/')
  }

  return (
    <div>
      <div className='bg-blue-500 h-16 w-full'>
        <img src={logo} alt='myPAbox' className='h-16'/>
        <Link href='/schools' className='absolute text-white text-xl top-4 left-[400px]'>
          Schools
        </Link>
        <Link href='/courses' className='absolute text-white text-xl top-4 left-[550px]'>
          Courses
        </Link>
        <Link href='/categories' className='absolute text-white text-xl top-4 left-[700px]'>
          Course Categories
        </Link>
        <Link href='/users' className='absolute text-white text-xl top-4 left-[950px]'>
          Users
        </Link>
        <button onClick={signOut} className='absolute top-4 left-[1300px] text-xl 
        text-white'>Sign Out</button>
      </div>

      <div className='w-40 bg-gray-200 h-screen'></div>
    </div>
  )
}

export default Main
