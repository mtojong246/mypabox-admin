import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";
import TextSelectInput from "../../../../../components/Form/InputTypes/TextSelectInput";



const greFields = [
    {
        label: 'GRE',
        name: 'school_gre',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'GRE Required',
                name: 'school_gre_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'GRE Recommended',
                name: 'school_gre_recommended',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'CASPA GRE Institution Code',
                name: 'school_caspa_gre_institution_code',
                type: 'text',
                path: '.input',
            },
            {
                label: 'GRE Institution Code',
                name: 'school_gre_institution_code',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum Time Frame GRE Must Be Completed',
                name: 'school_minimum_time_frame_gre_must_be_completed',
                type: 'text-select',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'MCAT Accepted In Place of GRE',
                name: 'school_mcat_accepted_in_place_of_gre',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'GRE Exempt with Masters Degree',
                name: 'school_gre_exempt_with_masters_degree',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'GRE Exempt with Doctoral Degree',
                name: 'school_gre_exempt_with_phd_degree',
                type: 'boolean',
                path: '.input',
                notePath: '.notes',
            },
            {
                label: 'Minimum GRE Scores Required',
                name: 'school_minimum_gre_scores_required',
                type: 'boolean',
                path: '.input',
            },
            {
                label: 'Minimum GRE Verbal Score',
                name: 'school_gre_minimum_verbal_score',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Quantitative Score',
                name: 'school_gre_minimum_quantitative_score',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Analytical Writing Score',
                name: 'school_gre_minimum_analytical_writing_score',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Combined Score',
                name: 'school_gre_minimum_combined_score',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Scores Notes',
                name: 'school_minimum_gre_score_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'Minimum GRE Verbal Percentile',
                name: 'school_gre_minimum_verbal_percentile',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Quantitative Percentile',
                name: 'school_gre_minimum_quantitative_percentile',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Analytical Writing Percentile',
                name: 'school_gre_minimum_analytical_writing_percentile',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Combined Percentile',
                name: 'school_gre_minimum_combined_percentile',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Minimum GRE Percentiles Notes',
                name: 'school_minimum_gre_percentile_notes',
                type: 'note',
                path: '.notes',
            },
            {
                label: 'Average GRE Verbal Score Accepted Previous Year',
                name: 'school_average_gre_verbal_score_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Quantitative Score Accepted Previous Year',
                name: 'school_average_gre_quantitative_score_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Analytical Writing Score Accepted Previous Year',
                name: 'school_average_gre_analytical_writing_score_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Combined Score Accepted Previous Year',
                name: 'school_average_gre_combined_score_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Verbal Percentile Accepted Previous Year',
                name: 'school_average_gre_verbal_percentile_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Quantitative Percentile Accepted Previous Year',
                name: 'school_average_gre_quantitative_percentile_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Analytical Writing Percentile Accepted Previous Year',
                name: 'school_average_gre_analytical_writing_percentile_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
            {
                label: 'Average GRE Combined Percentile Accepted Previous Year',
                name: 'school_average_gre_combined_percentile_accepted_previous_year',
                type: 'text',
                path: '.input',
            },
        ],
    },
]

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]


export default function GRE({
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

        
        if (name === 'school_gre') {
            let greValue = {}
            if (keys[keys.length-2].includes('school_gre_required') || keys[keys.length-2].includes('school_gre_recommended')) {
                inputPath = '.input';
                greValue = {
                    school_caspa_gre_institution_code: checked ? {
                        input: 0,
                    } : null,
                    school_gre_institution_code: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_time_frame_gre_must_be_completed: checked ? {
                        input: {
                            quantity: 0,
                            units: '',
                        },
                        notes: [],
                    } : null,
                    school_mcat_accepted_in_place_of_gre: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_gre_exempt_with_masters_degree: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_gre_exempt_with_phd_degree: checked ? {
                        input: false,
                        note: [],
                    } : null,
                    school_minimum_gre_scores_required: checked ? {
                        input: false,
                    } : null,
                    school_gre_minimum_verbal_score: null,
                    school_gre_minimum_quantitative_score: null,
                    school_gre_minimum_analytical_writing_score: null,
                    school_gre_minimum_combined_score: null,
                    school_minimum_gre_score_notes: null,
                    school_gre_minimum_verbal_percentile: null,
                    school_gre_minimum_quantitative_percentile: null,
                    school_gre_minimum_analytical_writing_percentile: null,
                    school_gre_minimum_combined_percentile: null,
                    school_minimum_gre_percentile_notes: null,
                    school_average_gre_verbal_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_quantitative_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_analytical_writing_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_combined_score_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_verbal_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_quantitative_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_analytical_writing_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                    school_average_gre_combined_percentile_accepted_previous_year: checked ? {
                        input: 0,
                    } : null,
                }
            } else if (keys[keys.length-2].includes('school_minimum_gre_scores_required')) {
                inputPath = '.input';
                greValue = {
                    school_minimum_gre_scores_required: {
                        input: checked,
                    },
                    school_gre_minimum_verbal_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_quantitative_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_analytical_writing_score: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_combined_score: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_gre_score_notes: checked ? {
                        notes: [],
                    } : null,
                    school_gre_minimum_verbal_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_quantitative_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_analytical_writing_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_gre_minimum_combined_percentile: checked ? {
                        input: 0,
                    } : null,
                    school_minimum_gre_percentile_notes: checked ? {
                        notes: [],
                    } : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_gre_required', 'school_gre_recommended', 'school_minimum_gre_scores_required'].includes(keys[keys.length-2])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_gre.original.input,
                        ...greValue,
                        school_gre_required: keys[keys.length-2].includes('school_gre_required') ? {
                            input: checked,
                        } : school.school_gre.original.input.school_gre_required,
                        school_gre_recommended: keys[keys.length-2].includes('school_gre_recommended') ? {
                            input: checked,
                        } : school.school_gre.original.input.school_gre_recommended,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_gre.draft.input,
                        ...greValue,
                        school_gre_required: keys[keys.length-2].includes('school_gre_required') ? {
                            input: checked,
                        } : school.school_gre.draft.input.school_gre_required,
                        school_gre_recommended: keys[keys.length-2].includes('school_gre_recommended') ? {
                            input: checked,
                        } : school.school_gre.draft.input.school_gre_recommended,
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
        {greFields.map(field => {
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
                                let originalNotes = [];

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
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
                                                    isDisabled={false}
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
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                                type="text"
                                isDisabled={false}
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
                                let draftNotes = [];

                                if (associatedFieldObject.originalDraftValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}${associatedField.path}`;
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
                                                    isDisabled={false}
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
                                            {associatedField.notePath && draftNoteValue !== undefined && (
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
                            <TextInput 
                                label={field.label}
                                placeholder={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleInput={handleInput}
                                isRequired={false}
                                type="text"
                                isDisabled={false}
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