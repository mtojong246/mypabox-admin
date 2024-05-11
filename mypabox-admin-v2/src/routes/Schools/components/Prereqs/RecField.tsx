import { UserObject } from '../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';
import { Course } from '../../../../types/courses.types';
import ReactQuill from 'react-quill';

export default function RecField({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex, courses}: {
    loggedInUser: UserObject, 
    input: {
        school_recommended_course_id: string;
        school_recommended_course_lab: boolean;
        school_recommended_course_lab_preferred: boolean;
        school_recommended_course_credit_hours: number;
        school_recommended_course_quarter_hours: number;
        school_recommended_course_note_section: string;
        isCorrect: boolean;
        isNew: boolean;
    }[] | null,
    originalInput: {
        school_recommended_course_id: string;
        school_recommended_course_lab: boolean;
        school_recommended_course_lab_preferred: boolean;
        school_recommended_course_credit_hours: number;
        school_recommended_course_quarter_hours: number;
        school_recommended_course_note_section: string;
    }[],
    isEditMode: 
    boolean, 
    setEditedOption: Dispatch<SetStateAction<any>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteOption: (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    toggleOptions: (e:MouseEvent<HTMLButtonElement>) => void,
    courses: Course[],
}) {
    return (
        <>
        {input !== null && input.length > 0 && (
        <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {courses && input.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id);
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    const originalCourse = originalGroup && courses.find(c => c.unique_id === originalGroup.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className={`py-2 pr-2 pl-3 border ${course.isNew ? 'border-orange-600' : 'border-[#545454]'}  rounded w-full`}>
                                <div className='flex justify-between items-start w-full'>
                                    <div>
                                        <p className={`font-bold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_recommended_course_credit_hours} credit hours 
                                                / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        {originalGroup && (originalGroup.school_recommended_course_id !== course.school_recommended_course_id || originalGroup.school_recommended_course_lab !== course.school_recommended_course_lab || originalGroup.school_recommended_course_credit_hours !== course.school_recommended_course_credit_hours
                                            || originalGroup.school_recommended_course_lab_preferred !== course.school_recommended_course_lab_preferred || originalGroup.school_recommended_course_quarter_hours !== course.school_recommended_course_quarter_hours) && (
                                            <p className={`font-bold line-through`}>{originalCourse?.course_name}
                                                <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                    {`(${originalGroup.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                    ${!originalGroup.school_recommended_course_lab && originalGroup.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                    / ${originalGroup.school_recommended_course_credit_hours} credit hours 
                                                    / ${originalGroup.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                                </span>
                                            </p>
                                            )}
                                    </div>
                                    <div className='flex gap-2'>
                                    {!course.isCorrect && !course.isNew ? (
                                        <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                    ) : (
                                        <>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e,i, course.isNew, isEditMode)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </>
                                    )}
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div>
            )}

            {input === null && originalInput.length > 0 && (
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {courses && originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold'>{selectedCourse?.course_name}
                                        <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                            {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                            ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                            / ${course.school_recommended_course_credit_hours} credit hours 
                                            / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                        </span>
                                    </p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div>
            )}
        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {courses && input.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id);
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    const originalCourse = originalGroup && courses.find(c => c.unique_id === originalGroup.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className={`py-2 pr-2 pl-3 border ${course.isNew ? 'border-orange-600' : 'border-[#545454]'}  rounded w-full`}>
                                <div className='flex justify-between items-start w-full'>
                                    <div>
                                        <p className={`font-bold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_recommended_course_credit_hours} credit hours 
                                                / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        {originalGroup && (originalGroup.school_recommended_course_id !== course.school_recommended_course_id || originalGroup.school_recommended_course_lab !== course.school_recommended_course_lab || originalGroup.school_recommended_course_credit_hours !== course.school_recommended_course_credit_hours
                                            || originalGroup.school_recommended_course_lab_preferred !== course.school_recommended_course_lab_preferred || originalGroup.school_recommended_course_quarter_hours !== course.school_recommended_course_quarter_hours) && (
                                            <p className={`font-bold line-through`}>{originalCourse?.course_name}
                                                <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                    {`(${originalGroup.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                    ${!originalGroup.school_recommended_course_lab && originalGroup.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                    / ${originalGroup.school_recommended_course_credit_hours} credit hours 
                                                    / ${originalGroup.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                                </span>
                                            </p>
                                            )}
                                    </div>
                                    <div className='flex gap-2'>
                                        <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button disabled onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div>
            </>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {courses && originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold'>{selectedCourse?.course_name}
                                        <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                            {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                            ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                            / ${course.school_recommended_course_credit_hours} credit hours 
                                            / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                        </span>
                                    </p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
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
                {courses && input.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id);
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    const originalCourse = originalGroup && courses.find(c => c.unique_id === originalGroup.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className={`py-2 pr-2 pl-3 border ${course.isNew ? 'border-orange-600' : 'border-[#545454]'}  rounded w-full`}>
                                <div className='flex justify-between items-start w-full'>
                                    <div>
                                        <p className={`font-bold ${!course.isCorrect && !course.isNew ? 'line-through' : 'no-underline'}`}>{selectedCourse?.course_name}
                                            <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                / ${course.school_recommended_course_credit_hours} credit hours 
                                                / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                            </span>
                                        </p>
                                        {originalGroup && (originalGroup.school_recommended_course_id !== course.school_recommended_course_id || originalGroup.school_recommended_course_lab !== course.school_recommended_course_lab || originalGroup.school_recommended_course_credit_hours !== course.school_recommended_course_credit_hours
                                            || originalGroup.school_recommended_course_lab_preferred !== course.school_recommended_course_lab_preferred || originalGroup.school_recommended_course_quarter_hours !== course.school_recommended_course_quarter_hours) && (
                                            <p className={`font-bold line-through`}>{originalCourse?.course_name}
                                                <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                                    {`(${originalGroup.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                                    ${!originalGroup.school_recommended_course_lab && originalGroup.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                                    / ${originalGroup.school_recommended_course_credit_hours} credit hours 
                                                    / ${originalGroup.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                                </span>
                                            </p>
                                            )}
                                    </div>
                                    <div className='flex gap-2'>
                                    {!course.isCorrect && !course.isNew ? (
                                        <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                    ) : (
                                        <>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button disabled={isEditMode ? false : true} onClick={(e) => deleteOption(e,i, course.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                        </>
                                    )}
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div>
            ) : (
                <>
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {courses && originalInput.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold'>{selectedCourse?.course_name}
                                        <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                            {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                            ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                            / ${course.school_recommended_course_credit_hours} credit hours 
                                            / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                        </span>
                                    </p>
                                    <div className='flex gap-2'>
                                        <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button disabled onClick={(e) => deleteOption(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div>
                </>
            )}
            </>
        )} */}
        </>
    )
}