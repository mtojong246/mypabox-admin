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
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <div className='absolute top-[-16px] left-[20px] flex justify-between items-center w-full pr-[40px]'>
                <label className="text-xl bg-white">Minimum GPA for Specific Course <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label> 
                <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
            </div>
            
            <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Course Name</label>
                    {/* <div className='flex justify-between items-center'>
                        <label className='text-xl'>Course Name</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div> */}
                    <Select
                    className="w-full focus:outline-none rounded" 
                    onChange={(e) => handleSelect(e, 'courseID', i)}
                    options={courseOptions}
                    value={field.courseID && courseOptions ? { value: field.courseID, label: courseOptions.find(course => course.value === field.courseID)?.label } : null}/>

                </div>
                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Minimum GPA Required</label>
                    <input onChange={(e) => handleObjInput(e, i, 'minimum_gpa_required_for_course')} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded block'
                    value={field.minimum_gpa_required_for_course ? field.minimum_gpa_required_for_course : ''} name='minimum_gpa_required_for_course'/>
                </div>
                <div className='w-full mt-8 mx-4'>
                    <label className='text-xl font-medium'>Notes:</label>
                    <button name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-2 block" 
                    onClick={(e) => {toggleNotePopup(e); setObjIndex(i)}}>
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map((note, index) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded max-w-[900px] mt-3 mx-4'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setObjIndex(i); setIndex(index)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, index)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}

            </>
            {i === newSchool.school_minimum_gpa_for_specific_course.length-1 ? (
            <button className="mx-4 mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={addField}>
                + Add New Field
            </button>
            ) : (
                <div className='w-full mb-5'></div>
            )}
        </div>
        ))}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}