import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddNote from "../Prereqs/AddNote";
import AddNoteFields from "../../Assets/AddNoteFields";

import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import { UserObject } from "../../../../types/users.types";

import LinkPopup from "../../LinkPopup";
import BooleanFields from "../../Assets/BooleanFields";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import EditButtons from "../../Assets/EditButtons";

import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./ApplicationFunctions";

export default function ApplicationsDirectly({ newSchool, setNewSchool, loggedInUser, isEdit, handleCheck, handleInputInCategory}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean, handleCheck: (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void,
    handleInputInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void }) {
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
        if (newSchool.school_application_submitted_directly_to_school.input) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : '',
                    school_application_direct_to_school_fee: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee : 0,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes : []
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_deadline: null,
                    school_application_direct_to_school_fee: null,
                    school_application_direct_to_school_notes: []
                }
            })
            console.log(newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline)
        }
    }, [newSchool.school_application_submitted_directly_to_school.input]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_directly_to_school.input === null) {
            if (newSchool.school_application_submitted_directly_to_school.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_application_submitted_directly_to_school.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        }
}, [newSchool.edited_school_application_submitted_directly_to_school, newSchool.school_application_submitted_directly_to_school]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_directly_to_school.input !== null || newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_deadline.input !== null || newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.input !== null 
        ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_application_submitted_directly_to_school]);



    // const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_application_submitted_directly_to_school: {
    //             ...newSchool.school_application_submitted_directly_to_school,
    //             input: e.target.checked,
    //         }
    //     })
    // };

    // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.name === 'school_application_direct_to_school_fee') {
    //         if (e.target.value === '') {
    //             setNewSchool({
    //                 ...newSchool,
    //                 school_application_submitted_directly_to_school: {
    //                     ...newSchool.school_application_submitted_directly_to_school,
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
    //                     school_application_submitted_directly_to_school: {
    //                         ...newSchool.school_application_submitted_directly_to_school,
    //                         [e.target.name]: value,
    //                     }
    //                 })
    //             }
    //         }
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_application_submitted_directly_to_school: {
    //                 ...newSchool.school_application_submitted_directly_to_school,
    //                 [e.target.name]: e.target.value,
    //             }
    //         })
    //     }
    // };

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.concat(note)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_directly_to_school: {
                    ...newSchool.edited_school_application_submitted_directly_to_school,
                    notes: newSchool.edited_school_application_submitted_directly_to_school.notes!.concat(note)
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.map((n,i) => {
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
                edited_school_application_submitted_directly_to_school: {
                    ...newSchool.edited_school_application_submitted_directly_to_school,
                    notes: newSchool.edited_school_application_submitted_directly_to_school.notes!.map((n,i) => {
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
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_notes: newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.filter((n,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_directly_to_school: {
                    ...newSchool.edited_school_application_submitted_directly_to_school,
                    notes: newSchool.edited_school_application_submitted_directly_to_school.notes!.filter((n,i) => i !== index)
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
        {/* // <div className={`${newSchool.school_application_submitted_on_caspa.input && newSchool.edited_school_application_submitted_directly_to_school.input === null && loggedInUser.permissions.canVerify ? 'hidden' : 'block'}`}> */}
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_application_submitted_directly_to_school.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} />
            <Indicator label="Application Submitted Directly To School" editedInput={newSchool.edited_school_application_submitted_directly_to_school.input} />
    
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} originalInput={newSchool.school_application_submitted_directly_to_school.input} 
                    name='school_application_submitted_directly_to_school' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} checked={newSchool.school_application_submitted_directly_to_school.input? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_application_submitted_directly_to_school.input ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                    {isOpen && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_deadline.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.isEditMode}
                            originalInput={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline} name='school_application_direct_to_school_deadline' category="school_application_submitted_directly_to_school" handleInput={handleInputInCategory}
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline : ''} name='school_application_direct_to_school_deadline' type='date' className='w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[50px] text-lg rounded' />   */}
                        </div> 
                        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Fee</label> 
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.input} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.edited_school_application_direct_to_school_fee.isEditMode} 
                            originalInput={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee} name='school_application_direct_to_school_fee' category="school_application_submitted_directly_to_school" handleInput={handleInputInCategory}
                            />
                            {/* <div className='flex justify-start items-center gap-1 w-1/3 border border-[#B4B4B4] rounded p-3'>
                                <BiDollar className='h-5 w-5 text-[#717171]'/>
                                <input onChange={handleInput} value={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee ? newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_fee : ''} name='school_application_direct_to_school_fee' className='grow focus:outline-none border-none' />  
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
                {/* {newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes && (
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes.map((note, i) => (
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
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} notes={newSchool.edited_school_application_submitted_directly_to_school.notes} originalNotes={newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes} name='school_application_submitted_directly_to_school' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                </div>
                )}
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_application_submitted_directly_to_school.isEditMode} name='school_application_submitted_directly_to_school' link={newSchool.edited_school_application_submitted_directly_to_school.link}
            setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        {/* // </div> */}
        </>
    )
}