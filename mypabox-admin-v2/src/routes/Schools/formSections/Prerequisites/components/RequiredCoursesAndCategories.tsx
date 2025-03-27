import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import TextEditorInput from "../../../../../components/Form/InputTypes/TextEditorInput";


const completionCriteriaFields = [
    {
        label: 'Required Courses And Categories',
        name: 'school_prereq_required_courses_and_categories',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'Required Courses',
                name: 'school_prereq_required_courses',
                type: 'array',
                path: '.input',
                notePath: '.notes',
                associatedFields: [
                    {
                        label: 'Required Course ID',
                        name: 'school_required_course_id',
                        type: 'text',
                    },
                    {
                        label: 'With Lab',
                        name: 'school_required_course_lab',
                        type: 'boolean',
                    },
                    {
                        label: 'Lab Preferred',
                        name: 'school_required_course_lab_preferred',
                        type: 'boolean',
                    },
                    {
                        label: 'Credit Hours',
                        name: 'school_required_course_credit_hours',
                        type: 'text',
                    },
                    {
                        label: 'Quarter Hours',
                        name: 'school_required_course_quarter_hours',
                        type: 'text',
                    },
                    {
                        label: 'Note',
                        name: 'school_required_course_note_section',
                        type: 'text-area',
                    },
                ],
            },
            {
                label: 'Required Optional Courses',
                name: 'school_prereq_required_optional_courses',
                type: 'array',
                path: '.input',
                associatedFields: [
                    {
                        label: 'Minimum Number of Courses To Be Completed',
                        name: 'school_minimum_number_of_courses_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Required Optional Courses',
                        name: 'school_required_optional_courses_list',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Required Optional Course ID',
                                name: 'school_optional_course_id',
                                type: 'text',
                            },
                            {
                                label: 'With Lab',
                                name: 'school_optional_course_lab',
                                type: 'boolean',
                            },
                            {
                                label: 'Lab Preferred',
                                name: 'school_optional_course_lab_preferred',
                                type: 'boolean',
                            },
                            {
                                label: 'Credit Hours',
                                name: 'school_optional_course_credit_hours',
                                type: 'text',
                            },
                            {
                                label: 'Quarter Hours',
                                name: 'school_optional_course_quarter_hours',
                                type: 'text',
                            },
                            {
                                label: 'Note',
                                name: 'school_optional_course_note_section',
                                type: 'text-area',
                            },
                        ],
                    },
                    {
                        label: 'Notes',
                        name: 'notes',
                        type: 'note',
                    },
                ],
            },
            {
                label: 'Required Course Categories',
                name: 'school_prereq_required_course_categories',
                type: 'array',
                path: '.input',
                notePath: '.notes',
                associatedFields: [
                    {
                        label: 'Required Course Category',
                        name: 'school_required_course_category',
                        type: 'select',
                    },
                    {
                        label: 'Total Number of Credit Hours That Need to Be Completed',
                        name: 'school_required_course_category_number_of_credits_need_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Total Number of Quarter Hours That Need to Be Completed',
                        name: 'school_required_course_category_number_of_quarter_hours_need_to_be_completed',
                        type: 'text',
                    },
                    {
                        label: 'Total Number of Courses That Need Lab',
                        name: 'school_required_course_category_number_of_courses_that_need_lab',
                        type: 'text',
                    },
                    {
                        label: 'Included Courses',
                        name: 'school_required_course_category_extra_included_courses',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Course Name',
                                name: 'school_required_course_id',
                                type: 'select',
                            },
                            {
                                label: 'Note',
                                name: 'school_required_course_note',
                                type: 'text-area',
                            }
                        ]
                    },
                    {
                        label: 'Excluded Courses',
                        name: 'school_required_course_category_excluded_courses',
                        type: 'array',
                        associatedFields: [
                            {
                                label: 'Course Name',
                                name: 'school_required_course_id',
                                type: 'select',
                            },
                            {
                                label: 'Note',
                                name: 'school_required_course_note',
                                type: 'text-area',
                            }
                        ]
                    },
                    {
                        label: 'Notes',
                        name: 'notes',
                        type: 'note',
                    },
                ],
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

