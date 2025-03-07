import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { BasicBooleanInput, NewSchool, NoteInput } from "../../../../types/newSchools.types";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import Container from "../../../../components/Form/Validation/Container";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

export default function DegreeInformation({
    isEditSchool,
    school,
    setSchool,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const field = school[name as keyof NewSchool] as {
            input: BasicBooleanInput;
            notes: NoteInput;
            link: string;
        };
        setSchool({
            ...school,
            [name]: {
                ...field,
                input: {
                    ...field.input,
                    original: e.target.checked,
                    draft: e.target.checked,
                }
            }
        })
    } 

    const handleCheckWithModification = (e:ChangeEvent<HTMLInputElement>) => {
        
    }

    

    return (
        <>
        
        <Container 
            label="Dual-Degree Program"
            originalInputs={
                <BooleanInput 
                    label='Dual-Degree Program'
                    name='school_dual_degree_program'
                    value={school.school_dual_degree_program.input.original}
                    isRequired={false}
                    handleCheck={handleCheck}
                    isDisabled={false}
                />
            }
        />
        
        
        </>
    )
}