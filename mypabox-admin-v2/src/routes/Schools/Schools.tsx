import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import {  getSchoolsAndDocuments } from '../../utils/firebase/firebase.utils';
import { setSchools } from '../../app/slices/schools';
import { AppDispatch } from '../../app/store';
import { SchoolContext } from '../../useContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

const Schools = () => {
  const schools = useSelector(selectSchools);
  const dispatch: AppDispatch = useDispatch()
  const { stateSearch, schoolName, setStateSearch, toggleSideMenu } = useContext(SchoolContext)
  const navigate = useNavigate();

  useEffect(() => {
    setStateSearch([])
    
    const fetchSchools = async () => {
      try {
        // fetches schools from firebase db and dispatches school action, which updates the schools array 
        // that's stored in the school reducer
        const allSchools = await getSchoolsAndDocuments();
        if (allSchools) {
          dispatch(setSchools(allSchools));
        }
      } catch (error: any) {
        // throws error and navigates to main page if user is not authenticated 
        if (error.message === 'permission-denied') {
          alert("Access denied. Please log in using the appropriate credentials");
          navigate('/');
          return;
        } else {
          alert('Error loading school data')
        }
      }
    }

    fetchSchools();

  }, [dispatch, navigate, setStateSearch])

  const addSchoolButton = () => {
    navigate('/schools/add-school#general-info')
  }

  return (
    <div className="absolute top-16 font-['Noto Sans']">

      {/* Filter 1: The school name is converted to all lowercase letters and then the includes method is ran so that the only
          schools that are shown are the schools that matches the search input  
          Filter 2: If the state search length is 0 the item will be shown, if not the includes method is ran so the only schools
          that are shown are the school who's state is included in the stateSearch array
          After the filters are ran, the remaining schools array is then mapped through and the schools data is displayed
      */}
      <div className={`${toggleSideMenu ? 'ml-72' : 'ml-32'} mt-16`}>
        <p className='text-5xl font-semibold'>Schools</p>
        <p className='text-xl mt-2'>Total: {schools.length}</p>
      </div>

      <button className={`absolute ${toggleSideMenu ? 'ml-[96em]' : 'ml-[88em]'} pl-2 text-lg border-2 
      border-[#F06A6A] text-[#F06A6A] h-10 rounded-xl w-36 top-20`} onClick={addSchoolButton}>
        <AiOutlinePlus className='absolute pt-2 text-2xl' /> Add School
      </button>

      <div className={`${toggleSideMenu ? 'ml-72' : 'ml-32'} w-[100em] rounded-t-xl shadow-lg 
      shadow-gray-600 h-fit`}>
        <table className='w-full mt-16'>
          <thead className='bg-[#eeeef2] mt-8'>
            <tr className='h-12'>
              <th scope="col" className='font-normal text-2xl text-left w-[24em]'>Name</th>
              <th scope="col" className='font-normal ml-40 text-2xl text-left'>City</th>
              <th scope="col" className='font-normal text-2xl mt text-left'>State</th>
            </tr>
          </thead>
          <tbody>
          {
            schools && schools.filter(school => school.school_name.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
              item : stateSearch.includes(item.school_state.input)).map((d, i) => (
                <tr className="border-b-[0.125px] border-gray-400">
                  <td className='text-xl h-[45px] w-[25em]'>{d.school_name.input}</td>
                  <td className='text-xl text-left'>{d.school_city.input}</td>
                  <td className='text-xl text-left'>{d.school_state.input}</td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
      {/* If openForm is true, the add school form will be shown, if not it will stay hidden */}
    </div>
  )
}

export default Schools