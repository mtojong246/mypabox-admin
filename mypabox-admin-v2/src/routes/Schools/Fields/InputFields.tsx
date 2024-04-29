import { ChangeEvent, useState, useEffect } from "react"
import { School } from "../../../types/schools.types";
import { UserObject } from "../../../types/users.types";

interface EditedField {
    input: string | number | null,
    prev: string | number | null,
    link: string,
    isEditMode: boolean,
}


export default function InputFields({ label, name, handleInputChange, value, editedValue, newSchool, loggedInUser, isEdit, innerFieldName }: { 
    label: string, 
    name: string, 
    value: string | number,
    editedValue: string | number,
    newSchool: School,
    loggedInUser: UserObject,
    isEdit: boolean,
    innerFieldName?: string,
    handleInputChange: (e: ChangeEvent<HTMLInputElement>,  isEditMode: boolean, innerFieldName?: string) => void,

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
    }, [isEdit, loggedInUser, editedField]);

    useEffect(() => {
        if (editedValue !== null && editedValue === value) {
            setIsOriginalFieldShown(false);
        } else {
            setIsOriginalFieldShown(true);
        }
    }, [editedValue, value]);
    

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 grow'>

                {isEditFieldShown && editedField && editedValue !== null && (
                    <input disabled={!editedField.isEditMode} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" value={editedValue} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, editedField.isEditMode, innerFieldName)}/>
                )}

                {isOriginalFieldShown && (
                <input disabled={isOriginalInputDisabled} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" value={value} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, false, innerFieldName)}/>
                )}
            </div>
        </>
    )
}