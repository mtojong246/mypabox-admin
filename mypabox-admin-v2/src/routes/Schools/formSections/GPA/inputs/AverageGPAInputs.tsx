import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";

export default function AverageGPAInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    handleRetrieveValue,
    handleChanges,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
    checkIfValueHasBeenRemoved
}: {
    tab: 'original' | 'modified',
    permissions: UserPermissions,
    isEditSchool: boolean,
    school: NewSchool,
    schoolField: GenericSchoolField,
    field: {
        label: string;
        name: string;
        type: string;
        path: string;
        associatedFields: {
            label: string;
            name: string;
            type: string;
            path: string;
            notePath?: string;
        }[],
    },
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
    },
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

    };

    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'object' ? (
                <>
                {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                    const associatedFieldPath = `${field.path}.${associatedField.name}`;
                    const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                    let associatedFieldValue = '';
                    
                    if (tab === 'original') {
                        associatedFieldValue = associatedFieldObject.originalValue
                    } else {
                        associatedFieldValue = associatedFieldObject.originalDraftValue;
                    }

                    let inputValue;
                    let inputNotes = [];

                    if (associatedFieldValue !== null) {
                        const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                        if (tab === 'original') {
                            inputValue = associatedFieldInputs.originalValue;
                        } else {
                            inputValue = associatedFieldInputs.originalDraftValue;
                        }

                        if (associatedField.notePath !== undefined) {
                            const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                            const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                            if (tab === 'original') {
                                inputNotes = associatedFieldNotes.originalValue;
                            } else {
                                inputNotes = associatedFieldNotes.originalDraftValue;
                            }
                        }


                        return (
                            <>
                                {associatedField.type === 'text' ? (
                                    <TextInput 
                                        label={associatedField.label}
                                        placeholder={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
                                        path={inputPath}
                                        handleInput={handleInput}
                                        isRequired={false}
                                        type="text"
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === field.path)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : (
                                    <></>
                                )}
                                {associatedField.notePath && inputNotes !== undefined && (
                                    <Notes 
                                        label={associatedField.label}
                                        notes={inputNotes}
                                        field={{
                                            ...associatedField,
                                            name: field.name,
                                            notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                        }}
                                        toggleNote={toggleNote}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        handleChanges={handleChanges}
                                        handleModification={handleModification}
                                        checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
                                    />
                                )}
                            </>
                        )
                    } else {
                        return null;
                    }     
                })}
                </>
            ) : (
                <></>
            )}
            </div>
    )
}