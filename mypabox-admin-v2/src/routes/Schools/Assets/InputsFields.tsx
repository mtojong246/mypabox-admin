import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types"

export default function InputFields({ loggedInUser, input, isEditMode, originalInput, name, handleInput, handleInputInArray, index, isBlank}: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void,
    handleInputInArray? : (e: ChangeEvent<HTMLInputElement>, name: string, index: number, isEditedInput: boolean) => void,
    index?: number,
    isBlank?: boolean,
 }) {


    return (
        <>
            {loggedInUser.permissions.canVerify ? (
                <>
                {input !== null ? (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input ? input : ''} name={name}/>
                    <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>
                </div>
                ) : (
                <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, false) : handleInput(e, false)}}/>
                )}
                </>
            ) : (
                <div className='flex flex-col justify-start items-start gap-3 grow'>
                    {(input !== null || isEditMode) && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled={isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                    value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, true) : handleInput(e, true)}}/>}
                    {(!isEditMode || (isEditMode && (input !== originalInput))) && !isBlank && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>}
                </div>
            )}
        </>
    )
}