import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Course } from "../../types/courses.types";
import Select from 'react-select';
import { CategoryType } from "../../types/categories.types";
import { useDispatch } from "react-redux";
import { addCoursesDoc, addCourseToCategoryDoc } from "../../utils/firebase/firebase.utils";
import { addCourse } from "../../app/slices/courses";
import { addCourseToCategory } from "../../app/slices/categories";

const gpa = [
    { value: 'Science', label: 'Science' },
    { value: 'Non-Science', label: 'Non-Science' },
]

const science = [
    { value: 'Biology/Zoology', label: 'Biology/Zoology' },
    { value: 'Inorganic Chemistry', label: 'Inorganic Chemistry' },
    { value: 'Biochemistry', label: 'Biochemistry' },
    { value: 'Organic Chemistry', label: 'Organic Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Other Science', label: 'Other Science' },
]

const nonScience = [
    { value: 'English', label: 'English' },
    { value: 'Math', label: 'Math' },
    { value: 'Social/Behavioral Science', label: 'Social/Behavioral Science' },
    { value: 'Other Non-Science', label: 'Other Non-Science' },
]

export default function AddNewCourse({ newCourse, setNewCourse, toggleNewCourse, category, setCategory, toggleCoursesPopup }: { newCourse: Course, setNewCourse: Dispatch<SetStateAction<Course>>, toggleNewCourse: () => void, category: CategoryType, setCategory?: Dispatch<SetStateAction<CategoryType>> 
    toggleCoursesPopup?: () => void,
}) {
    const dispatch = useDispatch();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCourse({
            ...newCourse,
            [e.target.name]: e.target.value,
        })
    }

    const handleSelectChange = (e: any, name: string) => {
        setNewCourse({
            ...newCourse,
            [name]: e.value,
        })
    }

    const addNewCourse = async () => {
        try {
            const addedCourse = await addCoursesDoc({
                unique_id: '',
                course_name: newCourse.course_name,
                gpa_calculation: newCourse.gpa_calculation,
                subject_category: newCourse.subject_category,
            })
            if (addedCourse) {
                dispatch(addCourse(addedCourse));
                // If coming from "Add Course Popup"
                if (!setCategory) {
                    await addCourseToCategoryDoc(category.id, {
                        course_id: addedCourse.unique_id,
                        course_name: addedCourse.course_name,
                        subcategory: ''
                    })
                    dispatch(addCourseToCategory({
                        id: category.id,
                        course: {
                            course_id: addedCourse.unique_id,
                            course_name: addedCourse.course_name,
                            subcategory: ''
                        }
                    }))
                    toggleCoursesPopup && toggleCoursesPopup();
                // If coming from "Add Course Category"
                } else {
                    setCategory({
                        ...category,
                        courses: category.courses.concat({
                            course_id: addedCourse.unique_id,
                            course_name: addedCourse.course_name,
                            subcategory: ''
                        })
                    })
                }
                toggleNewCourse();
                setNewCourse({
                    unique_id: '',
                    course_name: '',
                    gpa_calculation: '',
                    subject_category: '',
                })
            }
        } catch (error: any) {
            alert(error);
        }
    }

    console.log(newCourse)

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-6 bg-white'>
                    <p className='text-[28px] font-medium mb-10 pl-2'>Add New Course</p>
                    <div className={`mb-10 relative w-full border-2 p-4 block rounded border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-lg bg-white">Course Name</label>
                        <input name='course_name' value={newCourse.course_name} onChange={handleInputChange} className="w-full focus:outline-none border border-[#B4B4B4] px-3 py-2 rounded" />
                    </div>
                    <div className={`mb-10 relative w-full border-2 p-4 block rounded border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-lg bg-white">GPA Calculation</label>
                        <Select className="w-full focus:outline-none rounded"
                        options={gpa} value={newCourse.gpa_calculation ? {value: `${newCourse.gpa_calculation}`, label: `${newCourse.gpa_calculation}`} : null} onChange={(e) => handleSelectChange(e, 'gpa_calculation')} />
                    </div>
                    {newCourse.gpa_calculation && (
                        <div className={`mb-10 relative w-full border-2 p-4 block rounded border-[#B4B4B4]`}>
                            <label className="absolute top-[-16px] text-lg bg-white">Subject Category</label>
                            <Select className="w-full focus:outline-none rounded"
                            options={newCourse.gpa_calculation === 'Science' ? science : nonScience } value={newCourse.subject_category ? {value: `${newCourse.subject_category}`, label: `${newCourse.subject_category}`} : null} onChange={(e) => handleSelectChange(e, 'subject_category')} />
                        </div>
                    )}
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleNewCourse} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded'>Cancel</button>
                        <button onClick={addNewCourse} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded'>Add course</button>
                    </div>
                </div>
            </div>
        </div>
    )
}