import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react"
import { School, Note } from "../../../../types/schools.types"
import AddNoteFields from "../../Assets/AddNoteFields";

import AddNote from "../Prereqs/AddNote"
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from "./ExperienceFunctions";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import EditButtons from "../../Assets/EditButtons";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

export default function CommunityService({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean } ) {
    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ isGroup, setIsGroup ] = useState(false);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isReqOpen, setIsReqOpen ] = useState(false);
    const [ isRecOpen, setIsRecOpen ] = useState(false);


    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
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


    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            if (isGroup) {
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.concat(note)
                    }
                })
            } else {
                const field = newSchool.school_community_service[name as keyof object] as object;
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        [name]: {
                            ...field,
                            [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                        }
                    }
                })
            }
        } else {
            if (isGroup) {
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        notes: newSchool.edited_school_community_service.notes ? newSchool.edited_school_community_service.notes.concat(note) : [note]
                    }
                })
            } else {
                const field = newSchool.edited_school_community_service[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        [`edited_${name}`]: {
                            ...field,
                            notes:  field.notes ? field.notes.concat(note) : [note],
                        }
                    }
                })
            }
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            if (isGroup) {
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            } else {
                const field = newSchool.school_community_service[name as keyof object] as object;
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        [name]: {
                            ...field,
                            [noteName]: (field[noteName as keyof object] as Note[]).map((n,i) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            }
        } else {
            if (isGroup) {
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        notes: newSchool.edited_school_community_service.notes!.map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            } else {
                const field = newSchool.edited_school_community_service[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes!.map((n:any,i:number) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            }
        }
        
    }

    const deleteNote = (e: any, index: number, name?: string, noteName?: string) => {
        e.preventDefault()
        if (loggedInUser.permissions.canAddOrDelete) {
            if (!name && !noteName) {
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        school_community_service_general_notes: newSchool.school_community_service.school_community_service_general_notes.filter((n,i) => i !== index)
                    }
                })
            } else if (name && noteName) {
                const field = newSchool.school_community_service[name as keyof object] as object;
                setNewSchool({
                    ...newSchool,
                    school_community_service: {
                        ...newSchool.school_community_service,
                        [name]: {
                            ...field,
                            [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                        }
                    }
                })
            }
        } else {
            if (!name && !noteName) {
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        notes: newSchool.edited_school_community_service.notes!.filter((n,i) => i !== index)
                    }
                })
            } else if (name && noteName) {
                const field = newSchool.edited_school_community_service[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_community_service: {
                        ...newSchool.edited_school_community_service,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes!.filter((n:any,i:number) => i !== index)
                        }
                    }
                })
            }
        }
        
    };

    useEffect(() => {
        if (newSchool.edited_school_community_service.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_community_service.input])

    useEffect(() => {
        if (newSchool.edited_school_community_service.edited_school_community_service_required.input === null) {
            if (newSchool.school_community_service.school_community_service_required) {
                setIsReqOpen(true)
            } else {
                setIsReqOpen(false)
            }
        } else {
            if (newSchool.edited_school_community_service.edited_school_community_service_required.input) {
                setIsReqOpen(true)
            } else {
                setIsReqOpen(false)
            }
        }

        if (newSchool.edited_school_community_service.edited_school_community_service_recommended.input === null) {
            if (newSchool.school_community_service.school_community_service_recommended) {
                setIsRecOpen(true)
            } else {
                setIsRecOpen(false)
            }
        } else {
            if (newSchool.edited_school_community_service.edited_school_community_service_recommended.input) {
                setIsRecOpen(true)
            } else {
                setIsRecOpen(false)
            }
        }
    }, [newSchool.edited_school_community_service.edited_school_community_service_required, newSchool.school_community_service.school_community_service_required, newSchool.edited_school_community_service.edited_school_community_service_recommended,
        newSchool.school_community_service.school_community_service_recommended])

    useEffect(() => {
        if (newSchool.school_community_service.school_community_service_recommended) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_recommended: {
                        input: newSchool.school_community_service.school_minimum_community_service_hours_recommended && newSchool.school_community_service.school_minimum_community_service_hours_recommended.input ? newSchool.school_community_service.school_minimum_community_service_hours_recommended.input : 0,
                        school_minimum_community_service_hours_recommended_notes: newSchool.school_community_service.school_minimum_community_service_hours_recommended && newSchool.school_community_service.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes ? newSchool.school_community_service.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes : [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_community_service.school_community_service_recommended])
    
    useEffect(() => {
        if (newSchool.school_community_service.school_community_service_required) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_required: {
                        input: newSchool.school_community_service.school_minimum_community_service_hours_required && newSchool.school_community_service.school_minimum_community_service_hours_required.input ? newSchool.school_community_service.school_minimum_community_service_hours_required.input : 0,
                        school_minimum_community_service_hours_required_notes: newSchool.school_community_service.school_minimum_community_service_hours_required && newSchool.school_community_service.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes ? newSchool.school_community_service.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes : [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_minimum_community_service_hours_required: null,
                }
            })
        }
    }, [newSchool.school_community_service.school_community_service_required])
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_community_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_community_service: {
                    ...newSchool.edited_school_community_service,
                    [name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    const handleInputGroup = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        
        if (!isEditedInput) {
            const field = newSchool.school_community_service[e.target.name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_community_service[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_community_service: {
                    ...newSchool.edited_school_community_service,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_average_community_service_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_community_service: {
                    ...newSchool.edited_school_community_service,
                    edited_school_average_community_service_hours_accepted_previous_cycle: {
                        ...newSchool.edited_school_community_service.edited_school_average_community_service_hours_accepted_previous_cycle,
                        input:  Number(e.target.value)
                    }
                }
            })
        }
    }
    
    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_community_service.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} />
        <Indicator label="Community Service" editedInput={newSchool.edited_school_community_service.input} />          
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_community_service.school_community_service_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Required</label>   
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={newSchool.edited_school_community_service.edited_school_community_service_required.input}
                originalInput={newSchool.school_community_service.school_community_service_required} name='school_community_service_required' handleCheck={handleCheck}
                />
                {isReqOpen && (
                <div className={`mt-7 mb-5 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Required</label>   
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_required.input}
                        originalInput={newSchool.school_community_service.school_minimum_community_service_hours_required ? newSchool.school_community_service.school_minimum_community_service_hours_required.input : null } name='school_minimum_community_service_hours_required' handleInput={handleInputGroup}
                        />
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_community_service_hours_required'); setNoteName('school_minimum_community_service_hours_required_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} notes={newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_required.notes ? newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_required.notes : null} originalNotes={newSchool.school_community_service.school_minimum_community_service_hours_required ? newSchool.school_community_service.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes : null} name='school_minimum_community_service_hours_required' noteName="school_minimum_community_service_hours_required_notes" toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_community_service.school_community_service_recommended ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Community Service Recommended</label>  
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={newSchool.edited_school_community_service.edited_school_community_service_recommended.input}
                originalInput={newSchool.school_community_service.school_community_service_recommended} name="school_community_service_recommended" handleCheck={handleCheck}
                /> 
                
                {isRecOpen && (
                <div className={`mt-7 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Community Service Hours Recommended</label>   
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_recommended.input}
                        originalInput={newSchool.school_community_service.school_minimum_community_service_hours_recommended ? newSchool.school_community_service.school_minimum_community_service_hours_recommended.input : null} name='school_minimum_community_service_hours_recommended'
                        handleInput={handleInputGroup}
                        />
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_community_service_hours_recommended'); setNoteName('school_minimum_community_service_hours_recommended_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} notes={newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_recommended.notes ? newSchool.edited_school_community_service.edited_school_minimum_community_service_hours_recommended.notes : null} originalNotes={newSchool.school_community_service.school_minimum_community_service_hours_recommended ? newSchool.school_community_service.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes : null} name='school_minimum_community_service_hours_recommended' noteName="school_minimum_community_service_hours_recommended_notes" toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                </div>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Community Service Hours Accepted Previous Cycle</label>   
                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={newSchool.edited_school_community_service.edited_school_average_community_service_hours_accepted_previous_cycle.input}
                originalInput={newSchool.school_community_service.school_average_community_service_hours_accepted_previous_cycle} name='school_average_community_service_hours_accepted_previous_cycle' handleInput={handleInput}
                />
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} notes={newSchool.edited_school_community_service.notes} originalNotes={newSchool.school_community_service.school_community_service_general_notes} name='' toggleNotePopup={toggleNotePopup}
                deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
            </div>
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_community_service.isEditMode} input={hasInputs} link={newSchool.edited_school_community_service.link} toggleLinkPopup={toggleLinkPopup}
        setLinkObj={setLinkObj} name='school_community_service' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}