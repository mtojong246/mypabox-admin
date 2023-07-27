import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'
import Select from 'react-select'

const AccreditationStatus = ({ newSchool, handleInputChange, openNotePopup, setNewSchool, removeNote, openEditPopup }: any) => {

  const options = [
    { label: 'Provisional', value: 'Provisional', target: {name: "school_accreditation_status", type: 'text', value: 'Provisional' }},
    { label: 'Continued', value: 'Continued', target: {name: "school_accreditation_status", type: 'text', value: 'Continued' }},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Clinical Postgraduate Program' }},
    { label: 'Probation', value: 'Probation', target: {name: "school_accreditation_status", type: 'text', value: 'Probation' }},
    { label: 'Administrative Probation', value: 'Administrative Probation', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Administrative Probation' }},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withheld' }},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withdrawn' }},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Voluntary Inactive Status' }},
  ]

  return (
    <form className="mt-16 font-['Noto Sans']">
      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Accreditation Status</label>
        <button value="school_accreditation_status" className="w-32 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>    
        <Select className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" name="school_accreditation_status" 
        options={options} onChange={handleInputChange} />
        {
          newSchool.school_accreditation_status.length > 0 ? (
          <div className="w-full">
            {newSchool.school_accreditation_status.notes.map((note: any, i: number) => {
              return (
              <div className='flex justify-center items-start gap-2 mt-4'>
                <div className="grow p-4 rounded-md border border-black">
                  <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
                <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_accreditation_status' onClick={(e) => openEditPopup(e, note, i)}>
                      <FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/>
                    </button>
                    <button value='school_accreditation_status' onClick={(e) => removeNote(e, i)}>
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
        <p>Accreditation Status General Notes</p>
        <ReactQuill className='mt-4 h-96 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_accreditation_status_general_note} 
        onChange={(e) => handleInputChange('school_accreditation_status_general_note', e)} />
      </div>
    </form>
  )
}

export default AccreditationStatus