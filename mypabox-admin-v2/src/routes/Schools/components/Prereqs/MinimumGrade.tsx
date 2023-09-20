import Select from 'react-select';
import { School } from '../../../../types/schools.types';
import { Dispatch, SetStateAction, useState, useEffect} from 'react';
import AddNote from './AddNote';
import { Note } from '../../../../types/schools.types';
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill';

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

export default function MinimumGrade({ newSchool, setNewSchool }: {  
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
}) {
    const [ selection, setSelection ] = useState('');
    const [ openNote, setOpenNote ] = useState(false);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ index, setIndex ] = useState(0);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setOpenNote(!openNote)
    }

    useEffect(() => {
        setSelection(newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses)
    }, [newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses])

    const handleSelect = (e: any) => {
        const field = newSchool.school_grade_criteria;
        setNewSchool({
            ...newSchool,
            school_grade_criteria: {
                ...field,
                school_minimum_grade_required_for_all_courses: e.value,
            }
        })
    }

    const addNote = (note: Note) => {
        const field = newSchool.school_grade_criteria;
        setNewSchool({
            ...newSchool,
            school_grade_criteria: {
                ...field,
                school_grade_criteria_note_section: field.school_grade_criteria_note_section.concat(note)
            }
        })
    }

    const updateNote = (note: Note) => {
        const field = newSchool.school_grade_criteria;
        setNewSchool({
            ...newSchool,
            school_grade_criteria: {
                ...field,
                school_grade_criteria_note_section: field.school_grade_criteria_note_section.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    }

    const deleteNote = (e:any, index: number) => {
        e.preventDefault();
        const field = newSchool.school_grade_criteria;
        setNewSchool({
            ...newSchool,
            school_grade_criteria: {
                ...field,
                school_grade_criteria_note_section: field.school_grade_criteria_note_section.filter((n,i) => i !== index),
            }
        })
    }

    return (
        <>
        <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum Grade Required for All Courses</label>   
            <Select className="w-1/3 focus:outline-none rounded mb-4" options={options} value={selection ? {value: selection, label: selection} : null} onChange={handleSelect}/>
            <button onClick={toggleNotePopup} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_grade_criteria.school_grade_criteria_note_section.length ? 'mt-3' : 'mt-0'}`}>
            {newSchool.school_grade_criteria.school_grade_criteria_note_section.map((note, i) => (
                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                    <div className='flex justify-between items-center w-full mb-1'>
                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                        <div className='flex gap-2'>
                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        </div>
                    </div>
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
            ))}
            </div>
        </div>
        {openNote && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}