export default function RequiredCoursesAndCategories({
    school,
    setSchool,
    isEditSchool,
    permissions,
    handleRetrieveValue,
    handleModify,
    handleAddition,
    handleDeletion,
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
    handleAddition: (path: string, field: GenericSchoolField, newValue: any) => {
        originalField: any;
        draftField: any;
    },
    handleDeletion: (path: string, field: GenericSchoolField, index: number) => {
        originalField: any;
        draftField: any;
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
        const value = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
    };

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

    const handleAdd = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        if (name === 'school_other_types_of_gpa_evaluated') {
            value = {
                gpa_value_required_or_recommended: {
                    input: 'required',
                },
                minimum_gpa_value_needed: {
                    input: 0,
                },
                minimum_number_of_credits_evaluated: {
                    input: 0,
                },
                type_of_gpa_evaluated: {
                    input: '',
                },
                notes: [],
            }
        } else {
            value = {
                minimum_gpa_required_for_course: {
                    input: 0,
                },
                courseID: {
                    input: '',
                },
                notes: [],
            }
        };

        const {
            originalField,
            draftField,
        } = handleAddition(path, field, value);

        handleChanges(field, name, originalField, draftField, path, 'added');
    }

    const handleRemove = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
        } = handleDeletion(path, field, index);

        handleChanges(field, name, originalField, draftField, path, 'removed');

    }


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
                                            {associatedField.type === 'array' ? (
                                               <>
                                               {(originalInput as any[]).length > 0 && (originalInput as any[]).map((val,i) => (
                                                   <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                                       <div className="w-full flex justify-between items-center gap-8">
                                                           <p className="font-medium text-[18px]">{i+1} - {associatedField.label}</p>
                                                           <Button 
                                                               type="warning"
                                                               styling="outline"
                                                               label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                                               action={(e:any) => handleRemove(e, field.name, inputPath, i)}
                                                               adornment={<MinusIcon/>}
                                                           />
                                                       </div>
                                                       {associatedField.associatedFields.length > 0 && associatedField.associatedFields.map(nestedAssociatedField => {
                                                           const arrayInputPath = `${inputPath}.${i}.${nestedAssociatedField.name}`;
                                                           const arrayAssociatedPath = handleRetrieveValue(arrayInputPath, schoolField);
                                                           const arrayOriginalInput = arrayAssociatedPath.originalValue;
                   
                                                           return (
                                                               <>
                                                                   {associatedField.type === 'text' ? (
                                                                       <TextInput 
                                                                           label={nestedAssociatedField.label}
                                                                           placeholder={nestedAssociatedField.label}
                                                                           name={field.name}
                                                                           value={arrayOriginalInput}
                                                                           path={arrayInputPath}
                                                                           handleInput={handleInput}
                                                                           isRequired={false}
                                                                           type="text"
                                                                       />
                                                                   ) : associatedField.type === 'boolean' ? (
                                                                        <BooleanInput 
                                                                            label={nestedAssociatedField.label}
                                                                            name={field.name}
                                                                            value={arrayOriginalInput}
                                                                            path={arrayInputPath}
                                                                            handleCheck={handleBoolean}
                                                                            isRequired={false}
                                                                            isDisabled={false}
                                                                        />
                                                                   ) : associatedField.type === 'text-area' ? (
                                                                        <TextEditorInput 
                                                                            label={nestedAssociatedField.label}
                                                                            name={field.name}
                                                                            value={arrayOriginalInput}
                                                                            path={arrayInputPath}
                                                                            handleQuill={handleQuill}
                                                                            isRequired={false}
                                                                        />
                                                                       
                                                                   ) : associatedField.type === 'note' ? (
                                                                       <Notes 
                                                                           notes={arrayOriginalInput}
                                                                           field={{
                                                                               ...nestedAssociatedField,
                                                                               notePath: inputPath,
                                                                               name: field.name,
                                                                               path: '',
                                                                           }}
                                                                           toggleNote={toggleNote}
                                                                           deleteNote={deleteNote}
                                                                       />
                                                                   ) : (
                                                                       <></>
                                                                   )}
                                                               </>
                                                           )
                                                       })}
                                                   </div>
                                               ))}
                                               <Button 
                                                   type="primary"
                                                   styling="outline"
                                                   label={`Add ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                                   action={(e:any) => handleAdd(e, field.name, field.path)}
                                                   adornment={<PlusIcon/>}
                                               />
                                               </>
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