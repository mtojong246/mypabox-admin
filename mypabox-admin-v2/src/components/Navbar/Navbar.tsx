import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../My PA Box - Logo Monochrome Flat Horizontal Negative.png"
import Select from 'react-select';
import { RxHamburgerMenu } from 'react-icons/rx'
import { SchoolContext } from '../../useContext';
import states from '../../data/states.json';
import Sidebar from './Sidebar';
import { filterCourses } from '../../app/slices/courses';
import { selectCourses } from '../../app/selectors/courses.selectors';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const Navbar = () => {
  const [openFilter, setOpenFilter] = useState(false)
  // Find out current pathname in url
  const location = useLocation()
  const { handleStateSearch, handleSchoolName, schoolName, handleToggleSideMenu, toggleSideMenu, show, setShow } = useContext(SchoolContext)
  const [lastScrollY, setLastScrollY] = useState(200);
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const [ filteredCourses, setFilteredCourses ] = useState('');

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false); 
      } else { // if scroll up show the navbar
        setShow(true);  
      }

      // remember current page location to use in the next move
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]); 

  useEffect(() => {
    if (!filteredCourses) {
      dispatch(filterCourses([]));
    }
  }, [filteredCourses, dispatch])
 

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  const handleCourseSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFilteredCourses(input);
    const newCourses = courses.filter(course => course.course_name.toLowerCase().includes(input.toLowerCase()));
    dispatch(filterCourses(newCourses));
  }



  return (
    <>
      {/* If the current path is '/', do not show the navigation bar, otherwise show the navigation bar*/}
      {/* Top navigation bar */}
      {location.pathname === '/' ? '' : (
        <div className={`fixed ${show ? '' : 'hidden'} z-30 bg-[#252628] py-[10px] px-5 w-screen font-['Noto Sans'] flex justify-between 
        items-center gap-12`}>
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

              {/* Select component that allows you to select multiple states */}
              <button onClick={handleOpenFilter}>
              <Select
                isMulti
                options={states}
                onChange={handleStateSearch}
                name="colors"
                className="w-[15em] text-left"
                classNamePrefix="select"
                placeholder="Select State"
              />
              </button>       
            </>
        ) : ''
        }
        {location.pathname === '/courses' ? (
          <>
            <input type='input' className=' rounded-lg p-2 max-w-[700px] grow focus:outline-none 
              text-xl placeholder:select-none bg-[#424244]' value={filteredCourses} onChange={(e) => handleCourseSearch(e)}
              placeholder='Search' />
            <div className='w-[15em]'></div>
          </>
        ) : null}
 
        </div>  
      )}
    { 
      toggleSideMenu ? <Sidebar /> : ''
    }
    </>
  )
}

export default Navbar