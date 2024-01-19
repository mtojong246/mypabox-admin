import { UserObject } from '../../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';
import { Course } from '../../../../../types/courses.types';
import ReactQuill from 'react-quill';

export default function ExcludedFields({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex, courses, setExcluded}: {
    loggedInUser: UserObject, 
    input: {
            school_required_course_id: string;
            school_required_course_note: string;
            isNew: boolean;
            isCorrect: boolean;
    }[] | null,

    originalInput: {
            school_required_course_id: string;
            school_required_course_note: string;
    }[],
    isEditMode: 
    boolean, 
    setEditedOption: Dispatch<SetStateAction<any>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteOption: (e: MouseEvent<HTMLButtonElement>, index: number, excluded: boolean, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    toggleOptions: (e:MouseEvent<HTMLButtonElement>) => void,
    courses: Course[],
    setExcluded: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className={`font-bold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}</p>
                                    <div className='flex gap-2'>
                                        <button disabled onClick={(e) => {toggleOptions(e); setGroupIndex(i); setEditedOption(course); setExcluded(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button disabled onClick={(e) => deleteOption(e, i, true, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_required_course_note ? (
                                        <>
                                            <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                            <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                        </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
            </>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold'>{selectedCourse?.course_name}</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setGroupIndex(i); setEditedOption(course); setExcluded(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e, i, true, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_required_course_note ? (
                                        <>
                                            <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                            <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                        </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
                </>
            )}
            </>
        ) : (
            <>
            
            {input !== null ? (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className={`font-bold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}</p>
                                    <div className='flex gap-2'>
                                    {!course.isCorrect && !course.isNew ? (
                                        <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                    ) : (
                                        <>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i); setExcluded(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => deleteOption(e,i, true, course.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </>
                                    )}
                                    </div>
                                </div>
                                {course.school_required_course_note ? (
                                        <>
                                            <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                            <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                        </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className={`font-bold`}>{selectedCourse?.course_name}</p>
                                    <div className='flex gap-2'>
                                        <button disabled onClick={(e) => {toggleOptions(e); setGroupIndex(i); setEditedOption(course); setExcluded(true)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button disabled onClick={(e) => deleteOption(e, i, true, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_required_course_note ? (
                                        <>
                                            <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                            <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                        </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div>
                </>
            )}
            </>
        )}
        </>
    )
}