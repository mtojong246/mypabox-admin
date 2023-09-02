import { AiOutlineClose } from 'react-icons/ai';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { CategoryCourse, CategoryType } from '../../types/categories.types';
import AddCoursePopup from './AddCoursePopup';
import AddSubcategoryPopup from './AddSubcategoryPopup';
import DeleteCategory from './DeleteCategory';
import DeleteCourse from './DeleteCourse';
import DeleteSubcategory from './DeleteSubcategory';

interface SelectType {
    value: string;
    label: string
}

export default function Category({ category }: { category: CategoryType }) {
    const [ expandCourses, setExpandCourses ] = useState(false);
    const [ expandSubcategories, setExpandSubcategories ] = useState(false); 
    const [ coursePopup, setCoursePopup ] = useState(false);
    const [ subPopup, setSubPopup ] = useState(false);
    const [ deleteCategory, setDeleteCategory ] = useState(false);
    const [ deleteCourse, setDeleteCourse ] = useState(false);
    const [ deleteSub, setDeleteSub ] = useState(false);
    const [ selectedCourse, setSelectedCourse ] = useState<CategoryCourse>({} as CategoryCourse)
    const [ selectedSub, setSelectedSub ] = useState('');
    const [ filteredCourses, setFilteredCourses ] = useState<CategoryCourse[]>([] as CategoryCourse[])
    const [ filterOptions, setFilterOptions ] = useState<SelectType[]>([]);
    const [ filter, setFilter ] = useState('All');

    useEffect(() => {
        if (filter === 'All') {
            setFilteredCourses(category.courses)
        } else {
            setFilteredCourses(category.courses.filter(c => c.subcategory === filter))
        }
    }, [filter, category.courses])


    useEffect(() => {
        const options = category.subcategories.map(sub => (
            { value: sub, label: sub }
        ))
        setFilterOptions(options.concat({ value: 'All', label: 'All' }))
    }, [category.subcategories])

    const toggleCourses = () => setExpandCourses(!expandCourses)
    const toggleSubcategories = () => setExpandSubcategories(!expandSubcategories);
    const toggleCoursesPopup = () => setCoursePopup(!coursePopup);
    const toggleSubPopup = () => setSubPopup(!subPopup);
    const toggleDeleteCategory = () => setDeleteCategory(!deleteCategory);
    const toggleDeleteCourse = () => setDeleteCourse(!deleteCourse);
    const toggleDeleteSub = () => setDeleteSub(!deleteSub);

    const setCourseToDelete = (course: CategoryCourse) => {
        setSelectedCourse(course)
        toggleDeleteCourse();
    }

    const setSubToDelete = (sub: string) => {
        setSelectedSub(sub);
        toggleDeleteSub();
    }

    return (
        <>
            <div className='w-full py-3 border border-[#E5E5E5] rounded-md'>
                <div className='w-full flex justify-between items-center pb-3 border-b border-[#E5E5E5]'>
                    <p className='font-medium text-xl pl-3'>{category.category_name}</p>
                    <div className='flex justify-center items-center gap-3 pr-3 text-sm'>
                        <button onClick={toggleCoursesPopup} className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded-md px-2 py-1'>+ Add course</button>
                        <button onClick={toggleSubPopup} className='border-2 border-[#FF8F0B] text-[#FF8F0B] font-medium rounded-md px-2 py-1'>+ Add subcategory</button>
                        <button onClick={toggleDeleteCategory}><AiOutlineClose className='h-[32px] w-[32px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                    </div>
                </div>
                <div className='w-full py-3 border-b border-[#E5E5E5]'>
                    <div className='flex justify-start items-center gap-2 pl-3 hover:cursor-pointer' onClick={toggleCourses}>
                        <button>{expandCourses ? <FiChevronDown /> : <FiChevronRight />}</button>
                        <p>{expandCourses ? 'Hide' : 'Expand'} courses</p>
                    </div>
                    {expandCourses && (
                    <>
                        <div className='flex justify-start items-center gap-3 pl-9 pb-3 pt-5'>
                            <p>Filter</p>
                            <Select options={filterOptions} value={{ value: filter, label: filter }} onChange={(e) => setFilter((e as {value: '', label: ''}).value)}/>
                        </div>
                        {filteredCourses && filteredCourses.map((course, i) => (
                            <div className={`flex justify-between items-center py-3 mx-[84px] ${i === 0 ? 'border-none' : 'border-t'} border-[#E5E5E5]`}>
                                <p>{course.course_name}</p>
                                <button onClick={() => setCourseToDelete(course)}><AiOutlineClose className='h-[22px] w-[22px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        ))}
                    </>
                    )}
                </div>
                <div className='w-full pt-3'>
                    <div className='flex justify-start items-center gap-2 pl-3 hover:cursor-pointer' onClick={toggleSubcategories}>
                        <button>{expandSubcategories ? <FiChevronDown /> : <FiChevronRight />}</button>
                        <p>{expandSubcategories ? 'Hide' : 'Expand'} subcategories</p>
                    </div>
                    {expandSubcategories && (
                    <>
                        {category.subcategories.map((sub, i) => (
                            <div className={`flex justify-between items-center pb-3 mx-[84px] ${i === 0 ? 'border-none pt-4' : 'border-t pt-3'} border-[#E5E5E5]`}>
                                <p>{sub}</p>
                                <button onClick={() => setSubToDelete(sub)}><AiOutlineClose className='h-[22px] w-[22px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        ))}
                    </>
                    )}
                </div>
            </div>
            {coursePopup && <AddCoursePopup toggleCoursesPopup={toggleCoursesPopup} category={category}/>}
            {subPopup && <AddSubcategoryPopup toggleSubPopup={toggleSubPopup} category={category}/>}
            {deleteCategory && <DeleteCategory toggleDeleteCategory={toggleDeleteCategory} category={category}/>}
            {deleteCourse && <DeleteCourse toggleDeleteCourse={toggleDeleteCourse} category={category} selectedCourse={selectedCourse}/>}
            {deleteSub && <DeleteSubcategory toggleDeleteSub={toggleDeleteSub} category={category} selectedSub={selectedSub} />}
        </>
    )
}