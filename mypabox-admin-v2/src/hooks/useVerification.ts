import { Dispatch, SetStateAction, MouseEvent } from "react";
import { Change, GenericSchoolField, NewSchool } from "../types/newSchools.types";
import { UserPermissions } from "../types/users.types";
import isEqual from 'lodash/isEqual';

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

    const handleModification = (path: string, field: GenericSchoolField, newValue: any, modificationType: 'modify' | 'add' | 'remove', index?: number) => {
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

            if (keys[i] === undefined) {
                isOriginalInvalid = true;
                break;
            }
            
            if (!(keys[i] in original)) {
                isOriginalInvalid = true;
                break;
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }

            if (keys[i] === undefined) {
                isDraftInvalid = true;
                break;
            }
            
            if (!(keys[i] in draft)) {
                isDraftInvalid = true;
                break;
            }
            draft = draft[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }

        let originalValue;

        if (original === null) {
            originalValue = undefined;
        } else {
            if (!isOriginalInvalid) {
                originalValue = original[lastKey];
                if (modificationType === 'modify') {
                    original[lastKey] = newValue;
                } else if (modificationType === 'add') {
                    original[lastKey] = originalValue.concat(newValue);
                } else if (modificationType === 'remove' && index !== undefined) {
                    original[lastKey] = (originalValue as any[]).filter((val, i) => i !== index);
                }
            } else {
                originalValue = undefined;
            }
        }

        
        let originalDraftValue;

        if (!isDraftInvalid) {
            originalDraftValue = draft[lastKey] as any[];
            if (modificationType === 'modify') {
                draft[lastKey] = newValue;
            } else if (modificationType === 'add') {
                draft[lastKey] = originalDraftValue.concat(newValue);
            } else if (modificationType === 'remove' && index !== undefined) {
                draft[lastKey] = (originalDraftValue as any[]).filter((val, i) => i !== index);
            }
        };

        return {
            originalField,
            draftField,
            originalValue,
            originalDraftValue,
        }
    }

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
            
            if (keys[i] === undefined) {
                isOriginalInvalid = true;
                break;
            }
            
            if (!(keys[i] in original)) {
                isOriginalInvalid = true;
                break;
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }

            if (keys[i] === undefined) {
                isDraftInvalid = true;
                break;
            }
            
            if (!(keys[i] in draft)) {
                isDraftInvalid = true;
                break;
            }
            draft = draft[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }

        let originalValue = undefined;

        if (original === null) {
            originalValue = undefined;
        } else {
            originalValue = isOriginalInvalid ? undefined : original[lastKey];
        }

        const originalDraftValue = isDraftInvalid ? undefined : draft[lastKey];

        return {
            originalValue,
            originalDraftValue,
        }
    };

    const checkIfValueHasBeenRemoved = (path: string, field: GenericSchoolField) => {
        const {
            originalValue,
            originalDraftValue,
        } = handleRetrieveValue(path, field);

        if (originalDraftValue === undefined || originalDraftValue === null) {
            return originalValue;
        } else if (!isEqual(originalValue, originalDraftValue)) {
            return originalValue;
        } else {
            return null;
        }
    };

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
            const existingChange = changes.find(change => change.path === path);

            if (existingChange) {
                if (type === 'modified') {
                    if (existingChange.type === 'modified' && value !== originalValue && originalValue !== undefined) {
                        changes = changes.map(change => {
                            if (change.type === type && change.path === path) {
                                return {...newChange}
                            } else {
                                return {...change}
                            }
                        })
                    } else if (existingChange.type === 'modified' && value === originalValue) {
                        changes = changes.filter(change => change.path !== path);
                    } 
                } else if (type === 'removed') {
                    changes = changes.filter(change => change.path !== path);
                }
            } else {
                if (type === 'modified' && originalValue === undefined) {
                    changes = field.changes;
                } else {
                    changes = changes.concat(newChange);
                }
            }

            setSchool({
                ...school,
                [name]: {
                    ...field,
                    draft: type === 'removed' ? field.draft : draft,
                    changes,
                }
            })
        }
    }

    // Modifies indices with the same base path to accomodate for validating or reverting an individual field that 
    // is being removed
    const adjustIndices = (changes: Change[], updatedPath: string, updatedIndex: number) => {
        let updatedChanges: Change[] = [];

        changes.forEach(change => {
            const keys = change.path.split('.').filter(key => key !== '');
            
            const pathWithoutIndex = `.${keys.filter((key,i) => i !== keys.length-1).join('.')}`;
            if (updatedPath === pathWithoutIndex) {
                const lastKey = keys[keys.length-1];
                if (isNaN(Number(lastKey))) {
                    updatedChanges.push(change);
                } else {
                    let index = Number(lastKey);
                    if (index > updatedIndex) {
                        index = index - 1
                    }

                    const pathWithUpdatedIndex = `${pathWithoutIndex}.${index}`;
                    updatedChanges.push({
                        ...change,
                        path: pathWithUpdatedIndex,
                    })
                }
            } else {
                updatedChanges.push(change);
            }

        });

        return updatedChanges;
    }

    const validateAllRemovals = (name: string) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const removedChanges = field.changes.filter(change => change.type === 'removed');

        let draft;

        if (removedChanges.length < 1) {
            draft = field.draft;
        } else {
            let modified: {
                value: any[],
                path: string,
            }[] = [];

            removedChanges.forEach(change => {
                let path = change.path;
                let index: undefined | number = undefined;
                const keys = path.split('.').filter(key => key !== '');

                if (!isNaN(Number(keys[keys.length-1]))) {
                    path = `.${keys.filter((key, i) => i !== keys.length-1).join('.')}`
                    index = Number(keys[keys.length-1])
                } else {
                    path = change.path;
                }

                if (index !== undefined) {
                    const {
                        originalDraftValue,
                    } = handleRetrieveValue(path, field);

                    const modifiedDraftValue = (originalDraftValue as any[]).filter((val,i) => i !== index);

                    const existingModification = modified.find(mod => mod.path === path);

                    if (existingModification) {
                        modified.map(mod => {
                            if (mod.path === path) {
                                return {
                                    ...mod,
                                    value: modifiedDraftValue.filter(val => mod.value.includes(val)),
                                }
                            } else {
                                return mod
                            }
                        })
                    } else {
                        modified.push({
                            value: modifiedDraftValue,
                            path,
                        })
                    }
                    
                }
               

            });

            if (modified.length > 0) {
                modified.forEach(mod => {
                    const {
                        draftField
                    } = handleModification(mod.path, field, mod.value, 'modify');

                    draft = draftField;
                })
            }
        };

        return draft;
    }

    const validateIndividualChange = (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        let path = change.path;

        const {
            originalDraftValue,
        } = handleRetrieveValue(path, field);

        const keys = path.split('.').filter(key => key !== '');
        let index: undefined | number = undefined;
        

        if (change.type === 'added' || change.type === 'removed') {
            if (!isNaN(Number(keys[keys.length-1]))) {
                path = `.${keys.filter((key, i) => i !== keys.length-1).join('.')}`
                index = Number(keys[keys.length-1])
            } else {
                path = change.path;
            }
        }

        let validatedValue: any = '';

        if (change.type === 'modified') {
            validatedValue = originalDraftValue;
        } else {
            const retrievedValues = handleRetrieveValue(path, field);
            // const {
            //     originalValue,
            // } = handleRetrieveValue(path, field);

            if (change.type === 'added' && index !== undefined) {
                let originalArr = retrievedValues.originalValue as any[];
                if (index >= retrievedValues.originalValue.length) {
                    originalArr = retrievedValues.originalValue.concat(originalDraftValue);
                } else {
                    originalArr.splice(index, 0, originalDraftValue);
                }
                validatedValue = originalArr;

            } else if (change.type === 'removed' && index !== undefined) {
                validatedValue = (retrievedValues.originalValue as any[]).filter((val,i) => i !== index);
            }
        }

        const {
            originalField
        } = handleModification(
            path, 
            field, 
            validatedValue, 
            'modify',
        );

        let modifiedDraftField: any | undefined = undefined;


        let modifiedChanges = field.changes.filter(c => c.type !== change.type && c.path !== change.path);

        if (change.type === 'removed' && index !== undefined) {
            modifiedChanges = adjustIndices(modifiedChanges, path, index);
            const {
                draftField,
            } = handleModification(path, field, '', 'remove', index);
            modifiedDraftField = draftField
        }

        
        setSchool({
            ...school,
            [name]: {
                ...field,
                original: originalField,
                draft: modifiedDraftField !== undefined ? modifiedDraftField : field.draft,
                changes: modifiedChanges,
            }
        })
    };

    const revertIndividualChange = (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalValue,
        } = handleRetrieveValue(change.path, field);

        let path = change.path;

        const keys = path.split('.').filter(key => key !== '');
        let index: undefined | number = undefined;

        if (change.type === 'added' || change.type === 'removed') {
            if (Number(keys[keys.length-1])) {
                path = `.${keys.filter((key, i) => i !== keys.length-1).join('.')}`
                index = Number(keys[keys.length-1])
            } else {
                path = change.path;
            }
        }

        let revertedValue: any = '';
        
        if (change.type === 'modified') {
            revertedValue = originalValue;
        } else {
            const {
                originalDraftValue,
            } = handleRetrieveValue(path, field);

            if (change.type === 'added') {
                revertedValue = (originalDraftValue as any[]).filter((val,i) => i !== index);
            } 
        }


        const {
            draftField,
        } = handleModification(
            path, 
            field, 
            revertedValue, 
            'modify',
        );

        const modifiedChanges = field.changes.filter(c => c.type !== change.type && c.path !== change.path);

        // if (change.type === 'removed' && index !== undefined) {
        //     adjustIndices(modifiedChanges, path, index, false);
        // }
        
        setSchool({
            ...school,
            [name]: {
                ...field,
                draft: change.type === 'removed' ? field.draft : draftField,
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
        handleModification,
        checkIfValueHasBeenRemoved,
        validateAllRemovals,
    }

};

export default useVerification;