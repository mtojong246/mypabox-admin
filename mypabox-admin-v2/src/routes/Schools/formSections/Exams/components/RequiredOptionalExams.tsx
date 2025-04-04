import { Dispatch, SetStateAction } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import RequiredOptionalExamsInputs from "../inputs/RequiredOptionalExamsInputs";


const requiredOptionalExamFields = [
    {
        label: 'Required Optional Exams',
        name: 'school_required_optional_exams',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum Number Of Exams To Be Completed',
                name: 'school_minimum_number_of_exams_to_be_completed',
                type: 'text',
            },
            {
                label: 'Exams',
                name: 'school_required_optional_exams_list',
                type: 'array',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
            },
        ],
    },

];


export default function RequiredOptionalExams({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    handleChanges,
    toggleNote,
    deleteNote,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
    },
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
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
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void
}) {


    return (
        <>
        {requiredOptionalExamFields.map(field => {
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
                        <RequiredOptionalExamsInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
                        />
                    }
                    modifiedInputs={
                        <RequiredOptionalExamsInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
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