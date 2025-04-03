import { Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types";
import Container from "../../../../components/Form/Validation/Container";
import useVerification from "../../../../hooks/useVerification";

import PreferenceInputs from "./PreferenceInputs";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};


const preferenceFields = [
    {
        label: 'Preference',
        name: 'school_preference',
        type: 'text-area',
        path: '.input',
    },
]

export default function Preference({
    isEditSchool,
    school,
    setSchool,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {
    

    const {
        handleChanges,
        handleRetrieveValue,
        handleModification,
        revertIndividualChange,
        validateIndividualChange
    } = useVerification({ school, setSchool, isEditSchool, permissions });
    

    

    return (
        <>
        {preferenceFields.map(field => {
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
                        <PreferenceInputs 
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
                        <PreferenceInputs 
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