import { Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types";
import Container from "../../../../components/Form/Validation/Container";
import useVerification from "../../../../hooks/useVerification";

import TextEditorInput from "../../../../components/Form/InputTypes/TextEditorInput";

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
        handleModify,
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });
    

    const handleQuill = (e: any, name: string, path: string) => {
        const value = e;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };

    

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
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'text-area' ? (
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'text-area' ? (
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        </div>
                    }
                />
            )
        })}
        </>
    )
}