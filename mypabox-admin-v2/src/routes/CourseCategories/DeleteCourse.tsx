import { CategoryCourse, CategoryType } from "../../types/categories.types";
import { deleteCourseFromCategoryDoc } from "../../utils/firebase/firebase.utils";
import { deleteCategoryCourse } from "../../app/slices/categories";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DeleteCourse({ toggleDeleteCourse, category, selectedCourse }: { toggleDeleteCourse: () => void, category: CategoryType, selectedCourse: CategoryCourse }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteCourseFromCategoryDoc(category.id, selectedCourse.course_id);
            dispatch(deleteCategoryCourse({
                id: category.id,
                course_id: selectedCourse.course_id
            }))
            toggleDeleteCourse();
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
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[600px] rounded-lg p-4 bg-white'>
                    <p className='text-lg font-medium mb-4'>Delete "{selectedCourse.course_name}" from {category.category_name}?</p>
                    <p className='mb-4'>You will not be able to recover it.</p>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleDeleteCourse} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={handleDelete} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Yes, delete {selectedCourse.course_name}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}