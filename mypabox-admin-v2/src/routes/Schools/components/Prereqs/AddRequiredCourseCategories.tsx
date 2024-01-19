import { useSelector } from 'react-redux';
import { selectCategories } from '../../../../app/selectors/categories.selectors';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Note, SchoolPrereqRequiredCourseCategory, School } from '../../../../types/schools.types';
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from 'react-quill';
import AddNote from './AddNote';
import AddIncludedOrExcludedCourses from './AddIncludedOrExcludedCourses';
import { CategoryType } from '../../../../types/categories.types';
import SelectFieldsGroup from '../../Assets/SelectFieldsGroup';
import { UserObject } from '../../../../types/users.types';
import InputFields from '../../Assets/InputsFields';

interface CourseType {
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

export default function AddRequiredCourseCategories({ loggedInUser, toggleRequiredCourseCategories, editedRequiredCategory, setEditedRequiredCategory, newSchool, setNewSchool, groupIndex, input }: { 
    toggleRequiredCourseCategories: (e:any) => void, 
    loggedInUser: UserObject,
    editedRequiredCategory: any | null,
    setEditedRequiredCategory: Dispatch<SetStateAction<any | null>>,
    newSchool: School,
    setNewSchool:Dispatch<SetStateAction<School>>,
    groupIndex: number | null,
    input: boolean | null,
}) {
    const categories = useSelector(selectCategories);
    const courses = useSelector(selectCourses);
    const [ categoryOptions, setCategoryOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ requiredCategory, setRequiredCategory ] = useState<SchoolPrereqRequiredCourseCategory>(defaultCategory);
    const [ editedOption, setEditedOption ] = useState<{
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
    } | null>(null);
    const [ coursePopup, setCoursePopup ] = useState(false);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ excluded, setExcluded ] = useState(false);
    const [ selection, setSelection ] = useState<string | undefined>('');
    const [ editedSelection, setEditedSelection ] = useState<string | undefined>('');

    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null)
    const [ editedCourse, setEditedCourse ] = useState<CourseType | null>(null)

    const toggleCoursePopup = (e:any) => {
        e.preventDefault();
        setCoursePopup(!coursePopup)
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        let filteredCategories = [] as CategoryType[]
        categories.forEach(category => {
            if (!newSchool.school_prereq_required_course_categories.find(c => c.school_required_course_category === category.id)) {
                filteredCategories.push(category)
            }
        })
        setCategoryOptions(filteredCategories.map(category => (
            { value: category.category_name, label: category.category_name }
        )))
    }, [categories, newSchool.school_prereq_required_course_categories])

    // useEffect(() => {
    //     if (selection) {
    //         const selectedCategory = categories.find(c => c.category_name === selection)
    //         if (selectedCategory) {
    //             setRequiredCategory({
    //                 ...requiredCategory,
    //                 school_required_course_category: selectedCategory.id,
    //             })
    //         }
    //     }
    // }, [selection, categories])

    // useEffect(() => {
    //     if (editedRequiredCategory) {
    //         const selectedCategory = categories.find(category => category.id === editedRequiredCategory.school_required_course_category);
    //         if (selectedCategory) {
    //             setRequiredCategory(editedRequiredCategory);
    //             setSelection(selectedCategory.category_name)
    //         }
    //     } else {
    //         setRequiredCategory(defaultCategory);
    //         setSelection('')
    //     }
    // }, [editedRequiredCategory, categories])

    useEffect(() => {
        if (editedRequiredCategory) {
             
            if (input) {
                setEditedOption(editedRequiredCategory);
                const selectedCourse = categories.find(categories => categories.id=== editedRequiredCategory.school_required_course_category)
                if (selectedCourse) {
                    setEditedSelection(selectedCourse.category_name)
                } else {
                    setEditedSelection('');
                }
                const originalInput = newSchool.school_prereq_required_course_categories;
                const opt = originalInput.find((inp,i) => i === groupIndex);
                if (opt) {
                    setRequiredCategory(opt);
                    const selectedCourse = categories.find(categories => categories.id === opt.school_required_course_category)
                    if (selectedCourse) {
                        setSelection(selectedCourse.category_name)
                    } else {
                        setSelection('');
                    }
                } else {
                    setRequiredCategory(defaultCategory);
                    setSelection('')
                }
            } else {
                setRequiredCategory(editedRequiredCategory);
                const selectedCourse = categories.find(categories => categories.id=== editedRequiredCategory.school_required_course_category)
                if (selectedCourse) {
                    setSelection(selectedCourse.category_name)
                } else {
                    setSelection('');
                };
                setEditedSelection('');
                setEditedOption(null)
            }
            
        } else {
            if (input) {
                setEditedOption({
                    school_required_course_category: '',
                    school_required_course_category_number_of_credits_need_to_be_completed: 0,
                    school_required_course_category_number_of_quarter_hours_need_to_be_completed: 0,
                    school_required_course_category_number_of_courses_that_need_lab: 0,
                    school_required_course_category_extra_included_courses: [],
                    school_required_course_category_excluded_courses: [],
                    school_required_course_category_note_section: [],
                    isCorrect: true,
                    isNew: true,
                });
                setEditedSelection('');
                setRequiredCategory(defaultCategory)
                setSelection('')
            } else {
                setRequiredCategory(defaultCategory)
                setSelection('')
                setEditedOption(null)
            }
            
        }
    }, [editedRequiredCategory, input]);

    const handleSelection = (e:any, category: string, isEditedInput: boolean) => {
        const selectedCourse = categories.find(category => category.category_name === e.value)
        if (!isEditedInput && selectedCourse) {
            setSelection(e.value)
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category: selectedCourse.id,
            })
        } else if (isEditedInput && selectedCourse) {
            setEditedSelection(e.value)
            editedOption && setEditedOption({
                ...editedOption,
                school_required_course_category: selectedCourse.id
            })
        }
    }


    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setRequiredCategory({
                ...requiredCategory,
                [e.target.name]: e.target.value, 
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                [e.target.name]: e.target.value,
            })
        }
        
    };

    const addCourseOrCategory = (group: SchoolPrereqRequiredCourseCategory, type: string) => {
        const name = type as keyof School;
        const field = newSchool[name] as SchoolPrereqRequiredCourseCategory[];
        const newGroup = [...field, {...group}]
        setNewSchool({
            ...newSchool,
            [name]: newGroup,
        })
    }

    // Updates required course, recommended course, required optional group or required course categories depending on index; then resets index
    const updateCourseOrCategory = (group:SchoolPrereqRequiredCourseCategory, type: string) => {
       const name = type as keyof School;
       const field = newSchool[name] as SchoolPrereqRequiredCourseCategory[];
       const newGroup = field.map((g,i) => {
        if (i === groupIndex) {
            return { ...group }
        } else {
            return { ...g }
        }
       })
       setNewSchool({
        ...newSchool,
        [name]: newGroup,
       })
    }

    
    // Adds course to category 
    const addCourseToCategory = (course: CourseType, excluded: boolean) => {
        // if part of excluded courses
        if (excluded) {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.concat(course),
            })
        // if part of included courses
        } else {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.concat(course),
            })
        }
    }

    // Updates course from excluded or included courses and resets index 
    const updateCourseFromCategory = (course: CourseType, excluded: boolean) => {
        if (excluded) {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.map((c,i) => {
                    if (i === index) {
                        return { ...course }
                    } else {
                        return { ...c }
                    }
                })
            })
        } else {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.map((c,i) => {
                    if (i === index) {
                        return { ...course }
                    } else {
                        return { ...c }
                    }
                })
            })
        }
        setIndex(null)
    }

       // Deletes course from included or excluded courses list 
       const deleteCourse = (e: any, index: number, excluded: boolean) => {
        e.preventDefault();

        if (excluded) {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.filter((course, i) => i !== index)
            })
        } else {
            setRequiredCategory({
                ...requiredCategory,
                school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.filter((course, i) => i !== index)
            })
        }
    }

    // Prompts user to select a category before given option to add excluded course 
    const openExcludedCourse = (e:any) => {
        e.preventDefault();
        if (requiredCategory.school_required_course_category) {
            toggleCoursePopup(e); 
            setExcluded(true)
        } else {
            alert('Please select a category')
        }
    }

    // Prompts user to select a category before given open to add extra included course 
    const openIncludedCourse = (e: any) => {
        e.preventDefault();
        if (requiredCategory.school_required_course_category) {
            toggleCoursePopup(e);
            setExcluded(false)
        } else {
            alert('Please select a category')
        }
    }

    // Adds new note to course category
    const addNote = (note: Note) => {
        setRequiredCategory({
            ...requiredCategory,
            school_required_course_category_note_section: requiredCategory.school_required_course_category_note_section.concat(note),
        })
    }

    // Updates note from course category using set index 
    const updateNote = (note: Note) => {
        setRequiredCategory({
            ...requiredCategory, 
            school_required_course_category_note_section: requiredCategory.school_required_course_category_note_section.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            })
        })
        // Resets index
        setIndex(null)
    }

 

    // Deletes note from category
    const deleteNote = (e: any, index: number) => {
        e.preventDefault();
        setRequiredCategory({
            ...requiredCategory,
            school_required_course_category_note_section: requiredCategory.school_required_course_category_note_section.filter((course,i) => i !== index)
        })
    }

    // Adds or updates entire category
    const addOrUpdateCategory = (e:any) => {
        e.preventDefault();
        if (!requiredCategory.school_required_course_category) {
            alert('Please select a category')
        } else {
            toggleRequiredCourseCategories(e);
            if (editedRequiredCategory) {
                updateCourseOrCategory(requiredCategory, 'school_prereq_required_course_categories')        
            } else {
                addCourseOrCategory(requiredCategory, 'school_prereq_required_course_categories')
            }
            setEditedRequiredCategory(null)
        }
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='w-full max-w-[900px] max-h-[800px] overflow-y-scroll rounded p-4 bg-white'>
                        {(coursePopup || notePopup) && <div className='absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 z-10'></div>}
                        <p className='text-xl font-semibold mb-8'>{editedRequiredCategory ? 'Edit' : 'Add'} Required Course Category</p>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Category name:</label>
                            <SelectFieldsGroup loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={editedOption ? editedOption.school_required_course_category : null}
                            originalInput={requiredCategory.school_required_course_category} name='school_required_course_category' category='school_required_course_category' handleSelect={handleSelection} label={editedSelection}
                            originalLabel={selection} options={categoryOptions}
                            />
                            {/* <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} options={categoryOptions} className='w-full focus:outline-none rounded mt-2'/> */}
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of credit hours that need to be completed:</label>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={editedOption ? editedOption.school_required_course_category_number_of_credits_need_to_be_completed : null}
                            originalInput={requiredCategory.school_required_course_category_number_of_courses_that_need_lab} name='school_required_course_category_number_of_courses_that_need_lab' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_credits_need_to_be_completed ? requiredCategory.school_required_course_category_number_of_credits_need_to_be_completed : ''} name='school_required_course_category_number_of_credits_need_to_be_completed' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of quarter hours that need to be completed:</label>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={editedOption ? editedOption.school_required_course_category_number_of_quarter_hours_need_to_be_completed : null}
                            originalInput={requiredCategory.school_required_course_category_number_of_quarter_hours_need_to_be_completed} name='school_required_course_category_number_of_quarter_hours_need_to_be_completed' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_quarter_hours_need_to_be_completed ? requiredCategory.school_required_course_category_number_of_quarter_hours_need_to_be_completed : ''} name='school_required_course_category_number_of_quarter_hours_need_to_be_completed' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Total number of courses that need lab:</label>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={editedOption ? editedOption.school_required_course_category_number_of_courses_that_need_lab : null}
                            originalInput={requiredCategory.school_required_course_category_number_of_courses_that_need_lab} name='school_required_course_category_number_of_courses_that_need_lab' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} value={requiredCategory.school_required_course_category_number_of_courses_that_need_lab ? requiredCategory.school_required_course_category_number_of_courses_that_need_lab : ''} name='school_required_course_category_number_of_courses_that_need_lab' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                        </div>


                        <div className='w-full mb-8'>
                            <label className='font-medium'>Included courses:</label>
                            <button onClick={(e) => openIncludedCourse(e)} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_extra_included_courses.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_extra_included_courses.map((course, i) => {
                                const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                if (selectedCourse) {
                                    return (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='font-bold'>{selectedCourse?.course_name}</p>
                                                <div className='flex gap-2'>
                                                    <button onClick={(e) => {toggleCoursePopup(e); setIndex(i); setEditedCourse(course); setExcluded(false)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                                    <button onClick={(e) => deleteCourse(e, i, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                            <button onClick={(e) => openExcludedCourse(e)} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Course
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_excluded_courses.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_excluded_courses.map((course, i) => {
                                const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                if (selectedCourse) {
                                    return (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='font-bold'>{selectedCourse?.course_name}</p>
                                                <div className='flex gap-2'>
                                                    <button onClick={(e) => {toggleCoursePopup(e); setIndex(i); setEditedCourse(course); setExcluded(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                                    <button onClick={(e) => deleteCourse(e, i, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                            <button onClick={toggleNotePopup} className="block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded px-4 py-3 hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${requiredCategory.school_required_course_category_note_section.length ? 'mt-3' : 'mt-0'}`}>
                            {requiredCategory.school_required_course_category_note_section.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>


                        <div className='w-full flex justify-end items-center gap-3'>
                            <button onClick={(e) => {toggleRequiredCourseCategories(e); setEditedRequiredCategory(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                            <button onClick={(e) => addOrUpdateCategory(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedRequiredCategory ? 'Edit' : 'Add'} category</button>
                        </div>
                    </div>
                </div>
            </div>
            {coursePopup && <AddIncludedOrExcludedCourses toggleCoursePopup={toggleCoursePopup} excluded={excluded} category={selection as string} addCourseToCategory={addCourseToCategory} editedCourse={editedCourse} setEditedCourse={setEditedCourse} updateCourseFromCategory={updateCourseFromCategory} requiredCategory={requiredCategory}/>}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}