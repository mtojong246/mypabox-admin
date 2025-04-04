import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../../components/Buttons/Button";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../components/Form/Notes/Notes";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";

import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import { UserPermissions } from "../../../../types/users.types";
import ChangePopup from "../../../../components/Form/Validation/ChangePopup";

export default function DegreeInformationInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    value,
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
        notePath?: string;
    },
    value: any,
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


    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
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
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleAddDegree = (e:any, name: string, path: string) => {
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

    const handleRemoveDegree = (e:any, name: string, path: string, index: number) => {
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
            {field.type === 'boolean' ? (
                <BooleanInput 
                    label={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleCheck={handleBoolean}
                    isRequired={false}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                />
            ) : field.type === 'array' ? (
                <div className="w-full flex flex-col gap-4 justify-start items-start">
                    <label className="text-default">{field.label}</label>
                    <>
                    {(value as any[]).length > 0 && (value as any[]).map((val,i) => {
                        const inputPath = `${field.path}.${i}.value`
                        const textInput = handleRetrieveValue(inputPath, schoolField);
                        const change = schoolField.changes.find(change => change.path === field.path);
                        return (
                            <div className="w-full flex gap-4 justify-start items-start">
                                <div className="flex w-full gap-2 justify-start items-start">
                                    <div className="flex gap-4 p-6 border border-outline w-full rounded-lg">
                                        <TextInput 
                                            label='Degree'
                                            placeholder='Degree'
                                            name={field.name}
                                            value={textInput.originalValue}
                                            path={inputPath}
                                            handleInput={handleInput}
                                            isRequired={false}
                                            type="text"
                                            isDisabled={isDisabled}
                                            change={schoolField.changes.find(change => change.path === inputPath)}
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
                                        onClick={(e:any) => handleRemoveDegree(e, field.name, field.path, i)} 
                                        className="w-[24px] text-warning hover:brightness-90 transition-all"
                                    >
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </div>
                        )
                        
                    })}
                    <Button 
                        type={isDisabled ? 'disable' : 'primary'}
                        styling="outline"
                        label='Add Type of Degree Offered'
                        action={(e:any) => handleAddDegree(e, field.name, field.path)}
                        adornment={<PlusIcon/>}
                    />
                    </>
                </div>
            ) : (
                <></>
            )}
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                        notePath: field.notePath,
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