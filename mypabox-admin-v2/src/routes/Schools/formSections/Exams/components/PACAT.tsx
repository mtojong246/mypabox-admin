import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Notes from "../../../../../components/Form/Notes/Notes";
import { UserPermissions } from "../../../../../types/users.types";


const pacatFields = [
    {
        label: 'PACAT',
        name: 'school_pacat',
        type: 'object',
        path: '.input',
        notePath: '.notes',
        associatedFields: [
            {
                label: 'PACAT Required',
                name: 'school_pacat_required',
                type: 'boolean',
            },
            {
                label: 'PACAT Recommended',
                name: 'school_pacat_recommended',
                type: 'boolean',
            },
            {
                label: 'PACAT Exam School Code',
                name: 'school_pacat_exam_school_code',
                type: 'text',
            },
            {
                label: 'PACAT Exam Scaled Minimum Score Requred',
                name: 'school_pacat_exam_scaled_minimum_score_required',
                type: 'text',
            },
            {
                label: 'PACAT Exam Group Scaled Minimum Score required',
                name: 'school_pacat_exam_group_scaled_minimum_score_required',
                type: 'text',
            },
        ],
    },
]


export default function PACAT({
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
        const keys = path.split('.');

        let value = {};
        let inputPath = '';

        
        if (name === 'school_pacat') {
            let pacatValue = {}
            if (keys[keys.length-1].includes('school_pacat_required') || keys[keys.length-1].includes('school_pacat_recommended')) {
                inputPath = '.input';
                pacatValue = {
                    school_pacat_exam_school_code: checked ? 0 : null,
                    school_pacat_exam_scaled_minimum_score_required: checked ? 0 : null,
                    school_pacat_exam_group_scaled_minimum_score_required: checked ? 0 : null,
                }
            } else {
                inputPath = path;
                value = checked;
            }

            if (['school_pacat_required', 'school_pacat_recommended'].includes(keys[keys.length-1])) {
                if (!isEditSchool || (isEditSchool && permissions.canEditWithoutVerificationNeeded)) {
                    value = {
                        ...school.school_pacat.original.input,
                        ...pacatValue,
                        school_pacat_required: keys[keys.length-1].includes('school_pacat_required') ? checked : school.school_pacat.original.input.school_pacat_required,
                        school_pacat_recommended: keys[keys.length-1].includes('school_pacat_recommended') ? checked : school.school_pacat.original.input.school_pacat_recommended,
                    }
                } else if (isEditSchool && permissions.canEditWithVerificationNeeded) {
                    value = {
                        ...school.school_pacat.draft.input,
                        ...pacatValue,
                        school_pacat_required: keys[keys.length-1].includes('school_pacat_required') ? checked : school.school_pacat.draft.input.school_pacat_required,
                        school_pacat_recommended: keys[keys.length-1].includes('school_pacat_recommended') ? checked : school.school_pacat.draft.input.school_pacat_recommended,
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
        {pacatFields.map(field => {
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