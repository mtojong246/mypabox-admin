import { ChangeEvent, useState } from "react"
import { Note, SchoolPrereqRequiredOptionalCourse, SchoolRequiredOptionalCourse } from "../../../../types/schools.types"
import AddCourseToOption from "./AddCourseToOption";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "./AddNote";

const defaultGroup = {
    school_minimum_number_of_courses_to_be_completed: 0,
    school_required_optional_courses_list: [],
    school_optional_course_note_section: [],
}

export default function AddRequiredOptionalCourses({ toggleRequiredOptionalCourses, addOptionalGroup }: { toggleRequiredOptionalCourses: (e:any) => void, addOptionalGroup: (group: SchoolPrereqRequiredOptionalCourse) => void, }) {
    const courses = useSelector(selectCourses)
    const [ group, setGroup ] = useState<SchoolPrereqRequiredOptionalCourse>(defaultGroup);
    const [ coursePopup, setCoursePopup ] = useState(false);
    const [ notePopup, setNotePopup ] = useState(false);

    const toggleCoursePopup = (e:any) => {
        e.preventDefault();
        setCoursePopup(!coursePopup)
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setGroup({
            ...group,
            school_minimum_number_of_courses_to_be_completed: Number(e.target.value),
        })
    }

    const addCourse = (course: SchoolRequiredOptionalCourse) => {
        setGroup({
            ...group,
            school_required_optional_courses_list: group.school_required_optional_courses_list.concat(course)
        })
    }

    const addNote = (note: Note) => {
        setGroup({
            ...group,
            school_optional_course_note_section: group.school_optional_course_note_section.concat(note)
        })
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='relative w-full max-w-[900px] max-h-[800px] overflow-y-scroll rounded-lg p-4 bg-white'>
                        {(coursePopup || notePopup) && <div className='absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 z-10'></div>}
                        <p className='text-xl font-semibold mb-8'>Add Required Optional Group</p>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Minimum number of courses that need to be completed:</label>
                            <input onChange={handleInput} value={group.school_minimum_number_of_courses_to_be_completed} className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Courses:</label>
                            <button onClick={toggleCoursePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${group.school_required_optional_courses_list.length ? 'mt-3' : 'mt-0'}`}>
                            {courses && group.school_required_optional_courses_list.map(course => {
                                const selectedCourse = courses.find(c => c.unique_id === course.school_optional_course_id)
                                if (selectedCourse) {
                                    return (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='font-bold'>{selectedCourse?.course_name}
                                                    <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                        {`(${course.school_optional_course_lab ? 'with lab' : 'without lab'}
                                                        ${!course.school_optional_course_lab && course.school_optional_course_lab_preferred ? ' / lab preferred' : ''}  
                                                        / ${course.school_optional_course_credit_hours} credit hours 
                                                        / ${course.school_optional_course_quarter_hours} quarter hours)`}                                   
                                                    </span>
                                                </p>
                                                <div className='flex gap-2'>
                                                    <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                                    <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                                </div>
                                            </div>
                                            {course.school_optional_course_note_section ? (
                                                <>
                                                    <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                    <ReactQuill theme='bubble' value={course.school_optional_course_note_section} readOnly={true} className='edited-quill'/>
                                                </>
                                            ) : null}
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                            </div>
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Notes:</label>
                            <button onClick={toggleNotePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${group.school_optional_course_note_section.length ? 'mt-3' : 'mt-0'}`}>
                            {group.school_optional_course_note_section.map(note => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='w-full flex justify-end items-center gap-3'>
                            <button onClick={toggleRequiredOptionalCourses} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                            <button onClick={(e) => {toggleRequiredOptionalCourses(e); addOptionalGroup(group)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add Option</button>
                        </div>
                    </div>
                </div>
            </div>
            {coursePopup && <AddCourseToOption toggleCoursePopup={toggleCoursePopup} group={group} addCourse={addCourse}/>}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote}/>}
        </>
    )
}