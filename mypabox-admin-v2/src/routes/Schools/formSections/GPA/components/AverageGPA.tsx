import { Dispatch, SetStateAction } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import AverageGPAInputs from "../inputs/AverageGPAInputs";

const averageGPAFields = [
    {
        label: 'Average GPA Accepted Previous Cycle',
        name: 'school_average_gpa_accepted_previous_cycle',
        type: 'object',
        path: '.input',
        associatedFields: [
            {
                label: 'Average Overall GPA Accepted',
                name: 'average_overall_gpa_accepted_previous_year',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average BCP GPA Accepted',
                name: 'average_bcp_gpa_accepted_previous_year',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average Science GPA Accepted',
                name: 'average_science_gpa_accepted_previous_year',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Average Prerequisite GPA Accepted',
                name: 'average_prerequisite_gpa_accepted_previous_year',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
]

export default function AverageGPA({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleChanges,
    toggleNote,
    handleModification,
    revertIndividualChange,
    validateIndividualChange,
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
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
}) {


    return (
        <>
        {averageGPAFields.map(field => {
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
                        <AverageGPAInputs 
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
                        <AverageGPAInputs 
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