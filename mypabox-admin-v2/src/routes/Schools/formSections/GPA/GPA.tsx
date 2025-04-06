import { Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import MinimumRequiredOrRecommendedGPA from "./components/MinimumRequiredOrRecommendedGPA";
import OtherTypesAndSpecificCourses from "./components/OtherTypesAndSpecificCourses";
import AverageGPA from "./components/AverageGPA";
import Container from "../../../../components/Form/Validation/Container";
import GPAInputs from "./inputs/GPAInputs";



const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

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
        revertIndividualChange,
        validateIndividualChange,
        checkIfValueHasBeenRemoved
    } = useVerification({ school, setSchool, isEditSchool, permissions });



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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
        />
        {gpaFields.map(field => {
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