import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { BasicBooleanInput, BasicNumberInput, BasicStringInput, Change, NewSchool } from "../../../../types/newSchools.types"
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import Container from "../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

const genericSchoolInfoFields = [
    {
        label: 'School Name',
        name: 'school_name',
        type: 'string',
        path: '.input',
    },
    {
        label: 'School Logo',
        name: 'school_logo',
        type: 'string',
        path: '.input',
    },
    {
        label: 'Street Address',
        name: 'school_street',
        type: 'string',
        path: '.input',
    },
]

interface SchoolField {
    original: any,
    draft: any,
    changes: Change[],
}

export default function GeneralInformation({
    isEditSchool,
    school,
    setSchool,
}: {
    isEditSchool: boolean,
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

    const handleGenericInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        let field = school[name as keyof NewSchool] as SchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        let original = field.original;
        // let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }
        
        original[keys[keys.length - 1]] = value;

        setSchool({
            ...school,
            [name]: {
                ...field,
                original,
            }
        })
    }

    const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const inputObj = school[name as keyof NewSchool]['input' as keyof object] as BasicBooleanInput;
        setSchool({
            ...school,
            [name]: {
                ...school[name as keyof NewSchool] as object,
                input: {
                    ...inputObj,
                    original: e.target.checked,
                }
            }
        })

    } 

    console.log(school)


    return (
        <>
        {/* <input onChange={(e: any) => handleGenericInput(e, '.input')} name='school_name' /> */}
        {genericSchoolInfoFields.map(field => {
            let original = (school[field.name as keyof NewSchool] as SchoolField).original;
            const keys = field.path.split('.').filter(key => key);
            for (let i = 0; i < keys.length - 1; i++) {
                if (!(keys[i] in field)) {
                    console.log('path invalid');
                }
                original = original[keys[i]];
            }

            const value = original[keys[keys.length - 1]];

            return (
                <Container 
                    label={field.label} 
                    originalInputs={
                        field.type === 'string' ? (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleInput={handleGenericInput}
                                isRequired={false}
                            />
                        ) : (
                            <></>
                        )
                    }
                />
            )
        })}
        {/* {genericSchoolInfoFields.map(field => (
            <Container 
                label={field.label} 
                originalInputs={
                    field.type === 'string' ? (
                        <TextInput 
                            label={field.label}
                            placeholder={field.label}
                            name={field.name}
                            value={(school[field.name as keyof NewSchool] as SchoolField).original.}
                        />
                    )
                }
            />
        ))} */}
        {/* <Container
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
        /> */}
        </>
    )
}