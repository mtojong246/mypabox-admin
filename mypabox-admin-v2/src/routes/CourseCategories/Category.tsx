import { AiOutlineClose } from 'react-icons/ai';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import Select from 'react-select';
import { CategoryType } from '../../types/categories.types';

export default function Category({ category }: { category: CategoryType }) {
    const [ expandCourses, setExpandCourses ] = useState(false);
    const [ expandSubcategories, setExpandSubcategories ] = useState(false); 

    const toggleCourses = () => setExpandCourses(!expandCourses)
    const toggleSubcategories = () => setExpandSubcategories(!expandSubcategories);

    return (
        <div className='w-full py-3 border border-[#E5E5E5] rounded-md'>
            <div className='w-full flex justify-between items-center pb-3 border-b border-[#E5E5E5]'>
                <p className='font-medium text-xl pl-3'>{category.category_name}</p>
                <div className='flex justify-center items-center gap-3 pr-3 text-sm'>
                    <button className='border-2 border-[#4573D2] text-[#4573D2] font-medium rounded-md px-2 py-1'>+ Add course</button>
                    <button className='border-2 border-[#FF8F0B] text-[#FF8F0B] font-medium rounded-md px-2 py-1'>+ Add subcategory</button>
                    <button><AiOutlineClose className='h-[32px] w-[32px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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
                        <Select />
                    </div>
                    {category.courses.map((course, i) => (
                        <div className={`flex justify-between items-center py-3 mx-[84px] ${i === 0 ? 'border-none' : 'border-t'} border-[#E5E5E5]`}>
                            <p>{course.course_name}</p>
                            <button><AiOutlineClose className='h-[22px] w-[22px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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
                            <button><AiOutlineClose className='h-[22px] w-[22px] border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        </div>
                    ))}
                </>
                )}
            </div>
        </div>
    )
}