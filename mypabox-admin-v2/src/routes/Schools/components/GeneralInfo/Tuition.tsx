import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import AddNoteFields from "../../Assets/AddNoteFields";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";

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

    const handleInput = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        let name = '';
        let field = null;
        if (!isEditedInput) {
            name = e.target.name as keyof School;
            field = newSchool[name as keyof School] as StringInput;
        } else {
            name = `edited_${e.target.name}` as keyof School;
            field = newSchool[name as keyof School] as object;
        }
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
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        }
        
    };


    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
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
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
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
        }
        
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        }
        
    };

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
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_in_state_tuition.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_in_state_tuition.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">In-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_in_state_tuition.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_in_state_tuition.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_in_state_tuition.input} isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} originalInput={newSchool.school_in_state_tuition.input} name='school_in_state_tuition' category="school_in_state_tuition" isMoney={true} handleInput={handleInput}/>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_in_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
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
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} notes={newSchool.edited_school_in_state_tuition.notes} originalNotes={newSchool.school_in_state_tuition.notes} name='school_in_state_tuition' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_in_state_tuition.isEditMode} input={newSchool.edited_school_in_state_tuition.input} link={newSchool.edited_school_in_state_tuition.link} 
                setLinkObj={setLinkObj} name='school_in_state_tuition' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_out_of_state_tuition.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_out_of_state_tuition.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Out-of-State Tuition<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_out_of_state_tuition.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_out_of_state_tuition.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_out_of_state_tuition.input} isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} originalInput={newSchool.school_out_of_state_tuition.input} name='school_out_of_state_tuition' category="school_out_of_state_tuition" isMoney={true} handleInput={handleInput}/>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_out_of_state_tuition')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
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
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} notes={newSchool.edited_school_out_of_state_tuition.notes} originalNotes={newSchool.school_out_of_state_tuition.notes} name='school_out_of_state_tuition' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_out_of_state_tuition.isEditMode} input={newSchool.edited_school_out_of_state_tuition.input} link={newSchool.edited_school_out_of_state_tuition.link} 
                setLinkObj={setLinkObj} name='school_out_of_state_tuition' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>


        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_in_state.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_seat_deposit_in_state.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (In-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_in_state.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_in_state.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_seat_deposit_in_state.input} isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} originalInput={newSchool.school_seat_deposit_in_state.input} name='school_seat_deposit_in_state' category="school_seat_deposit_in_state" isMoney={true} handleInput={handleInput}/>    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_seat_deposit_in_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
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
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} notes={newSchool.edited_school_seat_deposit_in_state.notes} originalNotes={newSchool.school_seat_deposit_in_state.notes} name='school_seat_deposit_in_state' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_in_state.isEditMode} input={newSchool.edited_school_seat_deposit_in_state.input} link={newSchool.edited_school_seat_deposit_in_state.link} 
                   setLinkObj={setLinkObj} name='school_seat_deposit_in_state' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
        </div>

        <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_seat_deposit_out_of_state.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_seat_deposit_out_of_state.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Seat Deposit (Out-of-State)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_out_of_state.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_seat_deposit_out_of_state.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_seat_deposit_out_of_state.input} isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} originalInput={newSchool.school_seat_deposit_out_of_state.input} name='school_seat_deposit_out_of_state' category="school_seat_deposit_out_of_state" isMoney={true} handleInput={handleInput}/>                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_seat_deposit_out_of_state')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
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
                                <button  onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_seat_deposit_out_of_state')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_seat_deposit_out_of_state')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} notes={newSchool.edited_school_seat_deposit_out_of_state.notes} originalNotes={newSchool.school_seat_deposit_out_of_state.notes} name='school_seat_deposit_out_of_state' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_seat_deposit_out_of_state.isEditMode} input={newSchool.edited_school_seat_deposit_out_of_state.input} link={newSchool.edited_school_seat_deposit_out_of_state.link} 
                   setLinkObj={setLinkObj} name='school_seat_deposit_out_of_state' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
        </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}