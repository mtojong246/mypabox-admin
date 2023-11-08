import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { School } from '../../../../types/schools.types';
import { Dispatch, SetStateAction, MouseEvent, useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

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
];

interface Options {
    school_minimum_number_of_evaluators_required_in_group: number;
    school_required_optional_group_evaluator_title: string[];
    school_minimum_time_evaluator_knows_applicant: string;
}

export default function AddRequiredOption({ newSchool, setNewSchool, toggleOptions, editedOption, setEditedOption, groupIndex }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>, 
    toggleOptions: (e: MouseEvent<HTMLButtonElement>) => void,
    editedOption: Options | null,
    setEditedOption: Dispatch<SetStateAction<Options | null>>,
    groupIndex: number | null,
}) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    
    const [ evaluator, setEvaluator ] = useState('');

   const [ options, setOptions ] = useState<Options>({
        school_minimum_number_of_evaluators_required_in_group: 0,
        school_required_optional_group_evaluator_title: [],
        school_minimum_time_evaluator_knows_applicant: '',
   });

   useEffect(() => {
    setOptions({
        ...options,
        school_minimum_time_evaluator_knows_applicant: selection.number + ' ' + selection.duration,
    })
   }, [selection]);

   useEffect(() => {
    if (editedOption) {
        setOptions(editedOption);
        const arr = editedOption.school_minimum_time_evaluator_knows_applicant.split(' ');
        setSelection({
            number: arr[0],
            duration: arr[1],
        })
    } else {
        setOptions({
            school_minimum_number_of_evaluators_required_in_group: 0,
            school_required_optional_group_evaluator_title: [],
            school_minimum_time_evaluator_knows_applicant: '',
       });
       setSelection({
        number: '',
        duration: '',
    })
    }
   }, [editedOption]);



   const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSelection({
            ...selection,
            number: e.target.value,
        })
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setOptions({
            ...options,
            school_minimum_number_of_evaluators_required_in_group: Number(e.target.value),
        })
    };

    const addEvaluator = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const titleExists = options.school_required_optional_group_evaluator_title.find(title => title === evaluator);
        if (!evaluator) return;
        if (titleExists) return;
        setOptions({
            ...options,
            school_required_optional_group_evaluator_title: options.school_required_optional_group_evaluator_title.concat(evaluator)
        })
    };

    const deleteEvaluator = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setOptions({
            ...options,
            school_required_optional_group_evaluator_title: options.school_required_optional_group_evaluator_title.filter((t,i) => i !== index)
        })
    };

    const addOption = () => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_optional_evaluators_required: newSchool.school_evaluations_required.school_optional_evaluators_required!.concat(options)
            }
        })
    }

    const updateOption = () => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_optional_evaluators_required: newSchool.school_evaluations_required.school_optional_evaluators_required!.map((opt,i) => {
                    if (i === groupIndex) {
                        return { ...options }
                    } else {
                        return { ...opt }
                    }
                })
            }
        })
    };

    const addOrUpdateOption = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!options.school_required_optional_group_evaluator_title.length) {
            alert('Please add at least one evaluator');
            return;
        }
        if (editedOption) {
            updateOption();
        } else {
            addOption();
        }
        toggleOptions(e);
        setEditedOption(null);
    }
    
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='relative w-full max-w-[900px] max-h-[700px] overflow-y-scroll rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedOption ? 'Edit' : 'Add'} Required Optional Evaluators</p>
                    <div className='w-full mb-8'>
                        <label className='text-lg font-medium'>Minimum Number of Evaluators Required:</label>
                        <input onChange={handleInput} value={options.school_minimum_number_of_evaluators_required_in_group ? options.school_minimum_number_of_evaluators_required_in_group : ''} className='w-32 focus:outline-none border border-[#B4B4B4] h-[50px] px-3 rounded mt-2 block' />
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium text-lg'>Evaluator titles:</label>
                        <div className='w-full flex justify-between items-center gap-4 mt-2'>
                            <div className='grow flex justify-center items-start gap-1'>
                                <CreatableSelect onChange={(e:any) => setEvaluator(e.value)} options={evaluatorOptions} className="grow focus:outline-none rounded" />
                                <Tooltip title="Type and press enter to create new option" placement='right'>
                                    <IconButton style={{padding: '0px'}}>
                                        <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <button onClick={addEvaluator} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                                Add Evaluator
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${options.school_required_optional_group_evaluator_title.length ? 'mt-3' : 'mt-0'}`}>
                        {options.school_required_optional_group_evaluator_title.map((opt, i) => {
                            return (
                                <div className='py-2 pl-3 pr-2 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='font-bold text-xl'>{opt}</p>
                                        <button onClick={(e) => deleteEvaluator(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium text-lg'>Minimum Time Evaluator Knows Applicant:</label>
                        <div className='flex justify-start items-center gap-2 mt-2'>
                            <input onChange={handleNumber} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={timeOptions} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div> 
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleOptions(e); setEditedOption(null)}} className='text-xl border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-5 h-[50px] rounded'>Cancel</button>
                        <button onClick={addOrUpdateOption} className='text-xl border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-5 h-[50px] rounded'>{editedOption ? 'Edit' : 'Add'} Option</button>
                    </div>
                </div>
            </div>
        </div>
    )
}