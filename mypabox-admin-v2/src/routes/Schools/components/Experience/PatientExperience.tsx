import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react"
import { School } from "../../../../types/schools.types"
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from "./ExperienceFunctions";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import SelectInputsFields from "../../Assets/SelectInputsFields";
import useNotes from "../../../../hooks/useNotes";

const options = [
    { value: '', label: 'Select' },
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function PatientExperience({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ editedSelection, setEditedSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    }) 

    const [ selection2, setSelection2 ] = useState({
        number: '',
        duration: '',
    });
    const [ editedSelection2, setEditedSelection2 ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    }) 

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const {
        deleteNote,
        openAddNote,
        openEditNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
        groupName,
        deleteNestedNote,
    } = useNotes({newSchool, setNewSchool})

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);
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


    useEffect(() => {
        if (newSchool.edited_school_patient_experience.input !== null) {
            setHasInputs(true);
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_patient_experience.input]);

    useEffect(() => {
        if (newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input === null) {
            if (newSchool.school_patient_experience.school_patient_experience_required) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        if (newSchool.edited_school_patient_experience.edited_school_patient_experience_recommended.input === null) {
            if (newSchool.school_patient_experience.school_patient_experience_recommended) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        } else {
            if (newSchool.edited_school_patient_experience.edited_school_patient_experience_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        }
    }, [newSchool.edited_school_patient_experience, newSchool.school_patient_experience])

    console.log(newSchool.school_patient_experience)

    useEffect(() => {
        if (newSchool.school_patient_experience.school_patient_experience_required) {
            

            if (newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed) {
                const array = newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else {
            
            setSelection({
                number: '',
                duration: ''
            })
        }

        if (newSchool.school_patient_experience.school_patient_experience_recommended) {
          

            if (newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended) {
                const array = newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ');
                setSelection2({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else {
           
            setSelection2({
                number: '',
                duration: ''
            })
        }
    }, [newSchool.school_patient_experience.school_patient_experience_required, newSchool.school_patient_experience.school_patient_experience_recommended]);


    useEffect(() => {
        if (newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input !== null) {
            const array = newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ');
            setEditedSelection({
                number: array[0],
                duration: array[1]
            })
        } else {
            setEditedSelection({
                number: null,
                duration: null,
            })
        };

        if (newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input !== null) {
            const array = newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ');
            setEditedSelection2({
                number: array[0],
                duration: array[1]
            })
        } else {
            setEditedSelection2({
                number: null,
                duration: null,
            })
        }
    }, [newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed, newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended])


    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    ...newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed!,
                    input: selection.number + ' ' + selection.duration,
                }
            }
        })
    }, [selection]);

    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
                    ...newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended!,
                    input: selection2.number + ' ' + selection2.duration,
                }
            }
        })
    }, [selection2]);
    
    const handleInputGroup = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_patient_experience[e.target.name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_patient_experience[name as keyof object] as {input: string | number | null, prev: string | number | null};
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        }
        
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_average_patient_care_experience_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                        ...newSchool.edited_school_patient_experience.edited_school_average_patient_care_experience_hours_accepted_previous_cycle,
                        input: Number(e.target.value),
                    }
                }
            })
        }
    }

    const handleSelectionNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({
                ...selection,
                number: e.target.value.trim(),
            })
        } else {
            setEditedSelection({
                ...editedSelection,
                number: e.target.value.trim(),
            })
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        ...newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                        input: (e.target.value.trim()) + ' ' + editedSelection.duration,
                    }
                }
            })
        }
    };

    const handleSelectDuration = (e:any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({
                ...selection,
                duration: e.value,
            })
        } else {
            setEditedSelection({
                ...editedSelection,
                duration: e.value,
            });
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        ...newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                        input: editedSelection.number + ' ' + e.value,
                    }
                }
            })
        } 
    }

    const handleSelectionNumber2 = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection2({
                ...selection2,
                number: e.target.value.trim(),
            })
        } else {
            setEditedSelection2({
                ...editedSelection2,
                number: e.target.value.trim(),
            })
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
                        ...newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended,
                        input: (e.target.value.trim()) + ' ' + editedSelection2.duration,
                    }
                }
            })
        }
    };

    const handleSelectDuration2 = (e:any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection2({
                ...selection2,
                duration: e.value,
            })
        } else {
            setEditedSelection2({
                ...editedSelection2,
                duration: e.value,
            });
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
                        ...newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended,
                        input: editedSelection2.number + ' ' + e.value,
                    }
                }
            })
        } 
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {

            if (e.target.name === 'school_patient_experience_required') {
                setNewSchool({
                    ...newSchool,
                    school_patient_experience: {
                        ...newSchool.school_patient_experience,
                        school_patient_experience_required: e.target.checked,
                        school_minimum_patient_care_experience_hours_required: e.target.checked ? {
                            input: 0,
                            school_minimum_patient_care_experience_hours_required_notes: [],
                        } : null,
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed: e.target.checked ? {
                            input: '',
                            school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: [],
                        } : null,
                    }
                })
            } else if (e.target.name === 'school_patient_experience_recommended') {
                setNewSchool({
                    ...newSchool,
                    school_patient_experience: {
                        ...newSchool.school_patient_experience,
                        school_patient_experience_recommended: e.target.checked,
                        school_minimum_patient_care_experience_hours_recommended: e.target.checked ? {
                            input: 0,
                            school_minimum_patient_care_experience_hours_recommended_notes: [],
                        } : null,
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: e.target.checked ? {
                            input: '',
                            school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes: [],
                        } : null,
                    }
                })
            }
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    [name]: {
                        ...(newSchool.edited_school_patient_experience[name as keyof object] as object),
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_patient_experience.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} />
        <Indicator label="Patient Experience (PCE)" editedInput={newSchool.edited_school_patient_experience.input} />
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_patient_experience.school_patient_experience_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PCE Required</label>  
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input}
                originalInput={newSchool.school_patient_experience.school_patient_experience_required} name='school_patient_experience_required' handleCheck={handleCheck}
                /> 
                {isOpen && (
                <>
                    <div className={`mt-7 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PCE Hours Required</label>   
                        <div className='flex justify-center items-start gap-3'>
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_required.input}
                            originalInput={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : null} name='school_minimum_patient_care_experience_hours_required' handleInput={handleInputGroup}
                            />
                            <button onClick={(e) => {openAddNote(e, 'school_minimum_patient_care_experience_hours_required', 'school_minimum_patient_care_experience_hours_required_notes', 'school_patient_experience' )}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>

                        <AddNoteFields 
                        isEditMode={newSchool.edited_school_patient_experience.isEditMode} 
                        notes={newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_required.notes ? newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_required.notes : null} 
                        originalNotes={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes : null} 
                        name='school_minimum_patient_care_experience_hours_required' 
                        noteName="school_minimum_patient_care_experience_hours_required_notes" 
                        deleteNote={deleteNote}
                        deleteNestedNote={deleteNestedNote}
                        groupName="school_patient_experience"
                        openEditNote={openEditNote}
                        />
                    </div>

                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame PCE Needs To Be Completed</label>   
                        <div className='flex justify-start items-start gap-2'>
                            <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input} originalInput={newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : null } 
                            name="school_minimum_time_frame_patient_care_experience_needs_to_be_completed" number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} handleInput={handleSelectionNumber} handleSelect={handleSelectDuration} 
                            options={options}
                            />
                            
                            <button onClick={(e) => {openAddNote(e, 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed', 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes', 'school_patient_experience')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>  
                        </div>
                        <AddNoteFields 
                        isEditMode={newSchool.edited_school_patient_experience.isEditMode} 
                        notes={newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes ? newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes : null} 
                        originalNotes={newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : null} 
                        name='school_minimum_time_frame_patient_care_experience_needs_to_be_completed' 
                        noteName="school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes" 
                        deleteNote={deleteNote}
                        deleteNestedNote={deleteNestedNote}
                        openEditNote={openEditNote}
                        groupName="school_patient_experience"
                        />
                    </div>
                </>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_patient_experience.school_patient_experience_recommended ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PCE Recommended</label>  
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_patient_experience_recommended.input}
                originalInput={newSchool.school_patient_experience.school_patient_experience_recommended} name='school_patient_experience_recommended' handleCheck={handleCheck}
                /> 
                {isRecOpen && (
                <>
                    <div className={`mt-7 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PCE Hours Recommended</label>   
                        <div className='flex justify-center items-start gap-3'>
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_recommended.input}
                            originalInput={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_recommended ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.input : null} name='school_minimum_patient_care_experience_hours_recommended' handleInput={handleInputGroup}
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input : ''} name='school_minimum_patient_care_experience_hours_required' className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {openAddNote(e, 'school_minimum_patient_care_experience_hours_recommended', 'school_minimum_patient_care_experience_hours_recommended_notes', 'school_patient_experience')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
            
                        <AddNoteFields 
                        isEditMode={newSchool.edited_school_patient_experience.isEditMode} 
                        notes={newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_recommended.notes ? newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_recommended.notes : null} 
                        originalNotes={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_recommended ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.school_minimum_patient_care_experience_hours_recommended_notes : null} 
                        name='school_minimum_patient_care_experience_hours_recommended' 
                        noteName="school_minimum_patient_care_experience_hours_recommended_notes" 
                        deleteNote={deleteNote} 
                        deleteNestedNote={deleteNestedNote} 
                        groupName="school_patient_experience"
                        openEditNote={openEditNote}
                        />
                    </div>

                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame PCE Needs To Be Completed</label>   
                        <div className='flex justify-start items-start gap-2'>
                            <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input} originalInput={newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input : null } 
                            name="school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended" number={editedSelection2.number} duration={editedSelection2.duration} originalNumber={selection2.number} originalDuration={selection2.duration} handleInput={handleSelectionNumber2} handleSelect={handleSelectDuration2} 
                            options={options}
                            />
                            
                            <button onClick={(e) => {openAddNote(e, 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended', 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes', 'school_patient_experience') }} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>  
                        </div>
                        
                        <AddNoteFields 
                        isEditMode={newSchool.edited_school_patient_experience.isEditMode} 
                        notes={newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.notes ? newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.notes : null} 
                        originalNotes={newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes : null} 
                        name='school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended' 
                        noteName="school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes" 
                        deleteNote={deleteNote} 
                        deleteNestedNote={deleteNestedNote}
                        openEditNote={openEditNote}
                        groupName="school_patient_experience"
                        />
                    </div>
                </>
                )}
            </div>

            

            

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average PCE Hours Accepted Previous Cycle</label>   
                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input} 
                originalInput={newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle} name='school_average_patient_care_experience_hours_accepted_previous_cycle' handleInput={handleInput}
                />
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {openAddNote(e, 'school_patient_experience' ,'school_patient_care_experience_general_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <AddNoteFields 
                isEditMode={newSchool.edited_school_patient_experience.isEditMode} 
                notes={newSchool.edited_school_patient_experience.notes} 
                originalNotes={newSchool.school_patient_experience.school_patient_care_experience_general_notes} 
                name="school_patient_experience"
                noteName="school_patient_care_experience_general_notes"
                deleteNote={deleteNote}
                openEditNote={openEditNote}
                />
            </div>
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} link={newSchool.edited_school_patient_experience.link} input={hasInputs} name='school_patient_experience'
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
        <AddNote groupName={groupName} editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
        )}
        </>
    )
}