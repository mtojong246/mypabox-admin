import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import RadioInput from "../../../../../components/Form/InputTypes/RadioInput";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../../app/selectors/courses.selectors";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';


const arrayGPAFields = [
    {
        label: 'Other Types of GPA Evaluated',
        name: 'school_other_types_of_gpa_evaluated',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Type of GPA Evaluated',
                name: 'type_of_gpa_evaluated',
                type: 'select',
                path: '.input',
            },
            {
                label: 'GPA Required or Recommended',
                name: 'gpa_value_required_or_recommended',
                type: 'radio',
                path: '.input',
            },
            {
                label: 'Minimum GPA Value Needed',
                name: 'minimum_gpa_value_needed',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum Number of Credits Evaluated',
                name: 'minimum_number_of_credits_evaluated',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
                path: '',
            }
        ],
    },
    {
        label: 'Minimum GPA for Specific Courses',
        name: 'school_minimum_gpa_for_specific_course',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Course Name',
                name: 'courseID',
                type: 'select',
                path: '.input',
            },
            {
                label: 'Minimum GPA Required',
                name: 'minimum_gpa_required_for_course',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
                path: '',
            }
        ],
    },

];

const gpaOptions = [
    { value: '', label: 'Select' },
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' },
]

export default function OtherTypesAndSpecificCourses({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleAddition,
    handleDeletion,
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
    handleAddition: (path: string, field: GenericSchoolField, newValue: any) => {
        originalField: any;
        draftField: any;
    },
    handleDeletion: (path: string, field: GenericSchoolField, index: number) => {
        originalField: any;
        draftField: any;
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
    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        const options = courses.map(course => (
            { value: course.unique_id, label: course.course_name }
        ))
        setCourseOptions([{value: '', label: 'Select'}].concat(options))
    }, [courses]);

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

    const handleAdd = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        if (name === 'school_other_types_of_gpa_evaluated') {
            value = {
                gpa_value_required_or_recommended: {
                    input: 'required',
                },
                minimum_gpa_value_needed: {
                    input: 0,
                },
                minimum_number_of_credits_evaluated: {
                    input: 0,
                },
                type_of_gpa_evaluated: {
                    input: '',
                },
                notes: [],
            }
        } else {
            value = {
                minimum_gpa_required_for_course: {
                    input: 0,
                },
                courseID: {
                    input: '',
                },
                notes: [],
            }
        };

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
        {arrayGPAFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

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
                        {field.type === 'array' ? (
                            <>
                            {(value as any[]).length > 0 && (value as any[]).map((val,i) => (
                                <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                    <div className="w-full flex justify-between items-center gap-8">
                                        <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                                        <Button 
                                            type="warning"
                                            styling="outline"
                                            label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                            action={(e:any) => handleRemove(e, field.name, field.path, i)}
                                            adornment={<MinusIcon/>}
                                        />
                                    </div>
                                    {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                        const inputPath = `${field.path}.${i}.${associatedField.name}${associatedField.path}`;
                                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                        const originalInput = associatedFieldInputs.originalValue;

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
                                                ) : associatedField.type === 'radio' ? (
                                                    <RadioInput 
                                                        label={associatedField.label}
                                                        name={field.name}
                                                        value={originalInput}
                                                        path={inputPath}
                                                        handleInput={handleInput}
                                                        isRequired={false}
                                                        options={[
                                                            {
                                                                label: 'Required',
                                                                value: 'required',
                                                            },
                                                            {
                                                                label: 'Recommended',
                                                                value: 'recommended',
                                                            }
                                                        ]}
                                                    />
                                                ) : associatedField.type === 'select' ? (
                                                    <>
                                                    {field.name === 'school_other_types_of_gpa_evaluated' ? (
                                                        <SelectInput 
                                                            label={associatedField.label}
                                                            placeholder={associatedField.label}
                                                            name={field.name}
                                                            value={{ value: originalInput, label: originalInput }}
                                                            path={inputPath}
                                                            handleSelect={handleSelect}
                                                            isRequired={false}
                                                            isCreatable={true}
                                                            options={gpaOptions}
                                                        />
                                                    ) : courseOptions.length > 0 ? (
                                                        <SelectInput 
                                                            label={associatedField.label}
                                                            placeholder={associatedField.label}
                                                            name={field.name}
                                                            value={{ value: originalInput, label: courseOptions.find(option => option.value === originalInput)!.label }}
                                                            path={inputPath}
                                                            handleSelect={handleSelect}
                                                            isRequired={false}
                                                            isCreatable={false}
                                                            options={courseOptions}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                    
                                                    </>
                                                    
                                                ) : associatedField.type === 'note' ? (
                                                    <Notes 
                                                        notes={originalInput}
                                                        field={{
                                                            ...associatedField,
                                                            notePath: inputPath,
                                                            name: field.name,
                                                        }}
                                                        toggleNote={toggleNote}
                                                        deleteNote={deleteNote}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                            ))}
                            <Button 
                                type="primary"
                                styling="outline"
                                label={`Add ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                action={(e:any) => handleAdd(e, field.name, field.path)}
                                adornment={<PlusIcon/>}
                            />
                            </>
                        ) : (
                            <></>
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'array' ? (
                            <>
                            {(draftValue as any[]).length > 0 && (draftValue as any[]).map((val,i) => (
                                <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                    <div className="w-full flex justify-between items-center gap-8">
                                        <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                                        <Button 
                                            type="warning"
                                            styling="outline"
                                            label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course Minimum GPA'}`}
                                            action={(e:any) => handleRemove(e, field.name, field.path, i)}
                                            adornment={<MinusIcon/>}
                                        />
                                    </div>
                                    {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                        const inputPath = `${field.path}.${i}.${associatedField.name}${associatedField.path}`;
                                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                        const draftInput = associatedFieldInputs.originalDraftValue;

                                        return (
                                            <>
                                                {associatedField.type === 'text' ? (
                                                    <TextInput 
                                                        label={associatedField.label}
                                                        placeholder={associatedField.label}
                                                        name={field.name}
                                                        value={draftInput}
                                                        path={inputPath}
                                                        handleInput={handleInput}
                                                        isRequired={false}
                                                    />
                                                ) : associatedField.type === 'radio' ? (
                                                    <RadioInput 
                                                        label={associatedField.label}
                                                        name={field.name}
                                                        value={draftInput}
                                                        path={inputPath}
                                                        handleInput={handleInput}
                                                        isRequired={false}
                                                        options={[
                                                            {
                                                                label: 'Required',
                                                                value: 'required',
                                                            },
                                                            {
                                                                label: 'Recommended',
                                                                value: 'recommended',
                                                            }
                                                        ]}
                                                    />
                                                ) : associatedField.type === 'select' ? (
                                                    <>
                                                    {field.name === 'school_other_types_of_gpa_evaluated' ? (
                                                        <SelectInput 
                                                            label={associatedField.label}
                                                            placeholder={associatedField.label}
                                                            name={field.name}
                                                            value={{ value: draftInput, label: draftInput }}
                                                            path={inputPath}
                                                            handleSelect={handleSelect}
                                                            isRequired={false}
                                                            isCreatable={true}
                                                            options={gpaOptions}
                                                        />
                                                    ) : courseOptions.length > 0 ? (
                                                        <SelectInput 
                                                            label={associatedField.label}
                                                            placeholder={associatedField.label}
                                                            name={field.name}
                                                            value={{ value: draftInput, label: courseOptions.find(option => option.value === draftInput)!.label }}
                                                            path={inputPath}
                                                            handleSelect={handleSelect}
                                                            isRequired={false}
                                                            isCreatable={false}
                                                            options={courseOptions}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                    
                                                    </>
                                                ) : associatedField.type === 'note' ? (
                                                    <Notes 
                                                        notes={draftInput}
                                                        field={{
                                                            ...associatedField,
                                                            notePath: inputPath,
                                                            name: field.name,
                                                        }}
                                                        toggleNote={toggleNote}
                                                        deleteNote={deleteNote}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                            ))}
                            </>
                        ) : (
                            <></>
                        )}
                        </div>
                    }
                />
            )
        })}
        </>
    )
}