import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent} from "react"
import ReactQuill from "react-quill";
import Select, {StylesConfig} from 'react-select'
import AddNote from "../Prereqs/AddNote";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import { LuUndo2 } from "react-icons/lu";
import { GoLink } from "react-icons/go";


import { UserObject } from "../../../../types/users.types";

const options = [
    {value: 'Verified', label: 'Verified', color: '#27AE60', focus: '#27AE60'},
    {value: 'Completed', label: 'Completed', color: '#F39C12', focus: '#F39C12'},
    {value: 'Submitted', label: 'Submitted', color: '#3498DB', focus: '#3498DB'},
];


interface ColorOptions {value: string, label: string, color: string, focus: string}


const dot = (color:string = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color ,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 10,
      height: 10,
      width: 10,
    },
  });

const colorStyles: StylesConfig<ColorOptions> = {
    control: (styles) => ({...styles, backgroundColor: 'white'}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? data.focus : undefined,
            color: isDisabled ? '#ccc' : isSelected ? 'white' : isFocused ? 'white' : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? isSelected ? data.color : data.focus : undefined,
            }
        }
    },
    input: (styles) => ({...styles, ...dot()}),
    placeholder: (styles) => ({...styles, ...dot('#ccc')}),
    singleValue: (styles, {data}) => ({...styles, ...dot(data.color)})
}


