import { UserObject } from '../../../../types/users.types';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';
import { FiEdit3 } from 'react-icons/fi';

export default function RecOptionFields({loggedInUser, input, originalInput, isEditMode, setEditedOption, deleteOption, undoDelete, toggleOptions, setGroupIndex}: {
    loggedInUser: UserObject, 
    input: {
        school_minimum_number_evaluators_recommended_in_group: number;
        school_recommended_optional_group_evaluator_title: {
            name: string;
            isCorrect: boolean;
            isNew: boolean;
        }[];
        school_minimum_time_evaluator_knows_applicant: string;
        isCorrect: boolean;
        isNew: boolean;
    }[] | null;
    originalInput: {
        school_minimum_number_evaluators_recommended_in_group: number;
        school_recommended_optional_group_evaluator_title: string[];
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
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>

            <div className={`flex flex-col justify-center items-center gap-5 ${input.length ? 'mt-5' : 'mt-0'}`}>
                {input.map((group, i) => {
                    const originalGroup = originalInput && originalInput.find((inp,index) => index === i);
                    return (
                    <div className='p-4 border border-[#545454] rounded w-full'>
                        <div className='flex justify-between items-center w-full'>
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_evaluators_recommended_in_group} {originalGroup && originalGroup.school_minimum_number_evaluators_recommended_in_group !== group.school_minimum_number_evaluators_recommended_in_group && <span className='line-through'>{originalGroup.school_minimum_number_evaluators_recommended_in_group}</span>} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                            <div className='flex gap-2'>
                                <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                        {group.school_recommended_optional_group_evaluator_title.map(title => {

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
                                    <p className='font-bold text-xl'>{group.school_minimum_number_evaluators_recommended_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                                {group.school_recommended_optional_group_evaluator_title.map(title => {

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
                            <p className={`font-bold text-xl ${!group.isCorrect && !group.isNew ? 'line-through' : 'no-underline'}`}>{group.school_minimum_number_evaluators_recommended_in_group} {originalGroup && originalGroup.school_minimum_number_evaluators_recommended_in_group !== group.school_minimum_number_evaluators_recommended_in_group && <span className='line-through'>{originalGroup.school_minimum_number_evaluators_recommended_in_group}</span>} <span className='font-normal'>evaluators are required with the following titles:</span></p>
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
                        {group.school_recommended_optional_group_evaluator_title.map(title => {

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
                                <p className={`font-bold text-xl`}>{group.school_minimum_number_evaluators_recommended_in_group} <span className='font-normal'>evaluators are required with the following titles:</span></p>
                                <div className='flex gap-2'>
                                    <button disabled onClick={(e) => {toggleOptions(e); setEditedOption(group); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                                    <button disabled onClick={(e) => deleteOption(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 mt-4'>
                            {group.school_recommended_optional_group_evaluator_title.map(title => {
    
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
            {/* <div className='flex justify-start items-center gap-2'>
                <div className='grow flex justify-center items-start gap-1'>
                    <CreatableSelect isDisabled={isEditMode ? false : true} options={options} onChange={(e:any) => setEvaluator(e.value)} className="grow focus:outline-none"/> 
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <button disabled={isEditMode ? false : true} onClick={(e:MouseEvent<HTMLButtonElement>) => addEvaluator(e, true)} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                    Add Evaluator
                </button>
            </div>
            <>
            {input !== null ? (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((opt, i) => {
                    return (
                        <div className='p-3 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-lg ${!opt.isCorrect && !opt.isNew ? 'line-through' : 'no-underline'}`}>{opt.name}</p>
                                {!opt.isCorrect && !opt.isNew ? (
                                    <button disabled={isEditMode ? false : true} onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                ) : (
                                    <button disabled={isEditMode ? false : true} onClick={(e:MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, opt.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                )}
                            </div>
                        </div>
                    )
                })}
                </div>
            ) : (
                <div className={`flex flex-col justify-center items-center gap-3 ${originalInput && originalInput.length ? 'mt-3' : 'mt-0'}`}>
                {originalInput && originalInput.map((opt, i) => {
                    return (
                        <div className='p-2 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-lg`}>{opt}</p>
                                <button disabled onClick={(e:MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                    )
                })}
                </div>
            )}
            </> */}
            </>
        )}
        </>
    )
}