import { School, Note } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import ReactQuill from "react-quill";
import CreatableSelect from 'react-select/creatable';
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';

const options = [
    {value: 'CPR', label: 'CPR'},
    {value: 'BLS', label: 'BLS'},
    {value: 'ACLS', label: 'ACLS'},
]

export default function Certifications({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ certification, setCertification ] = useState('');

    useEffect(() => {
        if (newSchool.school_certifications_required.input) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options ? newSchool.school_certifications_required.school_certifications_required_options : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: null,
                }
            })
        }
    }, [newSchool.school_certifications_required.input])

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    };

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                input: e.target.checked,
            }
        })
    }

    const addCertification = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newSchool.school_certifications_required.school_certifications_required_options?.includes(certification)) return;
        if (!certification) return;
        setNewSchool({
            ...newSchool,
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.concat(certification)
            }
        })
    };

    const deleteCertification = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.filter((c,i) => i !== index)
            }
        })
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                school_certification_notes: newSchool.school_certifications_required.school_certification_notes.concat(note)
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                school_certification_notes: newSchool.school_certifications_required.school_certification_notes.map((n,i) => {
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
            school_certifications_required: {
                ...newSchool.school_certifications_required,
                school_certification_notes: newSchool.school_certifications_required.school_certification_notes.filter((n,i) => i !== index)
            }
        })
    }

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Certifications Required</label>  
            <div className='w-full mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={handleCheck} checked={newSchool.school_certifications_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_certifications_required.input ? 'True' : 'False'}</span>
                </label>
            </div>
            {newSchool.school_certifications_required.input && (
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Certifications</label> 
                    <div className='flex justify-start items-center gap-3'>
                        <CreatableSelect options={options} onChange={(e:any) => setCertification(e.value)} className="grow focus:outline-none"/> 
                        <button onClick={addCertification} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                            Add Certification
                        </button>
                    </div>
                    {newSchool.school_certifications_required.school_certifications_required_options && (
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_certifications_required.school_certifications_required_options && newSchool.school_certifications_required.school_certifications_required_options!.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_certifications_required.school_certifications_required_options && newSchool.school_certifications_required.school_certifications_required_options!.map((opt, i) => {
                            return (
                                <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='font-medium'>{opt}</p>
                                        <button onClick={(e) => deleteCertification(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        )}
                </div> 
            )}
            {newSchool.school_certifications_required.input && (
            <div className={`${newSchool.school_certifications_required.input ? 'mx-5 mb-5' : 'mx-0 mb-0'}`}>
            <label className='font-medium text-xl inline-block mt-8'>Notes:</label>
            <button onClick={toggleNotePopup} className="mt-2 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_certifications_required.school_certification_notes && (
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_certifications_required.school_certification_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_certifications_required.school_certification_notes.map((note, i) => (
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
        </>
    )
}