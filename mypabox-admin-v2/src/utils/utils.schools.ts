import { Change } from "../types/newSchools.types";
import { UserPermissions } from "../types/users.types";

export interface TabsAndIndices {
    [key: string]: {
        tabs: string[];
        selectedIndex: number | null;
    }
}

export const setupValidationInterface = (tabsAndIndices: TabsAndIndices, permissions: UserPermissions, changes: Change[]) => {
    const { canEditWithVerificationNeeded, canVerify } = permissions;

    let updatedTabsAndIndices: TabsAndIndices = {};

    for (const [key, value] of Object.entries(tabsAndIndices)) {
        if (canEditWithVerificationNeeded || (changes.length > 0 && canVerify)) {
            updatedTabsAndIndices[key] = {
                tabs: ["Modified", "Original"],
                selectedIndex: 0,
            }
        } else {
            updatedTabsAndIndices[key] = {
                tabs: [],
                selectedIndex: null,
            }
        }
    };
    
    return updatedTabsAndIndices;
}