import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import Container from "../../../../components/Form/Validation/Container";
import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import useVerification from "../../../../hooks/useVerification";
import Button from "../../../../components/Buttons/Button";

import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import Notes from "../../../../components/Form/Notes/Notes";
import NotePopup from "../../../../components/Popups/NotePopup";
import TextInput from "../../../../components/Form/InputTypes/TextInput";

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
    
    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

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

    const handleAddDegree = (e:any, name: string, path: string) => {
        e.preventDefault();
        const value = {
            field: ''
        };

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleAddition(path, field, value);

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemoveDegree = (e:any, name: string, path: string, index: number) => {
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
        {degreeInfoFields.map(field => {
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
                        {field.type === 'boolean' ? (
                            <BooleanInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                            />
                        ) : field.type === 'array' ? (
                            <>
                            {(value as any[]).length > 0 && (value as any[]).map((val,i) => {
                                const inputPath = `${field.path}.${i}.value`
                                const textInput = handleRetrieveValue(inputPath, schoolField);

                                return (
                                    <div className="w-full flex gap-4">
                                        <TextInput 
                                            label='Degree'
                                            placeholder='Degree'
                                            name={field.name}
                                            value={textInput.originalValue}
                                            path={inputPath}
                                            handleInput={handleInput}
                                            isRequired={false}
                                        />
                                        <div className="py-4 flex justify-center items-end">
                                            <button 
                                                onClick={(e:any) => handleRemoveDegree(e, field.name, field.path, i)} 
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
                                action={(e:any) => handleAddDegree(e, field.name, field.path)}
                                adornment={<PlusIcon/>}
                            />
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
                        {field.type === 'boolean' ? (
                            <BooleanInput 
                                label={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                            />
                        ) : field.type === 'array' ? (
                            <>
                            {(draftValue as any[]).length > 0 && (draftValue as any[]).map((val,i) => {
                                const inputPath = `${field.path}.${i}.value`
                                const textInput = handleRetrieveValue(inputPath, schoolField);

                                return (
                                    <div className="w-full flex gap-4">
                                        <TextInput 
                                            label='Degree'
                                            placeholder='Degree'
                                            name={field.name}
                                            value={textInput.originalDraftValue}
                                            path={inputPath}
                                            handleInput={handleInput}
                                            isRequired={false}
                                        />
                                        <div className="py-4 flex justify-center items-end">
                                            <button 
                                                onClick={(e:any) => handleRemoveDegree(e, field.name, field.path, i)} 
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
                                label={`Add ${field.name === 'school_email' ? 'Email' : 'Phone Number'}`}
                                action={(e:any) => handleAddDegree(e, field.name, field.path)}
                                adornment={<PlusIcon/>}
                            />
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