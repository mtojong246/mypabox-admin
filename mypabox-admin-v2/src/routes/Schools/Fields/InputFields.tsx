import { ChangeEvent, useState, useEffect } from "react"
import { School } from "../../../types/schools.types";
import { UserObject } from "../../../types/users.types";
import { BiDollar } from "react-icons/bi";

interface EditedField {
    input: string | number | null,
    prev: string | number | null,
    link: string,
    isEditMode: boolean,
}

const currencyFields = ['school_in_state_tuition', 'school_out_of_state_tuition', 'school_seat_deposit_in_state', 'school_seat_deposit_out_of_state'];


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
    const [ isOriginalInputDisabled, setIsOriginalInputDisabled ] = useState(false);
    const [ isOriginalFieldShown, setIsOriginalFieldShown ] = useState(false);

    useEffect(() => {
        const edited = `edited_${name}` as keyof School;
        const field = newSchool[edited] as EditedField;

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

                {editedField && editedValue !== null && (
                    <div className="flex justify-between items-center border border-[#B4B4B4] rounded w-full">
                        {currencyFields.includes(name) && <BiDollar className="h-5 w-5 text-[#A1A1A1] ml-3"/>}
                        <input disabled={!editedField.isEditMode} className="grow focus:outline-none p-3 rounded" value={editedValue} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, editedField.isEditMode, innerFieldName)}/>
                    </div>
                )}

                {isOriginalFieldShown && (
                <div className="flex justify-between items-center border border-[#B4B4B4] rounded w-full">
                    {currencyFields.includes(name) && <BiDollar className="h-5 w-5 text-[#A1A1A1] ml-3"/>}
                    <input disabled={isOriginalInputDisabled} className="w-full focus:outline-none p-3 rounded" value={value} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, false, innerFieldName)}/>
                </div>
                )}
            </div>
        </>
    )
}