import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import CertificationInputs from "./CertificationInputs";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const certificationFields = [
    {
        label: 'Certifications Required',
        name: 'school_certifications_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Certifications Required',
                name: 'school_certifications_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Required Certifications',
                name: 'school_certifications_required_options',
                type: 'array',
                path: '.input',
            },
        ],
    },
]



export default function Certifications({
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
        label: string;
        name: string;
        type: string;
        path: string;
        associatedFields: {
            label: string;
            name: string;
            type: string;
            path: string;
        }[],
        notePath?: string;
    }[]>(certificationFields);

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
        checkIfValueHasBeenRemoved,
    } = useVerification({ school, setSchool, isEditSchool, permissions });


    useEffect(() => {
        if (!showChangesOnly) {
            setFields(certificationFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                associatedFields: {
                    label: string;
                    name: string;
                    type: string;
                    path: string;
                }[],
                notePath?: string;
            }[] = [];
            certificationFields.forEach(f => {
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
                        <CertificationInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <CertificationInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
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