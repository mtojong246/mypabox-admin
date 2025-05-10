import { NewSchool } from "../types/newSchools.types";
import { School } from "../types/schools.types";
import { UserObject } from "../types/users.types";
import { getUpdatedSchoolsAndDocuments } from "../utils/firebase/firebase.utils";

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


export const fetchNewSchools = async () => {
    try {
        // fetches schools from firebase db and dispatches school action, which updates the schools array 
        // that's stored in the school reducer
        const allSchools = await getUpdatedSchoolsAndDocuments();
        if (allSchools) {
          // Sorts schools by name alphabetically
          (allSchools as NewSchool[]).sort(function (a, b) {
            if (a.school_name.original.input < b.school_name.original.input) {
                return -1;
            }
            if (a.school_name.original.input > b.school_name.original.input) {
                return 1;
            }
            return 0;
        })
          return allSchools as NewSchool[];
        }
      } catch (error: any) {
        // throws error and navigates to main page if user is not authenticated 
        if (error.message === 'permission-denied') {
          alert("Access denied. Please log in using the appropriate credentials");
          return;
        } else {
          alert('Error loading school data')
        }
      }
}