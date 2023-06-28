import React from 'react'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  // Find out current pathname in url
  const location = useLocation()

  return (
    <>
      {/* Left navigation bar */}
      {location.pathname === '/' ? '' :
        <div className="fixed z-0 w-40 bg-gray-500 h-full"></div>
      }
    </>
  )
}

export default Sidebar