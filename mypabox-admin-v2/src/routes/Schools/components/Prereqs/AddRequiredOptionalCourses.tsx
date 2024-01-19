import { ChangeEvent, useState, Dispatch, SetStateAction, useEffect } from "react"
import { Note, School } from "../../../../types/schools.types"
import AddCourseToOption from "./AddCourseToOption";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import AddNote from "./AddNote";
import { UserObject } from "../../../../types/users.types";
import InputFields from "../../Assets/InputsFields";
import OptionalCourses from "./OptionalCourses";

const defaultGroup = {
    school_minimum_number_of_courses_to_be_completed: 0,
    school_required_optional_courses_list: [] as {
        school_optional_course_id: string;
        school_optional_course_lab: boolean;
        school_optional_course_lab_preferred: boolean;
        school_optional_course_credit_hours: number;
        school_optional_course_quarter_hours: number;
        school_optional_course_note_section: string;
    }[],
    school_optional_course_note_section: [] as Note[],
}

export default function AddRequiredOptionalCourses({ toggleRequiredOptionalCourses, editedRequiredOption, setEditedRequiredOption, loggedInUser, groupIndex, setGroupIndex, newSchool, setNewSchool, input }: { 
    toggleRequiredOptionalCourses: (e:any) => void, 
    editedRequiredOption: any | null,
    setEditedRequiredOption: Dispatch<SetStateAction<any | null>>,
    loggedInUser: UserObject,
    groupIndex: number | null,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    input: boolean | null,
}) {
    const courses = useSelector(selectCourses)
    const [ group, setGroup ] = useState(defaultGroup);
    const [ editedGroup, setEditedGroup ] = useState<{
        school_minimum_number_of_courses_to_be_completed: number;
        school_required_optional_courses_list: {
            school_optional_course_id: string;
            school_optional_course_lab: boolean;
            school_optional_course_lab_preferred: boolean;
            school_optional_course_credit_hours: number;
            school_optional_course_quarter_hours: number;
            school_optional_course_note_section: string;
            isNew: boolean;
            isCorrect: boolean;
        }[];
        school_optional_course_note_section: Note[];
        isCorrect: boolean;
        isNew: boolean;

    } | null>(null)
    const [ coursePopup, setCoursePopup ] = useState(false);
    const [ notePopup, setNotePopup ] = useState(false);

    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ editedCourse, setEditedCourse ] = useState<any | null>(null)

    // useEffect(() => {
    //     if (editedRequiredOption) {
    //         setGroup(editedRequiredOption)
    //     } else {
    //         setGroup(defaultGroup)
    //     }
    // }, [editedRequiredOption]);

    useEffect(() => {
        if (editedRequiredOption) {
             
            if (input) {
                setEditedGroup(editedRequiredOption);
                const originalInput = newSchool.school_prereq_required_optional_courses;
                const opt = originalInput.find((inp,i) => i === groupIndex);
                if (opt) {
                    setGroup(opt);
                } else {
                    setGroup(defaultGroup)
                }
            } else {
                setGroup(editedRequiredOption);
                setEditedGroup(null)
            }
            
        } else {
            if (input) {
                setEditedGroup({
                    school_minimum_number_of_courses_to_be_completed: 0,
                    school_required_optional_courses_list: [],
                    school_optional_course_note_section: [],
                    isCorrect: true,
                    isNew: true,
                })
                setGroup(defaultGroup)
            } else {
                setGroup(defaultGroup)
            }
            
        }
    }, [editedRequiredOption, input])
    
    const addCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_prereq_required_optional_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_optional_courses: field.concat(group)
            })
        } else {
            const field = newSchool.edited_school_prereq_required_optional_courses;
            editedGroup && setNewSchool({
                ...newSchool,
                edited_school_prereq_required_optional_courses: {
                    ...field,
                    input: field.input!.concat(editedGroup)
                }
            })
        }
        
    }

    const updateCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_required_optional_courses: newSchool.school_prereq_required_optional_courses.map((gro,i) => {
                    if (i === groupIndex) {
                        return { ...group }
                    } else {
                        return { ...gro }
                    }
                })
            })
        } else {
            const field = newSchool.edited_school_prereq_required_optional_courses;
            editedGroup && setNewSchool({
                ...newSchool,
                edited_school_prereq_required_optional_courses: {
                    ...field,
                    input: field.input!.map((gro,i) => {
                        if (i === groupIndex) {
                            return { ...editedGroup }
                        } else {
                            return { ...gro }
                        }
                    })
                }
            })
        }
       
    }

    const toggleCoursePopup = (e:any) => {
        e.preventDefault();
        setCoursePopup(!coursePopup)
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }


    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setGroup({
                ...group,
                school_minimum_number_of_courses_to_be_completed: Number(e.target.value),
            })
        } else {
            editedGroup && setEditedGroup({
                ...editedGroup,
                school_minimum_number_of_courses_to_be_completed: Number(e.target.value),
            })
        }
        
    }

    // const addCourse = (course: SchoolRequiredOptionalCourse) => {
    //     setGroup({
    //         ...group,
    //         school_required_optional_courses_list: group.school_required_optional_courses_list.concat(course)
    //     })
    // }

    // const updateCourse = (course: SchoolRequiredOptionalCourse) => {
    //     setGroup({
    //         ...group,
    //         school_required_optional_courses_list: group.school_required_optional_courses_list.map((c,i) => {
    //             if (i === index) {
    //                 return { ...course }
    //             } else {
    //                 return { ...c }
    //             }
    //         })
    //     })
    //     setIndex(null)
    // }

    const addNote = (note: Note) => {
        setGroup({
            ...group,
            school_optional_course_note_section: group.school_optional_course_note_section.concat(note)
        })
    }

    const updateNote = (note: Note) => {
        setGroup({
            ...group, 
            school_optional_course_note_section: group.school_optional_course_note_section.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            })
        })
        setIndex(null)
    }

    const deleteCourse = (e: any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setGroup({
                ...group,
                school_required_optional_courses_list: group.school_required_optional_courses_list.filter((course, i) => i !== index)
            })
        } else {
            editedGroup && setEditedGroup({
                ...editedGroup,
                school_required_optional_courses_list: isNew ? editedGroup.school_required_optional_courses_list.filter((list,i) => i !== index) : editedGroup.school_required_optional_courses_list.map((list,i) => {
                    if (i === index) {
                        return { ...list, isCorrect: false }
                    } else {
                        return { ...list }
                    }
                })
            })
        }
        
    }

    const undoDelete = (e:any, index: number) => {
        e.preventDefault();
        editedGroup && setEditedGroup({
            ...editedGroup,
            school_required_optional_courses_list: editedGroup.school_required_optional_courses_list.map((list,i) => {
                if (i === index) {
                    return { ...list, isCorrect: false }
                } else {
                    return { ...list }
                }
            })
        })
    }

    const deleteNote = (e: any, index: number) => {
        e.preventDefault();
        setGroup({
            ...group,
            school_optional_course_note_section: group.school_optional_course_note_section.filter((course, i) => i !== index)
        })
    }

    const addOrUpdateGroup = (e:any, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && group.school_required_optional_courses_list.length === 0) {
            alert('Please select add at least one course')
        } else if (input && editedGroup && editedGroup.school_required_optional_courses_list.length === 0) {
            alert('Please select add at least one course')
        } else {
            if (editedRequiredOption) {
                updateCourseOrCategory(isEditedInput)
            } else {
                addCourseOrCategory(isEditedInput)
            }
            toggleRequiredOptionalCourses(e);
            setEditedRequiredOption(null)
        }
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='relative w-full max-w-[900px] max-h-[800px] overflow-y-scroll rounded p-4 bg-white'>
                        {(coursePopup || notePopup) && <div className='absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 z-10'></div>}
                        <p className='text-xl font-semibold mb-8'>{editedRequiredOption ? 'Edit' : 'Add'} Required Optional Group</p>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Minimum number of courses that need to be completed:</label>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedGroup && editedGroup.school_minimum_number_of_courses_to_be_completed} 
                            originalInput={group.school_minimum_number_of_courses_to_be_completed} name='school_minimum_number_of_courses_to_be_completed' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} value={group.school_minimum_number_of_courses_to_be_completed ? group.school_minimum_number_of_courses_to_be_completed : ''} className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Courses:</label>
                            <button onClick={toggleCoursePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <OptionalCourses loggedInUser={loggedInUser} input={editedGroup ? editedGroup.school_required_optional_courses_list : null} originalInput={group.school_required_optional_courses_list} 
                            courses={courses} toggleOptions={toggleCoursePopup} deleteOption={deleteCourse} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} setGroupIndex={setGroupIndex}
                            undoDelete={undoDelete} setEditedOption={setEditedCourse}
                            />
                            {/* <div className={`flex flex-col justify-center items-center gap-3 ${group.school_required_optional_courses_list.length ? 'mt-3' : 'mt-0'}`}>
                            {courses && group.school_required_optional_courses_list.map((course, i) => {
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
                                                    <button onClick={(e) => {toggleCoursePopup(e); setEditedCourse(course); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                                    <button onClick={(e) => deleteCourse(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                            </div> */}
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Notes:</label>
                            <button disabled={loggedInUser.permissions.canVerify ? false : true} onClick={toggleNotePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${group.school_optional_course_note_section.length ? 'mt-3' : 'mt-0'}`}>
                            {group.school_optional_course_note_section.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='w-full flex justify-end items-center gap-3'>
                            <button onClick={(e) => {toggleRequiredOptionalCourses(e); setEditedRequiredOption(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                            <button onClick={(e) => {input ? addOrUpdateGroup(e, true) : addOrUpdateGroup(e, false)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:bg-[#3558A0]'>{editedRequiredOption ? 'Edit' : 'Add'} Option</button>
                        </div>
                    </div>
                </div>
            </div>
            {coursePopup && <AddCourseToOption loggedInUser={loggedInUser} editedGroup={editedGroup} index={index} input={input} setEditedGroup={setEditedGroup} setGroup={setGroup}
             toggleCoursePopup={toggleCoursePopup} editedCourse={editedCourse} setEditedCourse={setEditedCourse} group={group} newSchool={newSchool}/>}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}