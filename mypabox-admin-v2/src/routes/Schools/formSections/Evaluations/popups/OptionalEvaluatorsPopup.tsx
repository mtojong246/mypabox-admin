import { ChangeEvent, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool } from "../../../../../types/newSchools.types";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import Button from "../../../../../components/Buttons/Button";
import { OutlinedInput } from "@mui/material";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { UserPermissions } from "../../../../../types/users.types";

const unitOptions = [
    {value: '', label: 'Select'},
    {value: 'Years', label: 'Years'},
    {value: 'Months', label: 'Months'}
]

const evaluatorOptions = [
    {value: 'PA', label: 'PA'},
    {value: 'MD', label: 'MD'},
    {value: 'DO', label: 'DO'},
    {value: 'NP', label: 'NP'},
    {value: 'PhD', label: 'PhD'},
];

export interface OptionalEvaluatorsType {
    school_minimum_number_of_evaluators_required_in_group: number;
    school_required_optional_group_evaluator_title: { value: string }[];
    school_minimum_time_evaluator_knows_applicant: {
        quantity: number,
        units: string,
    };
}

const defaultForm: OptionalEvaluatorsType = {
    school_minimum_number_of_evaluators_required_in_group: 0,
    school_required_optional_group_evaluator_title: [],
    school_minimum_time_evaluator_knows_applicant: {
        quantity: 0,
        units: ''
    }
}

