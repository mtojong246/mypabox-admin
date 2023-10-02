import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState } from "react";
import { School } from "../../../../types/schools.types";

export default function PACAT({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ pacatRequiredOrRecommended, setPacatRequiredOrRecommended ] = useState(false);

    useEffect(() => {
        if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && !pacatRequiredOrRecommended) {
            setPacatRequiredOrRecommended(true);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: 0,
                    school_pacat_exam_scaled_minimum_score_required: 0,
                    school_pacat_exam_group_scaled_minimum_score_required: 0,
                }
            })
        } else if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && pacatRequiredOrRecommended) {
            return
        } else if (!newSchool.school_pacat.school_pacat_required && !newSchool.school_pacat.school_pacat_recommended) {
            setPacatRequiredOrRecommended(false);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: null,
                    school_pacat_exam_scaled_minimum_score_required: null,
                    school_pacat_exam_group_scaled_minimum_score_required: null,
                }
            })
        }
    }, [newSchool.school_pacat.school_pacat_required, newSchool.school_pacat.school_pacat_recommended])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_pacat: {
                ...newSchool.school_pacat,
                [e.target.name]: e.target.value,
            }
        })
    }


    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border py-5 px-10 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">PACAT</label>   

            <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PACAT Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_pacat_required' checked={newSchool.school_pacat.school_pacat_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_pacat.school_pacat_required ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

            <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">PACAT Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_pacat_recommended' checked={newSchool.school_pacat.school_pacat_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_pacat.school_pacat_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>
            {pacatRequiredOrRecommended && (
            <>
                <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PACAT Exam School Code</label>   
                    <input onChange={handleInput} name='school_pacat_exam_school_code' value={newSchool.school_pacat.school_pacat_exam_school_code as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
                </div>

                <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PACAT Exam Scaled Minimum Score Required</label>   
                    <input onChange={handleInput} name='school_pacat_exam_scaled_minimum_score_required' value={newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
                </div>

                <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PACAT Exam Group Scaled Minimum Score Required</label>   
                    <input onChange={handleInput} name='school_pacat_exam_group_scaled_minimum_score_required' value={newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
                </div>
            </>
            )}

            <div className={`w-full mt-8 mb-5`}>
                <label className='font-medium text-xl'>Notes:</label>
                <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
            
        </div>
        </>
    )
}