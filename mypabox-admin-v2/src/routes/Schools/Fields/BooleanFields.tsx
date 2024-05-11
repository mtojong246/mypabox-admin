import { ChangeEvent, useState, useEffect } from "react"
import { School } from "../../../types/schools.types";
import { UserObject } from "../../../types/users.types";

interface EditedField {
    input: string | number | null,
    prev: string | number | null,
    link: string,
    isEditMode: boolean,
}


export default function BooleanFields({ label, name, handleInputChange, value, editedValue, newSchool, loggedInUser, isEdit, innerFieldName }: { 
    label: string, 
    name: string, 
    value: boolean,
    editedValue: boolean,
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
            <div className='flex justify-start items-start gap-5 grow'>

                {isEditFieldShown && editedField && editedValue !== null && (
                    <div className='mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled={!editedField.isEditMode} type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, editedField.isEditMode, innerFieldName)} checked={editedValue}  />
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className={`ml-3 text-black text-xl`}>
                            {editedValue ? 'True' : 'False'}
                            </span>
                        </label>
                    </div>
                )}
                
                {isOriginalFieldShown && (
                    <div className='mt-2 grow'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input disabled={isOriginalInputDisabled} type="checkbox" className="sr-only peer" name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, false, innerFieldName)} checked={value}  />
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className={`ml-3 text-black text-xl`}>
                            {value ? 'True' : 'False'}
                            </span>
                        </label>
                    </div>   
                )}             
            </div>
        </>
    )
}