import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";
import { BiDollar } from 'react-icons/bi';
import { UserObject } from "../../../../types/users.types";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import { LuUndo2 } from "react-icons/lu";
import { GoLink } from "react-icons/go";
import LinkPopup from "../../LinkPopup";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";

export default function Tuition({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

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

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInput;
        if (e.target.value === '') {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.value,
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
                    [name]: {
                        ...field,
                        input: value,
                    }
                })
            }
        }
        
        
    };

    // const handleQuill = (e:any) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_tuition_general_note: e,
    //     })
    // };

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
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
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
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

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">In-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_in_state_tuition.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_in_state_tuition.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                {loggedInUser.permissions.canVerify ? (
                    <>
                    {newSchool.edited_school_in_state_tuition.input ? (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className="grow focus:outline-none border-none" value={newSchool.edited_school_in_state_tuition.input ? newSchool.edited_school_in_state_tuition.input : ''} name='edited_school_in_state_tuition' />
                        </div>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_in_state_tuition.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_in_state_tuition.input ? newSchool.school_in_state_tuition.input : ''} name='school_in_state_tuition' />
                        </div>
                    </div>
                    ) : (
                    <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                        <BiDollar className='h-5 w-5 text-[#717171]'/>
                        <input className="grow focus:outline-none border-none" value={newSchool.school_in_state_tuition.input ? newSchool.school_in_state_tuition.input : ''} name='school_in_state_tuition' onChange={handleInput}/>
                    </div>
                    )}
                    </>
                ) : (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        {(newSchool.edited_school_in_state_tuition.input || newSchool.edited_school_in_state_tuition.isEditMode) && <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled={newSchool.edited_school_in_state_tuition.isEditMode ? false : true} className="grow focus:outline-none border-none" value={newSchool.edited_school_in_state_tuition.input ? newSchool.edited_school_in_state_tuition.input : ''} name='edited_school_in_state_tuition' onChange={handleInput}/>
                        </div>}
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_in_state_tuition.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_in_state_tuition.input ? newSchool.school_in_state_tuition.input : ''} name='school_in_state_tuition'/>
                        </div>
                    </div>
                )}
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_in_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_in_state_tuition.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_in_state_tuition.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_in_state_tuition.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_in_state_tuition')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_in_state_tuition')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex justify-start items-start gap-2'>
                    {!loggedInUser.permissions.canVerify ? (
                    <>
                        {!newSchool.edited_school_in_state_tuition.isEditMode && <button name='school_in_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                        {newSchool.edited_school_in_state_tuition.isEditMode && <button name='school_in_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={newSchool.edited_school_in_state_tuition.input}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                        {newSchool.edited_school_in_state_tuition.isEditMode && <button name='school_in_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        {(!newSchool.edited_school_in_state_tuition.isEditMode && newSchool.edited_school_in_state_tuition.input) ? (<button name='school_in_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                    </>
                    ) : (
                    <>
                        {newSchool.edited_school_in_state_tuition.input ? <button name='school_in_state_tuition' value={newSchool.edited_school_in_state_tuition.input} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, 'school_in_state_tuition')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button> : null}
                        {newSchool.edited_school_in_state_tuition.input ? <button name='school_in_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button> : null} 
                    </>
                    )}
                </div>
                {!loggedInUser.permissions.canVerify && (
                    <>
                    {!newSchool.edited_school_in_state_tuition.link && newSchool.edited_school_in_state_tuition.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_in_state_tuition'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                    {newSchool.edited_school_in_state_tuition.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_in_state_tuition.link, name: 'edited_school_in_state_tuition'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                </>
                )}
                {loggedInUser.permissions.canVerify && newSchool.edited_school_in_state_tuition.link && <a href={newSchool.edited_school_in_state_tuition.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
            </div>}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Out-of-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_out_of_state_tuition.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_out_of_state_tuition.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                {loggedInUser.permissions.canVerify ? (
                    <>
                    {newSchool.edited_school_out_of_state_tuition.input ? (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                                <BiDollar className='h-5 w-5 text-[#717171]'/>
                                <input disabled className="grow focus:outline-none border-none" value={newSchool.edited_school_out_of_state_tuition.input ? newSchool.edited_school_out_of_state_tuition.input : ''} name='edited_school_out_of_state_tuition'/>
                        </div>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_out_of_state_tuition.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_out_of_state_tuition.input ? newSchool.school_out_of_state_tuition.input : ''} name='school_out_of_state_tuition'/>
                        </div>
                    </div>
                    ) : (
                    <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                        <BiDollar className='h-5 w-5 text-[#717171]'/>
                        <input className="grow focus:outline-none border-none" value={newSchool.school_out_of_state_tuition.input ? newSchool.school_out_of_state_tuition.input : ''} name='school_out_of_state_tuition' onChange={handleInput}/>
                    </div>
                    )}
                    </>
                ) : (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        {(newSchool.edited_school_out_of_state_tuition.input || newSchool.edited_school_out_of_state_tuition.isEditMode) && <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                                <BiDollar className='h-5 w-5 text-[#717171]'/>
                                <input disabled className="grow focus:outline-none border-none" value={newSchool.edited_school_out_of_state_tuition.input ? newSchool.edited_school_out_of_state_tuition.input : ''} name='edited_school_out_of_state_tuition' onChange={handleInput}/>
                        </div>}
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_out_of_state_tuition.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_out_of_state_tuition.input ? newSchool.school_out_of_state_tuition.input : ''} name='school_out_of_state_tuition'/>
                        </div>
                    </div>
                )}
                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_out_of_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_out_of_state_tuition.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_out_of_state_tuition.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_out_of_state_tuition.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_out_of_state_tuition')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_out_of_state_tuition')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex justify-start items-start gap-2'>
                    {!loggedInUser.permissions.canVerify ? (
                    <>
                        {!newSchool.edited_school_out_of_state_tuition.isEditMode && <button name='school_out_of_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                        {newSchool.edited_school_out_of_state_tuition.isEditMode && <button name='school_out_of_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={newSchool.edited_school_out_of_state_tuition.input}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                        {newSchool.edited_school_out_of_state_tuition.isEditMode && <button name='school_out_of_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        {(!newSchool.edited_school_out_of_state_tuition.isEditMode && newSchool.edited_school_out_of_state_tuition.input) ? (<button name='school_out_of_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                    </>
                    ) : (
                    <>
                        {newSchool.edited_school_out_of_state_tuition.input ? <button name='school_out_of_state_tuition' value={newSchool.edited_school_out_of_state_tuition.input} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, 'school_out_of_state_tuition')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button> : null}
                        {newSchool.edited_school_out_of_state_tuition.input ? <button name='school_out_of_state_tuition' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button> : null} 
                    </>
                    )}
                </div>
                {!loggedInUser.permissions.canVerify && (
                    <>
                    {!newSchool.edited_school_out_of_state_tuition.link && newSchool.edited_school_out_of_state_tuition.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_out_of_state_tuition'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                    {newSchool.edited_school_out_of_state_tuition.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_out_of_state_tuition.link, name: 'edited_school_out_of_state_tuition'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                </>
                )}
                {loggedInUser.permissions.canVerify && newSchool.edited_school_out_of_state_tuition.link && <a href={newSchool.edited_school_out_of_state_tuition.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
            </div>}
        </div>


        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (In-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_seat_deposit_in_state.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_in_state.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                {loggedInUser.permissions.canVerify ? (
                    <>
                    {newSchool.edited_school_seat_deposit_in_state.input ? (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className="grow focus:outline-none border-none" value={newSchool.edited_school_seat_deposit_in_state.input ? newSchool.edited_school_seat_deposit_in_state.input : ''} name='edited_school_seat_deposit_in_state' />
                        </div>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_seat_deposit_in_state.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_seat_deposit_in_state.input ? newSchool.school_seat_deposit_in_state.input : ''} name='school_seat_deposit_in_state' />
                        </div>
                    </div>
                    ) : (
                    <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                        <BiDollar className='h-5 w-5 text-[#717171]'/>
                        <input className="grow focus:outline-none border-none" value={newSchool.school_seat_deposit_in_state.input ? newSchool.school_seat_deposit_in_state.input : ''} name='school_seat_deposit_in_state' onChange={handleInput}/>
                    </div>
                    )}
                    </>
                ) : (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        {(newSchool.edited_school_seat_deposit_in_state.input || newSchool.edited_school_seat_deposit_in_state.isEditMode) && <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input className="grow focus:outline-none border-none" value={newSchool.edited_school_seat_deposit_in_state.input ? newSchool.edited_school_seat_deposit_in_state.input : ''} name='edited_school_seat_deposit_in_state' onChange={handleInput}/>
                        </div>}
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_seat_deposit_in_state.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_seat_deposit_in_state.input ? newSchool.school_seat_deposit_in_state.input : ''} name='school_seat_deposit_in_state' />
                        </div>
                    </div>
                )}
                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_seat_deposit_in_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_seat_deposit_in_state.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_seat_deposit_in_state.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_seat_deposit_in_state.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_seat_deposit_in_state')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_seat_deposit_in_state')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex justify-start items-start gap-2'>
                    {!loggedInUser.permissions.canVerify ? (
                    <>
                        {!newSchool.edited_school_seat_deposit_in_state.isEditMode && <button name='school_seat_deposit_in_state' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                        {newSchool.edited_school_seat_deposit_in_state.isEditMode && <button name='school_seat_deposit_in_state' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={newSchool.edited_school_seat_deposit_in_state.input}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                        {newSchool.edited_school_seat_deposit_in_state.isEditMode && <button name='school_seat_deposit_in_state' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        {(!newSchool.edited_school_seat_deposit_in_state.isEditMode && newSchool.edited_school_seat_deposit_in_state.input) ? (<button name='school_seat_deposit_in_state' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                    </>
                    ) : (
                    <>
                        {newSchool.edited_school_seat_deposit_in_state.input ? <button name='school_seat_deposit_in_state' value={newSchool.edited_school_seat_deposit_in_state.input} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, 'school_seat_deposit_in_state')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button> : null}
                        {newSchool.edited_school_seat_deposit_in_state.input ? <button name='school_seat_deposit_in_state' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button> : null} 
                    </>
                    )}
                </div>
                {!loggedInUser.permissions.canVerify && (
                    <>
                    {!newSchool.edited_school_seat_deposit_in_state.link && newSchool.edited_school_seat_deposit_in_state.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_seat_deposit_in_state'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                    {newSchool.edited_school_seat_deposit_in_state.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_seat_deposit_in_state.link, name: 'edited_school_seat_deposit_in_state'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                </>
                )}
                {loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_in_state.link && <a href={newSchool.edited_school_seat_deposit_in_state.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
            </div>}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (Out-of-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_seat_deposit_out_of_state.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_out_of_state.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                {loggedInUser.permissions.canVerify ? (
                    <>
                    {newSchool.edited_school_seat_deposit_out_of_state.input ? (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className="grow focus:outline-none border-none" value={newSchool.edited_school_seat_deposit_out_of_state.input ? newSchool.edited_school_seat_deposit_out_of_state.input : ''} name='edited_school_seat_deposit_out_of_state' />
                        </div>
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_seat_deposit_out_of_state.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_seat_deposit_out_of_state.input ? newSchool.school_seat_deposit_out_of_state.input : ''} name='school_seat_deposit_out_of_state'/>
                        </div>
                    </div>
                    ) : (
                    <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                        <BiDollar className='h-5 w-5 text-[#717171]'/>
                        <input className="grow focus:outline-none border-none" value={newSchool.school_seat_deposit_out_of_state.input ? newSchool.school_seat_deposit_out_of_state.input : ''} name='school_seat_deposit_out_of_state' onChange={handleInput}/>
                    </div>
                    )}
                    </>
                ) : (
                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                        {(newSchool.edited_school_seat_deposit_out_of_state.input || newSchool.edited_school_seat_deposit_out_of_state.isEditMode) && <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input className="grow focus:outline-none border-none" value={newSchool.edited_school_seat_deposit_out_of_state.input ? newSchool.edited_school_seat_deposit_out_of_state.input : ''} name='edited_school_seat_deposit_out_of_state' onChange={handleInput}/>
                        </div>}
                        <div className='flex justify-start items-center gap-1 w-full border border-[#B4B4B4] rounded p-3'>
                            <BiDollar className='h-5 w-5 text-[#717171]'/>
                            <input disabled className={`grow focus:outline-none border-none ${newSchool.edited_school_seat_deposit_out_of_state.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_seat_deposit_out_of_state.input ? newSchool.school_seat_deposit_out_of_state.input : ''} name='school_seat_deposit_out_of_state'/>
                        </div>
                    </div>
                )}
                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_seat_deposit_out_of_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {
                newSchool.school_seat_deposit_out_of_state.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_seat_deposit_out_of_state.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_seat_deposit_out_of_state.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_seat_deposit_out_of_state')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_seat_deposit_out_of_state')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex justify-start items-start gap-2'>
                    {!loggedInUser.permissions.canVerify ? (
                    <>
                        {!newSchool.edited_school_seat_deposit_out_of_state.isEditMode && <button name='school_seat_deposit_out_of_state' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                        {newSchool.edited_school_seat_deposit_out_of_state.isEditMode && <button name='school_seat_deposit_out_of_state' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={newSchool.edited_school_seat_deposit_out_of_state.input}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                        {newSchool.edited_school_seat_deposit_out_of_state.isEditMode && <button name='school_seat_deposit_out_of_state' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        {(!newSchool.edited_school_seat_deposit_out_of_state.isEditMode && newSchool.edited_school_seat_deposit_out_of_state.input) ? (<button name='school_seat_deposit_out_of_state' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                    </>
                    ) : (
                    <>
                        {newSchool.edited_school_seat_deposit_out_of_state.input ? <button name='school_seat_deposit_out_of_state' value={newSchool.edited_school_seat_deposit_out_of_state.input} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, 'school_seat_deposit_out_of_state')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button> : null}
                        {newSchool.edited_school_seat_deposit_out_of_state.input ? <button name='school_seat_deposit_out_of_state' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button> : null} 
                    </>
                    )}
                </div>
                {!loggedInUser.permissions.canVerify && (
                    <>
                    {!newSchool.edited_school_seat_deposit_out_of_state.link && newSchool.edited_school_seat_deposit_out_of_state.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_seat_deposit_out_of_state'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                    {newSchool.edited_school_seat_deposit_out_of_state.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_seat_deposit_out_of_state.link, name: 'edited_school_seat_deposit_out_of_state'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                </>
                )}
                {loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_out_of_state.link && <a href={newSchool.edited_school_seat_deposit_out_of_state.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
            </div>}
        </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}