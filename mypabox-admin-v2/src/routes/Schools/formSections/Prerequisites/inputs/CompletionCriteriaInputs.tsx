import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";

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

const semesterOptions = [
    { value: '', label: 'Select' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Summer', label: 'Summer' }
]

export default function CompletionCriteriaInputs({
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


    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_prerequisite_completion_criteria') {
            let criteriaValue = {}
            if (keys[keys.length-1].includes('school_courses_can_be_in_progress_while_applying')) {
                inputPath = '.input';
                criteriaValue = {
                    school_courses_can_be_in_progress_while_applying: checked,
                    school_maximum_number_of_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_credits_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_science_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_non_science_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_grade_required_for_pending_courses: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                    school_date_pending_courses_must_be_completed: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                    school_semester_pending_courses_must_be_completed: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_courses_can_be_in_progress_while_applying'].includes(keys[keys.length-1])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_prerequisite_completion_criteria.original.input,
                        ...criteriaValue,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_prerequisite_completion_criteria.draft.input,
                        ...criteriaValue,
                    }
                }
            }
            
        } else {
            inputPath = path;
            value = checked;
        }

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(inputPath, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
    };


    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'object' ? (
                <>
                {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                {associatedField.type === 'boolean' ? (
                                    <BooleanInput 
                                        label={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
                                        path={inputPath}
                                        handleCheck={handleBoolean}
                                        isRequired={false}
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : associatedField.type === 'text' ? (
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
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : (
                                    <SelectInput 
                                        label={associatedField.label}
                                        placeholder={associatedField.label}
                                        name={field.name}
                                        value={{ value: inputValue, label: inputValue }}
                                        path={inputPath}
                                        handleSelect={handleSelect}
                                        isRequired={false}
                                        isCreatable={false}
                                        options={associatedField.name === 'school_minimum_grade_required_for_pending_courses' ? options : semesterOptions}
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                )}
                                {associatedField.notePath && inputNotes !== undefined && (
                                    <Notes 
                                        label={associatedField.label}
                                        notes={inputNotes}
                                        field={{
                                            ...associatedField,
                                            name: field.name,
                                            path: field.path,
                                            notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
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