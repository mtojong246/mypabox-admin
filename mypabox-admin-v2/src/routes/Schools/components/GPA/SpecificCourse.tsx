import { School, Note, MinimumGpaSpecificCourse } from "../../../../types/schools.types"
import { MouseEvent, SetStateAction, ChangeEvent, useState, useEffect, Dispatch } from "react"
import Select from 'react-select';
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

import AddNote from "../Prereqs/AddNote";

const specificCourseDefault = {
    minimum_gpa_required_for_course: 0,
    courseID: "",
    notes: [],
}

export default function SpecificCourse({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {

    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        const options = courses.map(course => (
            { value: course.unique_id, label: course.course_name }
        ))
        setCourseOptions(options)
    }, [courses]);

    const [index, setIndex] = useState<number | null>(null);
    const [objIndex, setObjIndex] = useState(0)
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    const addField = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedField = newSchool.school_minimum_gpa_for_specific_course.concat(specificCourseDefault);
        setNewSchool({
            ...newSchool,
            school_minimum_gpa_for_specific_course: updatedField,
        })
    }

    // Deletes specific field from objects 
    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const updatedField = newSchool.school_minimum_gpa_for_specific_course.filter((field, i)=> i !== index);
        setNewSchool({
            ...newSchool,
            school_minimum_gpa_for_specific_course: updatedField,
        })
    }

    const handleSelect = (e: any, name: string, index: number) => {
        const objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj,i) => i === index) as MinimumGpaSpecificCourse;
        const updatedObj = {
            ...objToBeUpdated,
            [name]: e.value,
        }
        setNewSchool({
            ...newSchool,
            school_minimum_gpa_for_specific_course: newSchool.school_minimum_gpa_for_specific_course.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })
    };

    const handleObjInput = (e: ChangeEvent<HTMLInputElement>, index: number, name: string) => {
        const value = e.target.value;
        const objToBeUpdated = newSchool.school_minimum_gpa_for_specific_course.find((obj,i) => i === index) as MinimumGpaSpecificCourse;

        const updatedObj = {
            ...objToBeUpdated,
            [name]: value,
        }
        setNewSchool({
            ...newSchool,
            school_minimum_gpa_for_specific_course: newSchool.school_minimum_gpa_for_specific_course.map((field, i) => {
                if (i === index) {
                    return updatedObj;
                } else {
                    return field;
                }
            }) 
        })

    };

    const addNote = (note: Note) => {
        const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

        const currentField = newSchool.school_minimum_gpa_for_specific_course
            const updatedObj = { ...obj, notes: obj.notes.concat(note) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: updatedField,
            })
            
        }

    const updateNote = (note: Note) => {
        const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

        const currentField = newSchool.school_minimum_gpa_for_specific_course
            const updatedObj = { ...obj, notes: obj.notes.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            }) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: updatedField,
            })
            
    };

    const deleteNote = (e: any, objIndex: number, index: number) => {
        const obj = newSchool.school_minimum_gpa_for_specific_course.find((obj, i) => i === objIndex) as MinimumGpaSpecificCourse;

        const currentField = newSchool.school_minimum_gpa_for_specific_course
            const updatedObj = { ...obj, notes: obj.notes.filter((n,i) => i !== index) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } 
                return field;
            })
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_for_specific_course: updatedField,
            })
            
    }


    return (
        <>
        {newSchool.school_minimum_gpa_for_specific_course.map((field, i) => (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA for Specific Course <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label>
            
            <>
                <div className={`w-full mt-4`}>
                    <div className='flex justify-between items-center'>
                        <label className='text-xl'>Course Name</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <Select
                    className="w-full focus:outline-none rounded mt-3" 
                    onChange={(e) => handleSelect(e, 'courseID', i)}
                    options={courseOptions}
                    value={field.courseID && courseOptions ? { value: field.courseID, label: courseOptions.find(course => course.value === field.courseID)?.label } : null}/>

                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Required:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'minimum_gpa_required_for_course')} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded mt-3 block'
                    value={field.minimum_gpa_required_for_course} name='minimum_gpa_required_for_course'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block" 
                    onClick={(e) => {toggleNotePopup(e); setObjIndex(i)}}>
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map((note, index) => (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded border border-black">
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                            <button value='school_minimum_gpa_for_specific_course' onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setObjIndex(i); setIndex(index)}} ><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-[#4573D2] text-white'/></button>
                            <button value='school_minimum_gpa_for_specific_course' onClick={(e:any) => deleteNote(e, i, index)} ><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                ))}

            </>
            {i === newSchool.school_minimum_gpa_for_specific_course.length-1 && (
            <button className="mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={addField}>
                + Add New Field
            </button>
            )}
        </div>
        ))}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}