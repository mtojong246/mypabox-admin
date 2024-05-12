import { UserObject } from "../../../types/users.types";
import Select from 'react-select';
import { useState, useEffect } from "react";

export default function SelectFieldsGroup({loggedInUser, isEdit, input, originalInput, isEditMode, name, category, options, handleSelect, label, originalLabel, handleSelectInArray, index, isBlank}: {
    loggedInUser: UserObject, 
    input: string | null,
    originalInput: string | null,
    isEditMode: 
    boolean, 
    name: string,
    category: string,
    options: {value: string, label :string}[],
    handleSelect: (e:any, category: string, isEditedInput: boolean) => void,
    label?: string | null,
    originalLabel?: string | null,
    handleSelectInArray?: (e: any, name: string, index: number, isEditedInput: boolean) => void,
    index? : number,
    isBlank?: boolean,
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
                <Select onChange={(e:any) => {index !== undefined && handleSelectInArray !== undefined ? handleSelectInArray(e, category, index, isEditMode) :  handleSelect(e, category, isEditMode)}} className="w-full focus:outline-none rounded"
                options={options} value={{value: input, label: label ? label : input}}/>
            )}
            {isOriginalFieldShown && (
                <Select isDisabled={isOriginalInputDisabled} className={`w-full focus:outline-none rounded ${input ? 'line-through' : 'no-underline'}`}
                options={options} value={{value: originalInput, label: originalLabel ? originalLabel : originalInput}}/>
            )}

        </div>
        {/* {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                <Select isDisabled className="w-full focus:outline-none rounded"
                options={options} value={{value: input, label: label ? label : input}}/>
                <Select isDisabled className={`w-full focus:outline-none rounded ${input ? 'line-through' : 'no-underline'}`}
                options={options} value={{value: originalInput, label: originalLabel ? originalLabel : originalInput}}/>
                </div>
            ) : (
            <Select className="grow focus:outline-none rounded"
            options={options} onChange={(e:any) => {index !== undefined && handleSelectInArray !== undefined ? handleSelectInArray(e, category, index, false) :  handleSelect(e, category, false)}} value={{value: originalInput, label: originalLabel ? originalLabel : originalInput}}/>
            )}
            </>
        ) : (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                {(input !== null || isEditMode) && <Select onChange={(e:any) => {index !== undefined && handleSelectInArray !== undefined ? handleSelectInArray(e, category, index, true) :  handleSelect(e, category, true)}} isDisabled={isEditMode ? false : true} className="w-full focus:outline-none rounded"
                options={options} value={{value: input, label: label ? label : input}}/>}
                {(!isEditMode || ((input !== originalInput) && isEditMode)) && !isBlank && <Select isDisabled className={`w-full focus:outline-none rounded ${input ? 'line-through' : 'no-underline'}`}
                options={options} value={{value: originalInput, label: originalLabel ? originalLabel : originalInput}}/>}
            </div>
        )} */}
        </>
    )
}