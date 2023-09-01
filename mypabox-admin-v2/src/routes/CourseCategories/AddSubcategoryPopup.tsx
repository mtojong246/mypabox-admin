import { CategoryCourse, CategoryType } from "../../types/categories.types";
import Select from 'react-select';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../app/selectors/categories.selectors";
import { addSubToCategoryDoc } from "../../utils/firebase/firebase.utils";
import { addSubcategory } from "../../app/slices/categories";

interface SelectType {
    value: string;
    label: string
}

export default function AddSubcategoryPopup({toggleSubPopup, category} : { toggleSubPopup: () => void, category: CategoryType }) {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();
    const [ selection, setSelection ] = useState('');
    const [ subOptions, setSubOptions ] = useState<SelectType[]>([]);

    useEffect(() => {
        const options = [] as SelectType[];
        categories.forEach(c => {
            if (c.category_name !== category.category_name) {
                options.push({ value: c.category_name, label: c.category_name })
            }
        })
        setSubOptions(options)
    }, [categories])

    const handleSelect = async () => {
        const categoryExists = category.subcategories.find(cat => cat === selection);
        const subcategory = categories.find(category => category.category_name === selection);
        if (!categoryExists && subcategory) {
            try {
                let newCourses: CategoryCourse[] = [];
                subcategory.courses.forEach(course => {
                    if (!category.courses.find(c => c.course_name === course.course_name)) {
                        newCourses.push({
                            course_name: course.course_name,
                            course_id: course.course_id,
                            subcategory: selection,
                        })
                    } 
                })
                await addSubToCategoryDoc(category.id, selection, newCourses);
                dispatch(addSubcategory({
                    id: category.id,
                    courses: newCourses,
                    subcategory: selection,
                }))
                toggleSubPopup();
            } catch (error: any) {
                alert(error)
            }
        } else {
            alert('Subcategory already exists in this category')
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-lg font-medium mb-4'>Add subcategory to "{category.category_name}"</p>
                    <Select className="w-full focus:outline-none rounded-lg mb-4"
                    options={subOptions} value={selection ? {value: selection, label: selection} : null} onChange={(e) => setSelection((e as {value: '', label: ''}).value)}/>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleSubPopup} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={handleSelect} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add subcategory</button>
                    </div>
                </div>
            </div>
        </div>
    )
}