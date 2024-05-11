import ReactQuill from "react-quill";
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import { Note, School, SchoolPrereqRequiredOptionalCourse, SchoolRequiredOptionalCourse } from "../../../../types/schools.types";
import { Course } from "../../../../types/courses.types";
import { UserObject } from "../../../../types/users.types";
import SelectFieldsGroup from "../../Assets/SelectFieldsGroup";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";

const defaultCourse = {
    school_optional_course_id: '',
    school_optional_course_lab: false,
    school_optional_course_lab_preferred: false,
    school_optional_course_credit_hours: 0,
    school_optional_course_quarter_hours: 0,
    school_optional_course_note_section: '',
}

export default function AddCourseToOption({ newSchool, isEdit, loggedInUser, toggleCoursePopup, editedCourse, setEditedCourse, group, setGroup, setEditedGroup, editedGroup, input, index }: { 
    toggleCoursePopup: (e:any) => void, 
    editedCourse: any | null,
    setEditedCourse: Dispatch<SetStateAction<any | null>>,
    group: SchoolPrereqRequiredOptionalCourse,
    setGroup: Dispatch<SetStateAction<SchoolPrereqRequiredOptionalCourse>>,
    setEditedGroup: Dispatch<SetStateAction<{
        school_minimum_number_of_courses_to_be_completed: number;
        school_required_optional_courses_list: {
            school_optional_course_id: string;
            school_optional_course_lab: boolean;
            school_optional_course_lab_preferred: boolean;
            school_optional_course_credit_hours: number;
            school_optional_course_quarter_hours: number;
            school_optional_course_note_section: string;
            isNew: boolean;
            isCorrect: boolean;
        }[];
        school_optional_course_note_section: Note[];
        isCorrect: boolean;
        isNew: boolean;
    } | null>>,
    editedGroup: {
        school_minimum_number_of_courses_to_be_completed: number;
        school_required_optional_courses_list: {
            school_optional_course_id: string;
            school_optional_course_lab: boolean;
            school_optional_course_lab_preferred: boolean;
            school_optional_course_credit_hours: number;
            school_optional_course_quarter_hours: number;
            school_optional_course_note_section: string;
            isNew: boolean;
            isCorrect: boolean;
        }[];
        school_optional_course_note_section: Note[];
        isCorrect: boolean;
        isNew: boolean;
    } | null,
    input: boolean | null,
    index: number | null,
    loggedInUser: UserObject,
    newSchool: School,
    isEdit: boolean,
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ optionalCourse, setOptionalCourse ] = useState<SchoolRequiredOptionalCourse>(defaultCourse);
    const [ editedOption, setEditedOption ] = useState<{
        school_optional_course_id: string,
        school_optional_course_lab: boolean,
        school_optional_course_lab_preferred: boolean,
        school_optional_course_credit_hours: number,
        school_optional_course_quarter_hours: number,
        school_optional_course_note_section: string,
        isCorrect: boolean,
        isNew: boolean,
    } | null>(null);
    const [ selection, setSelection ] = useState<string | undefined>('');
    const [ editedSelection, setEditedSelection ] = useState<string | undefined>('');
        const [ isBlank, setIsBlank ] = useState(false);



    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!group.school_required_optional_courses_list.find(c => c.school_optional_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, group.school_required_optional_courses_list])

    // useEffect(() => {
    //     if (selection) {
    //         const selectedCourse = courses.find(course => course.course_name === selection)
    //         if (selectedCourse) {
    //             setOptionalCourse({
    //                 ...optionalCourse,
    //                 school_optional_course_id: selectedCourse.unique_id,
    //             })
    //         }
    //     }
    // }, [selection, courses])

    // useEffect(() => {
    //     if (editedCourse) {
    //         const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_optional_course_id)
    //         if (selectedCourse) {
    //             setOptionalCourse(editedCourse);
    //             setSelection(selectedCourse.course_name)
    //         }
    //     } else {
    //         setOptionalCourse(defaultCourse);
    //         setSelection('')
    //     }
    // }, [editedCourse, courses])

    useEffect(() => {
        if (editedCourse) {
             
            if (input) {
                setEditedOption(editedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_optional_course_id)
                if (selectedCourse) {
                    setEditedSelection(selectedCourse.course_name)
                } else {
                    setEditedSelection('');
                }
                const opt = group.school_required_optional_courses_list.find((inp,i) => i === index);
                if (opt) {
                    setOptionalCourse(opt);
                    const selectedCourse = courses.find(course => course.unique_id === opt.school_optional_course_id)
                    if (selectedCourse) {
                        setSelection(selectedCourse.course_name)
                    } else {
                        setSelection('');
                    }
                } else {
                    setOptionalCourse(defaultCourse);
                    setSelection('')
                }
            } else {
                setOptionalCourse(editedCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedCourse.school_optional_course_id)
                if (selectedCourse) {
                    setSelection(selectedCourse.course_name)
                } else {
                    setSelection('');
                };
                setEditedSelection('');
                setEditedOption(null)
            }
            setIsBlank(false)
        } else {
            if (input) {
                setEditedOption({
                    school_optional_course_id: '',
                    school_optional_course_lab: false,
                    school_optional_course_lab_preferred: false,
                    school_optional_course_credit_hours: 0,
                    school_optional_course_quarter_hours: 0,
                    school_optional_course_note_section: '',
                    isCorrect: true,
                    isNew: true,
                });
                setEditedSelection('');
                setOptionalCourse(defaultCourse);
                setSelection('')
            } else {
                setOptionalCourse(defaultCourse)
                setSelection('')
                setEditedOption(null)
            }
            setIsBlank(true)
            
        }
    }, [editedCourse, input]);

    const handleSelection = (e:any, category: string, isEditedInput: boolean) => {
        const selectedCourse = courses.find(course => course.course_name === e.value);
        if (!isEditedInput && selectedCourse) {
            setSelection(e.value)
            setOptionalCourse({
                ...optionalCourse,
                school_optional_course_id: selectedCourse.unique_id,
            })
        } else if (isEditedInput && selectedCourse) {
            setEditedSelection(e.value)
            editedOption && setEditedOption({
                ...editedOption,
                school_optional_course_id: selectedCourse.unique_id
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setOptionalCourse({
                ...optionalCourse,
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
            setOptionalCourse({
                ...optionalCourse, 
                [e.target.name]: e.target.checked
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                [e.target.name]: e.target.checked,
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
            setOptionalCourse({
                ...optionalCourse,
                school_optional_course_note_section: note,
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                school_optional_course_note_section: note,
            })
        }
        
    };

    const addCourse = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setGroup({
                ...group,
                school_required_optional_courses_list: group.school_required_optional_courses_list.concat(optionalCourse)
            })
        } else {
            editedGroup && editedOption && setEditedGroup({
                ...editedGroup,
                school_required_optional_courses_list: editedGroup.school_required_optional_courses_list.concat(editedOption)
            })
        }
        
    }

    const updateCourse = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setGroup({
                ...group,
                school_required_optional_courses_list: group.school_required_optional_courses_list.map((c,i) => {
                    if (i === index) {
                        return { ...optionalCourse }
                    } else {
                        return { ...c }
                    }
                })
            })
        } else {
            editedGroup && editedOption && setEditedGroup({
                ...editedGroup,
                school_required_optional_courses_list: editedGroup?.school_required_optional_courses_list.map((c,i) => {
                    if (i === index) {
                        return { ...editedOption }
                    } else {
                        return { ...c }
                    }
                })
            })
        }
        
    }

    const addOrUpdateCourse = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && !optionalCourse.school_optional_course_id) {
            alert('Please select a course')
        } else if (input && !editedOption?.school_optional_course_id) {
            alert('Please select a course')
        } else {
            if (editedCourse) {
                updateCourse(isEditedInput)
            } else {
                addCourse(isEditedInput)
            }
            toggleCoursePopup(e);
            setEditedCourse(null)
        }
    }


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded p-4 bg-white'>
                <div className='max-h-[700px] overflow-auto'>
                    <p className='text-xl font-semibold mb-8'>{editedCourse ? 'Edit Course from Required Option' : 'Add Course to Required Option'}</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <SelectFieldsGroup isEdit={isEdit} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedOption ? editedOption.school_optional_course_id : null} 
                        originalInput={optionalCourse.school_optional_course_id} name='school_optional_course_id' category="school_optional_course_id" handleSelect={handleSelection} label={editedSelection} originalLabel={selection}
                        options={courseOptions}
                        />
                        {/* <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/> */}
                    </div>
                    <div className='w-full mb-8'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedOption ? editedOption.school_optional_course_lab : null} 
                        originalInput={optionalCourse.school_optional_course_lab} name='school_optional_course_lab' handleCheck={handleCheck} label="With Lab"
                        />
                        {/* <input type='checkbox' onChange={handleCheck} name='school_optional_course_lab' className='mr-2' checked={optionalCourse.school_optional_course_lab ? true : false}/> */}
                    </div>
                    <div className='w-full mb-8'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedOption ? editedOption.school_optional_course_lab_preferred : null} 
                        originalInput={optionalCourse.school_optional_course_lab_preferred} name='school_optional_course_lab_preferred' handleCheck={handleCheck} label="Lab Preferred"
                        />
                        {/* <input type='checkbox' onChange={handleCheck} name='school_optional_course_lab_preferred' className='mr-2' checked={optionalCourse.school_optional_course_lab_preferred ? true : false}/> */}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <InputFields isEdit={isEdit} newSchool={newSchool} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedOption ? editedOption.school_optional_course_credit_hours : null}
                        originalInput={optionalCourse.school_optional_course_credit_hours} name='school_optional_course_credit_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={optionalCourse.school_optional_course_credit_hours ? optionalCourse.school_optional_course_credit_hours : ''} name='school_optional_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <InputFields isEdit={isEdit} newSchool={newSchool} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={editedOption ? editedOption.school_optional_course_quarter_hours : null}
                        originalInput={optionalCourse.school_optional_course_quarter_hours} name='school_optional_course_quarter_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={optionalCourse.school_optional_course_quarter_hours ? optionalCourse.school_optional_course_quarter_hours : ''}  name='school_optional_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={editedOption ? editedOption.school_optional_course_note_section : optionalCourse.school_optional_course_note_section}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleCoursePopup(e); setEditedCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => {input ? addOrUpdateCourse(e, true) : addOrUpdateCourse(e, false)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}