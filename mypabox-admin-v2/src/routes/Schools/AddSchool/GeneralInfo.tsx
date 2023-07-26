import { useEffect, useState, MouseEvent, SetStateAction, Dispatch } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import Select from 'react-select';
import countries from '../../../data/countries.json'
import { School, StringInput, BooleanInput, NumberInput, Note } from '../../../types/schools.types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const GeneralInfo = ({ newSchool, handleInputChange, openNotePopup, setNewSchool, removeNote, openEditPopup }: { newSchool: School, handleInputChange: (e: any) => void, openNotePopup: (e: MouseEvent<HTMLButtonElement>) => void, openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void, setNewSchool: Dispatch<SetStateAction<School>>, removeNote: (e: MouseEvent<HTMLButtonElement>, i: number) => void }) => {
  const [stateNames, setStateNames] = useState<any>([])
  const [countryNames, setCountryNames] = useState<any>([])

  useEffect(() => {
    
    setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
      target: {name: "school_country", type: 'text', value: country.name, }})))

    setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
     .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
     value: state.name, } })))

  }, [newSchool.school_country.input])

  
  console.log(newSchool.school_state)
  return (
    <form className='mt-16'>
        <div className="relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">School Name</label>
          <button name='add' value="school_name" className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_name.input} name='school_name' onChange={handleInputChange} />
          {
            newSchool.school_name.notes ? (
            <div className="w-full">
              {newSchool.school_name.notes.map((note: any, i: number) => {
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_name' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_name' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">School Logo</label>
          <button value='school_logo' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_logo.input} name='school_logo' onChange={handleInputChange}/>
          {
            newSchool.school_logo.notes ? (
            <div className="w-full">
              {newSchool.school_logo.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_logo' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_logo' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Street Address</label>
          <button value='school_street' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_street.input} name='school_street' onChange={handleInputChange}/>
          {
            newSchool.school_street.notes ? (
            <div className="w-full">
              {newSchool.school_street.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_street' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_street' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">City</label>
          <button value='school_city' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_city.input} name='school_city' onChange={handleInputChange}/>
          {
            newSchool.school_city.notes ? (
            <div className="w-full">
              {newSchool.school_city.notes.map((note: any, i: number) => {
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_city' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_city' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">State</label>
          <button value='school_state' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <Select className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" name="school_state" 
          options={stateNames} onChange={handleInputChange} />
          {
            newSchool.school_state.notes ? (
            <div className="w-full">
              {newSchool.school_state.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_state' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_state' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Zip</label>
          <button value='school_zip_code' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_zip_code.input} name="school_zip_code" onChange={handleInputChange}/>
          {
            newSchool.school_zip_code.notes ? (
            <div className="w-full">
              {newSchool.school_zip_code.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_zip_code' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_zip_code' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Country</label>
          <button value='school_country' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <Select className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4"  name="school_country" options={countryNames}
           onChange={handleInputChange} />
          {
            newSchool.school_country.notes ? (
            <div className="w-full">
              {newSchool.school_country.notes.map((note: any, i: number) => {
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_country' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_country' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Website</label>
          <button value='school_website' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_website.input} name="school_website" onChange={handleInputChange}/>
          {
            newSchool.school_website.notes ? (
            <div className="w-full">
              {newSchool.school_website.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_website' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_website' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">School Email</label>
          <button value='school_email' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_email.input} name="school_email" onChange={handleInputChange}/>
          {
            newSchool.school_email.notes ? (
            <div className="w-full">
              {newSchool.school_email.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_email' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_email' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">School Phone Number</label>
          <button value='school_phone_number' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_phone_number.input} name="school_phone_number" onChange={handleInputChange}/>
          {
            newSchool.school_phone_number.notes ? (
            <div className="w-full">
              {newSchool.school_phone_number.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_phone_number' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_phone_number' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-32 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Campus Location</label>
          <button value='school_campus_location' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_campus_location.input} name="school_campus_location" onChange={handleInputChange}/>
          {
            newSchool.school_campus_location.notes ? (
            <div className="w-full">
              {newSchool.school_campus_location.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_campus_location' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_campus_location' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Start Month</label>
          <button value='school_start_month' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_start_month.input} name="school_start_month" onChange={handleInputChange}/>
          {
            newSchool.school_start_month.notes ? (
            <div className="w-full">
              {newSchool.school_start_month.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_start_month' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_start_month' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Class Compacity</label>
          <button value='school_class_capacity' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_class_capacity.input} name="school_class_capacity" onChange={handleInputChange}/>
          {
            newSchool.school_class_capacity.notes ? (
            <div className="w-full">
              {newSchool.school_class_capacity.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_class_capacity' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_class_capacity' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Duration(Full-time)</label>
          <button  value='school_duration_full_time' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_duration_full_time.input} name="school_duration_full_time" onChange={handleInputChange}/>
          {
            newSchool.school_duration_full_time.notes ? (
            <div className="w-full">
              {newSchool.school_duration_full_time.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_duration_full_time' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_duration_full_time' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Duration(Part-time)</label>
          <button value='school_duration_part_time' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_duration_part_time.input} name="school_duration_part_time" onChange={handleInputChange}/>
          {
            newSchool.school_duration_part_time.notes ? (
            <div className="w-full">
              {newSchool.school_duration_part_time.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_duration_part_time' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_duration_part_time' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Seat Deposit(In-state)</label>
          <button value='school_seat_deposit_in_state' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_seat_deposit_in_state.input} name="school_seat_deposit_in_state" onChange={handleInputChange}/>
          {
            newSchool.school_seat_deposit_in_state.notes ? (
            <div className="w-full">
              {newSchool.school_seat_deposit_in_state.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_seat_deposit_in_state' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_seat_deposit_in_state' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Seat Deposit(Out-of-state)</label>
          <button value='school_seat_deposit_out_of_state' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
          value={newSchool.school_seat_deposit_out_of_state.input} name="school_seat_deposit_out_of_state" onChange={handleInputChange}/>
          {
            newSchool.school_seat_deposit_out_of_state.notes ? (
            <div className="w-full">
              {newSchool.school_seat_deposit_out_of_state.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_seat_deposit_out_of_state' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_seat_deposit_out_of_state' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Rolling admissions</label>
          <button value='school_rolling_admissions' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" 
          onClick={openNotePopup}>
            Add Note
          </button>

          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_rolling_admissions' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_rolling_admissions.input ? 'True' : 'False'}
              </span>
            </label>
          </div>
          {
            newSchool.school_rolling_admissions.notes ? (
            <div className="w-full">
              {newSchool.school_rolling_admissions.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_rolling_admissions' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_rolling_admissions' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Non-rolling admissions</label>
          <button value='school_nonrolling_admissions' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_nonrolling_admissions' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_nonrolling_admissions.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_nonrolling_admissions.notes ? (
            <div className="w-full">
              {newSchool.school_nonrolling_admissions.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_nonrolling_admissions' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_nonrolling_admissions' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Pre-PA curriculum</label>
          <button value='school_pre_pa_curriculum' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_pre_pa_curriculum' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_pre_pa_curriculum.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_pre_pa_curriculum.notes ? (
            <div className="w-full">
              {newSchool.school_pre_pa_curriculum.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_pre_pa_curriculum' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_pre_pa_curriculum' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Direct High School Entry</label>
          <button value='school_direct_high_school_entry' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_direct_high_school_entry' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_direct_high_school_entry.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_direct_high_school_entry.notes ? (
            <div className="w-full">
              {newSchool.school_direct_high_school_entry.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_direct_high_school_entry' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_direct_high_school_entry' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Part-time Option</label>
          <button value='school_part_time_option' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_part_time_option' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_part_time_option.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_part_time_option.notes ? (
            <div className="w-full">
              {newSchool.school_part_time_option.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_part_time_option' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_part_time_option' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Online Learning</label>
          <button value='school_online_learning' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_online_learning' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_online_learning.input ? 'True' : 'False'}
              </span>
            </label>
          </div>
          {
            newSchool.school_online_learning.notes ? (
            <div className="w-full">
              {newSchool.school_online_learning.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_online_learning' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_online_learning' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">On-campus Housing</label>
          <button value='school_on_campus_housing' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_on_campus_housing' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_on_campus_housing.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_on_campus_housing.notes ? (
            <div className="w-full">
              {newSchool.school_on_campus_housing.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_on_campus_housing' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_on_campus_housing' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Cadaver Lab</label>
          <button value='school_cadaver_lab' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_cadaver_lab' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_cadaver_lab.input ? 'True' : 'False'}
              </span>
            </label>
          </div>
          {
            newSchool.school_cadaver_lab.notes ? (
            <div className="w-full">
              {newSchool.school_cadaver_lab.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_cadaver_lab' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_cadaver_lab' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Faith-based Learning</label>
          <button value='school_faith_based_learning' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_faith_based_learning' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_faith_based_learning.input ? 'True' : 'False'}
              </span>
            </label>
          </div>
          {
            newSchool.school_faith_based_learning.notes ? (
            <div className="w-full">
              {newSchool.school_faith_based_learning.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_faith_based_learning' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_faith_based_learning' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
          <label className="absolute top-[-16px] text-xl bg-white">Military Personnel Preference</label>
          <button value='school_military_personnel_preference' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='mt-4 w-full'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" name='school_military_personnel_preference' onChange={handleInputChange}/>
              <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-xl text-black">
                {newSchool.school_military_personnel_preference.input ? 'True' : 'False'}
              </span>
            </label>
          </div>
          {
            newSchool.school_military_personnel_preference.notes ? (
            <div className="w-full">
              {newSchool.school_military_personnel_preference.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_military_personnel_preference' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_military_personnel_preference' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="mt-32 text-xl w-full">
          <p>General Information Notes</p>
          <textarea className='mt-4 focus:outline-none h-64 rounded-lg w-full border 
          border-black p-4' name='school_general_information' onChange={handleInputChange}/>
        </div>
        
      </form>
  )
}

export default GeneralInfo