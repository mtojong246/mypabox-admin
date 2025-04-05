import { Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import EvaluationsInputs from "./EvaluationsInputs";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const evaluationsFields = [
    {
        label: 'Evaluations Required',
        name: 'school_evaluations_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Evaluations Required',
                name: 'school_evaluations_required',
                type: 'boolean',
            },
            {
                label: 'Minimum Number of Evaluations Required',
                name: 'school_minimum_number_of_evaluations_required',
                type: 'text',
            },
            {
                label: 'Required Evaluator Title',
                name: 'school_required_evaluator_title',
                type: 'array',
            },
            {
                label: 'Minimum Time Evaluator Knows Applicant',
                name: 'school_minimum_time_evaluator_knows_applicant',
                type: 'text-select',
            },
            {
                label: 'Optional Evaluators Required',
                name: 'school_optional_evaluators_required',
                type: 'array',
            }
        ],
    },
    {
        label: 'Evaluations Recommended',
        name: 'school_evaluations_recommended',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Evaluations Recommended',
                name: 'school_evaluations_recommended',
                type: 'boolean',
            },
            {
                label: 'Minimum Number of Evaluations Recommended',
                name: 'school_minimum_number_of_evaluations_recommended',
                type: 'text',
            },
            {
                label: 'Recommended Evaluator Title',
                name: 'school_recommended_evaluator_title',
                type: 'array',
            },
            {
                label: 'Minimum Time Evaluator Knows Applicant',
                name: 'school_minimum_time_evaluator_knows_applicant',
                type: 'text-select',
            },
            {
                label: 'Optional Evaluators Recommended',
                name: 'school_optional_evaluators_recommended',
                type: 'array',
            }
        ]
    }
]


export default function Evaluations({
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
        checkIfValueHasBeenRemoved,
    } = useVerification({ school, setSchool, isEditSchool, permissions });


    return (
        <>
        {evaluationsFields.map(field => {
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
                        <EvaluationsInputs 
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
                        <EvaluationsInputs 
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