import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import TextSelectInput from "../../../../components/Form/InputTypes/TextSelectInput";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";
import Button from "../../../../components/Buttons/Button";
import Notes from "../../../../components/Form/Notes/Notes";

import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as EditIcon } from '../../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import ChangePopup from "../../../../components/Form/Validation/ChangePopup";
import { OptionalEvaluatorsType } from "./popups/OptionalEvaluatorsPopup";
import OptionalEvaluatorsField from "./arrayFields/OptionalEvaluatorsField";

const evaluatorOptions = [
    {value: 'PA', label: 'PA'},
    {value: 'MD', label: 'MD'},
    {value: 'DO', label: 'DO'},
    {value: 'NP', label: 'NP'},
    {value: 'PhD', label: 'PhD'},
];

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function EvaluationsInputs({
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
    togglePopup,
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
        originalDraftValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, field?: { name: string, path: string, index?: number }, arrItem?: OptionalEvaluatorsType) => void,
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

    const handleDuration = (name: string, path: string, value: string | number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    }

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

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

        if (name === 'school_evaluations_required') {
            inputPath = '.input';
            value = {
                school_evaluations_required: checked,
                school_minimum_number_of_evaluations_required: checked ? 0 : null,
                school_required_evaluator_title: checked ? [] : null,
                school_minimum_time_evaluator_knows_applicant: checked ? {
                    quantity: 0,
                    units: ''
                } : null,
                school_optional_evaluators_required: checked ? [] : null,
            }

        } else if (name === 'school_evaluations_recommended') {
            inputPath = '.input';
            value = {
                school_evaluations_recommended: checked,
                school_minimum_number_of_evaluations_recommended: checked ? 0 : null,
                school_recommended_evaluator_title: checked ? [] : null,
                school_minimum_time_evaluator_knows_applicant: checked ? {
                    quantity: 0,
                    units: ''
                } : null,
                school_optional_evaluators_recommended: checked ? [] : null,
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

    const handleAdd = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        if (path.includes('school_required_evaluator_title') || path.includes('school_required_evaluator_title')) {
            value = {
                value: '',
            }
        } else {
                const keys = path.split('.');
                if (keys[keys.length-1].includes('school_required_optional_group_evaluator_title') || keys[keys.length-1].includes('school_recommended_optional_group_evaluator_title')) {
                    value = {
                        value: '',
                    }
                } else if (keys[keys.length-1].includes('school_optional_evaluators_required')) {
                    value = {
                        school_minimum_number_of_evaluators_required_in_group: 0,
                        school_required_optional_group_evaluator_title: [],
                        school_minimum_time_evaluator_knows_applicant: {
                            quantity: 0,
                            units: ''
                        },
                    }
                } else {
                    value = {
                        school_minimum_number_evaluators_recommended_in_group: 0,
                        school_recommended_optional_group_evaluator_title: [],
                        school_minimum_time_evaluator_knows_applicant: {
                            quantity: 0,
                            units: ''
                        },
                    }
                }
        }

        const field = school[name as keyof NewSchool] as GenericSchoolField;

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
                        const inputPath = `${field.path}.${associatedField.name}`;
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
                                        permissions={permissions}
                                    />
                                ) : associatedField.type === 'text' ? (
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
                                        permissions={permissions}
                                    />
                                
                                ) : associatedField.type === 'text-select' ? (
                                    <TextSelectInput 
                                        label={associatedField.label}
                                        placeholder="Quantity"
                                        name={field.name}
                                        value={inputValue}
                                        inputPath={`${inputPath}.quantity`}
                                        selectPath={`${inputPath}.units`}
                                        handleChange={handleDuration}
                                        options={unitOptions}
                                        isDisabled={isDisabled}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        permissions={permissions}
                                    />
                                ) : associatedField.type === 'array' ? (
                                    <div className="w-full flex flex-col gap-4 justify-start items-start">
                                        <label className="text-default">{associatedField.label}</label>
                                        <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                        {(inputValue as any[]).length > 0 && (inputValue as any[]).map((val,i) => {
                                            if (associatedField.label.includes('Title')) {
                                                const arrayInputPath = `${inputPath}.${i}.value`
                                                const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                const change = schoolField.changes.find(change => change.path === `${inputPath}.${i}`);

                                                let textValue = '';
                                                if (tab === 'original') {
                                                    textValue = textInput.originalValue;
                                                } else {
                                                    textValue = textInput.originalDraftValue;
                                                }

                                                const toBeRemoved = checkIfValueHasBeenRemoved(`${inputPath}.${i}`);
                                                

                                                return (
                                                <div className="w-full flex gap-4 justify-start items-start">
                                                    <div className="flex w-full gap-2 justify-start items-start">
                                                        <div className={`${toBeRemoved && tab === 'modified' && 'opacity-50'} flex gap-4 p-6 border border-outline w-full rounded-lg`}>
                                                            <SelectInput 
                                                                label="Title"
                                                                placeholder="Title"
                                                                name={field.name}
                                                                value={{value: textValue, label: textValue}}
                                                                path={arrayInputPath}
                                                                handleSelect={handleSelect}
                                                                isRequired={false}
                                                                isCreatable={true}
                                                                options={evaluatorOptions}
                                                                isDisabled={isDisabled}
                                                                change={schoolField.changes.find(change => change.path === arrayInputPath)}
                                                                validateIndividualChange={validateIndividualChange}
                                                                revertIndividualChange={revertIndividualChange}
                                                                permissions={permissions}
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
                                                        >
                                                            <DeleteIcon/>
                                                        </button>
                                                    </div>
                                                </div>
                                                )
                                            } else {
                                                const arrayInputPath = `${inputPath}.${i}`;
                                                const change = schoolField.changes.find(change => change.path === arrayInputPath);

                                                const toBeRemoved = checkIfValueHasBeenRemoved(arrayInputPath);

                                                return (
                                                    <div className="w-full flex justify-between items-start gap-6">
                                                        <div className="grow flex justify-start items-start gap-2">
                                                            <OptionalEvaluatorsField 
                                                                value={val}
                                                                toBeRemoved={toBeRemoved}
                                                                tab={tab}
                                                            />
                                                            
                                                            {change && (
                                                                <ChangePopup 
                                                                    change={change}
                                                                    name={field.name}
                                                                    validateIndividualChange={validateIndividualChange}
                                                                    revertIndividualChange={revertIndividualChange}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <button 
                                                                onClick={(e:any) => togglePopup(
                                                                    e, 
                                                                    { name: field.name, path: inputPath, index: i }, 
                                                                    val
                                                                )} 
                                                                className="w-[24px] text-primary"
                                                            >   
                                                                <EditIcon/>
                                                            </button>
                                                            <button 
                                                                onClick={(e:any) => handleRemove(e, field.name, inputPath, i)} 
                                                                className="w-[24px] text-warning"
                                                            >
                                                                <DeleteIcon/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }                      
                                        })}
                                        <Button 
                                            type="primary"
                                            styling="outline"
                                            label={`Add ${associatedField.label.includes('Title') ? 'Title' : 'Option'}`}
                                            action={(e:any) => {
                                                associatedField.label.includes('Title') ? handleAdd(e, field.name, inputPath) : togglePopup(e, {
                                                    name: field.name,
                                                    path: inputPath
                                                })
                                            }}
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
                    field={{
                        ...field,
                        notePath: field.notePath
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
            )}
            </div>
    )
}