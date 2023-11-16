import Select from 'react-select'
import { School, Note } from '../../../../types/schools.types'
import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState } from 'react'
import AddNote from '../Prereqs/AddNote'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'

export default function Test({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ name, setName ] = useState('');

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
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

    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_pte_academic_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: 0,
                    school_pte_academic_minimum_score_notes: [],
                }
            });
            
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_pte_academic_required]);

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

    return (
        <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Required</label>   
                    <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pte_academic_required' checked={newSchool.school_english_proficiency_exams.school_pte_academic_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'True' : 'False'}</span>
                        </label>
                    </div>

                    {newSchool.school_english_proficiency_exams.school_pte_academic_required && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Minimum Total Score Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <input onChange={handleInput} name='school_pte_academic_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_pte_academic_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes && newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes && newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pte_academic_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_pte_academic_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>
    )
}