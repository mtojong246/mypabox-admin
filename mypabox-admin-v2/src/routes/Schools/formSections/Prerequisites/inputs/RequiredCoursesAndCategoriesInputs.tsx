import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import RequiredOptionalCourses from "../arrayFields/RequiredOptionalCourses";
import RequiredCourses from "../arrayFields/RequiredCourses";
import RequiredCourseCategories from "../arrayFields/RequiredCourseCategories";

export default function RequiredCoursesAndCategoriesInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    noteValue,
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
            associatedFields: {
                label: string;
                name: string;
                type: string;
                path?: string;
                notePath?: string;
            }[],
        }[],
        notePath?: string;
    },
    noteValue: NewNote[],
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

                    let inputValue;
                    let inputNotes = [];

                    if (associatedFieldValue !== null) {
                        const inputPath = `${field.path}.${associatedField.name}${associatedField.path ? associatedField.path : ''}`;
                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                        if (tab === 'original') {
                            inputValue = associatedFieldInputs.originalValue;
                        } else {
                            inputValue = associatedFieldInputs.originalDraftValue;
                        }

                        if (associatedField.notePath !== undefined) {
                            const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                            const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                            if (tab === 'original') {
                                inputNotes = associatedFieldNotes.originalValue;
                            } else {
                                inputNotes = associatedFieldNotes.originalDraftValue;
                            }
                        }

                        return (
                            <>
                                {associatedField.type === 'array' ? (
                                    <>
                                    {(inputValue as any[]).length > 0 && (inputValue as any[]).map((val,i) => (
                                        <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                            <div className="w-full flex justify-between items-center gap-8">
                                                <p className="font-medium text-[18px]">{i+1} - {associatedField.label}</p>
                                                <Button 
                                                    type="warning"
                                                    styling="outline"
                                                    label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                                    action={(e:any) => handleRemove(e, field.name, inputPath, i)}
                                                    adornment={<MinusIcon/>}
                                                />
                                            </div>
                                            {associatedField.associatedFields.length > 0 && associatedField.associatedFields.map(nestedAssociatedField => {
                                                const arrayInputPath = `${inputPath}.${i}.${nestedAssociatedField.name}`;
                                                const arrayAssociatedPath = handleRetrieveValue(arrayInputPath, schoolField);
                                                let arrayInput: any = '';

                                                if (tab === 'original') {
                                                    arrayInput = arrayAssociatedPath.originalValue
                                                } else {
                                                    arrayInput = arrayAssociatedPath.originalDraftValue;
                                                }

                                                return (
                                                    <>
                                                    {associatedField.name === 'school_prereq_required_courses' ? (
                                                        <RequiredCourses />
                                                    ) : associatedField.name === 'school_prereq_required_optional_courses' ? (
                                                        <RequiredOptionalCourses />
                                                    ) : (
                                                        <RequiredCourseCategories />
                                                    )} 
                                                    </>
                                                )
                                            })}
                                        </div>
                                    ))}
                                    <Button 
                                        type="primary"
                                        styling="outline"
                                        label={`Add ${associatedField.name === 'school_prereq_required_courses' ? 'Required Course' : associatedField.name === 'school_prereq_required_optional_courses' ? 'Required Optional Course' : 'Required Course Category'}`}
                                        action={(e:any) => handleAdd(e, field.name, field.path)}
                                        adornment={<PlusIcon/>}
                                    />
                                    </>
                                ) : (
                                    <></>
                                )}
                                {associatedField.notePath && inputNotes !== undefined && (
                                    <Notes 
                                        notes={inputNotes}
                                        field={{
                                            ...associatedField,
                                            name: field.name,
                                            path: '',
                                            notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                        }}
                                        toggleNote={toggleNote}
                                        schoolField={schoolField}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        handleChanges={handleChanges}
                                        handleModification={handleModification}
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
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                        notePath: field.notePath,
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