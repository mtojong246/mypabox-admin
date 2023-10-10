import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { School } from "../../../../types/schools.types";
import CreatableSelect from 'react-select';
import Select from 'react-select';
import AddRequiredOption from "./AddRequiredOption";

const evaluatorOptions = [
    {value: 'PA', label: 'PA'},
    {value: 'MD', label: 'MD'},
    {value: 'DO', label: 'DO'},
    {value: 'NP', label: 'NP'},
    {value: 'PhD', label: 'PhD'},
];

const timeOptions = [
    {value: 'months', label: 'months'},
    {value: 'years', label: 'years'}
]

export default function EvaluationsRequired({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>}) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ openOptions, setOpenOptions ] = useState(false);

    const toggleOptions = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenOptions(!openOptions);
    }

    useEffect(() => {
        if (newSchool.school_evaluations_required.input) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_minimum_number_of_evaluations_required: 0,
                    school_required_evaluator_title: '',
                    school_minimum_time_evaluator_knows_applicant: '',
                    school_optional_evaluators_required: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_minimum_number_of_evaluations_required: null,
                    school_required_evaluator_title: null,
                    school_minimum_time_evaluator_knows_applicant: null,
                    school_optional_evaluators_required: null,
                }
            })
        }
    }, [newSchool.school_evaluations_required.input]);

    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_minimum_time_evaluator_knows_applicant: selection.number + ' ' + selection.duration
            }
        })
    }, [selection])


    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                input: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleSelect = (e:any, name: string) => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                [name]: e.value,
            }
        })
    }

    const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSelection({
            ...selection,
            number: e.target.value,
        })
    }

    

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Evaluations Required</label>  
            <div className='w-full mt-2 mb-4'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={handleCheck} checked={newSchool.school_evaluations_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_evaluations_required.input ? 'True' : 'False'}</span>
                </label>
            </div>
            {newSchool.school_evaluations_required.input && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Number of Evaluations Required</label>  
                        <input onChange={handleInput} name='school_minimum_number_of_evaluations_required' value={newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Evaluator Title</label> 
                        <CreatableSelect onChange={(e) => handleSelect(e, 'school_required_evaluator_title')} options={evaluatorOptions} value={newSchool.school_evaluations_required.school_required_evaluator_title ? {value: newSchool.school_evaluations_required.school_required_evaluator_title, label: newSchool.school_evaluations_required.school_required_evaluator_title} : null} className="w-1/3 focus:outline-none"/> 
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Evaluator Knows Applicant</label> 
                        <div className='flex justify-start items-center gap-2'>
                            <input onChange={handleNumber} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={timeOptions} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div>      
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Optional Evaluators Required</label>  
                        <button onClick={toggleOptions} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Option
                        </button> 
                    </div> 
                </>
            )}
            {newSchool.school_evaluations_required.input && <label className='font-medium text-xl inline-block mt-8'>Notes:</label>}
            <button className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
        </div>
        {openOptions && <AddRequiredOption newSchool={newSchool} setNewSchool={setNewSchool} toggleOptions={toggleOptions}/>}
        </>

    )
}