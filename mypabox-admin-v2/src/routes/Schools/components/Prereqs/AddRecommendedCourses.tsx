import Select from 'react-select';
import ReactQuill from "react-quill";
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { School, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourse, SchoolPrereqRequiredCourseCategory, SchoolPrereqRequiredOptionalCourse } from '../../../../types/schools.types';
import { Course } from '../../../../types/courses.types';

const defaultCourse = {
    school_recommended_course_id: '',
    school_recommended_course_lab: false,
    school_recommended_course_lab_preferred: false,
    school_recommended_course_credit_hours: 0,
    school_recommended_course_quarter_hours: 0,
    school_recommended_course_note_section: '',
}

export default function AddRecommendedCourses({ toggleRecommendedCourses, editedRecommendedCourse, setEditedRecommendedCourse, addCourseOrCategory, updateCourseOrCategory, newSchool }: { 
    toggleRecommendedCourses: (e:any) => void,
    editedRecommendedCourse: SchoolPrereqRecommendedCourse | null,
    setEditedRecommendedCourse: Dispatch<SetStateAction<SchoolPrereqRecommendedCourse | null>>,
    addCourseOrCategory: (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => void,
    updateCourseOrCategory: (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => void,
    newSchool: School
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ recommendedCourse, setRecommendedCourse ] = useState<SchoolPrereqRecommendedCourse>(defaultCourse);
    const [ selection, setSelection ] = useState<string | undefined>('');

    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!newSchool.school_prereq_recommended_courses.find(c => c.school_recommended_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, newSchool.school_prereq_recommended_courses])

    useEffect(() => {
        if (selection) {
            const selectedCourse = courses.find(course => course.course_name === selection)
            if (selectedCourse) {
                setRecommendedCourse({
                    ...recommendedCourse,
                    school_recommended_course_id: selectedCourse.unique_id,
                })
            }
        }
    }, [selection, courses])

    useEffect(() => {
        if (editedRecommendedCourse) {
            const selectedCourse = courses.find(course => course.unique_id === editedRecommendedCourse.school_recommended_course_id)
            if (selectedCourse) {
                setRecommendedCourse(editedRecommendedCourse)
                setSelection(selectedCourse.course_name)
            }
        } else {
            setRecommendedCourse(defaultCourse)
            setSelection('')
        }
    }, [editedRecommendedCourse, courses])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRecommendedCourse({
            ...recommendedCourse,
            [e.target.name]: e.target.value, 
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setRecommendedCourse({
            ...recommendedCourse, 
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
        setRecommendedCourse({
            ...recommendedCourse,
            school_recommended_course_note_section: note,
        })
    }

    const addOrEditCourse = (e:any) => {
        e.preventDefault();
        if (!recommendedCourse.school_recommended_course_id) {
            alert('Please select a course')
        } else {
            toggleRecommendedCourses(e);
            if (editedRecommendedCourse) {
                updateCourseOrCategory(recommendedCourse, 'school_prereq_recommended_courses')   
            } else {
                addCourseOrCategory(recommendedCourse, 'school_prereq_recommended_courses')
            }
            setEditedRecommendedCourse(null)
        } 
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedRecommendedCourse ? 'Edit' : 'Add'} Recommended Course</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/>
                    </div>
                    <div className='w-full mb-8 flex justify-start items-center gap-10'>
                        <div>
                            <input type='checkbox' className='mr-2' name='school_recommended_course_lab' onChange={handleCheck} checked={recommendedCourse.school_recommended_course_lab ? true : false}/>
                            <label className='font-medium'>With Lab</label>
                        </div>
                        <div>
                            <input type='checkbox' className='mr-2' name='school_recommended_course_lab_preferred' onChange={handleCheck} checked={recommendedCourse.school_recommended_course_lab_preferred ? true : false}/>
                            <label className='font-medium'>Lab Preferred</label>
                        </div>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <input onChange={handleInput} value={recommendedCourse.school_recommended_course_credit_hours} name='school_recommended_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <input onChange={handleInput} value={recommendedCourse.school_recommended_course_quarter_hours} name='school_recommended_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={recommendedCourse.school_recommended_course_note_section}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleRecommendedCourses(e); setEditedRecommendedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={(e) => addOrEditCourse(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>{editedRecommendedCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}