import Button from "../../../../../components/Buttons/Button";
import { Change, GenericSchoolField } from "../../../../../types/newSchools.types";
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { ChangeEvent } from "react";
import IconButton from "../../../../../components/Buttons/IconButton";
import { UserPermissions } from "../../../../../types/users.types";


export default function RequiredCertificationFields({
    tab,
    field,
    inputPath,
    handleRetrieveValue,
    inputValues,
    schoolField,
    isDisabled,
    handleInput,
    handleAdd,
    handleRemove,
    validateIndividualChange,
    revertIndividualChange,
    permissions
}: {
    tab: 'original' | 'modified',
    field: {
        label: string;
        name: string;
        type: string;
        path: string;
        notePath?: string;
    },
    inputPath: string,
    handleRetrieveValue:(path: string, field: GenericSchoolField) => {
        originalValue: any;
        originalDraftValue: any;
    },
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    inputValues: any[],
    schoolField: GenericSchoolField,
    isDisabled: boolean,
    handleAdd: (e:any, name: string, path: string) => void,
    handleRemove: (e:any, name: string, path: string, index: number) => void,
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    permissions: UserPermissions
}) {

    const checkIfValueHasBeenRemoved = (path: string) => {
        const change = schoolField.changes.find(change => change.path === path);

        if (change && change.type === 'removed') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className="text-default font-medium">{field.label}:</label>
            <>
                {inputValues.length > 0 && inputValues.map((val,i) => {
                    const arrayInputPath = `${inputPath}.${i}.value`
                    const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                    let textValue = '';

                    if (tab === 'original') {
                        textValue = textInput.originalValue;
                    } else {
                        textValue = textInput.originalDraftValue;
                    }

                    const change = schoolField.changes.find(change => change.path === `${inputPath}.${i}`);

                    const toBeRemoved = checkIfValueHasBeenRemoved(`${inputPath}.${i}`);

                    return (
                        <div className="w-full flex gap-4 justify-start items-start">
                            <div className="flex w-full gap-2 justify-start items-start">
                                <div className={`${toBeRemoved && tab === 'modified' && 'opacity-50'} flex gap-4 p-6 border border-outline w-full rounded-lg`}>
                                    <TextInput 
                                        label="Certification"
                                        placeholder="Certification"
                                        name={field.name}
                                        value={textValue ? textValue : ''}
                                        path={arrayInputPath}
                                        handleInput={handleInput}
                                        isRequired={false}
                                        type="text"
                                        isDisabled={isDisabled}
                                        change={schoolField.changes.find(change => change.path === arrayInputPath)}
                                        validateIndividualChange={validateIndividualChange}
                                        revertIndividualChange={revertIndividualChange}
                                        permissions={permissions}
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
                            {tab === 'modified' && toBeRemoved ? (
                                <></>
                            ) : (
                                <IconButton 
                                    icon={<DeleteIcon/>}
                                    action={(e:any) => handleRemove(e, field.name, inputPath, i)}
                                    color="warning"
                                    isDisabled={isDisabled}
                                />
                            )}
                            
                        </div>
                    )
                    
                })}
            <div className="mt-2">
                <Button 
                    type={isDisabled ? 'disable' : 'primary'}
                    styling="outline"
                    label={`Add Certification`}
                    action={(e:any) => handleAdd(e, field.name, inputPath)}
                    adornment={<PlusIcon/>}
                />
            </div>
            </>
        </div>
    )
}