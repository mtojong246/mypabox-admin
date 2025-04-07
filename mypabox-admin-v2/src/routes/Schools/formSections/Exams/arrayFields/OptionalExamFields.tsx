import Button from "../../../../../components/Buttons/Button";
import { Change, GenericSchoolField } from "../../../../../types/newSchools.types";
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { useEffect, useState } from "react";
import IconButton from "../../../../../components/Buttons/IconButton";

const options = [
    {value: 'GRE', label: 'GRE'},
    {value: 'PA-CAT', label: 'PA-CAT'},
    {value: 'MCAT', label: 'MCAT'},
    {value: 'CASPer', label: 'CASPer'}
]

export default function OptionalExamFields({
    tab,
    name,
    associatedField,
    handleRetrieveValue,
    inputValues,
    schoolField,
    isDisabled,
    inputPath,
    handleSelect,
    handleAdd,
    handleRemove,
    validateIndividualChange,
    revertIndividualChange,
    checkIfValueHasBeenRemoved,
}: {
    tab: 'original' | 'modified',
    name: string,
    associatedField: {
        label: string;
        name: string;
        type: string;
        notePath?: string;
    },
    inputPath: string,
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
    handleSelect: (e: any, name: string, path: string) => void,
    inputValues: any[],
    schoolField: GenericSchoolField,
    isDisabled: boolean,
    handleAdd: (e:any, name: string, path: string) => void,
    handleRemove: (e:any, name: string, path: string, index: number) => void,
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
}) {
    const [ values, setValues ] = useState<{
        value: any,
        toBeRemoved: boolean,
    }[]>([]);

    useEffect(() => {
        if (schoolField !== undefined && inputValues) {
            const allChanges = schoolField.changes;

            let flaggedValues: {
                value: any,
                toBeRemoved: boolean,
            }[] = inputValues.map(val => ({ value: val, toBeRemoved: false }));

            if (checkIfValueHasBeenRemoved && tab !== undefined && tab === 'modified') {
                const removedChanges = allChanges.filter(change => change.type === 'removed');
                if (removedChanges.length > 0) {
                    removedChanges.forEach(change => {
                        const keys = change.path.split('.');
                        const index = keys[keys.length-1];
    
                        const originalValue = checkIfValueHasBeenRemoved(change.path, schoolField);
                        if (originalValue !== null) {
                            flaggedValues.splice(Number(index), 0, {
                                value: originalValue,
                                toBeRemoved: true,
                            })
                        }
                    })
                }
            };

            setValues(flaggedValues);

        }
    }, [checkIfValueHasBeenRemoved, inputValues, schoolField, tab]);


    return (
        <div className="w-full flex flex-col gap-4 justify-start items-start">
            <label className="text-default">{associatedField.label}</label>
            {values.length > 0 && values.map((val,i) => {
                const arrayInputPath = `${inputPath}.${i}.value`
                const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                let arrayInputValue: any = '';
                if (tab === 'original') {
                    arrayInputValue = textInput.originalValue;
                } else {
                    arrayInputValue = textInput.originalDraftValue;
                }
                const change = schoolField.changes.find(change => change.path === `${inputPath}.${i}`);

                return (
                <div className="w-full flex gap-4 justify-start items-start">
                    <div className="flex w-full gap-2 justify-start items-start">
                        <div className="flex gap-4 p-6 border border-outline w-full rounded-lg">
                            <SelectInput 
                                label="Exam"
                                placeholder="Exam"
                                name={name}
                                value={{ value: arrayInputValue ? arrayInputValue : '', label: arrayInputValue ? arrayInputValue : '' }}
                                path={arrayInputPath}
                                handleSelect={handleSelect}
                                isRequired={false}
                                isCreatable
                                options={options}
                                isDisabled={isDisabled}
                                change={schoolField.changes.find(change => change.path === arrayInputPath)}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                            />
                            </div>
                            {change && (
                                <ChangePopup 
                                    change={change}
                                    name={name}
                                    validateIndividualChange={validateIndividualChange}
                                    revertIndividualChange={revertIndividualChange}
                                />
                            )}
                        </div>
                        <IconButton 
                            icon={<DeleteIcon/>}
                            action={(e:any) => handleRemove(e, name, inputPath, i)}
                            color="warning"
                            isDisabled={isDisabled}
                        />
                        {/* <div className="py-4 flex justify-center items-end">
                            <button 
                                onClick={(e:any) => handleRemove(e, name, inputPath, i)} 
                                className="w-[24px] text-warning"
                                disabled={isDisabled}
                            >
                                <DeleteIcon/>
                            </button>
                        </div> */}
                    </div>
                )
                
            })}
            <Button 
                type={isDisabled ? 'disable' : 'primary'}
                styling="outline"
                label='Add Optional Exam'
                action={(e:any) => handleAdd(e, name, inputPath)}
                adornment={<PlusIcon/>}
            />
        </div>
    )
}