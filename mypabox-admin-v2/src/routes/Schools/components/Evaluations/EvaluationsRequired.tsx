import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { Note, School } from "../../../../types/schools.types";
import AddRequiredOption from "./AddRequiredOption";
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import AddNote from "../Prereqs/AddNote";
import ReactQuill from "react-quill";
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./EvaluationFunctions";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";
import SelectInputsFields from "../../Assets/SelectInputsFields";
import TitleFields from "./TitleFields";
import ReqOptionFields from "./ReqOptionFields";

const evaluatorOptions = [
    {value: 'PA', label: 'PA'},
    {value: 'MD', label: 'MD'},
    {value: 'DO', label: 'DO'},
    {value: 'NP', label: 'NP'},
    {value: 'PhD', label: 'PhD'},
];

const timeOptions = [
    {value: 'Months', label: 'Months'},
    {value: 'Years', label: 'Years'}
]

interface Options {
    school_minimum_number_of_evaluators_required_in_group: number;
    school_required_optional_group_evaluator_title: string[];
    school_minimum_time_evaluator_knows_applicant: string;
}

export default function EvaluationsRequired({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean}) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ editedSelection, setEditedSelection] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    });
    const [ openOptions, setOpenOptions ] = useState(false);
    const [ editedOption, setEditedOption ] = useState<Options | null>(null);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const [ evaluator, setEvaluator ] = useState('');

    const addEvaluator = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            if (newSchool.school_evaluations_required.school_required_evaluator_title?.includes(evaluator)) return;
            if (!evaluator) return;
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_required_evaluator_title: newSchool.school_evaluations_required.school_required_evaluator_title!.concat(evaluator),
                }
            })
        } else {
            if (!evaluator) return;
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    edited_school_required_evaluator_title: {
                        ...newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title,
                        input: newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input ? newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input.concat({
                            name: evaluator,
                            isCorrect: true,
                            isNew: true,
                        }) : [{
                            name: evaluator,
                            isCorrect: true,
                            isNew: true,
                        }]
                    }
                }
            })
        }
        
    };

    const deleteEvaluator = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_required_evaluator_title: newSchool.school_evaluations_required.school_required_evaluator_title!.filter((e,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    edited_school_required_evaluator_title: {
                        ...newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title,
                        input: isNew ? newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input!.filter((inp,i) => i !== index) : newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input!.map((inp,i) => {
                            if (i === index) {
                                return { ...inp, isCorrect: false }
                            } else {
                                return { ...inp }
                            }
                        })
                    }
                }
            })
        }
    };

    const undoDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_required: {
                ...newSchool.edited_school_evaluations_required,
                edited_school_required_evaluator_title: {
                    ...newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title,
                    input: newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input!.map((inp,i) => {
                        if (i === index) {
                            return {...inp, isCorrect: true }
                        } else {
                            return {...inp}
                        }
                    })
                }
            }
        })
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const toggleOptions = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenOptions(!openOptions);
    };

    useEffect(() => {
        if (newSchool.edited_school_evaluations_required.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_evaluations_required.input])

    useEffect(() => {
        if (newSchool.school_evaluations_required.input) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_minimum_number_of_evaluations_required: newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required ? newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required : 0,
                    school_required_evaluator_title: newSchool.school_evaluations_required.school_required_evaluator_title ? newSchool.school_evaluations_required.school_required_evaluator_title : [],
                    school_minimum_time_evaluator_knows_applicant: newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant ? newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant : '',
                    school_optional_evaluators_required: newSchool.school_evaluations_required.school_optional_evaluators_required ? newSchool.school_evaluations_required.school_optional_evaluators_required : [],
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
        if (newSchool.edited_school_evaluations_required.input === null) {
            if (newSchool.school_evaluations_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        } else {
            if (newSchool.edited_school_evaluations_required.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }
    }, [newSchool.edited_school_evaluations_required, newSchool.school_evaluations_required])

    useEffect(() => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_minimum_time_evaluator_knows_applicant: selection.number + ' ' + selection.duration
            }
        })
    }, [selection]);

    useEffect(() => {
        if (newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant) {
            const array = newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant.split(' ');
            setSelection({
                number: array[0],
                duration: array[1],
            })
        }
    }, [newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant])

    useEffect(() => {
        if (newSchool.edited_school_evaluations_required.edited_school_minimum_time_evaluator_knows_applicant.input !== null) {
            const array = newSchool.edited_school_evaluations_required.edited_school_minimum_time_evaluator_knows_applicant.input.split(' ');
            setEditedSelection({
                number: array[0],
                duration: array[1],
            })
        } else {
            setEditedSelection({
                number: null,
                duration: null
            })
        }
    }, [newSchool.edited_school_evaluations_required.edited_school_minimum_time_evaluator_knows_applicant])


    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_evaluations_required[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        }
        
    }

    // const handleSelect = (e:any, name: string) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_evaluations_required: {
    //             ...newSchool.school_evaluations_required,
    //             [name]: e.value,
    //         }
    //     })
    // }

    const handleNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({
                ...selection,
                number: e.target.value,
            })
        } else {
            setEditedSelection({ ...selection, number: e.target.value });
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    edited_school_minimum_time_evaluator_knows_applicant: {
                        ...newSchool.edited_school_evaluations_recommended.edited_school_minimum_time_evaluator_knows_applicant,
                        input: (e.target.value) + ' ' + editedSelection.duration,
                    }
                }
            })
        }
        
    };

    const handleDuration = (e:any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({...selection, duration: e.value})
        } else {
            setEditedSelection({...editedSelection, duration: e.value})
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    edited_school_minimum_time_evaluator_knows_applicant: {
                        ...newSchool.edited_school_evaluations_required.edited_school_minimum_time_evaluator_knows_applicant,
                        input: editedSelection.number + ' ' + e.value,
                    }
                }
            })
        }   
    }

    const deleteOption = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_optional_evaluators_required: newSchool.school_evaluations_required.school_optional_evaluators_required!.filter((opt,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_evaluations_required: {
                    ...newSchool.edited_school_evaluations_required,
                    edited_school_optional_evaluators_required: {
                        ...newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required,
                        input: isNew ? newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required.input!.filter((inp,i) => i !== index) : newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required.input!.map((inp,i) => {
                            if (i === index) {
                                return { ...inp, isCorrect: false }
                            } else {
                                return { ...inp }
                            }
                        })
                    }
                }
            })
        }
        
    };

    const undoOption = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_required: {
                ...newSchool.edited_school_evaluations_required,
                edited_school_optional_evaluators_required: {
                    ...newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required,
                    input: newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required.input!.map((inp,i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: true }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            }
        })
    }

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_evaluations_required_notes: newSchool.school_evaluations_required.school_evaluations_required_notes.concat(note)
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_evaluations_required_notes: newSchool.school_evaluations_required.school_evaluations_required_notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    };

    const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_evaluations_required_notes: newSchool.school_evaluations_required.school_evaluations_required_notes.filter((n,i) => i !== index)
            }
        })
    };

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        const linkName = `edited_${linkObj.name}`
        setNewSchool({
            ...newSchool,
            [linkName]: {
                ...newSchool[linkName as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    };


    

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
        {((loggedInUser.permissions.canVerify && newSchool.edited_school_evaluations_required.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_evaluations_required.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
        <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Evaluations Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
            <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={newSchool.edited_school_evaluations_required.input} originalInput={newSchool.school_evaluations_required.input}
            name='school_evaluations_required' handleCheck={handleCheck}
            />
            {/* <div className='w-full mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={handleCheck} checked={newSchool.school_evaluations_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_evaluations_required.input ? 'True' : 'False'}</span>
                </label>
            </div> */}
            {isOpen && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Number of Evaluations Required</label>  
                        <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={newSchool.edited_school_evaluations_required.edited_school_minimum_number_of_evaluations_required.input} 
                        originalInput={newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required} name='school_minimum_number_of_evaluations_required' handleInput={handleInput} 
                        />
                        {/* <input onChange={handleInput} name='school_minimum_number_of_evaluations_required' value={newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required ? newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' /> */}
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Evaluator Title</label> 
                        <TitleFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={newSchool.edited_school_evaluations_required.edited_school_required_evaluator_title.input} originalInput={newSchool.school_evaluations_required.school_required_evaluator_title} setEvaluator={setEvaluator} addEvaluator={addEvaluator} deleteEvaluator={deleteEvaluator} undoDelete={undoDelete} options={evaluatorOptions}/>
                        {/* <div className='flex justify-start items-center gap-2'>
                            <div className='grow flex justify-center items-start gap-1'>
                                <CreatableSelect options={evaluatorOptions} onChange={(e:any) => setEvaluator(e.value)} className="grow focus:outline-none"/> 
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
                        {newSchool.school_evaluations_required.school_required_evaluator_title && (
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_evaluations_required.school_required_evaluator_title.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_evaluations_required.school_required_evaluator_title.map((opt, i) => {
                                return (
                                    <div className='p-4 border border-[#B4B4B4] rounded-lg w-full'>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='font-bold text-xl'>{opt}</p>
                                            <button onClick={(e) => deleteEvaluator(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                            )} */}
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Evaluator Knows Applicant</label> 
                        <SelectInputsFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={newSchool.edited_school_evaluations_required.edited_school_minimum_time_evaluator_knows_applicant.input} originalInput={newSchool.school_evaluations_required.school_minimum_time_evaluator_knows_applicant} name='school_minimum_time_evaluator_knows_applicant' number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration}
                        handleInput={handleNumber} handleSelect={handleDuration} options={timeOptions}/>
                        {/* <div className='flex justify-start items-center gap-2'>
                            <input onChange={handleNumber} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={timeOptions} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="grow focus:outline-none"/>
                        </div>       */}
                    </div> 
                    <div className={`mt-12 mx-4 mb-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Optional Evaluators Required</label>  
                        <button onClick={toggleOptions} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Option
                        </button> 
                        <ReqOptionFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={newSchool.edited_school_evaluations_required.edited_school_optional_evaluators_required.input} 
                        originalInput={newSchool.school_evaluations_required.school_optional_evaluators_required} deleteOption={deleteOption} undoDelete={undoOption} setEditedOption={setEditedOption} toggleOptions={toggleOptions} setGroupIndex={setGroupIndex}
                        />
                        {/* {newSchool.school_evaluations_required.school_optional_evaluators_required && (
                        <div className={`flex flex-col justify-center items-center gap-5 ${newSchool.school_evaluations_required.school_optional_evaluators_required!.length ? 'mt-5' : 'mt-0'}`}>
                        {newSchool.school_evaluations_required.school_optional_evaluators_required!.map((group, i) => (
                            <div className='p-4 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold text-xl'>{group.school_minimum_number_of_evaluators_required_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                                {group.school_required_optional_group_evaluator_title.map(title => {

                                        return (
                                            <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{title}</p>
                                            </div>
                                        )
                                })}
                                </div>
                                <p className='mt-4 text-lg font-semibold'>Minimum Time Evalutor Knows Applicant: <span className='font-normal'>{group.school_minimum_time_evaluator_knows_applicant}</span></p>
                            </div>
                        ))}
                        </div>
                        )} */}
                    </div> 
                </>
            )}
            {isOpen && (
            <div className={`mx-5 mb-5`}>
            <label className='font-medium text-xl inline-block mt-8'>Notes:</label>
            <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_evaluations_required.school_evaluations_required_notes && (
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_evaluations_required.school_evaluations_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_evaluations_required.school_evaluations_required_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
            </div>
            )}
            </div>
            )}
        </div>
        {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_evaluations_required.isEditMode} input={hasInputs} link={newSchool.edited_school_evaluations_required.link} toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj}
        name='school_evaluations_required' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openOptions && <AddRequiredOption loggedInUser={loggedInUser} isEdit={isEdit} input={hasInputs} originalInput={newSchool.school_evaluations_required.school_optional_evaluators_required} newSchool={newSchool} setNewSchool={setNewSchool} toggleOptions={toggleOptions} editedOption={editedOption} setEditedOption={setEditedOption} groupIndex={groupIndex}/>}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>

    )
}