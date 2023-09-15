import Select from 'react-select';
import { School } from '../../../../types/schools.types';
import { Dispatch, SetStateAction, useState, useEffect} from 'react';
import AddNote from './AddNote';

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

export default function MinimumGrade({ newSchool, setNewSchool }: {  
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>
}) {
    const [ selection, setSelection ] = useState('');
    const [ openNote, setOpenNote ] = useState(false);

    const toggleNote = (e: any) => {
        e.preventDefault();
        setOpenNote(!openNote)
    }

    useEffect(() => {
        setSelection(newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses)
    }, [newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses])

    const handleSelect = (e: any) => {
        const field = newSchool.school_grade_criteria;
        setNewSchool({
            ...newSchool,
            school_grade_criteria: {
                ...field,
                school_minimum_grade_required_for_all_courses: e.value,
            }
        })
    }

    return (
        <div className={`mt-28 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Minimum Grade Required for All Courses</label>   
            <button onClick={toggleNote} className="border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            <Select className="w-1/3 focus:outline-none rounded mt-4" options={options} value={selection ? {value: selection, label: selection} : null} onChange={handleSelect}/>
        </div>
    )
}