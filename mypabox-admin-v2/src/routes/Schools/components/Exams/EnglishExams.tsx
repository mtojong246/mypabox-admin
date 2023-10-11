import Select from 'react-select'
import { School, Note } from '../../../../types/schools.types'
import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState } from 'react'
import AddNote from '../Prereqs/AddNote'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'

const options = [
    { value: 'weeks', label: 'weeks' },
    { value: 'months', label: 'months' },
    { value: 'years', label: 'years' }
]

export default function EnglishExams({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    })
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ name, setName ] = useState('');

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: selection.number + ' ' + selection.duration,
                }
            })
        } 
    }, [selection])

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_toefl_required: false,
                    school_ielt_required: false,
                    school_melab_required: false,
                    school_pte_academic_required: false,
                    school_itep_academic_plus_required: false,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_toefl_required: null,
                    school_ielt_required: null,
                    school_melab_required: null,
                    school_pte_academic_required: null,
                    school_itep_academic_plus_required: null,
                }
            })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required]);

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_toefl_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: '',
                    school_toefl_exempt_with_masters_degree: false,
                    school_toefl_exempt_with_doctoral_degree: false,

                    school_toefl_ibt_minimum_total_score_required: 0,
                    school_toefl_ibt_minimum_reading_score_required: 0,
                    school_toefl_ibt_minimum_writing_score_required: 0,
                    school_toefl_ibt_minimum_listening_score_required: 0,
                    school_toefl_ibt_minimum_speaking_score_required: 0,
                    school_toefl_ibt_minimum_score_notes: [],

                    school_toefl_pbt_minimum_total_score_required: 0,
                    school_toefl_pbt_minimum_reading_score_required: 0,
                    school_toefl_pbt_minimum_writing_score_required: 0,
                    school_toefl_pbt_minimum_listening_score_required: 0,
                    school_toefl_pbt_minimum_speaking_score_required: 0,
                    school_toefl_pbt_minimum_score_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: null,
                    school_toefl_exempt_with_masters_degree: null,
                    school_toefl_exempt_with_doctoral_degree: null,

                    school_toefl_ibt_minimum_total_score_required: null,
                    school_toefl_ibt_minimum_reading_score_required: null,
                    school_toefl_ibt_minimum_writing_score_required: null,
                    school_toefl_ibt_minimum_listening_score_required: null,
                    school_toefl_ibt_minimum_speaking_score_required: null,
                    school_toefl_ibt_minimum_score_notes: null,

                    school_toefl_pbt_minimum_total_score_required: null,
                    school_toefl_pbt_minimum_reading_score_required: null,
                    school_toefl_pbt_minimum_writing_score_required: null,
                    school_toefl_pbt_minimum_listening_score_required: null,
                    school_toefl_pbt_minimum_speaking_score_required: null,
                    school_toefl_pbt_minimum_score_notes: null,
                }
            })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_toefl_required]);

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_ielt_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_ielt_minimum_total_score_required: 0,
                    school_ielt_minimum_score_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_ielt_minimum_total_score_required: null,
                    school_ielt_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_ielt_required])

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_melab_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_melab_minimum_total_score_required: 0,
                    school_melab_minimum_score_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_melab_minimum_total_score_required: null,
                    school_melab_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_melab_required])


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_pte_academic_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: 0,
                    school_pte_academic_minimum_score_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: [],
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_pte_academic_required])



    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_itep_academic_plus_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_itep_academic_plus_minimum_total_score_required: 0,
                    school_itep_academic_plus_minimum_score_notes: [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_itep_academic_plus_minimum_total_score_required: null,
                    school_itep_academic_plus_minimum_score_notes: [],
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_pte_academic_required])
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_english_proficiency_exams: {
                ...newSchool.school_english_proficiency_exams,
                [e.target.name]: e.target.checked,
            }
        })
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchool({
            ...newSchool,
            school_english_proficiency_exams: {
                ...newSchool.school_english_proficiency_exams,
                [e.target.name]: e.target.value,
            }
        })
    }

    const addNote = (note: Note) => {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).concat(note)
                }
            })
        }

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_english_proficiency_exams: {
                ...newSchool.school_english_proficiency_exams,
                [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    }

    const deleteNote = (e:any, index: number, name: string) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_english_proficiency_exams: {
                ...newSchool.school_english_proficiency_exams,
                [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).filter((n,i) => i !== index)
            }
        })
    }
    
    return (
        <>
            <div className={`mt-20 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">English Proficiency Exams Required</label>  
                <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_english_proficiency_exams_required' checked={newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required ? 'True' : 'False'}</span>
                    </label>
                </div>
                {newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required && (
                <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_english_proficiency_exams.school_toefl_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_toefl_required' checked={newSchool.school_english_proficiency_exams.school_toefl_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_required ? 'True' : 'False'}</span>
                        </label>
                    </div>

                    {newSchool.school_english_proficiency_exams.school_toefl_required && (
                    <>
                    <div className={`mt-8 mx-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame TOEFL Needs To Be Completed</label>   
                        <div className='flex justify-start items-center gap-2'>
                            <input onChange={(e) => setSelection({...selection, number: e.target.value.trim()})} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={options} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div>     
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Masters Degree</label>   
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleCheck} name='school_toefl_exempt_with_masters_degree' checked={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? true : false} type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? 'True' : 'False'}</span>
                            </label>
                        </div>    
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Doctoral Degree</label>   
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleCheck} name='school_toefl_exempt_with_doctoral_degree' checked={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? true : false} type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? 'True' : 'False'}</span>
                            </label>
                        </div>    
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] py-5 px-8 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium text-orange-600 bg-white">TOEFL IBT Minimum Scores Required</label>
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white">Total Score</label>   
                            <input onChange={handleInput} name='school_toefl_ibt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Reading Score</label>   
                            <input onChange={handleInput} name='school_toefl_ibt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Writing Score</label>   
                            <input onChange={handleInput} name='school_toefl_ibt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Listening Score</label>   
                            <input onChange={handleInput} name='school_toefl_ibt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Speaking Score</label>   
                            <input onChange={handleInput} name='school_toefl_ibt_minimum_speaking_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8 mb-5'>
                            <label className="text-xl font-medium bg-white">TOEFL IBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_ibt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes?.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_toefl_ibt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i, 'school_toefl_ibt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>

                    
                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] py-5 px-8 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white text-orange-600">TOEFL PBT Minimum Scores Required</label>   
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white">Total Score</label>   
                            <input onChange={handleInput} name='school_toefl_pbt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Reading Score</label>   
                            <input onChange={handleInput} name='school_toefl_pbt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Writing Score</label>   
                            <input onChange={handleInput} name='school_toefl_pbt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Listening Score</label>   
                            <input onChange={handleInput} name='school_toefl_pbt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Speaking Score</label>   
                            <input onChange={handleInput} name='school_toefl_pbt_minimum_speaking_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required as number} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        </div>

                        <div className="mt-8 mb-5">
                            <label className="text-xl font-medium bg-white">TOEFL PBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_pbt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes?.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_toefl_pbt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i, 'school_toefl_pbt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    
                    </>
                    )}

                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_english_proficiency_exams.school_ielt_required? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_ielt_required' checked={newSchool.school_english_proficiency_exams.school_ielt_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_ielt_required ? 'True' : 'False'}</span>
                        </label>
                    </div>

                    {newSchool.school_english_proficiency_exams.school_ielt_required && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Minimum Total Score Required</label>   
                        <input onChange={handleInput} name='school_ielt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_ielt_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_ielt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_ielt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_english_proficiency_exams.school_melab_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_melab_required' checked={newSchool.school_english_proficiency_exams.school_melab_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_melab_required ? 'True' : 'False'}</span>
                        </label>
                    </div>
            
                    {newSchool.school_english_proficiency_exams.school_melab_required && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Minimum Total Score Required</label>   
                        <input onChange={handleInput} name='school_melab_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_melab_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_melab_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_melab_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pte_academic_required' checked={newSchool.school_english_proficiency_exams.school_pte_academic_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'True' : 'False'}</span>
                        </label>
                    </div>

                    {newSchool.school_english_proficiency_exams.school_pte_academic_required && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Minimum Total Score Required</label>   
                        <input onChange={handleInput} name='school_pte_academic_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pte_academic_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pte_academic_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_pte_academic_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 mb-5 relative max-w-[900px] p-5 block rounded-lg ${newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? 'border-[#4573D2] border-2' : 'border-[#545454] border'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_itep_academic_plus_required' checked={newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? 'True' : 'False'}</span>
                        </label>
                    </div>

                    {newSchool.school_english_proficiency_exams.school_itep_academic_plus_required && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-5 block rounded-lg border-[#545454] border`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Minimum Total Score Required</label>   
                        <input onChange={handleInput} name='school_itep_academic_plus_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required as number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg' />  
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_itep_academic_plus_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded-md mt-4 h-14 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_itep_academic_plus_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_itep_academic_plus_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>
                </>
                )}
            </div> 
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}