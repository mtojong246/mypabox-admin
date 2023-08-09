import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCourses } from "../../app/selectors/courses.selectors";
import { setCourses } from "../../app/slices/courses";
import { AppDispatch } from "../../app/store";
import { getAllCourses } from "../../utils/firebase/firebase.utils";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";

export default function Courses() {
    const courses = useSelector(selectCourses);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const allCourses = await getAllCourses();
                if  (allCourses) {
                    dispatch(setCourses(allCourses));
                }
            } catch (error: any) {
                if (error.message === 'permission-denied') {
                    alert("Access denied. Please log in using the appropriate credentials");
                    navigate('/');
                    return;
                  } else {
                    alert('Error loading course data')
                  }
            }
        }

        fetchCourses();

    }, [dispatch, navigate])

    return (
    <div className="w-screen py-24 px-10 font-['Noto Sans']">
      <div className='w-full max-w-[1800px] pt-10 mx-auto'>
            <div className={`w-full flex justify-between items-start`}>
                <div>
                    <p className='text-5xl font-medium'>Courses</p>
                    <p className='text-xl mt-2'>Total: {courses && courses.length}</p>
                </div>
                <Link to='/courses/add-course'>
                    <button className={`text-lg border-2 border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`}>
                        + Add Course
                    </button>
                </Link>
            </div>
            <div className='w-full mt-16 flex flex-col justify-start items-center'>
            {courses && courses.map(course => (      
                <div className='w-full flex justify-between items-end py-3 border-b border-[#E5E5E5]' key={course.unique_id}>
                    <div>
                        <p className='text-lg font-medium mb-1'>{course.course_name}</p>
                        <p className='text-sm'>GPA Calculation: {course.gpa_calculation}</p>
                        <p className='text-sm mb-1'>Subject Category: {course.subject_category}</p>
                        <p className='text-sm text-[#8B8B8B]'>{course.unique_id}</p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <Link to={`/courses/edit-course/${course.unique_id}`}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></Link>
                        <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}