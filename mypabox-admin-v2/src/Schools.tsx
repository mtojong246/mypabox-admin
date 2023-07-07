import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from './app/selectors/schools.selectors';
import { addDocToSchoolCollection, getSchoolsAndDocuments } from './utils/firebase/firebase.utils';
import { setSchools } from './app/slices/schools';
import { AppDispatch } from './app/store';
import { AiOutlineClose } from 'react-icons/ai'
import { SchoolContext } from './useContext';
import { addSchool } from './app/slices/schools';  

const Schools = () => {
  const schools = useSelector(selectSchools);
  const dispatch: AppDispatch = useDispatch()
  const { state, city, name, openForm, stateSearch, schoolName, setName, setState, setCity,
  setOpenForm, setStateSearch } = useContext(SchoolContext)

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
        alert('Error loading schools')
      }
    }

    fetchSchools();

  }, [dispatch, setStateSearch])

  /* Uses boolean value so when openForm is false, it will set openForm to true and the 
  add school form will be seen and vice versa */
  const handleOpenForm = () => {
    setOpenForm(!openForm)
  }

  // Sets name to value of input field
  const handleName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value)
  }

  // Sets state to value of input field
  const handleState = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setState(e.target.value)
  }

  // Sets city to value of input field
  const handleCity = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCity(e.target.value)
  }
  
  /* Form data is collected & sent through the addDocToSchoolCollection function
   so a new school can be created and form values are reset after */
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    const data = {
      city: city,
      state: state,
      name: name,
    }

    addDocToSchoolCollection(data)
    
    dispatch(addSchool(data))
    setCity("")
    setState("")
    setName("")
  }

  return (
    <div className='absolute top-16'>

      {/* Filter 1: The school name is converted to all lowercase letters and then the includes method is ran so that the only
          schools that are shown are the schools that matches the search input  
          Filter 2: If the state search length is 0 the item will be shown, if not the includes method is ran so the only schools
          that are shown are the school who's state is included in the stateSearch array
          After the filters are ran, the remaining schools array is then mapped through and the schools data is displayed
      */}
      <div className='ml-60 w-[100em] rounded-xl shadow-lg shadow-gray-600  h-fit'>
        <p className='text-3xl text-center font-semibold mt-16 ml-4'>Schools</p>
        <table className='w-full mt-8'>
          <thead className='bg-[#eeeef2] mt-8'>
            <tr className=''>
              <th scope="col" className='font-normal text-2xl text-left w-[24em]'>Name</th>
              <th scope="col" className='font-normal ml-40 text-2xl text-center '>City</th>
              <th scope="col" className='font-normal text-2xl mt text-center'>State</th>
            </tr>
          </thead>
          <tbody>
          {
            schools && schools.filter(school => school.school_name.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
              item : stateSearch.includes(item.school_state.input)).map((d, i) => (
                <tr className="border-b-[0.125px] border-gray-400">
                  <td className='text-xl h-[45px]'>{d.school_name.input}</td>
                  <td className='text-xl text-center'>{d.school_city.input}</td>
                  <td className='text-xl text-center'>{d.school_state.input}</td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
      {/* If openForm is true, the add school form will be shown, if not it will stay hidden */}
      {
        openForm ? (
          <div className='absolute w-screen top-0 bg-[#000000d5] z-50 h-screen'>
            <button onClick={handleOpenForm} className='absolute left-[70em] top-4 text-xl text-white'>
              <AiOutlineClose />
            </button>
            <form className='w-[41em] h-[35em] ml-[27em] mt-[40px] bg-white'>
              <p className="text-4xl mt-4 text-center">Add New School</p>

              <label className="">
                <p className='mt-16 ml-24'>School Name</p>
                <input type='text' value={name} onChange={handleName} className='border-b-2 focus:outline-none 
                ml-24 border-black w-[30em]'/>
              </label>

              <label className="">
                <p className='mt-16 ml-24'>City</p>
                <input onChange={handleCity} value={city} type='text' className='border-b-2 focus:outline-none 
                ml-24 border-black w-[30em]'/>
              </label>

              <label className="">
                <p className='mt-16 ml-24'>State</p>
                <input type='text' value={state} onChange={handleState} className='border-b-2 focus:outline-none 
                ml-24 border-black w-[30em]'/>
              </label>

              <button className='border-2 w-40 ml-64 mt-16 border-black h-[2.5em]' onClick={handleSubmit}>
                Add School
              </button>
            </form>
          </div>
        ) : ''
      }
    </div>
  )
}

export default Schools