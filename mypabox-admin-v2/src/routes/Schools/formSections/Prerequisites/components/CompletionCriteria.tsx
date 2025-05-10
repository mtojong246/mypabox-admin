import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import CompletionCriteriaInputs from "../inputs/CompletionCriteriaInputs";


const completionCriteriaFields = [
    {
        label: 'Completion Conditions',
        name: 'school_prerequisite_completion_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'All Courses Must Be Completed Before Applying',
                name: 'school_all_courses_most_be_completed_before_applying',
                type: 'boolean',
            },
            {
                label: 'Courses Can Be In Progress While Applying',
                name: 'school_courses_can_be_in_progress_while_applying',
                type: 'boolean',
            },
            {
                label: 'Max Number of Courses Pending While Applying',
                name: 'school_maximum_number_of_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of Credits Pending While Applying',
                name: 'school_maximum_number_of_credits_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of SCIENCE Courses Pending While Applying',
                name: 'school_maximum_number_of_science_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of NON-SCIENCE Courses Pending While Applying',
                name: 'school_maximum_number_of_non_science_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Grade Required for Pending Courses',
                name: 'school_minimum_grade_required_for_pending_courses',
                type: 'select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Date Pending Courses Must Be Completed',
                name: 'school_date_pending_courses_must_be_completed',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Semester Pending Courses Must Be Completed',
                name: 'school_semester_pending_courses_must_be_completed',
                type: 'select',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
]


export default function CompletionCriteria({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleChanges,
    toggleNote,
    handleModification,
    revertIndividualChange,
    validateIndividualChange,
    showChangesOnly,
    validateAllRemovals
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
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
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    showChangesOnly: boolean,
    validateAllRemovals: (name: string) => any,
}) {
    const [ fields, setFields ] = useState<{
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
    }[]>(completionCriteriaFields);

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(completionCriteriaFields)
        } else {
            let changedFields: {
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
            }[] = [];
            completionCriteriaFields.forEach(f => {
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
                        <CompletionCriteriaInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <CompletionCriteriaInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            handleRetrieveValue={handleRetrieveValue}
                            revertIndividualChange={revertIndividualChange}
                            validateIndividualChange={validateIndividualChange}
                        />
                    }
                />
            )
        })}

        </>
    )
}