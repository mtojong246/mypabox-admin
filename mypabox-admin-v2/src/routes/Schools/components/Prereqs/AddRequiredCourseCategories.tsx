import Select from 'react-select';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../../app/selectors/categories.selectors';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { useState, useEffect, ChangeEvent } from 'react';
import { Note, SchoolPrereqRequiredCourseCategory } from '../../../../types/schools.types';
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill';
import AddNote from './AddNote';
import AddIncludedOrExcludedCourses from './AddIncludedOrExcludedCourses';

interface Course {
    school_required_course_id: string;
    school_required_course_note: string;
}

const defaultCategory = {
    school_required_course_category: '',
    school_required_course_category_number_of_credits_need_to_be_completed: 0,
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: 0,
    school_required_course_category_number_of_courses_that_need_lab: 0,
    school_required_course_category_extra_included_courses: [],
    school_required_course_category_excluded_courses: [],
    school_required_course_category_note_section: [],
}

export default function AddRequiredCourseCategories({ toggleRequiredCourseCategories, addCourseCategory }: { toggleRequiredCourseCategories: (e:any) => void, addCourseCategory: (category: SchoolPrereqRequiredCourseCategory) => void, }) {
    const categories = useSelector(selectCategories);
    const courses = useSelector(selectCourses);
    const [ categoryOptions, setCategoryOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ requiredCategory, setRequiredCategory ] = useState<SchoolPrereqRequiredCourseCategory>(defaultCategory)
    const [ coursePopup, setCoursePopup ] = useState(false);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ excluded, setExcluded ] = useState(false);

    const toggleCoursePopup = (e:any) => {
        e.preventDefault();
        setCoursePopup(!coursePopup)
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        setCategoryOptions(categories.map(category => (
            { value: category.category_name, label: category.category_name }
        )))
    }, [categories])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRequiredCategory({
            ...requiredCategory,
            [e.target.name]: e.target.value, 
        })
    }

    const handleSelect = (e:any) => {
        setRequiredCategory({
            ...requiredCategory,
            school_required_course_category: e.value,
        })
    }

    const addNoteToCategory = (note: Note) => {
        setRequiredCategory({
            ...requiredCategory,
            school_required_course_category_note_section: requiredCategory.school_required_course_category_note_section.concat(note),
        })
    }
    
    const addCourseToCategory = (course: Course, excluded: boolean) => {
        if (excluded) {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.concat(course),
            })
        } else {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.concat(course),
            })
        }
    }

    const openExcludedCourse = (e:any) => {
        if (requiredCategory.school_required_course_category) {
            toggleCoursePopup(e); 
            setExcluded(true)
        } else {
            alert('Please select a category')
        }
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='w-full max-w-[900px] max-h-[800px] overflow-y-scroll rounded-lg p-4 bg-white'>
                        {(coursePopup || notePopup) && <div className='absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 z-10'></div>}
                        <p className='text-xl font-semibold mb-8'>Add Required Course Category</p>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Category name:</label>
                            <Select onChange={handleSelect} value={requiredCategory.school_required_course_category ? {value: requiredCategory.school_required_course_category, label: requiredCategory.school_required_course_category} : null} options={categoryOptions} className='w-full focus:outline-none rounded mt-2'/>
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of credit hours that need to be completed:</label>
                            <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_credits_need_to_be_completed} name='school_required_course_category_number_of_credits_need_to_be_completed' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of quarter hours that need to be completed:</label>
                            <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_quarter_hours_need_to_be_completed} name='school_required_course_category_number_of_quarter_hours_need_to_be_completed' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of courses that need lab:</label>
                            <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_courses_that_need_lab} name='school_required_course_category_number_of_courses_that_need_lab' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' />
                        </div>


                        <div className='w-full mb-8'>
                            <label className='font-medium'>Included courses:</label>
                            <button onClick={(e) => {toggleCoursePopup(e); setExcluded(false)}} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_extra_included_courses.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_extra_included_courses.map(course => {
                                const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                if (selectedCourse) {
                                    return (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='font-bold'>{selectedCourse?.course_name}</p>
                                                <div className='flex gap-2'>
                                                    <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                                    <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                                </div>
                                            </div>
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
                        </div>


                        <div className='w-full mb-8'>
                            <label className='font-medium'>Excluded courses:</label>
                            <button onClick={(e) => openExcludedCourse(e)} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_excluded_courses.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_excluded_courses.map(course => {
                                const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                if (selectedCourse) {
                                    return (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='font-bold'>{selectedCourse?.course_name}</p>
                                                <div className='flex gap-2'>
                                                    <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                                    <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                                </div>
                                            </div>
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
                        </div>


                        <div className='w-full mb-8'>
                            <label className='font-medium'>Notes:</label>
                            <button onClick={toggleNotePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_note_section.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_note_section.map(note => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className='w-full flex justify-end items-center gap-3'>
                            <button onClick={toggleRequiredCourseCategories} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                            <button onClick={(e) => {toggleRequiredCourseCategories(e); addCourseCategory(requiredCategory)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add course</button>
                        </div>
                    </div>
                </div>
            </div>
            {coursePopup && <AddIncludedOrExcludedCourses toggleCoursePopup={toggleCoursePopup} excluded={excluded} category={requiredCategory.school_required_course_category} addCourseToCategory={addCourseToCategory}/>}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNoteToCategory={addNoteToCategory}/>}
        </>
    )
}