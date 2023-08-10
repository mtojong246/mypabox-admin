import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, MouseEvent } from "react";
import { selectCourses, selectFilteredCourses } from "../../app/selectors/courses.selectors";
import { setCourses } from "../../app/slices/courses";
import { AppDispatch } from "../../app/store";
import { getAllCourses } from "../../utils/firebase/firebase.utils";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { deleteCoursesDoc } from "../../utils/firebase/firebase.utils";
import { deleteCourse } from "../../app/slices/courses";
import { Course } from "../../types/courses.types";
import DeletePopup from "./DeletePopup";


export default function Courses() {
    const courses = useSelector(selectCourses);
    const filtered = useSelector(selectFilteredCourses);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([]);
    const [ openModal, setOpenModal ] = useState(false);
    const [ toBeDeleted, setToBeDeleted ] = useState('');

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const allCourses = await getAllCourses();
                if  (allCourses) {
                    // Sorts course alphabetically
                    (allCourses as Course[]).sort(function (a, b) {
                        if (a.course_name < b.course_name) {
                            return -1;
                        }
                        if (a.course_name > b.course_name) {
                            return 1;
                        }
                        return 0;
                    })
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

    }, [dispatch, navigate]);

    useEffect(() => {
        if (!filtered.length) {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(filtered)
        }
    }, [filtered]);


    const handleDelete = async (id: string) => {
        try {
            await deleteCoursesDoc(id);
            dispatch(deleteCourse(id));
            toggleModal();
            setFilteredCourses(filteredCourses.filter(course => course.unique_id !== id))
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

    // Toggles delete popup
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    // Stores id of course that will be deleted and opens delete popup
    const setDelete = (e: MouseEvent<HTMLButtonElement>) => {
        setToBeDeleted((e.currentTarget as HTMLButtonElement).value);
        toggleModal();
    }



    return (
    <>
    <div className="w-screen px-10 font-['Noto Sans']">
      <div className='w-full max-w-[1800px] mx-auto'>
            <div className={`w-full flex justify-between items-start sticky top-0 pt-[120px] pb-4 bg-white border-b border-[#DCDCDC]`}>
                <div>
                    <p className='text-5xl font-medium'>Courses</p>
                    <p className='text-xl mt-2'>Total: {filteredCourses && filteredCourses.length}</p>
                </div>
                <Link to='/courses/add-course'>
                    <button className={`text-lg border-2 border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`}>
                        + Add Course
                    </button>
                </Link>
            </div>
            <div className='w-full flex flex-col justify-start items-center'>
            {filteredCourses && filteredCourses.map(course => (      
                <div className='w-full flex justify-between items-end py-3 border-b border-[#E5E5E5]' key={course.unique_id}>
                    <div>
                        <p className='text-lg font-medium mb-1'>{course.course_name}</p>
                        <p className='text-sm'>GPA Calculation: {course.gpa_calculation}</p>
                        <p className='text-sm mb-1'>Subject Category: {course.subject_category}</p>
                        <p className='text-sm text-[#8B8B8B]'>{course.unique_id}</p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <Link to={`/courses/edit-course/${course.unique_id}`}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></Link>
                        <button value={course.unique_id} onClick={setDelete}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    {openModal && <DeletePopup toggleModal={toggleModal} toBeDeleted={toBeDeleted} handleDelete={handleDelete}/>}
    </>
    )
}