export default function OptionalEvaluatorsPopup({
    school,
    togglePopup,
    selectedEvalField,
    selectedEvalArrItem,
    handleModification,
    handleChanges,
    permissions,
}: {
    school: NewSchool,
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, field?: { name: string, path: string, index?: number }, arrItem?: OptionalEvaluatorsType) => void,
    selectedEvalField: {
        name: string,
        path: string,
        index?: number,
    },
    selectedEvalArrItem: OptionalEvaluatorsType | null,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
        originalDraftValue: any[] | undefined;
    },
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    permissions: UserPermissions
}) {
    const [ optionalEvaluators, setOptionalEvaluators ] = useState<OptionalEvaluatorsType>(defaultForm);

    useEffect(() => {
        if (selectedEvalArrItem) {
          setOptionalEvaluators(selectedEvalArrItem);
        } else {
            setOptionalEvaluators(defaultForm)
        }
    }, [selectedEvalArrItem]);

    const addOptionalEvaluators = (name: string, path: string, optionalEvaluators: OptionalEvaluatorsType) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, optionalEvaluators, 'add');

        const index = (originalDraftValue as OptionalEvaluatorsType[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const editOptionalEvaluators = (name: string, path: string, optionalEvaluators: OptionalEvaluatorsType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, optionalEvaluators, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, optionalEvaluators);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (selectedEvalArrItem && selectedEvalField.index !== undefined) {
            editOptionalEvaluators(selectedEvalField.name, selectedEvalField.path, optionalEvaluators, selectedEvalField.index);
        } else {
            addOptionalEvaluators(selectedEvalField.name, selectedEvalField.path, optionalEvaluators);
        }

        togglePopup(e);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        setOptionalEvaluators({
            ...optionalEvaluators,
            [name]: value,
        })
    };

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setOptionalEvaluators({
            ...optionalEvaluators,
            school_minimum_time_evaluator_knows_applicant: {
                ...optionalEvaluators.school_minimum_time_evaluator_knows_applicant,
                quantity: Number(e.target.value),
            }
        })
    };

    const handleUnits = (e:any) => {
        setOptionalEvaluators({
            ...optionalEvaluators,
            school_minimum_time_evaluator_knows_applicant: {
                ...optionalEvaluators.school_minimum_time_evaluator_knows_applicant,
                units: e.value,
            }
        })
    }

    const handleTitle = (e: any, index: number) => {
        const title = e.value;

        setOptionalEvaluators({
            ...optionalEvaluators,
            school_required_optional_group_evaluator_title: optionalEvaluators.school_required_optional_group_evaluator_title.map((t, i) => {
                if (i === index) {
                    return {
                        value: title,
                    }
                } else {
                    return {...t}
                }
            })
        })
    }

    const addTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOptionalEvaluators({
            ...optionalEvaluators,
            school_required_optional_group_evaluator_title: optionalEvaluators.school_required_optional_group_evaluator_title.concat({ value: '' })
        })
    };

    const removeTitle = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setOptionalEvaluators({
            ...optionalEvaluators,
            school_required_optional_group_evaluator_title: optionalEvaluators.school_required_optional_group_evaluator_title.filter((title, i) => i !== index)
        })
    }


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='w-full max-w-[600px] rounded-lg bg-white popup-max-height flex flex-col justify-start items-stretch'>
                        <div className="flex justify-between items-center gap-6 p-6 border-b border-outline">
                            <p className="font-medium text-[24px]">{selectedEvalArrItem ? 'Edit Optional Evaluators' : 'Add Optional Evaluators'}</p>
                            <button onClick={(e: any) => togglePopup(e)} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                        </div>

                        <div className="grow overflow-y-auto">
                        <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>
                        
                            <TextInput 
                                label='Minimum number of evaluators required in group'
                                placeholder='Minimum number of evaluators required in group'
                                name='school_minimum_number_of_evaluators_required_in_group'
                                value={optionalEvaluators.school_minimum_number_of_evaluators_required_in_group}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <div className="w-full flex flex-col gap-2 justify-start items-start">
                                <p>Evaluator titles:</p>
                                <div className="w-full flex flex-col gap-4 justify-start items-start">
                                    {optionalEvaluators.school_required_optional_group_evaluator_title.map((title, titleIndex) => {

                                        return (
                                        <div className="w-full flex gap-4 justify-start items-start">
                                            <CreatableSelect 
                                                className='w-full'
                                                options={evaluatorOptions}
                                                value={{ value: title.value, label: title.value }}
                                                onChange={(e:any) => handleTitle(e, titleIndex)}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                                        borderRadius: 8,
                                                    }),
                                                    valueContainer: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        padding: '7px 16px',
                                                    }),
                                                }}
                                            />
                                            <div className="py-4 flex justify-center items-end">
                                                <button 
                                                    onClick={(e:any) => removeTitle(e, titleIndex)} 
                                                    className="w-[24px] text-warning transition-all hover:brightness-90"
                                                >
                                                    <DeleteIcon/>
                                                </button>
                                            </div>
                                        </div>
                                        )
                                        
                                    })}
                                </div>
                                <Button 
                                    label="Add Evaluator Title"
                                    type="primary"
                                    styling="outline"
                                    action={(e:any) => addTitle(e)}
                                />
                            </div>

                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                <label className="font-medium">Minimum time evaluator knows applicant</label>
                                <div className='flex gap-4 p-6 border border-outline rounded-lg w-full'>
                                    <div className="w-full flex flex-col gap-2 justify-start items-start">
                                        <label className={`font-medium`}>Quantity</label>
                                        <div className="flex w-full gap-2 justify-start items-start">
                                            <OutlinedInput
                                                type='text'
                                                placeholder='Quantity'
                                                name='quantity'
                                                value={optionalEvaluators.school_minimum_time_evaluator_knows_applicant.quantity ? optionalEvaluators.school_minimum_time_evaluator_knows_applicant.quantity : ''}
                                                onChange={handleQuantity}
                                                sx={{
                                                    maxWidth: 600,
                                                    width: '100%',
                                                    borderRadius: '8px',
                                                    '& .MuiOutlinedInput-input': {
                                                        padding: '12px 16px',
                                                    }
                                                }}
                                                disabled={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2 justify-start items-start">
                                        <label className={`font-medium`}>Units</label>
                                        <div className="flex w-full gap-2 justify-start items-start">
                                            <Select 
                                                className='w-full'
                                                options={unitOptions}
                                                value={{ 
                                                    value: optionalEvaluators.school_minimum_time_evaluator_knows_applicant.units,
                                                    label: optionalEvaluators.school_minimum_time_evaluator_knows_applicant.units
                                                }}
                                                onChange={handleUnits}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                                        borderRadius: 8,
                                                    }),
                                                    valueContainer: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        padding: '7px 16px',
                                                    })
                                                }}
                                                isDisabled={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        
                    </div>

                    <div className='w-full p-6 flex justify-end items-center gap-3 border-t border-outline'>
                        <Button 
                            label="Cancel"
                            action={(e:any) => togglePopup(e)}
                            type='default'
                            styling="outline"
                        />
                        <Button 
                            label={`${selectedEvalArrItem ? 'Edit' : 'Add'} Optional Evaluator`}
                            action={handleSubmit}
                            type='primary'
                            styling="solid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}