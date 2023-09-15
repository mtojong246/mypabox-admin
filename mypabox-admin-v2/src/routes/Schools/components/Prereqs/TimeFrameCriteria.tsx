import Select from 'react-select';
import { School, StringInput } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const options = [
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
    { value: 'years', label: 'years' }
]

export default function TimeFrameCriteria({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
 }) {
    const [ allSelection, setAllSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ scienceSelection, setScienceSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ mathSelection, setMathSelection ] = useState({
        number: '',
        duration: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'school_time_frame_all_courses_must_be_completed') {
            setAllSelection({
                ...allSelection,
                number: e.target.value.toString().trim()
            })
        } else if (e.target.name === 'school_time_frame_science_courses_must_be_completed') {
            setScienceSelection({
                ...scienceSelection,
                number: e.target.value.toString().trim()
            })
        } else {
            setMathSelection({
                ...mathSelection,
                number: e.target.value.toString().trim()
            })
        }
    }

    const handleSelect = (e:any, name: string) => {
        if (name === 'school_time_frame_all_courses_must_be_completed') {
            setAllSelection({
                ...allSelection,
                duration: e.value,
            })
        } else if (name === 'school_time_frame_science_courses_must_be_completed') {
            setScienceSelection({
                ...scienceSelection,
                duration: e.value, 
            })
        } else {
            setMathSelection({
                ...mathSelection,
                duration: e.value,
            })
        }
    }

    const setSelection = (e:any, name: string) => {
        e.preventDefault();
        let selection = {
            number: '',
            duration: '',
        };
        if (name === 'school_time_frame_all_courses_must_be_completed') {
            selection = allSelection;
        } else if (name === 'school_time_frame_science_courses_must_be_completed') {
            selection = scienceSelection;
        } else {
            selection = mathSelection;
        }
        const field = newSchool.school_time_frame_criteria[name as keyof object] as StringInput;
        setNewSchool({
            ...newSchool,
            school_time_frame_criteria: {
                ...newSchool.school_time_frame_criteria,
                [name]: {
                    ...field,
                    input: selection.number + ' ' + selection.duration,
                }
            }
        })
    }

    return (
        <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Time Frame Criteria</label>   
            <div className={`mt-8 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">All Courses Must Be Completed Within:</label> 
                <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
                </button>
                <div className='flex justify-start items-center gap-2 mt-5'>
                    <input onChange={handleInput} name='school_time_frame_all_courses_must_be_completed' value={allSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    <Select options={options} value={allSelection.duration ? {value: allSelection.duration, label: allSelection.duration} : null} onChange={(e) => handleSelect(e, 'school_time_frame_all_courses_must_be_completed')} className="w-1/3 focus:outline-none"/>
                    <button onClick={(e) => setSelection(e, 'school_time_frame_all_courses_must_be_completed')} className="border text-[#4573D2] border-[#4573D2] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                    Set
                    </button>
                </div>
            </div>
            <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">All SCIENCE Courses Must Be Completed Within:</label> 
                <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
                </button>
                <div className='flex justify-start items-center gap-2 mt-5'>
                    <input onChange={handleInput} name='school_time_frame_science_courses_must_be_completed' value={scienceSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    <Select options={options} value={scienceSelection.duration ? {value: scienceSelection.duration, label: scienceSelection.duration} : null} onChange={(e) => handleSelect(e, 'school_time_frame_science_courses_must_be_completed')}  className="w-1/3 focus:outline-none"/>
                    <button onClick={(e) => setSelection(e, 'school_time_frame_science_courses_must_be_completed')} className="border text-[#4573D2] border-[#4573D2] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                    Set
                    </button>
                </div>
            </div>
            <div className={`mt-14 relative w-full border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">All MATH Courses Must Be Completed Within:</label> 
                <button className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
                </button>
                <div className='flex justify-start items-center gap-2 mt-5'>
                    <input onChange={handleInput} name='school_time_frame_math_courses_must_be_completed' value={mathSelection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    <Select options={options} value={mathSelection.duration ? {value: mathSelection.duration, label: mathSelection.duration} : null} onChange={(e) => handleSelect(e, 'school_time_frame_math_courses_must_be_completed')} className="w-1/3 focus:outline-none"/>
                    <button onClick={(e) => setSelection(e, 'school_time_frame_math_courses_must_be_completed')} className="border text-[#4573D2] border-[#4573D2] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                    Set
                    </button>
                </div>
            </div>
            <div className='w-full mt-14'>
                <label className='font-medium text-xl'>Notes:</label>
                <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
            </div>
        </div>
    )
}