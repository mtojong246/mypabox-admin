import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react"
import { School } from "../../../../types/schools.types"
import { NumberInput, StringInput, Note } from "../../../../types/schools.types";
import AddNote from "./AddNote";
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from './CriteriaFunctions';
import LinkPopup from '../../LinkPopup';
import { UserObject } from '../../../../types/users.types';
import EditButtons from '../../Assets/EditButtons';
import SelectFieldsGroup from '../../Assets/SelectFieldsGroup';
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import AddNoteFields from "../../Assets/AddNoteFields";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";

const options = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
]

const semesterOptions = [
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Summer', label: 'Summer' }
]


export default function CompleteConditions({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
 }) {
    const [ openNote, setOpenNote ] = useState(false);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ index, setIndex ] = useState<number | null>(0);
    const [ name, setName ] = useState('');
    const [ isIndividual, setIsIndividual ] = useState<boolean | undefined>(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        if (newSchool.edited_school_prerequisite_completion_criteria.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null);
        }
    }, [newSchool.edited_school_prerequisite_completion_criteria.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setOpenNote(!openNote)
    }
    

    useEffect(() => {
        if (newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying) {
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    school_maximum_number_of_courses_pending_while_applying: newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying : {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_credits_pending_while_applying: newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying : {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_science_courses_pending_while_applying: newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying : {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_non_science_courses_pending_while_applying: newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying : {
                        input: 0,
                        notes: [],
                    },
                    school_minimum_grade_required_for_pending_courses: newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses ?  newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses : {
                        input: '',
                        notes: [],
                    },
                    school_date_pending_courses_must_be_completed: newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed ?  newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed : {
                        input: '',
                        notes: [],
                    },
                    school_semester_pending_courses_must_be_completed: newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed ? newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed : {
                        input: '',
                        notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    school_maximum_number_of_courses_pending_while_applying: null,
                    school_maximum_number_of_credits_pending_while_applying: null,
                    school_maximum_number_of_science_courses_pending_while_applying: null,
                    school_maximum_number_of_non_science_courses_pending_while_applying: null,
                    school_minimum_grade_required_for_pending_courses: null,
                    school_date_pending_courses_must_be_completed: null,
                    school_semester_pending_courses_must_be_completed: null,
                }
            })
        }
    }, [newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying]);

    useEffect(() => {
        if (newSchool.edited_school_prerequisite_completion_criteria.edited_school_courses_can_be_in_progress_while_applying.input === null) {
            if (newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        } else {
            if (newSchool.edited_school_prerequisite_completion_criteria.edited_school_courses_can_be_in_progress_while_applying.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }
    }, [newSchool.edited_school_prerequisite_completion_criteria, newSchool.school_prerequisite_completion_criteria])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                edited_school_prerequisite_completion_criteria: {
                    ...newSchool.edited_school_prerequisite_completion_criteria,
                    [name]: {
                        ...newSchool.edited_school_pa_shadowing_required[name as keyof object] as {input: boolean | null, prev: boolean | null},
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof object;
            const field = newSchool.school_prerequisite_completion_criteria[name] as NumberInput | StringInput;
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                edited_school_prerequisite_completion_criteria : {
                    ...newSchool.edited_school_prerequisite_completion_criteria,
                    [name]: {
                        ...newSchool.edited_school_prerequisite_completion_criteria[name as keyof object] as {input: number | string | null, prev: number | string | null},
                        input: e.target.value,
                    }
                }
            })
        }
        

    }

    const handleSelect = (e:any, name: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_prerequisite_completion_criteria[name as keyof object] as StringInput;
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    [name]: {
                        ...field,
                        input: e.value,
                    }
                }
            })
        } else {
            const edited = `edited_${name}`;
            setNewSchool({
                ...newSchool,
                edited_school_prerequisite_completion_criteria: {
                    ...newSchool.edited_school_prerequisite_completion_criteria,
                    [edited]: {
                        ...newSchool.edited_school_prerequisite_completion_criteria[edited as keyof object] as {input: string | null, prev: string | null},
                        input: e.value,
                    }
                }
            })
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            if (isIndividual) {
                const field = newSchool.school_prerequisite_completion_criteria[name as keyof object] as StringInput | NumberInput;
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.concat(note)
                        }
                        
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        school_prerequisite_completion_criteria_note_section: newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section.concat(note)
                    }
                })
            }
        } else {
            if (isIndividual) {
                const field = newSchool.edited_school_prerequisite_completion_criteria[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes ? field.notes.concat(note) : [note]
                        }
                        
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
                        notes: newSchool.edited_school_prerequisite_completion_criteria.notes!.concat(note)
                    }
                })
            }
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canAddOrDelete) {
            if (isIndividual) {
                const field = newSchool.school_prerequisite_completion_criteria[name as keyof object] as StringInput | NumberInput;
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.map((n,i) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        school_prerequisite_completion_criteria_note_section: newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section.map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            }
        } else {
            if (isIndividual) {
                const field = newSchool.edited_school_prerequisite_completion_criteria[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
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
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
                        notes: newSchool.edited_school_prerequisite_completion_criteria.notes!.map((n,i) => {
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
        
    }

    const deleteNote = (e:any, index: number, name: string, noteName?:string, isIndividual?: boolean) => {
        e.preventDefault();
        if (loggedInUser.permissions.canAddOrDelete) {
            if (isIndividual) {
                const field = newSchool.school_prerequisite_completion_criteria[name as keyof object] as StringInput | NumberInput;
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        [name]: {
                            ...field,
                            notes: field.notes.filter((n,i) => i !== index)
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_prerequisite_completion_criteria: {
                        ...newSchool.school_prerequisite_completion_criteria,
                        school_prerequisite_completion_criteria_note_section: newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section.filter((n,i) => i !== index)
                    }
                })
            }
        } else {
            if (isIndividual) {
                const field = newSchool.edited_school_prerequisite_completion_criteria[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.filter((n:any,i:number) => i !== index)
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    edited_school_prerequisite_completion_criteria: {
                        ...newSchool.edited_school_prerequisite_completion_criteria,
                        notes: newSchool.edited_school_prerequisite_completion_criteria.notes!.filter((n,i) => i !== index)
                    }
                })
            }
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

    console.log(newSchool.edited_school_prerequisite_completion_criteria)

    return (
        <>
        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_prerequisite_completion_criteria.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} />
            <Indicator label="Completion Conditions" editedInput={newSchool.edited_school_prerequisite_completion_criteria.input} />
                <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All Courses Must Be Completed Before Applying</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_all_courses_most_be_completed_before_applying.input}
                    originalInput={newSchool.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying} name='school_all_courses_most_be_completed_before_applying' handleCheck={handleCheck}
                    />
                 
                </div>

                <div className={`mt-12 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? 'border-[#4573D2]' : 'border-[#545454]'} `}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Courses Can Be In Progress While Applying</label>  
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_courses_can_be_in_progress_while_applying.input}
                    originalInput={newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying} name='school_courses_can_be_in_progress_while_applying' handleCheck={handleCheck}
                    /> 
                  
                    {isOpen && (
                    <>

                        <div className={`mt-7 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Courses Pending While Applying:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_courses_pending_while_applying.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.input : null} name="school_maximum_number_of_courses_pending_while_applying"
                                handleInput={handleInput}
                                />
                                {/* <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.input ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.input : ''} name='school_maximum_number_of_courses_pending_while_applying' className=' grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                           
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_courses_pending_while_applying.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.notes : null} name='school_maximum_number_of_courses_pending_while_applying' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>


                        <div className={`mt-12 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Credits Pending While Applying:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_credits_pending_while_applying.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.input : null} name='school_maximum_number_of_credits_pending_while_applying'
                                handleInput={handleInput}
                                />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_credits_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                           
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_credits_pending_while_applying.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.notes : null} name='school_maximum_number_of_credits_pending_while_applying' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>

                        
                        <div className={`mt-12 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of SCIENCE Courses Pending While Applying:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_science_courses_pending_while_applying.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.input : null}
                                name='school_maximum_number_of_science_courses_pending_while_applying' handleInput={handleInput}
                                />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_science_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                           
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_science_courses_pending_while_applying.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.notes : null} name='school_maximum_number_of_science_courses_pending_while_applying' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>


                        <div className={`mt-12 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of NON-SCIENCE Courses Pending While Applying:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.input : null}
                                 name='school_maximum_number_of_non_science_courses_pending_while_applying' handleInput={handleInput}
                                 />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_non_science_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                           
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying ? newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.notes : null} name='school_maximum_number_of_non_science_courses_pending_while_applying' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>

                        
                        <div className={`mt-12 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Grade Required for Pending Courses:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <SelectFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_minimum_grade_required_for_pending_courses.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses ? newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.input : null} name='school_minimum_grade_required_for_pending_courses'
                                options={options} handleSelect={handleSelect} category="school_minimum_grade_required_for_pending_courses"
                                />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_minimum_grade_required_for_pending_courses')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                            
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_minimum_grade_required_for_pending_courses.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses ? newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.notes : null} name='school_minimum_grade_required_for_pending_courses' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>


                        <div className={`mt-12 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Date Pending Courses Must Be Completed:</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_date_pending_courses_must_be_completed.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed ? newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.input : null} name='school_date_pending_courses_must_be_completed' 
                                handleInput={handleInput}
                                />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_date_pending_courses_must_be_completed')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                          
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_date_pending_courses_must_be_completed.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed ? newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.notes : null} name='school_date_pending_courses_must_be_completed' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>


                        <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Semester Pending Courses Must Be Completed</label> 
                            <div className='flex justify-start items-start gap-3'>
                                <SelectFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} input={newSchool.edited_school_prerequisite_completion_criteria.edited_school_semester_pending_courses_must_be_completed.input}
                                originalInput={newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed ? newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.input : null} name='school_semester_pending_courses_must_be_completed'
                                category="school_semester_pending_courses_must_be_completed" handleSelect={handleSelect} options={semesterOptions}
                                />
                                <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_semester_pending_courses_must_be_completed')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                           
                            <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.edited_school_semester_pending_courses_must_be_completed.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed ? newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.notes : null} name='school_semester_pending_courses_must_be_completed' isIndividual={true} toggleNotePopup={toggleNotePopup}
                            deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                            />
                        </div>
                    </>
                    )}
                </div>

                <div className='w-full mt-8 mb-5'>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(false)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode} notes={newSchool.edited_school_prerequisite_completion_criteria.notes} originalNotes={newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section} name='school_prerequisite_completion_criteria_note_section' isIndividual={false} toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote} setIsIndividual={setIsIndividual}
                    />
                </div>
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_prerequisite_completion_criteria.input} isEditMode={newSchool.edited_school_prerequisite_completion_criteria.isEditMode}
            name='school_prerequisite_completion_criteria' toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prerequisite_completion_criteria.link} setLinkObj={setLinkObj}
            enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {openNote && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}