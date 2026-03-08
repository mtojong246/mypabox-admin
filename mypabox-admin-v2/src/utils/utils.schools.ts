import { Change } from "../types/newSchools.types";
import { UserPermissions } from "../types/users.types";

export const setupValidationInterface = (tabs: {[key: string]: string[]}, permissions: UserPermissions, changes: Change[]) => {
    const { canEditWithVerificationNeeded, canVerify } = permissions;

    let updatedTabs: {[key: string]: string[]} = {};
    let showRevertButton = false;
    let showValidateAllButton = false;

    for (const [key, value] of Object.entries(tabs)) {
        if (canEditWithVerificationNeeded || (changes.length > 0 && canVerify)) {
            updatedTabs[key] = ["Modified", "Original"]
        } else {
            updatedTabs[key] = [];
        }
    }

    if (changes.length > 0 && (canVerify || canEditWithVerificationNeeded)) {
        showRevertButton = true;
    }

    if (changes.length > 0 && canVerify) {
        showValidateAllButton = true;
    }
    
    return {
        tabs: updatedTabs,
        showRevertButton,
        showValidateAllButton,
    }

    
}