import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";



const englishExamFields = [
    {
        label: 'English Proficiency Exams',
        name: 'school_english_proficiency_exams',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'English Proficiency Exams Required',
                name: 'school_english_proficiency_exams_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'TOEFL Required',
                name: 'school_toefl_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum Time Frame TOEFL Needs To Be Completed',
                name: 'school_minimum_time_frame_toefl_needs_to_be_completed',
                type: 'text-select',
                path: '.input',
            },
            {
                label: 'TOEFL Exempt With Masters Degree',
                name: 'school_toefl_exempt_with_masters_degree',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'TOEFL Exempt With Doctoral Degree',
                name: 'school_toefl_exempt_with_doctoral_degree',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Total Score Required',
                name: 'school_toefl_ibt_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Reading Score Required',
                name: 'school_toefl_ibt_minimum_reading_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Writing Score Required',
                name: 'school_toefl_ibt_minimum_writing_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Listening Score Required',
                name: 'school_toefl_ibt_minimum_listening_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Speaking Score Required',
                name: 'school_toefl_ibt_minimum_speaking_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL IBT Minimum Scores Notes',
                name: 'school_toefl_ibt_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'TOEFL PBT Minimum Total Score Required',
                name: 'school_toefl_pbt_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL PBT Minimum Reading Score Required',
                name: 'school_toefl_pbt_minimum_reading_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL PBT Minimum Writing Score Required',
                name: 'school_toefl_pbt_minimum_writing_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL PBT Minimum Listening Score Required',
                name: 'school_toefl_pbt_minimum_listening_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL PBT Minimum Speaking Score Required',
                name: 'school_toefl_pbt_minimum_speaking_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'TOEFL PBT Minimum Scores Notes',
                name: 'school_toefl_pbt_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'IELT Required',
                name: 'school_ielt_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'IELT Minimum Total Score Required',
                name: 'school_ielt_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'IELT Minimum Scores Notes',
                name: 'school_ielt_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'MELAB Required',
                name: 'school_melab_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'MELAB Minimum Total Score Required',
                name: 'school_melab_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'MELAB Minimum Scores Notes',
                name: 'school_melab_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'PTE Academic Required',
                name: 'school_pte_academic_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'PTE Academic Minimum Total Score Required',
                name: 'school_pte_academic_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'PTE Academic Minimum Scores Notes',
                name: 'school_pte_academic_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'ITEP Academic Plus Required',
                name: 'school_itep_academic_plus_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'ITEP Academic Plus Minimum Total Score Required',
                name: 'school_itep_academic_plus_minimum_total_score_required',
                type: 'text',
                path: '.input',
            },
            {
                label: 'ITEP Academic Plus Minimum Scores Notes',
                name: 'school_itep_academic_plus_minimum_score_notes',
                type: 'note',
                path: '.notes',
            },
        ],
    },
]

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]


