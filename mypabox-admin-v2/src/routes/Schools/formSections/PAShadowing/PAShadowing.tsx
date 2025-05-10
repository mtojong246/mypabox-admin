import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import PAShadowingInputs from "./PAShadowingInputs";
import { UserPermissions } from "../../../../types/users.types";



const shadowingFields = [
    {
        label: 'PA Shadowing Required',
        name: 'school_pa_shadowing_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'PA Shadowing Required',
                name: 'school_pa_shadowing_required',
                type: 'boolean',
            },
            {
                label: 'Minimum PA Shadowing Hours Required',
                name: 'school_minimum_pa_shadowing_hours_required',
                type: 'text',
            },
        ],
    },
    {
        label: 'PA Shadowing Recommended',
        name: 'school_pa_shadowing_recommended',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'PA Shadowing Recommended',
                name: 'school_pa_shadowing_recommended',
                type: 'boolean',
            },
            {
                label: 'Minimum PA Shadowing Hours Recommended',
                name: 'school_minimum_pa_shadowing_hours_recommended',
                type: 'text',
            },
        ],
    },
    {
        label: 'Average PA Shadowing Hours Accepted Previous Cycle',
        name: 'school_average_pa_shadowing_hours_accepted_previous_cycle',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    }
]



export default function PAShadowing({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions
}) {
    const [ fields, setFields ] = useState<{
        label: string;
        name: string;
        type: string;
        path: string;
        associatedFields?: {
            label: string;
            name: string;
            type: string;
        }[],
        notePath?: string;
    }[]>(shadowingFields);

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
        validateAllRemovals
    } = useVerification({ school, setSchool, isEditSchool, permissions });


    useEffect(() => {
        if (!showChangesOnly) {
            setFields(shadowingFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
                associatedFields?: {
                    label: string;
                    name: string;
                    type: string;
                }[],
                notePath?: string;
            }[] = [];
            shadowingFields.forEach(f => {
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
                        <PAShadowingInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            value={value}
                            field={field}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                        />
                    }
                    modifiedInputs={
                        <PAShadowingInputs 
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