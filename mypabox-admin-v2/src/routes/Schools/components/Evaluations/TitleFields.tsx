import { UserObject } from '../../../../types/users.types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuUndo2 } from 'react-icons/lu';

export default function TitleFields({loggedInUser, input, originalInput, isEditMode, options, setEvaluator, addEvaluator, deleteEvaluator, undoDelete}: {
    loggedInUser: UserObject, 
    input: {name: string, isCorrect: boolean, isNew: boolean}[] | null,
    originalInput: string[] | null,
    isEditMode: 
    boolean, 
    options: {value: string, label :string}[],
    setEvaluator: Dispatch<SetStateAction<string>>,
    addEvaluator: (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => void,
    deleteEvaluator: (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className='flex justify-start items-center gap-2'>
                <div className='grow flex justify-center items-start gap-1'>
                    <CreatableSelect isDisabled options={options} onChange={(e:any) => setEvaluator(e.value)} className="grow focus:outline-none"/> 
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <button disabled onClick={(e:MouseEvent<HTMLButtonElement>) => addEvaluator(e, false)} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                    Add Evaluator
                </button>
            </div>
            {input && (
                <div className={`flex flex-col justify-center items-center gap-3 ${input.length ? 'mt-3' : 'mt-0'}`}>
                {input.map((opt, i) => {
                    return (
                        <div className='p-3 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-bold text-lg ${!opt.isCorrect && !opt.isNew ? 'line-through' : 'no-underline'}`}>{opt.name}</p>
                                <button disabled onClick={(e:MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </div>
                        </div>
                    )
                })}
                </div>
                )}
            </>
            ) : (
                <>
                <div className='flex justify-start items-center gap-2'>
                    <div className='grow flex justify-center items-start gap-1'>
                        <CreatableSelect options={options} onChange={(e:any) => setEvaluator(e.value)} className="grow focus:outline-none"/> 
                        <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => addEvaluator(e, false)} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                        Add Evaluator
                    </button>
                </div>
                {originalInput && (
                    <div className={`flex flex-col justify-center items-center gap-3 ${originalInput.length ? 'mt-3' : 'mt-0'}`}>
                    {originalInput.map((opt, i) => {
                        return (
                            <div className='p-3 border-2 border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold text-lg'>{opt}</p>
                                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => deleteEvaluator(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    )}
                </>
            )}
            </>
        ) : (
            <>
            <div className='flex justify-start items-center gap-2'>
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
            </>
            </>
        )}
        </>
    )
}