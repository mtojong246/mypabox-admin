import { Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import Container from "../../../../components/Form/Validation/Container";
import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import useVerification from "../../../../hooks/useVerification";

import Notes from "../../../../components/Form/Notes/Notes";
import NotePopup from "../../../../components/Popups/NotePopup";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const accreditationStatusOptions = [
    { label: 'Select', value: ''},
    { label: 'Provisional', value: 'Provisional'},
    { label: 'Continued', value: 'Continued'},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program'},
    { label: 'Probation', value: 'Probation'},
    { label: 'Administrative Probation', value: 'Administrative Probation'},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld'},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn'},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status'},
    { label: 'Developing - Not Accredited', value: 'Developing - Not Accredited'},
  ]

const accreditationStatusFields = [
    {
        label: 'Accreditation Status',
        name: 'school_accreditation_status',
        type: 'select',
        path: '.input',
        notePath: '.notes',
    },
]

export default function AccreditationStatus({
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
        handleModify,
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });
    

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

    };

    

    return (
        <>
        {accreditationStatusFields.map(field => {
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
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'select' ? (
                            <SelectInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={{value, label: value}}
                                path={field.path}
                                handleSelect={handleSelect}
                                isRequired={false}
                                isCreatable={false}
                                options={accreditationStatusOptions}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={noteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'select' ? (
                            <SelectInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={{value: draftValue, label: draftValue}}
                                path={field.path}
                                handleSelect={handleSelect}
                                isRequired={false}
                                isCreatable={false}
                                options={accreditationStatusOptions}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={draftNoteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
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