import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { School } from "../../../../types/schools.types"

const dataArray = [
    {
        name: 'Pass/Fail Criteria',
        value: 'school_pass_fail_criteria',
        input: 'school_pass_fail_grade_accepted',
        notes: 'school_pass_fail_grade_criteria_note_section',
    },
    {
        name: 'AP Criteria',
        value: 'school_ap_criteria',
        input: 'school_ap_courses_accepted',
        notes: 'school_ap_courses_criteria_note_section',
    },
    {
        name: 'Community College Criteria',
        value: 'school_community_college_criteria',
        input: 'school_community_college_credits_accepted',
        notes: 'school_community_college_criteria_note_section',
    },
    {
        name: 'CLEP Critera',
        value: 'school_clep_criteria',
        input: 'school_clep_credits_accepted',
        notes: 'school_clep_credits_criteria_note_section',
    },
    {
        name: 'Online Courses Criteria',
        value: 'school_online_courses_criteria',
        input: 'school_online_courses_accepted',
        notes: 'school_online_courses_criteria_note_section',
    }
]

export default function BooleanInputs({ newSchool, setNewSchool }: {
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
}) {

    const handleChecked = (e: ChangeEvent<HTMLInputElement>, input: string) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name] as object;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                [input]: e.target.checked,
            }
        })
    }


    return (
        <>
        {dataArray.map((data,i) => {
            let field = newSchool[data.value as keyof School] as object;
            return (
                <div className={`${i > 0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">{data.name}</label>   
                    <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                    </button>
                    <div className='mt-5 w-full'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" name={data.value} onChange={(e) => handleChecked(e, data.input)} value={field[data.input as keyof object]}/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{field[data.input as keyof object] ? 'True' : 'False'}</span>
                        </label>
                    </div>
                </div>
            )
        })}
        </>
    )
}