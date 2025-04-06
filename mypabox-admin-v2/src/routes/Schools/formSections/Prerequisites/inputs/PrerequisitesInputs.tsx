import { useEffect, useState } from "react";
import { Change, GenericSchoolField, NewSchool } from "../../../../../types/newSchools.types";
import { UserPermissions } from "../../../../../types/users.types";
import TextEditorInput from "../../../../../components/Form/InputTypes/TextEditorInput";

export default function PrerequisitesInputs({
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
    
}) {
    const [ isDisabled, setIsDisabled ] = useState(false);

    useEffect(() => {
        if (tab === 'original' && isEditSchool && (permissions.canEditWithVerificationNeeded || (schoolField.changes.length > 0 && permissions.canVerify))) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [isEditSchool, permissions, schoolField, tab]);

    const handleQuill = (e: any, name: string, path: string) => {
        const value = e;

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
            {field.type === 'text-area' ? (
                <TextEditorInput 
                    label={field.label}
                    name={field.name}
                    value={value}
                    path={field.path}
                    handleQuill={handleQuill}
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
        </div>
    )
}