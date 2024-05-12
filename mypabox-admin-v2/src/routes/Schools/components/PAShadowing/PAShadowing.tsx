import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { School, Note } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import LinkPopup from "../../LinkPopup";
import AddNoteFields from "../../Assets/AddNoteFields";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import { enableEditMode, confirmEdit, undoEdit, revertEdit, enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./PAShadowingFunctions";
import InputFields from "../../Assets/InputsFields";
import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";




export default function PAShadowing({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');
    const [ reqInputs, setReqInputs ] = useState<boolean | null>(null);
    const [ recInputs, setRecInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isRecOpen, setIsRecOpen ] = useState(false);

    useEffect(() => {
        if (newSchool.edited_school_pa_shadowing_required.input !== null ||  newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.input !== null) {
            setReqInputs(true);
        } else {
            setReqInputs(null);
        }

        if (newSchool.edited_school_pa_shadowing_recommended.input !== null || newSchool.edited_school_pa_shadowing_recommended.edited_school_minimum_pa_shadowing_hours_recommended.input !== null) {
            setRecInputs(true);
        } else {
            setRecInputs(null);
        }
    }, [newSchool.edited_school_pa_shadowing_required, newSchool.edited_school_pa_shadowing_recommended]);

    useEffect(() => {
        if (newSchool.edited_school_pa_shadowing_required.input === null) {
            if (newSchool.school_pa_shadowing_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_pa_shadowing_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        if (newSchool.edited_school_pa_shadowing_recommended.input === null) {
            if (newSchool.school_pa_shadowing_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        } else {
            if (newSchool.edited_school_pa_shadowing_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        }
    }, [newSchool.edited_school_pa_shadowing_required, newSchool.school_pa_shadowing_required, newSchool.edited_school_pa_shadowing_recommended, newSchool.school_pa_shadowing_recommended])
    
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

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: field.notes.concat(note)
                }
            })
        }
        

    }

    const updateNote = (note: Note) => {
    if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
        const field = newSchool[name as keyof School] as object;
        setNewSchool({
            ...newSchool,
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
        })
    } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
        const field = newSchool[`edited_${name}` as keyof School] as any;
        setNewSchool({
            ...newSchool,
            [`edited_${name}`]: {
                ...field,
                notes: field.notes.map((n:any,i:number) => {
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

    const deleteNote = (e: any, index: number, name: string, noteName?: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    [noteName!]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: field.notes.filter((n:any,i:number) => i !== index)
                }
            })
        }
        
    }


    useEffect(() => {
        if (newSchool.school_pa_shadowing_required.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required ? newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required : 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_required.input]);

    useEffect(() => {
        if (newSchool.school_pa_shadowing_recommended.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended ? newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended : 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_recommended.input])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool[e.target.name as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [e.target.name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_average_pa_shadowing_hours_accepted_previous_cycle: {
                    ...newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle,
                    input: Number(e.target.value),
                }
            })
        }else {
            setNewSchool({
                ...newSchool,
                edited_school_average_pa_shadowing_hours_accepted_previous_cycle: {
                    ...newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle,
                    input: Number(e.target.value)
                }
            })
        }
        
    }

    const handleInputInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        
        if (!isEditedInput) {
            const field = newSchool[category as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const editedCategory = `edited_${category}`
            const field = newSchool[editedCategory as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [editedCategory]: {
                    ...field,
                    [name]: {
                        ...field[name as keyof object] as object,
                        input: e.target.value,
                    }
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

    
    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_pa_shadowing_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} />
                    <Indicator label='PA Shadowing Hours Required' editedInput={newSchool.edited_school_pa_shadowing_required.input} />
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_required.input} isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} originalInput={newSchool.school_pa_shadowing_required.input}
                    handleCheck={handleCheck} name='school_pa_shadowing_required' 
                    />
                    
                    {isOpen && (
                        <div className={`mt-7 mx-4 mb-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Required</label>   
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.input} isEditMode={newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.isEditMode}
                            originalInput={newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required} handleInput={handleInputInCategory} category='school_pa_shadowing_required' name='school_minimum_pa_shadowing_hours_required'
                            />
                        </div>
                    )}
                    {isOpen && (
                    <div className={`max-w-[900px] mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_required.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_required'); setNoteName('school_minimum_pa_shadowing_hours_required_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} notes={newSchool.edited_school_pa_shadowing_required.notes} originalNotes={newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes} name='school_pa_shadowing_required' noteName="school_minimum_pa_shadowing_hours_required_notes" toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                            />
                    </div>
                    )}
                </div>
                {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={reqInputs} name="school_pa_shadowing_required" isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} link={newSchool.edited_school_pa_shadowing_required.link} setLinkObj={setLinkObj}
                toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>

            <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_pa_shadowing_recommended.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} />
                <Indicator label='PA Shadowing Hours Recommended' editedInput={newSchool.edited_school_pa_shadowing_recommended.input} />
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_recommended.input} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} 
                    originalInput={newSchool.school_pa_shadowing_recommended.input} name='school_pa_shadowing_recommended' handleCheck={handleCheck}
                    />
                    {isRecOpen && (
                        <div className={`mt-7 mx-4 mb-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Recommended</label>  
                            <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_recommended.edited_school_minimum_pa_shadowing_hours_recommended.input} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} originalInput={newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended}
                            category="school_pa_shadowing_recommended" name='school_minimum_pa_shadowing_hours_recommended' handleInput={handleInputInCategory} 
                            />
                        </div>
                    )}
                    {isRecOpen && (
                    <div className={`max-w-[900px] mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_recommended.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_recommended'); setNoteName('school_minimum_pa_shadowing_hours_recommended_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} notes={newSchool.edited_school_pa_shadowing_recommended.notes} originalNotes={newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes} name='school_pa_shadowing_recommended' noteName="school_minimum_pa_shadowing_hours_recommended_notes" toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                            />
                    </div>
                    )}
                </div>
                <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={recInputs} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} name='school_pa_shadowing_recommended' link={newSchool.edited_school_pa_shadowing_recommended.link}
                setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
                />
            </div>

            <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode} />
                <Indicator label="Average PA Shadowing Hours Accepted Previous Cycle" editedInput={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} />               
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode}
                        name="school_average_pa_shadowing_hours_accepted_previous_cycle" handleInput={handleInput} originalInput={newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input}
                        />
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_average_pa_shadowing_hours_accepted_previous_cycle'); setNoteName('school_average_pa_shadowing_hours_accepted_previous_cycle_notes')}}className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode} notes={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.notes} originalNotes={newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes} name='school_average_pa_shadowing_hours_accepted_previous_cycle' noteName="school_average_pa_shadowing_hours_accepted_previous_cycle_notes" toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode} input={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} link={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.link}
                toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} newSchool={newSchool} setNewSchool={setNewSchool} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit}
                revertEdit={revertEdit} name='school_average_pa_shadowing_hours_accepted_previous_cycle'
                />}
            </div>
            </>
        )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}