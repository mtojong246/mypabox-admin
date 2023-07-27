import { useEffect, useState, MouseEvent, SetStateAction, Dispatch, ChangeEvent } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import Select from 'react-select';
import countries from '../../../data/countries.json'
import { School, Note, StringInput, BooleanInput, NumberInput } from '../../../types/schools.types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { generalInfo } from '../../../data/generalInfo';


const GeneralInfo = ({ newSchool, handleInputChange, openNotePopup, setNewSchool, removeNote, openEditPopup, handleQuillInputChange, handleCheck }: { 
  newSchool: School, handleInputChange: (e: any) => void, handleCheck: (e: ChangeEvent<HTMLInputElement>) => void, openNotePopup: (e: MouseEvent<HTMLButtonElement>) => void, 
  openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void, setNewSchool: Dispatch<SetStateAction<School>>, 
  removeNote: (e: MouseEvent<HTMLButtonElement>, i: number) => void, handleQuillInputChange: (name: string, value: string) => void }) => {
  const [stateNames, setStateNames] = useState<any>([])
  const [countryNames, setCountryNames] = useState<any>([])

  useEffect(() => {
    
    setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
      target: {name: "school_country", type: 'text', value: country.name }})))

    setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
     .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
     value: state.name, } })))

  }, [newSchool.school_country.input])

  
  return (
    <form className='pb-24 min-h-screen'>
    {generalInfo.map((general) => {

      // ** TEXT INPUT ** //

      if (general.type === 'text') {
        return (
          <div className={`${general.margin} relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">{general.name}</label>
            <button name='add' value={general.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
              Add Note
            </button>
            <input className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" 
            value={(newSchool[general.value as keyof School] as StringInput | NumberInput).input as string | number} name={general.value} onChange={handleInputChange} />
            {
              (newSchool[general.value as keyof School] as StringInput | NumberInput).notes ? (
              <div className="w-full">
                {(newSchool[general.value as keyof School] as StringInput | NumberInput).notes?.map((note: any, i: number) => {
                  return (
                  <div className='flex justify-center items-start gap-2 mt-4'>
                    <div className="grow p-4 rounded-md border border-black">
                      <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                        {note.type}:
                      </p>
                      <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                      <button value={general.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                      <button value={general.value} onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                  </div>
                )})}
              </div>
              ) : ''
            }
          </div>
        )

      // ** SELECT INPUT ** //

      } else if (general.type === 'select') {
        return (
          <div className={`${general.margin} relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">{general.name}</label>
            <button value={general.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
              Add Note
            </button>
            <Select className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-4" name={general.value} 
            options={general.value === 'school_state' ? stateNames : countryNames} onChange={handleInputChange} />
            {
              (newSchool[general.value as keyof School] as StringInput).notes ? (
              <div className="w-full">
                {(newSchool[general.value as keyof School] as StringInput).notes?.map((note: any, i: number) => {
                  
                  return (
                  <div className='flex justify-center items-start gap-2 mt-4'>
                    <div className="grow p-4 rounded-md border border-black">
                      <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                        {note.type}:
                      </p>
                      <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                      <button value={general.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                      <button value={general.value} onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                  </div>
                )})}
              </div>
              ) : ''
            }
          </div>
        )

      // ** BOOLEAN INPUT ** //

      } else if (general.type === 'bool') {
        return (
          <div className={`${general.margin} relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">{general.name}</label>
            <button value={general.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
              Add Note
            </button>
            <div className='mt-4 w-full'>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" name={general.value} onChange={handleCheck}/>
                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                <span className="ml-3 text-xl text-black">
                  {(newSchool[general.value as keyof School] as BooleanInput).input ? 'True' : 'False'}
                </span>
              </label>
            </div>

            {
              (newSchool[general.value as keyof School] as BooleanInput).notes ? (
              <div className="w-full">
                {(newSchool[general.value as keyof School] as BooleanInput).notes?.map((note: any, i: number) => {
                  
                  return (
                  <div className='flex justify-center items-start gap-2 mt-4'>
                    <div className="grow p-4 rounded-md border border-black">
                      <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                        {note.type}:
                      </p>
                      <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                      <button value={general.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                      <button value={general.value} onClick={(e) => removeNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                  </div>
                )})}
              </div>
              ) : ''
            }
          </div>
        )
      }
      return <></>
    })}


        <div className="mt-32 text-xl w-full">
          <p>General Information Notes</p>
          <ReactQuill className='mt-4 h-96 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_general_information} 
          onChange={(e) => handleQuillInputChange('school_general_information', e)} />
        </div>
        
      </form>
  )
}

export default GeneralInfo