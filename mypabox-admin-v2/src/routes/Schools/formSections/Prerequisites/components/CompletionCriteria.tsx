import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";


const completionCriteriaFields = [
    {
        label: 'Completion Conditions',
        name: 'school_prerequisite_completion_criteria',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'All Courses Must Be Completed Before Applying',
                name: 'school_all_courses_most_be_completed_before_applying',
                type: 'boolean',
            },
            {
                label: 'Courses Can Be In Progress While Applying',
                name: 'school_courses_can_be_in_progress_while_applying',
                type: 'boolean',
            },
            {
                label: 'Max Number of Courses Pending While Applying',
                name: 'school_maximum_number_of_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of Credits Pending While Applying',
                name: 'school_maximum_number_of_credits_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of SCIENCE Courses Pending While Applying',
                name: 'school_maximum_number_of_science_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Max Number of NON-SCIENCE Courses Pending While Applying',
                name: 'school_maximum_number_of_non_science_courses_pending_while_applying',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum Grade Required for Pending Courses',
                name: 'school_minimum_grade_required_for_pending_courses',
                type: 'select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Date Pending Courses Must Be Completed',
                name: 'school_date_pending_courses_must_be_completed',
                type: 'text',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Semester Pending Courses Must Be Completed',
                name: 'school_semester_pending_courses_must_be_completed',
                type: 'select',
                path: '.input',
                notePath: '.notes',
            },
        ],
    },
]

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

const semesterOptions = [
    { value: '', label: 'Select' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Summer', label: 'Summer' }
]

export default function CompletionCriteria({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleChanges,
    toggleNote,
    deleteNote,
    handleModification,
    revertIndividualChange,
    validateIndividualChange
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
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
}) {

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

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


    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_prerequisite_completion_criteria') {
            let criteriaValue = {}
            if (keys[keys.length-1].includes('school_courses_can_be_in_progress_while_applying')) {
                inputPath = '.input';
                criteriaValue = {
                    school_courses_can_be_in_progress_while_applying: checked,
                    school_maximum_number_of_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_credits_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_science_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_maximum_number_of_non_science_courses_pending_while_applying: checked ? {
                        input: 0,
                        notes: [],
                    } : null,
                    school_minimum_grade_required_for_pending_courses: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                    school_date_pending_courses_must_be_completed: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                    school_semester_pending_courses_must_be_completed: checked ? {
                        input: '',
                        notes: [],
                    } : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_courses_can_be_in_progress_while_applying'].includes(keys[keys.length-1])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_prerequisite_completion_criteria.original.input,
                        ...criteriaValue,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_prerequisite_completion_criteria.draft.input,
                        ...criteriaValue,
                    }
                }
            }
            
        } else {
            inputPath = path;
            value = checked;
        }

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(inputPath, field, value);
        
        handleChanges(field, name, originalField, draftField, inputPath, 'modified', originalValue, value);
    };


    return (
        <>
        {completionCriteriaFields.map(field => {
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
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={originalInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                    isDisabled={false}
                                                />
                                            ) : (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: originalInput, label: originalInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={associatedField.name === 'school_minimum_grade_required_for_pending_courses' ? options : semesterOptions}
                                                    isDisabled={false}
                                                />
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
                                                    schoolField={schoolField}
                                                    validateIndividualChange={validateIndividualChange}
                                                    revertIndividualChange={revertIndividualChange}
                                                    handleChanges={handleChanges}
                                                    handleModification={handleModification}
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
                                schoolField={schoolField}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                                handleChanges={handleChanges}
                                handleModification={handleModification}
                            />
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'object' ? (
                            <>
                            {field.associatedFields && field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
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
                                            {associatedField.type === 'boolean' ? (
                                                <BooleanInput 
                                                    label={field.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={field.path}
                                                    handleCheck={handleBoolean}
                                                    isRequired={false}
                                                    isDisabled={false}
                                                />
                                            ) : associatedField.type === 'text' ? (
                                                <TextInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={draftInput}
                                                    path={inputPath}
                                                    handleInput={handleInput}
                                                    isRequired={false}
                                                    type="text"
                                                    isDisabled={false}
                                                />
                                            ) : (
                                                <SelectInput 
                                                    label={associatedField.label}
                                                    placeholder={associatedField.label}
                                                    name={field.name}
                                                    value={{ value: draftInput, label: draftInput }}
                                                    path={inputPath}
                                                    handleSelect={handleSelect}
                                                    isRequired={false}
                                                    isCreatable={false}
                                                    options={associatedField.name === 'school_minimum_grade_required_for_pending_courses' ? options : semesterOptions}
                                                    isDisabled={false}
                                                />
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
                                                    schoolField={schoolField}
                                                    validateIndividualChange={validateIndividualChange}
                                                    revertIndividualChange={revertIndividualChange}
                                                    handleChanges={handleChanges}
                                                    handleModification={handleModification}
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
                                schoolField={schoolField}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                                handleChanges={handleChanges}
                                handleModification={handleModification}
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