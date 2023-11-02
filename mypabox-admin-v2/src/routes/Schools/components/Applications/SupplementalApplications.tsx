import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';

export default function SupplementalApplications({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        if (newSchool.school_supplemental_application_required.input) {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: '',
                    school_supplemental_application_fee: 0,
                    school_supplemental_application_link: '',
                    school_supplemental_application_link_provided_with_invite_only: false,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: null,
                    school_supplemental_application_fee: null,
                    school_supplemental_application_link: null,
                    school_supplemental_application_link_provided_with_invite_only: null,
                }
            })
        }
    }, [newSchool.school_supplemental_application_required.input])

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_supplemental_application_required: {
                ...newSchool.school_supplemental_application_required,
                [e.target.name]: e.target.checked,
            }
        })
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value: string | number = "";
        if ((e.target.name.toString()) === 'school_supplemental_application_fee') {
            value = Number(e.target.value)
        } else {
            value = e.target.value
        }
        setNewSchool({
            ...newSchool,
            school_supplemental_application_required: {
                ...newSchool.school_supplemental_application_required,
                [e.target.name]: value,
            }
        })
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_supplemental_application_required: {
                ...newSchool.school_supplemental_application_required,
                school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.concat(note)
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_supplemental_application_required: {
                ...newSchool.school_supplemental_application_required,
                school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.map((n ,i) => {
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
            school_supplemental_application_required: {
                ...newSchool.school_supplemental_application_required,
                school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.filter((n,i) => i !== index)
            }
        })
    };

    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border p-4 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Supplemental Application Required</label>  
                <div className='w-full mt-2 mb-4'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_supplemental_application_required.input ? true : false} name='input' type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_supplemental_application_required.input ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_supplemental_application_required.input && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Deadline</label> 
                        <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_deadline!} name='school_supplemental_application_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 h-[58px] text-lg rounded-lg' />  
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Fee</label> 
                        <div className='flex justify-start items-center gap-1 w-1/3 border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_fee!} name='school_supplemental_application_fee' className='grow focus:outline-none border-none' />  
                        </div>
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link</label> 
                        <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_link!} name='school_supplemental_application_link' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[58px] text-lg rounded-lg' />  
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link Provided With Invite Only</label> 
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleCheck} checked={newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? true : false} name='school_supplemental_application_link_provided_with_invite_only' type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? 'True' : 'False'}</span>
                            </label>
                        </div>
                    </div> 
                </>
            )}
            <div className={`${newSchool.school_supplemental_application_required.input ? 'mx-5 mb-5' : 'mx-0 mb-0'}`}>
            {newSchool.school_supplemental_application_required.input && <label className='font-medium text-xl inline-block mt-8'>Notes:</label>}
            <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_supplemental_application_required.school_supplemental_application_notes && (
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_supplemental_application_required.school_supplemental_application_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_supplemental_application_required.school_supplemental_application_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}