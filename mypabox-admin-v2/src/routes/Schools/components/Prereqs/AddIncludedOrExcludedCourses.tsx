import { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from "react"
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import { selectCategories } from "../../../../app/selectors/categories.selectors";
import Select from 'react-select';
import ReactQuill from "react-quill";
import { Course } from "../../../../types/courses.types";
import { SchoolPrereqRequiredCourseCategory } from "../../../../types/schools.types";
import { CategoryCourse } from "../../../../types/categories.types";

interface CourseType {
    school_required_course_id: string;
    school_required_course_note: string;
}

const defaultCourse = {
    school_required_course_id: '',
    school_required_course_note: '',
}

export default function AddIncludedOrExcludedCourses({ toggleCoursePopup, excluded, category, addCourseToCategory, updateCourseFromCategory, editedCourse, setEditedCourse, requiredCategory }: { 
    toggleCoursePopup: (e: any) => void, 
    excluded: boolean, category: string, 
    addCourseToCategory: (course: CourseType, excluded: boolean) => void, 
    updateCourseFromCategory: (course: CourseType, excluded: boolean) => void,
    editedCourse: CourseType | null,
    setEditedCourse: Dispatch<SetStateAction<CourseType | null>>,
    requiredCategory: SchoolPrereqRequiredCourseCategory
}) {
    const courses = useSelector(selectCourses);
    const categories = useSelector(selectCategories);
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ addedCourse, setAddedCourse ] = useState<CourseType>(defaultCourse);
    const [ selection, setSelection ] = useState<string | undefined>('');

    useEffect(() => {
        const selectedCategory = categories.find(c => c.category_name === category);
        if (selectedCategory && excluded) {
            let filteredCourses = [] as CategoryCourse[];
            selectedCategory.courses.forEach(course => {
                if (!requiredCategory.school_required_course_category_excluded_courses.find(c => c.school_required_course_id === course.course_id)) {
                    filteredCourses.push(course)
                }
            })
            setCourseOptions(filteredCourses.map(course => (
                { value: course.course_name, label: course.course_name }
            )))
        } else if (selectedCategory && !excluded) {
            let filteredCourses = [] as Course[]
            courses.forEach(course => {
                if (!selectedCategory.courses.find(c => c.course_id === course.unique_id) && !requiredCategory.school_required_course_category_extra_included_courses.find(c => c.school_required_course_id === course.unique_id)) {
                    filteredCourses.push(course)
                }
            })
            setCourseOptions(filteredCourses.map(course => (
                { value: course.course_name, label: course.course_name }
            )))
        }
    }, [courses, categories, category, excluded, requiredCategory.school_required_course_category_excluded_courses, requiredCategory.school_required_course_category_extra_included_courses])

    useEffect(() => {
        if (selection) {
            const selectedCourse = courses.find(course => course.course_name === selection)
            if (selectedCourse) {
                setAddedCourse({
                    ...addedCourse,
                    school_required_course_id: selectedCourse.unique_id,
                })
            }
        }
    }, [selection, courses])

    useEffect(() => {
        if (editedCourse) {
            const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_required_course_id)
            if (selectedCourse) {
                setAddedCourse(editedCourse)
                setSelection(selectedCourse.course_name)
            }
        } else {
            setAddedCourse(defaultCourse)
            setSelection('')
        }
    }, [editedCourse])


    const handleNote = (e: any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        setAddedCourse({
            ...addedCourse,
            school_required_course_note: note,
        })
    }

    const addOrEditCourse = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!addedCourse.school_required_course_id) {
            alert('Please select a course')
        } else {
            if (editedCourse) {
                updateCourseFromCategory(addedCourse, excluded)
            } else {
                addCourseToCategory(addedCourse, excluded)
            }
            setEditedCourse(null)
            toggleCoursePopup(e);
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{excluded && editedCourse ? 'Edit Excluded Course' : !excluded && editedCourse ? 'Edit Included Course' : excluded && !editedCourse ? 'Add Excluded Course' : 'Add Included Course'}</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/>
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={addedCourse.school_required_course_note}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleCoursePopup(e); setEditedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => addOrEditCourse(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedCourse ? 'Edit course' : 'Add course'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}