import { Dispatch, SetStateAction } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import GREInputs from "../inputs/GREInputs";



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
    handleModification,
    revertIndividualChange,
    validateIndividualChange,
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
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
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
                        <GREInputs 
                            tab='original'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={value}
                            noteValue={noteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
                        />
                    }
                    modifiedInputs={
                        <GREInputs 
                            tab='modified'
                            permissions={permissions}
                            isEditSchool={isEditSchool}
                            school={school}
                            schoolField={schoolField}
                            field={field}
                            value={draftValue}
                            noteValue={draftNoteValue}
                            handleChanges={handleChanges}
                            handleRetrieveValue={handleRetrieveValue}
                            handleModification={handleModification}
                            toggleNote={toggleNote}
                            deleteNote={deleteNote}
                            revertIndividualChange={revertIndividualChange}
                            validateIndividualChange={validateIndividualChange}
                        />
                    }
                />
            )
        })}

        </>
    )
}