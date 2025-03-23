import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";

const minimumGPAFields = [
    {
        label: 'Minimum GPA Required',
        name: 'school_minimum_gpa_required',
        type: 'object',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum GPA Required',
                name: 'school_minimum_gpa_required',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Overall GPA Required',
                name: 'school_minimum_overall_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Science GPA Required',
                name: 'school_minimum_science_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Prerequisite GPA Required',
                name: 'school_minimum_prerequisite_gpa_required',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
    {
        label: 'Minimum GPA Recommended',
        name: 'school_minimum_gpa_recommended',
        type: 'object',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum GPA Recommended',
                name: 'school_minimum_gpa_recommended',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Overall GPA Recommended',
                name: 'school_minimum_overall_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Science GPA Recommended',
                name: 'school_minimum_science_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Prerequisite GPA Recommended',
                name: 'school_minimum_prerequisite_gpa_recommended',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },

]

export default function MinimumRequiredOrRecommendedGPA({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleChanges,
    toggleNote,
    deleteNote,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
    },
    handleModify: (path: string, field: GenericSchoolField, newValue: any) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    handleChanges: (
        field: GenericSchoolField, 
        name: string, 
        original: any, 
        draft: any, 
        path: string, 
        type: "modified" | "added" | "removed", 
        originalValue?: any, value?: any
    ) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void
}) {

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

        if (name === 'school_minimum_gpa_required') {
            inputPath = '.input';
            value = {
                school_minimum_gpa_required: {
                    input: checked,
                },
                school_minimum_overall_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_science_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_prerequisite_gpa_required: checked ? {
                    input: 0,
                    notes: [],
                } : null,
            }

        } else if (name === 'school_minimum_gpa_recommended') {
            inputPath = '.input';
            value = {
                school_minimum_gpa_recommended: {
                    input: checked,
                },
                school_minimum_overall_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_science_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
                school_minimum_prerequisite_gpa_recommended: checked ? {
                    input: 0,
                    notes: [],
                } : null,
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


    return (
        <>
        {minimumGPAFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    

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
                                console.log(associatedFieldObject)
                                let originalInput;
                                let originalNotes = [];

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

                                    if (associatedField.notePath !== undefined) {
                                        const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                                        const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                                        originalNotes = associatedFieldNotes.originalValue;
                                    }

                                    return (
                                        <>
                                            {associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                />
                                            ) : associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={field.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={field.path}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {associatedField.notePath && originalNotes !== undefined && (
                                                <Notes 
                                                    notes={originalNotes}
                                                    field={associatedField}
                                                    toggleNote={toggleNote}
                                                    deleteNote={deleteNote}
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
                            <></>
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {/* {field.type === 'text' ? (
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
                        )} */}
                        </div>
                    }
                />
            )
        })}
        </>
    )
}