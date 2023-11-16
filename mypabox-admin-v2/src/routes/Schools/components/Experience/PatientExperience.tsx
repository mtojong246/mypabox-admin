import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { School, Note } from "../../../../types/schools.types"
import Select from 'react-select';

import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "../Prereqs/AddNote"

const options = [
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function PatientExperience({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    })
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
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.concat(note)
                }
            })
        } else {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
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
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
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
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.filter((n,i) => i !== index)
                }
            })
        } else if (name && noteName) {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                }
            })
        }
    }

    useEffect(() => {
        if (newSchool.school_patient_experience.school_patient_experience_required) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: {
                        input: newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : 0,
                        school_minimum_patient_care_experience_hours_required_notes: newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes  : [],
                    },
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        input: newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.input ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : [] ,
                    },
                }
            })

            if (newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed) {
                const array = newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: null,
                }
            })
            setSelection({
                number: '',
                duration: ''
            })
        }
    }, [newSchool.school_patient_experience.school_patient_experience_required]);


    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    ...newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed!,
                    input: selection.number + ' ' + selection.duration,
                }
            }
        })
    }, [selection])
    
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool.school_patient_experience[e.target.name as keyof object] as object;
        if (e.target.name) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_average_patient_care_experience_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        }
    }

    const handleSelectionNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSelection({
            ...selection,
            number: e.target.value.trim(),
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_patient_experience_required: e.target.checked,
            }
        })
    }

    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Patient Experience (PCE)</label>   
            
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_patient_experience.school_patient_experience_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PCE Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_patient_experience.school_patient_experience_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_patient_experience.school_patient_experience_required ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required && newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && (
                <>
                    <div className={`mt-7 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PCE Hours Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <input onChange={handleInput} value={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input : ''} name='school_minimum_patient_care_experience_hours_required' className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_patient_care_experience_hours_required'); setNoteName('school_minimum_patient_care_experience_hours_required_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_patient_care_experience_hours_required'); setNoteName('school_minimum_patient_care_experience_hours_required_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_minimum_patient_care_experience_hours_required', 'school_minimum_patient_care_experience_hours_required_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>            
                    </div>

                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame PCE Needs To Be Completed</label>   
                        <div className='flex justify-start items-center gap-2'>
                            <input onChange={handleSelectionNumber} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={options} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="grow focus:outline-none"/>
                            <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed'); setNoteName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>  
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes.length? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed'); setNoteName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed', 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>          
                    </div>
                </>
                )}
            </div>

            

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average PCE Hours Accepted Previous Cycle</label>   
                <input onChange={handleInput} value={newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle ? newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />           
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_patient_care_experience_general_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_patient_experience.school_patient_care_experience_general_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e) => {deleteNote(e, i)}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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