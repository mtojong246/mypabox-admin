import { School, Note } from "../../../../types/schools.types"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import PatientExperience from "./PatientExperience"
import HealthcareExperience from "./HealthcareExperience"
import CommunityService from "./CommunityService"
import VolunteerService from "./VolunteerService"

import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "../Prereqs/AddNote"

export default function Experience({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>}) {
    
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_paid_experience_required: {
                ...newSchool.school_paid_experience_required,
                input: e.target.checked,
            }
        })
    }

    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.concat(note)
                }
            })
    }

    const updateNote = (note: Note) => {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
    }

    const deleteNote = (e: any, index: number) => {
        e.preventDefault()
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.filter((n,i) => i !== index)
                }
            })
    }
    
    return (
        <>
        {newSchool && (
            <>
                <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Paid Experience Required</label>  
                    <div className='flex justify-start items-center gap-3'>
                        <div className="mt-2 grow">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleInput} checked={newSchool.school_paid_experience_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_paid_experience_required.input ? 'True' : 'False'}</span>
                            </label>
                        </div>
                        <button onClick={(e) => {toggleNotePopup(e);}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div> 
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_paid_experience_required.school_paid_experience_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_paid_experience_required.school_paid_experience_required_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i);}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>
                </div>


                <PatientExperience newSchool={newSchool} setNewSchool={setNewSchool}/>
                <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool}/>
                <CommunityService newSchool={newSchool} setNewSchool={setNewSchool}/>
                <VolunteerService newSchool={newSchool} setNewSchool={setNewSchool}/>
            </>
        )}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}