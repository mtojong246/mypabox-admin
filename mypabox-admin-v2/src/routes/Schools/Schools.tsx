import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import {  getSchoolsAndDocuments, getAllCourses, getAllCategories } from '../../utils/firebase/firebase.utils';
import { setSchools } from '../../app/slices/schools';
import { AppDispatch } from '../../app/store';
import { SchoolContext } from '../../useContext';
import { useNavigate } from 'react-router-dom';
import { School } from '../../types/schools.types';
import { Course } from '../../types/courses.types';
import { CategoryType } from '../../types/categories.types';
import { setCourses } from '../../app/slices/courses';
import { setCategories } from '../../app/slices/categories';


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
          // Sorts schools by name alphabetically
          (allSchools as School[]).sort(function (a, b) {
            if (a.school_name.input < b.school_name.input) {
                return -1;
            }
            if (a.school_name.input > b.school_name.input) {
                return 1;
            }
            return 0;
        })
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

  }, [dispatch, navigate, setStateSearch]);

  useEffect(() => {

    const fetchCourses = async () => {
        try {
            const allCourses = await getAllCourses();
            if  (allCourses) {
                // Sorts course alphabetically
                (allCourses as Course[]).sort(function (a, b) {
                    if (a.course_name < b.course_name) {
                        return -1;
                    }
                    if (a.course_name > b.course_name) {
                        return 1;
                    }
                    return 0;
                })
                dispatch(setCourses(allCourses));
            }
        } catch (error: any) {
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
              } else {
                alert('Error loading course data')
              }
        }
    }

    fetchCourses();

}, [dispatch, navigate]);

  useEffect(() => {

    const fetchCategories = async () => {
        try {
            const allCategories = await getAllCategories();
            if (allCategories) {
                // Sorts course alphabetically
                (allCategories as CategoryType[]).sort(function (a, b) {
                    if (a.category_name < b.category_name) {
                        return -1;
                    }
                    if (a.category_name > b.category_name) {
                        return 1;
                    }
                    return 0;
                })
                dispatch(setCategories(allCategories));
            } 
        } catch (error: any) {
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
            } else {
                alert('Error loading course data')
            }
        }
    }

    fetchCategories();
  }, [dispatch, navigate]);

  useEffect(() => {
    localStorage.removeItem('newSchool');
  }, [])

  const addSchoolButton = () => {
    navigate('/schools/add-school#general-info')
  }

  return (
    <div className="w-screen p-10 font-['Noto Sans']">
      <div className='w-full max-w-[1800px] mx-auto'>

      {/* Filter 1: The school name is converted to all lowercase letters and then the includes method is ran so that the only
          schools that are shown are the schools that matches the search input  
          Filter 2: If the state search length is 0 the item will be shown, if not the includes method is ran so the only schools
          that are shown are the school who's state is included in the stateSearch array
          After the filters are ran, the remaining schools array is then mapped through and the schools data is displayed
      */}
      <div className={`w-full flex justify-between items-start ${toggleSideMenu ? 'pl-72 xl:pl-36' : ''}`}>
        <div >
          <p className='text-5xl font-medium'>Schools</p>
          <p className='text-xl mt-2'>Total: {schools.length}</p>
        </div>

        <button className={`text-lg border-2 
        border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`} onClick={addSchoolButton}>
          + Add School
        </button>
      </div>
      <div className={`w-full max-w-[1800px] ${toggleSideMenu ? 'pl-72 xl:pl-36' : ''}`}>
      <div className={`w-full rounded-t-xl shadow-lg 
      shadow-gray-600 mt-16`}>
        <table className='w-full'>
          <thead className='bg-[#eeeef2] mt-8'>
            <tr>
              <th scope="col" className='font-normal text-2xl text-left p-[10px]'>Name</th>
              <th scope="col" className='font-normal text-2xl text-left p-[10px]'>City</th>
              <th scope="col" className='font-normal text-2xl text-left p-[10px]'>State</th>
            </tr>
          </thead>
          <tbody>
          {
            schools && schools.filter(school => school.school_name.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
              item : stateSearch.includes(item.school_state.input)).map((d, i) => (
                <tr className="border-b-[0.125px] border-gray-400">
                  <td className='text-xl text-left p-[10px]'>{d.school_name.input}</td>
                  <td className='text-xl text-left p-[10px]'>{d.school_city.input}</td>
                  <td className='text-xl text-left p-[10px]'>{d.school_state.input}</td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
        </div>
      </div>
      </div>
      {/* If openForm is true, the add school form will be shown, if not it will stay hidden */}
    </div>
  )
}

export default Schools