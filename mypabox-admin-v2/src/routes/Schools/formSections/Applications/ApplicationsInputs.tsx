import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";

import { ReactComponent as DollarIcon } from '../../../../components/Icons/Dollar-Sign.svg';
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";
import Notes from "../../../../components/Form/Notes/Notes";
import { StylesConfig } from "react-select";

const options = [
    {value: 'Verified', label: 'Verified', color: '#27AE60', focus: '#27AE60'},
    {value: 'Completed', label: 'Completed', color: '#F39C12', focus: '#F39C12'},
    {value: 'Submitted', label: 'Submitted', color: '#3498DB', focus: '#3498DB'},
];

interface ColorOptions {value: string | number, label: string | number, color?: string, focus?: string}

const dot = (color:string = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color ,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 10,
      height: 10,
      width: 10,
    },
  });

const colorStyles: StylesConfig<ColorOptions> = {
    control: (styles) => ({...styles, backgroundColor: 'white'}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? data.focus : undefined,
            color: isDisabled ? '#ccc' : isSelected ? 'white' : isFocused ? 'white' : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? isSelected ? data.color : data.focus : undefined,
            }
        }
    },
    input: (styles) => ({...styles, ...dot()}),
    placeholder: (styles) => ({...styles, ...dot('#ccc')}),
    singleValue: (styles, {data}) => ({...styles, ...dot(data.color)})
}

export default function ApplicationsInputs({
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
        associatedFields: {
            label: string;
            name: string;
            type: string;
        }[],
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
    const [ color, setColor ] = useState('');


    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);

    useEffect(() => {
        let value: string | null = null;
        if (tab === 'original') {
            value = school.school_application_submitted_on_caspa.original.input.school_caspa_application_deadline_type;
        } else {
            value = school.school_application_submitted_on_caspa.draft.input.school_caspa_application_deadline_type;
        }

        if (value !== null) {
            const optionsObj = options.find(opt => opt.value === value);
            if (optionsObj) {
                setColor(optionsObj.color);
            }
        }
    }, [school, tab]);

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

        if (name === 'school_application_submitted_on_caspa') {
            inputPath = '.input';
            value = {
                school_application_submitted_on_caspa: checked,
                school_caspa_application_deadline_date: checked ? '' : null,
                school_caspa_application_deadline_type: checked ? '' : null,
            }

        } else if (name === 'school_application_submitted_directly_to_school') {
            inputPath = '.input';
            value = {
                school_application_submitted_directly_to_school: checked,
                school_application_direct_to_school_deadline: checked ? '' : null,
                school_application_direct_to_school_fee: checked ? '' : null,
            }
        } else if (name === 'school_supplemental_application_required') {
            const keys = path.split('.');
            if (keys.includes('school_supplemental_application_link_provided_with_invite_only')) {
                inputPath = path;
                value = checked;
            } else {
                inputPath = '.input';
                value = {
                    school_supplemental_application_required : checked,
                    school_supplemental_application_deadline: checked ? '' : null,
                    school_supplemental_application_fee: checked ? '' : null,
                    school_supplemental_application_link: checked ? '' : null,
                    school_supplemental_application_link_provided_with_invite_only: checked ? false : null,
                }
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

    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'object' ? (
                <>
                {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                    const associatedFieldPath = `${field.path}.${associatedField.name}`;
                    const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                    let associatedFieldValue = '';
                    
                    if (tab === 'original') {
                        associatedFieldValue = associatedFieldObject.originalValue
                    } else {
                        associatedFieldValue = associatedFieldObject.originalDraftValue;
                    }

                    let inputValue: any = '';

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
                                    />
                                ) : associatedField.type.includes('text') ? (
                                    <TextInput 
                                        label={associatedField.label}
                                        placeholder={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
                                        path={inputPath}
                                        handleInput={handleInput}
                                        isRequired={false}
                                        type={associatedField.type.includes('date') ? 'date' : 'text'}
                                        startingAdornment={associatedField.type.includes('fee') ? <DollarIcon /> : undefined}
                                        link={associatedField.name === 'school_supplemental_application_link' ? inputValue : undefined}
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                    />
                                ) : (
                                    <SelectInput 
                                        label={associatedField.label}
                                        placeholder={associatedField.label}
                                        name={field.name}
                                        value={{ value: inputValue, label: inputValue, color: associatedField.name === 'school_caspa_application_deadline_type' ? color : undefined }}
                                        path={inputPath}
                                        handleSelect={handleSelect}
                                        isRequired={false}
                                        isCreatable={false}
                                        options={options}
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        colorStyles={colorStyles}
                                    />
                                )}
                            </>
                        )
                    } else {
                        return null;
                    }     
                })}
                </>
            ) : (
                <TextInput 
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleInput={handleInput}
                    isRequired={false}
                    type="text"
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                />
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