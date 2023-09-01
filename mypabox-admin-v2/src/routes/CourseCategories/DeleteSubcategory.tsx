import { CategoryCourse, CategoryType } from "../../types/categories.types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSubFromCategoryDoc } from "../../utils/firebase/firebase.utils";
import { deleteSubFromCategory } from "../../app/slices/categories";

export default function DeleteSubcategory({ toggleDeleteSub, category, selectedSub } : { toggleDeleteSub: () => void, category: CategoryType, selectedSub: string }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        let newCourses: CategoryCourse[] = [];
        const newSubs = category.subcategories.filter(sub => sub !== selectedSub);
        category.courses.forEach(c => {
            if (c.subcategory !== selectedSub) {
                newCourses.push(c)
            }
        })
        try {
            await deleteSubFromCategoryDoc(category.id, newCourses, newSubs);
            dispatch(deleteSubFromCategory({
                id: category.id,
                courses: newCourses,
                subcategories: newSubs,
            }))
            toggleDeleteSub();
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
                    <p className='text-lg font-medium mb-4'>Delete the {selectedSub} subcategory from {category.category_name}?</p>
                    <p className='mb-4'>Doing so will also delete all of the courses associated with that subcategory from {category.category_name}.</p>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleDeleteSub} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={handleDelete} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Yes, delete {selectedSub}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}