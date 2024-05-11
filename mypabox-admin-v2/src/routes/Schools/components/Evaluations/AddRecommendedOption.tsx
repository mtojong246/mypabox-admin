import { AiOutlineClose } from 'react-icons/ai'
import CreatableSelect from 'react-select/creatable';
import { School } from '../../../../types/schools.types';
import { Dispatch, SetStateAction, MouseEvent, useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputFields from '../../Assets/InputsFields';
import { UserObject } from '../../../../types/users.types';
import SelectInputsFields from '../../Assets/SelectInputsFields';
import { LuUndo2 } from 'react-icons/lu';

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
    school_minimum_number_evaluators_recommended_in_group: number;
    school_recommended_optional_group_evaluator_title: string[];
    school_minimum_time_evaluator_knows_applicant: string;
}

export default function AddRecommendedOption({ newSchool, setNewSchool, toggleOptions, editedOption, setEditedOption, groupIndex, input, originalInput, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>, 
    toggleOptions: (e: MouseEvent<HTMLButtonElement>) => void,
    editedOption: any | null,
    setEditedOption: Dispatch<SetStateAction<Options | null>>,
    groupIndex: number | null,
    input: boolean | null,
    originalInput: {
        school_minimum_number_evaluators_recommended_in_group: number;
        school_recommended_optional_group_evaluator_title: string[];
        school_minimum_time_evaluator_knows_applicant: string;
    }[] | null;
    loggedInUser: UserObject,
    isEdit: boolean,
}) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });

    const [ editedSelection, setEditedSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null
    })

    const [ evaluator, setEvaluator ] = useState('');

    const [ options, setOptions ] = useState<Options>({
        school_minimum_number_evaluators_recommended_in_group: 0,
        school_recommended_optional_group_evaluator_title: [],
        school_minimum_time_evaluator_knows_applicant: '', 
       });

    const [ editedOptions, setEditedOptions ] = useState<{
        school_minimum_number_evaluators_recommended_in_group: number,
        school_recommended_optional_group_evaluator_title: {name: string, isCorrect: boolean, isNew: boolean}[],
        school_minimum_time_evaluator_knows_applicant: string,
        isCorrect: boolean,
        isNew: boolean,
    } | null>(null)

    useEffect(() => {
        setOptions({
            ...options,
            school_minimum_time_evaluator_knows_applicant: selection.number + ' ' + selection.duration,
        })
    }, [selection]);

    useEffect(() => {
        if (editedOption) {
            if (input) {
                setEditedOptions(editedOption);
                const arr = editedOption.school_minimum_time_evaluator_knows_applicant.split(' ');
                setEditedSelection({
                    number: arr[0],
                    duration: arr[1],
                })
                const opt = originalInput && originalInput.find((inp,i) => i === groupIndex);
                if (opt) {
                    setOptions(opt)
                    const arr = opt.school_minimum_time_evaluator_knows_applicant.split(' ');
                    setSelection({
                        number: arr[0],
                        duration: arr[1],
                    })
                } else {
                    setOptions({
                        school_minimum_number_evaluators_recommended_in_group: 0,
                        school_recommended_optional_group_evaluator_title: [],
                        school_minimum_time_evaluator_knows_applicant: '', 
                   });
                }
            } else {
                setOptions(editedOption);
                const arr = editedOption.school_minimum_time_evaluator_knows_applicant.split(' ');
                setSelection({
                    number: arr[0],
                    duration: arr[1],
                })
            }
            
        } else {
            if (input) {
                setEditedOptions({
                    school_minimum_number_evaluators_recommended_in_group: 0,
                    school_recommended_optional_group_evaluator_title: [],
                    school_minimum_time_evaluator_knows_applicant: '',
                    isCorrect: true,
                    isNew: true,
                })
                setEditedSelection({
                    number: '',
                    duration: '',
                })
                const opt = originalInput && originalInput.find((inp,i) => i === groupIndex);
                if (opt) {
                    setOptions(opt)
                } else {
                    setOptions({
                        school_minimum_number_evaluators_recommended_in_group: 0,
                        school_recommended_optional_group_evaluator_title: [],
                        school_minimum_time_evaluator_knows_applicant: '', 
                   });
                }
            } else {
                setOptions({
                    school_minimum_number_evaluators_recommended_in_group: 0,
                    school_recommended_optional_group_evaluator_title: [],
                    school_minimum_time_evaluator_knows_applicant: '', 
               });
               setSelection({
                number: '',
                duration: '',
            })
            }
        }
       }, [editedOption])

    const handleNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({
                ...selection,
                number: e.target.value,
            })
        } else {
            setEditedSelection({
                ...editedSelection,
                number: e.target.value,
            })
            editedOptions && setEditedOptions({
                ...editedOptions,
                school_minimum_time_evaluator_knows_applicant: (e.target.value) + ' ' + editedSelection.duration,
            })
        }
        
    };

    const handleDuration = (e:any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({
                ...selection,
                duration: e.value,
            })
        } else {
            setEditedSelection({
                ...editedSelection,
                duration: e.value,
            })
            editedOptions && setEditedOptions({
                ...editedOptions,
                school_minimum_time_evaluator_knows_applicant: editedSelection.number + ' ' + e.value
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
         if (!isEditedInput) {
            setOptions({
                ...options,
                school_minimum_number_evaluators_recommended_in_group: Number(e.target.value),
            })
         } else {
            editedOptions && setEditedOptions({
                ...editedOptions,
                school_minimum_number_evaluators_recommended_in_group: Number(e.target.value)
            })
         }
        
    };

    const addEvaluator = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        const titleExists = options.school_recommended_optional_group_evaluator_title.find(title => title === evaluator);
        if (!evaluator) return;
        if (!isEditedInput) {
            if (titleExists) return;
            setOptions({
                ...options,
                school_recommended_optional_group_evaluator_title: options.school_recommended_optional_group_evaluator_title.concat(evaluator)
            })
        } else {
            editedOptions && setEditedOptions({
                ...editedOptions,
                school_recommended_optional_group_evaluator_title: editedOptions.school_recommended_optional_group_evaluator_title.concat({
                    name: evaluator,
                    isCorrect: true,
                    isNew: true,
                })
            })
        }
        
    };

    const deleteEvaluator = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setOptions({
                ...options,
                school_recommended_optional_group_evaluator_title: options.school_recommended_optional_group_evaluator_title.filter((t,i) => i !== index)
            })
        } else {
            editedOptions && setEditedOptions({
                ...editedOptions,
                school_recommended_optional_group_evaluator_title: isNew ? editedOptions.school_recommended_optional_group_evaluator_title.filter((inp,i) => i !== index) : editedOptions.school_recommended_optional_group_evaluator_title.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: false }
                    } else {
                        return { ...inp }
                    }
                } )
            })
        }
        
    };

    const undoDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        editedOptions && setEditedOptions({
            ...editedOptions,
            school_recommended_optional_group_evaluator_title: editedOptions.school_recommended_optional_group_evaluator_title.map((inp,i) => {
                if (i === index) {
                    return { ...inp, isCorrect: true }
                } else {
                    return { ...inp }
                }
            } )
        })

    }

    const addOption = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_recommended: {
                    ...newSchool.school_evaluations_recommended,
                    school_optional_evaluators_recommended: newSchool.school_evaluations_recommended.school_optional_evaluators_recommended!.concat(options)
                }
            })
        } else {
            editedOptions && setNewSchool({
                ...newSchool,
                edited_school_evaluations_recommended: {
                    ...newSchool.edited_school_evaluations_recommended,
                    edited_school_optional_evaluators_recommended: {
                        ...newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended,
                        input: newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input ? newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input.concat(editedOptions) 
                        : [editedOptions]
                    }
                }
            })
        }
        
    }

    const updateOption = (isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_recommended: {
                    ...newSchool.school_evaluations_recommended,
                    school_optional_evaluators_recommended: newSchool.school_evaluations_recommended.school_optional_evaluators_recommended!.map((opt,i) => {
                        if (i === groupIndex) {
                            return { ...options }
                        } else {
                            return { ...opt }
                        }
                    })
                }
            })
        } else {
            editedOptions && setNewSchool({
                ...newSchool,
                edited_school_evaluations_recommended: {
                    ...newSchool.edited_school_evaluations_recommended,
                    edited_school_optional_evaluators_recommended: {
                        ...newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended,
                        input: newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input!.map((opt,i) => {
                            if (i === groupIndex) {
                                return { ...editedOptions }
                            } else {
                                return { ...opt }
                            }
                        })
                    }
                }
            })
        }
        
    };

    const addOrUpdateOption = (e:MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!input && !options.school_recommended_optional_group_evaluator_title.length) {
            alert('Please add at least one evaluator');
            return;
        } else if (input && editedOptions && !editedOptions.school_recommended_optional_group_evaluator_title.length) {
            alert('Please add at least one evaluator');
            return;
        } else {
            if (editedOption) {
                updateOption(isEditedInput);
            } else {
                addOption(isEditedInput);
            }
        }
        
        toggleOptions(e);
        setEditedOption(null);
    }

    
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='relative w-full max-w-[900px] max-h-[700px] overflow-y-scroll rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedOption ? "Edit" : 'Add'} Recommended Optional Evaluators</p>
                    <div className='w-full mb-8'>
                        <label className='text-lg font-medium'>Minimum Number of Evaluators Recommended:</label>
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={editedOptions ? editedOptions.school_minimum_number_evaluators_recommended_in_group : null}
                        originalInput={options.school_minimum_number_evaluators_recommended_in_group} name='school_minimum_number_evaluators_recommended_in_group' handleInput={handleInput}
                        />
                        {/* <input onChange={handleInput} value={options.school_minimum_number_evaluators_recommended_in_group ? options.school_minimum_number_evaluators_recommended_in_group : ''} className='w-32 focus:outline-none border border-[#B4B4B4] h-[50px] px-3 rounded mt-2 block' /> */}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium text-lg'>Evaluator Titles:</label>
                        <div className='w-full flex justify-between items-center gap-4 mt-2'>
                            <div className='flex justify-center items-start gap-1 grow'>
                                <CreatableSelect onChange={(e:any) => setEvaluator(e.value)} options={evaluatorOptions} className="grow focus:outline-none rounded" />
                                <Tooltip title="Type and press enter to create new option" placement='right'>
                                    <IconButton style={{padding: '0px'}}>
                                        <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <button onClick={(e:MouseEvent<HTMLButtonElement>) => {input ? addEvaluator(e, true) : addEvaluator(e, false)}} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                                Add Evaluator
                            </button>
                        </div>
                        {input === null  ? (
                        <div className={`flex flex-col justify-center items-center gap-3 ${options.school_recommended_optional_group_evaluator_title.length ? 'mt-3' : 'mt-0'}`}>
                        {options.school_recommended_optional_group_evaluator_title.map((opt, i) => {
                            return (
                                <div className='py-2 pl-3 py-2 border-2 border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='font-medium'>{opt}</p>
                                        <button onClick={(e: MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        ) : (
                        <div className={`flex flex-col justify-center items-center gap-3 ${editedOptions && editedOptions.school_recommended_optional_group_evaluator_title.length ? 'mt-3' : 'mt-0'}`}>
                        {editedOptions && editedOptions.school_recommended_optional_group_evaluator_title.map((opt, i) => {
                            return (
                                <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className={`font-medium ${!opt.isCorrect && !opt.isNew ? 'line-through' : 'no-underline'}`}>{opt.name}</p>
                                        {!opt.isCorrect && !opt.isNew ? (
                                             <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                        ) : (
                                            <button onClick={(e:MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, opt.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                        </div>

                        )}
                    </div>
                    <div className='w-full mb-8'>
                        <label className='font-medium text-lg'>Minimum Time Evaluator Knows Applicant:</label>
                        <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_recommended.isEditMode} input={editedOptions ? editedOptions.school_minimum_time_evaluator_knows_applicant : null} originalInput={options.school_minimum_time_evaluator_knows_applicant}
                        name='school_minimum_time_evaluator_knows_applicant' number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration}
                        handleInput={handleNumber} handleSelect={handleDuration} options={timeOptions}
                        />
                        {/* <div className='flex justify-start items-center gap-2 mt-2'>
                            <input onChange={handleNumber} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={timeOptions} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div>  */}
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleOptions(e); setEditedOption(null)}} className='text-xl border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-5 h-[50px] rounded-md'>Cancel</button>
                        <button onClick={(e:MouseEvent<HTMLButtonElement>) => {input ? addOrUpdateOption(e, true) : addOrUpdateOption(e, false)}} className='text-xl border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-5 h-[50px] rounded-md'>{editedOption ? 'Edit' : 'Add'} Option</button>
                    </div>
                </div>
            </div>
        </div>
    )
}