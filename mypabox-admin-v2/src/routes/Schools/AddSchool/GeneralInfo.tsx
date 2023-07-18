import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import Select from 'react-select';
import countries from '../../../data/countries.json'

const GeneralInfo = ({ newSchool, handleInputChange, openNotePopup }: any) => {
  const [ htmlString, setHtmlString ] = useState('')
  const [ note, setNote ] = useState('');
  const [stateNames, setStateNames] = useState<any>([])
  const [countryNames, setCountryNames] = useState<any>([])

  console.log(newSchool.school_general_information)

  useEffect(() => {
    // Converts html string into plain text and sets note 
    if (htmlString) {
      const plainString = htmlString.replace(/<[^>]+>/g, '');
      setNote(plainString);
    }
    
    setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
      target: {name: "school_country", type: 'text', value: country.name, }})))

    setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
     .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
     value: state.name, } })))

  }, [htmlString, newSchool.school_country.input])

  return (
    <form className='mt-16'>
        <div className="w-[45em] border h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Name</label>
          <button value="school_name" className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_name.input} name='school_name' onChange={handleInputChange} />
          {
            newSchool.school_name.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_name.notes.map((note: any) => {
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border h-44 mt-8 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Logo</label>
          <button value='school_logo' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_logo.input} name='school_logo' onChange={handleInputChange}/>
          {
            newSchool.school_logo.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_logo.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Street Address</label>
          <button value='school_street' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_street.input} name='school_street' onChange={handleInputChange}/>
          {
            newSchool.school_street.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_street.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">City</label>
          <button value='school_city' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_city.input} name='school_city' onChange={handleInputChange}/>
          {
            newSchool.school_city.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_city.notes.map((note: any) => {
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">State</label>
          <button value='school_state' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <Select className="w-[37.5em] focus:outline-none h-14 rounded-lg ml-6 mt-4" name="school_state" 
          options={stateNames} onChange={handleInputChange} />
          {
            newSchool.school_state.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_state.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Zip</label>
          <button value='school_zip_code' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_zip_code.input} name="school_zip_code" onChange={handleInputChange}/>
          {
            newSchool.school_zip_code.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_zip_code.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Country</label>
          <button value='school_country' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <Select className="w-[37.5em] focus:outline-none  h-14 rounded-lg ml-6 mt-4"  name="school_country" options={countryNames}
           onChange={handleInputChange} />
          {
            newSchool.school_country.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_country.notes.map((note: any) => {
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Website</label>
          <button value='school_website' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_website.input} name="school_website" onChange={handleInputChange}/>
          {
            newSchool.school_website.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_website.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Email</label>
          <button value='school_email' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_email.input} name="school_email" onChange={handleInputChange}/>
          {
            newSchool.school_email.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_email.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">School Phone Number</label>
          <button value='school_phone_number' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_phone_number.input} name="school_phone_number" onChange={handleInputChange}/>
          {
            newSchool.school_phone_number.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_phone_number.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Campus Location</label>
          <button value='school_campus_location' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_campus_location.input} name="school_campus_location" onChange={handleInputChange}/>
          {
            newSchool.school_campus_location.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_campus_location.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Start Month</label>
          <button value='school_start_month' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_start_month.input} name="school_start_month" onChange={handleInputChange}/>
          {
            newSchool.school_start_month.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_start_month.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Class Compacity</label>
          <button value='school_class_capacity' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_class_capacity.input} name="school_class_capacity" onChange={handleInputChange}/>
          {
            newSchool.school_class_capacity.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_class_capacity.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Full-time)</label>
          <button  value='school_duration_full_time' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_duration_full_time.input} name="school_duration_full_time" onChange={handleInputChange}/>
          {
            newSchool.school_duration_full_time.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_duration_full_time.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Duration(Part-time)</label>
          <button value='school_duration_part_time' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_duration_part_time.input} name="school_duration_part_time" onChange={handleInputChange}/>
          {
            newSchool.school_duration_part_time.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_duration_part_time.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(In-state)</label>
          <button value='school_seat_deposit_in_state' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_seat_deposit_in_state.input} name="school_seat_deposit_in_state" onChange={handleInputChange}/>
          {
            newSchool.school_seat_deposit_in_state.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_seat_deposit_in_state.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Seat Deposit(Out-of-state)</label>
          <button value='school_seat_deposit_out_of_state' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <input type='text' className="w-[37.5em] focus:outline-none border border-[#B4B4B4] h-14 rounded-lg ml-6 mt-4" 
          value={newSchool.school_seat_deposit_out_of_state.input} name="school_seat_deposit_out_of_state" onChange={handleInputChange}/>
          {
            newSchool.school_seat_deposit_out_of_state.notes.length > 0 ? (
            <div className="-mt-8">
              {newSchool.school_seat_deposit_out_of_state.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border block overflow-auto h-44 rounded-lg mt-32 border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Rolling admissions</label>
          <button value='school_rolling_admissions' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" 
          onClick={openNotePopup}>
            Add Note
          </button>

          <div className='relative ml-40 -mt-20'>
          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_rolling_admissions' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_rolling_admissions.input ? 'True' : 'False'}
            </span>
          </label>
          </div>
          {
            newSchool.school_rolling_admissions.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_rolling_admissions.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Non-rolling admissions</label>
          <button value='school_nonrolling_admissions' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>
            <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	            <span className="relative -mt-6">
	             	<input type="checkbox" className="hidden peer" name='school_nonrolling_admissions' onChange={handleInputChange}/>
       		      <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	            	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
            	</span>
	            <span className="text-black text-2xl -mt-7">
                {newSchool.school_nonrolling_admissions.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_nonrolling_admissions.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_nonrolling_admissions.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Pre-PA curriculum</label>
          <button value='school_pre_pa_curriculum' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>

            <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	            <span className="relative -mt-6">
	             	<input type="checkbox" className="hidden peer" name='school_pre_pa_curriculum' onChange={handleInputChange}/>
        		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	             	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
                dark:bg-white"></div>
            	</span>
	            <span className="text-black text-2xl -mt-7">
                {newSchool.school_pre_pa_curriculum.input ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {
            newSchool.school_pre_pa_curriculum.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_pre_pa_curriculum.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Direct High School Entry</label>
          <button value='school_direct_high_school_entry' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>

          <div className='relative ml-40 -mt-20'>
          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_direct_high_school_entry' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_direct_high_school_entry.input ? 'True' : 'False'}
            </span>
          </label>
          </div>

          {
            newSchool.school_direct_high_school_entry.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_direct_high_school_entry.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Part-time Option</label>
          <button value='school_part_time_option' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>

          <div className='relative ml-40 -mt-20'>

          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_part_time_option' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_part_time_option.input ? 'True' : 'False'}
            </span>
          </label>
          </div>

          {
            newSchool.school_part_time_option.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_part_time_option.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Online Learning</label>
          <button value='school_online_learning' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>

          <div className='relative ml-40 -mt-20'>
          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_online_learning' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_online_learning.input ? 'True' : 'False'}
            </span>
          </label>
          </div>
          {
            newSchool.school_online_learning.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_online_learning.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">On-campus Housing</label>
          <button value='school_on_campus_housing' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>

          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_on_campus_housing' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_on_campus_housing.input ? 'True' : 'False'}
            </span>
          </label>
          </div>

          {
            newSchool.school_on_campus_housing.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_on_campus_housing.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Cadaver Lab</label>
          <button value='school_cadaver_lab' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>
          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_cadaver_lab' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_cadaver_lab.input ? 'True' : 'False'}
            </span>
          </label>
          </div>
          {
            newSchool.school_cadaver_lab.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_cadaver_lab.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Faith-based Learning</label>
          <button value='school_faith_based_learning' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>

          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_faith_based_learning' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_faith_based_learning.input ? 'True' : 'False'}
            </span>
          </label>
          </div>
          {
            newSchool.school_faith_based_learning.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_faith_based_learning.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="w-[45em] border mt-8 h-44 block overflow-auto rounded-lg border-[#B4B4B4]">
          <label className="absolute -mt-4 ml-6 text-xl bg-white">Military Personnel Preference</label>
          <button value='school_military_personnel_preference' className="w-32 border border-[#F06A6A] rounded-md mt-6 ml-6 h-14 text-xl" onClick={openNotePopup}>
            Add Note
          </button>
          <div className='relative ml-40 -mt-20'>

          <label className="absolute inline-flex items-center mt-32 -ml-32 space-x-4 cursor-pointer dark:text-gray-100">
	          <span className="relative -mt-6">
	           	<input type="checkbox" className="hidden peer" name='school_military_personnel_preference' onChange={handleInputChange}/>
       		    <div className="w-24 h-8 rounded-full shadow-inner dark:bg-gray-200 peer-checked:dark:bg-orange-500"></div>
	          	<div className="absolute inset-y-0 left-0 w-7 h-7 m-[2px] rounded-full shadow peer-checked:right-0 peer-checked:left-auto 
              dark:bg-white"></div>
          	</span>
	          <span className="text-black text-2xl -mt-7">
              {newSchool.school_military_personnel_preference.input ? 'True' : 'False'}
            </span>
          </label>
          </div>
          {
            newSchool.school_military_personnel_preference.notes.length > 0 ? (
            <div className="mt-48">
              {newSchool.school_military_personnel_preference.notes.map((note: any) => {
                
                return (
                <div className="mt-[4em] h-44 rounded-md ml-7 w-[30em] border border-black">
                  <p className={`capitalize ml-3 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill className='mt-[em] h-32 w-[30em]' theme="bubble" value={note.note} />
                  <FiEdit3 className='ml-[31em] h-10 w-10 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white -mt-[9em]'/>
                  <AiOutlineClose className='ml-[34.3em] h-10 w-10 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white -mt-[2.5em]'/>
                </div>
              )})}
            </div>
            ) : ''
          }
        </div>

        <div className="mt-10 text-xl">
          <p>General Information Notes</p>
          <textarea className='mt-4 focus:outline-none h-64 rounded-lg w-[70em] border 
          border-black' name='school_general_information' onChange={handleInputChange}/>
        </div>

      </form>
  )
}

export default GeneralInfo