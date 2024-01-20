import { ChangeEvent } from "react";
import { UserObject } from "../../../types/users.types";
import Select from 'react-select';

export default function SelectInputsFields({loggedInUser, input, originalInput, isEditMode, name, options, handleSelect, handleInput, number, duration, originalNumber, originalDuration}: {
    loggedInUser: UserObject, 
    input: string | null,
    originalInput: string | null,
    isEditMode: 
    boolean, 
    name: string,
    options: {value: string, label :string}[],
    handleSelect: (e:any, category: string, isEditedInput: boolean) => void,
    handleInput: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void, 
    number: string | null,
    duration: string | null,
    originalNumber: string | null,
    originalDuration: string | null,
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                <div className='flex justify-start items-center gap-3 w-full'>
                    <input disabled name={name} value={number ? number : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                    <Select isDisabled options={options} value={duration ? {value: duration, label: duration} : ''} className="grow focus:outline-none"/>
                </div>
                <div className='flex justify-start items-center gap-3 w-full'>
                    <input disabled name={name} value={originalNumber ? originalNumber : ''} className={`w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} />  
                    <Select isDisabled options={options} value={originalDuration ? {value: originalDuration, label: originalDuration} : ''} className="grow focus:outline-none"/>
                </div>
            </div>
            ) : (
            <div className='flex justify-start items-center gap-3 grow'>
                <input onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, name, false)} name={name}  value={originalNumber ? originalNumber : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                <Select options={options} value={originalDuration ? {value: originalDuration, label: originalDuration} : ''} onChange={(e:any) => handleSelect(e, name, false)} className="grow focus:outline-none"/>
            </div>
            )}
            </>
        ) : (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                {(input !== null || isEditMode) && <div className='flex justify-start items-center gap-3 w-full'>
                    <input onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, name, true)} name={name} value={number ? number : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                    <Select onChange={(e:any) => handleSelect(e, name, true)} options={options} value={duration ? {value: duration, label: duration} : ''} className="grow focus:outline-none"/>
                </div>}
                {(!isEditMode || ((input !== originalInput) && isEditMode)) && <div className='flex justify-start items-center gap-3 w-full'>
                    <input disabled name={name}  value={originalNumber ? originalNumber : ''} className={`w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} />  
                    <Select isDisabled options={options} value={originalDuration ? {value: originalDuration, label: originalDuration} : ''} className="grow focus:outline-none"/>
                </div>}
            </div>
        )}
        </>
    )
}