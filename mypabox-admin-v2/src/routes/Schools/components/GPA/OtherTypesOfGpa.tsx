import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { School, Note } from "../../../../types/schools.types";
import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";
import CreatableSelect from 'react-select/creatable';

const typeOfGpa = [
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' }
]

export default function OtherTypesOfGpa({ newSchool, deleteField, handleSelect, handleObjInput, addField, toggleNote, setKeyAndIndex, toggleDelete, setNoteIndex, setCurrentNote } : {
    newSchool: School,
    deleteField: (e: MouseEvent<HTMLButtonElement>, index: number, key: string) => void,
    addField: (e: MouseEvent<HTMLButtonElement>, key: string) => void,
    handleSelect: (e: any, name: string, index: number, key: string) => void,
    handleObjInput: (e: ChangeEvent<HTMLInputElement>, index: number, key: string, name: string) => void,
    toggleNote: (e: any, edit: boolean) => void,
    setKeyAndIndex: (key: string, index: number) => void,
    toggleDelete: (e: MouseEvent<HTMLButtonElement>, i: number) => void,
    setNoteIndex: Dispatch<SetStateAction<number>>,
    setCurrentNote: Dispatch<SetStateAction<Note>>,

}) {

    return (
        <>
        {newSchool.school_other_types_of_gpa_evaluated.map((field, i) => (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Other Types of GPA Evaluated <span className='font-bold'>{i > 0 ? `- Additional Field ${i}` : ''}</span></label> 
            
            <>
                <div className={`w-full mt-4`}>
                    <div className='flex justify-between items-center'>
                        <label className='text-xl'>Type of GPA Evaluated</label>
                        <button onClick={(e) => deleteField(e,i, 'school_other_types_of_gpa_evaluated')} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div>
                    <CreatableSelect options={typeOfGpa} 
                    value={field.type_of_gpa_evaluated ? {value: field.type_of_gpa_evaluated, label: field.type_of_gpa_evaluated} : null } 
                    className="w-full focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3" 
                    onChange={(e) => handleSelect(e, 'type_of_gpa_evaluated', i, 'school_other_types_of_gpa_evaluated')}/>
                    <p className='text-[#4573D2] text-sm mt-1 pl-3'>*Note: Type to create a new option</p>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>GPA Required or Recommended:</label>
                    <div className='flex justify-start items-center mt-3 gap-10 ml-3'>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'school_other_types_of_gpa_evaluated', 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='required' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'required' ? true : false}/>
                            <span className='text-xl'>Required</span>
                        </div>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'school_other_types_of_gpa_evaluated', 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='recommended' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'recommended' ? true : false}/>
                            <span className='text-xl'>Recommended</span>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum GPA Valued Needed:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'school_other_types_of_gpa_evaluated', 'minimum_gpa_value_needed')} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block' value={field.minimum_gpa_value_needed} name='minimum_gpa_value_needed'/>
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Minimum Number of Credits Evaluated:</label>
                    <input onChange={(e) => handleObjInput(e, i, 'school_other_types_of_gpa_evaluated', 'minimum_number_of_credits_evaluated')} className='w-32 focus:outline-none border border-[#B4B4B4] p-4 rounded-lg mt-3 block' value={field.minimum_number_of_credits_evaluated} name='minimum_number_of_credits_evaluated' />
                </div>
                <div className='w-full mt-8'>
                    <label className='text-xl'>Notes:</label>
                    <button value='school_other_types_of_gpa_evaluated' name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-3 block" onClick={(e) => {toggleNote(e,false); setKeyAndIndex('school_other_types_of_gpa_evaluated', i)}}>
                        Add Note
                    </button>
                </div>
                {field.notes && field.notes.map((note, index) => (
                    <div className='flex justify-center items-start gap-2 mt-4'>
                        <div className="grow p-4 rounded-md border border-black">
                            <p className={`capitalize mb-4 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        <div className='flex flex-col-reverse justify-start items-center gap-1'>
                            <button value='school_other_types_of_gpa_evaluated' onClick={(e) => {toggleNote(e, true); setNoteIndex(index); setCurrentNote(note); setKeyAndIndex('school_other_types_of_gpa_evaluated', i)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-[#4573D2] text-white'/></button>
                            <button value='school_other_types_of_gpa_evaluated' onClick={(e) => {toggleDelete(e, index); setKeyAndIndex('school_other_types_of_gpa_evaluated', i) }}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-[#F06A6A] text-white'/></button>
                        </div>
                    </div>
                ))}
            </>
            {i === newSchool.school_other_types_of_gpa_evaluated.length-1 && (
            <button className="w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded-md h-14 text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={(e) => addField(e, 'school_other_types_of_gpa_evaluated')}>
                + Add New Field
            </button>
            )}
        </div>
        ))}  
        </>

    )
}