import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import MinimumGradeAndTimeCriteriaAndBooleanInputs from "../inputs/MinimumGradeAndTimeCriteriaAndBooleanInputs";

const schoolFields = [
    {
        label: 'Grade Criteria',
        name: 'school_grade_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Minimum Grade Required For All Courses',
                name: 'school_minimum_grade_required_for_all_courses',
                type: 'select',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Time Criteria',
        name: 'school_time_frame_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'All Courses Must Be Completed Within:',
                name: 'school_time_frame_all_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'All SCIENCE Courses Must Be Completed Within:',
                name: 'school_time_frame_science_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'All MATH Courses Must Be Completed Within:',
                name: 'school_time_frame_math_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
    {
        label: 'Pass/Fail Criteria',
        name: 'school_pass_fail_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Pass/Fail Courses Accepted',
                name: 'school_pass_fail_grade_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'AP Criteria',
        name: 'school_ap_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'AP Courses Accepted',
                name: 'school_ap_courses_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Community College Criteria',
        name: 'school_community_college_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Community College Credits Accepted',
                name: 'school_community_college_credits_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'CLEP Criteria',
        name: 'school_clep_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'CLEP Credits Accepted',
                name: 'school_clep_credits_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Online Courses Criteria',
        name: 'school_online_courses_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Online Courses Accepted',
                name: 'school_online_courses_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
];

export default function MinimumGradeAndTimeCriteriaAndBoolean({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleChanges,
    toggleNote,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    checkIfValueHasBeenRemoved,
    showChangesOnly,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
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
    checkIfValueHasBeenRemoved: (path: string, field: GenericSchoolField) => any | null;
    showChangesOnly: boolean,
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
    }[]>(schoolFields);

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(schoolFields)
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
            schoolFields.forEach(f => {
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
                    originalInputs={
                        <MinimumGradeAndTimeCriteriaAndBooleanInputs 
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
                        <MinimumGradeAndTimeCriteriaAndBooleanInputs 
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
                            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
                        />
                    }
                />
            )
        })}
        </>
    )
}