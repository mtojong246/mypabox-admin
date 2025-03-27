import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../../../../../types/newSchools.types";
import Container from "../../../../../components/Form/Validation/Container";
import { UserPermissions } from "../../../../../types/users.types";
import Notes from "../../../../../components/Form/Notes/Notes";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import Button from "../../../../../components/Buttons/Button";
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../../../../components/Icons/Minus.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';


const requiredOptionalExamFields = [
    {
        label: 'Required Optional Exams',
        name: 'school_required_optional_exams',
        type: 'array',
        path: '.input',
        associatedFields: [
            {
                label: 'Minimum Number Of Exams To Be Completed',
                name: 'school_minimum_number_of_exams_to_be_completed',
                type: 'text',
            },
            {
                label: 'Exams',
                name: 'school_required_optional_exams_list',
                type: 'array',
            },
            {
                label: 'Notes',
                name: 'notes',
                type: 'note',
            },
        ],
    },

];

const options = [
    {value: 'GRE', label: 'GRE'},
    {value: 'PA-CAT', label: 'PA-CAT'},
    {value: 'MCAT', label: 'MCAT'},
    {value: 'CASPer', label: 'CASPer'}
]

export default function RequiredOptionalExams({
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

    const handleAdd = (e:any, name: string, path: string) => {
        e.preventDefault();
        let value = {};

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.');

        if (keys.includes('school_required_optional_exams_list')) {
            value = {
                value: '',
            }
        } else {
            value = {
                school_minimum_number_of_exams_to_be_completed: 0,
                school_required_optional_exams_list: [],
                notes: [],
            }
        }

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
        {requiredOptionalExamFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;    
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

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
                        {field.type === 'array' ? (
                            <>
                            {(value as any[]).length > 0 && (value as any[]).map((val,i) => (
                                <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                    <div className="w-full flex justify-between items-center gap-8">
                                        <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                                        <Button 
                                            type="warning"
                                            styling="outline"
                                            label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course GPA'}`}
                                            action={(e:any) => handleRemove(e, field.name, field.path, i)}
                                            adornment={<MinusIcon/>}
                                        />
                                    </div>
                                    {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                        const inputPath = `${field.path}.${i}.${associatedField.name}`;
                                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                        const originalInput = associatedFieldInputs.originalValue;

                                        return (
                                            <>
                                                {associatedField.type === 'text' ? (
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
                                                ) : associatedField.type === 'array' ? (
                                                    <div className="w-full flex flex-col justify-start items-start gap-2">
                                                        <label className="font-medium">{associatedField.label}</label>
                                                        <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                        {(originalInput as any[]).length > 0 && (originalInput as any[]).map((val,i) => {
                                                            const arrayInputPath = `${inputPath}.${i}.value`
                                                            const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                            
                                                            return (
                                                                <div className="w-full flex gap-4">
                                                                    <SelectInput 
                                                                        label="Exam"
                                                                        placeholder="Exam"
                                                                        name={field.name}
                                                                        value={{ value: textInput.originalValue, label: textInput.originalValue }}
                                                                        path={arrayInputPath}
                                                                        handleSelect={handleSelect}
                                                                        isRequired={false}
                                                                        isCreatable
                                                                        options={options}
                                                                    />
                                                                    <div className="py-4 flex justify-center items-end">
                                                                        <button 
                                                                            onClick={(e:any) => handleRemove(e, field.name, inputPath, i)} 
                                                                            className="w-[24px] text-warning"
                                                                        >
                                                                            <DeleteIcon/>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                            
                                                        })}
                                                        <Button 
                                                            type="primary"
                                                            styling="outline"
                                                            label='Add Type of Degree Offered'
                                                            action={(e:any) => handleAdd(e, field.name, inputPath)}
                                                            adornment={<PlusIcon/>}
                                                        />
                                                        </div>
                                                    </div>
                                                ) : associatedField.type === 'note' ? (
                                                    <Notes 
                                                        notes={originalInput}
                                                        field={{
                                                            ...associatedField,
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
                                label={`Add Required Optional Exam`}
                                action={(e:any) => handleAdd(e, field.name, field.path)}
                                adornment={<PlusIcon/>}
                            />
                            </>
                        ) : (
                            <></>
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'array' ? (
                            <>
                            {(draftValue as any[]).length > 0 && (draftValue as any[]).map((val,i) => (
                                <div className="w-full flex flex-col gap-8 justify-start items-start p-6 rounded-lg border border-outline">
                                    <div className="w-full flex justify-between items-center gap-8">
                                        <p className="font-medium text-[18px]">{i+1} - {field.label}</p>
                                        <Button 
                                            type="warning"
                                            styling="outline"
                                            label={`Remove ${field.name === 'school_other_types_of_gpa_evaluated' ? 'GPA Type' : 'Course Minimum GPA'}`}
                                            action={(e:any) => handleRemove(e, field.name, field.path, i)}
                                            adornment={<MinusIcon/>}
                                        />
                                    </div>
                                    {field.associatedFields.length > 0 && field.associatedFields.map(associatedField => {
                                        const inputPath = `${field.path}.${i}.${associatedField.name}`;
                                        const associatedFieldInputs = handleRetrieveValue(inputPath, schoolField);
                                        const draftInput = associatedFieldInputs.originalDraftValue;

                                        return (
                                            <>
                                                {associatedField.type === 'text' ? (
                                                    <SelectInput 
                                                        label={associatedField.label}
                                                        placeholder={associatedField.label}
                                                        name={field.name}
                                                        value={{ value: draftInput, label: draftInput }}
                                                        path={inputPath}
                                                        handleSelect={handleSelect}
                                                        isRequired={false}
                                                        isCreatable
                                                        options={options}
                                                    />
                                                ) : associatedField.type === 'array' ? (
                                                    <div className="w-full flex flex-col justify-start items-start gap-2">
                                                        <label className="font-medium">{associatedField.label}</label>
                                                        <div className="w-full flex flex-col justify-start items-start gap-8 p-6 rounded-lg border border-outline">
                                                        {(draftInput as any[]).length > 0 && (draftInput as any[]).map((val,i) => {
                                                            const arrayInputPath = `${inputPath}.${i}.value`
                                                            const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                                                            return (
                                                                <div className="w-full flex gap-4">
                                                                    <TextInput 
                                                                        label="Certification"
                                                                        placeholder="Certification"
                                                                        name={field.name}
                                                                        value={textInput.originalValue}
                                                                        path={arrayInputPath}
                                                                        handleInput={handleInput}
                                                                        isRequired={false}
                                                                        type="text"
                                                                    />
                                                                    <div className="py-4 flex justify-center items-end">
                                                                        <button 
                                                                            onClick={(e:any) => handleRemove(e, field.name, inputPath, i)} 
                                                                            className="w-[24px] text-warning"
                                                                        >
                                                                            <DeleteIcon/>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                            
                                                        })}
                                                        <Button 
                                                            type="primary"
                                                            styling="outline"
                                                            label='Add Type of Degree Offered'
                                                            action={(e:any) => handleAdd(e, field.name, inputPath)}
                                                            adornment={<PlusIcon/>}
                                                        />
                                                        </div>
                                                    </div>
                                                ) : associatedField.type === 'note' ? (
                                                    <Notes 
                                                        notes={draftInput}
                                                        field={{
                                                            ...associatedField,
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
                            </>
                        ) : (
                            <></>
                        )}
                        </div>
                    }
                />
            )
        })}
        </>
    )
}