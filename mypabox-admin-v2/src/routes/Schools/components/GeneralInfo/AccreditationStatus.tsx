import { Dispatch, SetStateAction, useState } from "react";
import { School, Note} from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import Select from 'react-select';
import AddNote from "../Prereqs/AddNote";

export interface Option {
    label: string;
    value: string;
    target: {
        name: string;
        type: string;
        value: string;
    }
}

export const options: Option[] = [
    { label: 'Provisional', value: 'Provisional', target: {name: "school_accreditation_status", type: 'text', value: 'Provisional' }},
    { label: 'Continued', value: 'Continued', target: {name: "school_accreditation_status", type: 'text', value: 'Continued' }},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Clinical Postgraduate Program' }},
    { label: 'Probation', value: 'Probation', target: {name: "school_accreditation_status", type: 'text', value: 'Probation' }},
    { label: 'Administrative Probation', value: 'Administrative Probation', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Administrative Probation' }},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withheld' }},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withdrawn' }},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Voluntary Inactive Status' }},
  ]

export default function AccreditationStatus({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    //   const handleQuill = (e:any) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_acceditation_status_general_note: e,
    //     })
    // };

    const handleSelect = (e: any) => {
        setNewSchool({
            ...newSchool,
            school_accreditation_status: {
                ...newSchool.school_accreditation_status,
                input: e.value,
            }
        })
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_accreditation_status: {
                ...newSchool.school_accreditation_status,
                notes: newSchool.school_accreditation_status.notes.concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_accreditation_status: {
                ...newSchool.school_accreditation_status,
                notes: newSchool.school_accreditation_status.notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_accreditation_status: {
                ...newSchool.school_accreditation_status,
                notes: newSchool.school_accreditation_status.notes.filter((n,i) => i !== index)
            }
        })
    };

    return (
        <>
        <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Accreditation Status</label>
                <div className='flex justify-center items-center gap-3'>
                    <Select className="grow focus:outline-none rounded"
                    options={options} onChange={handleSelect} value={newSchool.school_accreditation_status.input ? {value: newSchool.school_accreditation_status.input, label: newSchool.school_accreditation_status.input} : null}/>
                    <button onClick={(e:any) => {toggleNotePopup(e)}} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_accreditation_status.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_accreditation_status.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_accreditation_status.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_accreditation_status')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                }
            </div>

            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}