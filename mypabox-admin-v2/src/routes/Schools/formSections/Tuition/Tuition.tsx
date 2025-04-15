import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import TuitionInputs from "./TuitionInputs";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const tuitionFields = [
    {
        label: 'In-State Tuition',
        name: 'school_in_state_tuition',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Out-of-State Tuition',
        name: 'school_out_of_state_tuition',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'In-State Seat Deposit',
        name: 'school_seat_deposit_in_state',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Out-of-State Seat Deposit',
        name: 'school_seat_deposit_out_of_state',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    
]



export default function Tuition({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    showChangesOnly: boolean,
}) {
    const [ fields, setFields ] = useState<{
        label: string,
        name: string,
        type: string,
        path: string,
        notePath?: string,
    }[]>(tuitionFields);

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


    useEffect(() => {
        if (!showChangesOnly) {
            setFields(tuitionFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                notePath?: string;
            }[] = [];
            tuitionFields.forEach(f => {
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
                        <TuitionInputs 
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
                        <TuitionInputs 
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
                            revertIndividualChange={revertIndividualChange}
                            validateIndividualChange={validateIndividualChange}
                            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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