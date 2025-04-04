import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";

const minimumGPAFields = [
    {
        label: 'Minimum GPA Required',
        name: 'school_minimum_gpa_required',
        type: 'object',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum GPA Required',
                name: 'school_minimum_gpa_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum Overall GPA Required',
                name: 'school_minimum_overall_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Science GPA Required',
                name: 'school_minimum_science_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Prerequisite GPA Required',
                name: 'school_minimum_prerequisite_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
    {
        label: 'Minimum GPA Recommended',
        name: 'school_minimum_gpa_recommended',
        type: 'object',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum GPA Recommended',
                name: 'school_minimum_gpa_recommended',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Overall GPA Recommended',
                name: 'school_minimum_overall_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Science GPA Recommended',
                name: 'school_minimum_science_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Prerequisite GPA Recommended',
                name: 'school_minimum_prerequisite_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },

]

export default function MinimumRequiredOrRecommendedGPA({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleChanges,
    toggleNote,
    deleteNote,
    handleModification,
    validateIndividualChange,
    revertIndividualChange
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
    },
    handleModify: (path: string, field: GenericSchoolField, newValue: any) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    handleChanges: (
        field: GenericSchoolField, 
        name: string, 
        original: any, 
        draft: any, 
        path: string, 
        type: "modified" | "added" | "removed", 
        originalValue?: any, value?: any
    ) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
}) {

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        let value = {};
        let inputPath = '';

        if (name === 'school_minimum_gpa_required') {
            inputPath = '.input';
            value = {
                school_minimum_gpa_required: {
                    input: checked,
                },
                school_minimum_overall_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_science_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_prerequisite_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
            }

        } else if (name === 'school_minimum_gpa_recommended') {
            inputPath = '.input';
            value = {
                school_minimum_gpa_recommended: {
                    input: checked,
                },
                school_minimum_overall_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_science_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_prerequisite_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
            }
        } else {
            inputPath = path;
            value = checked;
        }

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(inputPath, field, value);
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
    };


    return (
        <>
        {minimumGPAFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    

            return (
                <Container 
                    label={field.label} 
                    name={field.name}
                    school={school}
                    setSchool={setSchool}
                    isEditSchool={isEditSchool}
                    permissions={permissions}
                    originalInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let originalInput;
                                let originalNotes = [];

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

                                    if (associatedField.notePath !== undefined) {
                                        const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                                        const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                                        originalNotes = associatedFieldNotes.originalValue;
                                    }


                                    return (
                                        <>
                                            {associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {associatedField.notePath && originalNotes !== undefined && (
                                                <Notes 
                                                    notes={originalNotes}
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
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let draftInput;
                                let draftNotes = [];

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    draftInput = associatedFieldInputs.originalDraftValue;

                                    if (associatedField.notePath !== undefined) {
                                        const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                                        const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                                        draftNotes = associatedFieldNotes.originalDraftValue;
                                    }


                                    return (
                                        <>
                                            {associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {associatedField.notePath && draftNotes !== undefined && (
                                                <Notes 
                                                    notes={draftNotes}
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
                    }
                />
            )
        })}
        </>
    )
}