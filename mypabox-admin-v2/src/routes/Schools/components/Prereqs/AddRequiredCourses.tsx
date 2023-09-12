import Select from 'react-select';
import ReactQuill from "react-quill";
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { SchoolPrereqRequiredCourse, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourseCategory, SchoolPrereqRequiredOptionalCourse, School } from '../../../../types/schools.types';
import { Course } from '../../../../types/courses.types';

const defaultCourse = {
    school_required_course_id: '',
    school_required_course_lab: false,
    school_required_course_lab_preferred: false,
    school_required_course_credit_hours: 0,
    school_required_course_quarter_hours: 0,
    school_required_course_note_section: '',
}

export default function AddRequiredCourses({ toggleRequiredCourses, editedRequiredCourse, setEditedRequiredCourse, addCourseOrCategory, updateCourseOrCategory, newSchool }: { 
    toggleRequiredCourses: (e:any) => void, 
    editedRequiredCourse: SchoolPrereqRequiredCourse | null,
    setEditedRequiredCourse: Dispatch<SetStateAction<SchoolPrereqRequiredCourse | null>>,
    addCourseOrCategory: (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => void,
    updateCourseOrCategory: (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => void,
    newSchool: School
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ requiredCourse, setRequiredCourse ] = useState<SchoolPrereqRequiredCourse>({} as SchoolPrereqRequiredCourse);
    const [ selection, setSelection ] = useState<string | undefined>('');

    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!newSchool.school_prereq_required_courses.find(c => c.school_required_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, newSchool.school_prereq_required_courses])

    console.log(courseOptions)

    useEffect(() => {
        if (selection) {
            const selectedCourse = courses.find(course => course.course_name === selection)
            if (selectedCourse) {
                setRequiredCourse({
                    ...requiredCourse,
                    school_required_course_id: selectedCourse.unique_id,
                })
            }
        }
    }, [selection, courses])

    useEffect(() => {
        
        if (editedRequiredCourse) {
            const selectedCourse = courses.find(course => course.unique_id === editedRequiredCourse.school_required_course_id)
            if (selectedCourse) {
                setRequiredCourse(editedRequiredCourse);
                setSelection(selectedCourse.course_name)
            }
        } else {
            setRequiredCourse(defaultCourse)
            setSelection('')
        }
    }, [editedRequiredCourse, courses])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRequiredCourse({
            ...requiredCourse,
            [e.target.name]: e.target.value, 
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setRequiredCourse({
            ...requiredCourse, 
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
        setRequiredCourse({
            ...requiredCourse,
            school_required_course_note_section: note,
        })
    }

    const addOrEditCourse = (e:any) => {
        e.preventDefault();
        if (!requiredCourse.school_required_course_id) {
            alert('Please select a course')
        } else {
            toggleRequiredCourses(e);
            if (editedRequiredCourse) {
                updateCourseOrCategory(requiredCourse, 'school_prereq_required_courses')     
            } else {
                addCourseOrCategory(requiredCourse, 'school_prereq_required_courses')
            }
            setEditedRequiredCourse(null)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedRequiredCourse ? 'Edit' : 'Add'} Required Course</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/>
                    </div>
                    <div className='w-full mb-8 flex justify-start items-center gap-10'>
                        <div>
                            <input type='checkbox' name='school_required_course_lab' className='mr-2' onChange={handleCheck} checked={requiredCourse.school_required_course_lab ? true : false}/>
                            <label className='font-medium'>With Lab</label>
                        </div>
                        <div>
                            <input type='checkbox' name='school_required_course_lab_preferred' className='mr-2' onChange={handleCheck} checked={requiredCourse.school_required_course_lab_preferred ? true : false}/>
                            <label className='font-medium'>Lab Preferred</label>
                        </div>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <input onChange={handleInput} value={requiredCourse.school_required_course_credit_hours} name='school_required_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <input onChange={handleInput} value={requiredCourse.school_required_course_quarter_hours} name='school_required_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={requiredCourse.school_required_course_note_section}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleRequiredCourses(e); setEditedRequiredCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={(e) => addOrEditCourse(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>{editedRequiredCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}