import Button from "../../../../../components/Buttons/Button";
import { Change, GenericSchoolField } from "../../../../../types/newSchools.types";
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import { ReactComponent as PlusIcon } from '../../../../../components/Icons/Plus.svg';
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import IconButton from "../../../../../components/Buttons/IconButton";
import { UserPermissions } from "../../../../../types/users.types";

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
    permissions
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
        <div className="w-full flex flex-col gap-4 justify-start items-start">
            <label className="text-default">{associatedField.label}</label>
            {inputValues.length > 0 && inputValues.map((val,i) => {
                const arrayInputPath = `${inputPath}.${i}.value`
                const textInput = handleRetrieveValue(arrayInputPath, schoolField);
                let arrayInputValue: any = '';
                if (tab === 'original') {
                    arrayInputValue = textInput.originalValue;
                } else {
                    arrayInputValue = textInput.originalDraftValue;
                }
                const change = schoolField.changes.find(change => change.path === `${inputPath}.${i}`);
                const toBeRemoved = checkIfValueHasBeenRemoved(`${inputPath}.${i}`);

                return (
                <div className="w-full flex gap-4 justify-start items-start">
                    <div className="flex w-full gap-2 justify-start items-start">
                        <div className={`${toBeRemoved && tab === 'modified' && 'opacity-50'} flex gap-4 p-6 border border-outline w-full rounded-lg`}>
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
                                permissions={permissions}
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
                        {tab === 'modified' && toBeRemoved ? (
                            <></>
                        ) : (
                            <IconButton 
                                icon={<DeleteIcon/>}
                                action={(e:any) => handleRemove(e, name, inputPath, i)}
                                color="warning"
                                isDisabled={isDisabled}
                            />
                        )}
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