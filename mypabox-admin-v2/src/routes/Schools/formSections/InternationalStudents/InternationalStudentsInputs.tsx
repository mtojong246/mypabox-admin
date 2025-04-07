import { ChangeEvent, useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import Notes from "../../../../components/Form/Notes/Notes";

export default function InternationalStudentsInputs({
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
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModification(path, field, value, 'modify');
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'boolean' ? (
                <BooleanInput 
                    label={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleCheck={handleBoolean}
                    isRequired={false}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                />
            ) : (
                <>
                </>
            )}
            {field.notePath && (
                <Notes 
                    notes={noteValue}
                    field={{
                        ...field,
                        notePath: field.notePath
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