import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";

export default function PACATInputs({
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
        associatedFields: {
            label: string;
            name: string;
            type: string;
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


    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_pacat') {
            let pacatValue = {}
            if (keys[keys.length-1].includes('school_pacat_required') || keys[keys.length-1].includes('school_pacat_recommended')) {
                inputPath = '.input';
                pacatValue = {
                    school_pacat_exam_school_code: checked ? 0 : null,
                    school_pacat_exam_scaled_minimum_score_required: checked ? 0 : null,
                    school_pacat_exam_group_scaled_minimum_score_required: checked ? 0 : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_pacat_required', 'school_pacat_recommended'].includes(keys[keys.length-1])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    if (keys[keys.length-1].includes('school_pacat_required')) {
                        if (school.school_pacat.original.input.school_pacat_recommended) {
                            value = {
                                ...school.school_pacat.original.input,
                                school_pacat_required: checked,
                            }
                        } else {
                            value = {
                                ...school.school_pacat.original.input,
                                ...pacatValue,
                                school_pacat_required: checked,
                            }
                        }
                    } else if (keys[keys.length-1].includes('school_pacat_recommended')) {
                        if (school.school_pacat.original.input.school_pacat_required) {
                            value = {
                                ...school.school_pacat.original.input,
                                school_pacat_recommended: checked,
                            }
                        } else {
                            value = {
                                ...school.school_pacat.original.input,
                                ...pacatValue,
                                school_pacat_recommended: checked,
                            }
                        }
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    if (keys[keys.length-1].includes('school_pacat_required')) {
                        if (school.school_pacat.draft.input.school_pacat_recommended) {
                            value = {
                                ...school.school_pacat.draft.input,
                                school_pacat_required: checked,
                            }
                        } else {
                            value = {
                                ...school.school_pacat.draft.input,
                                ...pacatValue,
                                school_pacat_required: checked,
                            }
                        }
                    } else if (keys[keys.length-1].includes('school_pacat_recommended')) {
                        if (school.school_pacat.draft.input.school_pacat_required) {
                            value = {
                                ...school.school_pacat.draft.input,
                                school_pacat_recommended: checked,
                            }
                        } else {
                            value = {
                                ...school.school_pacat.draft.input,
                                ...pacatValue,
                                school_pacat_recommended: checked,
                            }
                        }
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

                    if (associatedFieldValue !== null) {
                        const inputPath = `${field.path}.${associatedField.name}`;
                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                        if (tab === 'original') {
                            inputValue = associatedFieldInputs.originalValue;
                        } else {
                            inputValue = associatedFieldInputs.originalDraftValue;
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
                                        permissions={permissions}
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
                                        permissions={permissions}
                                    />
                                ) : (
                                    <></>
                                )}
                                
                            </>
                        )
                    } else {
                        return null;
                    }     
                })}
                </>
            ) : (
                <TextInput 
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleInput={handleInput}
                    isRequired={false}
                    type="text"
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    permissions={permissions}
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
                    permissions={permissions}
                />
            )}
            </div>
    )
}