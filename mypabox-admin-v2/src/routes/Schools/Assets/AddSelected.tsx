import { Dispatch, SetStateAction, MouseEvent } from "react"
import { UserObject } from "../../../types/users.types"
import CreatableSelect from 'react-select/creatable';
import { AiOutlineClose } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";

export default function AddSelected({ loggedInUser, input, isEditMode, setCertification, stringArray, objectArray, options, addCertification, deleteCertification, undoCertification } : { 
    loggedInUser: UserObject,
    input: {name: string, isCorrect: boolean, isNew: boolean}[] | null,
    isEditMode: boolean,
    setCertification: Dispatch<SetStateAction<string>>,
    stringArray: string[] | null,
    objectArray: {name: string, isCorrect: boolean, isNew: boolean}[] | null,
    options: {value: string, label: string}[],
    addCertification: (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => void,
    deleteCertification: (e: MouseEvent<HTMLButtonElement>, index: number, isInputNew: boolean, isEditedInput: boolean) => void,
    undoCertification: (e: MouseEvent<HTMLButtonElement>, index: number) => void,

 }) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className='flex justify-start items-center gap-3'>
                <CreatableSelect isDisabled options={options} className="grow focus:outline-none"/> 
                <button disabled className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                    Add Certification
                </button>
            </div>
            {objectArray && (
            <div className={`flex flex-col justify-center items-center gap-3 ${objectArray && objectArray!.length ? 'mt-3' : 'mt-0'}`}>
                {objectArray && objectArray!.map((opt, i) => {
                    return (
                        <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-medium ${opt.isCorrect ? 'no-underline' : 'line-through'}`}>{opt.name}</p>
                                <button disabled ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                    )
                })}
                </div>
                )}
            </>
            ): (
            <>
            <div className='flex justify-start items-center gap-3'>
                <CreatableSelect options={options} onChange={(e:any) => setCertification(e.value)} className="grow focus:outline-none"/> 
                <button onClick={(e: MouseEvent<HTMLButtonElement>) => addCertification(e, false)} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                    Add Certification
                </button>
            </div>
            {stringArray && (
            <div className={`flex flex-col justify-center items-center gap-3 ${stringArray && stringArray!.length ? 'mt-3' : 'mt-0'}`}>
                {stringArray && stringArray!.map((opt, i) => {
                    return (
                        <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-medium'>{opt}</p>
                                <button onClick={(e: MouseEvent<HTMLButtonElement>) => deleteCertification(e,i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                    )
                })}
                </div>
                )}
            </>
            )}
            </>
        ): (
            <>
            <div className='flex justify-start items-center gap-3'>
                <CreatableSelect isDisabled={isEditMode ? false : true} options={options} onChange={(e:any) => setCertification(e.value)} className="grow focus:outline-none"/> 
                <button onClick={(e: MouseEvent<HTMLButtonElement>) => addCertification(e, true)} className="text-lg block border text-[#F06A6A] border-[#F06A6A] rounded px-5 h-[50px] hover:text-white hover:bg-[#F06A6A]">
                    Add Certification
                </button>
            </div>
            {objectArray ? (
            <div className={`flex flex-col justify-center items-center gap-3 ${objectArray && objectArray!.length ? 'mt-3' : 'mt-0'}`}>
                {objectArray && objectArray!.map((opt, i) => {
                    return (
                        <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-medium ${opt.isCorrect ? 'no-underline' : 'line-through'}`}>{opt.name}</p>
                                {!opt.isNew && !opt.isCorrect ? <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoCertification(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                                : <button onClick={(e: MouseEvent<HTMLButtonElement>) => deleteCertification(e,i, opt.isNew ,true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>}
                            </div>
                        </div>
                    )
                })}
                </div>
                ) : (
                <div className={`flex flex-col justify-center items-center gap-3 ${stringArray && stringArray!.length ? 'mt-3' : 'mt-0'}`}>
                {stringArray && stringArray!.map((opt, i) => {
                    return (
                        <div className='py-2 pl-3 pr-2 border-2 border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className={`font-medium `}>{opt}</p>
                                {/* <button><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button> */}
                                <button disabled onClick={(e: MouseEvent<HTMLButtonElement>) => deleteCertification(e,i, false ,true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                    )
                })}
                </div>
                )}
            </>
            )}
        </>
    )
}