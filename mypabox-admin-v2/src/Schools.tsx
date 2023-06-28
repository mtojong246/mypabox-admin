import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from './app/selectors/schools.selectors';
import Select from 'react-select';
import { addDocToSchoolCollection, getSchoolsAndDocuments } from './utils/firebase/firebase.utils';
import { setSchools } from './app/slices/schools';
import { AppDispatch } from './app/store';
import { AiOutlineClose } from 'react-icons/ai'

const states: Array<Object> = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Wyoming', label: 'Wyoming' }
]
  
const Schools = () => {
  const [schoolName, setSchoolName] = useState('')
  const [stateSearch, setStateSearch] = useState([{}])
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [openForm, setOpenForm] = useState(false)
  const schools = useSelector(selectSchools);
  const dispatch: AppDispatch = useDispatch()

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
  }, [dispatch])
  
  // Converts current value of input field to all lowercase letters
  const handleSchoolName = (e: { target: { value: string; }; }) => {
    setSchoolName(e.target.value.toLowerCase())
  }

  // Sets stateSearch to mapped newValue array which displays the value of each state in an array
  const handleStateSearch = (newValue: any) => {
    setStateSearch(newValue.map((state: any) => state.value))
  }

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
    
    setCity("")
    setState("")
    setName("")
  }

  return (
    <div className=''>
      {/* Search field that allows you to filter through schools */}
      <input type='search' className='border-b-2 mt-16 border-black h-12 w-[400px] focus:outline-none 
      ml-[13em] text-xl' value={schoolName} onChange={handleSchoolName} />

      {/* Select component that allows you to select multiple states */}
      <Select
        isMulti
        name="colors"
        options={states}
        className="absolute top-[-2em] w-[25em] left-[43em]"
        classNamePrefix="select"
        onChange={handleStateSearch}
      />

      <button className="absolute top-[5em] border-2 w-40 border-black h-[2.5em] ml-[75em]" onClick={handleOpenForm}>
        Add New School
      </button>

      {/* Filter 1: The school name is converted to all lowercase letters and then the includes method is ran so that the only
          schools that are shown are the schools that matches the search input  
          Filter 2: If the state search length is 0 the item will be shown, if not the includes method is ran so the only schools
          that are shown are the school who's state is included in the stateSearch array
          After the filters are ran, the remaining schools array is then mapped through and the schools data is displayed
      */}
      <div className='ml-72 mt-16'>
        {
          schools.filter(school => school.name.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
            item : stateSearch.includes(item.state)).map((d, i) => 
            <div key={`${d.name}-${i}`} className='text-2xl text-center w-[40em] text-black mt-8 border border-black'>
              <p>School: {d.name}</p>
              <p>City: {d.city}</p>
              <p>State: {d.state}</p>
            </div>
          )
        }
      </div>

      {/* If openForm is true, the add school form will be shown, if not it will stay hidden */}
      {
        openForm ? (
          <div className='absolute w-screen top-0 bg-[#000000d5] z-10 h-screen'>
            <button onClick={handleOpenForm} className='absolute left-[70em] top-4 text-xl text-white'>
              <AiOutlineClose />
            </button>
            <form className='w-[41em] rounded-xl h-[40em] ml-[27em] mt-[40px] bg-white'>
              <p className="text-4xl text-center">Add New School</p>

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