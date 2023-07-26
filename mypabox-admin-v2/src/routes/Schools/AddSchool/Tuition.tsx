import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'
import { AiOutlineClose } from 'react-icons/ai'

const Tuition = ({ newSchool, setNewSchool, handleInputChange, openNotePopup, openEditPopup, removeNote }: any) => {

  return (
    <form className="mt-16 font-['Noto Sans']">
      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">In-State-Tuition</label>
        <button value="school_in_state_tuition" className="w-32 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>    
        <input className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" type='number'
        value={newSchool.school_in_state_tuition.input} name='school_in_state_tuition' onChange={handleInputChange} />
        {
          newSchool.school_in_state_tuition.notes.length > 0 ? (
          <div className="w-full">
            {newSchool.school_in_state_tuition.notes.map((note: any, i: number) => {
              return (
              <div className='flex justify-center items-start gap-2 mt-4'>
                <div className="grow p-4 rounded-md border border-black">
                  <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
                <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_in_state_tuition' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_in_state_tuition' onClick={(e) => removeNote(e, i)}>
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
        <label className="absolute top-[-16px] text-xl bg-white">Out-Of-State-Tuition</label>
        <button value='school_out_of_state_tuition' className="w-32 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>
        <input type='number' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
        value={newSchool.school_out_of_state_tuition.input} name='school_out_of_state_tuition' onChange={handleInputChange}/>
        {
          newSchool.school_out_of_state_tuition.notes.length > 0 ? (
            <div className="w-full">
              {newSchool.school_out_of_state_tuition.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_out_of_state_tuition' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_out_of_state_tuition' onClick={(e) => removeNote(e, i)}>
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
        <label className="absolute top-[-16px] text-xl bg-white">Tuition General Note</label>
        <button value='school_tuition_general_note' className="w-32 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>
        <input type='text' className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
        value={newSchool.school_tuition_general_note.input} name='school_tuition_general_note' onChange={handleInputChange}/>
        {
          newSchool.school_tuition_general_note.notes.length > 0 ? (
            <div className="w-full">
              {newSchool.school_tuition_general_note.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_tuition_general_note' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_tuition_general_note' onClick={(e) => removeNote(e, i)}>
                      <AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/>
                    </button>
                  </div>
                </div>
              )})}
            </div>
          ) : ''
        }
      </div>
    </form>
  )
}

export default Tuition