export default function EnglishExams({
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
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_english_proficiency_exams') {
            let englishExamsValue = {}
            if (keys[keys.length-2].includes('school_english_proficiency_exams_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_english_proficiency_exams_required: {
                        input: checked,
                    },
                    school_toefl_required: checked ? {
                        input: false,
                    } : null,
                    school_minimum_time_frame_toefl_needs_to_be_completed: null,
                    school_toefl_exempt_with_masters_degree: null,
                    school_toefl_exempt_with_doctoral_degree: null,
            
                    school_toefl_ibt_minimum_total_score_required: null,
                    school_toefl_ibt_minimum_reading_score_required: null,
                    school_toefl_ibt_minimum_writing_score_required: null,
                    school_toefl_ibt_minimum_listening_score_required: null,
                    school_toefl_ibt_minimum_speaking_score_required: null,
                    school_toefl_ibt_minimum_score_notes: null,
            
                    school_toefl_pbt_minimum_total_score_required: null,
                    school_toefl_pbt_minimum_reading_score_required: null,
                    school_toefl_pbt_minimum_writing_score_required: null,
                    school_toefl_pbt_minimum_listening_score_required: null,
                    school_toefl_pbt_minimum_speaking_score_required: null,
                    school_toefl_pbt_minimum_score_notes: null,

                    school_ielt_required: checked ? {
                        input: false,
                    } : null,
                    school_ielt_minimum_total_score_required: null,
                    school_ielt_minimum_score_notes: null,
            
                    school_melab_required: checked ? {
                        input: false,
                    } : null,
                    school_melab_minimum_total_score_required: null,
                    school_melab_minimum_score_notes: null,
            
                    school_pte_academic_required: checked ? {
                        input: false,
                    } : null,
                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: null,
            
                    school_itep_academic_plus_required: checked ? {
                        input: false,
                    } : null,
                    school_itep_academic_plus_minimum_total_score_required: null,
                    school_itep_academic_plus_minimum_score_notes: null,
                }
            } else if (keys[keys.length-2].includes('school_toefl_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_toefl_required: {
                        input: checked,
                    },
                    school_minimum_time_frame_toefl_needs_to_be_completed: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                    } : null,
                    school_toefl_exempt_with_masters_degree: checked ? {
                        input: false,
                    } : null,
                    school_toefl_exempt_with_doctoral_degree: checked ? {
                        input: false,
                    } : null,
            
                    school_toefl_ibt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_reading_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_writing_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_listening_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_speaking_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_ibt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
            
                    school_toefl_pbt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_reading_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_writing_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_listening_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_speaking_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_toefl_pbt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }

            } else if (keys[keys.length-2].includes('school_ielt_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_ielt_required: {
                        input: checked,
                    },
                    school_ielt_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_ielt_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }

            } else if (keys[keys.length-2].includes('school_melab_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_melab_required: {
                        input: checked,
                    },
                    school_melab_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_melab_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_pte_academic_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_pte_academic_required: {
                        input: checked,
                    },
                    school_pte_academic_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_pte_academic_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_itep_academic_plus_required')) {
                inputPath = '.input';
                englishExamsValue = {
                    school_itep_academic_plus_required: {
                        input: checked,
                    },
                    school_itep_academic_plus_minimum_total_score_required: checked ? {
                        input: 0,
                    } : null,
                    school_itep_academic_plus_minimum_score_notes: checked ? {
                        notes: [],
                    } : null,
                }
            }  else {
                inputPath = path;
                value = checked;
            }

            if ([
                    'school_english_proficiency_exams_required', 
                    'school_toefl_required', 
                    'school_ielt_required', 
                    'school_melab_required' ,
                    'school_pte_academic_required' ,
                    'school_itep_academic_plus_required'
                ].includes(keys[keys.length-2])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_english_proficiency_exams.original.input,
                        ...englishExamsValue,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_english_proficiency_exams.draft.input,
                        ...englishExamsValue,
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
        {englishExamFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;  
            const inputs = handleRetrieveValue(field.path, schoolField);
   
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

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

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    originalInput = associatedFieldInputs.originalValue;

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
                                            ) : associatedField.type === 'note' ? (
                                                <Notes 
                                                    notes={originalInput}
                                                    field={{
                                                        ...associatedField,
                                                        notePath: inputPath,
                                                        name: field.name,
                                                    }}
                                                    toggleNote={toggleNote}
                                                    deleteNote={deleteNote}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                                type="text"
                            />
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

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
                                    const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                    draftInput = associatedFieldInputs.originalDraftValue;

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
                                            ) : associatedField.type === 'text-select' ? (
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
                                            ) : associatedField.type === 'note' ? (
                                                <Notes 
                                                    notes={draftInput}
                                                    field={{
                                                        ...associatedField,
                                                        notePath: inputPath,
                                                        name: field.name,
                                                    }}
                                                    toggleNote={toggleNote}
                                                    deleteNote={deleteNote}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )
                                } else {
                                    return null;
                                }     
                            })}
                            </>
                        ) : (
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                                type="text"
                            />
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