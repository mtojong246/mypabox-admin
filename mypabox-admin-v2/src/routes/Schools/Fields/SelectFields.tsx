import { ChangeEvent, useState, useEffect } from "react"
import { School } from "../../../types/schools.types";
import { UserObject } from "../../../types/users.types";
import Select from 'react-select';

interface EditedField {
    input: string | number | null,
    prev: string | number | null,
    link: string,
    isEditMode: boolean,
}


export default function SelectFields({ label, name, handleInputChange, value, editedValue, newSchool, loggedInUser, isEdit, innerFieldName, options }: { 
    label: string, 
    name: string, 
    value: {value: string, label: string},
    editedValue: {value: string, label: string} | null,
    newSchool: School,
    loggedInUser: UserObject,
    isEdit: boolean,
    innerFieldName?: string,
    handleInputChange: (e: any, fieldName: string, isEditMode: boolean, innerFieldName?: string) => void,
    options: {value: string, label: string}[],

}) {

    const [ editedField, setEditedField ] = useState<EditedField | null>(null);
    const [ isEditFieldShown, setIsEditFieldShown ] = useState(false);
    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    const [ isOriginalFieldShown, setIsOriginalFieldShown ] = useState(false);


    useEffect(() => {
        const edited = `edited_${name}` as keyof School;
        const field = newSchool[edited] as EditedField;

        if (isEdit && editedValue !== null) {
            setIsEditFieldShown(true);
        } else {
            setIsEditFieldShown(false);
        }

        setEditedField(field);

    }, [name, newSchool, editedValue, isEdit]);
    
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
    }, [isEdit, loggedInUser, editedField])

    useEffect(() => {
        if (editedValue !== null && editedValue.value === value.value) {
            setIsOriginalFieldShown(false);
        } else {
            setIsOriginalFieldShown(true);
        }
    }, [editedValue, value]);

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 grow'>

                {isEditFieldShown && editedField && editedValue !== null && (
                    <Select isDisabled={!editedField.isEditMode} className="w-full grow focus:outline-none rounded"
                    options={options} onChange={(e:any) => handleInputChange(e, name, editedField.isEditMode, innerFieldName)} value={editedValue}/>               
                )}
                {isOriginalFieldShown && (
                    <Select isDisabled={isOriginalInputDisabled} className="w-full grow focus:outline-none rounded"
                    options={options} onChange={(e:any) => handleInputChange(e, name, false, innerFieldName)} value={value}/>    
                )}                   
            </div>
        </>
    )
}