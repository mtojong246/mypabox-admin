import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { BasicNumberInput, BasicStringInput, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";

export default function GeneralInformation({
    school,
    setSchool,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        
        const inputObj = school[name as keyof NewSchool]['input' as keyof object] as BasicStringInput | BasicNumberInput;
        setSchool({
            ...school,
            [name]: {
                ...school[name as keyof NewSchool] as object,
                input: {
                    ...inputObj,
                    original: value,
                }
            }
        });
    }

    return (
        <>
        <Container
            label="School Name"
            originalInputs={
                <TextInput 
                    label='School Name'
                    placeholder='Name'
                    name='school_name'
                    value={school.school_name.input.original}
                    handleInput={handleInput}
                    isRequired
                />
            }
            modifiedInputs={
                <TextInput 
                    label='School Name'
                    placeholder='Name'
                    name='school_name'
                    value={school.school_name.input.original}
                    handleInput={handleInput}
                    isRequired
                />
            }
        />
        <TextInput 
            label='School Name'
            placeholder='Name'
            name='school_name'
            value={school.school_name.input.original}
            handleInput={handleInput}
            isRequired
        />
        </>
    )
}