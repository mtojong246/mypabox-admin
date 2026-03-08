import { Change, NewNote } from "../types/newSchools.types";
import { UserPermissions } from "../types/users.types";

export interface TabsAndIndices {
    [key: string]: {
        tabs: string[];
        selectedIndex: number | null;
    }
}

export interface TabAndIndex {
    tabs: string[];
    selectedIndex: number | null;
}

export type SchoolFieldType = "boolean" | "text" | "select" | "text-select";

export interface SchoolField {
    name: string;
    label: string;
    original: { input: any, notes?: NewNote[] } | null;
    draft: { input: any, notes?: NewNote[] } | null;
    fieldType: SchoolFieldType,
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

export const isSchoolFieldDisabled = (
    tabAndIndex: TabAndIndex,
    isEditSchool: boolean, 
    permissions: UserPermissions,
    changes: Change[],
) => {
    const { tabs, selectedIndex } = tabAndIndex;
    const { canEditWithVerificationNeeded, canVerify } = permissions;
    let isDisabled = false;

    if (selectedIndex !== null && isEditSchool) {
        const tab = tabs[selectedIndex];
        if (tab === "Original" && (canEditWithVerificationNeeded || (changes.length > 0 && canVerify))) {
            isDisabled = true;
        } else if (tab === "Modified" && !canEditWithVerificationNeeded && canVerify && changes.length > 0) {
            isDisabled = true;
        }
    };

    return isDisabled;
}

export const retrieveSelectedTab = (name: string, tabsAndIndices: TabsAndIndices) => {
    const { tabs, selectedIndex } = tabsAndIndices[name];

    let tab: "Original" | "Modified" = 'Original';

    if (tabs.length > 0 && selectedIndex !== null) {
        tab = tabs[selectedIndex] as "Original" | "Modified";
    };

    return tab;
};

export const isDraftOnly = (isEditSchool: boolean, permissions: UserPermissions) => {
    const { canEditWithVerificationNeeded } = permissions;

    let draftOnly = false;

    if (isEditSchool && canEditWithVerificationNeeded) {
        draftOnly = true;
    };

    return draftOnly;
}

export const addModifyOrDeleteNote = (notes: NewNote[], newNote?: NewNote, index?: number) => {
    let updatedNotes: NewNote[] = [];

    // Add or edit condition
    if (newNote !== undefined) {
        // Add condition
        if (index === undefined) {
            updatedNotes = notes.concat(newNote);
        } else {
            updatedNotes = notes.map((n, i) => {
                if (i === index) {
                    return {...newNote}
                } else {
                    return {...n}
                }
            });
        }
    // Delete condition
    } else if (index !== undefined) {
        updatedNotes = notes.filter((n,i) => i !== index);
    };

    return updatedNotes;
}

