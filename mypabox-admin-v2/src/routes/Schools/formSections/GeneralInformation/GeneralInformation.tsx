import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";

import countries from '../../../../data/countries.json';
import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import Button from "../../../../components/Buttons/Button";
import Notes from "../../../../components/Form/Notes/Notes";
import useVerification from "../../../../hooks/useVerification";
import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';


const permissions = {
    canEditWithVerificationNeeded: false,
    canEditWithoutVerificationNeeded: false,
    canVerify: true,
    canMakeLive: false,
    canAddOrDelete: false,
};

const genericSchoolInfoFields = [
    {
        label: 'School Name',
        name: 'school_name',
        type: 'text',
        path: '.input',
    },
    {
        label: 'School Logo',
        name: 'school_logo',
        type: 'text',
        path: '.input',
    },
    {
        label: 'Street Address',
        name: 'school_street',
        type: 'text',
        path: '.input',
    },
    {
        label: 'City',
        name: 'school_city',
        type: 'text',
        path: '.input'
    },
    {
        label: 'Country',
        name: 'school_country',
        type: 'select',
        path: '.input',
    },
    {
        label: 'State',
        name: 'school_state',
        type: 'select',
        path: '.input',
    },
    {
        label: 'Zip Code',
        name: 'school_zip_code',
        type: 'text',
        path: '.input',
    },
    {
        label: 'Website',
        name: 'school_website',
        type: 'text',
        path: '.input',
    },
    {
        label: 'School Emails',
        name: 'school_email',
        type: 'array',
        path: '.input'
    },
    {
        label: 'School Phone Numbers',
        name: 'school_phone_number',
        type: 'array',
        path: '.input'
    },
    {
        label: 'School Campus Location',
        name: 'school_campus_location',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    }
]



export default function GeneralInformation({
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

    const [ countryNames, setCountryNames ] = useState<{ value: string, label: string }[]>([]);
    const [ stateNames, setStateNames ] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name})))    
    }, []);

    const handleGenericInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
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
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleGenericBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
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

    const handleGenericSelect = (e: any, name: string, path: string) => {
        const value = e.value;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
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
        } = handleAddition(path, field, value);

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemoveEmailOrPhone = (e:any, name: string, path: string, index: number) => {
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
        {genericSchoolInfoFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;

            let noteValue: NewNote[] = [];

            if (field.notePath !== undefined) {
                const notes = handleRetrieveValue(field.notePath, schoolField);
                noteValue = notes.originalValue;
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
                        {field.type === 'text' ? (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleInput={handleGenericInput}
                                isRequired={false}
                            />
                        ) : field.type === 'boolean' ? (
                            <BooleanInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleCheck={handleGenericBoolean}
                                isRequired={false}
                                isDisabled={false}
                            />
                        ) : field.type === 'select' ? (
                            <SelectInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleSelect={handleGenericSelect}
                                isRequired={false}
                                isCreatable={false}
                                options={field.name === 'school_country' ? countryNames : stateNames}
                            />
                        ) : field.type === 'array' ? (
                            <>
                            {(value as any[]).length > 0 && (value as any[]).map((val,i) => {
                                const selectPath = `${field.path}.${i}.category`;
                                const selectInput = handleRetrieveValue(selectPath, schoolField);

                                let inputPath = '';

                                if (field.name === 'school_email') {
                                    inputPath = `${field.path}.${i}.email`;
                                } else {
                                    inputPath = `${field.path}.${i}.number`;
                                }

                                const textInput = handleRetrieveValue(inputPath, schoolField);

                                return (
                                    <div className="w-full flex gap-4">
                                        <SelectInput 
                                            label="Category"
                                            placeholder="Category"
                                            name={field.name}
                                            value={selectInput.originalValue}
                                            path={selectPath}
                                            handleSelect={handleGenericSelect}
                                            options={[{value: 'Main', label: 'Main'}]}
                                            isRequired={false}
                                            isCreatable={true}
                                        />
                                        <TextInput 
                                            label={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                            placeholder={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                            name={field.name}
                                            value={textInput.originalValue}
                                            path={inputPath}
                                            handleInput={handleGenericInput}
                                            isRequired={false}
                                        />
                                        <div className="py-4 flex justify-center items-end">
                                            <button 
                                                onClick={(e:any) => handleRemoveEmailOrPhone(e, field.name, field.path, i)} 
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
                                action={(e:any) => handleAddEmailOrPhone(e, field.name, field.path)}
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