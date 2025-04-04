import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";

import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import Button from "../../../../components/Buttons/Button";
import Notes from "../../../../components/Form/Notes/Notes";
import ChangePopup from "../../../../components/Form/Validation/ChangePopup";

export default function CertificationInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    noteValue,
    handleChanges,
    handleRetrieveValue,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
    deleteNote,
}: {
    tab: 'original' | 'modified',
    permissions: UserPermissions,
    isEditSchool: boolean,
    school: NewSchool,
    schoolField: GenericSchoolField,
    field: {
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
    },
    noteValue: NewNote[],
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);


    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
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
        } = handleModification(inputPath, field, value, 'modify');
        
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
        } = handleModification(path, field, value, 'add');

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemoveCert = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleModification(path, field, '', 'remove', index);

        handleChanges(field, name, originalField, draftField, path, 'removed');

    }

    
    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'object' ? (
                <>
                {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                    const associatedFieldPath = `${field.path}.${associatedField.name}`;
                    const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                    let associatedFieldValue = '';
                    
                    if (tab === 'original') {
                        associatedFieldValue = associatedFieldObject.originalValue
                    } else {
                        associatedFieldValue = associatedFieldObject.originalDraftValue;
                    }

                    let inputValue;

                    if (associatedFieldValue !== null) {
                        const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                        if (tab === 'original') {
                            inputValue = associatedFieldInputs.originalValue
                        } else {
                            inputValue = associatedFieldInputs.originalDraftValue;
                        }

                        return (
                            <>
                                {associatedField.type === 'boolean' ? (
                                    <BooleanInput 
                                        label={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
                                        path={inputPath}
                                        handleCheck={handleBoolean}
                                        isRequired={false}
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : associatedField.type === 'array' ? (
                                    <div className="w-full flex flex-col gap-4 justify-start items-start">
                                        <label className="text-default">{associatedField.label}</label>
                                        {(inputValue as any[]).length > 0 && (inputValue as any[]).map((val,i) => {
                                            const arrayInputPath = `${inputPath}.${i}.value`
                                            const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                            const change = schoolField.changes.find(change => change.path === inputPath);

                                            return (
                                                <div className="w-full flex gap-4 justify-start items-start">
                                                    <div className="flex w-full gap-2 justify-start items-start">
                                                        <div className="flex gap-4 p-6 border border-outline w-full rounded-lg">
                                                            <TextInput 
                                                                label="Certification"
                                                                placeholder="Certification"
                                                                name={field.name}
                                                                value={textInput.originalValue}
                                                                path={arrayInputPath}
                                                                handleInput={handleInput}
                                                                isRequired={false}
                                                                type="text"
                                                                isDisabled={isDisabled}
                                                                change={schoolField.changes.find(change => change.path === arrayInputPath)}
                                                                validateIndividualChange={validateIndividualChange}
                                                                revertIndividualChange={revertIndividualChange}
                                                            />
                                                        </div>
                                                        {change && (
                                                            <ChangePopup 
                                                                change={change}
                                                                name={field.name}
                                                                validateIndividualChange={validateIndividualChange}
                                                                revertIndividualChange={revertIndividualChange}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="py-4 flex justify-center items-end">
                                                        <button 
                                                            onClick={(e:any) => handleRemoveCert(e, field.name, inputPath, i)} 
                                                            className="w-[24px] text-warning transition-all hover:brightness-90"
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
                                            label='Add Certification'
                                            action={(e:any) => handleAddCert(e, field.name, inputPath)}
                                            adornment={<PlusIcon/>}
                                        />
                                    </div>
                                    // </div>
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
                    field={{
                        ...field,
                        notePath: field.notePath
                    }}
                    toggleNote={toggleNote}
                    schoolField={schoolField}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                />
            )}
            </div>
    )
}