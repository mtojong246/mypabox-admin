import Button from "../../../../../components/Buttons/Button";
import { Change, GenericSchoolField } from "../../../../../types/newSchools.types";
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { ChangeEvent, useEffect, useState } from "react";
import IconButton from "../../../../../components/Buttons/IconButton";


export default function EmailAndPhoneNumberFields({
    tab,
    field,
    handleRetrieveValue,
    inputValues,
    schoolField,
    isDisabled,
    handleInput,
    handleSelect,
    handleAdd,
    handleRemove,
    validateIndividualChange,
    revertIndividualChange,
    checkIfValueHasBeenRemoved,
}: {
    tab: 'original' | 'modified',
    field: {
        label: string;
        name: string;
        type: string;
        path: string;
        notePath?: string;
    },
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
    handleSelect: (e: any, name: string, path: string) => void,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
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
        if (schoolField !== undefined) {
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
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className="text-default font-medium">{field.name === 'school_email' ? 'Emails:' : 'Phone Numbers:'}</label>
            <>
            {values.length > 0 && values.map((val,i) => {
                const selectPath = `${field.path}.${i}.category`;
                const selectInput = handleRetrieveValue(selectPath, schoolField);

                let inputPath = '';

                if (field.name === 'school_email') {
                    inputPath = `${field.path}.${i}.email`;
                } else {
                    inputPath = `${field.path}.${i}.number`;
                }

                const textInput = handleRetrieveValue(inputPath, schoolField);

                let selectValue = '';
                let textValue = '';

                if (tab === 'original') {
                    selectValue = selectInput.originalValue;
                    textValue = textInput.originalValue;
                } else {
                    selectValue = selectInput.originalDraftValue;
                    textValue = textInput.originalDraftValue;
                }

                const change = schoolField.changes.find(change => change.path === `${field.path}.${i}`)

                return (
                    <div className="w-full flex gap-4 justify-start items-start">
                        <div className="flex w-full gap-2 justify-start items-start">
                            <div className={`${val.toBeRemoved && 'opacity-50'} flex gap-4 p-6 border border-outline w-full rounded-lg`}>
                                <SelectInput 
                                    label="Category"
                                    placeholder="Category"
                                    name={field.name}
                                    value={{ value: selectValue ? selectValue : '', label: selectValue ? selectValue : '' }}
                                    path={selectPath}
                                    handleSelect={handleSelect}
                                    options={[{value: 'Main', label: 'Main'}]}
                                    isRequired={false}
                                    isCreatable={true}
                                    change={schoolField.changes.find(change => change.path === selectPath)}
                                    validateIndividualChange={validateIndividualChange}
                                    revertIndividualChange={revertIndividualChange}
                                    isDisabled={isDisabled}
                                />
                                <TextInput 
                                    label={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                    placeholder={field.name === 'school_email' ? 'Email Address' : 'Phone Number'}
                                    name={field.name}
                                    value={textValue ? textValue : ''}
                                    path={inputPath}
                                    handleInput={handleInput}
                                    isRequired={false}
                                    type="text"
                                    change={schoolField.changes.find(change => change.path === inputPath)}
                                    validateIndividualChange={validateIndividualChange}
                                    revertIndividualChange={revertIndividualChange}
                                    isDisabled={isDisabled}
                                />
                            </div>
                            {change && (
                                <ChangePopup 
                                    change={change}
                                    name={field.name}
                                    validateIndividualChange={validateIndividualChange}
                                    revertIndividualChange={revertIndividualChange}
                                />
                            )}
                        </div>
                        <IconButton 
                            icon={<DeleteIcon/>}
                            action={(e:any) => handleRemove(e, field.name, field.path, i)}
                            color="warning"
                            isDisabled={isDisabled}
                        />
                    </div>
                )
                
            })}
            <div className="mt-2">
                <Button 
                    type={isDisabled ? 'disable' : 'primary'}
                    styling="outline"
                    label={`Add ${field.name === 'school_email' ? 'Email' : 'Phone Number'}`}
                    action={(e:any) => handleAdd(e, field.name, field.path)}
                    adornment={<PlusIcon/>}
                />
            </div>
            </>
        </div>
    )
}