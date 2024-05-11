import { UserObject } from "../types/users.types";
import { useState, useEffect } from "react";

export default function Screen({ isEdit, loggedInUser, editedInput, isEditMode }: { 
    isEdit: boolean, 
    loggedInUser: UserObject, 
    editedInput: any | null, 
    isEditMode: boolean }) {
    const [ isScreened, setIsScreened ] = useState(false);

    useEffect(() => {
        if (!isEdit) {
            setIsScreened(false);
        } else {
            if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                if (isEditMode) {
                    setIsScreened(false)
                } else {
                    setIsScreened(true);
                }
            } if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                if (loggedInUser.permissions.canVerify && editedInput !== null) {
                    setIsScreened(true);
                } else {
                    setIsScreened(false);
                }
            }
        }
    }, [loggedInUser, editedInput, isEditMode, isEdit])

    return (
        <>
        {isScreened && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
        </>
    )
}