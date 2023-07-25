import React, { ChangeEvent, useState, MouseEvent } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';



const DegreeInfo = ({ newSchool,  openNotePopup, setNewSchool, handleInputChange, removeNote, openEditPopup }: any) => {
  const [inputList, setInputList] = useState([{ input: '' }])

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    // Input changes based on what user types 
    const name: any = e.target.name
    const field = newSchool[name] 

    const list: any = [...inputList]

    list[index].input = e.target.value
    
    setInputList(list)

    setNewSchool({
      ...newSchool,
      [name]: {
        ...field, 
        fields: list
      }
    })
  }

  // Removes specific field from input list 
  const removeField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const name: any = (e.currentTarget as HTMLButtonElement).value;
    const field = newSchool[name]; 
    
    const list = inputList.filter(input => inputList.indexOf(input) !== index);

    setInputList(list)

    setNewSchool({
      ...newSchool,
      [name]: {
        ...field, 
        fields: list
      }
    })
    
  }


  // Adds more input fields to input list 
  const addInputFields = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setInputList([...inputList, { input: "" }])
  }

  console.log(newSchool)

  return (
    <form className="mt-16 font-['Noto Sans']">
      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Types of Degrees Offered</label>
        <button value="school_type_of_degree_offered" className="w-56 pl-4 text-orange-500 border border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={addInputFields}>
          <AiOutlinePlus className="absolute ml-2 mt-[6px]"/>
          Add more fields
        </button>
        <button value="school_type_of_degree_offered" className="w-32 ml-4 border text-orange-500 border-[#F06A6A] rounded-md h-14 text-xl" 
        onClick={openNotePopup}>
          Add Note
        </button>
        {inputList.map((input: any, index: any) => {
          return (         
          <div className='flex justify-center items-start gap-2 mt-4'>
            <input className="grow focus:outline-none border border-[#B4B4B4] p-4 rounded-lg" 
           value={input.input} name='school_type_of_degree_offered' onChange={e => handleFieldChange(e, index)} />
            {index < 1 ? null : (
              <button onClick={(e) => removeField(e, index)} value='school_type_of_degree_offered'><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
            )}
           </div>
        )})
        }
        {
          newSchool.school_type_of_degree_offered.notes.length > 0 ? (
          <div className="w-full">
            {newSchool.school_type_of_degree_offered.notes.map((note: any, i: number) => {
              return (
              <div className='flex justify-center items-start gap-2 mt-4'>
                <div className="grow p-4 rounded-md border border-black">
                  <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                    {note.type}:
                  </p>
                  <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
                <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_type_of_degree_offered' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_type_of_degree_offered' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
              </div>
            )})}
          </div>
          ) : ''
        }
      </div>

      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Dual-Degree Program</label>
        <button value='school_dual_degree_program' className="w-32 border border-[#F06A6A] rounded-md h-14 text-xl" onClick={openNotePopup}>
          Add Note
        </button>
        <div className='mt-4 w-full'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" name='school_dual_degree_program' onChange={handleInputChange}/>
            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 
            peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
            <span className="ml-3 text-xl text-black">
              {newSchool.school_dual_degree_program.input ? 'True' : 'False'}
            </span>
          </label>
        </div>
        {
          newSchool.school_dual_degree_program.notes.length > 0 ? (
            <div className="w-full">
              {newSchool.school_dual_degree_program.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_dual_degree_program' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_dual_degree_program' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                  </div>
                </div>
              )})}
            </div>
          ) : ''
        }
      </div>

      <div className="relative mt-10 max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Bachelors degree required</label>
        <button value='school_bachelors_degree_required' className="w-32 border border-[#F06A6A] rounded-md h-14 text-xl" onClick={openNotePopup}>
          Add Note
        </button>
        <div className='mt-4 w-full'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" name='school_bachelors_degree_required' onChange={handleInputChange}/>
            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 
            peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
            <span className="ml-3 text-xl text-black">
              {newSchool.school_bachelors_degree_required.input ? 'True' : 'False'}
            </span>
          </label>
        </div>
        {
          newSchool.school_bachelors_degree_required.notes.length > 0 ? (
            <div className="w-full">
              {newSchool.school_bachelors_degree_required.notes.map((note: any, i: number) => {
                
                return (
                <div className='flex justify-center items-start gap-2 mt-4'>
                  <div className="grow p-4 rounded-md border border-black">
                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                      {note.type}:
                    </p>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                  </div>
                  <div className='flex flex-col-reverse justify-start items-center gap-1'>
                    <button value='school_bachelors_degree_required' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                    <button value='school_bachelors_degree_required' onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
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

export default DegreeInfo