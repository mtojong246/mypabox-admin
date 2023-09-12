import ReactQuill from "react-quill";
import Select from 'react-select';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import { SchoolPrereqRequiredOptionalCourse, SchoolRequiredOptionalCourse } from "../../../../types/schools.types";
import { Course } from "../../../../types/courses.types";

const defaultCourse = {
    school_optional_course_id: '',
    school_optional_course_lab: false,
    school_optional_course_lab_preferred: false,
    school_optional_course_credit_hours: 0,
    school_optional_course_quarter_hours: 0,
    school_optional_course_note_section: '',
}

export default function AddCourseToOption({ toggleCoursePopup, addCourse, editedCourse, setEditedCourse, updateCourse, group }: { 
    toggleCoursePopup: (e:any) => void, 
    addCourse: (course: SchoolRequiredOptionalCourse) => void, 
    editedCourse: SchoolRequiredOptionalCourse | null,
    setEditedCourse: Dispatch<SetStateAction<SchoolRequiredOptionalCourse | null>>,
    updateCourse: (course: SchoolRequiredOptionalCourse) => void,
    group: SchoolPrereqRequiredOptionalCourse,
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ optionalCourse, setOptionalCourse ] = useState<SchoolRequiredOptionalCourse>(defaultCourse);
    const [ selection, setSelection ] = useState<string | undefined>('');

    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!group.school_required_optional_courses_list.find(c => c.school_optional_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, group.school_required_optional_courses_list])

    useEffect(() => {
        if (selection) {
            const selectedCourse = courses.find(course => course.course_name === selection)
            if (selectedCourse) {
                setOptionalCourse({
                    ...optionalCourse,
                    school_optional_course_id: selectedCourse.unique_id,
                })
            }
        }
    }, [selection, courses])

    useEffect(() => {
        if (editedCourse) {
            const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_optional_course_id)
            if (selectedCourse) {
                setOptionalCourse(editedCourse);
                setSelection(selectedCourse.course_name)
            }
        } else {
            setOptionalCourse(defaultCourse);
            setSelection('')
        }
    }, [editedCourse, courses])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setOptionalCourse({
            ...optionalCourse,
            [e.target.name]: e.target.value, 
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setOptionalCourse({
            ...optionalCourse, 
            [e.target.name]: e.target.checked
        })
    }

    const handleNote = (e: any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        setOptionalCourse({
            ...optionalCourse,
            school_optional_course_note_section: note,
        })
    }

    const addOrUpdateCourse = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!optionalCourse.school_optional_course_id) {
            alert('Please select a course')
        } else {
            if (editedCourse) {
                updateCourse(optionalCourse)
            } else {
                addCourse(optionalCourse)
            }
            toggleCoursePopup(e);
            setEditedCourse(null)
        }
    }


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedCourse ? 'Edit Course from Required Option' : 'Add Course to Required Option'}</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/>
                    </div>
                    <div className='w-full mb-8 flex justify-start items-center gap-10'>
                        <div>
                            <input type='checkbox' onChange={handleCheck} name='school_optional_course_lab' className='mr-2' checked={optionalCourse.school_optional_course_lab ? true : false}/>
                            <label className='font-medium'>With Lab</label>
                        </div>
                        <div>
                            <input type='checkbox' onChange={handleCheck} name='school_optional_course_lab_preferred' className='mr-2' checked={optionalCourse.school_optional_course_lab_preferred ? true : false}/>
                            <label className='font-medium'>Lab Preferred</label>
                        </div>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <input onChange={handleInput} value={optionalCourse.school_optional_course_credit_hours} name='school_optional_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <input onChange={handleInput} value={optionalCourse.school_optional_course_quarter_hours}  name='school_optional_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={optionalCourse.school_optional_course_note_section}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleCoursePopup(e); setEditedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={(e) => addOrUpdateCourse(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>{editedCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                </div>
            </div>
        </div>

    )
}