import { Dispatch, SetStateAction } from "react"
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



const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

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
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {
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
    } = useVerification({ school, setSchool, isEditSchool, permissions });


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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            toggleNote={toggleNote}
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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            toggleNote={toggleNote}
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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            toggleNote={toggleNote}
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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            toggleNote={toggleNote}
        />
        {examFields.map(field => {
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