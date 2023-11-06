import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { School, Note } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

export default function PAShadowing({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');


    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as object;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
            }
        })

    }

    const updateNote = (note: Note) => {
    const field = newSchool[name as keyof School] as object;
    setNewSchool({
        ...newSchool,
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
    })
    }

    const deleteNote = (e: any, index: number, name: string, noteName: string) => {
        e.preventDefault();
        const field = newSchool[name as keyof School] as object;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
            }
        })
    }


    useEffect(() => {
        if (newSchool.school_pa_shadowing_required.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_required.input]);

    useEffect(() => {
        if (newSchool.school_pa_shadowing_recommended.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_recommended.input])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool[e.target.name as keyof School] as object;
        setNewSchool({
            ...newSchool,
            [e.target.name]: {
                ...field,
                input: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_average_pa_shadowing_hours_accepted_previous_cycle: {
                ...newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle,
                input: Number(e.target.value),
            }
        })
    }

    const handleInputInCategory = (e: ChangeEvent<HTMLInputElement>, category: string) => {
        const field = newSchool[category as keyof School] as object;
        console.log(field)
        setNewSchool({
            ...newSchool,
            [category]: {
                ...field,
                [e.target.name]: e.target.value,
            }
        })
    }

    
    
    return (
        <>
        {newSchool && (
            <>
                <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">PA Shadowing Hours Required</label>
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pa_shadowing_required' checked={newSchool.school_pa_shadowing_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_pa_shadowing_required.input ? 'True' : 'False'}</span>
                        </label>
                    </div>
                    {newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required !== null && (
                        <div className={`mt-7 mx-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Required</label>   
                            <input onChange={(e) => handleInputInCategory(e, 'school_pa_shadowing_required')} name='school_minimum_pa_shadowing_hours_required' value={newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required ? newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required : ''} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />     
                        </div>
                    )}
                    {newSchool.school_pa_shadowing_required.input && (
                    <div className={`w-full mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_required.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_required'); setNoteName('school_minimum_pa_shadowing_hours_required_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pa_shadowing_required'); setNoteName('school_minimum_pa_shadowing_hours_required_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_pa_shadowing_required', 'school_minimum_pa_shadowing_hours_required_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>       
                    </div>
                    )}
                </div>


                <div className={`mt-20 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">PA Shadowing Hours Recommended</label>
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pa_shadowing_recommended' checked={newSchool.school_pa_shadowing_recommended.input ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_pa_shadowing_recommended.input ? 'True' : 'False'}</span>
                        </label>
                    </div>
                    {newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended !== null && (
                        <div className={`mt-7 mx-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Recommended</label>   
                            <input onChange={(e) => handleInputInCategory(e, 'school_pa_shadowing_recommended')} name='school_minimum_pa_shadowing_hours_recommended' value={newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended ? newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended : ''} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />     
                        </div>
                    )}
                    {newSchool.school_pa_shadowing_recommended.input && (
                    <div className={`w-full mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_recommended.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_recommended'); setNoteName('school_minimum_pa_shadowing_hours_recommended_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pa_shadowing_recommended'); setNoteName('school_minimum_pa_shadowing_hours_recommended_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_pa_shadowing_recommended', 'school_minimum_pa_shadowing_hours_recommended_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>    
                    </div>
                    )}
                </div>

                <div className={`mt-20 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Average PA Shadowing Hours Accepted Previous Cycle</label>
                    <div className='flex justify-center items-center gap-3'>
                        <input onChange={handleInput} value={newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input ? newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input : ''} className='block grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />     
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_average_pa_shadowing_hours_accepted_previous_cycle'); setNoteName('school_average_pa_shadowing_hours_accepted_previous_cycle_notes')}}className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_average_pa_shadowing_hours_accepted_previous_cycle'); setNoteName('school_average_pa_shadowing_hours_accepted_previous_cycle_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, 'school_average_pa_shadowing_hours_accepted_previous_cycle', 'school_average_pa_shadowing_hours_accepted_previous_cycle_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>    
                </div>
            </>
        )}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}