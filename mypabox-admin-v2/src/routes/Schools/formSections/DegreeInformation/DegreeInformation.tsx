import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import Container from "../../../../components/Form/Validation/Container";
import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import useVerification from "../../../../hooks/useVerification";
import NotePopup from "../../../../components/Popups/NotePopup";
import DegreeInformationInputs from "./DegreeInformationInputs";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const degreeInfoFields = [
    {
        label: 'Types of Degrees Offered',
        name: 'school_type_of_degree_offered',
        type: 'array',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Dual-Degree Program',
        name: 'school_dual_degree_program',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: "Bachelor's Degree Required",
        name: 'school_bachelors_degree_required',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    
]

export default function DegreeInformation({
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
    }[]>(degreeInfoFields);
    
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
            setFields(degreeInfoFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                notePath?: string;
            }[] = [];
            degreeInfoFields.forEach(f => {
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
                    validateAllRemovals={validateAllRemovals}
                    originalInputs={
                        <DegreeInformationInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <DegreeInformationInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
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