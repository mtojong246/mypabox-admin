import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSchoolState } from '../../types/addSchool.types'
import { addSchoolName } from '../../app/slices/addSchool'

const AddSchool = () => {
  const schoolNamee = useSelector((state: addSchoolState) => state.schoolName)
  const [schoolName, setSchoolName]= useState("")
  const dispatch = useDispatch()

  const handleSchoolName = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSchoolName(e.target.value)
    dispatch(addSchoolName({ schoolName, notes: null }))
  }

  console.log(schoolNamee)
  return (
    <div className="absolute left-32 font-Noto Sans">
      <div className="h-16 w-[105em] mt-28">
        <p className='text-4xl mt-4 font-medium'>Add School</p>
        <button className='absolute ml-[100em] border-2 border-solid border-[#4573D2] rounded-xl w-20 h-12 -mt-9'>
          Done
        </button>
      </div>

      <div className='h-8 mt-6 text-lg border-b-2 flex border-black'>
        <p className=''>General Info</p>
        <p className='ml-14'>Degree Info</p>
        <p className='ml-14'>Tuition</p>
        <p className='ml-14'>GPA</p>
        <p className='ml-14'>Prerequisites</p>
        <p className='ml-14'>Healthcare Experience</p>
        <p className='ml-14'>Shadowing</p>
        <p className='ml-14'>GRE</p>
        <p className='ml-14'>Letters of Recommendation</p>
        <p className='ml-14'>Certifications</p>
        <p className='ml-14'>Additional Notes</p>
      </div>

      <form className='mt-16'>
        <div className="w-[45em] border h-44 rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Name</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={schoolName} onChange={handleSchoolName}/>
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Logo</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Street Address</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">City</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">State</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Zip</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Country</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Website</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Email</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Phone Number</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Campus Location</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Start Month</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Class Compacity</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Full-time)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Part-time)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(In-state)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(Out-of-state)</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Rolling admissions</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Non-rolling admissions</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Non-rolling admissions</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Pre-PA curriculum</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Direct High School Entry</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Part-time Option</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Online Learning</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">On-campus Housing</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Cadaver Lab</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Faith-based Learning</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-16 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Military Personnel Preference</label>
          <button className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl">
            Add Note
          </button>
          <input type='text' className="w-[42.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" />
        </div>
      </form>
    </div>
  )
}

export default AddSchool