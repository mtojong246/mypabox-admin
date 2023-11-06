import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { School, Note } from "../../../../types/schools.types"

import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "../Prereqs/AddNote"

export default function CommunityService({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> } ) {
    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ isGroup, setIsGroup ] = useState(false);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
        if (isGroup) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.concat(note)
                }
            })
        } else {
            const field = newSchool.school_community_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                    }
                }
            })
        }
    }

    const updateNote = (note: Note) => {
        if (isGroup) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            const field = newSchool.school_community_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                }
            })
        }
    }

    const deleteNote = (e: any, index: number, name?: string, noteName?: string) => {
        e.preventDefault()
        if (!name && !noteName) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.filter((n,i) => i !== index)
                }
            })
        } else if (name && noteName) {
            const field = newSchool.school_community_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                }
            })
        }
    }

    useEffect(() => {
        if (newSchool.school_community_service.school_community_service_recommended) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_recommended: {
                        input: 0,
                        school_minimum_community_service_hours_recommended_notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_community_service.school_community_service_recommended])
    
    useEffect(() => {
        if (newSchool.school_community_service.school_community_service_required) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_required: {
                        input: 0,
                        school_minimum_community_service_hours_required_notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_required: null,
                }
            })
        }
    }, [newSchool.school_community_service.school_community_service_required])
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_community_service: {
                ...newSchool.school_community_service,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool.school_community_service[e.target.name as keyof object] as object;
        if (e.target.name) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_average_community_service_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        }
    }
    
    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Community Service</label>   
            
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_community_service.school_community_service_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_community_service_required' checked={newSchool.school_community_service.school_community_service_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_community_service.school_community_service_required ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_community_service.school_minimum_community_service_hours_required && (
                <div className={`mt-7 mb-5 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Required</label>   
                    <div className='flex justify-center items-center gap-3'>
                        <input onChange={handleInput} value={newSchool.school_community_service.school_minimum_community_service_hours_required?.input ? newSchool.school_community_service.school_minimum_community_service_hours_required?.input : ''} name='school_minimum_community_service_hours_required' className='block grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_community_service_hours_required'); setNoteName('school_minimum_community_service_hours_required_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_community_service.school_minimum_community_service_hours_required?.school_minimum_community_service_hours_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_community_service.school_minimum_community_service_hours_required?.school_minimum_community_service_hours_required_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_community_service_hours_required'); setNoteName('school_minimum_community_service_hours_required_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, 'school_minimum_community_service_hours_required', 'school_minimum_community_service_hours_required_notes'); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>               
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_community_service.school_community_service_recommended ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_community_service_recommended' checked={newSchool.school_community_service.school_community_service_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_community_service.school_community_service_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_community_service.school_minimum_community_service_hours_recommended && (
                <div className={`mt-7 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Recommended</label>   
                    <div className='flex justify-center items-center gap-3'>
                        <input onChange={handleInput} value={newSchool.school_community_service.school_minimum_community_service_hours_recommended?.input ? newSchool.school_community_service.school_minimum_community_service_hours_recommended?.input : ''} name='school_minimum_community_service_hours_recommended' className='block grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_community_service_hours_recommended'); setNoteName('school_minimum_community_service_hours_recommended_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_community_service.school_minimum_community_service_hours_recommended?.school_minimum_community_service_hours_recommended_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_community_service.school_minimum_community_service_hours_recommended?.school_minimum_community_service_hours_recommended_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_community_service_hours_recommended'); setNoteName('school_minimum_community_service_hours_recommended_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, 'school_minimum_community_service_hours_recommended', 'school_minimum_community_service_hours_recommended_notes');  }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>                
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Community Service Hours Accepted Previous Cycle</label>   
                <input onChange={handleInput} value={newSchool.school_community_service.school_average_community_service_hours_accepted_previous_cycle ? newSchool.school_community_service.school_average_community_service_hours_accepted_previous_cycle : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />           
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_community_service.school_community_service_general_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_community_service.school_community_service_general_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => {deleteNote(e, i)}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>
            </div>
        </div>
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}