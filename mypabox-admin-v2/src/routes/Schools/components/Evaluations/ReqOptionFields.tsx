import { UserObject } from '../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';

export default function ReqOptionFields({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex}: {
    loggedInUser: UserObject, 
    input: {
        school_minimum_number_of_evaluators_required_in_group: number;
        school_required_optional_group_evaluator_title: {
            name: string;
            isCorrect: boolean;
            isNew: boolean;
        }[];
        school_minimum_time_evaluator_knows_applicant: string;
        isCorrect: boolean;
        isNew: boolean;
    }[] | null;
    originalInput: {
        school_minimum_number_of_evaluators_required_in_group: number;
        school_required_optional_group_evaluator_title: string[];
        school_minimum_time_evaluator_knows_applicant: string;
    }[] | null;
    isEditMode: 
    boolean, 
    setEditedOption: Dispatch<SetStateAction<any>>,
    setGroupIndex: Dispatch<SetStateAction<number | null>>,
    deleteOption: (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    toggleOptions: (e:MouseEvent<HTMLButtonElement>) => void,
}) {
    return (
        <>
        {input !== null && input.length > 0 && (
            <div className={`flex flex-col justify-center items-center gap-5 ${input.length ? 'mt-5' : 'mt-0'}`}>
            {input.map((group, i) => {
                const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                return (
                <div className={`p-4 border rounded w-full ${group.isNew ? 'border-orange-600' : 'border-[#545454]'}`}>
                    <div className='flex justify-between items-center w-full'>
                        <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_evaluators_required_in_group} {originalGroup && originalGroup.school_minimum_number_of_evaluators_required_in_group !== group.school_minimum_number_of_evaluators_required_in_group && <span className='line-through'>{originalGroup.school_minimum_number_of_evaluators_required_in_group}</span>} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                        <div className='flex gap-2'>
                        {!group.isCorrect && !group.isNew ? (
                            <>
                            <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                            </>
                        ) : (
                            <>
                            <button onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button onClick={(e) => deleteOption(e,i, group.isNew, isEditMode)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </>
                        )}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                    {group.school_required_optional_group_evaluator_title.map(title => {

                            return (
                                <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                    <p className={`font-semibold ${!title.isNew && !title.isCorrect ? 'line-through' : 'no-underline'}`}>{title.name}</p>
                                </div>
                            )
                    })}
                    </div>
                    <p className='mt-4 text-lg font-semibold'>Minimum Time Evalutor Knows Applicant: <span className={`font-normal ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_time_evaluator_knows_applicant} {originalGroup && originalGroup.school_minimum_time_evaluator_knows_applicant !== group.school_minimum_time_evaluator_knows_applicant && <span className='line-through'>{originalGroup.school_minimum_time_evaluator_knows_applicant}</span>}</span></p>
                </div>
                )
            })}
        </div>
        )}

        {input === null && originalInput !== null && originalInput.length > 0 && (
            <div className={`flex flex-col justify-center items-center gap-5 ${originalInput.length ? 'mt-5' : 'mt-0'}`}>
            {originalInput.map((group, i) => (
                <div className='p-4 border border-[#545454] rounded w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='font-bold text-xl'>{group.school_minimum_number_of_evaluators_required_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                        <div className='flex gap-2'>
                            <button onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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

        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>

            <div className={`flex flex-col justify-center items-center gap-5 ${input.length ? 'mt-5' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    return (
                    <div className='p-4 border border-[#545454] rounded w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_evaluators_required_in_group} {originalGroup && originalGroup.school_minimum_number_of_evaluators_required_in_group !== group.school_minimum_number_of_evaluators_required_in_group && <span className='line-through'>{originalGroup.school_minimum_number_of_evaluators_required_in_group}</span>} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                            <div className='flex gap-2'>
                                <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {group.school_required_optional_group_evaluator_title.map(title => {

                                return (
                                    <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!title.isNew && !title.isCorrect ? 'line-through' : 'no-underline'}`}>{title.name}</p>
                                    </div>
                                )
                        })}
                        </div>
                        <p className='mt-4 text-lg font-semibold'>Minimum Time Evalutor Knows Applicant: <span className={`font-normal ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_time_evaluator_knows_applicant} {originalGroup && originalGroup.school_minimum_time_evaluator_knows_applicant !== group.school_minimum_time_evaluator_knows_applicant && <span className='line-through'>{originalGroup.school_minimum_time_evaluator_knows_applicant}</span>}</span></p>
                    </div>
                    )
                })}
                </div>
            </>
            ) : (
                <>
                {originalInput && (
                        <div className={`flex flex-col justify-center items-center gap-5 ${originalInput.length ? 'mt-5' : 'mt-0'}`}>
                        {originalInput.map((group, i) => (
                            <div className='p-4 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold text-xl'>{group.school_minimum_number_of_evaluators_required_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
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
                </>
            )}
            </>
        ) : (
            <>
            {input !== null ? (
            <div className={`flex flex-col justify-center items-center gap-5 ${input.length ? 'mt-5' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    return (
                    <div className='p-4 border border-[#545454] rounded w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_of_evaluators_required_in_group} {originalGroup && originalGroup.school_minimum_number_of_evaluators_required_in_group !== group.school_minimum_number_of_evaluators_required_in_group && <span className='line-through'>{originalGroup.school_minimum_number_of_evaluators_required_in_group}</span>} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                            <div className='flex gap-2'>
                            {!group.isCorrect && !group.isNew ? (
                                <>
                                <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                </>
                            ) : (
                                <>
                                <button disabled={isEditMode ? false : true} onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button disabled={isEditMode ? false : true} onClick={(e) => deleteOption(e,i, group.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </>
                            )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {group.school_required_optional_group_evaluator_title.map(title => {

                                return (
                                    <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                        <p className={`font-semibold ${!title.isNew && !title.isCorrect ? 'line-through' : 'no-underline'}`}>{title.name}</p>
                                    </div>
                                )
                        })}
                        </div>
                        <p className='mt-4 text-lg font-semibold'>Minimum Time Evalutor Knows Applicant: <span className={`font-normal ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_time_evaluator_knows_applicant} {originalGroup && originalGroup.school_minimum_time_evaluator_knows_applicant !== group.school_minimum_time_evaluator_knows_applicant && <span className='line-through'>{originalGroup.school_minimum_time_evaluator_knows_applicant}</span>}</span></p>
                    </div>
                    )
                })}
            </div>
            ) : (
                <>
                {originalInput && (
                    <div className={`flex flex-col justify-center items-center gap-5 ${originalInput.length ? 'mt-5' : 'mt-0'}`}>
                    {originalInput.map((group, i) => {
                        return (
                        <div className='p-4 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-xl`}>{group.school_minimum_number_of_evaluators_required_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                                <div className='flex gap-2'>
                                    <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                            {group.school_required_optional_group_evaluator_title.map(title => {
    
                                    return (
                                        <div className='p-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold`}>{title}</p>
                                        </div>
                                    )
                            })}
                            </div>
                            <p className='mt-4 text-lg font-semibold'>Minimum Time Evalutor Knows Applicant: <span className={`font-normal`}>{group.school_minimum_time_evaluator_knows_applicant}</span></p>
                        </div>
                        )
                    })}
                    </div>
                )}
                </>
            )}
            
            </>
        )} */}
        </>
    )
}