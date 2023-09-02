import { ChangeEvent, useState, useEffect } from "react"
import { CategoryType } from "../../types/categories.types"
import { selectCourses } from "../../app/selectors/courses.selectors"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { AiOutlineClose } from 'react-icons/ai';
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from "react-router-dom";
import { addCategoryDoc, addCoursesDoc } from "../../utils/firebase/firebase.utils";
import { addCategory } from "../../app/slices/categories";
import { addCourse } from "../../app/slices/courses";

interface SelectType {
    value: string;
    label: string
}

export default function AddCourseCategory() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [ category, setCategory ] = useState<CategoryType>({
        id: '',
        category_name: '',
        courses: [],
        subcategories: [],
    })
    const [ courseOptions, setCourseOptions ] = useState<SelectType[]>([])
    const [ selection, setSelection ] = useState('');
    const courses = useSelector(selectCourses);

    useEffect(() => {
        setCourseOptions(courses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        })
    }

    const handleSelection = async () => {
        const courseToBeAdded = courses.find(course => course.course_name === selection)
        const courseExists = category.courses.find(course => course.course_name === selection)
        if (courseToBeAdded && !courseExists) {
            const courseId = courseToBeAdded.unique_id;
            setCategory({
                ...category,
                courses: category.courses.concat({
                    course_id: courseId,
                    course_name: selection,
                    subcategory: ''
                })
            })
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
                    setCategory({
                        ...category,
                        courses: category.courses.concat({
                            course_id: newCourse.unique_id,
                            course_name: newCourse.course_name,
                            subcategory: ''
                        })
                    })
                }
            } catch (error: any) {
                alert(error);
            }
        } else {
            alert('Course already exists');
            return;
        }
    }

    const deleteCourse = (index: number) => {
        const newCourses = category.courses.filter((course, i) => i !== index);
        setCategory({
            ...category,
            courses: newCourses,
        })
    }

    const handleSave = async () => {
        try {
            const newCategory = await addCategoryDoc(category);
            if (newCategory) {
                dispatch(addCategory(newCategory));
            }
            navigate('/categories')
        } catch (error: any) {
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
            } else {
                alert(error);
                return;
            }
        }
    }

    console.log(category)
 
    return (
        <div className="w-screen p-10 font-['Noto Sans']">
            <div className='w-full max-w-[1800px] mx-auto'>
                <div className={`w-full flex justify-between items-center pb-10`}>
                    <p className='text-4xl font-medium'>Add Course Category</p>
                    <button onClick={handleSave} className='text-lg border-2 border-[#4573D2] text-[#4573D2] font-medium rounded-xl py-2 px-4'>
                        Save
                    </button>
                </div>
                {category && (
                <div className='w-full'>
                    <div className={` mt-2 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-xl bg-white">Category Name</label>
                        <input name='category_name' value={category.category_name} onChange={handleInput} className="w-full focus:outline-none border border-[#B4B4B4] p-2 rounded-lg" />
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-xl bg-white">Courses</label>
                        <div className='w-full flex justify-between items-center gap-4'>
                            <CreatableSelect className="w-full focus:outline-none rounded-lg"
                            options={courseOptions} value={selection ? {value: selection, label: selection} : null} onChange={(e) => setSelection((e as {value: '', label: ''}).value)}/>
                            <button onClick={handleSelection} className='w-[64px] h-[36px] border-2 border-[#4573D2] text-[#4573D2] font-medium rounded-md'>Add</button>
                        </div>
                        {category.courses && category.courses.map((course, i) => (
                            <div className={`flex flex-column justify-between items-center py-2 ${i === 0 ? 'border-none mt-4' : 'border-t mt-0'} border-[#B4B4B4]`}>
                                <p>{course.course_name}</p>
                                <button><AiOutlineClose onClick={() => deleteCourse(i)} className='h-[22px] w-[22px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

