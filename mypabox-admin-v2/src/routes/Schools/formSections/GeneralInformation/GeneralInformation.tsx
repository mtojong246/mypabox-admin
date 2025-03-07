import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { BasicBooleanInput, BasicNumberInput, BasicStringInput, NewSchool } from "../../../../types/newSchools.types"
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

const generalInfoLabels = [
    { label: 'School Name', value: 'school_name' },
    { label: 'School Logo', value: 'school_logo' },
    { label: 'Street Address', value: 'school_street' },
    { label: 'City', value: 'school_city' },
    { label: 'Country', value: 'school_country' },
    { label: 'State', value: 'school_state' },
    { label: 'Zip Code', value: 'school_zip_code' },
    { label: 'Website Link', value: 'school_website' },
    { label: 'School Email', value: 'school_email' },
    { label: 'School Phone Number', value: 'school_phone_number' },
    { label: 'Campus Location', value: 'school_campus_location' },
    { label: 'Start Month', value: 'school_start_month' },
    { label: 'Class Capacity', value: 'school_class_capacity' },
    { label: 'Duration (Full-time)', value: 'school_duration_full_time' },
    { label: 'Duration (Part-time)', value: 'school_duration_part_time' },
    { label: 'Rolling Admissions', value: 'school_rolling_admissions' },
    { label: 'Non-rolling Admissions', value: 'school_nonrolling_admissions' },
    { label: 'Pre-PA Curriculum', value: 'school_pre_pa_curriculum' },
    { label: 'Direct High School Entry', value: 'school_direct_high_school_entry' },
    { label: 'Part-time Option', value: 'school_part_time_option' },
    { label: 'Online Learning', value: 'school_online_learning' },
    { label: 'On-Campus Housing', value: 'school_on_campus_housing' },
    { label: 'Cadaver Lab', value: 'school_cadaver_lab' },
    { label: 'Faith-Based Learning', value: 'school_faith_based_learning' },
    { label: 'Military Personnel Preference', value: 'school_military_personnel_preference' },
    { label: 'Holistic Review', value: 'school_holistic_review' },
    { label: 'General Information Notes', value: 'school_general_information' },
]

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