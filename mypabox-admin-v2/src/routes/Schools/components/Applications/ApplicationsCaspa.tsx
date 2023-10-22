import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import ReactQuill from "react-quill";
import Select from 'react-select'
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';

const options = [
    {value: 'Verified', label: 'Verified'},
    {value: 'Completed', label: 'Completed'},
    {value: 'Submitted', label: 'Submitted'},
]

export default function ApplicationsCaspa({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

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
                    school_caspa_application_deadline_date: '',
                    school_caspa_application_deadline_type: '',
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_date: null,
                    school_caspa_application_deadline_type: null,
                }
            })
        }
    }, [newSchool.school_application_submitted_on_caspa.input])

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                input: e.target.checked,
            }
        })
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

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Application Submitted On Caspa</label>  
                <div className='w-full mt-2 mb-4'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_application_submitted_on_caspa.input? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_application_submitted_on_caspa.input ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_application_submitted_on_caspa.input && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                        <input onChange={handleInput} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date!} type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[58px] text-lg rounded-lg' />  
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline Type</label> 
                        <Select onChange={handleSelect} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type} : null} options={options} className="w-1/3 focus:outline-none"/>
                    </div> 
                </>
            )}
            <div className={`${newSchool.school_application_submitted_on_caspa.input ? 'mx-5 mb-5' : 'mx-0 mb-0'}`}>
            {newSchool.school_application_submitted_on_caspa.input && <label className='font-medium text-xl inline-block mt-8'>Notes:</label>}
            <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes && (
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.map((note, i) => (
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