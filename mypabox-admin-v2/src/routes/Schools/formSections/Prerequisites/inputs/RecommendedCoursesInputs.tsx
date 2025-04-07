import { useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as EditIcon } from '../../../../../components/Icons/Edit-With-Line.svg';

import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { RecommendedCourseType } from "../popups/RecommendedCoursePopup";
import { CourseForm } from "../popups/CoursePopup";
import Course from "../arrayFields/Course";

export default function RecommendedCoursesInputs({
    tab,
    permissions,
    isEditSchool,
    school,
    schoolField,
    field,
    value,
    noteValue,
    handleChanges,
    handleModification,
    validateIndividualChange,
    revertIndividualChange,
    toggleNote,
    checkIfValueHasBeenRemoved,
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
        notePath?: string;
    },
    value: any,
    noteValue: NewNote[],
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
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

        const inputPath = `${path}.${index}`;

        handleChanges(field, name, originalField, draftField, inputPath, 'removed');

    }

    return (
        <div className="flex flex-col gap-8 justify-start items-start">
        {field.type === 'array' ? (
            <div className="w-full flex flex-col gap-4 justify-start items-start">
                <label className="text-default">{field.label}:</label>
                {(value as any[]).length > 0 && (value as any[]).map((val,i) => {
                    const inputPath = `${field.path}.${i}`;
                    const change = schoolField.changes.find(change => change.path === inputPath);

                    const inputValue = val as RecommendedCourseType;
                    const course: CourseForm = {
                        course_id: inputValue.school_recommended_course_id,
                        course_lab: inputValue.school_recommended_course_lab,
                        course_lab_preferred: inputValue.school_recommended_course_lab_preferred,
                        course_credit_hours: inputValue.school_recommended_course_credit_hours,
                        course_quarter_hours: inputValue.school_recommended_course_quarter_hours,
                        course_note_section: inputValue.school_recommended_course_note_section
                    }
                    
                    return (
                        <div className="w-full flex justify-between items-start gap-6">
                            <div className="grow flex justify-start items-start gap-2">
                                <Course 
                                    course={course}
                                />
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
                                    onClick={(e:any) => togglePopup(e, 'recommended-courses', { name: field.name, path: field.path, index: i }, val)} 
                                    className="w-[24px] text-primary"
                                >   
                                    <EditIcon/>
                                </button>
                                <button 
                                    onClick={(e:any) => handleRemove(e, field.name, field.path, i)} 
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
                    label={`Add Recommended Course`}
                    action={(e:any) => togglePopup(e, 'recommended-courses', {
                        name: field.name,
                        path: field.path,
                    })}
                    adornment={<PlusIcon/>}
                />
            </div>
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
                checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            />
        )}
        </div>
    )
}