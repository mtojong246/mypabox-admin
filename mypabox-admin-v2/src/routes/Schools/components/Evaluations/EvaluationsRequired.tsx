import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { Note, School } from "../../../../types/schools.types";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import AddRequiredOption from "./AddRequiredOption";
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import AddNote from "../Prereqs/AddNote";
import ReactQuill from "react-quill";
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
    {value: 'Months', label: 'Months'},
    {value: 'Years', label: 'Years'}
]

interface Options {
    school_minimum_number_of_evaluators_required_in_group: number;
    school_required_optional_group_evaluator_title: string[];
    school_minimum_time_evaluator_knows_applicant: string;
}

export default function EvaluationsRequired({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>}) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ openOptions, setOpenOptions ] = useState(false);
    const [ editedOption, setEditedOption ] = useState<Options | null>(null);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);

    const [ evaluator, setEvaluator ] = useState('');

    const addEvaluator = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newSchool.school_evaluations_required.school_required_evaluator_title?.includes(evaluator)) return;
        if (!evaluator) return;
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_required_evaluator_title: newSchool.school_evaluations_required.school_required_evaluator_title!.concat(evaluator),
            }
        })
    };

    const deleteEvaluator = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_required_evaluator_title: newSchool.school_evaluations_required.school_required_evaluator_title!.filter((e,i) => i !== index)
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
    }

    useEffect(() => {
        if (newSchool.school_evaluations_required.input) {
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_minimum_number_of_evaluations_required: 0,
                    school_required_evaluator_title: [],
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

    // const handleSelect = (e:any, name: string) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_evaluations_required: {
    //             ...newSchool.school_evaluations_required,
    //             [name]: e.value,
    //         }
    //     })
    // }

    const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSelection({
            ...selection,
            number: e.target.value,
        })
    };

    const deleteOption = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_evaluations_required: {
                ...newSchool.school_evaluations_required,
                school_optional_evaluators_required: newSchool.school_evaluations_required.school_optional_evaluators_required!.filter((opt,i) => i !== index)
            }
        })
    };

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
    }

    

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Evaluations Required</label>  
            <div className='w-full mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={handleCheck} checked={newSchool.school_evaluations_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_evaluations_required.input ? 'True' : 'False'}</span>
                </label>
            </div>
            {newSchool.school_evaluations_required.input && (
                <>
                    <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Number of Evaluations Required</label>  
                        <input onChange={handleInput} name='school_minimum_number_of_evaluations_required' value={newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required ? newSchool.school_evaluations_required.school_minimum_number_of_evaluations_required : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Required Evaluator Title</label> 
                        <div className='flex justify-start items-center gap-2'>
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
                            )}
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Evaluator Knows Applicant</label> 
                        <div className='flex justify-start items-center gap-2'>
                            <input onChange={handleNumber} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={timeOptions} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="grow focus:outline-none"/>
                        </div>      
                    </div> 
                    <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Optional Evaluators Required</label>  
                        <button onClick={toggleOptions} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Option
                        </button> 
                        {newSchool.school_evaluations_required.school_optional_evaluators_required && (
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
                        )}
                    </div> 
                </>
            )}
            {newSchool.school_evaluations_required.input && (
            <div className={`mx-5 mb-5`}>
            <label className='font-medium text-xl inline-block mt-8'>Notes:</label>
            <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Note
            </button>
            {newSchool.school_evaluations_required.school_evaluations_required_notes && (
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_evaluations_required.school_evaluations_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_evaluations_required.school_evaluations_required_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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
        {openOptions && <AddRequiredOption newSchool={newSchool} setNewSchool={setNewSchool} toggleOptions={toggleOptions} editedOption={editedOption} setEditedOption={setEditedOption} groupIndex={groupIndex}/>}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>

    )
}