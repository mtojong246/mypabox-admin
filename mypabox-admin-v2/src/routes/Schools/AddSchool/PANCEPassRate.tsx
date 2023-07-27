import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'

const PANCEPassRate = ({ newSchool, setNewSchool, handleInputChange, openNotePopup, openEditPopup, removeNote, handleQuillInputChange }: any) => {

  return (
    <form className="mt-10 pb-24 font-['Noto Sans'] min-h-screen">
      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">First Time Pass Rate</label>
        <button value="school_first_time_pass_rate" className="w-32 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>    
        <input className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" type='number'
        value={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' onChange={handleInputChange} />
        {
          newSchool.school_first_time_pass_rate.notes.length > 0 ? (
          <div className="w-full">
            {newSchool.school_first_time_pass_rate.notes.map((note: any, i: number) => {
              return (
              <div className='flex justify-center items-start gap-2 mt-4'>
                <div className="grow p-4 rounded-md border border-black">
                  <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
                <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_first_time_pass_rate' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_first_time_pass_rate' onClick={(e) => removeNote(e, i)}>
                      <AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/>
                    </button>
                  </div>
              </div>
            )})}
          </div>
          ) : ''
        }
      </div>

      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Average Five Year First Time Pass Rate</label>
        <button value='school_average_five_year_first_time_pass_rate' className="w-32 border text-orange-500 border-[#F06A6A] rounded-md 
        h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>
        <input type='number' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
        value={newSchool.school_average_five_year_first_time_pass_rate.input} name='school_average_five_year_first_time_pass_rate' 
        onChange={handleInputChange}/>
        {
          newSchool.school_average_five_year_first_time_pass_rate.notes.length > 0 ? (
            <div className="w-full">
              {newSchool.school_average_five_year_first_time_pass_rate.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_average_five_year_first_time_pass_rate' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_average_five_year_first_time_pass_rate' onClick={(e) => removeNote(e, i)}>
                      <AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/>
                    </button>
                  </div>
                </div>
              )})}
            </div>
          ) : ''
        }
      </div>

      <div className="mt-32 text-xl w-full">
        <p>Pance Pass Rate Note</p>
        <ReactQuill className='mt-4 h-96 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_pance_pass_rate_note} 
        onChange={(e) => handleQuillInputChange('school_pance_pass_rate_note', e)} />
      </div>
    </form>
  )
}

export default PANCEPassRate