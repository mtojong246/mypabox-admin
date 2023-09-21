import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, ChangeEvent } from "react"

export default function VolunteerService({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    
    useEffect(() => {
        if (newSchool.school_volunteer_service.school_volunteer_service_recommended) {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_minimum_volunteer_service_hours_recommended: {
                        input: 0,
                        school_minimum_volunteer_service_hours_recommended_notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_minimum_volunteer_service_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_volunteer_service.school_volunteer_service_recommended])
    
    useEffect(() => {
        if (newSchool.school_volunteer_service.school_volunteer_service_required) {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_minimum_volunteer_service_hours_required: {
                        input: 0,
                        school_minimum_volunteer_service_hours_required_notes: [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_minimum_volunteer_service_hours_required: null,
                }
            })
        }
    }, [newSchool.school_volunteer_service.school_volunteer_service_required])
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_volunteer_service: {
                ...newSchool.school_volunteer_service,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const field = newSchool.school_volunteer_service[e.target.name as keyof object] as object;
        if (e.target.name) {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    [e.target.name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_average_volunteer_service_hours_accepted_previous_cycle: Number(e.target.value)
                }
            })
        }
    }

    return (
        <div className={`mt-20 relative max-w-[900px] border p-5 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Volunteer Service</label>   
            
            <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_volunteer_service.school_volunteer_service_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Volunteer Service Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input name='school_volunteer_service_required' onChange={handleCheck} checked={newSchool.school_volunteer_service.school_volunteer_service_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_volunteer_service.school_volunteer_service_required ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_volunteer_service.school_volunteer_service_required && (
                <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Volunteer Service Hours Required</label>   
                    <input onChange={handleInput} value={newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_required?.input} name='school_minimum_volunteer_service_hours_required' className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mb-4' />  
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>            
                </div>
                )}
            </div>

            <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_volunteer_service.school_volunteer_service_recommended ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Volunteer Service Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input name='school_volunteer_service_recommended' onChange={handleCheck} checked={newSchool.school_volunteer_service.school_volunteer_service_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_volunteer_service.school_volunteer_service_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_volunteer_service.school_volunteer_service_recommended && (
                <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Volunteer Service Hours Recommended</label>   
                    <input onChange={handleInput} value={newSchool.school_volunteer_service.school_minimum_volunteer_service_hours_recommended?.input} name='school_minimum_volunteer_service_hours_recommended' className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mb-4' />  
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>            
                </div>
                )}
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average Volunteer Service Hours Accepted Previous Cycle</label>   
                <input onChange={handleInput} value={newSchool.school_volunteer_service.school_average_volunteer_service_hours_accepted_previous_cycle} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
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