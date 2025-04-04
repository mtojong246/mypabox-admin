import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Button from "../../../../../components/Buttons/Button";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";

const options = [
    {value: 'GRE', label: 'GRE'},
    {value: 'PA-CAT', label: 'PA-CAT'},
    {value: 'MCAT', label: 'MCAT'},
    {value: 'CASPer', label: 'CASPer'}
]

export default function RequiredOptionalExamsInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    value,
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
        }[],
        notePath?: string;
    },
    value: any,
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

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value,'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

    };

    const handleAdd = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.');

        if (keys.includes('school_required_optional_exams_list')) {
            value = {
                value: '',
            }
        } else {
            value = {
                school_minimum_number_of_exams_to_be_completed: 0,
                school_required_optional_exams_list: [],
                notes: [],
            }
        }

        const {
            originalField,
            draftField,
        } = handleModification(path, field, value, 'add');

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemove = (e:any, name: string, path: string, index: number) => {
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
            {field.type === 'array' ? (
                <div className="w-full flex flex-col gap-4 justify-start items-start">
                <label className="text-default">{field.label}</label>
                {(value as any[]).length > 0 && (value as any[]).map((val,i) => (
                    <div className="flex w-full gap-2 justify-start items-start">
                    <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                        <div className="w-full flex justify-between items-center gap-8">
                            <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                            <Button 
                                type={isDisabled ? 'disable' : 'warning'}
                                styling="outline"
                                label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                action={(e:any) => handleRemove(e, field.name, field.path, i)}
                                adornment={<MinusIcon/>}
                            />
                        </div>
                        {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                            const inputPath = `${field.path}.${i}.${associatedField.name}`;
                            const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                            let inputValue: any = '';
                            if (tab === 'original') {
                                inputValue = associatedFieldInputs.originalValue;
                            } else {
                                inputValue = associatedFieldInputs.originalDraftValue;
                            }

                            return (
                                <>
                                    {associatedField.type === 'text' ? (
                                        <TextInput 
                                            label={associatedField.label}
                                            placeholder={associatedField.label}
                                            name={field.name}
                                            value={inputValue}
                                            path={inputPath}
                                            handleInput={handleInput}
                                            isRequired={false}
                                            type="text"
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
                                                let arrayInputValue: any = '';
                                                if (tab === 'original') {
                                                    arrayInputValue = textInput.originalValue;
                                                } else {
                                                    arrayInputValue = textInput.originalDraftValue;
                                                }
                                                const change = schoolField.changes.find(change => change.path === inputPath);

                                                return (
                                                <div className="w-full flex gap-4 justify-start items-start">
                                                    <div className="flex w-full gap-2 justify-start items-start">
                                                        <div className="flex gap-4 p-6 border border-outline w-full rounded-lg">
                                                            <SelectInput 
                                                                label="Exam"
                                                                placeholder="Exam"
                                                                name={field.name}
                                                                value={{ value: arrayInputValue, label: arrayInputValue }}
                                                                path={arrayInputPath}
                                                                handleSelect={handleSelect}
                                                                isRequired={false}
                                                                isCreatable
                                                                options={options}
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
                                                                onClick={(e:any) => handleRemove(e, field.name, inputPath, i)} 
                                                                className="w-[24px] text-warning"
                                                                disabled={isDisabled}
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
                                                action={(e:any) => handleAdd(e, field.name, inputPath)}
                                                adornment={<PlusIcon/>}
                                            />
                                        </div>
                                    ) : associatedField.type === 'note' ? (
                                        <Notes 
                                            notes={inputValue}
                                            field={{
                                                ...associatedField,
                                                notePath: inputPath,
                                                name: field.name,
                                                path: '',
                                            }}
                                            toggleNote={toggleNote}
                                            deleteNote={deleteNote}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )
                        })}
                    </div>
                    {schoolField.changes.find(change => change.path === field.path) && (
                        <ChangePopup 
                            change={schoolField.changes.find(change => change.path === field.path)!}
                            name={field.name}
                            validateIndividualChange={validateIndividualChange}
                            revertIndividualChange={revertIndividualChange}
                        />
                    )}
                    </div>
                ))}
                <Button 
                    type={isDisabled ? 'disable' : 'primary'}
                    styling="outline"
                    label={`Add Required Optional Exam`}
                    action={(e:any) => handleAdd(e, field.name, field.path)}
                    adornment={<PlusIcon/>}
                />
                </div>
            ) : (
                <></>
            )}
            </div>
    )
}