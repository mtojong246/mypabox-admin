import { Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import PAShadowingInputs from "./PAShadowingInputs";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

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
        deleteNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleRetrieveValue,
        handleModification,
        revertIndividualChange,
        validateIndividualChange
    } = useVerification({ school, setSchool, isEditSchool, permissions });



    return (
        <>
        {shadowingFields.map(field => {
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
                            deleteNote={deleteNote}
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
                            deleteNote={deleteNote}
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
                setSchool={setSchool}
            />
        )}
        </>
    )
}