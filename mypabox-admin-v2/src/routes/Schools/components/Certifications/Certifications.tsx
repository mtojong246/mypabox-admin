import { School, Note } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../Prereqs/AddNote";
import AddNoteFields from "../../Assets/AddNoteFields";

import { UserObject } from "../../../../types/users.types";

import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./CertificationFunctions";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import AddSelected from "../../Assets/AddSelected";

const options = [
    {value: 'CPR', label: 'CPR'},
    {value: 'BLS', label: 'BLS'},
    {value: 'ACLS', label: 'ACLS'},
]

export default function Certifications({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ certification, setCertification ] = useState('');
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

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
    }, [newSchool.school_certifications_required.input]);

    useEffect(() => {
        if (newSchool.edited_school_certifications_required.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_certifications_required]);

    useEffect(() => {
        if (newSchool.edited_school_certifications_required.input === null) {
            if (newSchool.school_certifications_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        } else {
            if (newSchool.edited_school_certifications_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }
    }, [newSchool.edited_school_certifications_required, newSchool.school_certifications_required])

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    };

    const handleCheck = (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const addCertification = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (newSchool.school_certifications_required.school_certifications_required_options?.includes(certification)) return;
        if (!certification) return;
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.concat(certification)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    edited_school_certifications_required_options: {
                        ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                        input: newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input ? newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input.concat({
                            name: certification, isCorrect: true, isNew: true,
                        }) : [{name: certification, isCorrect: true, isNew: true}],
                    }
                }
            })
        }

        
    };

    const undoCertification = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();

        setNewSchool({
            ...newSchool,
            edited_school_certifications_required: {
                ...newSchool.edited_school_certifications_required,
                edited_school_certifications_required_options: {
                    ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                    input: newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.map((ind,i) => {
                        if (i === index) {
                            return { ...ind, isCorrect: true }
                        } else {
                            return { ...ind } 
                        }
                    })
                }
            }
        })
    }

    const deleteCertification = (e: MouseEvent<HTMLButtonElement>, index: number, isInputNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certifications_required_options: newSchool.school_certifications_required.school_certifications_required_options!.filter((c,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    edited_school_certifications_required_options: {
                        ...newSchool.edited_school_certifications_required.edited_school_certifications_required_options,
                        input: isInputNew ? newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.filter((inp,i) => i !== index) : newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input!.map((ind,i) => {
                            if (i === index) {
                                return {
                                    ...ind,
                                    isCorrect: false,
                                }
                            } else {
                                return { ...ind }
                            }
                        }) 
                    }
                }
            })
        }
        
    };

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certification_notes: newSchool.school_certifications_required.school_certification_notes.concat(note)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    notes: newSchool.edited_school_certifications_required.notes!.concat(note)
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
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
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    notes: newSchool.edited_school_certifications_required.notes!.map((n,i) => {
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

    const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...newSchool.school_certifications_required,
                    school_certification_notes: newSchool.school_certifications_required.school_certification_notes.filter((n,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_certifications_required: {
                    ...newSchool.edited_school_certifications_required,
                    notes: newSchool.edited_school_certifications_required.notes!.filter((n,i) => i !== index)
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

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative grow max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Certification Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className={`w-full ${!isOpen ? 'flex justify-between items-center mt-0' : 'block mt-2'}`}>
                    <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={newSchool.edited_school_certifications_required.input} originalInput={newSchool.school_certifications_required.input}
                    name='school_certifications_required' handleCheck={handleCheck} />
                    {/* <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_certifications_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_certifications_required.input ? 'True' : 'False'}</span>
                    </label> */}
                    {!isOpen && (
                        <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    )}
                </div>
                {isOpen && (
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Certifications</label> 
                        <AddSelected loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input} 
                        setCertification={setCertification} addCertification={addCertification} deleteCertification={deleteCertification} stringArray={newSchool.school_certifications_required.school_certifications_required_options} 
                        objectArray={newSchool.edited_school_certifications_required.edited_school_certifications_required_options.input} options={options} undoCertification={undoCertification}
                        />
                        {/* <div className='flex justify-start items-center gap-3'>
                            <CreatableSelect options={options} onChange={(e:any) => setCertification(e.value)} className="grow focus:outline-none"/> 
                            <button onClick={addCertification} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                                Add Certification
                            </button>
                        </div> */}
                        {/* {newSchool.school_certifications_required.school_certifications_required_options && (
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
                            )} */}
                    </div> 
                )}
                {newSchool.school_certifications_required.input && (
                <div className={`${newSchool.school_certifications_required.input ? 'mx-5 mb-5' : 'mx-0 mb-0'}`}>
                <label className='font-medium text-xl inline-block mt-8'>Notes:</label>
                <button onClick={toggleNotePopup} className="mt-2 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                {/* {newSchool.school_certifications_required.school_certification_notes && (
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
                )} */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} notes={newSchool.edited_school_certifications_required.notes} originalNotes={newSchool.school_certifications_required.school_certification_notes} name='edited_school_certifications_required' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                </div>
                )}
                {newSchool.school_certifications_required.school_certification_notes && !newSchool.school_certifications_required.input && (
                    // <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_certifications_required.school_certification_notes.length ? 'mt-3' : 'mt-0'}`}>
                    //     {newSchool.school_certifications_required.school_certification_notes.map((note, i) => (
                    //         <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                    //             <div className='flex justify-between items-center w-full mb-1'>
                    //                 <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                    //                 <div className='flex gap-2'>
                    //                     <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                    //                     <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    //                 </div>
                    //             </div>
                    //             <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    //         </div>
                    //     ))}
                    // </div>
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} notes={newSchool.edited_school_certifications_required.notes} originalNotes={newSchool.school_certifications_required.school_certification_notes} name='edited_school_certifications_required' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                )}
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_certifications_required.isEditMode} input={hasInputs} name='edited_school_certifications_required' enableEditMode={enableEditModeGroup} 
            confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} link={newSchool.edited_school_certifications_required.link} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}