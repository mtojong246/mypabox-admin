import { UserObject } from '../../../../types/users.types';
import { AiOutlineClose } from 'react-icons/ai';
import { Note } from '../../../../types/schools.types';
import { FiEdit3 } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { LuUndo2 } from 'react-icons/lu';

export default function RequiredOptionsField({loggedInUser, input, originalInput, isEditMode, toggleOptions, setGroupIndex, setEditedRequiredOption, deleteOption, undoDelete}: {
    loggedInUser: UserObject, 
    input: {school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: {
            name: string;
            isCorrect: boolean;
            isNew: boolean;
        }[]
        school_optional_exams_notes: Note[];
        isCorrect: boolean;
        isNew: boolean;
    }[] | null,
    originalInput: {
        school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: string[];
        school_optional_exams_notes: Note[];
    }[],
    isEditMode: 
    boolean, 
    toggleOptions: (e:any) => void,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    setEditedRequiredOption: Dispatch<SetStateAction<any | null>>,
    deleteOption: (e:any, index:number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e:MouseEvent<HTMLButtonElement>, index: number) => void,

}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-4' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput.find((inp,index) => index === i);
                return (
                    <div className={`p-3 border ${group.isNew ? 'border-orange-600' : 'border-[#545454]'} rounded w-full`}>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_exams_to_be_completed} {originalGroup && group.school_minimum_number_of_exams_to_be_completed !== originalGroup.school_minimum_number_of_exams_to_be_completed && <span className='line-through'>{originalGroup.school_minimum_number_of_exams_to_be_completed}</span>} <span className='font-normal'>of the following exams need to be completed:</span></p>
                            <div className='flex gap-2'>
                                <button disabled onClick={(e) => {toggleOptions(e); setEditedRequiredOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {group.school_required_optional_exams_list.map(course => {

                                return (
                                    <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{course.name}</p>
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
                )})}
                </div>
            ) : (
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-4' : 'mt-0'}`}>
                    {originalInput.map((group, i) => (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold text-xl'>{group.school_minimum_number_of_exams_to_be_completed} <span className='font-normal'>of the following exams need to be completed:</span></p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleOptions(e); setEditedRequiredOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            )}
            </>
        ) : (
            <>
            {input !== null ? (
            <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-4' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput.find((inp,index) => index === i);
                return (
                    <div className={`p-3 border ${group.isNew ? 'border-orange-600' : 'border-[#545454]'} rounded w-full`}>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_exams_to_be_completed} {originalGroup && group.school_minimum_number_of_exams_to_be_completed !== originalGroup.school_minimum_number_of_exams_to_be_completed && <span className='line-through'>{originalGroup.school_minimum_number_of_exams_to_be_completed}</span>} <span className='font-normal'>of the following exams need to be completed:</span></p>
                            <div className='flex gap-2'>
                            {!group.isCorrect && !group.isNew ? (
                                <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                            ) : (
                                <>
                                <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedRequiredOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled={isEditMode ? false : true}  onClick={(e) => deleteOption(e, i, group.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {group.school_required_optional_exams_list.map(course => {

                                return (
                                    <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{course.name}</p>
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
                )})}
                </div>
                ) : (
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-4' : 'mt-0'}`}>
                    {originalInput.map((group, i) => {
                    return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold text-xl'>{group.school_minimum_number_of_exams_to_be_completed} <span className='font-normal'>of the following exams need to be completed:</span></p>
                                <div className='flex gap-2'>
                                    <button disabled><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                            {group.school_required_optional_exams_list.map(course => {
    
                                    return (
                                        <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold`}>{course}</p>
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
                    )})}
                    </div>
                )} 
                </>
        )}
        </>
    )
}