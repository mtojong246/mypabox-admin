import { ChangeEvent, MouseEvent } from "react";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import ChangePopup from "../../../../../components/Form/Validation/ChangePopup";
import { Change, GenericSchoolField } from "../../../../../types/newSchools.types";

export default function EmailAndPhoneNumber({
    schoolField,
    name,
    path,
    index,
    selectValue,
    selectPath,
    inputValue,
    inputPath,
    handleSelect,
    handleInput,
    handleRemove,
    change,
    validateIndividualChange,
    revertIndividualChange,
    isDisabled,
}: {
    schoolField: GenericSchoolField,
    index: number,
    name: string,
    path: string,
    selectValue: any,
    selectPath: string,
    inputValue: any,
    inputPath: string,
    handleSelect: (e: any, name: string, path: string) => void,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    handleRemove: (e: any, name: string, path: string, index: number) => void,
    change?: Change,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    isDisabled: boolean,
}) {
    return (
        <div className="w-full flex gap-4 justify-start items-start">
            <div className="flex w-full gap-2 justify-start items-start">
                <div className="flex gap-4 p-6 border border-outline w-full rounded-lg">
                    <SelectInput 
                        label="Category"
                        placeholder="Category"
                        name={name}
                        value={{ value: selectValue, label: selectValue }}
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
                        label={name === 'school_email' ? 'Email Address' : 'Phone Number'}
                        placeholder={name === 'school_email' ? 'Email Address' : 'Phone Number'}
                        name={name}
                        value={inputValue}
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
                        name={name}
                        validateIndividualChange={validateIndividualChange}
                        revertIndividualChange={revertIndividualChange}
                    />
                )}
            </div>
            <div className="py-4 flex justify-center items-end">
                <button 
                    onClick={(e:any) => handleRemove(e, name, path, index)} 
                    className="w-[24px] text-warning"
                >
                    <DeleteIcon/>
                </button>
            </div>
        </div>
    )
}