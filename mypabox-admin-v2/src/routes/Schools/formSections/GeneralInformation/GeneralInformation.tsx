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
import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as EditIcon } from '../../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import ReactQuill from "react-quill";


// const permissions = {
//     canEditWithVerificationNeeded: true,
//     canEditWithoutVerificationNeeded: false,
//     canVerify: false,
//     canMakeLive: false,
//     canAddOrDelete: false,
// };

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

    const [ countryNames, setCountryNames ] = useState<{ value: string, label: string }[]>([]);
    const [ stateNames, setStateNames ] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name})))    
    }, []);


    const handleGenericInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        let original = field.original;
        let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }
        
        original[keys[keys.length - 1]] = value;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }
        
        draft[keys[keys.length - 1]] = value;

        setSchool({
            ...school,
            [name]: {
                ...field,
                original,
            }
        })
    };

    const handleGenericBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        let original = field.original;
        let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }
        
        original[keys[keys.length - 1]] = value;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }
        
        draft[keys[keys.length - 1]] = value;

        setSchool({
            ...school,
            [name]: {
                ...field,
                original,
            }
        })
    };

    const handleGenericSelect = (e: any, name: string, path: string) => {
        const value = e.value;

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        let original = field.original;
        let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }
        
        original[keys[keys.length - 1]] = value;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }
        
        draft[keys[keys.length - 1]] = value;

        setSchool({
            ...school,
            [name]: {
                ...field,
                original,
            }
        })

        if (name === 'school_country') {
            setStateNames(countries.filter(country => country.name === school.school_country.original.input)[0].states.map(state => ({ value: state.name, label: state.name })));
        }
    };






    return (
        <>
        {genericSchoolInfoFields.map(field => {
            let original = (school[field.name as keyof NewSchool] as GenericSchoolField).original;
            const keys = field.path.split('.').filter(key => key);
            for (let i = 0; i < keys.length - 1; i++) {
                if (!(keys[i] in field)) {
                    console.log('path invalid');
                }
                original = original[keys[i]];
            }

            const value = original[keys[keys.length - 1]];

            let noteValue: NewNote[] = [];

            if (field.notePath !== undefined) {
                let originalWithNotes = (school[field.name as keyof NewSchool] as GenericSchoolField).original;
                const keys = field.notePath.split('.').filter(key => key);
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!(keys[i] in field)) {
                        console.log('path invalid');
                    }
                    originalWithNotes = originalWithNotes[keys[i]];
                }

                noteValue = originalWithNotes[keys[keys.length - 1]];
            }

            return (
                <Container 
                    label={field.label} 
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
                                options={field.name === 'school_country' ? countryNames : stateNames}
                            />
                        ) : field.type === 'array' ? (
                            <>
                            
                            </>
                        ) : (
                            <></>
                        )}
                        {field.notePath && (
                            <div className="flex flex-col gap-4 justify-start items-start w-full">
                                <p className="text-default">Notes:</p>
                                {noteValue.length > 0 && noteValue.map((note,i) => (
                                    <div className="w-full flex justify-between items-start gap-6">
                                        <div className="grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline">
                                            <p className="text-primary text-[14px] font-medium">{note.type}</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                        <div className="flex gap-4">
                                            <button onClick={(e:any) => {toggleNote(e, { name: field.name, path: field.notePath, noteIndex: i })}} className="w-[24px] text-primary"><EditIcon/></button>
                                            <button onClick={(e:any) => {deleteNote(e, field.name, field.notePath, i)}} className="w-[24px] text-warning"><DeleteIcon/></button>
                                        </div>
                                    </div>
                                ))}
                                <Button 
                                    type='primary'
                                    styling="outline"
                                    label='Add Note'
                                    action={(e: any) => {toggleNote(e, { name: field.name, path: field.notePath })}}
                                    adornment={<PlusIcon/>}
                                />
                            </div>
                        )}
                        </div>
                    }
                />
            )
        })}
        {/* {genericSchoolInfoFields.map(field => (
            <Container 
                label={field.label} 
                originalInputs={
                    field.type === 'string' ? (
                        <TextInput 
                            label={field.label}
                            placeholder={field.label}
                            name={field.name}
                            value={(school[field.name as keyof NewSchool] as SchoolField).original.}
                        />
                    )
                }
            />
        ))} */}
        {/* <Container
            label="School Name"
            originalInputs={
                <TextInput 
                    label='School Name'
                    placeholder='Name'
                    name='school_name'
                    value={school.school_name.input.original}
                    handleInput={handleInput}
                    isRequired
                />
            }
            modifiedInputs={
                <TextInput 
                    label='School Name'
                    placeholder='Name'
                    name='school_name'
                    value={school.school_name.input.original}
                    handleInput={handleInput}
                    isRequired
                />
            }
        />
        <TextInput 
            label='School Name'
            placeholder='Name'
            name='school_name'
            value={school.school_name.input.original}
            handleInput={handleInput}
            isRequired
        /> */}
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