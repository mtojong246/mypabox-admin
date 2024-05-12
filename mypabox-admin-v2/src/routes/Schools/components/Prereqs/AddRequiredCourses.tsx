import ReactQuill from "react-quill";
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../../../app/selectors/courses.selectors';
import { School } from '../../../../types/schools.types';
import { Course } from '../../../../types/courses.types';
import SelectFieldsGroup from '../../Assets/SelectFieldsGroup';
import { UserObject } from '../../../../types/users.types';
import BooleanFields from '../../Assets/BooleanFields';
import InputFields from '../../Assets/InputsFields';

const defaultCourse = {
    school_required_course_id: '',
    school_required_course_lab: false,
    school_required_course_lab_preferred: false,
    school_required_course_credit_hours: 0,
    school_required_course_quarter_hours: 0,
    school_required_course_note_section: '',
}

interface ReqCourseType {
    school_required_course_id: string,
    school_required_course_lab: boolean,
    school_required_course_lab_preferred: boolean,
    school_required_course_credit_hours: number,
    school_required_course_quarter_hours: number,
    school_required_course_note_section: string,
}

export default function AddRequiredCourses({loggedInUser, isEdit, toggleRequiredCourses, editedRequiredCourse, setEditedRequiredCourse, newSchool, setNewSchool, input, originalInput, groupIndex }: { 
    toggleRequiredCourses: (e:any) => void, 
    loggedInUser: UserObject,
    editedRequiredCourse: any | null,
    setEditedRequiredCourse: Dispatch<SetStateAction<any | null>>,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    input: boolean | null,
    originalInput: {
        school_required_course_id: string;
        school_required_course_lab: boolean;
        school_required_course_lab_preferred: boolean;
        school_required_course_credit_hours: number;
        school_required_course_quarter_hours: number;
        school_required_course_note_section: string;
    }[],
    groupIndex: number | null,
    isEdit: boolean
}) {
    const courses = useSelector(selectCourses)
    const [ courseOptions, setCourseOptions ] = useState<{ value: string, label: string }[]>([]);
    const [ requiredCourse, setRequiredCourse ] = useState<ReqCourseType | null>(null);
    const [ editedOption, setEditedOption ] = useState<{
        school_required_course_id:  string,
        school_required_course_lab: boolean,
        school_required_course_lab_preferred: boolean,
        school_required_course_credit_hours: number,
        school_required_course_quarter_hours: number,
        school_required_course_note_section: string,
        isNew: boolean,
        isCorrect: boolean,
    }| null>(null)
    const [ selection, setSelection ] = useState<string | undefined>('');
    const [ editedSelection, setEditedSelection ] = useState<string | undefined>('');
    const [ isBlank, setIsBlank ] = useState(false);


    useEffect(() => {
        let filteredCourses = [] as Course[];
        courses.forEach(course => {
            if (!newSchool.school_prereq_required_courses.find(c => c.school_required_course_id === course.unique_id)) {
                filteredCourses.push(course)
            }
        })
        setCourseOptions(filteredCourses.map(course => (
            { value: course.course_name, label: course.course_name }
        )))
    }, [courses, newSchool.school_prereq_required_courses])

   

    const addCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput && requiredCourse) {
            const field = newSchool.school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: field.concat(requiredCourse)
            })
        } else {
            const field = newSchool.edited_school_prereq_required_courses;
            editedOption && setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
                    ...field,
                    input: field.input!.concat(editedOption)
                }
            })
        }
        
    }

    const updateCourseOrCategory = (isEditedInput: boolean) => {
        if (!isEditedInput && requiredCourse) {
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: newSchool.school_prereq_required_courses.map((group,i) => {
                    if (i === groupIndex) {
                        return { ...requiredCourse }
                    } else {
                        return { ...group }
                    }
                })
            })
        } else {
            const field = newSchool.edited_school_prereq_required_courses;
            editedOption && setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
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
        if (editedRequiredCourse !== null) {
             
            if (input) {
                setEditedOption(editedRequiredCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedRequiredCourse.school_required_course_id)
                if (selectedCourse) {
                    setEditedSelection(selectedCourse.course_name)
                } else {
                    setEditedSelection('');
                }
                const opt = originalInput.find((inp,i) => i === groupIndex);
                
                if (opt) {
                    setRequiredCourse(opt);
                    const selectedCourse = courses.find(course => course.unique_id === opt.school_required_course_id)
                    if (selectedCourse) {
                        setSelection(selectedCourse.course_name)
                    } else {
                        setSelection('');
                    }
                } else {
                    setRequiredCourse(defaultCourse);
                    setSelection('')
                }
            } else {
                setRequiredCourse(editedRequiredCourse);
                const selectedCourse = courses.find(course => course.unique_id === editedRequiredCourse.school_required_course_id)
                if (selectedCourse) {
                    setSelection(selectedCourse.course_name)
                } else {
                    setSelection('');
                };
                setEditedSelection('');
                setEditedOption(null);

                
            }
            setIsBlank(false);
        } else {
            if (input) {
                setEditedOption({
                    school_required_course_id: '',
                    school_required_course_lab: false,
                    school_required_course_lab_preferred: false,
                    school_required_course_credit_hours: 0,
                    school_required_course_quarter_hours: 0,
                    school_required_course_note_section:  '',
                    isCorrect: true,
                    isNew: true,
                });
                setEditedSelection('');
                setRequiredCourse(defaultCourse);
                setSelection('')
            } else {
                setRequiredCourse(defaultCourse)
                setSelection('')
                setEditedOption(null)
            }
            setIsBlank(true);
            
        }
    }, [editedRequiredCourse, input, originalInput, groupIndex, courses]);

  

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput && requiredCourse) {
            setRequiredCourse({
                ...requiredCourse,
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
        if (!isEditedInput && requiredCourse) {
            setRequiredCourse({
                ...requiredCourse, 
                [e.target.name]: e.target.checked
            })
        } else {
            editedOption && setEditedOption({
                ...editedOption,
                [e.target.name]: e.target.checked,
            })
        }
        
    }

    const handleSelection = (e:any, category: string, isEditedInput: boolean) => {
        const selectedCourse = courses.find(course => course.course_name === e.value);
        if (!isEditedInput && selectedCourse && requiredCourse) {
            setSelection(e.value)
            setRequiredCourse({
                ...requiredCourse,
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
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded && requiredCourse) {
            setRequiredCourse({
                ...requiredCourse,
                school_required_course_note_section: note,
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            editedOption && setEditedOption({
                ...editedOption,
                school_required_course_note_section: note,
            })
        }
        
    }

    const addOrEditCourse = (e:any, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && requiredCourse && !requiredCourse.school_required_course_id) {
            alert('Please select a course')
        } else if (input && editedOption && !editedOption.school_required_course_id) {
            alert('Please select a course')
        } else  {
            toggleRequiredCourses(e);
            if (editedRequiredCourse) {
                updateCourseOrCategory(isEditedInput)     
            } else {
                addCourseOrCategory(isEditedInput)
            }
            setEditedRequiredCourse(null)
        }
    }



    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded p-4 bg-white'>
                    <div className='max-h-[700px] overflow-auto'>
                    <p className='text-xl font-semibold mb-8'>{editedRequiredCourse ? 'Edit' : 'Add'} Required Course</p>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Course name:</label>
                        <SelectFieldsGroup isEdit={isEdit} isBlank={isBlank} label={editedSelection} originalLabel={selection} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={editedOption && editedOption.school_required_course_id} handleSelect={handleSelection} 
                        originalInput={requiredCourse && requiredCourse.school_required_course_id} category='school_required_course_id' name='school_required_course_id' options={courseOptions}/>
                        {/* <Select onChange={(e) => setSelection(e?.value)} value={selection ? { value: selection, label: selection } : null} className='w-full focus:outline-none rounded mt-2' options={courseOptions}/> */}
                    </div>
                    {/* <div className='w-full mb-8 flex justify-start items-center gap-10'> */}
                        <div className='w-full mb-8'>
                            <BooleanFields isEdit={isEdit} newSchool={newSchool}  isBlank={isBlank} label="With Lab" loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={editedOption && editedOption.school_required_course_lab} originalInput={requiredCourse && requiredCourse.school_required_course_lab}
                            name='school_required_course_lab' handleCheck={handleCheck}
                            />
                            {/* <input type='checkbox' name='school_required_course_lab' className='mr-2' onChange={handleCheck} checked={requiredCourse.school_required_course_lab ? true : false}/> */}
                            {/* <label className='font-medium'>With Lab</label> */}
                        </div>
                        <div className='w-full mb-8'>
                            <BooleanFields isEdit={isEdit} newSchool={newSchool}  isBlank={isBlank} label="Lab Preferred" loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={editedOption && editedOption.school_required_course_lab_preferred} 
                            originalInput={requiredCourse && requiredCourse.school_required_course_lab_preferred} name='school_required_course_lab_preferred' handleCheck={handleCheck}
                            />
                            {/* <input type='checkbox' name='school_required_course_lab_preferred' className='mr-2' onChange={handleCheck} checked={requiredCourse.school_required_course_lab_preferred ? true : false}/> */}
                            {/* <label className='font-medium'>Lab Preferred</label> */}
                        </div>
                    {/* </div> */}
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Credits:</label>
                        <InputFields isEdit={isEdit} newSchool={newSchool} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={editedOption && editedOption.school_required_course_credit_hours}
                        originalInput={requiredCourse && requiredCourse.school_required_course_credit_hours} name='school_required_course_credit_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={requiredCourse.school_required_course_credit_hours ? requiredCourse.school_required_course_credit_hours : ''} name='school_required_course_credit_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium'>Quarter hours:</label>
                        <InputFields isEdit={isEdit} newSchool={newSchool} isBlank={isBlank} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={editedOption && editedOption.school_required_course_quarter_hours} 
                        originalInput={requiredCourse && requiredCourse.school_required_course_quarter_hours} name='school_required_course_quarter_hours' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={requiredCourse.school_required_course_quarter_hours ? requiredCourse.school_required_course_quarter_hours : ''} name='school_required_course_quarter_hours' className='w-32 focus:outline-none border border-[#B4B4B4] py-2 px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={editedOption ? editedOption.school_required_course_note_section : requiredCourse ? requiredCourse.school_required_course_note_section : ''}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleRequiredCourses(e); setEditedRequiredCourse(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => {input ? addOrEditCourse(e, true) : addOrEditCourse(e, false)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:bg-[#3558A0]'>{editedRequiredCourse ? 'Edit' : 'Add'} course</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}