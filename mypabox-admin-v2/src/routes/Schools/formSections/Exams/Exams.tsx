import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import Container from "../../../../components/Form/Validation/Container";
import RequiredOptionalExams from "./components/RequiredOptionalExams";
import GRE from "./components/GRE";
import PACAT from "./components/PACAT";
import CASPer from "./components/CASPer";
import EnglishExams from "./components/EnglishExams";
import ExamInputs from "./inputs/ExamInputs";
import { UserPermissions } from "../../../../types/users.types";


const examFields = [
    {
        label: 'Exams General Notes',
        name: 'school_exams_general_note',
        type: 'text-area',
        path: '.input',
    },
]


export default function Exams({
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
    }[]>(examFields);

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
        validateAllRemovals,
    } = useVerification({ school, setSchool, isEditSchool, permissions });


    useEffect(() => {
        if (!showChangesOnly) {
            setFields(examFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                notePath?: string;
            }[] = [];
            examFields.forEach(f => {
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
        <RequiredOptionalExams 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            toggleNote={toggleNote}
            showChangesOnly={showChangesOnly}
        />
        <GRE 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            toggleNote={toggleNote}
            showChangesOnly={showChangesOnly}
        />
        <PACAT 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            validateAllRemovals={validateAllRemovals}
            toggleNote={toggleNote}
            showChangesOnly={showChangesOnly}
        />
        <CASPer 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            toggleNote={toggleNote}
            showChangesOnly={showChangesOnly}
            validateAllRemovals={validateAllRemovals}
        />
        <EnglishExams 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            toggleNote={toggleNote}
            showChangesOnly={showChangesOnly}
            validateAllRemovals={validateAllRemovals}
            
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
                        <ExamInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                        />
                    }
                    modifiedInputs={
                        <ExamInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
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