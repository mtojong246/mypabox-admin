import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import OptionalExamFields from "../arrayFields/OptionalExamFields";


export default function RequiredOptionalExamsInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    inputValues,
    handleChanges,
    handleRetrieveValue,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
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
    inputValues: any[],
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
        originalDraftValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else if (tab === 'modified' && isEditSchool && !permissions.canEditWithoutVerificationNeeded && permissions.canVerify && schoolField.changes.length > 0) {
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
            originalDraftValue,
        } = handleModification(path, field, value, 'add');

        const index = (originalDraftValue as any[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');
    }

    const handleRemove = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;


        const {
            originalField,
            draftField,
        } = handleModification(path, field, '', 'remove', index);

        handleChanges(schoolField, name, originalField, draftField, `${path}.${index}`, 'removed');

    };

    const checkIfValueHasBeenRemoved = (path: string) => {
        const change = schoolField.changes.find(change => change.path === path);

        if (change && change.type === 'removed') {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'array' ? (
                <div className="w-full flex flex-col gap-4 justify-start items-start">
                <label className="text-default">{field.label}</label>
                {inputValues.length > 0 && inputValues.map((val,i) => (
                    <div className="flex w-full gap-2 justify-start items-start">
                    <div className={`${checkIfValueHasBeenRemoved(`${field.path}.${i}`) && tab === 'modified' && 'opacity-50'} w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline`}>
                        <div className="w-full flex justify-between items-center gap-8">
                            <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                            <Button 
                                type={isDisabled ? 'disable' : 'warning'}
                                styling="outline"
                                label={`Remove Optional Exams`}
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
                                            value={inputValue ? inputValue : ''}
                                            path={inputPath}
                                            handleInput={handleInput}
                                            isRequired={false}
                                            type="text"
                                            isDisabled={isDisabled}
                                            change={schoolField.changes.find(change => change.path === inputPath)}
                                            validateIndividualChange={validateIndividualChange}
                                            revertIndividualChange={revertIndividualChange}
                                            permissions={permissions}
                                        />
                                    ) : associatedField.type === 'array' ? (
                                        <OptionalExamFields 
                                            tab={tab}
                                            name={field.name}
                                            associatedField={associatedField}
                                            handleRetrieveValue={handleRetrieveValue}
                                            inputValues={inputValue}
                                            schoolField={schoolField}
                                            isDisabled={isDisabled}
                                            inputPath={inputPath}
                                            handleSelect={handleSelect}
                                            handleAdd={handleAdd}
                                            handleRemove={handleRemove}
                                            validateIndividualChange={validateIndividualChange}
                                            revertIndividualChange={revertIndividualChange}
                                            permissions={permissions}
                                        
                                        />
                                    ) : associatedField.type === 'note' ? (
                                        <Notes 
                                            notes={inputValue ? inputValue : []}
                                            field={{
                                                ...associatedField,
                                                notePath: inputPath,
                                                name: field.name,
                                                path: '',
                                            }}
                                            tab={tab}
                                            toggleNote={toggleNote}
                                            schoolField={schoolField}
                                            validateIndividualChange={validateIndividualChange}
                                            revertIndividualChange={revertIndividualChange}
                                            handleChanges={handleChanges}
                                            handleModification={handleModification}
                                            permissions={permissions}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )
                        })}
                    </div>
                    {schoolField.changes.find(change => change.path === `${field.path}.${i}`) && (
                        <ChangePopup 
                            change={schoolField.changes.find(change => change.path === `${field.path}.${i}`)!}
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