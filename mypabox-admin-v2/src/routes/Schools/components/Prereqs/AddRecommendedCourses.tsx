import ReactQuill from "react-quill";
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { School } from '../../../../types/schools.types';
import { Course } from '../../../../types/courses.types';
import { UserObject } from '../../../../types/users.types';
import SelectFieldsGroup from '../../Assets/SelectFieldsGroup';
import BooleanFields from '../../Assets/BooleanFields';
import InputFields from '../../Assets/InputsFields';

const defaultCourse = {
    school_recommended_course_id: '',
    school_recommended_course_lab: false,
    school_recommended_course_lab_preferred: false,
    school_recommended_course_credit_hours: 0,
    school_recommended_course_quarter_hours: 0,
    school_recommended_course_note_section: '',
}

export default function AddRecommendedCourses({ toggleRecommendedCourses, editedRecommendedCourse, setEditedRecommendedCourse,newSchool, setNewSchool, loggedInUser, input, originalInput, groupIndex }: { 
    toggleRecommendedCourses: (e:any) => void,
    editedRecommendedCourse: any | null,
    setEditedRecommendedCourse: Dispatch<SetStateAction<any | null>>,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    input: boolean | null,
    originalInput: {
        school_recommended_course_id: string;
        school_recommended_course_lab: boolean;
        school_recommended_course_lab_preferred: boolean;
        school_recommended_course_credit_hours: number;
        school_recommended_course_quarter_hours: number;
        school_recommended_course_note_section: string;
    }[],
    groupIndex: number | null,
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ recommendedCourse, setRecommendedCourse ] = useState(defaultCourse);
    const [ editedOption, setEditedOption ] = useState<{
        school_recommended_course_id: string;
        school_recommended_course_lab: boolean;
        school_recommended_course_lab_preferred: boolean;
        school_recommended_course_credit_hours: number;
        school_recommended_course_quarter_hours: number;
        school_recommended_course_note_section: string;
        isNew: boolean;
        isCorrect: boolean;
    } | null>(null)
    const [ selection, setSelection ] = useState<string | undefined>('');
    const [ editedSelection, setEditedSelection ] = useState<string | undefined>('');

    const addCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: field.concat(recommendedCourse)
            })
        } else {
            const field = newSchool.edited_school_prereq_recommended_courses;
            editedOption && setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...field,
                    input: field.input!.concat(editedOption)
                }
            })
        }
        
    }

     const updateCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.map((group,i) => {
                    if (i === groupIndex) {
                        return { ...recommendedCourse }
                    } else {
                        return { ...group }
                    }
                })
            })
        } else {
            const field = newSchool.edited_school_prereq_recommended_courses;
            editedOption && setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...field,
                    input: field.input!.map((group,i) => {
                        if (i === groupIndex) {
                            return { ...editedOption }
                        } else {
                            return { ...group }
                        }
                    })
                }
            })
        }
       
    }

    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!newSchool.school_prereq_recommended_courses.find(c => c.school_recommended_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, newSchool.school_prereq_recommended_courses])

    // useEffect(() => {
    //     if (selection) {
    //         const selectedCourse = courses.find(course => course.course_name === selection)
    //         if (selectedCourse) {
    //             setRecommendedCourse({
    //                 ...recommendedCourse,
    //                 school_recommended_course_id: selectedCourse.unique_id,
    //             })
    //         }
    //     }
    // }, [selection, courses])

    // useEffect(() => {
    //     if (editedRecommendedCourse) {
    //         const selectedCourse = courses.find(course => course.unique_id === editedRecommendedCourse.school_recommended_course_id)
    //         if (selectedCourse) {
    //             setRecommendedCourse(editedRecommendedCourse)
    //             setSelection(selectedCourse.course_name)
    //         }
    //     } else {
    //         setRecommendedCourse(defaultCourse)
    //         setSelection('')
    //     }
    // }, [editedRecommendedCourse, courses])

    useEffect(() => {
        if (editedRecommendedCourse) {
             
            if (input) {
                setEditedOption(editedRecommendedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedRecommendedCourse.school_recommended_course_id)
                if (selectedCourse) {
                    setEditedSelection(selectedCourse.course_name)
                } else {
                    setEditedSelection('');
                }
                const opt = originalInput.find((inp,i) => i === groupIndex);
                if (opt) {
                    setRecommendedCourse(opt);
                    const selectedCourse = courses.find(course => course.unique_id === opt.school_recommended_course_id)
                    if (selectedCourse) {
                        setSelection(selectedCourse.course_name)
                    } else {
                        setSelection('');
                    }
                } else {
                    setRecommendedCourse(defaultCourse);
                    setSelection('')
                }
            } else {
                setRecommendedCourse(editedRecommendedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedRecommendedCourse.school_recommended_course_id)
                if (selectedCourse) {
                    setSelection(selectedCourse.course_name)
                } else {
                    setSelection('');
                };
                setEditedSelection('');
                setEditedOption(null)
            }
            
        } else {
            if (input) {
                setEditedOption({
                    school_recommended_course_id: '',
                    school_recommended_course_lab: false,
                    school_recommended_course_lab_preferred: false,
                    school_recommended_course_credit_hours: 0,
                    school_recommended_course_quarter_hours: 0,
                    school_recommended_course_note_section:  '',
                    isCorrect: true,
                    isNew: true,
                });
                setEditedSelection('');
                setRecommendedCourse(defaultCourse);
                setSelection('')
            } else {
                setRecommendedCourse(defaultCourse)
                setSelection('')
                setEditedOption(null)
            }
            
        }
    }, [editedRecommendedCourse, input])

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setRecommendedCourse({
                ...recommendedCourse,
                [e.target.name]: e.target.value, 
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                [e.target.name]: e.target.value,
            })
        }
        
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setRecommendedCourse({
                ...recommendedCourse, 
                [e.target.name]: e.target.checked
            })
        } else {
            editedOption &&setEditedOption({
                ...editedOption,
                [e.target.name]: e.target.checked,
            })
        }
        
    }

    const handleSelection = (e:any, category: string, isEditedInput: boolean) => {
        const selectedCourse = courses.find(course => course.course_name === e.value);
        if (!isEditedInput && selectedCourse) {
            setSelection(e.value)
            setRecommendedCourse({
                ...recommendedCourse,
                school_recommended_course_id: selectedCourse.unique_id,
            })
        } else if (isEditedInput && selectedCourse) {
            setEditedSelection(e.value)
            editedOption && setEditedOption({
                ...editedOption,
                school_recommended_course_id: selectedCourse.unique_id
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
            setRecommendedCourse({
                ...recommendedCourse,
                school_recommended_course_note_section: note,
            })
        } else {
           editedOption && setEditedOption({
                ...editedOption,
                school_recommended_course_note_section: note,
            })
        }
        
    }


    const addOrEditCourse = (e:any, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && !recommendedCourse.school_recommended_course_id) {
            alert('Please select a course')
        } else if (input && editedOption && !editedOption.school_recommended_course_id) {
            alert('Please select a course')
        } else  {
            toggleRecommendedCourses(e);
            if (editedRecommendedCourse) {
                updateCourseOrCategory(isEditedInput)     
            } else {
                addCourseOrCategory(isEditedInput)
            }
            setEditedRecommendedCourse(null)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded p-4 bg-white'>
                <div className='max-h-[700px] overflow-auto'>
                    <p className='text-xl font-semibold mb-8'>{editedRecommendedCourse ? 'Edit' : 'Add'} Recommended Course</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <SelectFieldsGroup label={editedSelection} originalLabel={selection} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={editedOption && editedOption.school_recommended_course_id} handleSelect={handleSelection} 
                        originalInput={recommendedCourse.school_recommended_course_id} category='school_recommended_course_id' name='school_recommended_course_id' options={courseOptions}/>
                        {/* <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/> */}
                    </div>
                    {/* <div className='w-full mb-8 flex justify-start items-center gap-10'> */}
                        <div className='w-full mb-8'>
                            <BooleanFields label="With Lab" loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={editedOption && editedOption.school_recommended_course_lab} originalInput={recommendedCourse.school_recommended_course_lab}
                            name='school_recommended_course_lab' handleCheck={handleCheck} />
                            {/* <input type='checkbox' className='mr-2' name='school_recommended_course_lab' onChange={handleCheck} checked={recommendedCourse.school_recommended_course_lab ? true : false}/> */}
                            {/* <label className='font-medium'>With Lab</label> */}
                        </div>
                        <div className='w-full mb-8'>
                            <BooleanFields label="Lab Preferred" loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={editedOption && editedOption.school_recommended_course_lab_preferred} 
                            originalInput={recommendedCourse.school_recommended_course_lab_preferred} name='school_recommended_course_lab_preferred' handleCheck={handleCheck}/>
                            {/* <input type='checkbox' className='mr-2' name='school_recommended_course_lab_preferred' onChange={handleCheck} checked={recommendedCourse.school_recommended_course_lab_preferred ? true : false}/>
                            <label className='font-medium'>Lab Preferred</label> */}
                        </div>
                    {/* </div> */}
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={editedOption && editedOption.school_recommended_course_credit_hours}
                        originalInput={recommendedCourse.school_recommended_course_credit_hours} name='school_recommended_course_credit_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={recommendedCourse.school_recommended_course_credit_hours ? recommendedCourse.school_recommended_course_credit_hours : ''} name='school_recommended_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={editedOption && editedOption.school_recommended_course_quarter_hours}
                        originalInput={recommendedCourse.school_recommended_course_quarter_hours} name='school_recommended_course_quarter_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={recommendedCourse.school_recommended_course_quarter_hours ? recommendedCourse.school_recommended_course_quarter_hours : ''} name='school_recommended_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={editedOption ? editedOption.school_recommended_course_note_section : recommendedCourse.school_recommended_course_note_section}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleRecommendedCourses(e); setEditedRecommendedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => {input ? addOrEditCourse(e, true) : addOrEditCourse(e, false)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedRecommendedCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}