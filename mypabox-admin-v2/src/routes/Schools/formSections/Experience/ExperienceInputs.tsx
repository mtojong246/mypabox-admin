import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import Notes from "../../../../components/Form/Notes/Notes";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import TextSelectInput from "../../../../components/Form/InputTypes/TextSelectInput";

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function ExperienceInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    value,
    noteValue,
    handleChanges,
    handleRetrieveValue,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
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
        associatedFields?: {
            label: string;
            name: string;
            type: string;
            path: string;
            notePath?: string;
        }[],
        notePath?: string;
    },
    value: any,
    noteValue: NewNote[],
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
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
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else if (tab === 'modified' && isEditSchool && !permissions.canEditWithoutVerificationNeeded && permissions.canVerify && schoolField.changes.length > 0) {
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
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_patient_experience') {
            let pceValue = {}
            inputPath = '.input';
            if (keys.includes('school_patient_experience_required')) {
                pceValue = {
                    school_patient_experience_required: {
                        input: checked,
                    },
                    school_minimum_patient_care_experience_hours_required: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                }
            } else if (keys.includes('school_patient_experience_recommended')) {
                pceValue = {
                    school_patient_experience_recommended: {
                        input: checked,
                    },
                    school_minimum_patient_care_experience_hours_recommended: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                }
            }

            if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                value = {
                    ...school.school_patient_experience.original.input,
                    ...pceValue,
                }
            } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                value = {
                    ...school.school_patient_experience.draft.input,
                    ...pceValue,
                }
            }
            
        } else if (name === 'school_healthcare_experience') {
            let hceValue = {};
            inputPath = '.input';
            if (keys.includes('school_healthcare_experience_required')) {
                hceValue = {
                    school_healthcare_experience_required: {
                        input: checked,
                    },
                    school_minimum_healthcare_experience_hours_required: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                }
            } else if (keys.includes('school_healthcare_experience_recommended')) {
                hceValue = {
                    school_healthcare_experience_recommended: {
                        input: checked,
                    },
                    school_minimum_healthcare_experience_hours_recommended: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                }
            }

            if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                value = {
                    ...school.school_healthcare_experience.original.input,
                    ...hceValue,
                }
            } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                value = {
                    ...school.school_healthcare_experience.draft.input,
                    ...hceValue,
                }
            }

        } else if (name === 'school_community_service') {
            let communityValue = {}
            inputPath = '.input';
            if (keys.includes('school_community_service_required')) {
                communityValue = {
                    school_community_service_required: {
                        input: checked,
                    },
                    school_minimum_community_service_hours_required: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                }
            } else if (keys.includes('school_community_service_recommended')) {
                communityValue = {
                    school_community_service_recommended: {
                        input: checked,
                    },
                    school_minimum_community_service_hours_recommended: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                }
            }

            if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                value = {
                    ...school.school_community_service.original.input,
                    ...communityValue,
                }
            } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                value = {
                    ...school.school_community_service.draft.input,
                    ...communityValue,
                }
            }

        } else if (name === 'school_volunteer_service') {
            let volunteerValue = {}
            inputPath = '.input';
            if (keys.includes('school_volunteer_service_required')) {
                volunteerValue = {
                    school_volunteer_service_required: {
                        input: checked,
                    },
                    school_minimum_volunteer_service_hours_required: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                }
            } else if (keys.includes('school_volunteer_service_recommended')) {
                volunteerValue = {
                    school_volunteer_service_recommended: {
                        input: checked,
                    },
                    school_minimum_volunteer_service_hours_recommended: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                }
            }

            if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                value = {
                    ...school.school_volunteer_service.original.input,
                    ...volunteerValue,
                }
            } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                value = {
                    ...school.school_volunteer_service.draft.input,
                    ...volunteerValue,
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
                                        tab={tab}
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
                <BooleanInput 
                    label={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleCheck={handleBoolean}
                    isRequired={false}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                />
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
                />
            )}
            </div>
    )
}