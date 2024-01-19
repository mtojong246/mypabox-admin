import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import { UserObject } from "../../../../types/users.types";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";

import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import LinkPopup from "../../LinkPopup";

import { enableEditModeBool, confirmEditBool, revertEditBool, undoEditBool } from "../GeneralInfo/GeneralInfoFunctions";

export default function InternationalStudents({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_international_students_accepted: {
                    ...newSchool.school_international_students_accepted,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_international_students_accepted: {
                    ...newSchool.edited_school_international_students_accepted,
                    input: e.target.checked,
                }
            })
        }
        
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

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        const linkName = `edited_${linkObj.name}`
        setNewSchool({
            ...newSchool,
            [linkName]: {
                ...newSchool[linkName as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }


    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_international_students_accepted.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_international_students_accepted.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">International Students Accepted<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_international_students_accepted.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_international_students_accepted.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_international_students_accepted.input} isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} originalInput={newSchool.school_international_students_accepted.input}
                    name='school_international_students_accepted' handleCheck={handleCheck}
                    />
                    {/* <div className='mt-2 grow'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} checked={newSchool.school_international_students_accepted.input ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_international_students_accepted.input ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
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
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                </div>
                )}
            </div>
            <EditButtons loggedInUser={loggedInUser} input={newSchool.edited_school_international_students_accepted.input} isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} link={newSchool.edited_school_international_students_accepted.link} 
            name='school_international_students_accepted' toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
            />
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}