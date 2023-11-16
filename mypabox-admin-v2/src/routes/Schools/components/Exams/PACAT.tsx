import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState } from "react";
import { School, Note } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import ReactQuill from 'react-quill';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'

export default function PACAT({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ pacatRequiredOrRecommended, setPacatRequiredOrRecommended ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && !pacatRequiredOrRecommended) {
            setPacatRequiredOrRecommended(true);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: newSchool.school_pacat.school_pacat_exam_school_code ? newSchool.school_pacat.school_pacat_exam_school_code : 0,
                    school_pacat_exam_scaled_minimum_score_required: newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required : 0,
                    school_pacat_exam_group_scaled_minimum_score_required: newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required : 0,
                }
            })
        } else if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && pacatRequiredOrRecommended) {
            return
        } else if (!newSchool.school_pacat.school_pacat_required && !newSchool.school_pacat.school_pacat_recommended) {
            setPacatRequiredOrRecommended(false);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: null,
                    school_pacat_exam_scaled_minimum_score_required: null,
                    school_pacat_exam_group_scaled_minimum_score_required: null,
                }
            })
        }
    }, [newSchool.school_pacat.school_pacat_required, newSchool.school_pacat.school_pacat_recommended])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                [e.target.name]: e.target.value,
            }
        })
    }

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.concat(note)
            }
        })
    }

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    }

    const deleteNote = (e:any, index: number) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.filter((n,i) => i !== index)
            }
        })
    }


    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">PA-CAT</label>   

            <div className={`mt-6 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_pacat_required' checked={newSchool.school_pacat.school_pacat_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_pacat.school_pacat_required ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_pacat_recommended' checked={newSchool.school_pacat.school_pacat_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_pacat.school_pacat_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>
            {pacatRequiredOrRecommended && (
            <>
                <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam School Code</label>   
                    <input onChange={handleInput} name='school_pacat_exam_school_code' value={newSchool.school_pacat.school_pacat_exam_school_code ? newSchool.school_pacat.school_pacat_exam_school_code : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />           
                </div>

                <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam Scaled Minimum Score Required</label>   
                    <input onChange={handleInput} name='school_pacat_exam_scaled_minimum_score_required' value={newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />           
                </div>

                <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam Group Scaled Minimum Score Required</label>   
                    <input onChange={handleInput} name='school_pacat_exam_group_scaled_minimum_score_required' value={newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />           
                </div>
            </>
            )}

            <div className={`w-full mt-8 mb-5`}>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_pacat.school_pacat_exam_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_pacat.school_pacat_exam_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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