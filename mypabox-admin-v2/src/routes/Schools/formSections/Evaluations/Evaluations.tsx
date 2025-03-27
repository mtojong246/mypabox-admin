import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import Button from "../../../../components/Buttons/Button";
import Notes from "../../../../components/Form/Notes/Notes";
import useVerification from "../../../../hooks/useVerification";
import { ReactComponent as PlusIcon } from '../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../components/Icons/Trash.svg';
import TextSelectInput from "../../../../components/Form/InputTypes/TextSelectInput";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";


const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const evaluationsFields = [
    {
        label: 'Evaluations Required',
        name: 'school_evaluations_required',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Evaluations Required',
                name: 'school_evaluations_required',
                type: 'boolean',
            },
            {
                label: 'Minimum Number of Evaluations Required',
                name: 'school_minimum_number_of_evaluations_required',
                type: 'text',
            },
            {
                label: 'Required Evaluator Title',
                name: 'school_required_evaluator_title',
                type: 'array',
            },
            {
                label: 'Minimum Time Evaluator Knows Applicant',
                name: 'school_minimum_time_evaluator_knows_applicant',
                type: 'text-select',
            },
            {
                label: 'Optional Evaluators Required',
                name: 'school_optional_evaluators_required',
                type: 'array',
            }
        ],
    },
    {
        label: 'Evaluations Recommended',
        name: 'school_evaluations_recommended',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Evaluations Recommended',
                name: 'school_evaluations_recommended',
                type: 'boolean',
            },
            {
                label: 'Minimum Number of Evaluations Recommended',
                name: 'school_minimum_number_of_evaluations_recommended',
                type: 'text',
            },
            {
                label: 'Recommended Evaluator Title',
                name: 'school_recommended_evaluator_title',
                type: 'array',
            },
            {
                label: 'Minimum Time Evaluator Knows Applicant',
                name: 'school_minimum_time_evaluator_knows_applicant',
                type: 'text-select',
            },
            {
                label: 'Optional Evaluators Recommended',
                name: 'school_optional_evaluators_recommended',
                type: 'array',
            }
        ]
    }
]

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


export default function Evaluations({
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

    const handleDuration = (name: string, path: string, value: string | number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    }

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
                school_minimum_time_evaluator_knows_applicant: checked ? '' : null,
                school_optional_evaluators_required: checked ? [] : null,
            }

        } else if (name === 'school_evaluations_recommended') {
            inputPath = '.input';
            value = {
                school_evaluations_recommended: checked,
                school_minimum_number_of_evaluations_recommended: checked ? 0 : null,
                school_recommended_evaluator_title: checked ? [] : null,
                school_minimum_time_evaluator_knows_applicant: checked ? '' : null,
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
        } = handleModify(inputPath, field, value);
        
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
                        school_minimum_time_evaluator_knows_applicant: '',
                    }
                } else {
                    value = {
                        school_minimum_number_evaluators_recommended_in_group: 0,
                        school_recommended_optional_group_evaluator_title: [],
                        school_minimum_time_evaluator_knows_applicant: '',
                    }
                }
        }

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleAddition(path, field, value);

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemove = (e:any, name: string, path: string, index: number) => {
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
        {evaluationsFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;  
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
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            ) : associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                />
                                            
                                            ) : associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={originalInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
                                                />
                                            ) : associatedField.type === 'array' ? (
                                                <div className="w-full flex flex-col justify-start items-start gap-2">
                                                    <label className="font-medium">{associatedField.label}</label>
                                                    <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                    {(originalInput as any[]).length > 0 && (originalInput as any[]).map((val,i) => {
                                                        if (associatedField.label.includes('Title')) {
                                                            const arrayInputPath = `${inputPath}.${i}.value`
                                                            const textInput = handleRetrieveValue(arrayInputPath, schoolField);

                                                            return (
                                                                <div className="w-full flex gap-4">
                                                                    <SelectInput 
                                                                        label="Title"
                                                                        placeholder="Title"
                                                                        name={field.name}
                                                                        value={{value: textInput.originalValue, label: textInput.originalValue}}
                                                                        path={arrayInputPath}
                                                                        handleSelect={handleSelect}
                                                                        isRequired={false}
                                                                        isCreatable={false}
                                                                        options={evaluatorOptions}
                                                                    />
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
                                                            return (
                                                                <></>
                                                            )
                                                        }                      
                                                    })}
                                                    <Button 
                                                        type="primary"
                                                        styling="outline"
                                                        label={`Add ${associatedField.label.includes('Title') ? 'Title' : 'Option'}`}
                                                        action={(e:any) => handleAdd(e, field.name, inputPath)}
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
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            ) : associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                />
                                            
                                            ) : associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={draftInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
                                                />
                                            ) : associatedField.type === 'array' ? (
                                                <div className="w-full flex flex-col justify-start items-start gap-2">
                                                    <label className="font-medium">{associatedField.label}</label>
                                                    <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                    {(draftInput as any[]).length > 0 && (draftInput as any[]).map((val,i) => {
                                                        if (associatedField.label.includes('Title')) {
                                                            const arrayInputPath = `${inputPath}.${i}.value`
                                                            const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                            return (
                                                                <div className="w-full flex gap-4">
                                                                    <SelectInput 
                                                                        label="Title"
                                                                        placeholder="Title"
                                                                        name={field.name}
                                                                        value={{value: textInput.originalDraftValue, label: textInput.originalDraftValue}}
                                                                        path={arrayInputPath}
                                                                        handleSelect={handleSelect}
                                                                        isRequired={false}
                                                                        isCreatable={false}
                                                                        options={evaluatorOptions}
                                                                    />
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
                                                            return (
                                                                <></>
                                                            )
                                                        }                      
                                                    })}
                                                    <Button 
                                                        type="primary"
                                                        styling="outline"
                                                        label={`Add ${associatedField.label.includes('Title') ? 'Title' : 'Option'}`}
                                                        action={(e:any) => handleAdd(e, field.name, inputPath)}
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