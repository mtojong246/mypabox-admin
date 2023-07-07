import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from "../../My PA Box - Logo Monochrome Flat Horizontal Negative.png"
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select';
import { SchoolContext } from '../../useContext';
import states from '../../data/states.json';
import { AiOutlineClose } from 'react-icons/ai'
import Sidebar from './Sidebar';

const Navbar = () => {
  const [openFilter, setOpenFilter] = useState(false)
  // Find out current pathname in url
  const location = useLocation()
  const { handleOpenForm, handleStateSearch, handleSchoolName, schoolName } = useContext(SchoolContext)

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  return (
    <>
    <div>
      {/* If the current path is '/', do not show the navigation bar, otherwise show the navigation bar*/}
      {/* Top navigation bar */}
      {location.pathname === '/' ? '' : (
        <div className="fixed z-20 bg-[#363639] h-16 w-full">
          {/* Logo image */}
          <img src={logo} alt="myPAbox" className="h-16" />
        </div>  
      )}
      {
        location.pathname === '/schools' ? (
          <div className='fixed z-20'>
            {/* Search field that allows you to filter through schools */}
            <input type='input' className='border-b-2 mt-2 border-black h-12 w-[400px] focus:outline-none 
            ml-[13em] text-xl bg-transparent' value={schoolName} onChange={handleSchoolName} placeholder='Search for school' />
       
            <div className='ml-[26.5em] -mt-8 text-2xl'>
              <HiMagnifyingGlass />
            </div>
            {/* Select component that allows you to select multiple states */}
            <button className='absolute top-[1em] border-2 left-[53em] border-black w-96' onClick={handleOpenFilter}>
            <Select
              isMulti
              name="colors"
              className="absolute w-[25em]"
              classNamePrefix="select"
              isDisabled={true}
            />
            </button>                         
            <button className="absolute top-[1em] border-2 w-40 rounded-2xl border-white text-white h-[2.5em] 
            ml-[100em]" onClick={handleOpenForm}>
              Add New School
            </button>
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
    <Sidebar />
    </>
  )
}

export default Navbar