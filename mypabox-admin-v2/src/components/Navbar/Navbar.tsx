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
    <div className="font-['Noto Sans']">
      {/* If the current path is '/', do not show the navigation bar, otherwise show the navigation bar*/}
      {/* Top navigation bar */}
      {location.pathname === '/' ? '' : (
        <div className="fixed z-20 bg-[#252628] h-16 w-full">
          <RxHamburgerMenu className='text-white text-4xl mt-4 ml-4 b' onClick={handleToggleSideMenu}/>
          
          {/* Logo image */}
          <button className='-mt-[5.5em] ml-16' onClick={goToMain}>
            <img src={logo} alt="myPAbox" className="h-16 select-none" />
          </button>
        </div>  
      )}
      {
        location.pathname === '/schools' ? (
          <div className='fixed z-20'>
            <RxHamburgerMenu className='absolute text-white text-4xl mt-4 ml-4 b' onClick={handleToggleSideMenu}/>

            {/* Search field that allows you to filter through schools */}
            <input type='input' className=' rounded-lg mt-2 h-12 w-[45em] focus:outline-none 
            ml-[25em] text-xl placeholder:pl-10 placeholder:select-none bg-[#424244]' value={schoolName} onChange={handleSchoolName} 
            placeholder='Search' />
       
            <div className='ml-[21.2em] text-gray-500 -mt-8 text-2xl'>
              <HiMagnifyingGlass />
            </div>
            {/* Select component that allows you to select multiple states */}
            <button className='absolute top-[1em] left-[103em] w-[15em]' onClick={handleOpenFilter}>
            <Select
              isMulti
              name="colors"
              className="absolute w-[15em]"
              classNamePrefix="select"
              placeholder="Select State"
              isDisabled={true}
            />
            </button>                         
            {/*
            <button className="absolute top-[1em] border-2 w-40 rounded-2xl border-white text-white h-[2.5em] 
            ml-[100em]" onClick={handleOpenForm}>
              Add New School
            </button>
        */}
          </div>
        ) : ''
      }
      {
        openFilter ? (
          <div className='absolute w-screen top-0 bg-[#000000d5] z-50 h-screen'>
            <div className='w-[95em] bg-white ml-[18.1em] mt-48 h-64'>
              <button className='absolute left-[73em] top-52 text-2xl' onClick={handleOpenFilter}>
                <AiOutlineClose />
              </button>
              <p className='text-center text-4xl font-semibold'>Filter</p>
              <Select
                options={states}
                isMulti
                name="colors"
                className="ml-[12em] mt-8 w-[70em]"
                classNamePrefix="select"
                onChange={handleStateSearch}
              />
            </div>
          </div>
        ) : ''
      }
    </div>
    { 
      toggleSideMenu ? <Sidebar /> : ''
    }
    </>
  )
}

export default Navbar