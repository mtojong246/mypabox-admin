import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react"
import { UserObject } from "../../../types/users.types"
import { School } from "../../../types/schools.types";
import { BiDollar } from "react-icons/bi";

const currencyFields = ['school_in_state_tuition', 'school_out_of_state_tuition', 'school_seat_deposit_in_state', 'school_seat_deposit_out_of_state'];
const dateFields = ['school_date_pending_courses_must_be_completed'];
const monthFields = ['school_duration_part_time', 'school_duration_full_time']

export default function InputFields({ loggedInUser, isEdit, newSchool, input, isEditMode, originalInput, name, handleInput, handleInputInArray, index, isBlank, keyDown}: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void,
    handleInputInArray? : (e: ChangeEvent<HTMLInputElement>, name: string, index: number, isEditedInput: boolean) => void,
    index?: number,
    isBlank?: boolean,
    isEdit: boolean,
    newSchool: School,
    keyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
 }) {

    // const [ editedField, setEditedField ] = useState<EditedField | null>(null);
    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    const [ isOriginalFieldShown, setIsOriginalFieldShown ] = useState(false);

    // useEffect(() => {
    //     const edited = `edited_${name}` as keyof School;
    //     const field = newSchool[edited] as EditedField;

    //     setEditedField(field);

    // }, [name, newSchool]);
    
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

    useEffect(() => {
        if ((input === null && isEditMode) || (input !== null && input === originalInput)) {
            setIsOriginalFieldShown(false);
        } else {
            setIsOriginalFieldShown(true);
        }
    }, [input, originalInput, isEditMode]);


    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 grow'>

                {(input !== null || isEditMode) && (
                    <div className="flex justify-between items-center border border-[#B4B4B4] rounded w-full">
                        {currencyFields.includes(name) && <BiDollar className="h-5 w-5 text-[#A1A1A1] ml-3"/>}
                        <input type={dateFields.includes(name) ? 'date' : 'text'} className="grow focus:outline-none p-3 rounded" value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                            handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, isEditMode) : handleInput(e, isEditMode);
                        }} placeholder={monthFields.includes(name) ? '# of months' : ''} onKeyDown={keyDown}/>
                    </div>
                )}

                {isOriginalFieldShown && (
                <div className="flex justify-between items-center border border-[#B4B4B4] rounded w-full">
                    {currencyFields.includes(name) && <BiDollar className="h-5 w-5 text-[#A1A1A1] ml-3"/>}
                    <input disabled={isOriginalInputDisabled} type={dateFields.includes(name) ? 'date' : 'text'} className="w-full focus:outline-none p-3 rounded" value={originalInput ? originalInput : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                            handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, false) : handleInput(e, false);
                    }} placeholder={monthFields.includes(name) ? '# of months' : ''} onKeyDown={keyDown}/>
                </div>
                )}
            </div>
        </>
        // <>
        //     {loggedInUser.permissions.canVerify ? (
        //         <>
        //         {input !== null ? (
        //         <div className='flex flex-col justify-start items-start gap-3 grow'>
        //             <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //             value={input ? input : ''} name={name}/>
        //             <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>
        //         </div>
        //         ) : (
        //         <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //         value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, false) : handleInput(e, false)}}/>
        //         )}
        //         </>
        //     ) : (
        //         <div className='flex flex-col justify-start items-start gap-3 grow'>
        //             {(input !== null || isEditMode) && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled={isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //             value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {handleInputInArray !== undefined && index !== undefined ? handleInputInArray(e, name, index, true) : handleInput(e, true)}}/>}
        //             {(!isEditMode || (isEditMode && (input !== originalInput))) && !isBlank && <input type={name === 'school_date_pending_courses_must_be_completed' ? 'date' : 'text'} disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>}
        //         </div>
        //     )}
        // </>
    )
}