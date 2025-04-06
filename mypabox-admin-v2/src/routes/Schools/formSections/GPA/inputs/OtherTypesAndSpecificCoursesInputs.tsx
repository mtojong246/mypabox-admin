import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../../app/selectors/courses.selectors";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import RadioInput from "../../../../../components/Form/InputTypes/RadioInput";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";

const gpaOptions = [
    { value: '', label: 'Select' },
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' },
]

export default function OtherTypesAndSpecificCoursesInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    value,
    handleChanges,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
    handleRetrieveValue,
    checkIfValueHasBeenRemoved
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
            path?: string;
            notePath?: string;
        }[],
        notePath?: string;
    },
    value: any,
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
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
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);

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
        } = handleModification(path, field, value, 'add');

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemove = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleModification(path, field, '', 'remove', index);

        handleChanges(field, name, originalField, draftField, path, 'removed');

    }

    return (
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
                        let inputValue: any = '';

                        if (tab === 'original') {
                            inputValue = associatedFieldInputs.originalValue
                        } else {
                            inputValue = associatedFieldInputs.originalDraftValue;
                        }

                        return (
                            <>
                                {associatedField.type === 'text' ? (
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
                                    />
                                ) : associatedField.type === 'radio' ? (
                                    <RadioInput 
                                        label={associatedField.label}
                                        name={field.name}
                                        value={inputValue}
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
                                        change={schoolField.changes.find(change => change.path === inputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        isDisabled={isDisabled}
                                    />
                                ) : associatedField.type === 'select' ? (
                                    <>
                                    {field.name === 'school_other_types_of_gpa_evaluated' ? (
                                        <SelectInput 
                                            label={associatedField.label}
                                            placeholder={associatedField.label}
                                            name={field.name}
                                            value={{ value: inputValue, label: inputValue }}
                                            path={inputPath}
                                            handleSelect={handleSelect}
                                            isRequired={false}
                                            isCreatable={true}
                                            options={gpaOptions}
                                            isDisabled={isDisabled}
                                            change={schoolField.changes.find(change => change.path === inputPath)}
                                            validateIndividualChange={validateIndividualChange}
                                            revertIndividualChange={revertIndividualChange}
                                        />
                                    ) : courseOptions.length > 0 ? (
                                        <SelectInput 
                                            label={associatedField.label}
                                            placeholder={associatedField.label}
                                            name={field.name}
                                            value={{ value: inputValue, label: courseOptions.find(option => option.value === inputValue)!.label }}
                                            path={inputPath}
                                            handleSelect={handleSelect}
                                            isRequired={false}
                                            isCreatable={false}
                                            options={courseOptions}
                                            isDisabled={isDisabled}
                                            change={schoolField.changes.find(change => change.path === inputPath)}
                                            validateIndividualChange={validateIndividualChange}
                                            revertIndividualChange={revertIndividualChange}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    
                                    </>
                                    
                                ) : associatedField.type === 'note' ? (
                                    <Notes 
                                        notes={inputValue}
                                        field={{
                                            ...associatedField,
                                            notePath: inputPath,
                                            name: field.name,
                                            path: '',
                                        }}
                                        toggleNote={toggleNote}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        handleChanges={handleChanges}
                                        handleModification={handleModification}
                                        checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
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
                type={isDisabled ? 'disable' : 'primary'}
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
    )
}