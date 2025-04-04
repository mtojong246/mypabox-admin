import { Dispatch, SetStateAction } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import EnglishExamsInputs from "../inputs/EnglishExamsInputs";



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



export default function EnglishExams({
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
                        <EnglishExamsInputs 
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
                        <EnglishExamsInputs 
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