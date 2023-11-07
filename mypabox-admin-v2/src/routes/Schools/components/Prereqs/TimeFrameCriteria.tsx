import Select from 'react-select';
import { School, StringInput } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Note } from '../../../../types/schools.types';
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill';
import AddNote from './AddNote';

const options = [
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function TimeFrameCriteria({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
 }) {
    const [ allSelection, setAllSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ scienceSelection, setScienceSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ mathSelection, setMathSelection ] = useState({
        number: '',
        duration: '',
    });
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
        let selection = {
            number: '',
            duration: '',
        };
        if (name === 'school_time_frame_all_courses_must_be_completed') {
            selection = allSelection;
        } else if (name === 'school_time_frame_science_courses_must_be_completed') {
            selection = scienceSelection;
        } else {
            selection = mathSelection;
        }
        const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
        setNewSchool({
            ...newSchool,
            school_time_frame_criteria: {
                ...newSchool.school_time_frame_criteria,
                [name]: {
                    ...field,
                    input: selection.number + ' ' + selection.duration,
                }
            }
        })
    }, [allSelection, mathSelection, scienceSelection])


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'school_time_frame_all_courses_must_be_completed') {
            setAllSelection({
                ...allSelection,
                number: e.target.value.toString().trim()
            })
        } else if (e.target.name === 'school_time_frame_science_courses_must_be_completed') {
            setScienceSelection({
                ...scienceSelection,
                number: e.target.value.toString().trim()
            })
        } else {
            setMathSelection({
                ...mathSelection,
                number: e.target.value.toString().trim()
            })
        }
    }

    const handleSelect = (e:any, name: string) => {
        if (name === 'school_time_frame_all_courses_must_be_completed') {
            setAllSelection({
                ...allSelection,
                duration: e.value,
            })
        } else if (name === 'school_time_frame_science_courses_must_be_completed') {
            setScienceSelection({
                ...scienceSelection,
                duration: e.value, 
            })
        } else {
            setMathSelection({
                ...mathSelection,
                duration: e.value,
            })
        }
    }

    const addNote = (note: Note) => {
        if (isIndividual) {
            const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    [name]: {
                        ...field,
                        notes: field.notes.concat(note)
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.concat(note)
                }
            })
        }
    }

    const updateNote = (note: Note) => {
        if (isIndividual) {
            const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
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
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.map((n,i) => {
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
            const field = newSchool.school_time_frame_criteria[e.currentTarget.name as keyof object] as StringInput;
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    [e.currentTarget.name]: {
                        ...field,
                        notes: field.notes.filter((n,i) => i !== index)
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    school_time_frame_criteria_note_section: newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.filter((n,i) => i !== index)
                }
            })
        }
    }


    return (
        <>
            <div className={`mt-28 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Time Frame Criteria</label>   
                <div className={`mt-7 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All Courses Must Be Completed Within:</label> 
                    <div className='flex justify-start items-center gap-3'>
                        <input onChange={(e) => {handleInput(e); setName('school_time_frame_all_courses_must_be_completed')}} name='school_time_frame_all_courses_must_be_completed' value={allSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                        <Select options={options} value={allSelection.duration ? {value: allSelection.duration, label: allSelection.duration} : null} onChange={(e) => {handleSelect(e, 'school_time_frame_all_courses_must_be_completed'); setName('school_time_frame_all_courses_must_be_completed')}} className="grow focus:outline-none"/>
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_all_courses_must_be_completed')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_time_frame_all_courses_must_be_completed')}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button name='school_time_frame_all_courses_must_be_completed' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>
                </div>


                <div className={`mt-12 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All SCIENCE Courses Must Be Completed Within:</label> 
                    <div className='flex justify-start items-center gap-3'>
                        <input onChange={(e) => {handleInput(e); setName('school_time_frame_science_courses_must_be_completed')}} name='school_time_frame_science_courses_must_be_completed' value={scienceSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                        <Select options={options} value={scienceSelection.duration ? {value: scienceSelection.duration, label: scienceSelection.duration} : null} onChange={(e) => {handleSelect(e, 'school_time_frame_science_courses_must_be_completed'); setName('school_time_frame_science_courses_must_be_completed')}}  className="grow focus:outline-none"/>
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_science_courses_must_be_completed')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_time_frame_science_courses_must_be_completed')}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button name='school_time_frame_science_courses_must_be_completed' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>
                </div>


                <div className={`mt-12 relative w-full border-2 p-5 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">All MATH Courses Must Be Completed Within:</label> 
                    <div className='flex justify-start items-center gap-3'>
                        <input onChange={(e) => {handleInput(e); setName('school_time_frame_math_courses_must_be_completed')}} name='school_time_frame_math_courses_must_be_completed' value={mathSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                        <Select options={options} value={mathSelection.duration ? {value: mathSelection.duration, label: mathSelection.duration} : null} onChange={(e) => {handleSelect(e, 'school_time_frame_math_courses_must_be_completed'); setName('school_time_frame_math_courses_must_be_completed')}} className="grow focus:outline-none"/>
                        <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(true); setName('school_time_frame_math_courses_must_be_completed')}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(true); setName('school_time_frame_math_courses_must_be_completed')}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button name='school_time_frame_math_courses_must_be_completed' onClick={(e) => {deleteNote(e, i, true); }}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>
                </div>


                <div className='w-full mt-8 mb-5'>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={(e) => {toggleNotePopup(e); setIsIndividual(false)}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note); setIsIndividual(false);}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, false); }}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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