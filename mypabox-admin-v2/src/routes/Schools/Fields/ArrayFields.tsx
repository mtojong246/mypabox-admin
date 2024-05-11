import { School, EditedField, EditedArrInputObj } from "../../../types/schools.types";
import { UserObject } from "../../../types/users.types"
import { MouseEvent, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";

export default function ArrayFields({name, values, editedValues, newSchool, deleteFunc, undoDeleteFunc, k, innerFieldName}: {
    name: string,
    values: any[];
    editedValues: EditedArrInputObj[] | null;
    newSchool: School;
    deleteFunc: (e: MouseEvent<HTMLButtonElement>, isEditMode: boolean, isNew: boolean, index: number, innerFieldName?: string) => void,
    undoDeleteFunc: (e: MouseEvent<HTMLButtonElement>, index: number, innerFieldName?: string) => void,
    innerFieldName?: string,
    k: string,
}) {
    const [ editedField, setEditedField ] = useState<EditedField | null>(null);
    const [ additionalKey, setAdditionalKey ] = useState('');

    useEffect(() => {
        const edited = `edited_${name}` as keyof School;
        const field = newSchool[edited] as EditedField;

        setEditedField(field);

    }, [name, newSchool]);

    useEffect(() => {
        console.log(values.length)
        if (values.length) {
            console.log(values)
            if (typeof values[0] !== 'string' && typeof values[0] !== 'number' && typeof values[0] !== 'boolean') {
                const keys = Object.keys(values[0]);            
                const nonDuplicateKeys = keys.filter(key => key !== k);
                setAdditionalKey(nonDuplicateKeys[0]);
            } else {
                setAdditionalKey('');
            }
        }
        
    }, [values, k]);



    return (
        <>
        {editedValues !== null && editedValues.length !== 0 && editedField && (
            <>
            {editedValues.map((value, i) => (
                <div className={`${value.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'} flex justify-between items-center border  rounded mt-3 py-2 pl-3 pr-2`}>
                    <p className={`font-medium ${!value.isCorrect && !value.isNew ? 'line-through' : 'no-underline'}`}>
                        {additionalKey && <span>{value[additionalKey]}: </span>}
                        {value[k]}
                    </p>
                    {!value.isCorrect && !value.isNew ? (
                        <button name={name} onClick={(e:any) => undoDeleteFunc(e, i, innerFieldName)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                    ) : (
                        <button name={name} onClick={(e:any) => deleteFunc(e, editedField.isEditMode , value.isNew, i, innerFieldName)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    )}
                </div>
            ))}
            </>
        )}

        {editedValues === null && values.length !== 0 && (
            <>
            {values.map((value,i) => (
                <div className='flex justify-between items-center border border-[#B4B4B4] rounded mt-3 py-2 pl-3 pr-2'>
                    <p className='font-medium'>
                        {additionalKey ? (
                            <>{value[additionalKey]}: {value[k]}</>
                        ) : value[k] !== undefined ? (
                            <>{value[k]}</>
                        ) : (
                            <>{value}</>
                        )}
                    </p>
                    <button name={name} onClick={(e:any) => deleteFunc(e, false, false, i, innerFieldName)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                </div>
            ))}
            </>
        )}
        </>
    )
}