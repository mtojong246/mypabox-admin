import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react"
import { School, Note } from "../../../../types/schools.types"
import Select from 'react-select';

import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "../Prereqs/AddNote"
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, revertEditGroup, confirmEditGroup, undoEditGroup } from "./ExperienceFunctions";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import SelectInputsFields from "../../Assets/SelectInputsFields";

const options = [
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
    const [ isOpen, setIsOpen ] = useState(false);


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
        if (isGroup) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.concat(note)
                }
            })
        } else {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                    }
                }
            })
        }
    }

    const updateNote = (note: Note) => {
        if (isGroup) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
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
    }

    const deleteNote = (e: any, index: number, name?: string, noteName?: string) => {
        e.preventDefault()
        if (!name && !noteName) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: newSchool.school_patient_experience.school_patient_care_experience_general_notes.filter((n,i) => i !== index)
                }
            })
        } else if (name && noteName) {
            const field = newSchool.school_patient_experience[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                }
            })
        }
    };

    useEffect(() => {
        if (newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input !== null) {
            setHasInputs(true);
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_patient_experience]);

    useEffect(() => {
        if (newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input === null) {
            if (newSchool.school_patient_experience.school_patient_experience_required && newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required && newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed) {
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
    }, [newSchool.edited_school_patient_experience, newSchool.school_patient_experience])

    useEffect(() => {
        if (newSchool.school_patient_experience.school_patient_experience_required) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: {
                        input: newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : 0,
                        school_minimum_patient_care_experience_hours_required_notes: newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes  : [],
                    },
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        input: newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.input ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : [] ,
                    },
                }
            })

            if (newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed) {
                const array = newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: null,
                }
            })
            setSelection({
                number: '',
                duration: ''
            })
        }
    }, [newSchool.school_patient_experience.school_patient_experience_required]);

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
        }
    }, [newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed])


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
    }, [selection])
    
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
                ...selection,
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

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_experience_required: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_patient_experience: {
                    ...newSchool.edited_school_patient_experience,
                    edited_school_patient_experience_required: {
                        ...newSchool.edited_school_patient_experience.edited_school_patient_experience_required,
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
            <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Patient Experience (PCE)<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
            <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_patient_experience.school_patient_experience_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PCE Required</label>  
                <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_patient_experience_required.input}
                originalInput={newSchool.school_patient_experience.school_patient_experience_required} name='school_patient_experience_required' handleCheck={handleCheck}
                /> 
                {/* <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_patient_experience.school_patient_experience_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_patient_experience.school_patient_experience_required ? 'True' : 'False'}</span>
                    </label>
                </div> */}
                {isOpen && (
                <>
                    <div className={`mt-7 mx-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PCE Hours Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_patient_care_experience_hours_required.input}
                            originalInput={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : null} name='school_minimum_patient_care_experience_hours_required' handleInput={handleInputGroup}
                            />
                            {/* <input onChange={handleInput} value={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input : ''} name='school_minimum_patient_care_experience_hours_required' className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_patient_care_experience_hours_required'); setNoteName('school_minimum_patient_care_experience_hours_required_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        {newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required && newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes ? (
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required && newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required && newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.school_minimum_patient_care_experience_hours_required_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_patient_care_experience_hours_required'); setNoteName('school_minimum_patient_care_experience_hours_required_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_minimum_patient_care_experience_hours_required', 'school_minimum_patient_care_experience_hours_required_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>    
                        ) : null}        
                    </div>

                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame PCE Needs To Be Completed</label>   
                        <div className='flex justify-start items-center gap-2'>
                            <SelectInputsFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input} originalInput={newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : null } 
                            name="school_minimum_time_frame_patient_care_experience_needs_to_be_completed" number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} handleInput={handleSelectionNumber} handleSelect={handleSelectDuration} 
                            options={options}
                            />
                            {/* <input onChange={handleSelectionNumber} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={options} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="grow focus:outline-none"/> */}
                            <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed'); setNoteName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>  
                        </div>
                        {newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes ? (
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes.length? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed?.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed'); setNoteName('school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed', 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>    
                        ) : null}      
                    </div>
                </>
                )}
            </div>

            

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average PCE Hours Accepted Previous Cycle</label>   
                <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} input={newSchool.edited_school_patient_experience.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input} 
                originalInput={newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle} name='school_average_patient_care_experience_hours_accepted_previous_cycle' handleInput={handleInput}
                />
                {/* <input onChange={handleInput} value={newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle ? newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />            */}
            </div>

            <div className='w-full mt-8 mb-5'>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_patient_experience.school_patient_care_experience_general_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_patient_experience.school_patient_care_experience_general_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e) => {deleteNote(e, i)}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>
            </div>
        </div>
        {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_patient_experience.isEditMode} link={newSchool.edited_school_patient_experience.link} input={hasInputs} name='school_patient_experience'
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}