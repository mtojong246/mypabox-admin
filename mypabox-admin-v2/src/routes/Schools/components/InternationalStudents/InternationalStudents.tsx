import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';

export default function InternationalStudents({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_international_students_accepted: {
                ...newSchool.school_international_students_accepted,
                input: e.target.checked,
            }
        })
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_international_students_accepted: {
                ...newSchool.school_international_students_accepted,
                school_international_students_notes: newSchool.school_international_students_accepted.school_international_students_notes.concat(note)
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_international_students_accepted: {
                ...newSchool.school_international_students_accepted,
                school_international_students_notes: newSchool.school_international_students_accepted.school_international_students_notes.map((n,i) => {
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
            school_international_students_accepted: {
                ...newSchool.school_international_students_accepted,
                school_international_students_notes: newSchool.school_international_students_accepted.school_international_students_notes.filter((n,i) => i !== index)
            }
        })
    }

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">International Students Accepted</label>  
            <div className='flex justify-center items-center gap-3'>
                <div className='mt-2 grow'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_international_students_accepted.input ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_international_students_accepted.input ? 'True' : 'False'}</span>
                    </label>
                </div>
                <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
            {newSchool.school_international_students_accepted.school_international_students_notes && (
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_international_students_accepted.school_international_students_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_international_students_accepted.school_international_students_notes.map((note, i) => (
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
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}