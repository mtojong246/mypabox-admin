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
import TextEditorInput from "../../../../components/Form/InputTypes/TextEditorInput";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
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
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'School Phone Numbers',
        name: 'school_phone_number',
        type: 'array',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'School Campus Location',
        name: 'school_campus_location',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Start Month',
        name: 'school_start_month',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Class Capacity',
        name: 'school_class_capacity',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Duration (Full-time)',
        name: 'school_duration_full_time',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Duration (Part-time)',
        name: 'school_duration_part_time',
        type: 'text',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Rolling Admissions',
        name: 'school_rolling_admissions',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Non-Rolling Admissions',
        name: 'school_nonrolling_admissions',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Pre-PA Curriculum',
        name: 'school_pre_pa_curriculum',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Direct High School Entry',
        name: 'school_direct_high_school_entry',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Part-time Options',
        name: 'school_part_time_option',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Online Learning',
        name: 'school_online_learning',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'On-Campus Housing',
        name: 'school_on_campus_housing',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Cadaver Lab',
        name: 'school_cadaver_lab',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Faith-Based Learning',
        name: 'school_faith_based_learning',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Military Personnel Preference',
        name: 'school_military_personnel_preference',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'Holistic Review',
        name: 'school_holistic_review',
        type: 'boolean',
        path: '.input',
        notePath: '.notes',
    },
    {
        label: 'General Information',
        name: 'school_general_information',
        type: 'text-area',
        path: '.input',
    },
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
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    const handleQuill = (e: any, name: string, path: string) => {
        const value = e;

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
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

    const handleSelect = (e: any, name: string, path: string) => {
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
                        {field.type === 'text' ? (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                            />
                        ) : field.type === 'boolean' ? (
                            <BooleanInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleCheck={handleBoolean}
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
                                handleSelect={handleSelect}
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
                                            handleSelect={handleSelect}
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
                                            handleInput={handleInput}
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
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
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
                        {field.type === 'text' ? (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                            />
                        ) : field.type === 'boolean' ? (
                            <BooleanInput 
                                label={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                            />
                        ) : field.type === 'select' ? (
                            <SelectInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleSelect={handleSelect}
                                isRequired={false}
                                isCreatable={false}
                                options={field.name === 'school_country' ? countryNames : stateNames}
                            />
                        ) : field.type === 'array' ? (
                            <>
                            {(draftValue as any[]).length > 0 && (draftValue as any[]).map((val,i) => {
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
                                            value={selectInput.originalDraftValue}
                                            path={selectPath}
                                            handleSelect={handleSelect}
                                            options={[{value: 'Main', label: 'Main'}]}
                                            isRequired={false}
                                            isCreatable={true}
                                        />
                                        <TextInput 
                                            label={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                            placeholder={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                            name={field.name}
                                            value={textInput.originalDraftValue}
                                            path={inputPath}
                                            handleInput={handleInput}
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
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
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