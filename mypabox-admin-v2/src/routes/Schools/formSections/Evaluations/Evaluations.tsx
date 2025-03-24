import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import Button from "../../../../components/Buttons/Button";
import Notes from "../../../../components/Form/Notes/Notes";
import useVerification from "../../../../hooks/useVerification";
import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';


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
        deleteNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleModify,
        handleAddition,
        handleDeletion,
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        let value = {};
        let inputPath = '';

        if (name === 'school_certifications_required') {
            inputPath = '.input';
            value = {
                school_certifications_required: {
                    input: checked,
                },
                school_certifications_required_options: checked ? {
                    input: [],
                } : null,
            }

        } else {
            inputPath = path;
            value = checked;
        }

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(inputPath, field, value);
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
    };

    const handleAddCert = (e:any, name: string, path: string) => {
        e.preventDefault();
        const value = {
            value: ''
        };

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleAddition(path, field, value);

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemoveCert = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleDeletion(path, field, index);

        handleChanges(field, name, originalField, draftField, path, 'removed');

    }


    return (
        <>
        {certificationFields.map(field => {
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
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let originalInput;

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

                                    return (
                                        <>
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'array' ? (
                                                <div className="w-full flex flex-col justify-start items-start gap-2">
                                                    <label className="font-medium">{associatedField.label}</label>
                                                    <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                    {(originalInput as any[]).length > 0 && (originalInput as any[]).map((val,i) => {
                                                        const arrayInputPath = `${inputPath}.${i}.value`
                                                        const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                        return (
                                                            <div className="w-full flex gap-4">
                                                                <TextInput 
                                                                    label="Certification"
                                                                    placeholder="Certification"
                                                                    name={field.name}
                                                                    value={textInput.originalValue}
                                                                    path={arrayInputPath}
                                                                    handleInput={handleInput}
                                                                    isRequired={false}
                                                                />
                                                                <div className="py-4 flex justify-center items-end">
                                                                    <button 
                                                                        onClick={(e:any) => handleRemoveCert(e, field.name, inputPath, i)} 
                                                                        className="w-[24px] text-warning"
                                                                    >
                                                                        <DeleteIcon/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                        
                                                    })}
                                                    <Button 
                                                        type="primary"
                                                        styling="outline"
                                                        label='Add Type of Degree Offered'
                                                        action={(e:any) => handleAddCert(e, field.name, inputPath)}
                                                        adornment={<PlusIcon/>}
                                                    />
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <></>
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
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let draftInput;

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    draftInput = associatedFieldInputs.originalDraftValue;

                                    return (
                                        <>
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={field.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={field.path}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'array' ? (
                                                <div className="w-full flex flex-col justify-start items-start gap-2">
                                                    <label className="font-medium">{associatedField.label}</label>
                                                    <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                    {(draftInput as any[]).length > 0 && (draftInput as any[]).map((val,i) => {
                                                        const arrayInputPath = `${inputPath}.${i}.value`
                                                        const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                        return (
                                                            <div className="w-full flex gap-4">
                                                                <TextInput 
                                                                    label="Certification"
                                                                    placeholder="Certification"
                                                                    name={field.name}
                                                                    value={textInput.originalDraftValue}
                                                                    path={arrayInputPath}
                                                                    handleInput={handleInput}
                                                                    isRequired={false}
                                                                />
                                                                <div className="py-4 flex justify-center items-end">
                                                                    <button 
                                                                        onClick={(e:any) => handleRemoveCert(e, field.name, inputPath, i)} 
                                                                        className="w-[24px] text-warning"
                                                                    >
                                                                        <DeleteIcon/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                        
                                                    })}
                                                    <Button 
                                                        type="primary"
                                                        styling="outline"
                                                        label='Add Type of Degree Offered'
                                                        action={(e:any) => handleAddCert(e, field.name, inputPath)}
                                                        adornment={<PlusIcon/>}
                                                    />
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <></>
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