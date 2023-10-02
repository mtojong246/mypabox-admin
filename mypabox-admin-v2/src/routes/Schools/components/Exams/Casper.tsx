import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, ChangeEvent } from "react"

export default function Casper({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_casper: {
                ...newSchool.school_casper,
                [e.target.name]: e.target.checked,
            }
        })
    }
    
    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border py-5 px-10 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">Casper</label>   

            <div className={`mt-8 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Casper Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_casper_required' checked={newSchool.school_casper.school_casper_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_casper.school_casper_required ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

            <div className={`mt-14 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Casper Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_casper_recommended' checked={newSchool.school_casper.school_casper_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_casper.school_casper_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

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