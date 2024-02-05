import { Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note} from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import Select from 'react-select';
import AddNote from "../Prereqs/AddNote";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit} from "./GeneralInfoFunctions";
import { UserObject } from "../../../../types/users.types";


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

export default function AccreditationStatus({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

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

    const handleSelect = (e: any, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_accreditation_status: {
                    ...newSchool.school_accreditation_status,
                    input: e.value,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_accreditation_status: {
                    ...newSchool.edited_school_accreditation_status,
                    input: e.value,
                }
            })
        }
        
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

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            [linkObj.name]: {
                ...newSchool[linkObj.name as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }

    const name = 'edited_school_accreditation_status';
    const original = 'school_accreditation_status'
    const field = newSchool.edited_school_accreditation_status;
    const originalField = newSchool.school_accreditation_status;

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && field.input !== null) || (!loggedInUser.permissions.canVerify && !field.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Accreditation Status<PiCheckCircle className={`h-5 w-5 ml-[2px] ${field.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                {loggedInUser.permissions.canVerify ? (
                    <>
                    {field.input ? (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        <Select isDisabled className="w-full focus:outline-none rounded"
                        options={options} value={field.input ? {value: field.input, label: field.input} : null}/>
                        <Select isDisabled className={`w-full focus:outline-none rounded ${field.input ? 'line-through' : 'no-underline'}`}
                        options={options} value={newSchool.school_accreditation_status.input ? {value: newSchool.school_accreditation_status.input, label: newSchool.school_accreditation_status.input} : null}/>
                    </div>
                    ) : (
                    <Select className="grow focus:outline-none rounded"
                    options={options} onChange={(e:any) => handleSelect(e, false)} value={newSchool.school_accreditation_status.input ? {value: newSchool.school_accreditation_status.input, label: newSchool.school_accreditation_status.input} : null}/>
                    )}
                    </>
                ) : (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        {(field.input || field.isEditMode) && <Select isDisabled={field.isEditMode ? false : true} onChange={(e:any) => handleSelect(e, true)} className="w-full focus:outline-none rounded"
                        options={options} value={field.input ? {value: field.input, label: field.input} : null}/>}
                        {(!field.isEditMode || (field.isEditMode && (field.input !== originalField.input))) && <Select isDisabled className={`w-full focus:outline-none rounded ${field.input ? 'line-through' : 'no-underline'}`}
                        options={options} value={newSchool.school_accreditation_status.input ? {value: newSchool.school_accreditation_status.input, label: newSchool.school_accreditation_status.input} : null}/>}
                    </div>
                )}
                    
                    <button onClick={(e:any) => {toggleNotePopup(e)}} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
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
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_accreditation_status')}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={field.isEditMode} input={field.input} link={field.link} 
                   setLinkObj={setLinkObj} name={original} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}