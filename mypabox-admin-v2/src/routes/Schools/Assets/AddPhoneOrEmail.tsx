import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react"
import { UserObject } from "../../../types/users.types"
import CreatableSelect from 'react-select/creatable';
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";
import { Tooltip, IconButton } from "@mui/material";
import { School } from "../../../types/schools.types";

export default function AddPhoneOrEmail({ loggedInUser, isEdit, isEditMode, input, originalInput, setPhone, setPhoneFormat, setEmail, email, phone, addFunc, deleteFunc, undoFunc, value, toggleNotePopup, setName, newSchool } : { 
    loggedInUser: UserObject,
    isEditMode: boolean,
    setPhone:  Dispatch<SetStateAction<{category: string, number: string,}>>,
    setPhoneFormat: (e:any) => void,
    setEmail: Dispatch<SetStateAction<{category: string, email: string,}>>,
    setName: Dispatch<SetStateAction<string>>,
    input: any[] | null,
    originalInput: any[],
    email: {category: string, email: string},
    phone: {category: string, number: string,}
    addFunc: (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => void,
    deleteFunc: (e: MouseEvent<HTMLButtonElement>, index: number, isInputNew: boolean, isEditedInput: boolean) => void,
    undoFunc: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    value: string,
    toggleNotePopup: (e:any) => void,
    newSchool: School;
    isEdit: boolean,

 }) {

    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    
    useEffect(() => {
        if (!isEdit) {
            setIsOriginalInputDisabled(false);
        } else {
            if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                setIsOriginalInputDisabled(true);
            } else if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                if (loggedInUser.permissions.canVerify && input !== null) {
                    setIsOriginalInputDisabled(true);
                } else {
                    setIsOriginalInputDisabled(false);
                }
                
            }
        }
    }, [isEdit, loggedInUser, input]);

    



    return (
        <>
            <div className='flex justify-center items-center gap-3'>
                <div className='w-1/4 flex justify-center items-start gap-1'>
                    <CreatableSelect className="grow focus:outline-none rounded"
                    options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => {value === 'school_email' ? setEmail({...email, category: e.value}) : setPhone({...phone, category: e.value})}}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <input className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={value === 'school_email' ? email.email : phone.number} onChange={(e:any) =>  { value === 'school_email' ? setEmail({...email, email: e.target.value}) : setPhoneFormat(e)}}/>
                <button className="text-nowrap px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={(e:MouseEvent<HTMLButtonElement>) => addFunc(e, isEditMode)}>{value === 'school_email' ? 'Add Email' : 'Add Phone'}</button>
                <button onClick={(e:any) => {toggleNotePopup(e); setName(value)}} value={value} className="disabled:hover:bg-none disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                    Add Note
                </button>
            </div>
            {input !== null && input.length > 0 && (
                <>
                {(input as any[]).map((em, i) => (
                <div className={`w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border ${em.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} `}>
                    <p className={`text font-semibold ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{em.category}: <span className={`font-normal inline-block ml-1 ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{value === 'school_email' ? em.email : em.number}</span></p>
                    {!em.isCorrect && !em.isNew ? 
                        <button name={value} onClick={(e:MouseEvent<HTMLButtonElement>) => undoFunc(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button> 
                        : 
                        <button onClick={(e:any) => deleteFunc(e, i, em.isNew, isEditMode)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>}
                </div>
                ))}
                </>
            )}

            {input === null && originalInput.length > 0 && (
                <>
                {(originalInput as any[]).map((em, i) => (
                <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                    <p className='text font-semibold'>{em.category}: <span className='font-normal inline-block ml-1'>{value === 'school_email' ? em.email : em.number}</span></p>
                    <button onClick={(e:any) => deleteFunc(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
                ))}
                </>
            )}
        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <>
            <div className='flex justify-center items-center gap-3'>
                <div className='w-1/4 flex justify-center items-start gap-1'>
                    <CreatableSelect isDisabled className="grow focus:outline-none rounded"
                    options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => {value === 'school_email' ? setEmail({...email, category: e.value}) : setPhone({...phone, category: e.value})}}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <input disabled className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={value === 'school_email' ? email.email : phone.number} onChange={(e:any) =>  { value === 'school_email' ? setEmail({...email, email: e.target.value}) : setPhoneFormat(e)}}/>
                <button disabled className="text-nowrap px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={(e:MouseEvent<HTMLButtonElement>) => addFunc(e, false)}>{value === 'school_email' ? 'Add Email' : 'Add Phone'}</button>
                <button onClick={(e:any) => {toggleNotePopup(e); setName(value)}} value={value} className="disabled:hover:bg-none disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                    Add Note
                </button>
            </div>
            {input !== null && (input as any[]).map((em, i) => (
                <div className={`w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border ${em.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} `}>
                    <p className={`text font-semibold ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{em.category}: <span className={`font-normal inline-block ml-1 ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{value === 'school_email' ? em.email : em.number}</span></p>
                    <button disabled onClick={(e:any) => deleteFunc(e, i, em.isCorrect, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            ))}

            </>
            ): (
            <>
            <div className='flex justify-center items-center gap-3'>
                <div className='w-1/4 flex justify-center items-start gap-1'>
                    <CreatableSelect className="grow focus:outline-none rounded"
                    options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => {value === 'school_email' ? setEmail({...email, category: e.value}) : setPhone({...phone, category: e.value})}}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <input className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={value === 'school_email' ? email.email : phone.number} onChange={(e:any) =>  { value === 'school_email' ? setEmail({...email, email: e.target.value}) : setPhoneFormat(e)}}/>
                <button className="text-nowrap px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={(e:MouseEvent<HTMLButtonElement>) => addFunc(e, false)}>{value === 'school_email' ? 'Add Email' : 'Add Phone'}</button>
                <button onClick={(e:any) => {toggleNotePopup(e); setName(value)}} value={value} className="disabled:hover:bg-none disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                    Add Note
                </button>
            </div>
            {originalInput !== null && (originalInput as any[]).map((em, i) => (
                <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                    <p className='text font-semibold'>{em.category}: <span className='font-normal inline-block ml-1'>{value === 'school_email' ? em.email : em.number}</span></p>
                    <button onClick={(e:any) => deleteFunc(e, i, false, false)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            ))}
            </>
            )}
            </>
        ): (
            <>
            <div className='flex justify-center items-center gap-3'>
                <div className='w-1/4 flex justify-center items-start gap-1'>
                    <CreatableSelect isDisabled={isEditMode ? false : true} className="grow focus:outline-none rounded"
                    options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => {value === 'school_email' ? setEmail({...email, category: e.value}) : setPhone({...phone, category: e.value})}}/>
                    <Tooltip title="Type and press enter to create new option" placement='right'>
                        <IconButton style={{padding: '0px'}}>
                            <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <input disabled={isEditMode ? false : true} className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={value === 'school_email' ? email.email : phone.number} onChange={(e:any) =>  { value === 'school_email' ? setEmail({...email, email: e.target.value}) : setPhoneFormat(e)}}/>
                <button disabled={isEditMode ? false : true} className="text-nowrap px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={(e:MouseEvent<HTMLButtonElement>) => addFunc(e, true)}>{value === 'school_email' ? 'Add Email' : 'Add Phone'}</button>
                <button onClick={(e:any) => {toggleNotePopup(e); setName(value)}} value={value} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                    Add Note
                </button>
            </div>
            {input !== null ?
            <> 
            {(input as any[]).map((em, i) => (
                <div className={`w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border ${em.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} `}>
                    <p className={`text font-semibold ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{em.category}: <span className={`font-normal inline-block ml-1 ${!em.isCorrect && !em.isNew ? 'line-through' : 'no-underline'}`}>{value === 'school_email' ? em.email : em.number}</span></p>
                    {!em.isCorrect && !em.isNew ? <button name={value} onClick={(e:MouseEvent<HTMLButtonElement>) => undoFunc(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button> : 
                    <button onClick={(e:any) => deleteFunc(e, i, em.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>}
                </div>
            ))}
            </> : 
            <>
            {(originalInput as any[]).map((em, i) => (
                <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                    <p className={`text font-semibold`}>{em.category}: <span className='font-normal inline-block ml-1'>{value === 'school_email' ? em.email : em.number}</span></p>
                    <button disabled onClick={(e:any) => deleteFunc(e, i, false, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            ))}
            </>
            }
            </>
            )} */}
        </>
    )
}