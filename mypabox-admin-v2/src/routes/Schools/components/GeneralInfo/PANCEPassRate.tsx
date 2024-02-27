import { ChangeEvent, Dispatch, SetStateAction, useState, KeyboardEvent, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import AddNoteFields from "../../Assets/AddNoteFields";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";

export default function PANCEPassRate({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

    const [firstSelected, setFirstSelected] = useState('');
    const [fiveSelected, setFiveSelected] = useState('');

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
        const field = newSchool[name] as StringInput | NumberInput;
        let value = e.target.value;
        if (e.target.value.includes('%')) {
            value = e.target.value.replace('%', '')
        }
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: value + '%',
                }
            })
        
    };

    const keyDownFirst = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (firstSelected) {
                setNewSchool({
                    ...newSchool,
                    school_first_time_pass_rate: {
                        ...newSchool.school_first_time_pass_rate,
                        input: newSchool.school_first_time_pass_rate.input.replace(firstSelected, '')
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_first_time_pass_rate: {
                        ...newSchool.school_first_time_pass_rate,
                        input: newSchool.school_first_time_pass_rate.input.replace('%', '')
                    }
                })
            }
            setFirstSelected('')
        }
    }

    const keyDownFive = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (fiveSelected) {
                setNewSchool({
                    ...newSchool,
                    school_average_five_year_first_time_pass_rate: {
                        ...newSchool.school_average_five_year_first_time_pass_rate,
                        input: newSchool.school_average_five_year_first_time_pass_rate.input.replace(fiveSelected, '')
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_average_five_year_first_time_pass_rate: {
                        ...newSchool.school_average_five_year_first_time_pass_rate,
                        input: newSchool.school_average_five_year_first_time_pass_rate.input.replace('%', '')
                    }
                })
            }
            setFiveSelected('')
        }
    }

    const mouseUp = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedValue = selection.toString();
            setFirstSelected(selectedValue)
        }
    }

    const mouseUp2 = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedValue = selection.toString();
            setFiveSelected(selectedValue)
        }
    }



    // const addPercentage = (e:any) => {
    //     const name = e.target.name as keyof School;
    //     const field = newSchool[name] as StringInput | NumberInput;
    //     if ((e.target.value as string) === '') return;
    //     if ((e.target.value as string).includes('%')) {
    //         (e.target.value as string).slice(0,-1);
    //     } else {
    //         e.target.value += '%'
    //     } 
    // }


    

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_pance_pass_rate_note: e,
        })
    };

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else {
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
        if (loggedInUser.permissions.canAddOrDelete) {
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
        } else {
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
        if (loggedInUser.permissions.canAddOrDelete) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else {
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
        <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`} onMouseUp={mouseUp}>
        {((loggedInUser.permissions.canVerify && newSchool.edited_school_first_time_pass_rate.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_first_time_pass_rate.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
        <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">First Time Pass Rate<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_first_time_pass_rate.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_first_time_pass_rate.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {newSchool.edited_school_first_time_pass_rate.input ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <input disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.edited_school_first_time_pass_rate.input} name='edited_school_first_time_pass_rate' onKeyDown={keyDownFirst} />
                            <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${newSchool.edited_school_first_time_pass_rate.input ? 'line-through' : 'no-underline'}`}
                            value={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' onKeyDown={keyDownFirst} />
                        </div>
                        ) : (
                            <input className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' onChange={handleInput} onKeyDown={keyDownFirst} />
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(newSchool.edited_school_first_time_pass_rate.input || newSchool.edited_school_first_time_pass_rate.isEditMode) && <input disabled={newSchool.edited_school_first_time_pass_rate.isEditMode ? false : true} onChange={handleInput} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.edited_school_first_time_pass_rate.input ? newSchool.edited_school_first_time_pass_rate.input : ''} name='edited_school_first_time_pass_rate' onKeyDown={keyDownFirst} />}
                            {(!newSchool.edited_school_first_time_pass_rate.isEditMode || (newSchool.edited_school_first_time_pass_rate.isEditMode && (newSchool.edited_school_first_time_pass_rate.input !== newSchool.school_first_time_pass_rate.input))) && <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${newSchool.edited_school_first_time_pass_rate.input ? 'line-through' : 'no-underline'}`}
                            value={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' onKeyDown={keyDownFirst} />}
                        </div>
                    )}
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
                newSchool.school_first_time_pass_rate.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_first_time_pass_rate.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_first_time_pass_rate.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_first_time_pass_rate')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_first_time_pass_rate')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} notes={newSchool.edited_school_first_time_pass_rate.notes} originalNotes={newSchool.school_first_time_pass_rate.notes} name='school_first_time_pass_rate' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} input={newSchool.edited_school_first_time_pass_rate.input} link={newSchool.edited_school_first_time_pass_rate.link} 
                   setLinkObj={setLinkObj} name='school_first_time_pass_rate' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`} onMouseUp={mouseUp2}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_average_five_year_first_time_pass_rate.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Five Year Average First-Time Pass Rate<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_average_five_year_first_time_pass_rate.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_average_five_year_first_time_pass_rate.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className='flex justify-center items-start gap-3'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {newSchool.edited_school_average_five_year_first_time_pass_rate.input ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <input disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.edited_school_average_five_year_first_time_pass_rate.input ? newSchool.edited_school_average_five_year_first_time_pass_rate.input : ''} name='edited_school_average_five_year_first_time_pass_rate'  onKeyDown={keyDownFive} />
                            <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${newSchool.edited_school_average_five_year_first_time_pass_rate.input ? 'line-through' : 'no-underline'}`} 
                            value={newSchool.school_average_five_year_first_time_pass_rate.input ? newSchool.school_average_five_year_first_time_pass_rate.input : ''} name='school_average_five_year_first_time_pass_rate' onKeyDown={keyDownFive} />
                        </div>
                        ) : (
                            <input className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.school_average_five_year_first_time_pass_rate.input ? newSchool.school_average_five_year_first_time_pass_rate.input : ''} name='school_average_five_year_first_time_pass_rate' onChange={handleInput} onKeyDown={keyDownFive} />
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(newSchool.edited_school_average_five_year_first_time_pass_rate.input || newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode) && <input disabled={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" 
                            value={newSchool.edited_school_average_five_year_first_time_pass_rate.input ? newSchool.edited_school_average_five_year_first_time_pass_rate.input : ''} name='edited_school_average_five_year_first_time_pass_rate' onChange={handleInput}  onKeyDown={keyDownFive} />}
                            {(!newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode || (newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode && (newSchool.edited_school_average_five_year_first_time_pass_rate.input !== newSchool.school_average_five_year_first_time_pass_rate.input))) && <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${newSchool.edited_school_average_five_year_first_time_pass_rate.input ? 'line-through' : 'no-underline'}`} 
                            value={newSchool.school_average_five_year_first_time_pass_rate.input ? newSchool.school_average_five_year_first_time_pass_rate.input : ''} name='school_average_five_year_first_time_pass_rate' onKeyDown={keyDownFive} />}
                        </div>
                    )}
                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_average_five_year_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                {/* {
                newSchool.school_average_five_year_first_time_pass_rate.notes ? (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_average_five_year_first_time_pass_rate.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_average_five_year_first_time_pass_rate.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_average_five_year_first_time_pass_rate')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e:any) => {deleteNote(e, i, 'school_average_five_year_first_time_pass_rate')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} notes={newSchool.edited_school_average_five_year_first_time_pass_rate.notes} originalNotes={newSchool.school_average_five_year_first_time_pass_rate.notes} name='school_average_five_year_first_time_pass_rate' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} input={newSchool.edited_school_average_five_year_first_time_pass_rate.input} link={newSchool.edited_school_average_five_year_first_time_pass_rate.link} 
                   setLinkObj={setLinkObj} name='school_average_five_year_first_time_pass_rate' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>

            <div className={`mt-28 text-xl w-full`}>
                <p>PANCE Pass Rate Notes</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_pance_pass_rate_note} 
                onChange={handleQuill}/>
            </div>

            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}