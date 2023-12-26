import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types"

export default function InputFields({ loggedInUser, input, isEditMode, originalInput, name, handleInput }: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void,
 }) {
    return (
        <>
            {loggedInUser.permissions.canVerify ? (
                <>
                {input ? (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    <input disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input} name={name}/>
                    <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} value={originalInput as string | number}/>
                </div>
                ) : (
                <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e,false)}/>
                )}
                </>
            ) : (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    {(input !== null || isEditMode) && <input disabled={isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, true)}/>}
                    {<input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={originalInput as string | number}/>}
                </div>
            )}
        </>
    )
}