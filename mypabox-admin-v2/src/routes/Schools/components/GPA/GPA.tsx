import { School, NumberInput, Note } from "../../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import OtherTypesOfGpa from "./OtherTypesOfGpa";
import SpecificCourse from "./SpecificCourse";

import AddNote from "../Prereqs/AddNote";
import PreviousCycleSection from "./PreviousCycleSection";

//*******TO DO*******:
//  Fixed radio input so that option stays highlighted after selected 

const gpaRequired = [
    {
        label: 'Minimum Overall GPA Required:',
        value: 'school_minimum_overall_gpa_required'
    },
    {
        label: 'Minimum Science GPA Required:',
        value: 'school_minimum_science_gpa_required'
    },
    {
        label: 'Minimum Prerequisite GPA Required:',
        value: 'school_minimum_prerequisite_gpa_required'
    }
]

const gpaRecommended = [
    {
        label: 'Minimum Overall GPA Recommended:',
        value: 'school_minimum_overall_gpa_recommended'
    },
    {
        label: 'Minimum Science GPA Recommended:',
        value: 'school_minimum_science_gpa_recommended'
    },
    {
        label: 'Minimum Prerequisite GPA Recommended:',
        value: 'school_minimum_prerequisite_gpa_recommended'
    }
]


export default function GPA({ newSchool, setNewSchool, handleInputChange }: { 
    newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, 
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void, 
}) {

    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

      const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool[name as keyof School] as NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).map((n,i) => {
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
        const field = newSchool[name as keyof School] as NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
    };

    useEffect(() => {
        // Resets inputs if value change to false
        if (!newSchool.school_minimum_gpa_required) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_required: {
                    input: 0,
                    notes: [],
                },
                school_minimum_science_gpa_required: {
                    input: 0,
                    notes: []
                },
                school_minimum_prerequisite_gpa_required: {
                    input: 0,
                    notes: []
                }
            })
        }

        if (!newSchool.school_minimum_gpa_recommended) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_recommended: {
                    input: 0,
                    notes: [],
                },
                school_minimum_science_gpa_recommended: {
                    input: 0,
                    notes: []
                },
                school_minimum_prerequisite_gpa_recommended: {
                    input: 0,
                    notes: []
                }
            })
        }
    }, [newSchool.school_minimum_gpa_required, newSchool.school_minimum_gpa_recommended])

    
    // Handles boolean inputs 
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        setNewSchool({
            ...newSchool,
            [name]: e.target.checked,
        })
    }

    const handleQuill = (e: any) => {
        setNewSchool({
            ...newSchool,
            school_gpa_general_note: e
        })
    }


    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" name='school_minimum_gpa_required' onChange={handleCheck} />
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">
                            {newSchool.school_minimum_gpa_required ? 'True' : 'False'}
                            </span>
                        </label>
                    </div>
                    {newSchool.school_minimum_gpa_required && (
                    <>
                        {gpaRequired.map((gpa,i) => (
                        <>
                            <div className={`max-w-[900px] mt-5 mx-5 ${i === gpaRequired.length - 1 ? 'mb-5' : 'mb-0'}`}>
                                <label className='text-xl'>{gpa.label}</label>
                                <div className='flex justify-start items-center gap-4 mt-3'>
                                    <input className='grow focus:outline-none border border-[#B4B4B4] p-4 rounded' value={(newSchool[gpa.value as keyof School] as NumberInput).input ? (newSchool[gpa.value as keyof School] as NumberInput).input : ''} name={gpa.value} onChange={handleInputChange} />
                                    <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]">
                                        Add Note
                                    </button>
                                </div>
                            </div>
                            {(newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                                <div className='flex justify-center items-start gap-2 mt-4'>
                                    <div className="grow p-4 rounded-md border border-black">
                                        <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                            {note.type}:
                                        </p>
                                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                    </div>
                                    <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(gpa.value)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                        <button onClick={(e) => deleteNote(e, i, gpa.value)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                                    </div>
                                </div>
                            ))}
                        </>
                        ))}
                    </>
                    )}
            </div>

            <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA Recommended</label>   
            <div className='w-full mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name='school_minimum_gpa_recommended' onChange={handleCheck} />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">
                    {newSchool.school_minimum_gpa_recommended ? 'True' : 'False'}
                    </span>
                </label>
            </div>
            {newSchool.school_minimum_gpa_recommended && (
            <>
                {gpaRecommended.map((gpa,i) => (
                <>
                    <div className={`max-w-[900px] mt-5 mx-5 ${i === gpaRecommended.length - 1 ? 'mb-5' : 'mb-0'}`}>
                        <label className='text-xl'>{gpa.label}</label>
                        <div className='flex justify-start items-center gap-4 mt-3'>
                            <input className='grow focus:outline-none border border-[#B4B4B4] p-4 rounded' value={(newSchool[gpa.value as keyof School] as NumberInput).input ? (newSchool[gpa.value as keyof School] as NumberInput).input : ''} name={gpa.value} onChange={handleInputChange} />
                            <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                    </div>
                    {(newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                        <div className='flex justify-center items-start gap-2 mt-4'>
                            <div className="grow p-4 rounded-md border border-black">
                                <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                            <div className='flex flex-col-reverse justify-start items-center gap-1'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(gpa.value)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                                <button onClick={(e) => deleteNote(e, i, gpa.value)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                            </div>
                        </div>
                    ))}
                </>
                ))}
            </>
            )}
        </div>

        <OtherTypesOfGpa newSchool={newSchool} setNewSchool={setNewSchool}/>

        <SpecificCourse newSchool={newSchool} setNewSchool={setNewSchool}/>

        <PreviousCycleSection newSchool={newSchool} setNewSchool={setNewSchool} />
        
        <div className={`mt-28 text-xl w-full`}>
                <p>GPA General Notes</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_gpa_general_note} 
                onChange={handleQuill}/>
        </div>
        </>
        )}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}

        </>
    )
}