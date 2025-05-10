import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types";
import Container from "../../../../components/Form/Validation/Container";
import useVerification from "../../../../hooks/useVerification";

import MissionStatementInputs from "./MissionStatementInputs";
import { UserPermissions } from "../../../../types/users.types";



const missionStatementFields = [
    {
        label: 'Mission Statement',
        name: 'school_mission_statement',
        type: 'text-area',
        path: '.input',
    },
]

export default function MissionStatement({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions
}) {
    const [ fields, setFields ] = useState<{
        label: string,
        name: string,
        type: string,
        path: string,
    }[]>(missionStatementFields);
    

    const {
        handleChanges,
        handleRetrieveValue,
        handleModification,
        revertIndividualChange,
        validateIndividualChange
    } = useVerification({ school, setSchool, isEditSchool, permissions });
    

    useEffect(() => {
        if (!showChangesOnly) {
            setFields(missionStatementFields)
        } else {
            let changedFields: {
                label: string;
                name: string;
                type: string;
                path: string;
            }[] = [];
            missionStatementFields.forEach(f => {
                const schoolField = school[f.name as keyof NewSchool] as GenericSchoolField;
                if (schoolField.changes.length > 0) {
                    changedFields.push(f);
                }
            })
            setFields(changedFields)
        }
    }, [school, showChangesOnly]);
    

    return (
        <>
        {fields.length > 0 && fields.map(field => {
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
                        <MissionStatementInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            
                        />
                    }
                    modifiedInputs={
                        <MissionStatementInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            handleChanges={handleChanges}
                            handleModification={handleModification}
                            revertIndividualChange={revertIndividualChange}
                            validateIndividualChange={validateIndividualChange}
                        />
                    }
                />
            )
        })}
        </>
    )
}