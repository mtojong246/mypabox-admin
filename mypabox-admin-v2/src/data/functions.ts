import { Note, School } from "../types/schools.types";
import { UserObject } from "../types/users.types";

export const isDisabled = (values: any[] | null, isEditMode: boolean, isEdit: boolean, loggedInUser: UserObject) => {
    if (!isEdit) {
        return false;
    } else {
        if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (isEditMode) {
                return false;
            } else {
                return true;
            }
        } else if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (loggedInUser.permissions.canVerify && values !== null) {
                return true;
            } else {
                return false;
            }
            
        }
        return true;
    }
}

export const getSelectValue = (value: string, newSchool: School) => {
    const field = newSchool[value as keyof School];
    const input = field['input' as keyof object];

    if (input === null) {
        return null;
    } else {
        return { value: input, label: input };
    }
    
}