export default function ApplicationsCaspa({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [ color, setColor ] = useState('');

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        if (newSchool.school_application_submitted_on_caspa.input) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_date: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date : '',
                    school_caspa_application_deadline_type: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type : '',
                    school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes ? newSchool.school_application_submitted_on_caspa.school_caspa_application_notes : []
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_date: null,
                    school_caspa_application_deadline_type: null,
                    school_caspa_application_notes: []
                }
            })
        }
    }, [newSchool.school_application_submitted_on_caspa.input]);

    useEffect(() => {
        const obj = options.find(opt => opt.value === newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type);
        if (obj) setColor(obj.color);
    }, [newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type])

    const handleCheck = (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_on_caspa: {
                    ...newSchool.edited_school_application_submitted_on_caspa,
                    input: e.target.checked,
                }
            })
        }
        
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_deadline_date: e.target.value,
            }
        })
    }

    const handleSelect = (e: any) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_deadline_type: e.value,
            }
        })
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    };

    const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.filter((n,i) => i !== index)
            }
        })
    };

    const enableEditMode = (e: MouseEvent<HTMLButtonElement>, isInner: boolean) => {
        e.preventDefault();
        if (!isInner) {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_on_caspa: {
                    ...newSchool.edited_school_application_submitted_on_caspa,
                    input: newSchool.edited_school_application_submitted_directly_to_school.input === null ? newSchool.school_application_submitted_on_caspa.input : newSchool.edited_school_application_submitted_on_caspa.input,
                    isEditMode: true,
                }
            })
        } 
    };

    const confirmEdit = (e:MouseEvent<HTMLButtonElement>, isInner: boolean, original?: string) => {
        e.preventDefault();
        const value = (e.currentTarget as HTMLButtonElement).value === 'true' ? true : false;
        if (!isInner) {
            if (!original) {
                setNewSchool({
                    ...newSchool,
                    edited_school_application_submitted_on_caspa: {
                        ...newSchool.edited_school_application_submitted_on_caspa,
                        input: newSchool.edited_school_application_submitted_on_caspa.input === newSchool.school_application_submitted_on_caspa.input ? null : newSchool.edited_school_application_submitted_on_caspa.input,
                        prev: newSchool.edited_school_application_submitted_on_caspa.input === newSchool.school_application_submitted_on_caspa.input ? null : value,
                        isEditMode: false,
                        link: '',
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_application_submitted_on_caspa: {
                        ...newSchool.school_application_submitted_on_caspa,
                        input: value,
                        
                    },
                    edited_school_application_submitted_on_caspa: {
                        ...newSchool.edited_school_application_submitted_on_caspa,
                        input: null,
                        prev: null,
                        isEditMode: false,
                        link: '',
                    }
                })
            }
        }
    }

    const undoEdit = (e:MouseEvent<HTMLButtonElement>, isInner: boolean) => {
        e.preventDefault();
        if (!isInner) {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_on_caspa: {
                    ...newSchool.edited_school_application_submitted_on_caspa,
                    input: newSchool.edited_school_application_submitted_on_caspa.input === newSchool.school_application_submitted_on_caspa.input ? null : newSchool.edited_school_application_submitted_on_caspa.prev,
                    prev: null,
                    isEditMode: false,
                    link: '',
                },
            })
        }
    }

    const revertEdit = (e:MouseEvent<HTMLButtonElement>, isInner: boolean) => {
        e.preventDefault();
        if (!isInner) {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_on_caspa: {
                    ...newSchool.edited_school_application_submitted_on_caspa,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                }
            })
        }
    };


    return (
        <div className={`${newSchool.school_application_submitted_directly_to_school.input ? 'hidden' : 'block'}`}>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Application Submitted On Caspa<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_application_submitted_on_caspa.input === null  ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_application_submitted_on_caspa.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label> 
            {loggedInUser.permissions.canVerify ? (
                    <>
                    {newSchool.edited_school_application_submitted_on_caspa.input !== null ? (
                    <div className='grow'>
                    <div className='mt-2 mb-1 flex justify-start items-start gap-6'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled checked={newSchool.edited_school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.edited_school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled checked={newSchool.school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className={`ml-3 text-xl text-black ${newSchool.edited_school_application_submitted_on_caspa.input ? 'line-through' : 'no-underline'}`}>{newSchool.school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                        </label>
                    </div>
                    </div>
                    ): (
                    <div className='w-full mt-2 mb-1'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, false)} checked={newSchool.school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                        </label>
                    </div>
                    )}
                    </>
                ): (
                    <div className='grow'>
                    <div className=' mt-2 mb-1 flex justify-start items-start gap-6'>
                        {(newSchool.edited_school_application_submitted_on_caspa.input !== null || newSchool.edited_school_application_submitted_on_caspa.isEditMode) && <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled={newSchool.edited_school_application_submitted_on_caspa.isEditMode ? false : true} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, true)} checked={newSchool.edited_school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.edited_school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                        </label>}
                        {newSchool.edited_school_application_submitted_on_caspa.input !== newSchool.school_application_submitted_on_caspa.input ? <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled checked={newSchool.school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className={`ml-3 text-xl text-black ${newSchool.edited_school_application_submitted_on_caspa.input ? 'line-through' : 'no-underline'}`}>{newSchool.school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                        </label> : null}
                    </div>
                    </div>
                    )}
                    
                    {(newSchool.school_application_submitted_on_caspa.input || newSchool.edited_school_application_submitted_on_caspa.input) && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] flex justify-start items-start gap-3`}>
                            <div className={`p-4 grow block rounded border-[#545454] border-2`}>
                                <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                                {loggedInUser.permissions.canVerify ? (
                                    <>
                                    {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null ? (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        <input disabled value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input ? newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input : ''} type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />  
                                        <input disabled value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date : ''} type='date' className={`w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input ? 'line-through' : 'no-underline'}`} />  
                                    </div>
                                    ): (
                                    <input onChange={handleInput} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date : ''} type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />  
                                    )}
                                    </>
                                ): (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null || newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode) && <input disabled={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode ? false : true} value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input ? newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input : ''} type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' /> } 
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date) || !newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode ? <input disabled value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date : ''} type='date' className={`w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input ? 'line-through' : 'no-underline'}`} /> : null} 
                                    </div>
                                    )}
                            </div> 
                            {isEdit && <div className='flex justify-start items-start gap-2'>
                            {!loggedInUser.permissions.canVerify ? (
                            <>
                                {!newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e, false)} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false)} value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null ? newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, false)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                                {(!newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode && newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null) ? (<button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                            </>
                            ) : (
                            <>
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false, 'school_application_submitted_on_capsa')} name='school_application_submitted_on_capsa'  value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input.toString()} ><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} name='school_application_submitted_on_capsa' ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            </>
                            )}
                            </div>}
                        </div>
                        <div className={`mt-12 mb-4 mx-4 relative max-w-[900px] flex justify-start items-start gap-3`}>
                            <div className={`p-4 grow block rounded border-[#545454] border-2`}>
                                <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline Type</label> 
                                {loggedInUser.permissions.canVerify ? (
                                    <>
                                    {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null ? (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        <Select styles={colorStyles} isDisabled options={options} className="w-1/3 focus:outline-none" value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? {value: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, label: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, color: color, focus: ''} : null}/>
                                        <Select styles={colorStyles} isDisabled options={options} className={`w-1/3 focus:outline-none ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/>
                                    </div>
                                    ): (
                                        <Select styles={colorStyles} onChange={handleSelect} options={options} className="w-1/3 focus:outline-none" value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/>
                                    )}
                                    </>
                                ): (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null || newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode) && <Select styles={colorStyles} isDisabled options={options} className="w-1/3 focus:outline-none" value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? {value: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, label: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, color: color, focus: ''} : null}/>}
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type) || !newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode ? <Select styles={colorStyles} isDisabled options={options} className={`w-1/3 focus:outline-none ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/> : null}
                                    </div>
                                )}
                            </div> 
                            {isEdit && <div className='flex justify-start items-start gap-2'>
                            {!loggedInUser.permissions.canVerify ? (
                            <>
                                {!newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e, false)} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false)} value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null ? newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, false)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                                {(!newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode && newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null) ? (<button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                            </>
                            ) : (
                            <>
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false, 'school_application_submitted_on_capsa')} name='school_application_submitted_on_capsa'  value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input.toString()} ><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                                {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} name='school_application_submitted_on_capsa' ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            </>
                            )}
                            </div>}
                        </div>
                    </>
                )}
                {newSchool.school_application_submitted_on_caspa.input && (
                <div className={`mx-5 mb-5`}>
                <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
                <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] mt-2 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes && (
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                )}
                </div>
                )}
            </div>
            {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                    <div className='flex justify-start items-start gap-2'>
                        {!loggedInUser.permissions.canVerify ? (
                        <>
                            {!newSchool.edited_school_application_submitted_on_caspa.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e, false)} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                            {newSchool.edited_school_application_submitted_on_caspa.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false)} value={newSchool.edited_school_application_submitted_on_caspa.input !== null ? newSchool.edited_school_application_submitted_on_caspa.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_application_submitted_on_caspa.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, false)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            {(!newSchool.edited_school_application_submitted_on_caspa.isEditMode && newSchool.edited_school_application_submitted_on_caspa.input !== null) ? (<button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                        </>
                        ) : (
                        <>
                            {newSchool.edited_school_application_submitted_on_caspa.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, false, 'school_application_submitted_on_capsa')} name='school_application_submitted_on_capsa'  value={newSchool.edited_school_application_submitted_on_caspa.input.toString()} ><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_application_submitted_on_caspa.input !== null && <button onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, false)} name='school_application_submitted_on_capsa' ><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        </>
                        )}
                    </div>
                    {!loggedInUser.permissions.canVerify && (
                        <>
                        {!newSchool.edited_school_application_submitted_on_caspa.link && newSchool.edited_school_application_submitted_on_caspa.isEditMode && <button className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                        {newSchool.edited_school_application_submitted_on_caspa.link && <button  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                    )}
                    {loggedInUser.permissions.canVerify && newSchool.edited_school_application_submitted_on_caspa.link && <a href={newSchool.edited_school_application_submitted_on_caspa.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
                </div>}
        </div>
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </div>
    )
}