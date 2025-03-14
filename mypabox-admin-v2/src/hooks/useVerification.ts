import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Change, GenericSchoolField, NewSchool } from "../types/newSchools.types";
import { UserPermissions } from "../types/users.types";


const useVerification = ({
    school,
    setSchool,
    isEditSchool,
    permissions,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
}) => {

    const handleChanges = (
            field: GenericSchoolField, 
            name: string, 
            original: any, 
            draft: any, 
            path: string, 
            type: 'modified' | 'added' | 'removed',
            originalValue?: any, 
            value?: any
    ) => {
        let changes = field.changes;

        if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
            setSchool({
                ...school,
                [name]: {
                    ...field,
                    original,
                    draft,
                }
            })
        } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
            const newChange: Change = {
                type,
                path,
                editedBy: 'user',
                timestamp: new Date().toISOString(),
                original: originalValue,
                modified: value,
            }
            const existingChanges = changes.find(change => change.type === type && change.path === path);
            if (existingChanges) {
                changes = changes.map(change => {
                    if (change.type === type && change.path === path) {
                        return {...newChange}
                    } else {
                        return {...change}
                    }
                })
            } else {
                changes = changes.concat(newChange);
            }


            setSchool({
                ...school,
                [name]: {
                    ...field,
                    draft,
                    changes,
                }
            })
        }
    }


    const revertToOriginal = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();
        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            draft: field.original,
            changes: [],
        }

        setSchool({
            ...school,
            [name]: field,
        })
        
    }

    const validateAllChanges = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            original: field.draft,
            changes: [],
        }

        setSchool({
            ...school,
            [name]: field,
        })

    }

    const validateIndividualChanges = (e: MouseEvent<HTMLButtonElement>, name: string, path: string) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.'); // Split the index string into keys
        let original = field.original;
        let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in original)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in draft)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }

        original[keys[keys.length - 1]] = draft[keys[keys.length - 1]];
        
        setSchool({
            ...school,
            [name]: {
                original,
                draft,
                changes: field.changes.filter(change => change.path !== path),
            }
        })
    }

    return {
        revertToOriginal,
        validateAllChanges,
        validateIndividualChanges,
        handleChanges,
    }

};

export default useVerification;