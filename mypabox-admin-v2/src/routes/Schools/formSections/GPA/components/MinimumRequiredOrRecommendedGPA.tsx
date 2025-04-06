import { Dispatch, SetStateAction } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import MinimumRequiredOrRecommendedGPAInputs from "../inputs/MinimumRequiredOrRecommendedGPAInputs";

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
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    checkIfValueHasBeenRemoved: (path: string, field: GenericSchoolField) => any | null;
}) {


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
                        <MinimumRequiredOrRecommendedGPAInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            handleRetrieveValue={handleRetrieveValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <MinimumRequiredOrRecommendedGPAInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
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