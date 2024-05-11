import { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from "react"
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import { selectCategories } from "../../../../app/selectors/categories.selectors";
import ReactQuill from "react-quill";
import { Course } from "../../../../types/courses.types";
import { School, SchoolPrereqRequiredCourseCategory } from "../../../../types/schools.types";
import { CategoryCourse } from "../../../../types/categories.types";
import { Note } from "../../../../types/schools.types";
import SelectFieldsGroup from "../../Assets/SelectFieldsGroup";
import { UserObject } from "../../../../types/users.types";

interface CourseType {
    school_required_course_id: string;
    school_required_course_note: string;
}

const defaultCourse = {
    school_required_course_id: '',
    school_required_course_note: '',
}

export default function AddIncludedOrExcludedCourses({ toggleCoursePopup, isEdit, excluded, category, categoryEdited, editedCourse, setEditedCourse, requiredCategory, setEditedCategory, editedCategory, setRequiredCategory, input, groupIndex, newSchool, loggedInUser }: { 
    toggleCoursePopup: (e: any) => void, 
    isEdit: boolean,
    excluded: boolean, category: string, 
    categoryEdited: string,
    editedCourse: any | null,
    setEditedCourse: Dispatch<SetStateAction<any | null>>,
    requiredCategory: SchoolPrereqRequiredCourseCategory,
    setRequiredCategory: Dispatch<SetStateAction<SchoolPrereqRequiredCourseCategory>>,
    editedCategory: {
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
    } | null,
    setEditedCategory: Dispatch<SetStateAction<{
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
    } | null>>,
    input: boolean | null,
    groupIndex: number | null,
    newSchool: School,
    loggedInUser: UserObject,
}) {
    const courses = useSelector(selectCourses);
    const categories = useSelector(selectCategories);
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ addedCourse, setAddedCourse ] = useState<CourseType>(defaultCourse);
    const [ editedOption, setEditedOption ] = useState<{
        school_required_course_id: string;
        school_required_course_note: string;
        isNew: boolean;
        isCorrect: boolean;
    } | null>(null);
    const [ selection, setSelection ] = useState<string | undefined>('');
    const [ editedSelection, setEditedSelection ] = useState<string | undefined>('');
    const [ isBlank, setIsBlank ] = useState(false);

    useEffect(() => {
        if (!input) {
            const selectedCategory = categories.find(c => c.category_name === category);
            if (selectedCategory && excluded) {
                let filteredCourses = [] as CategoryCourse[];
                selectedCategory.courses.forEach(course => {
                    if (!requiredCategory.school_required_course_category_excluded_courses.find(c => c.school_required_course_id === course.course_id)) {
                        filteredCourses.push(course)
                    }
                })
                setCourseOptions(filteredCourses.map(course => (
                    { value: course.course_name, label: course.course_name }
                )))
            } else if (selectedCategory && !excluded) {
                let filteredCourses = [] as Course[]
                courses.forEach(course => {
                    if (!selectedCategory.courses.find(c => c.course_id === course.unique_id) && !requiredCategory.school_required_course_category_extra_included_courses.find(c => c.school_required_course_id === course.unique_id)) {
                        filteredCourses.push(course)
                    }
                })
                setCourseOptions(filteredCourses.map(course => (
                    { value: course.course_name, label: course.course_name }
                )))
            }
        } else {
            const selectedCategory = categories.find(c => c.category_name === categoryEdited);
            if (selectedCategory && excluded) {
                let filteredCourses = [] as CategoryCourse[];
                selectedCategory.courses.forEach(course => {
                    if (editedCategory && !editedCategory.school_required_course_category_excluded_courses.find(c => c.school_required_course_id === course.course_id)) {
                        filteredCourses.push(course)
                    }
                })
                setCourseOptions(filteredCourses.map(course => (
                    { value: course.course_name, label: course.course_name }
                )))
            } else if (selectedCategory && !excluded) {
                let filteredCourses = [] as Course[]
                courses.forEach(course => {
                    if (!selectedCategory.courses.find(c => c.course_id === course.unique_id) && editedCategory && !editedCategory.school_required_course_category_extra_included_courses.find(c => c.school_required_course_id === course.unique_id)) {
                        filteredCourses.push(course)
                    }
                })
                setCourseOptions(filteredCourses.map(course => (
                    { value: course.course_name, label: course.course_name }
                )))
            }
        }
        
    }, [courses, categories, category, categoryEdited, editedCategory, input, excluded, requiredCategory.school_required_course_category_excluded_courses, requiredCategory.school_required_course_category_extra_included_courses])

    // useEffect(() => {
    //     if (selection) {
    //         const selectedCourse = courses.find(course => course.course_name === selection)
    //         if (selectedCourse) {
    //             setAddedCourse({
    //                 ...addedCourse,
    //                 school_required_course_id: selectedCourse.unique_id,
    //             })
    //         }
    //     }
    // }, [selection, courses])

    // useEffect(() => {
    //     if (editedCourse) {
    //         const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_required_course_id)
    //         if (selectedCourse) {
    //             setAddedCourse(editedCourse)
    //             setSelection(selectedCourse.course_name)
    //         }
    //     } else {
    //         setAddedCourse(defaultCourse)
    //         setSelection('')
    //     }
    // }, [editedCourse])

    useEffect(() => {
        if (editedCourse) {
             
            if (input) {
                setEditedOption(editedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_required_course_id)
                if (selectedCourse) {
                    setEditedSelection(selectedCourse.course_name)
                } else {
                    setEditedSelection('');
                }
                let originalInput = {} as any;
                if (excluded) {
                    originalInput = requiredCategory.school_required_course_category_excluded_courses.find((inp,i) => i === groupIndex)
                } else {
                    originalInput = requiredCategory.school_required_course_category_extra_included_courses.find((inp,i) => i === groupIndex)
                }
                const opt = originalInput && originalInput.find((inp: CourseType,i: number) => i === groupIndex);
                if (opt) {
                    setAddedCourse(opt);
                    const selectedCourse = courses.find(course => course.unique_id === opt.school_required_course_id)
                    if (selectedCourse) {
                        setSelection(selectedCourse.course_name)
                    } else {
                        setSelection('');
                    }
                } else {
                    setAddedCourse(defaultCourse);
                    setSelection('')
                }
            } else {
                setAddedCourse(editedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_required_course_id)
                if (selectedCourse) {
                    setSelection(selectedCourse.course_name)
                } else {
                    setSelection('');
                };
                setEditedSelection('');
                setEditedOption(null)
            }
            setIsBlank(false);
        } else {
            if (input) {
                setEditedOption({
                    school_required_course_id: '',
                    school_required_course_note: '',
                    isCorrect: true,
                    isNew: true,
                });
                setEditedSelection('');
                setAddedCourse(defaultCourse);
                setSelection('')
            } else {
                setAddedCourse(defaultCourse)
                setSelection('')
                setEditedOption(null)
            }
            setIsBlank(true);
        }
    }, [editedCourse, input]);

    // Adds course to category 
    const addCourseToCategory = (excluded: boolean, isEditedInput: boolean) => {
        // if part of excluded courses
        if (!isEditedInput) {
            if (excluded) {
                setRequiredCategory({
                    ...requiredCategory,
                    school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.concat(addedCourse),
                })
            // if part of included courses
            } else {
                setRequiredCategory({
                    ...requiredCategory,
                    school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.concat(addedCourse),
                })
            }
        } else {
            if (excluded) {
                editedCategory && editedOption && setEditedCategory({
                    ...editedCategory,
                    school_required_course_category_excluded_courses: editedCategory.school_required_course_category_excluded_courses.concat(editedOption),
                })
            // if part of included courses
            } else {
                editedCategory && editedOption && setEditedCategory({
                    ...editedCategory,
                    school_required_course_category_extra_included_courses: editedCategory.school_required_course_category_extra_included_courses.concat(editedOption),
                })
            }
        }
        
    }

    // Updates course from excluded or included courses and resets index 
    const updateCourseFromCategory = (excluded: boolean, isEditedInput: boolean) => {
        if (!isEditedInput) {
            if (excluded) {
                setRequiredCategory({
                    ...requiredCategory,
                    school_required_course_category_excluded_courses: requiredCategory.school_required_course_category_excluded_courses.map((c,i) => {
                        if (i === groupIndex) {
                            return { ...addedCourse }
                        } else {
                            return { ...c }
                        }
                    })
                })
            } else {
                setRequiredCategory({
                    ...requiredCategory,
                    school_required_course_category_extra_included_courses: requiredCategory.school_required_course_category_extra_included_courses.map((c,i) => {
                        if (i === groupIndex) {
                            return { ...addedCourse }
                        } else {
                            return { ...c }
                        }
                    })
                })
            }
        } else {
            if (excluded) {
                editedCategory && editedOption && setEditedCategory({
                    ...editedCategory,
                    school_required_course_category_excluded_courses: editedCategory.school_required_course_category_excluded_courses.map((c,i) => {
                        if (i === groupIndex) {
                            return { ...editedOption }
                        } else {
                            return { ...c }
                        }
                    })
                })
            } else {
                editedCategory && editedOption && setEditedCategory({
                    ...editedCategory,
                    school_required_course_category_extra_included_courses: editedCategory.school_required_course_category_extra_included_courses.map((c,i) => {
                        if (i === groupIndex) {
                            return { ...editedOption }
                        } else {
                            return { ...c }
                        }
                    })
                })
            }
        }
        
    };

    const handleSelection = (e:any, category: string, isEditedInput: boolean) => {
        const selectedCourse = courses.find(course => course.course_name === e.value);
        if (!isEditedInput && selectedCourse) {
            setSelection(e.value)
            setAddedCourse({
                ...addedCourse,
                school_required_course_id: selectedCourse.unique_id,
            })
        } else if (isEditedInput && selectedCourse) {
            setEditedSelection(e.value)
            editedOption && setEditedOption({
                ...editedOption,
                school_required_course_id: selectedCourse.unique_id
            })
        }
    }


    const handleNote = (e: any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        if (loggedInUser.permissions.canAddOrDelete) {
            setAddedCourse({
                ...addedCourse,
                school_required_course_note: note,
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                school_required_course_note: note,
            })
        }
        
    }

    const addOrEditCourse = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && !addedCourse.school_required_course_id) {
            alert('Please select a course')
        } else if (input && !editedOption?.school_required_course_id) {
            alert('Please select a course')
        } else {
            if (editedCourse) {
                updateCourseFromCategory(excluded, isEditedInput)
            } else {
                addCourseToCategory(excluded, isEditedInput)
            }
            setEditedCourse(null)
            toggleCoursePopup(e);
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded p-4 bg-white'>
                <div className='max-h-[700px] overflow-auto'>
                    <p className='text-xl font-semibold mb-8'>{excluded && editedCourse ? 'Edit Excluded Course' : !excluded && editedCourse ? 'Edit Included Course' : excluded && !editedCourse ? 'Add Excluded Course' : 'Add Included Course'}</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <SelectFieldsGroup isEdit={isEdit} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={editedOption ? editedOption.school_required_course_id : null}
                        originalInput={addedCourse.school_required_course_id} handleSelect={handleSelection} label={editedSelection} originalLabel={selection} options={courseOptions} name='school_required_course_id' category="school_required_course_id"
                        />
                        {/* <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/> */}
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={editedOption ? editedOption.school_required_course_note : addedCourse.school_required_course_note}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleCoursePopup(e); setEditedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => {input ? addOrEditCourse(e, true) : addOrEditCourse(e, false)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedCourse ? 'Edit course' : 'Add course'}</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}