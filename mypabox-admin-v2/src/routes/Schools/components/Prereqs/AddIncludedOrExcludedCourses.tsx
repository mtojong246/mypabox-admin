import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import { selectCategories } from "../../../../app/selectors/categories.selectors";
import Select from 'react-select';
import ReactQuill from "react-quill";
import { Course } from "../../../../types/courses.types";

interface CourseType {
    school_required_course_id: string;
    school_required_course_note: string;
}

const defaultCourse = {
    school_required_course_id: '',
    school_required_course_note: '',
}

export default function AddIncludedOrExcludedCourses({ toggleCoursePopup, excluded, category, addCourseToCategory }: { toggleCoursePopup: (e: any) => void, excluded: boolean, category: string, addCourseToCategory: (course: CourseType, excluded: boolean) => void, }) {
    const courses = useSelector(selectCourses);
    const categories = useSelector(selectCategories);
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ addedCourse, setAddedCourse ] = useState<CourseType>(defaultCourse);
    const [ selection, setSelection ] = useState<string | undefined>('');

    useEffect(() => {
        const selectedCategory = categories.find(c => c.category_name === category);
        if (selectedCategory && excluded) {
            setCourseOptions(selectedCategory.courses.map(course => (
                { value: course.course_name, label: course.course_name }
            )))
        } else if (selectedCategory && !excluded) {
            let filteredCourses = [] as Course[]
            courses.forEach(course => {
                if (!selectedCategory.courses.find(c => c.course_id === course.unique_id)) {
                    filteredCourses.push(course)
                }
            })
            setCourseOptions(filteredCourses.map(course => (
                { value: course.course_name, label: course.course_name }
            )))
        }
    }, [courses, categories, category, excluded])

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

    const handleNote = (e: any) => {
        setAddedCourse({
            ...addedCourse,
            school_required_course_note: e,
        })
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{excluded ? 'Add Excluded Course' : 'Add Included Course'}</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/>
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleCoursePopup} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={(e) => {toggleCoursePopup(e); addCourseToCategory(addedCourse, excluded)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}