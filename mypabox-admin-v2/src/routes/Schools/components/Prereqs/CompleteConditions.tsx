import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from "react"
import { School } from "../../../../types/schools.types"
import Select from 'react-select';
import { NumberInput, StringInput } from "../../../../types/schools.types";

const options = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
]

const semesterOptions = [
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Summer', label: 'Summer' }
]


export default function CompleteConditions({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
 }) {

    useEffect(() => {
        if (newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying) {
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    school_maximum_number_of_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_credits_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_science_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_maximum_number_of_non_science_courses_pending_while_applying: {
                        input: 0,
                        notes: [],
                    },
                    school_minimum_grade_required_for_pending_courses: {
                        input: '',
                        notes: [],
                    },
                    school_date_pending_courses_must_be_completed: {
                        input: '',
                        notes: [],
                    },
                    school_semester_pending_courses_must_be_completed: {
                        input: '',
                        notes: [],
                    },
                }
            })
        } else {
            const updatedSchool = {...newSchool};
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying;
            delete updatedSchool.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses;
            delete updatedSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed;
            delete updatedSchool.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed;
            setNewSchool(updatedSchool)
        }
    }, [newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_prerequisite_completion_criteria: {
                ...newSchool.school_prerequisite_completion_criteria,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof object;
        const field = newSchool.school_prerequisite_completion_criteria[name] as NumberInput | StringInput;
        setNewSchool({
            ...newSchool,
            school_prerequisite_completion_criteria: {
                ...newSchool.school_prerequisite_completion_criteria,
                [name]: {
                    ...field,
                    input: e.target.value,
                }
            }
        })

    }

    console.log(newSchool.school_prerequisite_completion_criteria)

    return (
        <>
            <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">All Courses Must Be Completed Before Applying</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_all_courses_most_be_completed_before_applying' checked={newSchool.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>
            <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Courses Can Be In Progress While Applying</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_courses_can_be_in_progress_while_applying' checked={newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying && (
                <>
                    <div className={`mt-8 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Courses Pending While Applying:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying?.input} name='school_maximum_number_of_courses_pending_while_applying' className='mt-5 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of Credits Pending While Applying:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying?.input} name='school_maximum_number_of_credits_pending_while_applying' className='mt-5 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of SCIENCE Courses Pending While Applying:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying?.input} name='school_maximum_number_of_science_courses_pending_while_applying' className='mt-5 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Max Number of NON-SCIENCE Courses Pending While Applying:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying?.input} name='school_maximum_number_of_non_science_courses_pending_while_applying' className='mt-5 w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Grade Required for Pending Courses:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <Select options={options} className="mt-5 w-1/3 focus:outline-none"/>
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Date Pending Courses Must Be Completed:</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <input onChange={handleInput} value={newSchool.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed?.input} name='school_date_pending_courses_must_be_completed' type='date' className='mt-5 w-1/3 focus:outline-none border border-[#B4B4B4] px-4 h-[58px] text-lg rounded-lg' />  
                    </div>
                    <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Semester Pending Courses Must Be Completed</label> 
                        <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <Select options={semesterOptions} className="mt-5 w-1/3 focus:outline-none"/>
                    </div>
                </>
                )}
            </div>
            <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">Completion Criteria Notes</label>   
                <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
        </>
    )
}