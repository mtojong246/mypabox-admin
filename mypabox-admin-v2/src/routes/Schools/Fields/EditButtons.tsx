import { UserObject } from "../../../types/users.types";
import { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from "react";

import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";
import { School, EditedField } from "../../../types/schools.types";
import useEditButtons from "../../../app/hooks/useEditButtons";




export default function EditButtons({ loggedInUser, name, isEdit, newSchool, setNewSchool, fieldNames, altInputName, altNoteName }: { 
    loggedInUser: UserObject,
    name: string,
    isEdit: boolean,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    fieldNames?: string[], 
    altInputName?: string, 
    altNoteName?: string
 }) {

    const [ canSeeButtons, setCanSeeButtons ] = useState(false);
    const [ editedField, setEditedField ] = useState<EditedField | null>(null);

    useEffect(() => {
        if (isEdit && (loggedInUser.permissions.canVerify || loggedInUser.permissions.canEditWithVerificationNeeded)) {
            setCanSeeButtons(true);
        } else {
            setCanSeeButtons(false);
        }
    }, [isEdit, loggedInUser]);

    useEffect(() => {
        const field = newSchool[`edited_${name}` as keyof School] as EditedField;
        setEditedField(field);
    }, [name, newSchool]);

    const { 
        enableEditObjects, 
        confirmEditObjects, 
        undoEditObjects, 
        revertEditObjects 
    } = useEditButtons({newSchool: newSchool, setNewSchool: setNewSchool, loggedInUser: loggedInUser})

    return (
        <>
        {canSeeButtons && editedField && (
        <div className='flex flex-col justify-start items-start gap-2'>
            <div className='flex justify-start items-start gap-2'>
                {loggedInUser.permissions.canVerify && editedField.input !== null && (
                    <>
                        <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditObjects(e, fieldNames, altInputName, altNoteName)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>
                        <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditObjects(e, fieldNames)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                    </>
                )}

                {loggedInUser.permissions.canEditWithVerificationNeeded && (
                    <>
                    {editedField.isEditMode ? (
                        <>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditObjects(e, fieldNames, altInputName, altNoteName)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => undoEditObjects(e, fieldNames)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                        </>
                    ) : (
                        <>
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditObjects(e, fieldNames, altNoteName)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            {editedField.input !== null && (
                                <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditObjects(e, fieldNames)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>
                            )}
                        </>
                    )}
                    </>
                )}
                
            </div>
        </div>
        )}
        </>
    )
}