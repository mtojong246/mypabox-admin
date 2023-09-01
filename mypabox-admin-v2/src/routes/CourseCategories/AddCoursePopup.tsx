import { CategoryType } from "../../types/categories.types";
import CreatableSelect from 'react-select/creatable';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectCourses } from "../../app/selectors/courses.selectors";
import { addCoursesDoc, addCourseToCategoryDoc } from "../../utils/firebase/firebase.utils";
import { addCourse } from "../../app/slices/courses";
import { addCourseToCategory } from "../../app/slices/categories";

interface SelectType {
    value: string;
    label: string
}

export default function AddCoursePopup({toggleCoursesPopup, category} : { toggleCoursesPopup: () => void, category: CategoryType }) {
    const dispatch: AppDispatch = useDispatch();
    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<SelectType[]>([])
    const [ selection, setSelection ] = useState('');

    useEffect(() => {
        setCourseOptions(courses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses])


    const handleSelection = async () => {
        const courseToBeAdded = courses.find(course => course.course_name === selection)
        const courseExists = category.courses.find(course => course.course_name === selection)
        if (courseToBeAdded && !courseExists) {
            const courseId = courseToBeAdded.unique_id;
            try {
                await addCourseToCategoryDoc(category.id, {
                    unique_id: courseId,
                    course_name: selection,
                    gpa_calculation: '',
                    subject_category: '',
                })
                dispatch(addCourseToCategory({
                    id: category.id,
                    course: {
                        unique_id: courseId,
                        course_name: selection,
                        gpa_calculation: '',
                        subject_category: '',
                    }
                }))
                toggleCoursesPopup();
            } catch (error: any) {
                alert(error)
            }
        } else if (!courseToBeAdded && !courseExists) {
            // Add new course if it doesn't already exist in db
            try {
                const newCourse = await addCoursesDoc({
                    unique_id: '',
                    course_name: selection,
                    gpa_calculation: '',
                    subject_category: '',
                })
                if (newCourse) {
                    dispatch(addCourse(newCourse));
                    await addCourseToCategoryDoc(category.id, {
                        unique_id: newCourse.unique_id,
                        course_name: selection,
                        gpa_calculation: '',
                        subject_category: '',
                    })
                    dispatch(addCourseToCategory({
                        id: category.id,
                        course: {
                            unique_id: newCourse.unique_id,
                            course_name: selection,
                            gpa_calculation: '',
                            subject_category: '',
                        }
                    }))
                    toggleCoursesPopup();
                }
            } catch (error: any) {
                alert(error);
            }
        } else {
            alert('Course already exists');
            return;
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-lg font-medium mb-4'>Add course to "{category.category_name}"</p>
                    <CreatableSelect className="w-full focus:outline-none rounded-lg mb-4"
                    options={courseOptions} value={selection ? {value: selection, label: selection} : null} onChange={(e) => setSelection((e as {value: '', label: ''}).value)}/>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleCoursesPopup} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={handleSelection} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}