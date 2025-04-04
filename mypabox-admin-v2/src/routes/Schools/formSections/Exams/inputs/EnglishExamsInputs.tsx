import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function EnglishExamsInputs({
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
    deleteNote,
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
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
    
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

        
        if (name === 'school_english_proficiency_exams') {
            let englishExamsValue = {}
            if (keys[keys.length-2].includes('school_english_proficiency_exams_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_english_proficiency_exams_required: {
                        input: checked,
                    },
                    school_toefl_required: checked ? {
                        input: false,
                    } : null,
                    school_minimum_time_frame_toefl_needs_to_be_completed: null,
                    school_toefl_exempt_with_masters_degree: null,
                    school_toefl_exempt_with_doctoral_degree: null,
            
                    school_toefl_ibt_minimum_total_score_required: null,
                    school_toefl_ibt_minimum_reading_score_required: null,
                    school_toefl_ibt_minimum_writing_score_required: null,
                    school_toefl_ibt_minimum_listening_score_required: null,
                    school_toefl_ibt_minimum_speaking_score_required: null,
                    school_toefl_ibt_minimum_score_notes: null,
            
                    school_toefl_pbt_minimum_total_score_required: null,
                    school_toefl_pbt_minimum_reading_score_required: null,
                    school_toefl_pbt_minimum_writing_score_required: null,
                    school_toefl_pbt_minimum_listening_score_required: null,
                    school_toefl_pbt_minimum_speaking_score_required: null,
                    school_toefl_pbt_minimum_score_notes: null,

                    school_ielt_required: checked ? {
                        input: false,
                    } : null,
                    school_ielt_minimum_total_score_required: null,
                    school_ielt_minimum_score_notes: null,
            
                    school_melab_required: checked ? {
                        input: false,
                    } : null,
                    school_melab_minimum_total_score_required: null,
                    school_melab_minimum_score_notes: null,
            
                    school_pte_academic_required: checked ? {
                        input: false,
                    } : null,
                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: null,
            
                    school_itep_academic_plus_required: checked ? {
                        input: false,
                    } : null,
                    school_itep_academic_plus_minimum_total_score_required: null,
                    school_itep_academic_plus_minimum_score_notes: null,
                }
            } else if (keys[keys.length-2].includes('school_toefl_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_toefl_required: {
                        input: checked,
                    },
                    school_minimum_time_frame_toefl_needs_to_be_completed: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                    } : null,
                    school_toefl_exempt_with_masters_degree: checked ? {
                        input: false,
                    } : null,
                    school_toefl_exempt_with_doctoral_degree: checked ? {
                        input: false,
                    } : null,
            
                    school_toefl_ibt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_reading_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_writing_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_listening_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_speaking_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
            
                    school_toefl_pbt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_reading_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_writing_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_listening_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_speaking_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }

            } else if (keys[keys.length-2].includes('school_ielt_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_ielt_required: {
                        input: checked,
                    },
                    school_ielt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_ielt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }

            } else if (keys[keys.length-2].includes('school_melab_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_melab_required: {
                        input: checked,
                    },
                    school_melab_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_melab_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_pte_academic_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_pte_academic_required: {
                        input: checked,
                    },
                    school_pte_academic_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_pte_academic_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_itep_academic_plus_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_itep_academic_plus_required: {
                        input: checked,
                    },
                    school_itep_academic_plus_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_itep_academic_plus_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            }  else {
                inputPath = path;
                value = checked;
            }

            if ([
                    'school_english_proficiency_exams_required', 
                    'school_toefl_required', 
                    'school_ielt_required', 
                    'school_melab_required' ,
                    'school_pte_academic_required' ,
                    'school_itep_academic_plus_required'
                ].includes(keys[keys.length-2])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_english_proficiency_exams.original.input,
                        ...englishExamsValue,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_english_proficiency_exams.draft.input,
                        ...englishExamsValue,
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
                        const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
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
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : associatedField.type === 'note' ? (
                                    <Notes 
                                        notes={inputValue}
                                        field={{
                                            ...associatedField,
                                            notePath: inputPath,
                                            name: field.name,
                                        }}
                                        toggleNote={toggleNote}
                                        deleteNote={deleteNote}
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
                />
            )}
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                        notePath: field.notePath
                    }}
                    toggleNote={toggleNote}
                    deleteNote={deleteNote}
                />
            )}
            </div>
    )
}