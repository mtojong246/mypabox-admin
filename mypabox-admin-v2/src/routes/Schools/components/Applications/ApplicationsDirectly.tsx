import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';

export default function ApplicationsDirectly({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        if (newSchool.school_application_submitted_directly_to_school.input) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : '',
                    school_application_direct_to_school_fee: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee : 0,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes : []
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: null,
                    school_application_direct_to_school_fee: null,
                    school_application_direct_to_school_notes: []
                }
            })
            console.log(newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline)
        }
    }, [newSchool.school_application_submitted_directly_to_school.input]);

    console.log(newSchool.school_application_submitted_directly_to_school.input, newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline)

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_directly_to_school: {
                ...newSchool.school_application_submitted_directly_to_school,
                input: e.target.checked,
            }
        })
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'school_application_direct_to_school_fee') {
            if (e.target.value === '') {
                setNewSchool({
                    ...newSchool,
                    school_application_submitted_directly_to_school: {
                        ...newSchool.school_application_submitted_directly_to_school,
                        [e.target.name]: '',
                    }
                })
            } else {
                const conversion = parseInt(e.target.value.replace(/,/g, ''));
                if (isNaN(conversion)) {
                    return
                } else {
                    const value = conversion.toLocaleString();
                    setNewSchool({
                        ...newSchool,
                        school_application_submitted_directly_to_school: {
                            ...newSchool.school_application_submitted_directly_to_school,
                            [e.target.name]: value,
                        }
                    })
                }
            }
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    [e.target.name]: e.target.value,
                }
            })
        }
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_directly_to_school: {
                ...newSchool.school_application_submitted_directly_to_school,
                school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.concat(note)
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_directly_to_school: {
                ...newSchool.school_application_submitted_directly_to_school,
                school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.map((n,i) => {
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
            school_application_submitted_directly_to_school: {
                ...newSchool.school_application_submitted_directly_to_school,
                school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.filter((n,i) => i !== index)
            }
        })
    };

    return (
        <div className={`${newSchool.school_application_submitted_on_caspa.input ? 'hidden' : 'block'}`}>
        <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Application Submitted Directly To School</label>  
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_application_submitted_directly_to_school.input? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_application_submitted_directly_to_school.input ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_application_submitted_directly_to_school.input && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                        <input onChange={handleInput} value={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : ''} name='school_application_direct_to_school_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />  
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Fee</label> 
                        <div className='flex justify-start items-center gap-1 w-1/3 border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input onChange={handleInput} value={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee : ''} name='school_application_direct_to_school_fee' className='grow focus:outline-none border-none' />  
                        </div>
                    </div> 
                </>
            )}
            {newSchool.school_application_submitted_directly_to_school.input && (
            <div className={`mx-5 mb-5`}>
            <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
            <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes && (
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.map((note, i) => (
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
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </div>
    )
}