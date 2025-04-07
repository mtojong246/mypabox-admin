import { Dispatch, SetStateAction } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import OtherTypesAndSpecificCoursesInputs from "../inputs/OtherTypesAndSpecificCoursesInputs";


const arrayGPAFields = [
    {
        label: 'Other Types of GPA Evaluated',
        name: 'school_other_types_of_gpa_evaluated',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Type of GPA Evaluated',
                name: 'type_of_gpa_evaluated',
                type: 'select',
                path: '.input',
            },
            {
                label: 'GPA Required or Recommended',
                name: 'gpa_value_required_or_recommended',
                type: 'radio',
                path: '.input',
            },
            {
                label: 'Minimum GPA Value Needed',
                name: 'minimum_gpa_value_needed',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum Number of Credits Evaluated',
                name: 'minimum_number_of_credits_evaluated',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
                path: '',
            }
        ],
    },
    {
        label: 'Minimum GPA for Specific Courses',
        name: 'school_minimum_gpa_for_specific_course',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Course Name',
                name: 'courseID',
                type: 'select',
                path: '.input',
            },
            {
                label: 'Minimum GPA Required',
                name: 'minimum_gpa_required_for_course',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
                path: '',
            }
        ],
    },

];



export default function OtherTypesAndSpecificCourses({
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
        originalDraftValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    checkIfValueHasBeenRemoved: (path: string, field: GenericSchoolField) => any | null;
}) {

    return (
        <>
        {arrayGPAFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

            return (
                <Container 
                    label={field.label} 
                    name={field.name}
                    school={school}
                    setSchool={setSchool}
                    isEditSchool={isEditSchool}
                    permissions={permissions}
                    originalInputs={
                        <OtherTypesAndSpecificCoursesInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            inputValues={value}
                            handleRetrieveValue={handleRetrieveValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <OtherTypesAndSpecificCoursesInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            inputValues={draftValue}
                            handleRetrieveValue={handleRetrieveValue}
                            handleChanges={handleChanges}
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
        </>
    )
}