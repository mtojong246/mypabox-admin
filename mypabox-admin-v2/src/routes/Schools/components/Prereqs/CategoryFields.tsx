import { UserObject } from '../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';
import { Course } from '../../../../types/courses.types';
import ReactQuill from 'react-quill';
import { Note } from '../../../../types/schools.types';
import { CategoryType } from '../../../../types/categories.types';

export default function CategoryFields({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex, categories, courses}: {
    loggedInUser: UserObject, 
    input: {
        school_required_course_category: string;
        school_required_course_category_number_of_credits_need_to_be_completed: number;
        school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
        school_required_course_category_number_of_courses_that_need_lab: number;
        school_required_course_category_extra_included_courses: {
            school_required_course_id: string;
            school_required_course_note: string;
            isNew: boolean;
            isCorrect: boolean;
        }[],
        school_required_course_category_excluded_courses: {
            school_required_course_id: string;
            school_required_course_note: string;
            isNew: boolean;
            isCorrect: boolean;
        }[],
        school_required_course_category_note_section: Note[];
        isCorrect: boolean;
        isNew: boolean;
    }[] | null,
    originalInput: {
        school_required_course_category: string;
        school_required_course_category_number_of_credits_need_to_be_completed: number;
        school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
        school_required_course_category_number_of_courses_that_need_lab: number;
        school_required_course_category_extra_included_courses: {
            school_required_course_id: string;
            school_required_course_note: string;
        }[],
        school_required_course_category_excluded_courses: {
            school_required_course_id: string;
            school_required_course_note: string;
        }[],
        school_required_course_category_note_section: Note[];
    }[],
    isEditMode: 
    boolean, 
    setEditedOption: Dispatch<SetStateAction<any>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteOption: (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    toggleOptions: (e:MouseEvent<HTMLButtonElement>) => void,
    categories: CategoryType[],
    courses: Course[],
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((category, i) => {
                    const selectedCategory = categories.find(c => c.id === category.school_required_course_category);
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    const originalCategory = originalGroup && categories.find(c => c.id === originalGroup.school_required_course_category)
                    if (selectedCategory) {
                        return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-xl ${!category.isCorrect && !category.isNew ? 'line-through' : 'no-underline'}`}>{selectedCategory.category_name}
                                    <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                        / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                        / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                    </span>
                                </p>
                                {originalGroup && (originalGroup.school_required_course_category_number_of_courses_that_need_lab !== category.school_required_course_category_number_of_courses_that_need_lab || 
                                    originalGroup.school_required_course_category_number_of_credits_need_to_be_completed !== category.school_required_course_category_number_of_credits_need_to_be_completed ||
                                    originalGroup.school_required_course_category_number_of_quarter_hours_need_to_be_completed !== category.school_required_course_category_number_of_quarter_hours_need_to_be_completed) && (
                                        <p className={`font-bold text-xl line-through`}>{originalCategory!.category_name}
                                            <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${originalGroup.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                                / ${originalGroup.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                                / ${originalGroup.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                            </span>
                                        </p>
                                    )}
                                <div className='flex gap-2'>
                                    <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(category); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {category.school_required_course_category_extra_included_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_extra_included_courses.map((course, ind) => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_excluded_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_excluded_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'} `}>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_note_section.length > 0 && (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                    {category.school_required_course_category_note_section.map(note => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
            </>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((category, i) => {
                    const selectedCategory = categories.find(c => c.id === category.school_required_course_category);
                    if (selectedCategory) {
                        return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold text-xl'>{selectedCategory.category_name}
                                    <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                        / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                        / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                    </span>
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleOptions(e); setEditedOption(category); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {category.school_required_course_category_extra_included_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_extra_included_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_excluded_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_excluded_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_note_section.length > 0 && (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                    {category.school_required_course_category_note_section.map(note => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
                </>
            )}
            </>
        ) : (
            <>
            {input !== null ? (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((category, i) => {
                    const selectedCategory = categories.find(c => c.id === category.school_required_course_category);
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    const originalCategory = originalGroup && categories.find(c => c.id === originalGroup.school_required_course_category)
                    if (selectedCategory) {
                        return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-xl ${!category.isCorrect && !category.isNew ? 'line-through' : 'no-underline'}`}>{selectedCategory.category_name}
                                    <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                        / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                        / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                    </span>
                                </p>
                                {originalGroup && (originalGroup.school_required_course_category_number_of_courses_that_need_lab !== category.school_required_course_category_number_of_courses_that_need_lab || 
                                    originalGroup.school_required_course_category_number_of_credits_need_to_be_completed !== category.school_required_course_category_number_of_credits_need_to_be_completed ||
                                    originalGroup.school_required_course_category_number_of_quarter_hours_need_to_be_completed !== category.school_required_course_category_number_of_quarter_hours_need_to_be_completed) && (
                                        <p className={`font-bold text-xl line-through`}>{originalCategory!.category_name}
                                            <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${originalGroup.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                                / ${originalGroup.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                                / ${originalGroup.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                            </span>
                                        </p>
                                    )}
                                <div className='flex gap-2'>
                                {!category.isCorrect && !category.isNew ? (
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                    ) : (
                                        <>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedOption(category); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => deleteOption(e,i, category.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {category.school_required_course_category_extra_included_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_extra_included_courses.map((course, ind) => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_excluded_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_excluded_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'} `}>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_note_section.length > 0 && (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                    {category.school_required_course_category_note_section.map(note => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
            ) : (
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((category, i) => {
                    const selectedCategory = categories.find(c => c.id === category.school_required_course_category);
                    if (selectedCategory) {
                        return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold text-xl'>{selectedCategory.category_name}
                                    <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                        / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                        / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                    </span>
                                </p>
                                <div className='flex gap-2'>
                                    <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(category); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {category.school_required_course_category_extra_included_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_extra_included_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_excluded_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_excluded_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_note_section.length > 0 && (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                    {category.school_required_course_category_note_section.map(note => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
            )}
            </>
        )}
        </>
    )
}