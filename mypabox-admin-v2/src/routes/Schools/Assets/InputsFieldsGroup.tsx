import { ChangeEvent, useState, useEffect } from "react"
import { UserObject } from "../../../types/users.types"
import { BiDollar } from "react-icons/bi"

const currencyFields = ['school_supplemental_application_fee', 'school_application_direct_to_school_fee'];
const dateFields = ['school_supplemental_application_deadline', 'school_application_direct_to_school_deadline', 'school_caspa_application_deadline_date']

export default function InputFieldsGroup({ loggedInUser, input, isEditMode, isEdit, originalInput, name, handleInput, category, isMoney}: { 
    loggedInUser: UserObject,
    input: string | number | null, 
    isEditMode: boolean,
    originalInput: string | number | null,
    name: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void,
    category: string,
    isMoney?: boolean,
    isEdit: boolean,
 }) {

    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    const [ isOriginalFieldShown, setIsOriginalFieldShown ] = useState(false);

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
                        handleInput(e, category, isEditMode)}} />
                </div>
            )}

            {isOriginalFieldShown && (
            <div className="flex justify-between items-center border border-[#B4B4B4] rounded w-full">
                {currencyFields.includes(name) && <BiDollar className="h-5 w-5 text-[#A1A1A1] ml-3"/>}
                <input disabled={isOriginalInputDisabled} type={dateFields.includes(name) ? 'date' : 'text'} className="w-full focus:outline-none p-3 rounded" value={originalInput ? originalInput : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        handleInput(e, category, false)}
                }/>
            </div>
            )}
        </div>
    </>
        // <>
        //     {loggedInUser.permissions.canVerify ? (
        //         <>
        //         {input !== null ? (
        //         <div className='flex flex-col justify-start items-start gap-3 grow'>
        //             <div className={`flex justify-start items-center gap-1 w-full border-[#B4B4B4] rounded ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border p-3' : 'border-none p-0'}`}>
        //                 {(name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney) && <BiDollar className='h-5 w-5 text-[#717171]'/>}
        //                 <input type={name === 'school_supplemental_application_deadline' || name === 'school_application_direct_to_school_deadline' || name === 'school_caspa_application_deadline_date' ? 'date' : 'text'} disabled className={`grow ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border-none p-0' : 'border p-3'} focus:outline-none border-[#B4B4B4]  rounded`} placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //                 value={input ? input : ''} name={name}/>
        //             </div>
        //             <div className={`flex justify-start items-center gap-1 w-full border-[#B4B4B4] rounded ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border p-3' : 'border-none p-0'}`}>
        //                 {(name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney) && <BiDollar className='h-5 w-5 text-[#717171]'/>}
        //                 <input type={name === 'school_supplemental_application_deadline' || name === 'school_application_direct_to_school_deadline' || name === 'school_caspa_application_deadline_date' ? 'date' : 'text'}  disabled className={`grow ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border-none p-0' : 'border p-3'} focus:outline-none border-[#B4B4B4] rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}/>
        //             </div>
        //         </div>
        //         ) : (
        //         <div className={`flex justify-start items-center gap-1 w-full border-[#B4B4B4] rounded ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border p-3' : 'border-none p-0'}`}>
        //             {(name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney) && <BiDollar className='h-5 w-5 text-[#717171]'/>}
        //             <input type={name === 'school_supplemental_application_deadline' || name === 'school_application_direct_to_school_deadline' || name === 'school_caspa_application_deadline_date' ? 'date' : 'text'}  className={`grow ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border-none p-0' : 'border p-3'} focus:outline-none border-[#B4B4B4]  rounded`} placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //             value={(originalInput as string | number) ? (originalInput as string | number) : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, category, false)}/>
        //             </div>
        //         )}
        //         </>
        //     ) : (
        //         <div className='flex flex-col justify-start items-start gap-3 grow'>
                    
        //             {(input !== null || isEditMode) && (
        //             <div className={`flex justify-start items-center gap-1 w-full border-[#B4B4B4] rounded ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border p-3' : 'border-none p-0'}`}>
        //             {(name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney) && <BiDollar className='h-5 w-5 text-[#717171]'/>}
        //             <input type={name === 'school_supplemental_application_deadline' || name === 'school_application_direct_to_school_deadline' || name === 'school_caspa_application_deadline_date' ? 'date' : 'text'}  disabled={isEditMode ? false : true} className={`grow ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border-none p-0' : 'border p-3'} focus:outline-none  border-[#B4B4B4] rounded`} placeholder={name === 'school_duration_full_time' || name === 'school_duration_part_time' ? '# of months' : ''}
        //             value={input ? input : ''} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, `edited_${category}`, true)}/>
        //             </div>
        //             )}
        //             {(!isEditMode || ((input !== originalInput) && isEditMode)) && (
        //             <div className={`flex justify-start items-center gap-1 w-full border-[#B4B4B4] rounded ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border p-3' : 'border-none p-0'}`}>
        //             {(name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney) && <BiDollar className='h-5 w-5 text-[#717171]'/>}
        //             <input type={name === 'school_supplemental_application_deadline' || name === 'school_application_direct_to_school_deadline' || name === 'school_caspa_application_deadline_date' ? 'date' : 'text'}  disabled className={`grow ${name === 'school_supplemental_application_fee' || name === 'school_application_direct_to_school_fee' || isMoney ? 'border-none p-0' : 'border p-3'} focus:outline-none border-[#B4B4B4] rounded ${input || isEditMode ? 'line-through' : 'no-underline'}`} value={(originalInput as string | number) ? (originalInput as string | number) : ''}      
        //             />
        //             </div>
        //             )}
        //         </div>
        //     )}
        // </>
    )
}