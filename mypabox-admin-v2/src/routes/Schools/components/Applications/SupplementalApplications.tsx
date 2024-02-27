import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../Prereqs/AddNote";
import AddNoteFields from "../../Assets/AddNoteFields";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";

import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./ApplicationFunctions";
import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import BooleanFieldsGroup from "../../Assets/BooleanFieldsGroup";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";

export default function SupplementalApplications({ newSchool, setNewSchool, loggedInUser, isEdit, handleCheck, handleInputInCategory, handleCheckInCategory }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean, handleCheck: (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void,
     handleInputInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void, handleCheckInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        if (newSchool.school_supplemental_application_required.input) {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: newSchool.school_supplemental_application_required.school_supplemental_application_deadline ? newSchool.school_supplemental_application_required.school_supplemental_application_deadline : '',
                    school_supplemental_application_fee: newSchool.school_supplemental_application_required.school_supplemental_application_fee ? newSchool.school_supplemental_application_required.school_supplemental_application_fee : 0,
                    school_supplemental_application_link: newSchool.school_supplemental_application_required.school_supplemental_application_link ? newSchool.school_supplemental_application_required.school_supplemental_application_link : '',
                    school_supplemental_application_link_provided_with_invite_only: newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only : false,
                    school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes ? newSchool.school_supplemental_application_required.school_supplemental_application_notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_deadline: null,
                    school_supplemental_application_fee: null,
                    school_supplemental_application_link: null,
                    school_supplemental_application_link_provided_with_invite_only: null,
                    school_supplemental_application_notes: []
                }
            })
        }
    }, [newSchool.school_supplemental_application_required.input]);

    useEffect(() => {
        if (newSchool.edited_school_supplemental_application_required.input === null) {
            if (newSchool.school_supplemental_application_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_supplemental_application_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        }
}, [newSchool.edited_school_supplemental_application_required, newSchool.school_supplemental_application_required]);

    useEffect(() => {
        if (newSchool.edited_school_supplemental_application_required.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.input !== null 
            || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.input !== null || newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.input !== null
        ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_supplemental_application_required])

    // const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_supplemental_application_required: {
    //             ...newSchool.school_supplemental_application_required,
    //             [e.target.name]: e.target.checked,
    //         }
    //     })
    // };

    // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.name === 'school_supplemental_application_fee') {
    //         if (e.target.value === '') {
    //             setNewSchool({
    //                 ...newSchool,
    //                 school_supplemental_application_required: {
    //                     ...newSchool.school_supplemental_application_required,
    //                     [e.target.name]: '',
    //                 }
    //             })
    //         } else {
    //             const conversion = parseInt(e.target.value.replace(/,/g, ''));
    //             if (isNaN(conversion)) {
    //                 return
    //             } else {
    //                 const value = conversion.toLocaleString();
    //                 setNewSchool({
    //                     ...newSchool,
    //                     school_supplemental_application_required: {
    //                         ...newSchool.school_supplemental_application_required,
    //                         [e.target.name]: value,
    //                     }
    //                 })
    //             }
    //         }
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_supplemental_application_required: {
    //                 ...newSchool.school_supplemental_application_required,
    //                 [e.target.name]: e.target.value,
    //             }
    //         })
    //     }
    // };

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.concat(note)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_supplemental_application_required: {
                    ...newSchool.edited_school_supplemental_application_required,
                    notes: newSchool.edited_school_supplemental_application_required.notes!.concat(note)
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.map((n ,i) => {
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
                edited_school_supplemental_application_required: {
                    ...newSchool.edited_school_supplemental_application_required,
                    notes: newSchool.edited_school_supplemental_application_required.notes!.map((n ,i) => {
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
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_notes: newSchool.school_supplemental_application_required.school_supplemental_application_notes.filter((n,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_supplemental_application_required: {
                    ...newSchool.edited_school_supplemental_application_required,
                    notes: newSchool.edited_school_supplemental_application_required.notes!.filter((n,i) => i !== index)
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
    };

    console.log(newSchool.school_supplemental_application_required)

    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_supplemental_application_required.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_supplemental_application_required.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Supplemental Application Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                   <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_supplemental_application_required.input} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} originalInput={newSchool.school_supplemental_application_required.input}
                   name='school_supplemental_application_required' handleCheck={handleCheck}
                   />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} checked={newSchool.school_supplemental_application_required.input ? true : false} name='input' type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_supplemental_application_required.input ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                    {isOpen && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Deadline</label> 
                            <InputFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_deadline.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_deadline} name='school_supplemental_application_deadline' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_deadline!} name='school_supplemental_application_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Fee</label> 
                            <InputFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_fee.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_fee} name='school_supplemental_application_fee' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                            {/* <div className='flex justify-start items-center gap-1 w-1/3 border border-[#B4B4B4] rounded p-3'>
                                <BiDollar className='h-5 w-5 text-[#717171]'/>
                                <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_fee ? newSchool.school_supplemental_application_required.school_supplemental_application_fee : ''} name='school_supplemental_application_fee' className='grow focus:outline-none border-none' />  
                            </div> */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link</label> 
                            <InputFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.isEditMode} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link.input}
                            originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_link} name='school_supplemental_application_link' category='school_supplemental_application_required' handleInput={handleInputInCategory} 
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_supplemental_application_required.school_supplemental_application_link!} name='school_supplemental_application_link' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Supplemental Application Link Provided With Invite Only</label> 
                            <BooleanFieldsGroup loggedInUser={loggedInUser} input={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.input} isEditMode={newSchool.edited_school_supplemental_application_required.edited_school_supplemental_application_link_provided_with_invite_only.isEditMode}
                            name='school_supplemental_application_link_provided_with_invite_only' originalInput={newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only} category="school_supplemental_application_required" handleCheck={handleCheckInCategory}
                            />
                            {/* <div className='w-full mt-2'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input onChange={handleCheck} checked={newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? true : false} name='school_supplemental_application_link_provided_with_invite_only' type="checkbox" className="sr-only peer"/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">{newSchool.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only ? 'True' : 'False'}</span>
                                </label>
                            </div> */}
                        </div> 
                    </>
                )}
                {isOpen && (
                <div className={`mx-5 mb-5`}>
                <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
                <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                {/* {newSchool.school_supplemental_application_required.school_supplemental_application_notes && (
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_supplemental_application_required.school_supplemental_application_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_supplemental_application_required.school_supplemental_application_notes.map((note, i) => (
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
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} notes={newSchool.edited_school_supplemental_application_required.notes} originalNotes={newSchool.school_supplemental_application_required.school_supplemental_application_notes} name='school_supplemental_application_required' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                </div>
                )}
            </div>
            {isEdit && 
            <EditButtons loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_supplemental_application_required.isEditMode} name="school_supplemental_application_required" 
            link={newSchool.edited_school_supplemental_application_required.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool}
            setNewSchool={setNewSchool} toggleLinkPopup={toggleLinkPopup}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}