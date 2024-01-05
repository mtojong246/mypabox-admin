import { UserObject } from "../../../types/users.types";
import Select from 'react-select';

export default function SelectFieldsGroup({loggedInUser, input, originalInput, isEditMode, name, category, options, handleSelect}: {
    loggedInUser: UserObject, 
    input: string | null,
    originalInput: string | null,
    isEditMode: 
    boolean, 
    name: string,
    category: string,
    options: {value: string, label :string}[],
    handleSelect: (e:any, category: string, isEditedInput: boolean) => void,
}) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {input !== null ? (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                <Select isDisabled className="w-full focus:outline-none rounded"
                options={options} value={{value: input, label: input}}/>
                <Select isDisabled className={`w-full focus:outline-none rounded ${input ? 'line-through' : 'no-underline'}`}
                options={options} value={{value: originalInput, label: originalInput}}/>
                </div>
            ) : (
            <Select className="grow focus:outline-none rounded"
            options={options} onChange={(e:any) => handleSelect(e, category, false)} value={{value: originalInput, label: originalInput}}/>
            )}
            </>
        ) : (
            <div className='flex flex-col justify-start items-start gap-3 grow'>
                {(input !== null || isEditMode) && <Select onChange={(e:any) => handleSelect(e, category, true)} isDisabled={isEditMode ? false : true} className="w-full focus:outline-none rounded"
                options={options} value={{value: input, label: input}}/>}
                {(!isEditMode || ((input !== originalInput) && isEditMode)) && <Select isDisabled className={`w-full focus:outline-none rounded ${input ? 'line-through' : 'no-underline'}`}
                options={options} value={{value: originalInput, label: originalInput}}/>}
            </div>
        )}
        </>
    )
}