import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose } from 'react-icons/ai'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from "react"
import Select from 'react-select';
import { getAllCategories } from "../../utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setCategories } from "../../app/slices/categories";
import { selectCategories } from "../../app/selectors/categories.selectors";
import Category from "./Category";

// const mockCourses = [ 'Abnormal Psychology', 'Adolescent Psychology', 'Behavioral Sciences' ];
// const mockSubcategories = ['Chemistry', 'Biology']

export default function CourseCategories() {
    const [ expandCourses, setExpandCourses ] = useState(false);
    const [ expandSubcategories, setExpandSubcategories ] = useState(false); 
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(selectCategories);

    const toggleCourses = () => setExpandCourses(!expandCourses)
    const toggleSubcategories = () => setExpandSubcategories(!expandSubcategories);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const allCategories = await getAllCategories();
                if (allCategories) {
                    dispatch(setCategories(allCategories));
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

        fetchCategories();
    }, [dispatch, navigate])

    console.log(categories);

    return (
        <>
        <div className="w-screen px-10 font-['Noto Sans']">
            <div className='w-full max-w-[1800px] mx-auto'>
                <div className={`w-full flex justify-between items-start sticky top-0 pt-10 pb-10 bg-white`}>
                    <div>
                        <p className='text-5xl font-medium'>Course Categories</p>
                        <p className='text-xl mt-3'>Total: </p>
                    </div>
                    <Link to='/categories/add-category'>
                        <button className={`text-lg border-2 border-[#F06A6A] text-[#F06A6A] rounded-xl py-2 px-4`}>
                            + Add Course Category
                        </button>
                    </Link>
                </div>
                <div className='w-full flex flex-col justify-start items-center gap-12'>
                {categories && categories.map(category => (
                    <Category category={category} />
                ))}
                </div>
            </div>
        </div>
        </>
    )
}