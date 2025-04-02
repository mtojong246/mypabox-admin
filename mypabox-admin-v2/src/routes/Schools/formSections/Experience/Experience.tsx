import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import Notes from "../../../../components/Form/Notes/Notes";
import useVerification from "../../../../hooks/useVerification";
import TextSelectInput from "../../../../components/Form/InputTypes/TextSelectInput";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const experienceFields = [
    {
        label: 'Paid Experience required',
        name: 'school_paid_experience_required',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Patient Experience (PCE)',
        name: 'school_patient_experience',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'PCE Required',
                name: 'school_patient_experience_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum PCE Hours Required',
                name: 'school_minimum_patient_care_experience_hours_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Required Minimum Time Frame PCE Needs To Be Completed',
                name: 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'PCE Recommended',
                name: 'school_patient_experience_recommended',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum PCE Hours Recommended',
                name: 'school_minimum_patient_care_experience_hours_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Recommended Minimum Time Frame PCE Needs To Be Completed',
                name: 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average PCE Hours Accepted Previous Cycle',
                name: 'school_average_patient_care_experience_hours_accepted_previous_cycle',
                type: 'text',
                path: '.input',
            }
        ],
    },
    {
        label: 'Healthcare Experience (HCE)',
        name: 'school_healthcare_experience',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'HCE Required', 
                name: 'school_healthcare_experience_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum HCE Hours Required',
                name: 'school_minimum_healthcare_experience_hours_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Required Minimum Time Frame HCE Needs To Be Completed',
                name: 'school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'HCE Recommended', 
                name: 'school_healthcare_experience_recommended',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum HCE Hours Recommended',
                name: 'school_minimum_healthcare_experience_hours_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Recommended Minimum Time Frame HCE Needs To Be Completed',
                name: 'school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average HCE Hours Accepted Previous Cycle',
                name: 'school_average_healthcare_experience_hours_accepted_previous_cycle',
                type: 'text',
                path: '.input',
            }
        ]
    },
    {
        label: 'Community Service',
        name: 'school_community_service',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Community Service Required', 
                name: 'school_community_service_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum Community Service Hours Required',
                name: 'school_minimum_community_service_hours_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Community Service Recommended', 
                name: 'school_community_service_recommended',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum Community Service Hours Recommended',
                name: 'school_minimum_community_service_hours_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average Community Service Hours Accepted Previous Cycle',
                name: 'school_average_community_service_hours_accepted_previous_cycle',
                type: 'text',
                path: '.input',
            },
        ]
    },
    {
        label: 'Volunteer Service',
        name: 'school_volunteer_service',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Volunteer Service Required', 
                name: 'school_volunteer_service_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum Volunteer Service Hours Required',
                name: 'school_minimum_volunteer_service_hours_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Volunteer Service Recommended', 
                name: 'school_volunteer_service_recommended',
                type: 'boolean',
                path: '.input',
            },
            {
                label: "Minimum Volunteer Service Hours Recommended",
                name: 'school_minimum_volunteer_service_hours_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average Volunteer Service Hours Accepted Previous Cycle',
                name: 'school_average_volunteer_service_hours_accepted_previous_cycle',
                type: 'text',
                path: '.input',
            },
        ]
    },
]

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function Experience({
    isEditSchool,
    school,
    setSchool,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {
    const {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
        deleteNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleModify,
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

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

    const handleDuration = (name: string, path: string, value: string | number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
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
            } else if (keys.includes('school_healthcare_experience_recommended')) {
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
        } = handleModify(inputPath, field, value);
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
    };


    return (
        <>
        {experienceFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;  
            const inputs = handleRetrieveValue(field.path, schoolField);
   
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

            let noteValue: NewNote[] = [];
            let draftNoteValue: NewNote[] = [];

            if (field.notePath !== undefined) {
                const notes = handleRetrieveValue(field.notePath, schoolField);
                noteValue = notes.originalValue;
                draftNoteValue = notes.originalDraftValue;
            }  

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
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'text' ? (
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
                                            ) : associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={originalInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
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
                                                    deleteNote={deleteNote}
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
                                isDisabled={false}
                            />
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={noteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={field.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={field.path}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'text' ? (
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
                                            ) : associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={draftInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
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
                                                    deleteNote={deleteNote}
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
                                value={draftValue}
                                path={field.path}
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                            />
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={draftNoteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
                    }
                />
            )
        })}

        {isNoteOpen && selectedField && (
            <NotePopup 
                toggleNotePopup={toggleNote}
                selectedField={selectedField}
                selectedNote={selectedNote}
                school={school}
                setSchool={setSchool}
            />
        )}
        </>
    )
}