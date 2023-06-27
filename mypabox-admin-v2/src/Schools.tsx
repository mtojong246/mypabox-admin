import React, { useState } from 'react';

const data = [
  {
    school: 'Harvard',
    state: 'Massachusetts'
  }, 
  {
    school: 'Baylor',
    state: 'Texas'
  },
  {
    school: 'Stanford',
    state: 'California'
  },
  {
    school: 'Northwestern',
    state: 'Illinois'
  },
  {
    school: 'John Hopkins',
    state: 'Maryland'
  }
]

const states: Array<string> = ["Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]
  
const Schools = () => {
  const [schoolName, setSchoolName] = useState('')
  const [state, setState] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [stateSearch, setStateSearch] = useState('')

  const handleSchoolName = (e: { target: { value: string; }; }) => {
    setSchoolName(e.target.value.toLowerCase())
  }

  const handleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  const handleStateSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setStateSearch(e.target.value)
  }

  return (
    <div className=''>
      
      <input type='search' className='border-b-2 mt-2 border-black h-12 w-[400px] focus:outline-none 
      ml-[29.5em] text-xl' value={schoolName} onChange={handleSchoolName} />

      <button className='absolute left-[47em] border-2 border-black w-56 top-[3.5em] text-2xl' 
      onClick={handleShowSearch}>
        {state ? state : 'State'}
      </button>

      {
        showSearch ? (
          <div className='absolute'> 
              <input className='border-b-2 border-black focus:outline-none ml-[69em] mt-4 w-72' 
              type='text' value={stateSearch} onChange={handleStateSearch} list='list-of-states'/>
              <datalist id='list-of-states' className='bg-blue-400'>
              {
                states.map(state => (
                  <option className='ml-[50em] text-2xl' value={state}>{state}</option>
                ))
              }
              </datalist>
          </div>
        ) : ''
      }

      <div className='ml-72 mt-32'>
        {
          data.filter(d => d.school.toLowerCase().includes(schoolName)).map(d => 
            <p className='text-2xl text-center w-40 text-black mt-8 border border-black'>{d.school}</p>
          )
        }
      </div>

      
    </div>
  )
}

export default Schools