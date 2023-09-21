import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { School } from "../../../../types/schools.types"
import Select from 'react-select';

const options = [
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
    { value: 'years', label: 'years' }
]

export default function PatientExperience({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    })

    useEffect(() => {
        if (newSchool.school_patient_experience.school_patient_experience_required) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: {
                        input: 0,
                        school_minimum_patient_care_experience_hours_required_notes: [],
                    },
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        input: '',
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_minimum_patient_care_experience_hours_required: null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: null,
                }
            })
        }
    }, [newSchool.school_patient_experience.school_patient_experience_required])

    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    ...newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed!,
                    input: selection.number + ' ' + selection.duration,
                }
            }
        })
    }, [selection])
    
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool.school_patient_experience[e.target.name as keyof object] as object;
        if (e.target.name) {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_average_patient_care_experience_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        }
    }

    const handleSelectionNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSelection({
            ...selection,
            number: e.target.value.trim(),
        })
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_patient_experience: {
                ...newSchool.school_patient_experience,
                school_patient_experience_required: e.target.checked,
            }
        })
    }

    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Patient Experience</label>   
            
            <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_patient_experience.school_patient_experience_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Patient Experience Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} checked={newSchool.school_patient_experience.school_patient_experience_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_patient_experience.school_patient_experience_required ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_patient_experience.school_patient_experience_required && (
                <>
                    <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Patient Care Experience Hours Required</label>   
                        <input onChange={handleInput} value={newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required?.input} name='school_minimum_patient_care_experience_hours_required' className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mb-4' />  
                        <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>            
                    </div>

                    <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame Patient Care Experience Needs To Be Completed</label>   
                        <div className='flex justify-start items-center gap-2 mb-4'>
                            <input onChange={handleSelectionNumber} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={options} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div>
                        <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>            
                    </div>
                </>
                )}
            </div>

            

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Patient Care Experience Hours Accepted Previous Cycle</label>   
                <input onChange={handleInput} value={newSchool.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className='w-full mt-10'>
                <label className='font-medium text-xl'>Notes:</label>
                <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
        </div>
    )
}