import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import RequiredCoursesAndCategoriesInputs from "../inputs/RequiredCoursesAndCategoriesInputs";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";


const prereqFields = [
    {
        label: 'Required Courses And Categories',
        name: 'school_prereq_required_courses_and_categories',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Required Courses',
                name: 'school_prereq_required_courses',
                type: 'array',
                path: '.input',
                notePath: '.notes',
                associatedFields: [
                    {
                        label: 'Required Course ID',
                        name: 'school_required_course_id',
                        type: 'text',
                    },
                    {
                        label: 'With Lab',
                        name: 'school_required_course_lab',
                        type: 'boolean',
                    },
                    {
                        label: 'Lab Preferred',
                        name: 'school_required_course_lab_preferred',
                        type: 'boolean',
                    },
                    {
                        label: 'Credit Hours',
                        name: 'school_required_course_credit_hours',
                        type: 'text',
                    },
                    {
                        label: 'Quarter Hours',
                        name: 'school_required_course_quarter_hours',
                        type: 'text',
                    },
                    {
                        label: 'Note',
                        name: 'school_required_course_note_section',
                        type: 'text-area',
                    },
                ],
            },
            {
                label: 'Required Optional Courses',
                name: 'school_prereq_required_optional_courses',
                type: 'array',
                path: '.input',
                associatedFields: [
                    {
                        label: 'Minimum Number of Courses To Be Completed',
                        name: 'school_minimum_number_of_courses_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Required Optional Courses',
                        name: 'school_required_optional_courses_list',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Required Optional Course ID',
                                name: 'school_optional_course_id',
                                type: 'text',
                            },
                            {
                                label: 'With Lab',
                                name: 'school_optional_course_lab',
                                type: 'boolean',
                            },
                            {
                                label: 'Lab Preferred',
                                name: 'school_optional_course_lab_preferred',
                                type: 'boolean',
                            },
                            {
                                label: 'Credit Hours',
                                name: 'school_optional_course_credit_hours',
                                type: 'text',
                            },
                            {
                                label: 'Quarter Hours',
                                name: 'school_optional_course_quarter_hours',
                                type: 'text',
                            },
                            {
                                label: 'Note',
                                name: 'school_optional_course_note_section',
                                type: 'text-area',
                            },
                        ],
                    },
                    {
                        label: 'Notes',
                        name: 'notes',
                        type: 'note',
                    },
                ],
            },
            {
                label: 'Required Course Categories',
                name: 'school_prereq_required_course_categories',
                type: 'array',
                path: '.input',
                notePath: '.notes',
                associatedFields: [
                    {
                        label: 'Required Course Category',
                        name: 'school_required_course_category',
                        type: 'select',
                    },
                    {
                        label: 'Total Number of Credit Hours That Need to Be Completed',
                        name: 'school_required_course_category_number_of_credits_need_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Total Number of Quarter Hours That Need to Be Completed',
                        name: 'school_required_course_category_number_of_quarter_hours_need_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Total Number of Courses That Need Lab',
                        name: 'school_required_course_category_number_of_courses_that_need_lab',
                        type: 'text',
                    },
                    {
                        label: 'Included Courses',
                        name: 'school_required_course_category_extra_included_courses',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Course Name',
                                name: 'school_required_course_id',
                                type: 'select',
                            },
                            {
                                label: 'Note',
                                name: 'school_required_course_note',
                                type: 'text-area',
                            }
                        ]
                    },
                    {
                        label: 'Excluded Courses',
                        name: 'school_required_course_category_excluded_courses',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Course Name',
                                name: 'school_required_course_id',
                                type: 'select',
                            },
                            {
                                label: 'Note',
                                name: 'school_required_course_note',
                                type: 'text-area',
                            }
                        ]
                    },
                    {
                        label: 'Notes',
                        name: 'notes',
                        type: 'note',
                    },
                ],
            },
        ],
    },
]


export default function RequiredCoursesAndCategories({
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
    togglePopup,
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
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void,
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
            associatedFields: {
                label: string;
                name: string;
                type: string;
                path?: string;
                notePath?: string;
            }[],
        }[],
        notePath?: string;
    }[]>(prereqFields);

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(prereqFields)
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
                    associatedFields: {
                        label: string;
                        name: string;
                        type: string;
                        path?: string;
                        notePath?: string;
                    }[],
                }[],
                notePath?: string;
            }[] = [];
            prereqFields.forEach(f => {
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
                        <RequiredCoursesAndCategoriesInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            handleRetrieveValue={handleRetrieveValue}
                            togglePopup={togglePopup}
                        />
                    }
                    modifiedInputs={
                        <RequiredCoursesAndCategoriesInputs 
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
                            togglePopup={togglePopup}
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