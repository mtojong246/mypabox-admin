import Select from 'react-select';
import ReactQuill from 'react-quill';
import { Note, School } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddNote from '../Prereqs/AddNote';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'

const options = [
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
    { value: 'years', label: 'years' }
]

export default function GRE({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ gpaRequiredOrRecommended, setGpaRequiredOrRecommended ] = useState(false);
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ isGroup, setIsGroup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        if ((newSchool.school_gre.school_gre_required || newSchool.school_gre.school_gre_recommended) && !gpaRequiredOrRecommended) {
            setGpaRequiredOrRecommended(true);
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_caspa_gre_institution_code: 0,
                    school_gre_institution_code: 0,

                    school_minimum_time_frame_gre_must_be_completed: {
                        input: '',
                        school_minimum_time_frame_gre_must_be_completed_notes: [],
                    },
            
                    school_mcat_accepted_in_place_of_gre: {
                        input: false,
                        school_mcat_accepted_in_place_of_gre_notes: [],
                    },
            
                    school_gre_exempt_with_masters_degree: {
                        input: false,
                        school_gre_exempt_with_masters_degree_notes: [],
                    },
            
                    school_gre_exempt_with_phd_degree: {
                        input: false,
                        school_gre_exempt_with_phd_degree_notes: [],
                    },
                    school_minimum_gre_scores_required: false,
                }
            })
        } else if ((newSchool.school_gre.school_gre_required || newSchool.school_gre.school_gre_recommended) && gpaRequiredOrRecommended) {
            return 
        } else if (!newSchool.school_gre.school_gre_required && !newSchool.school_gre.school_gre_recommended) {
            setGpaRequiredOrRecommended(false);
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_caspa_gre_institution_code: null,
                    school_gre_institution_code: null,
                    school_minimum_time_frame_gre_must_be_completed: null,
                    school_mcat_accepted_in_place_of_gre: null,
                    school_gre_exempt_with_masters_degree: null,
                    school_gre_exempt_with_phd_degree: null,
                    school_minimum_gre_scores_required: null,
                }
            })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_gre.school_gre_required, newSchool.school_gre.school_gre_recommended]);

    useEffect(() => {
        if (newSchool.school_gre.school_minimum_gre_scores_required) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_gre_minimum_verbal_score: 0,
                    school_gre_minimum_quantitative_score: 0,
                    school_gre_minimum_analytical_writing_score: 0,
                    school_gre_minimum_combined_score: 0,
                    school_minimum_gre_score_notes: [],

                    school_gre_minimum_verbal_percentile: 0,
                    school_gre_minimum_quantitative_percentile: 0,
                    school_gre_minimum_analytical_writing_percentile: 0,
                    school_gre_minimum_combined_percentile: 0,
                    school_minimum_gre_percentile_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_gre_minimum_verbal_score: null,
                    school_gre_minimum_quantitative_score: null,
                    school_gre_minimum_analytical_writing_score: null,
                    school_gre_minimum_combined_score: null,
                    school_minimum_gre_score_notes: null,

                    school_gre_minimum_verbal_percentile: null,
                    school_gre_minimum_quantitative_percentile: null,
                    school_gre_minimum_analytical_writing_percentile: null,
                    school_gre_minimum_combined_percentile: null,
                    school_minimum_gre_percentile_notes: null,
                }
            })
        }
    }, [newSchool.school_gre.school_minimum_gre_scores_required])

    useEffect(() => {
        if (newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_minimum_time_frame_gre_must_be_completed: {
                        ...newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed,
                        input: selection.number + ' ' + selection.duration,
                    }
                }
            })
        } 
    }, [selection])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isGroup: boolean) => {
        if (!isGroup) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const field = newSchool.school_gre[e.target.name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [e.target.name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_gre: {
                ...newSchool.school_gre,
                [e.target.name]: e.target.value,
            }
        })
    }

    const addNote = (note: Note) => {
        if (!isGroup) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: (newSchool.school_gre[name as keyof object] as Note[]).concat(note)
                }
            })
        } else {
            const field = newSchool.school_gre[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                    }
                }
            })
        }
    }

    const updateNote = (note: Note) => {
        if (!isGroup) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: (newSchool.school_gre[name as keyof object] as Note[]).map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else {
            const field = newSchool.school_gre[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                }
            })
        }
    }

    const deleteNote = (e:any, index: number, name?: string, noteName?: string) => {
        e.preventDefault();
        if (name && !noteName) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: (newSchool.school_gre[name as keyof object] as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (name && noteName) {
            const field = newSchool.school_gre[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [name]: {
                        ...field,
                        [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                }
            })
        }
    }

    


    return (
        <>
        <div className={`mt-20 relative max-w-[900px] border py-5 px-8 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] left-[20px] text-xl bg-white">GRE</label>   

            <div className={`mt-6 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">GRE Required</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={(e) => handleCheck(e, false)} name='school_gre_required' checked={newSchool.school_gre.school_gre_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_gre_required ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">GRE Recommended</label>   
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={(e) => handleCheck(e, false)} name='school_gre_recommended' checked={newSchool.school_gre.school_gre_recommended ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_gre_recommended ? 'True' : 'False'}</span>
                    </label>
                </div>
            </div>

            {gpaRequiredOrRecommended && (
            <>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">CASPA GRE Insitution Code</label>   
                <input onChange={handleInput} name='school_caspa_gre_institution_code' value={newSchool.school_gre.school_caspa_gre_institution_code as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">GRE Insitution Code</label>   
                <input onChange={handleInput} name='school_gre_institution_code' value={newSchool.school_gre.school_gre_institution_code as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Minimum Time Frame GRE Must Be Completed</label>
                <div className='flex justify-start items-center gap-2 mb-4'>
                    <input onChange={(e) => setSelection({...selection, number: e.target.value.trim()})} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                    <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} options={options} className="w-1/3 focus:outline-none"/>
                </div>    
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_minimum_time_frame_gre_must_be_completed'); setNoteName('school_minimum_time_frame_gre_must_be_completed_notes')}} className="mt-4 block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed?.school_minimum_time_frame_gre_must_be_completed_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed?.school_minimum_time_frame_gre_must_be_completed_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true); setName('school_minimum_time_frame_gre_must_be_completed'); setNoteName('school_minimum_time_frame_gre_must_be_completed_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, 'school_minimum_time_frame_gre_must_be_completed', 'school_minimum_time_frame_gre_must_be_completed_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>        
            </div>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">MCAT Accepted In Place of GRE</label>
                <div className="mt-2 w-full">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={(e) => handleCheck(e, true)} name='school_mcat_accepted_in_place_of_gre' checked={newSchool.school_gre.school_mcat_accepted_in_place_of_gre?.input ? true : false} type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_mcat_accepted_in_place_of_gre?.input ? 'True' : 'False'}</span>
                </label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_mcat_accepted_in_place_of_gre'); setNoteName('school_mcat_accepted_in_place_of_gre_notes')}} className="mt-4 block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_mcat_accepted_in_place_of_gre?.school_mcat_accepted_in_place_of_gre_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_gre.school_mcat_accepted_in_place_of_gre?.school_mcat_accepted_in_place_of_gre_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true); setName('school_mcat_accepted_in_place_of_gre'); setNoteName('school_mcat_accepted_in_place_of_gre_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, 'school_mcat_accepted_in_place_of_gre', 'school_mcat_accepted_in_place_of_gre_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>        
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">GRE Exempt with Masters Degree</label>
                <div className="mt-2 w-full">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={(e) => handleCheck(e, true)} name='school_gre_exempt_with_masters_degree' checked={newSchool.school_gre.school_gre_exempt_with_masters_degree?.input ? true : false} type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_gre_exempt_with_masters_degree?.input ? 'True' : 'False'}</span>
                </label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_gre_exempt_with_masters_degree'); setNoteName('school_gre_exempt_with_masters_degree_notes')}} className="mt-4 block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_gre_exempt_with_masters_degree?.school_gre_exempt_with_masters_degree_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_gre.school_gre_exempt_with_masters_degree?.school_gre_exempt_with_masters_degree_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true); setName('school_gre_exempt_with_masters_degree'); setNoteName('school_gre_exempt_with_masters_degree_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, 'school_gre_exempt_with_masters_degree', 'school_gre_exempt_with_masters_degree_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>        
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">GRE Exempt with Doctoral Degree</label>
                <div className="mt-2 w-full">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={(e) => handleCheck(e, true)} name='school_gre_exempt_with_phd_degree' checked={newSchool.school_gre.school_gre_exempt_with_phd_degree?.input ? true : false} type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_gre_exempt_with_phd_degree?.input ? 'True' : 'False'}</span>
                </label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_gre_exempt_with_phd_degree'); setNoteName('school_gre_exempt_with_phd_degree_notes')}} className="mt-4 block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_gre_exempt_with_phd_degree?.school_gre_exempt_with_phd_degree_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_gre.school_gre_exempt_with_phd_degree?.school_gre_exempt_with_phd_degree_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(true); setName('school_gre_exempt_with_phd_degree'); setNoteName('school_gre_exempt_with_phd_degree_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, 'school_gre_exempt_with_phd_degree', 'school_gre_exempt_with_phd_degree_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>   
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_gre.school_minimum_gre_scores_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Minimum GRE Scores Required</label>
                <div className={`${newSchool.school_gre.school_minimum_gre_scores_required ? 'mb-4' : 'mb-0'} mt-2 w-full`}>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={(e) => handleCheck(e, false)} name='school_minimum_gre_scores_required' checked={newSchool.school_gre.school_minimum_gre_scores_required ? true : false} type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className="ml-3 text-xl text-black">{newSchool.school_gre.school_minimum_gre_scores_required ? 'True' : 'False'}</span>
                </label>
                </div>
                {newSchool.school_gre.school_minimum_gre_scores_required && (
                <>
                    <div className={`mt-8 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Verbal Score</label>   
                        <input onChange={handleInput} name='school_gre_minimum_verbal_score' value={newSchool.school_gre.school_gre_minimum_verbal_score as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Quantitative Score</label>   
                        <input onChange={handleInput} name='school_gre_minimum_quantitative_score' value={newSchool.school_gre.school_gre_minimum_quantitative_score as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Analytical Writing Score</label>   
                        <input onChange={handleInput} name='school_gre_minimum_analytical_writing_score' value={newSchool.school_gre.school_gre_minimum_analytical_writing_score as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Combined Score</label>   
                        <input onChange={handleInput} name='school_gre_minimum_combined_score' value={newSchool.school_gre.school_gre_minimum_combined_score as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Score Notes</label>   
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_gre_score_notes');}} className=" block border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_minimum_gre_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_gre.school_minimum_gre_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_gre_score_notes');}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_minimum_gre_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>       
                    </div>

                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Verbal Percentile</label>   
                        <input onChange={handleInput} name='school_gre_minimum_verbal_percentile' value={newSchool.school_gre.school_gre_minimum_verbal_percentile as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Quantitative Percentile</label>   
                        <input onChange={handleInput} name='school_gre_minimum_quantitative_percentile' value={newSchool.school_gre.school_gre_minimum_quantitative_percentile as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Analytical Writing Percentile</label>   
                        <input onChange={handleInput} name='school_gre_minimum_analytical_writing_percentile' value={newSchool.school_gre.school_gre_minimum_analytical_writing_percentile as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Combined Percentile</label>   
                        <input onChange={handleInput} name='school_gre_minimum_combined_percentile' value={newSchool.school_gre.school_gre_minimum_combined_percentile as number} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />     
                    </div>
                    <div className={`mt-12 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum GRE Percentile Notes</label>   
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_gre_percentile_notes');}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_minimum_gre_percentile_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_gre.school_minimum_gre_percentile_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_minimum_gre_percentile_notes');}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_minimum_gre_percentile_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>   
                    </div>
                </>
                )}
            </div>
            </>
            )}

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Verbal Score Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_verbal_score_accepted_previous_year' value={newSchool.school_gre.school_average_gre_verbal_score_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Quantitative Score Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_quantitative_score_accepted_previous_year' value={newSchool.school_gre.school_average_gre_quantitative_score_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Analytical Writing Score Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_analytical_writing_score_accepted_previous_year' value={newSchool.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Combined Score Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_combined_score_accepted_previous_year' value={newSchool.school_gre.school_average_gre_combined_score_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Verbal Percentile Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_verbal_percentile_accepted_previous_year' value={newSchool.school_gre.school_average_gre_verbal_percentile_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Quantitative Percentile Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_quantitative_percentile_accepted_previous_year' value={newSchool.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Analytical Writing Percentile Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_analytical_writing_percentile_accepted_previous_year' value={newSchool.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`mt-14 relative max-w-[900px] border p-5 block rounded-lg border-[#545454]`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white">Average GRE Combined Percentile Accepted Previous Year</label>   
                <input onChange={handleInput} name='school_average_gre_combined_percentile_accepted_previous_year' value={newSchool.school_gre.school_average_gre_combined_percentile_accepted_previous_year} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />           
            </div>

            <div className={`w-full mt-8 mb-5`}>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_gre_general_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-2 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_gre.school_gre_general_notes.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_gre.school_gre_general_notes.map((note, i) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setIsGroup(false); setName('school_gre_general_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button onClick={(e) => deleteNote(e, i, 'school_gre_general_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))}
                </div>
            </div>

            

        </div>
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}