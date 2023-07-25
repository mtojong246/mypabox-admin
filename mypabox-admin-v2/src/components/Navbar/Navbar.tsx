import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../My PA Box - Logo Monochrome Flat Horizontal Negative.png"
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select';
import { RxHamburgerMenu } from 'react-icons/rx'
import { SchoolContext } from '../../useContext';
import states from '../../data/states.json';
import { AiOutlineClose } from 'react-icons/ai'
import Sidebar from './Sidebar';

const Navbar = () => {
  const [openFilter, setOpenFilter] = useState(false)
  // Find out current pathname in url
  const location = useLocation()
  const navigate = useNavigate()
  const { handleOpenForm, handleStateSearch, handleSchoolName, schoolName, handleToggleSideMenu, 
    toggleSideMenu } = useContext(SchoolContext)
  

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  const goToMain = () => {
    navigate('/main')
  }

  return (
    <>
      {/* If the current path is '/', do not show the navigation bar, otherwise show the navigation bar*/}
      {/* Top navigation bar */}
      {location.pathname === '/' ? '' : (
        <div className="fixed z-20 bg-[#252628] py-[10px] px-5 w-screen font-['Noto Sans'] flex justify-between items-center gap-12">
          {/* Logo image */}
          <div className='flex justify-center items-center gap-1'>
            <RxHamburgerMenu className='text-white text-4xl z-30' onClick={handleToggleSideMenu}/>
            <img src={logo} alt="myPAbox" className="h-14" />
          </div>
          {location.pathname === '/schools' ? (
            <>
              
              {/* Search field that allows you to filter through schools */}
              <input type='input' className=' rounded-lg p-2 max-w-[700px] grow focus:outline-none 
              text-xl placeholder:select-none bg-[#424244]' value={schoolName} onChange={handleSchoolName} 
              placeholder='Search' />
        
              {/* <div className='ml-[21.2em] text-gray-500 -mt-8 text-2xl'>
                <HiMagnifyingGlass />
              </div> */}
              {/* Select component that allows you to select multiple states */}
              <button onClick={handleOpenFilter}>
              <Select
                isMulti
                options={states}
                onChange={handleStateSearch}
                name="colors"
                className="w-[15em]"
                classNamePrefix="select"
                placeholder="Select State"
              />
              </button>       
            </>
        ) : ''
        }

        </div>  
      )}
    { 
      toggleSideMenu ? <Sidebar /> : ''
    }
    </>
  )
}

export default Navbar