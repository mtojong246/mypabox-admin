import { Dispatch, SetStateAction, useState } from "react"
import AddRequiredOptionalExam from "./AddRequiredOptionalExam";
import { School } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

export default function RequiredOptionalExams({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ openOptions, setOpenOptions ] = useState(false);
    const [ editedRequiredOption, setEditedRequiredOption ] = useState<{
        school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: string[];
        school_optional_exams_notes: any[]
    } | null>(null)
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null)

    const toggleOptions = (e:any) => {
        e.preventDefault();
        setOpenOptions(!openOptions)
    }

    const deleteOption = (e:any, index:number) => {
        setNewSchool({
            ...newSchool,
            school_required_optional_exams: newSchool.school_required_optional_exams.filter((opt, i) => i !== index)
        })
    }

    return (
        <>
        <div className={`mt-10 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <label className="absolute top-[-16px] text-xl bg-white">Required Optional Exams</label>   
            <button onClick={toggleOptions} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Option
            </button>
            <div className={`flex flex-col justify-center items-center gap-5 ${newSchool.school_required_optional_exams.length ? 'mt-5' : 'mt-0'}`}>
            {newSchool.school_required_optional_exams.map((group, i) => (
                <div className='p-4 border border-[#545454] rounded w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-xl'>{group.school_minimum_number_of_exams_to_be_completed} <span className='font-normal'>of the following courses need to be completed:</span></p>
                        <div className='flex gap-2'>
                            <button onClick={(e) => {toggleOptions(e); setEditedRequiredOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button onClick={(e) => deleteOption(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                    {group.school_required_optional_exams_list.map(course => {

                            return (
                                <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className='font-semibold'>{course}</p>
                                </div>
                            )
                    })}
                    </div>
                    {group.school_optional_exams_notes.length > 0 && (
                        <>
                            <p className='font-semibold underline underline-offset-2 mt-5 mb-2'>Optional Exams Notes:</p>
                            <div className='flex flex-col justify-center items-center gap-4'>
                            {group.school_optional_exams_notes.map(note => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                            </div>
                        </>
                    )}
                </div>
            ))}

            </div>
        </div>
        {openOptions && <AddRequiredOptionalExam toggleOptions={toggleOptions} newSchool={newSchool} setNewSchool={setNewSchool} editedRequiredOption={editedRequiredOption} setEditedRequiredOption={setEditedRequiredOption} groupIndex={groupIndex}/>}
        </>
    )
}