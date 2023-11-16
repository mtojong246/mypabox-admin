import { useSelector, useDispatch } from "react-redux";
import { selectCourses, selectMode } from "../../app/selectors/courses.selectors";
import { AppDispatch } from "../../app/store";
import { useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { Course } from "../../types/courses.types";
import { setMode } from "../../app/slices/courses";
import Select from 'react-select';
import { addCourse, editCourse } from "../../app/slices/courses";
import { addCoursesDoc, updateCoursesDoc } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";


export default function AddOrEditCourse() {
    const params = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const courses = useSelector(selectCourses);
    const edit = useSelector(selectMode);
    const [ course, setCourse ] = useState<Course>({} as Course);
    const [ isLoading, setIsLoading ] = useState(false);

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

   

    useEffect(() => {
        if (params.id) {
        // Use unique id from url to find course to be edited
            const { id } = params;
            const editCourse = courses.find(course => course.unique_id === id);
            if (editCourse) {
                setCourse(editCourse);
                dispatch(setMode(true));
            }
            return;
        } else {
        // Creates new course template 
            setCourse({
                unique_id: '',
                course_name: '',
                gpa_calculation: '',
                subject_category: '',
            })
            dispatch(setMode(false));
            return;
        }
    }, [params]);

    // Handles input change for text fields 
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        })
    }

    // Handles input change for select fields 
    const handleSelectChange = (e: any, name: string) => {
        setCourse({
            ...course,
            [name]: e.value,
        })
    }

    // Handles save for both add and edit modes 
    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (!edit) {
                const newCourse = await addCoursesDoc(course);
                if (newCourse) {
                    dispatch(addCourse(newCourse));
                }
            } else {
                await updateCoursesDoc(course, course.unique_id);
                dispatch(editCourse(course))
            }
            // Navigates back to courses page when successful 
            setIsLoading(false);
            navigate('/courses')
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


    return (
        <div className="w-screen p-10 font-['Noto Sans']">
            <div className='w-full max-w-[1800px] mx-auto'>
                <div className={`w-full flex justify-between items-end pb-5 border-b border-[#DCDCDC]`}>
                    <p className='text-4xl font-medium'>{edit ? 'Edit Course' : 'Add Course'}</p>
                    <div className='flex justify-center items-center gap-3'>
                        <button onClick={handleSave} className='border-2 border-blue-500 text-blue-500 rounded font-medium w-[72px] h-[44px] flex justify-center items-center hover:text-white hover:bg-blue-500 flex justify-center items-center'>
                            {isLoading ? <CircularProgress color='inherit' style={{height: '30px', width: '30px'}} /> : 'Save'}
                        </button>
                        <button onClick={() => navigate('/courses')} className='border-2 border-red-400 text-red-400 rounded font-medium py-2 px-4 hover:text-white hover:bg-red-400 flex justify-center items-center'>Cancel</button>
                    </div>
                </div>
                {course && (
                <div className='w-full'>
                    <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-xl bg-white">Course Name</label>
                        <input name='course_name' value={course.course_name} onChange={handleInputChange} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" />
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                        <label className="absolute top-[-16px] text-xl bg-white">GPA Calculation</label>
                        <Select className="w-full focus:outline-none"
                        options={gpa} value={course.gpa_calculation ? {value: `${course.gpa_calculation}`, label: `${course.gpa_calculation}`} : null} onChange={(e) => handleSelectChange(e, 'gpa_calculation')} />
                    </div>
                    {course.gpa_calculation && (
                        <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                            <label className="absolute top-[-16px] text-xl bg-white">Subject Category</label>
                            <Select className="w-full focus:outline-none"
                            options={course.gpa_calculation === 'Science' ? science : nonScience } value={course.subject_category ? {value: `${course.subject_category}`, label: `${course.subject_category}`} : null} onChange={(e) => handleSelectChange(e, 'subject_category')} />
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    )
}