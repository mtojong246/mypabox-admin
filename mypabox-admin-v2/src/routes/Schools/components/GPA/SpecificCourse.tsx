import { School, Note } from "../../../../types/schools.types"
import { MouseEvent, SetStateAction, ChangeEvent, useState, useEffect, Dispatch } from "react"
import Select from 'react-select';
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function SpecificCourse({ newSchool, deleteField, handleSelect, handleObjInput, addField, toggleNote, setKeyAndIndex, toggleDelete, setNoteIndex, setCurrentNote } : {
    newSchool: School,
    deleteField: (e: MouseEvent<HTMLButtonElement>, index: number, key: string) => void,
    addField: (e: MouseEvent<HTMLButtonElement>, key: string) => void,
    handleSelect: (e: any, name: string, index: number, key: string) => void,
    handleObjInput: (e: ChangeEvent<HTMLInputElement>, index: number, key: string, name: string) => void,
    toggleNote: (e: any, edit: boolean) => void,
    setKeyAndIndex: (key: string, index: number) => void,
    toggleDelete: (e: MouseEvent<HTMLButtonElement>, i: number) => void,
    setNoteIndex: Dispatch<SetStateAction<number>>,
    setCurrentNote: Dispatch<SetStateAction<Note>>,

}) {

    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        const options = courses.map(course => (
            { value: course.unique_id, label: course.course_name }
        ))
        setCourseOptions(options)
    }, [courses]);


    return (
        <>
        {newSchool.school_minimum_gpa_for_specific_course.map((field, i) => (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border py-5 px-8 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum GPA for Specific Course <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label>
            
            <>
                <div className={`w-full mt-4`}>
                    <div className='flex justify-between items-center'>
                        <label className='text-xl'>Course Name</label>
                        <button onClick={(e) => deleteField(e,i, 'school_minimum_gpa_for_specific_course')} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <Select
                    className="w-full focus:outline-none rounded-lg mt-3" 
                    onChange={(e) => handleSelect(e, 'courseID', i, 'school_minimum_gpa_for_specific_course')}
                    options={courseOptions}
                    value={field.courseID && courseOptions ? { value: field.courseID, label: courseOptions.find(course => course.value === field.courseID)?.label } : null}/>

                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Required:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'school_minimum_gpa_for_specific_course', 'minimum_gpa_required_for_course')} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block'
                    value={field.minimum_gpa_required_for_course} name='minimum_gpa_required_for_course'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block" 
                    onClick={(e) => {toggleNote(e, false); setKeyAndIndex('school_minimum_gpa_for_specific_course', i)}}>
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map((note, index) => (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded-md border border-black">
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                            <button value='school_minimum_gpa_for_specific_course' onClick={(e) => {toggleNote(e, true); setNoteIndex(index); setCurrentNote(note); setKeyAndIndex('school_minimum_gpa_for_specific_course', i)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                            <button value='school_minimum_gpa_for_specific_course' onClick={(e) => {toggleDelete(e, index); setKeyAndIndex('school_minimum_gpa_for_specific_course', i)}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                ))}

            </>
            {i === newSchool.school_minimum_gpa_for_specific_course.length-1 && (
            <button className="mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={(e) => addField(e, 'school_minimum_gpa_for_specific_course')}>
                + Add New Field
            </button>
            )}
        </div>
        ))}
        </>
    )
}