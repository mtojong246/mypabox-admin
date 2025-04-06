import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Change, GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
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

const recommendedCoursesFields = [
    {
        label: 'Recommended Courses',
        name: 'school_prereq_recommended_courses',
        type: 'array',
        path: '.input',
        notePath: '.notes',
    },
]

export default function RecommendedCourses({
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
    handleModification,
    validateIndividualChange,
    revertIndividualChange
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
    deleteNote: (e: React.MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
}) {
    return (
        <>
        {recommendedCoursesFields.map(field => {
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
                    originalInputs={<></>}
                    modifiedInputs={<></>}
                />
            )
        })}

        </>
    )
}