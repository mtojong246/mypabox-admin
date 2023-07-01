import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import logo from "../../My PA Box - Logo Monochrome Flat Horizontal Negative.png"
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Select from 'react-select';
import { SchoolContext } from '../../useContext';
import states from '../../states.json'

const Navbar = () => {
  // Find out current pathname in url
  const location = useLocation()
  const { handleOpenForm, handleStateSearch, handleSchoolName, schoolName } = useContext(SchoolContext)

  return (
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
            <Select
              isMulti
              name="colors"
              options={states}
              className="absolute top-[-2em] w-[25em] left-[43em]"
              classNamePrefix="select"
              onChange={handleStateSearch}
            />
                                            
            <button className="absolute top-[1em] border-2 w-40 rounded-2xl border-black h-[2.5em] 
            ml-[81em]" onClick={handleOpenForm}>
              Add New School
            </button>
          </div>
        ) : ''
      }
    </div>
  )
}

export default Navbar