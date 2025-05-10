import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import ExperienceInputs from "./ExperienceInputs";
import { UserPermissions } from "../../../../types/users.types";



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


export default function Experience({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions
}) {
    const [ fields, setFields ] = useState<{
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
    }[]>(experienceFields);

    const {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleRetrieveValue,
        handleModification,
        validateIndividualChange,
        revertIndividualChange,
        validateAllRemovals
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(experienceFields)
        } else {
            let changedFields: {
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
            }[] = [];
            experienceFields.forEach(f => {
                const schoolField = school[f.name as keyof NewSchool] as GenericSchoolField;
                if (schoolField.changes.length > 0) {
                    changedFields.push(f);
                }
            })
            setFields(changedFields)
        }
    }, [school, showChangesOnly]);

    return (
        <>
        {fields.length > 0 && fields.map(field => {
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
                    validateAllRemovals={validateAllRemovals}
                    originalInputs={
                        <ExperienceInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <ExperienceInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            revertIndividualChange={revertIndividualChange}
                            validateIndividualChange={validateIndividualChange}
                        />
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
                handleChanges={handleChanges}
                handleModification={handleModification}
            />
        )}
        </>
    )
}