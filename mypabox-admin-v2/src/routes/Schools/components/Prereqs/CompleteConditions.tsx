import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from "react"
import { School } from "../../../../types/schools.types"
import Select from 'react-select';
import { NumberInput, StringInput, Note } from "../../../../types/schools.types";
import AddNote from "./AddNote";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";

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


export default function CompleteConditions({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
 }) {
    const [ openNote, setOpenNote ] = useState(false);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ index, setIndex ] = useState(0);
    const [ name, setName ] = useState('');
    const [ isIndividual, setIsIndividual ] = useState(false);

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
                    school_maximum_number_of_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_credits_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_science_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_non_science_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_minimum_grade_required_for_pending_courses: {
                        input: '',
                        notes: [],
                    },
                    school_date_pending_courses_must_be_completed: {
                        input: '',
                        notes: [],
                    },
                    school_semester_pending_courses_must_be_completed: {
                        input: '',
                        notes: [],
                    },
                }
            })
        } else {
            const updatedSchool = {...newSchool};
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses;
            delete updatedSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed;
            delete updatedSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed;
            setNewSchool(updatedSchool)
        }
    }, [newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_prerequisite_completion_criteria: {
                ...newSchool.school_prerequisite_completion_criteria,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
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

    }

    const handleSelect = (e:any, name: string) => {
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
    }

    const addNote = (note: Note) => {
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
    }

    const updateNote = (note: Note) => {
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
    }

    const deleteNote = (e:any, index: number, isIndividual: boolean) => {
        e.preventDefault();
        if (isIndividual) {
            const field = newSchool.school_prerequisite_completion_criteria[e.currentTarget.name as keyof object] as StringInput | NumberInput;
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    [e.currentTarget.name]: {
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
    }


    return (
        <>
            <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Completion Criteria</label>   
                <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All Courses Must Be Completed Before Applying</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_all_courses_most_be_completed_before_applying' checked={newSchool.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying ? 'True' : 'False'}</span>
                        </label>
                    </div>
                </div>

                <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? 'border-[#4573D2] border-2' : 'border-[#545454] border'} `}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Courses Can Be In Progress While Applying</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_courses_can_be_in_progress_while_applying' checked={newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? 'True' : 'False'}</span>
                        </label>
                    </div>
                    {newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying && (
                    <>

                        <div className={`mt-8 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Courses Pending While Applying:</label> 
                            <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.input} name='school_maximum_number_of_courses_pending_while_applying' className='mb-2 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_maximum_number_of_courses_pending_while_applying')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_maximum_number_of_courses_pending_while_applying' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Credits Pending While Applying:</label> 
                            <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying?.input} name='school_maximum_number_of_credits_pending_while_applying' className='mb-2 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_credits_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_maximum_number_of_credits_pending_while_applying')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_maximum_number_of_credits_pending_while_applying' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>

                        
                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of SCIENCE Courses Pending While Applying:</label> 
                            <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying?.input} name='school_maximum_number_of_science_courses_pending_while_applying' className='mb-2 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_science_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_maximum_number_of_science_courses_pending_while_applying')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_maximum_number_of_science_courses_pending_while_applying' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of NON-SCIENCE Courses Pending While Applying:</label> 
                            <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying?.input} name='school_maximum_number_of_non_science_courses_pending_while_applying' className='mb-2 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_maximum_number_of_non_science_courses_pending_while_applying')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_maximum_number_of_non_science_courses_pending_while_applying')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_maximum_number_of_non_science_courses_pending_while_applying' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>

                        
                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Grade Required for Pending Courses:</label> 
                            <Select value={newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses?.input ? {value: newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.input, label: newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.input }: null} onChange={(e) => handleSelect(e, 'school_minimum_grade_required_for_pending_courses')} options={options} className="mb-4 w-1/3 focus:outline-none"/>
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_minimum_grade_required_for_pending_courses')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_minimum_grade_required_for_pending_courses')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_minimum_grade_required_for_pending_courses' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Date Pending Courses Must Be Completed:</label> 
                            <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed?.input} name='school_date_pending_courses_must_be_completed' type='date' className='mb-2 w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[58px] text-lg rounded-lg' />  
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_date_pending_courses_must_be_completed')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_date_pending_courses_must_be_completed')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_date_pending_courses_must_be_completed' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Semester Pending Courses Must Be Completed</label> 
                            <Select value={newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed?.input ? {value: newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.input, label: newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.input }: null} onChange={(e) => handleSelect(e, 'school_semester_pending_courses_must_be_completed')} options={semesterOptions} className="mb-4 w-1/3 focus:outline-none"/>
                            <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_semester_pending_courses_must_be_completed')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed?.notes.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed?.notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_semester_pending_courses_must_be_completed')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button name='school_semester_pending_courses_must_be_completed' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>
                    </>
                    )}
                </div>

                <div className='w-full mt-10'>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(false)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(false);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, false); }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {openNote && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}