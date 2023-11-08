import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { School, Note, OtherTypesOfGpaEvaluted } from "../../../../types/schools.types";
import { MouseEvent, ChangeEvent, SetStateAction, Dispatch, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import AddNote from "../Prereqs/AddNote";

const typeOfGpa = [
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' }
]

const otherGpaDefault = {
    gpa_value_required_or_recommended: "required",
    minimum_gpa_value_needed: 0,
    minimum_number_of_credits_evaluated: 0,
    type_of_gpa_evaluated: "",
    notes: [],
}

export default function OtherTypesOfGpa({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [index, setIndex] = useState<number | null>(null);
    const [objIndex, setObjIndex] = useState(0)
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    const addField = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedField = newSchool.school_other_types_of_gpa_evaluated.concat(otherGpaDefault);
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: updatedField,
        })
    }

    // Deletes specific field from objects 
    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const updatedField = newSchool.school_other_types_of_gpa_evaluated.filter((field, i)=> i !== index);
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: updatedField,
        })
    }

    const handleSelect = (e: any, name: string, index: number) => {
        const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
        const updatedObj = {
            ...objToBeUpdated,
            [name]: e.value,
        }
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })
    };

    const handleObjInput = (e: ChangeEvent<HTMLInputElement>, index: number, name: string) => {
        const value = e.target.value;
        const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;

        const updatedObj = {
            ...objToBeUpdated,
            [name]: value,
        }
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })

    };

    const addNote = (note: Note) => {
        const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

        const currentField = newSchool.school_other_types_of_gpa_evaluated
            const updatedObj = { ...obj, notes: obj.notes.concat(note) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: updatedField,
            })
            
        }

    const updateNote = (note: Note) => {
        const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

        const currentField = newSchool.school_other_types_of_gpa_evaluated
            const updatedObj = { ...obj, notes: obj.notes.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            }) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: updatedField,
            })
            
    };

    const deleteNote = (e: any, objIndex: number, index: number) => {
        const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

        const currentField = newSchool.school_other_types_of_gpa_evaluated
            const updatedObj = { ...obj, notes: obj.notes.filter((n,i) => i !== index) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: updatedField,
            })
            
    }


    return (
        <>
        {newSchool.school_other_types_of_gpa_evaluated.map((field, i) => (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border-2 py-3 px-8 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Other Types of GPA Evaluated <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label> 
            
            <>
                <div className={`w-full mt-4`}>
                    <div className='flex justify-between items-center mb-3'>
                        <label className='text-xl'>Type of GPA Evaluated</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <div className='flex justify-center items-start gap-1 w-full'>
                        <CreatableSelect options={typeOfGpa} 
                        value={field.type_of_gpa_evaluated ? {value: field.type_of_gpa_evaluated, label: field.type_of_gpa_evaluated} : null } 
                        className="grow focus:outline-none rounded" 
                        onChange={(e) => handleSelect(e, 'type_of_gpa_evaluated', i)}/>
                        <Tooltip title="Type and press enter to create new option" placement='right'>
                                <IconButton style={{padding: '0px'}}>
                                    <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>GPA Required or Recommended:</label>
                    <div className='flex justify-start items-center mt-3 gap-10 ml-3'>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='required' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'required' ? true : false}/>
                            <span className='text-xl'>Required</span>
                        </div>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='recommended' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'recommended' ? true : false}/>
                            <span className='text-xl'>Recommended</span>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Valued Needed:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'minimum_gpa_value_needed')} className='w-32 focus:outline-none border border-[#B4B4B4] p-3 rounded mt-3 block' value={field.minimum_gpa_value_needed ? field.minimum_gpa_value_needed : ''} name='minimum_gpa_value_needed'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum Number of Credits Evaluated:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'minimum_number_of_credits_evaluated')} className='w-32 focus:outline-none border border-[#B4B4B4] p-3 rounded mt-3 block' value={field.minimum_number_of_credits_evaluated ? field.minimum_number_of_credits_evaluated : ''} name='minimum_number_of_credits_evaluated' />
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button onClick={(e) => {toggleNotePopup(e); setObjIndex(i)}} value='school_other_types_of_gpa_evaluated' name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block">
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map((note, index) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full mt-3'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setObjIndex(i); setIndex(index)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, index)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
            </>
            {i === newSchool.school_other_types_of_gpa_evaluated.length-1 && (
            <button className="mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={addField}>
                + Add New Field
            </button>
            )}
        </div>
        ))}  
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>

    )
}