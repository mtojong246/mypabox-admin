import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import Notes from "../../../../components/Form/Notes/Notes";
import useVerification from "../../../../hooks/useVerification";
import { ReactComponent as DollarIcon } from '../../../../components/Icons/Dollar-Sign.svg';
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";
import { StylesConfig } from "react-select";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const applicationFields = [
    {
        label: 'Application Submitted On CASPA',
        name: 'school_application_submitted_on_caspa',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Application Submitted On CASPA',
                name: 'school_application_submitted_on_caspa',
                type: 'boolean',
            },
            {
                label: 'Application Submission Deadline',
                name: 'school_caspa_application_deadline_date',
                type: 'text-date',
            },
            {
                label: 'Application Submission Deadline Type',
                name: 'school_caspa_application_deadline_type',
                type: 'select',
            },
        ],
    },
    {
        label: 'Application Submitted Directly To School',
        name: 'school_application_submitted_directly_to_school',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Application Submitted Directly To School',
                name: 'school_application_submitted_directly_to_school',
                type: 'boolean',
            },
            {
                label: 'Application Submission Deadline ',
                name: 'school_application_direct_to_school_deadline',
                type: 'text-date',
            },
            {
                label: 'Application Submission Fee',
                name: 'school_application_direct_to_school_fee',
                type: 'text-fee',
            },
        ],
    },
    {
        label: 'Supplemental Application Required',
        name: 'school_supplemental_application_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Supplemental Application Required',
                name: 'school_supplemental_application_required',
                type: 'boolean',
            },
            {
                label: 'Supplemental Application Deadline',
                name: 'school_supplemental_application_deadline',
                type: 'text-date',
            },
            {
                label: 'Supplemental Application Submission Fee',
                name: 'school_supplemental_application_fee',
                type: 'text-fee',
            },
            {
                label: 'Supplemental Application Link',
                name: 'school_supplemental_application_link',
                type: 'text',
            },
            {
                label: 'Supplemental Application Link Provided With Invite Only',
                name: 'school_supplemental_application_link_provided_with_invite_only',
                type: 'boolean',
            },
        ],
    },
    
]

const options = [
    {value: 'Verified', label: 'Verified', color: '#27AE60', focus: '#27AE60'},
    {value: 'Completed', label: 'Completed', color: '#F39C12', focus: '#F39C12'},
    {value: 'Submitted', label: 'Submitted', color: '#3498DB', focus: '#3498DB'},
];


interface ColorOptions {value: string, label: string, color: string, focus: string}


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



export default function Applications({
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
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

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
        } = handleModify(inputPath, field, value);
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
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
    };


    return (
        <>
        {applicationFields.map(field => {
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
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let originalInput;

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

                                    return (
                                        <>
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type.includes('text') ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    startingAdornment={associatedField.type.includes('fee') ? <DollarIcon /> : undefined}
                                                />
                                            ) : (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: originalInput, label: originalInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={options}
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
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let draftInput;

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    draftInput = associatedFieldInputs.originalDraftValue;

                                    return (
                                        <>
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={field.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={field.path}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type.includes('text') ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    startingAdornment={associatedField.type.includes('fee') ? <DollarIcon /> : undefined}
                                                />
                                            ) : (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: draftInput, label: draftInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={options}
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
                                value={draftValue}
                                path={field.path}
                                handleInput={handleInput}
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