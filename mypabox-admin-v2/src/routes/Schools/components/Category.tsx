import { categories, CategoryType } from "../../../data/categories"
import { useState, useEffect, ChangeEvent, MouseEvent, Dispatch, SetStateAction } from "react"
import { School, StringInput, NumberInput, BooleanInput, StringInputWithFields, Note } from "../../../types/schools.types";
import countries from '../../../data/countries.json';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Select from 'react-select';
import GPA from "./GPA/GPA";
import Prereqs from "./Prereqs/Prereqs";
import PAShadowing from "./PAShadowing/PAShadowing";

import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import DeletePopUp from "./DeletePopUp";
import Experience from "./Experience/Experience";
import Exams from "./Exams/Exams";
import Evaluations from "./Evaluations/Evaluations";
import InternationalStudents from "./InternationalStudents/InternationalStudents";
import Certifications from "./Certifications/Certifications";
import Applications from "./Applications/Applications";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import DegreeInfo from "./GeneralInfo/DegreeInfo";
import AccreditationStatus from "./GeneralInfo/AccreditationStatus";
import MissionStatement from "./GeneralInfo/MissionStatement";
import Tuition from "./GeneralInfo/Tuition";
import PANCEPassRate from "./GeneralInfo/PANCEPassRate";


export default function Category({ tab, newSchool, setNewSchool, handleInputChange, handleCheck, handleQuillInputChange, openNotePopup, openEditPopup, removeNote }: { 
    tab: string,
    newSchool: School,
    handleInputChange: (e: any) => void,
    handleCheck: (e: ChangeEvent<HTMLInputElement>) => void,
    handleQuillInputChange: (name: string, value: string) => void,
    openNotePopup: (e: MouseEvent<HTMLButtonElement>) => void, 
    openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void,
    removeNote: (e: MouseEvent<HTMLButtonElement>, i: number) => void,
    setNewSchool: Dispatch<SetStateAction<School>>,
 }) {

    const [stateNames, setStateNames] = useState<any>([]);
    const [countryNames, setCountryNames] = useState<any>([]);
    const [category, setCategory] = useState<CategoryType>({} as CategoryType);
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [eventTarget, setEventTarget] = useState()
    const [index, setIndex] = useState(0)
    const [inputType, setInputType] = useState('')

    useEffect(() => {
        const newCategory = categories.find(cat => cat.hash === tab);
        if (newCategory) {
            setCategory(newCategory);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [tab])


    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
          target: {name: "school_country", type: 'text', value: country.name }})))
    
        setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
         .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
         value: state.name, } })))
    
    }, [newSchool.school_country.input])

    const [inputList, setInputList] = useState([{ input: '' }])

    // Specifically handles changes for inputs with multiple fields 
    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        // Input changes based on what user types 
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInputWithFields;

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
        
        const name = (e.currentTarget as HTMLButtonElement).value as keyof School;
        const field = newSchool[name] as StringInputWithFields; 
        
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

    const handleDeletePopup = (e: any , i: SetStateAction<number>, input: string) => {
      e.preventDefault()
      setEventTarget(e.currentTarget.value)
      setInputType(input)
      setIndex(i)
      setDeletePopUp(!deletePopUp)
    }
    
    return (
        <form className='pb-24 min-h-screen'>
        {/* {category.fields && category.fields.map((cat) => {

        // ** TEXT INPUT ** //

        if (cat.type === 'text') {
            return (
            <div className={`${cat.margin} relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">{cat.name}</label>
                <input className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded" 
                value={(newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number} name={cat.value} onChange={handleInputChange} />
                
                {
                (newSchool[cat.value as keyof School] as StringInput | NumberInput).notes ? (
                <>
                <button name='add' value={cat.value} className="mt-4 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
                    Add Note
                </button>
                <div className="w-full">
                    {(newSchool[cat.value as keyof School] as StringInput | NumberInput).notes?.map((note: any, i: number) => {
                    return (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded border border-black">
                        <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                            {note.type}:
                        </p>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                        <button value={cat.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-[#4573D2] text-white'/></button>
                        <button value={cat.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                }
            </div>
            )

        // ** SELECT INPUT ** //

        } else if (cat.type === 'select') {
            return (
            <div className={`${cat.margin} relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">{cat.name}</label>
                <Select className="w-full focus:outline-none rounded mb-4" name={cat.value} 
                options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : cat.options} onChange={handleInputChange} />
                <button value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
                Add Note
                </button>
                {
                (newSchool[cat.value as keyof School] as StringInput).notes ? (
                <div className="w-full">
                    {(newSchool[cat.value as keyof School] as StringInput).notes?.map((note: any, i: number) => {
                    
                    return (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded border border-black">
                        <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                            {note.type}:
                        </p>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                        <button value={cat.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-[#4573D2] text-white'/></button>
                        <button value={cat.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                    )})}
                </div>
                ) : ''
                }
            </div>
            )

        // ** BOOLEAN INPUT ** //

        } else if (cat.type === 'bool') {
            return (
            <div className={`${cat.margin} relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">{cat.name}</label>
                <div className='mb-4 mt-2 w-full'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name={cat.value} onChange={handleCheck}/>
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">
                    {(newSchool[cat.value as keyof School] as BooleanInput).input ? 'True' : 'False'}
                    </span>
                </label>
                </div>
                <button value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]" onClick={openNotePopup}>
                Add Note
                </button>
                {
                (newSchool[cat.value as keyof School] as BooleanInput).notes ? (
                <div className="w-full">
                    {(newSchool[cat.value as keyof School] as BooleanInput).notes?.map((note: any, i: number) => {
                    
                    return (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded border border-black">
                        <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                            {note.type}:
                        </p>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                        <button value={cat.value} onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-[#4573D2] text-white'/></button>
                        <button value={cat.value} onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                    )})}
                </div>
                ) : ''
                }
            </div>
            )

        // ** TEXT EDITOR ** //

        } else if (cat.type === 'editor') {
            return (
            <div className={`${cat.margin} text-xl w-full`}>
                <p>{cat.name}</p>
                <ReactQuill className='mt-4 h-96 rounded-2xl max-w-[900px]' theme="snow" value={newSchool[cat.value as keyof School] as string} 
                onChange={(e) => handleQuillInputChange(cat.value, e)} />
            </div>
            )

         // ** MULTIPLE FIELDS ** //

        } else if (cat.type === 'fields') {
            return (
                <div className={`${cat.margin} relative max-w-[900px] border-2 p-5 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Types of Degrees Offered</label>
                    <button value="school_type_of_degree_offered" className="w-56 pl-4 text-red-500 border border-[#F06A6A] rounded h-14 text-xl" 
                    onClick={addInputFields}>
                    <AiOutlinePlus className="absolute ml-2 mt-[6px]"/>
                    Add more fields
                    </button>
                    <button value="school_type_of_degree_offered" className="w-32 ml-4 border text-red-500 border-[#F06A6A] rounded h-14 text-xl" 
                    onClick={openNotePopup}>
                    Add Note
                    </button>
                    {inputList.map((input: any, index: any) => {
                    return (         
                        <div className='flex justify-center items-start gap-2 mt-4'>
                            <input className="grow focus:outline-none border border-[#B4B4B4] p-4 rounded" 
                        value={input.input} name='school_type_of_degree_offered' onChange={e => handleFieldChange(e, index)} />
                            {index < 1 ? null : (
                            <button onClick={(e) => handleDeletePopup(e, index, 'inputField')} value='school_type_of_degree_offered'><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                            )}
                        </div>
                    )})
                    }
                    { (newSchool[cat.value as keyof School] as StringInputWithFields).notes ? (
                        <div className="w-full">
                            {(newSchool[cat.value as keyof School] as BooleanInput).notes?.map((note: any, i: number) => {
                            return (
                                <div className='flex justify-center items-start gap-2 mt-4'>
                                    <div className="grow p-4 rounded border border-black">
                                    <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                        {note.type}:
                                    </p>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                    </div>
                                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                        <button value='school_type_of_degree_offered' onClick={(e) => openEditPopup(e, note, i)}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                        <button value='school_type_of_degree_offered' onClick={(e) => handleDeletePopup(e, i, 'note')}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                                    </div>
                                </div>
                            )})}
                        </div>
                    ) : ''
                    }
                </div>
            )
        }
        // NOTE: GPA section lives in separate component due to variable data field types and logic 
        })} */}
        <>
            {tab === '#general-info' && <GeneralInfo newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#degree-info' && <DegreeInfo newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#accreditation-status' && <AccreditationStatus newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#mission-statement' && <MissionStatement newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#tuition' && <Tuition newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#pance-pass-rate' && <PANCEPassRate newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#GPA' && <GPA newSchool={newSchool} setNewSchool={setNewSchool} openNotePopup={openNotePopup} handleInputChange={handleInputChange} openEditPopup={openEditPopup} handleDeletePopup={handleDeletePopup}/>}
            {tab === '#prerequisites' && <Prereqs newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#experience' && <Experience newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#pa-shadowing' && <PAShadowing newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {tab === '#exams' && <Exams newSchool={newSchool} setNewSchool={setNewSchool} />}
            {tab === '#evaluations' && <Evaluations newSchool={newSchool} setNewSchool={setNewSchool} />}
            {tab === '#international-students' && <InternationalStudents newSchool={newSchool} setNewSchool={setNewSchool} />}
            {tab === '#certifications' && <Certifications newSchool={newSchool} setNewSchool={setNewSchool} />}
            {tab === '#applications' && <Applications newSchool={newSchool} setNewSchool={setNewSchool}/>}
            {deletePopUp ? <DeletePopUp event={eventTarget} i={index} deletePopUp={deletePopUp} setDeletePopUp={setDeletePopUp} 
            removeNote={removeNote} removeField={removeField} inputType={inputType} /> : ''}
        </>
        </form>
    )
}