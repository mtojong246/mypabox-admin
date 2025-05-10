import {  Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import GeneralInformationInputs from "./GeneralInformationInputs";
import { UserPermissions } from "../../../../types/users.types";


const genericSchoolInfoFields = [
    {
        label: 'School Name',
        name: 'school_name',
        type: 'text',
        path: '.input',
    },
    {
        label: 'School Logo',
        name: 'school_logo',
        type: 'text',
        path: '.input',
    },
    {
        label: 'Street Address',
        name: 'school_street',
        type: 'text',
        path: '.input',
    },
    {
        label: 'City',
        name: 'school_city',
        type: 'text',
        path: '.input'
    },
    {
        label: 'Country',
        name: 'school_country',
        type: 'select',
        path: '.input',
    },
    {
        label: 'State',
        name: 'school_state',
        type: 'select',
        path: '.input',
    },
    {
        label: 'Zip Code',
        name: 'school_zip_code',
        type: 'text',
        path: '.input',
    },
    {
        label: 'Website',
        name: 'school_website',
        type: 'text',
        path: '.input',
    },
    {
        label: 'School Emails',
        name: 'school_email',
        type: 'array',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'School Phone Numbers',
        name: 'school_phone_number',
        type: 'array',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'School Campus Location',
        name: 'school_campus_location',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Start Month',
        name: 'school_start_month',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Class Capacity',
        name: 'school_class_capacity',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Duration (Full-time)',
        name: 'school_duration_full_time',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Duration (Part-time)',
        name: 'school_duration_part_time',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Rolling Admissions',
        name: 'school_rolling_admissions',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Non-Rolling Admissions',
        name: 'school_nonrolling_admissions',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Pre-PA Curriculum',
        name: 'school_pre_pa_curriculum',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Direct High School Entry',
        name: 'school_direct_high_school_entry',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Part-time Options',
        name: 'school_part_time_option',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Online Learning',
        name: 'school_online_learning',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'On-Campus Housing',
        name: 'school_on_campus_housing',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Cadaver Lab',
        name: 'school_cadaver_lab',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Faith-Based Learning',
        name: 'school_faith_based_learning',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Military Personnel Preference',
        name: 'school_military_personnel_preference',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Holistic Review',
        name: 'school_holistic_review',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'General Information',
        name: 'school_general_information',
        type: 'text-area',
        path: '.input',
    },
]



export default function GeneralInformation({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean
    permissions: UserPermissions,
}) {
    const [ fields, setFields ] = useState<{
        label: string,
        name: string,
        type: string,
        path: string,
        notePath?: string,
    }[]>(genericSchoolInfoFields);

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
        checkIfValueHasBeenRemoved,
        validateAllRemovals,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(genericSchoolInfoFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                notePath?: string;
            }[] = [];
            genericSchoolInfoFields.forEach(f => {
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
                        <GeneralInformationInputs 
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
                        <GeneralInformationInputs 
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
                            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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