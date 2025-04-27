import { ChangeEvent, useEffect, useState } from "react";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";
import TextEditorInput from "../../../../components/Form/InputTypes/TextEditorInput";
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../components/Form/Notes/Notes";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";

import countries from '../../../../data/countries.json';
import { UserPermissions } from "../../../../types/users.types";
import EmailAndPhoneNumberInputs from "./EmailAndPhoneNumberInputs";

export default function GeneralInformationInputs({
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
    checkIfValueHasBeenRemoved,
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
        originalDraftValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
    
}) {

    const [ countryNames, setCountryNames ] = useState<{ value: string, label: string }[]>([]);
    const [ stateNames, setStateNames ] = useState<{ value: string, label: string }[]>([]);
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

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name})))    
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            let countryValue = '';
            if (tab === 'original') {
                countryValue = school.school_country.original.input;
            } else {
                countryValue = school.school_country.draft.input;
            }

            if (countryValue) {
                const filteredCountries = countries.filter(country => country.name === countryValue);
                if (filteredCountries.length > 0) {
                    const states = filteredCountries[0].states;
                    setStateNames(states.map(state => ({ value: state.name, label: state.name })))
                }
            }
        }
    }, [school, tab]);


    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'school_phone_number') {
            value = e.target.value.replace(/(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/, '$1$2$3-$4$5$6-$7$8$9$10');
        } else {
            value = e.target.value;
        }

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleQuill = (e: any, name: string, path: string) => {
        const value = e;

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
        const value = e.target.checked;

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
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        if (name === 'school_country') {
            setStateNames(countries.filter(country => country.name === school.school_country.original.input)[0].states.map(state => ({ value: state.name, label: state.name })));
        }
    };

    const handleAddEmailOrPhone = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        if (name === 'school_email') {
            value = {
                category: 'Main',
                email: '',
            }
        } else {
            value = {
                category: 'Main',
                number: '',
            }
        };

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, value, 'add');

        const index = (originalDraftValue as any[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const handleRemoveEmailOrPhone = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleModification(path, field, '', 'remove', index);


        handleChanges(schoolField, name, originalField, draftField, `${path}.${index}`, 'removed');

    };


    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'text' ? (
                <div className="w-full flex justify-start items-start gap-4">
                    <TextInput 
                        label={field.label}
                        placeholder={field.label}
                        name={field.name}
                        value={value}
                        path={field.path}
                        handleInput={handleInput}
                        isRequired={false}
                        type="text"
                        link={field.name === 'school_website' ? value : undefined}
                        change={schoolField.changes.find(change => change.path === field.path)}
                        validateIndividualChange={validateIndividualChange}
                        revertIndividualChange={revertIndividualChange}
                        isDisabled={isDisabled}
                        permissions={permissions}
                    />
                    {field.name === 'school_logo' && value && (
                        <div className="h-[80px] aspect-square border border-outline rounded">
                            <img src={value} alt='school-logo' className="object-cover w-full"/>
                        </div>
                    )}
                </div>
            ) : field.type === 'boolean' ? (
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
                    permissions={permissions}
                />
            ) : field.type === 'select' ? (
                <SelectInput 
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    value={{value: value, label: value}}
                    path={field.path}
                    handleSelect={handleSelect}
                    isRequired={false}
                    isCreatable={false}
                    options={field.name === 'school_country' ? countryNames : stateNames}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    permissions={permissions}
                />
            ) : field.type === 'array' ? (
                <EmailAndPhoneNumberInputs 
                    tab={tab}
                    field={field}
                    handleRetrieveValue={handleRetrieveValue}
                    values={value}
                    schoolField={schoolField}
                    isDisabled={isDisabled}
                    handleInput={handleInput}
                    handleSelect={handleSelect}
                    handleAdd={handleAddEmailOrPhone}
                    handleRemove={handleRemoveEmailOrPhone}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    permissions={permissions}
                />
            ) : (
                <TextEditorInput 
                    label={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleQuill={handleQuill}
                    isRequired={false}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    permissions={permissions}
                />
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