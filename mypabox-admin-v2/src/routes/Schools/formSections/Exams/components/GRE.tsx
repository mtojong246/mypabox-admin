import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";



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

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        let value = {};
        let inputPath = '';

        if (name === 'school_pa_shadowing_required') {
            inputPath = '.input';
            value = {
                school_pa_shadowing_required: checked,
                school_minimum_pa_shadowing_hours_required: checked ? 0 : null,
            }

        } else if (name === 'school_pa_shadowing_recommended') {
            inputPath = '.input';
            value = {
                school_pa_shadowing_recommended: checked,
                school_minimum_pa_shadowing_hours_recommended: checked ? 0 : null,
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

                                if (associatedFieldObject.originalValue !== null) {
                                    const inputPath = `${field.path}.${associatedField.name}`;
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
                                    const inputPath = `${field.path}.${associatedField.name}`;
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