import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction } from "react"
import PatientExperience from "./PatientExperience"
import HealthcareExperience from "./HealthcareExperience"
import CommunityService from "./CommunityService"
import VolunteerService from "./VolunteerService"

export default function Experience({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>}) {
    
    
    return (
        <>
        {newSchool && (
            <>
                <div className={`mt-10 relative max-w-[900px] border p-5 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Paid Experience Required</label>   
                    <div className="mb-4 mt-2 w-full">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">False</span>
                        </label>
                    </div>
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>


                <PatientExperience />
                <HealthcareExperience />
                <CommunityService />
                <VolunteerService />
            </>
        )}
        </>
    )
}