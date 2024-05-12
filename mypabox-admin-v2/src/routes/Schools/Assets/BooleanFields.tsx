import { ChangeEvent, useEffect, useState } from "react"
import { UserObject } from "../../../types/users.types"
import { EditedField, School } from "../../../types/schools.types";

export default function BooleanFields({ loggedInUser, input, isEditMode, originalInput, name, handleCheck, label, isBlank, isEdit, newSchool } : { 
    loggedInUser: UserObject,
    input: boolean | null,
    isEditMode: boolean,
    originalInput: boolean | null,
    name: string,
    handleCheck: (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void, 
    label?: string,
    isBlank?: boolean,
    isEdit: boolean,
    newSchool: School,

 }) {

    const [ isEditFieldShown, setIsEditFieldShown ] = useState(false);
    const [ isOriginalFieldShown, setIsOriginalFieldShown ] = useState(false);
    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    const [ editedField, setEditedField ] = useState<EditedField | null>(null);



    useEffect(() => {
        if (!isEdit) {
            setIsOriginalInputDisabled(false);
        } else {
            if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                setIsOriginalInputDisabled(true);
            } else if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                if (loggedInUser.permissions.canVerify && editedField && editedField.input !== null) {
                    setIsOriginalInputDisabled(true);
                } else {
                    setIsOriginalInputDisabled(false);
                }
                
            }
        }
    }, [isEdit, loggedInUser, editedField]);

    useEffect(() => {
        if (input !== null && input === originalInput) {
            setIsOriginalFieldShown(false);
        } else {
            setIsOriginalFieldShown(true);
        }
    }, [input, originalInput]);



    return (
        <>
        <div className='flex justify-start items-start gap-5 grow'>

        {input !== null && (
            <div className='mt-2'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, isEditMode)} checked={input ? true : false}  />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className={`ml-3 text-black text-xl`}>
                    {label ? label : input ? 'True' : 'False'}
                    </span>
                </label>
            </div>
        )}

        {isOriginalFieldShown && (
            <div className='mt-2 grow'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input disabled={isOriginalInputDisabled} type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, false)} checked={originalInput ? true : false}  />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className={`ml-3 text-black text-xl ${isOriginalInputDisabled && input !== null && 'line-through' }`}>
                    {label ? label : originalInput ? 'True' : 'False'}
                    </span>
                </label>
            </div>   
        )}             
        </div>
        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='mt-2 mb-[6px] grow'>
                <div className='flex justify-start items-start gap-6'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={input ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className={`ml-3 text-black ${label ? 'text-base' : 'text-xl'}`}>
                        {label ? label : input ? 'True' : 'False'}
                        </span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={originalInput ? true : false}  />
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className={`ml-3 text-black ${input !== null ? 'line-through' : 'no-underline'} ${label ? 'text-base' : 'text-xl'}`}>
                        {label ? label : originalInput ? 'True' : 'False'}
                        </span>
                    </label>
                </div>
            </div>
            ): (
            <div className='mt-2 grow'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, false)} checked={originalInput ? true : false}  />
                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                    <span className={`ml-3 text-black ${label ? 'text-base' : 'text-xl'}`}>
                    {label ? label : originalInput ? 'True' : 'False'}
                    </span>
                </label>
            </div>
            )}
            </>
        ): (
            <div className='grow mt-2 mb-[6px]'>
                <div className=' flex justify-start items-start gap-6'>
                    {(input !== null || isEditMode) && <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled={isEditMode ? false : true} className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, true)} checked={input ? true : false}  />
                        <div className={`w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600`}></div>
                        <span className={`ml-3 text-black ${label ? 'text-base' : 'text-xl'}`}>
                        {label ? label : input ? 'True' : 'False'}
                        </span>
                    </label>}
                    {(input !== originalInput) && !isBlank ? <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" disabled className="sr-only peer" name={name} checked={originalInput ? true : false}  />
                        <div className={`w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600`}></div>
                        <span className={`ml-3 text-black ${input !== null || isEditMode ? 'line-through' : 'no-underline'} ${label ? 'text-base' : 'text-xl'}`}>
                        {label ? label : originalInput ? 'True' : 'False'}
                        </span>
                    </label> : null}
                </div>
            </div>
            )} */}
        </>
    )
}