import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types"

export default function InputFieldsGroup({ loggedInUser, input, isEditMode, originalInput, name, handleInput, category}: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void,
    category: string,
 }) {

    console.log(input, originalInput)
    return (
        <>
            {loggedInUser.permissions.canVerify ? (
                <>
                {input ? (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    <input disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input} name={name}/>
                    <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>
                </div>
                ) : (
                <input className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, category, false)}/>
                )}
                </>
            ) : (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    {(input !== null || isEditMode) && <input disabled={isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, `edited_${category}`, true)}/>}
                    {<input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>}
                </div>
            )}
        </>
    )
}