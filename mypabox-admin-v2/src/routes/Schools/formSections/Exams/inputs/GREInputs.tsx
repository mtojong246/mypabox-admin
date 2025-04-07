import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";

export default function GREInputs({
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
    checkIfValueHasBeenRemoved,
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

        
        if (name === 'school_gre') {
            let greValue = {}
            if (keys[keys.length-2].includes('school_gre_required') || keys[keys.length-2].includes('school_gre_recommended')) {
                inputPath = '.input';
                greValue = {
                    school_caspa_gre_institution_code: checked ? {
                        input: 0,
                    } : null,
                    school_gre_institution_code: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_time_frame_gre_must_be_completed: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                    school_mcat_accepted_in_place_of_gre: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_gre_exempt_with_masters_degree: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_gre_exempt_with_phd_degree: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_minimum_gre_scores_required: checked ? {
                        input: false,
                    } : null,
                    school_gre_minimum_verbal_score: null,
                    school_gre_minimum_quantitative_score: null,
                    school_gre_minimum_analytical_writing_score: null,
                    school_gre_minimum_combined_score: null,
                    school_minimum_gre_score_notes: null,
                    school_gre_minimum_verbal_percentile: null,
                    school_gre_minimum_quantitative_percentile: null,
                    school_gre_minimum_analytical_writing_percentile: null,
                    school_gre_minimum_combined_percentile: null,
                    school_minimum_gre_percentile_notes: null,
                    school_average_gre_verbal_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_quantitative_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_analytical_writing_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_combined_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_verbal_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_quantitative_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_analytical_writing_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_combined_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_minimum_gre_scores_required')) {
                inputPath = '.input';
                greValue = {
                    school_minimum_gre_scores_required: {
                        input: checked,
                    },
                    school_gre_minimum_verbal_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_quantitative_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_analytical_writing_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_combined_score: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_gre_score_notes: checked ? {
                        notes: [],
                    } : null,
                    school_gre_minimum_verbal_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_quantitative_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_analytical_writing_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_combined_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_gre_percentile_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_gre_required', 'school_gre_recommended', 'school_minimum_gre_scores_required'].includes(keys[keys.length-2])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_gre.original.input,
                        ...greValue,
                        school_gre_required: keys[keys.length-2].includes('school_gre_required') ? {
                            input: checked,
                        } : school.school_gre.original.input.school_gre_required,
                        school_gre_recommended: keys[keys.length-2].includes('school_gre_recommended') ? {
                            input: checked,
                        } : school.school_gre.original.input.school_gre_recommended,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_gre.draft.input,
                        ...greValue,
                        school_gre_required: keys[keys.length-2].includes('school_gre_required') ? {
                            input: checked,
                        } : school.school_gre.draft.input.school_gre_required,
                        school_gre_recommended: keys[keys.length-2].includes('school_gre_recommended') ? {
                            input: checked,
                        } : school.school_gre.draft.input.school_gre_recommended,
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
                                        options={inputValue}
                                        isDisabled={isDisabled}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : associatedField.type === 'note' ? (
                                    <Notes 
                                        label={associatedField.label}
                                        notes={inputValue}
                                        field={{
                                            ...associatedField,
                                            notePath: inputPath,
                                            name: field.name,
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
                                ) : (
                                    <></>
                                )}
                                {associatedField.notePath && inputNotes !== undefined && (
                                    <Notes 
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
                />
            )}
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                            notePath: field.notePath,
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