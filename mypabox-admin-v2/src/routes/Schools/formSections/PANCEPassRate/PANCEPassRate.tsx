import { Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import useVerification from "../../../../hooks/useVerification";
import Container from "../../../../components/Form/Validation/Container";
import NotePopup from "../../../../components/Popups/NotePopup";
import PANCEPassRateInputs from "./PANCEPassRateInputs";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const pancePassRateFields = [
    {
        label: 'First-Time Pass Rate',
        name: 'school_first_time_pass_rate',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Five Year Average First-Time Pass Rate',
        name: 'school_average_five_year_first_time_pass_rate',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'PANCE Pass Rate General Information',
        name: 'school_pance_pass_rate_note',
        type: 'text-area',
        path: '.input',
    },
]

export default function PANCEPassRate({
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
        {pancePassRateFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

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
                        <PANCEPassRateInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <PANCEPassRateInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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