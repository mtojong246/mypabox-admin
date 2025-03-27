import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";

const schoolFields = [
    {
        label: 'Grade Criteria',
        name: 'school_grade_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Minimum Grade Required For All Courses',
                name: 'school_minimum_grade_required_for_all_courses',
                type: 'select',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Time Criteria',
        name: 'school_time_frame_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'All Courses Must Be Completed Within:',
                name: 'school_time_frame_all_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'All SCIENCE Courses Must Be Completed Within:',
                name: 'school_time_frame_science_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'All MATH Courses Must Be Completed Within:',
                name: 'school_time_frame_math_courses_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
    {
        label: 'Pass/Fail Criteria',
        name: 'school_pass_fail_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Pass/Fail Courses Accepted',
                name: 'school_pass_fail_grade_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'AP Criteria',
        name: 'school_ap_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'AP Courses Accepted',
                name: 'school_ap_courses_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Community College Criteria',
        name: 'school_community_college_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Community College Credits Accepted',
                name: 'school_community_college_credits_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'CLEP Criteria',
        name: 'school_clep_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'CLEP Credits Accepted',
                name: 'school_clep_credits_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
    {
        label: 'Online Courses Criteria',
        name: 'school_online_courses_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Online Courses Accepted',
                name: 'school_online_courses_accepted',
                type: 'boolean',
                path: undefined,
                notePath: undefined,
            },
        ],
    },
];

const options = [
    { value: '', label: 'Select' },
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
]

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

export default function MinimumGradeAndTimeCriteriaAndBoolean({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleChanges,
    toggleNote,
    deleteNote,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    isEditSchool: boolean,
    permissions: UserPermissions,
    handleRetrieveValue: (path: string, field: GenericSchoolField) => {
        originalValue: any,
        originalDraftValue: any,
    },
    handleModify: (path: string, field: GenericSchoolField, newValue: any) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    handleChanges: (
        field: GenericSchoolField, 
        name: string, 
        original: any, 
        draft: any, 
        path: string, 
        type: "modified" | "added" | "removed", 
        originalValue?: any, value?: any
    ) => void,
    toggleNote: (e: React.MouseEvent<HTMLButtonElement>, field?: {
        name: string;
        path: string;
        noteIndex?: number;
    }, note?: NewNote) => void,
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void
}) {

    const handleDuration = (name: string, path: string, value: string | number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    }

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

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
        {schoolFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    
            let noteValue: NewNote[] = [];
            let draftNoteValue: NewNote[] = [];

            if (field.notePath !== undefined) {
                const notes = handleRetrieveValue(field.notePath, schoolField);
                noteValue = notes.originalValue;
                draftNoteValue = notes.originalDraftValue;
            }  

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
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let originalInput;
                                let originalNotes = [];

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path ? associatedField.path : ''}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

                                    if (associatedField.notePath !== undefined) {
                                        const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                                        const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                                        originalNotes = associatedFieldNotes.originalValue;
                                    }


                                    return (
                                        <>
                                            {associatedField.type === 'select' ? (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: originalInput, label: originalInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={options}
                                                />
                                            ) : associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={originalInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {associatedField.notePath && originalNotes !== undefined && (
                                                <Notes 
                                                    notes={originalNotes}
                                                    field={{
                                                        ...associatedField,
                                                        name: field.name,
                                                        notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                                    }}
                                                    toggleNote={toggleNote}
                                                    deleteNote={deleteNote}
                                                />
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <></>
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={noteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                const associatedFieldPath = `${field.path}.${associatedField.name}`;
                                const associatedFieldObject = handleRetrieveValue(associatedFieldPath, schoolField);
                                let draftInput;
                                let draftNotes = [];

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path ? associatedField.path : ''}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    draftInput = associatedFieldInputs.originalDraftValue;

                                    if (associatedField.notePath !== undefined) {
                                        const notesPath = `${field.path}.${associatedField.name}${associatedField.notePath}`;
                                        const associatedFieldNotes = handleRetrieveValue(notesPath, schoolField);
                                        draftNotes = associatedFieldNotes.originalDraftValue;
                                    }


                                    return (
                                        <>
                                            {associatedField.type === 'select' ? (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: draftInput, label: draftInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={options}
                                                />
                                            ) : associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) :  associatedField.type === 'text-select' ? (
                                                <TextSelectInput 
                                                    label={associatedField.label}
                                                    placeholder="Quantity"
                                                    name={field.name}
                                                    value={draftInput}
                                                    inputPath={`${inputPath}.quantity`}
                                                    selectPath={`${inputPath}.units`}
                                                    handleChange={handleDuration}
                                                    options={unitOptions}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {associatedField.notePath && draftNotes !== undefined && (
                                                <Notes 
                                                    notes={draftNotes}
                                                    field={{
                                                        ...associatedField,
                                                        name: field.name,
                                                        notePath: `${field.path}.${associatedField.name}${associatedField.notePath}`,
                                                    }}
                                                    toggleNote={toggleNote}
                                                    deleteNote={deleteNote}
                                                />
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <></>
                        )}
                        {field.notePath && (
                            <Notes 
                                notes={draftNoteValue}
                                field={field}
                                toggleNote={toggleNote}
                                deleteNote={deleteNote}
                            />
                        )}
                        </div>
                    }
                />
            )
        })}
        </>
    )
}