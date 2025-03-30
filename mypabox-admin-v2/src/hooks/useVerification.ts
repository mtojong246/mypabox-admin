import { Dispatch, SetStateAction, MouseEvent } from "react";
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

    const handleModify = (path: string, field: GenericSchoolField, newValue: any) => {
        const keys = path.split('.').filter(key => key); // Split the index string into keys
        const originalField = JSON.parse(JSON.stringify(field.original))
        const draftField = JSON.parse(JSON.stringify(field.draft));

        let original = originalField;
        let draft = draftField;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(key in original)) {
                console.log('path invalid');
            }
            original = original[key];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(key in draft)) {
                console.log('path invalid');
            }
            draft = draft[key];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }

        const originalValue = original[lastKey];

        original[lastKey] = newValue;
        draft[lastKey] = newValue;

        return {
            originalField,
            draftField,
            originalValue,
        }
    }

    const handleAddition = (path: string, field: GenericSchoolField, newValue: any) => {
        const keys = path.split('.').filter(key => key); // Split the index string into keys
        const originalField = JSON.parse(JSON.stringify(field.original))
        const draftField = JSON.parse(JSON.stringify(field.draft));

        let original = originalField;
        let draft = draftField;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in original)) {
                console.log('path invalid');
            }
            original = original[keys[i]];

        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in draft)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }
        
        const originalValue = original[lastKey] as any[];
        original[lastKey] = originalValue.concat(newValue);

        const originalDraftValue = draft[lastKey] as any[];
        draft[lastKey] = originalDraftValue.concat(newValue);

        return {
            originalField,
            draftField,
        }
    }

    const handleDeletion = (path: string, field: GenericSchoolField, index: number) => {
        const keys = path.split('.').filter(key => key); // Split the index string into keys
        const originalField = JSON.parse(JSON.stringify(field.original))
        const draftField = JSON.parse(JSON.stringify(field.draft));

        let original = originalField;
        let draft = draftField;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in original)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in draft)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }
        
        const originalValue = original[lastKey] as any[];
        original[lastKey] = originalValue.filter((val, i) => i !== index);

        const originalDraftValue = draft[lastKey] as any[];
        draft[lastKey] = originalDraftValue.filter((val,i) => i !== index);
        
        return {
            originalField,
            draftField,
        }
    }

    const handleRetrieveValue = (path: string, field: GenericSchoolField) => {
        const keys = path.split('.').filter(key => key); // Split the index string into keys
        const originalField = JSON.parse(JSON.stringify(field.original))
        const draftField = JSON.parse(JSON.stringify(field.draft));

        let original = originalField;
        let draft = draftField;
        
        let isOriginalInvalid = false;
        let isDraftInvalid = false;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in original)) {
                isOriginalInvalid = true;
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in draft)) {
                isDraftInvalid = true;
            }
            draft = draft[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }

        const originalValue = isOriginalInvalid ? undefined : original[lastKey];
        const originalDraftValue = isDraftInvalid ? undefined : draft[lastKey];

        return {
            originalValue,
            originalDraftValue,
        }
    }

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

    const validateIndividualChange = (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const path = change.path;

        const {
            originalDraftValue,
        } = handleRetrieveValue(path, field);

        const {
            originalField
        } = handleModify('.input', field, originalDraftValue);

        const modifiedChanges = field.changes.filter(c => c.type === change.type && c.path === change.path);
        
        setSchool({
            ...school,
            [name]: {
                ...field,
                original: originalField,
                changes: modifiedChanges,
            }
        })
    };

    const revertIndividualChange = (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const path = change.path;

        const {
            originalValue,
        } = handleRetrieveValue(path, field);

        const {
            draftField,
        } = handleModify('.input', field, originalValue);

        const modifiedChanges = field.changes.filter(c => c.type === change.type && c.path === change.path);
        
        setSchool({
            ...school,
            [name]: {
                ...field,
                draft: draftField,
                changes: modifiedChanges,
            }
        })
    };

    return {
        handleChanges,
        handleModify,
        handleAddition,
        handleDeletion,
        handleRetrieveValue,
        validateIndividualChange,
        revertIndividualChange,
    }

};

export default useVerification;