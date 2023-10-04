import CreatableSelect from 'react-select/creatable';
import { School, Note } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import AddNote from '../Prereqs/AddNote';

const options = [
    {value: 'GRE', label: 'GRE'},
    {value: 'PA-CAT', label: 'PA-CAT'},
    {value: 'MCAT', label: 'MCAT'},
    {value: 'CASPer', label: 'CASPer'}
]

export default function AddRequiredOptionalExam({toggleOptions, newSchool, setNewSchool, editedRequiredOption, setEditedRequiredOption, groupIndex}: {
    toggleOptions: (e:any) => void, 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    editedRequiredOption: {
        school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: string[];
        school_optional_exams_notes: any[]
    } | null,
    setEditedRequiredOption: Dispatch<SetStateAction<{
        school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: string[];
        school_optional_exams_notes: any[]
    } | null>>,
    groupIndex: number | null,
}) {
    const [ option, setOption ] = useState({
        school_minimum_number_of_exams_to_be_completed: 0,
        school_required_optional_exams_list: [] as string[],
        school_optional_exams_notes: [] as any[],
    })
    const [ selectedExam, setSelectedExam ] = useState('');
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);

    useEffect(() => {
        if (editedRequiredOption) {
            setOption(editedRequiredOption)
        } else {
            setOption({
                school_minimum_number_of_exams_to_be_completed: 0,
                school_required_optional_exams_list: [] as string[],
                school_optional_exams_notes: [] as any[],
            })
        }
    }, [editedRequiredOption])

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setOption({
            ...option,
            school_minimum_number_of_exams_to_be_completed: Number(e.target.value),
        })
    }

    const addExam = (e:any) => {
        e.preventDefault();
        setOption({
            ...option,
            school_required_optional_exams_list: option.school_required_optional_exams_list.concat(selectedExam)
        })
        setSelectedExam('')
    }

    const deleteExam = (e: any, index: number) => {
        e.preventDefault();
        setOption({
            ...option,
            school_required_optional_exams_list: option.school_required_optional_exams_list.filter((e,i) => i !== index)
        })
    }

    const addOption = () => {
        setNewSchool({
            ...newSchool,
            school_required_optional_exams: newSchool.school_required_optional_exams.concat(option)
        })
    }

    const updateOption = () => {
        setNewSchool({
            ...newSchool,
            school_required_optional_exams: newSchool.school_required_optional_exams.map((opt,i) => {
                if (i === groupIndex) {
                    return { ...option }
                } else {
                    return { ...opt }
                }
            })
        })
    }

    const addOrUpdateOption = (e:any) => {
        e.preventDefault();
        if (option.school_required_optional_exams_list.length === 0) {
            alert('Please select at least one exam')
        } else {
            if (editedRequiredOption) {
                updateOption()
            } else {
                addOption()
            }
            toggleOptions(e);
            setEditedRequiredOption(null)
        }
    }

    const addNote = (note: Note) => {
        setOption({
            ...option,
            school_optional_exams_notes: option.school_optional_exams_notes.concat(note)
        })
    }

    const updateNote = (note: Note) => {
        setOption({
            ...option,
            school_optional_exams_notes: option.school_optional_exams_notes.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            }) 
        })
        setIndex(null)
    }

    const deleteNote = (e: any, index: number) => {
        e.preventDefault();
        setOption({
            ...option,
            school_optional_exams_notes: option.school_optional_exams_notes.filter((n,i) => i !== index)
        })
    }

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='relative w-full max-w-[900px] max-h-[700px] overflow-y-scroll rounded-lg p-4 bg-white'>
                    {notePopup && <div className='absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 z-10'></div>}
                        <p className='text-xl font-semibold mb-8'>{editedRequiredOption ? 'Edit' : 'Add'} Required Optional Exam</p>
                        <div className='w-full mb-8'>
                            <label className='text-lg font-medium'>Minimum number of exams to be completed:</label>
                            <input onChange={handleInput} value={option.school_minimum_number_of_exams_to_be_completed} className='w-32 focus:outline-none border border-[#B4B4B4] h-[56px] px-3 rounded mt-2 block' />
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium text-lg'>Exams:</label>
                            <div className='w-full flex justify-between items-center gap-4 mt-2'>
                                <CreatableSelect options={options} onChange={(e:any) => setSelectedExam(e.value)} value={selectedExam ? {value: selectedExam, label: selectedExam} : null} className="grow focus:outline-none rounded-lg" />
                                <button onClick={addExam} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded-md px-5 h-[56px] hover:text-white hover:bg-[#F06A6A]">
                                    Add Exam
                                </button>
                            </div>
                            <div className={`flex flex-col justify-center items-center gap-3 ${option.school_required_optional_exams_list.length ? 'mt-3' : 'mt-0'}`}>
                            {option.school_required_optional_exams_list.map((opt, i) => {
                                return (
                                    <div className='p-4 border border-[#B4B4B4] rounded-lg w-full'>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='font-bold'>{opt}</p>
                                            <button onClick={(e) => deleteExam(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                        <div className='w-full mb-8'>
                            <label className='font-medium'>Notes:</label>
                            <button onClick={toggleNotePopup} className="text-lg block mt-2 border text-[#F06A6A] border-[#F06A6A] rounded-md px-5 h-[56px] hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${option.school_optional_exams_notes.length ? 'mt-3' : 'mt-0'}`}>
                            {option.school_optional_exams_notes.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='w-full flex justify-end items-center gap-3'>
                            <button onClick={(e) => {toggleOptions(e); setEditedRequiredOption(null)}} className='text-xl border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-5 h-[56px] rounded-md'>Cancel</button>
                            <button onClick={addOrUpdateOption} className='text-xl border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-5 h-[56px] rounded-md'>{editedRequiredOption ? 'Edit' : 'Add'} Option</button>
                        </div>
                    </div>
                </div>
            </div>
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}