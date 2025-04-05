import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";

const options = [
    { value: '', label: 'Select' },
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
]

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function MinimumGradeAndTimeCriteriaAndBooleanInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    noteValue,
    handleChanges,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
    handleRetrieveValue,
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
            path?: string;
            notePath?: string;
        }[],
        notePath?: string;
    },
    noteValue: NewNote[],
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
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

    const handleDuration = (name: string, path: string, value: string | number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    }

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

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
                        const inputPath = `${field.path}.${associatedField.name}${associatedField.path ? associatedField.path : ''}`;
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
                                {associatedField.type === 'select' ? (
                                    <SelectInput 
                                        label={associatedField.label}
                                        placeholder={associatedField.label}
                                        name={field.name}
                                        value={{ value: inputValue, label: inputValue }}
                                        path={inputPath}
                                        handleSelect={handleSelect}
                                        isRequired={false}
                                        isCreatable={false}
                                        options={options}
                                        isDisabled={isDisabled}
                                    />
                                ) : associatedField.type === 'boolean' ? (
                                    <BooleanInput 
                                        label={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
                                        path={inputPath}
                                        handleCheck={handleBoolean}
                                        isRequired={false}
                                        isDisabled={isDisabled}
                                    />
                                ) : associatedField.type === 'text-select' ? (
                                    <TextSelectInput 
                                        label={associatedField.label}
                                        placeholder="Quantity"
                                        name={field.name}
                                        value={inputValue}
                                        inputPath={`${inputPath}.quantity`}
                                        selectPath={`${inputPath}.units`}
                                        handleChange={handleDuration}
                                        options={unitOptions}
                                        isDisabled={isDisabled}
                                        schoolField={schoolField}
                                    />
                                ) : (
                                    <></>
                                )}
                                {associatedField.notePath && inputValue !== undefined && (
                                    <Notes 
                                        notes={inputNotes}
                                        field={{
                                            ...associatedField,
                                            name: field.name,
                                            path: '',
                                            notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                        }}
                                        toggleNote={toggleNote}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        handleChanges={handleChanges}
                                        handleModification={handleModification}
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
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                        notePath: field.notePath
                    }}
                    tab={tab}
                    toggleNote={toggleNote}
                    schoolField={schoolField}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                    checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
                />
            )}
            </div>
    )
}