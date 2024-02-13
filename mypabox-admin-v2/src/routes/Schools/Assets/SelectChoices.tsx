import { ChangeEvent } from "react"
import { UserObject } from "../../../types/users.types"

export default function SelectChoices({ loggedInUser, input, isEditMode, originalInput, name, handleInputInArray, index, isBlank}: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInputInArray : (e: ChangeEvent<HTMLInputElement>, name: string, index: number, isEditedInput: boolean) => void,
    index: number,
    isBlank?: boolean,
 }) {

    return (
        <>
            {loggedInUser.permissions.canVerify ? (
                <>
                {input !== null ? (
                <div className='flex justify-start items-center gap-10 p-2'>
                    <div>
                        <input disabled onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='required' className={`mr-2 `}
                        checked={input === 'required' ? true : false}/>
                        <span className={`text-xl ${input !== null && input !== 'required' && input !== originalInput ? 'line-through' : 'no-underline'}`}>Required</span>
                    </div>
                    <div>
                        <input disabled onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='recommended' className='mr-2'
                        checked={input === 'recommended' ? true : false}/>
                        <span  className={`text-xl ${input !== null && input !== 'recommended' && input !== originalInput ? 'line-through' : 'no-underline'}`}>Recommended</span>
                    </div>
                </div>
                ) : (
                <div className='flex justify-start items-center gap-10 p-2'>
                    <div>
                        <input onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='required' className='mr-2'
                        checked={originalInput === 'required' ? true : false}/>
                        <span className='text-xl'>Required</span>
                    </div>
                    <div>
                        <input onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='recommended' className='mr-2'
                        checked={originalInput === 'recommended' ? true : false}/>
                        <span className='text-xl'>Recommended</span>
                    </div>
                </div>
                // <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
                // value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {handleInputInArray && index ? handleInputInArray(e, name, index, false) : handleInput(e, false)}}/>
                )}
                </>
            ) : (
                <>
                {input !== null ? (
                <div className='flex justify-start items-center gap-10 p-2'>
                    <div>
                        <input disabled={isEditMode ? false : true} onChange={(e) => handleInputInArray(e, name, index, true)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='required' className={`mr-2 `}
                        checked={input === 'required' ? true : false}/>
                        <span className={`text-xl ${input !== null && input !== 'required' && input !== originalInput ? 'line-through' : 'no-underline'}`}>Required</span>
                    </div>
                    <div>
                        <input disabled={isEditMode ? false : true} onChange={(e) => handleInputInArray(e, name, index, true)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='recommended' className='mr-2'
                        checked={input === 'recommended' ? true : false}/>
                        <span  className={`text-xl ${input !== null && input !== 'recommended' && input !== originalInput ? 'line-through' : 'no-underline'}`}>Recommended</span>
                    </div>
                </div>
                ) : (
                <div className='flex justify-start items-center gap-10 p-2'>
                    <div>
                        <input disabled={isEditMode ? false : true} onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='required' className={`mr-2 `}
                        checked={originalInput === 'required' ? true : false}/>
                        <span className={`text-xl ${input !== null && input !== originalInput ? 'line-through' : 'no-underline'}`}>Required</span>
                    </div>
                    <div>
                        <input disabled={isEditMode ? false : true} onChange={(e) => handleInputInArray(e, name, index, false)} type='radio' name={`gpa_value_required_or_recommended-${index.toString()}`} value='recommended' className='mr-2'
                        checked={originalInput === 'recommended' ? true : false}/>
                        <span  className={`text-xl ${input !== null && input !== originalInput ? 'line-through' : 'no-underline'}`}>Recommended</span>
                    </div>
                </div>  
                )}
                </>

            )}
        </>
    )
}