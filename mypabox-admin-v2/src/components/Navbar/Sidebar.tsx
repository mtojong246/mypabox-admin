import React from 'react'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  // Find out current pathname in url
  const location = useLocation()

  return (
    <>
      {/* Left navigation bar */}
      {location.pathname === '/' ? '' :
        <div className="absolute w-40 bg-gray-500 h-screen"></div>
      }
    </>
  )
}

export default Sidebar