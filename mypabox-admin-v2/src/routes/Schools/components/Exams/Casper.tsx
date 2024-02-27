import { School, Note } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, ChangeEvent, useState, useEffect, MouseEvent } from "react"
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import AddNoteFields from "../../Assets/AddNoteFields";

export default function Casper({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);

    const [ hasBeenEdited, setHasBeenEdited ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    useEffect(() => {
        if (newSchool.edited_school_casper.edited_school_casper_recommended.isEditMode || newSchool.edited_school_casper.edited_school_casper_required.isEditMode) {
            setHasBeenEdited(true);
        } else {
            setHasBeenEdited(false);
        }
    }, [newSchool.edited_school_casper])

    useEffect(() => {
        if (newSchool.edited_school_casper.input !== null) {
            setHasInputs(true);
        } else {
            setHasInputs(null);
        }
    }, [newSchool.edited_school_casper.input])

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof object;
            const field = newSchool.edited_school_casper[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean};
            setNewSchool({
                ...newSchool,
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    [name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    school_casper_exam_notes: newSchool.school_casper.school_casper_exam_notes.concat(note)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    notes: newSchool.edited_school_casper.notes!.concat(note)
                }
            })
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    school_casper_exam_notes: newSchool.school_casper.school_casper_exam_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    notes: newSchool.edited_school_casper.notes!.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        }
        
    }

    const deleteNote = (e:any, index: number) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    school_casper_exam_notes: newSchool.school_casper.school_casper_exam_notes.filter((n,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    notes: newSchool.edited_school_casper.notes!.filter((n,i) => i !== index)
                }
            })
        }
        
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
    };

    const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_casper: {
                ...newSchool.edited_school_casper,
                notes: newSchool.edited_school_casper.notes === null ? newSchool.school_casper.school_casper_exam_notes : newSchool.edited_school_casper.notes,
                input: (newSchool.edited_school_casper.edited_school_casper_required.input === null && newSchool.edited_school_casper.edited_school_casper_recommended.input === null) ? null : true,
                edited_school_casper_required: {
                    ...newSchool.edited_school_casper.edited_school_casper_required,
                    input: newSchool.edited_school_casper.edited_school_casper_required.input === null ? newSchool.school_casper.school_casper_required : newSchool.edited_school_casper.edited_school_casper_required.input, 
                    isEditMode: true,
                },
                edited_school_casper_recommended: {
                    ...newSchool.edited_school_casper.edited_school_casper_recommended,
                    input: newSchool.edited_school_casper.edited_school_casper_recommended.input === null ? newSchool.school_casper.school_casper_recommended : newSchool.edited_school_casper.edited_school_casper_recommended.input,
                    isEditMode: true,
                }
            }
        })
    };

    const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
        e.preventDefault();
        if (!original) {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    school_casper_exam_notes: newSchool.edited_school_casper.notes ? newSchool.edited_school_casper.notes : newSchool.school_casper.school_casper_exam_notes,
                },
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    input: newSchool.edited_school_casper.edited_school_casper_required.input === null ? null : true,
                    edited_school_casper_required: {
                        ...newSchool.edited_school_casper.edited_school_casper_required,
                        input: newSchool.edited_school_casper.edited_school_casper_required.input === newSchool.school_casper.school_casper_required ? null : newSchool.edited_school_casper.edited_school_casper_required.input, 
                        prev:newSchool.edited_school_casper.edited_school_casper_required.input === newSchool.school_casper.school_casper_required ? null : newSchool.edited_school_casper.edited_school_casper_required.input, 
                        isEditMode: false,
                    },
                    edited_school_casper_recommended: {
                        ...newSchool.edited_school_casper.edited_school_casper_recommended,
                        input: newSchool.edited_school_casper.edited_school_casper_recommended.input === newSchool.school_casper.school_casper_recommended ? null : newSchool.edited_school_casper.edited_school_casper_recommended.input,
                        prev: newSchool.edited_school_casper.edited_school_casper_recommended.input === newSchool.school_casper.school_casper_recommended ? null : newSchool.edited_school_casper.edited_school_casper_recommended.input,
                        isEditMode: false,
                    }
                }
            })
            
        } else {
            setNewSchool({
                ...newSchool,
                school_casper: {
                    ...newSchool.school_casper,
                    school_casper_exam_notes: newSchool.edited_school_casper.notes ? newSchool.edited_school_casper.notes : newSchool.school_casper.school_casper_exam_notes,
                    school_casper_required: newSchool.edited_school_casper.edited_school_casper_required.input !== null ? newSchool.edited_school_casper.edited_school_casper_required.input : newSchool.school_casper.school_casper_required,
                    school_casper_recommended: newSchool.edited_school_casper.edited_school_casper_recommended.input !== null ? newSchool.edited_school_casper.edited_school_casper_recommended.input : newSchool.school_casper.school_casper_recommended,
                },
                edited_school_casper: {
                    ...newSchool.edited_school_casper,
                    link: '',
                    input: null,
                    notes: null,
                    edited_school_casper_required: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_casper_recommended: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        }
    };


    const undoEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_casper: {
                ...newSchool.edited_school_casper,
                input: newSchool.edited_school_casper.edited_school_casper_required.input === null ? null : true,
                edited_school_casper_required: {
                    input: newSchool.edited_school_casper.edited_school_casper_required.input === newSchool.school_casper.school_casper_required ? null : newSchool.edited_school_casper.edited_school_casper_required.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_casper_recommended: {
                    input: newSchool.edited_school_casper.edited_school_casper_recommended.input === newSchool.school_casper.school_casper_recommended ? null : newSchool.edited_school_casper.edited_school_casper_recommended.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    };

    const revertEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_casper: {
                link: '',
                input: null,
                notes: null,
                edited_school_casper_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_casper_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    };
    
    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative grow max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_casper.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_casper.edited_school_casper_required.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">CASPer<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className={`mt-6 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">CASPer Required</label>   
                    <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_casper.edited_school_casper_required.input} isEditMode={newSchool.edited_school_casper.edited_school_casper_required.isEditMode} name='school_casper_required' 
                    originalInput={newSchool.school_casper.school_casper_required} handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_casper_required' checked={newSchool.school_casper.school_casper_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_casper.school_casper_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                </div>

                <div className={`mt-12 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">CASPer Recommended</label>  
                    <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_casper.edited_school_casper_recommended.input} isEditMode={newSchool.edited_school_casper.edited_school_casper_recommended.isEditMode} 
                    name='school_casper_recommended' originalInput={newSchool.school_casper.school_casper_recommended} handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_casper_recommended' checked={newSchool.school_casper.school_casper_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_casper.school_casper_recommended ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                </div>

                <div className={`w-full mt-8 mb-5`}>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                    {/* <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_casper.school_casper_exam_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_casper.school_casper_exam_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div> */}
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_casper.edited_school_casper_required.isEditMode} notes={newSchool.edited_school_casper.notes} originalNotes={newSchool.school_casper.school_casper_exam_notes} name='school_casper' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                </div>
            </div>
            {isEdit && 
            <EditButtons loggedInUser={loggedInUser} isEditMode={hasBeenEdited} input={hasInputs} name='school_casper' link={newSchool.edited_school_casper.link} setLinkObj={setLinkObj}
            toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}