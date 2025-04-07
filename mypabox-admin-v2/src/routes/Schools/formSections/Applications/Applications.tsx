import { Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import Container from "../../../../components/Form/Validation/Container";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import ApplicationsInputs from "./ApplicationsInputs";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const applicationFields = [
    {
        label: 'Application Submitted On CASPA',
        name: 'school_application_submitted_on_caspa',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Application Submitted On CASPA',
                name: 'school_application_submitted_on_caspa',
                type: 'boolean',
            },
            {
                label: 'Application Submission Deadline',
                name: 'school_caspa_application_deadline_date',
                type: 'text-date',
            },
            {
                label: 'Application Submission Deadline Type',
                name: 'school_caspa_application_deadline_type',
                type: 'select',
            },
        ],
    },
    {
        label: 'Application Submitted Directly To School',
        name: 'school_application_submitted_directly_to_school',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Application Submitted Directly To School',
                name: 'school_application_submitted_directly_to_school',
                type: 'boolean',
            },
            {
                label: 'Application Submission Deadline ',
                name: 'school_application_direct_to_school_deadline',
                type: 'text-date',
            },
            {
                label: 'Application Submission Fee',
                name: 'school_application_direct_to_school_fee',
                type: 'text-fee',
            },
        ],
    },
    {
        label: 'Supplemental Application Required',
        name: 'school_supplemental_application_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Supplemental Application Required',
                name: 'school_supplemental_application_required',
                type: 'boolean',
            },
            {
                label: 'Supplemental Application Deadline',
                name: 'school_supplemental_application_deadline',
                type: 'text-date',
            },
            {
                label: 'Supplemental Application Submission Fee',
                name: 'school_supplemental_application_fee',
                type: 'text-fee',
            },
            {
                label: 'Supplemental Application Link',
                name: 'school_supplemental_application_link',
                type: 'text',
            },
            {
                label: 'Supplemental Application Link Provided With Invite Only',
                name: 'school_supplemental_application_link_provided_with_invite_only',
                type: 'boolean',
            },
        ],
    },
    
]




export default function Applications({
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
        {applicationFields.map(field => {
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
                        <ApplicationsInputs 
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
                        <ApplicationsInputs 
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