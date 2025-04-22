import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import MinimumRequiredOrRecommendedGPA from "./components/MinimumRequiredOrRecommendedGPA";
import OtherTypesAndSpecificCourses from "./components/OtherTypesAndSpecificCourses";
import AverageGPA from "./components/AverageGPA";
import Container from "../../../../components/Form/Validation/Container";
import GPAInputs from "./inputs/GPAInputs";
import { UserPermissions } from "../../../../types/users.types";



const gpaFields = [
    {
        label: 'GPA General Notes',
        name: 'school_gpa_general_note',
        type: 'text-area',
        path: '.input',
    },
]

export default function GPA({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    showChangesOnly: boolean,
    permissions: UserPermissions
}) {
    const [ fields, setFields ] = useState<{
        label: string,
        name: string,
        type: string,
        path: string,
    }[]>(gpaFields);

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
        revertIndividualChange,
        validateIndividualChange,
        validateAllRemovals,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(gpaFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
            }[] = [];
            gpaFields.forEach(f => {
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
        <MinimumRequiredOrRecommendedGPA 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            showChangesOnly={showChangesOnly}
        />
        <OtherTypesAndSpecificCourses 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            showChangesOnly={showChangesOnly}
        />
        <AverageGPA 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            showChangesOnly={showChangesOnly}
        />
        {fields.length > 0 && fields.map(field => {
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
                        <GPAInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            handleRetrieveValue={handleRetrieveValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                        />
                    }
                    modifiedInputs={
                        <GPAInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            handleRetrieveValue={handleRetrieveValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
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