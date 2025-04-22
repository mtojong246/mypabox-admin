import { useEffect, useState } from "react";
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../types/newSchools.types";
import { UserPermissions } from "../../../../types/users.types";
import SelectInput from "../../../../components/Form/InputTypes/SelectInput";
import Notes from "../../../../components/Form/Notes/Notes";

const accreditationStatusOptions = [
    { label: 'Select', value: ''},
    { label: 'Provisional', value: 'Provisional'},
    { label: 'Continued', value: 'Continued'},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program'},
    { label: 'Probation', value: 'Probation'},
    { label: 'Administrative Probation', value: 'Administrative Probation'},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld'},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn'},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status'},
    { label: 'Developing - Not Accredited', value: 'Developing - Not Accredited'},
  ]

export default function AccreditationStatusInputs({
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

    

    return (
        <div className="flex flex-col gap-8 justify-start items-start">
            {field.type === 'select' ? (
                <SelectInput 
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    value={{value, label: value}}
                    path={field.path}
                    handleSelect={handleSelect}
                    isRequired={false}
                    isCreatable={false}
                    options={accreditationStatusOptions}
                    isDisabled={isDisabled}
                    change={schoolField.changes.find(change => change.path === field.path)}
                    validateIndividualChange={validateIndividualChange}
                    revertIndividualChange={revertIndividualChange}
                    permissions={permissions}
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
                    permissions={permissions}
                />
            )}
            </div>
    )
}