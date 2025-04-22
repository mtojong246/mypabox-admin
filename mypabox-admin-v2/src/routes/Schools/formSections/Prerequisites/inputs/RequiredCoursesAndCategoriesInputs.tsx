import { useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as EditIcon } from '../../../../../components/Icons/Edit-With-Line.svg';

import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import RequiredCoursesField from "../arrayFields/RequiredCourses";
import RequiredOptionalCoursesField from "../arrayFields/RequiredOptionalCoursesField";
import RequiredCourseCategoriesField from "../arrayFields/RequiredCourseCategoriesField";


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
    togglePopup,
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
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void
}) {
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

    const handleRemove = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleModification(path, field, '', 'remove', index);

        handleChanges(field, name, originalField, draftField, path, 'removed');

    };

    const checkIfValueHasBeenRemoved = (path: string) => {
        const change = schoolField.changes.find(change => change.path === path);

        if (change && change.type === 'removed') {
            return true;
        } else {
            return false;
        }
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
                                    <div className="w-full flex flex-col gap-4 justify-start items-start">
                                        <label className="text-default">{associatedField.label}:</label>
                                        <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                            {(inputValue as any[]).length > 0 && (inputValue as any[]).map((val, i) => {
                                                const arrayInputPath = `${inputPath}.${i}`;
                                                const change = schoolField.changes.find(change => change.path === arrayInputPath);

                                                const toBeRemoved = checkIfValueHasBeenRemoved(arrayInputPath);

                                                return (
                                                    <div className="w-full flex justify-between items-start gap-6">
                                                        <div className="grow flex justify-start items-start gap-2">
                                                            {associatedField.name === 'school_prereq_required_courses' ? (
                                                                <RequiredCoursesField 
                                                                    value={val}
                                                                    toBeRemoved={toBeRemoved}
                                                                    tab={tab}
                                                                />
                                                            ) : associatedField.name === 'school_prereq_required_optional_courses' ? (
                                                                <RequiredOptionalCoursesField 
                                                                    value={val}
                                                                    toBeRemoved={toBeRemoved}
                                                                    tab={tab}
                                                                />
                                                            ) : (
                                                                <RequiredCourseCategoriesField 
                                                                    value={val} 
                                                                    toBeRemoved={toBeRemoved}
                                                                    tab={tab}
                                                                />
                                                            )}
                                                            
                                                            {change && (
                                                                <ChangePopup 
                                                                    change={change}
                                                                    name={field.name}
                                                                    validateIndividualChange={validateIndividualChange}
                                                                    revertIndividualChange={revertIndividualChange}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <button 
                                                                onClick={(e:any) => togglePopup(
                                                                    e, 
                                                                    associatedField.name === 'school_prereq_required_courses' ? 'required-courses' : associatedField.name === 'school_prereq_required_optional_courses' ? 'optional-courses' : 'course-categories',
                                                                    { name: field.name, path: inputPath, index: i }, 
                                                                    val
                                                                )} 
                                                                className="w-[24px] text-primary"
                                                            >   
                                                                <EditIcon/>
                                                            </button>
                                                            <button 
                                                                onClick={(e:any) => handleRemove(e, field.name, inputPath, i)} 
                                                                className="w-[24px] text-warning"
                                                            >
                                                                <DeleteIcon/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )

                                            })}
                                           <Button 
                                                type={isDisabled ? 'disable' : 'primary'}
                                                styling="outline"
                                                label={`Add ${associatedField.name === 'school_prereq_required_courses' ? 'Required Course' : associatedField.name === 'school_prereq_required_optional_courses' ? 'Required Optional Course' : 'Required Course Category'}`}
                                                action={(e:any) => togglePopup(
                                                    e, 
                                                    associatedField.name === 'school_prereq_required_courses' ? 'required-courses' : associatedField.name === 'school_prereq_required_optional_courses' ? 'optional-courses' : 'course-categories',
                                                    {
                                                        name: field.name,
                                                        path: inputPath,
                                                    }
                                                )}
                                                adornment={<PlusIcon/>}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {associatedField.notePath && inputNotes !== undefined && (
                                    <Notes 
                                        label={associatedField.label}
                                        notes={inputNotes}
                                        field={{
                                            ...associatedField,
                                            name: field.name,
                                            path: '',
                                            notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                        }}
                                        tab={tab}
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
                    tab={tab}
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