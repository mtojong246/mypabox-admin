import Select, { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Change } from '../../../types/newSchools.types';
import { MouseEvent } from 'react';
import ChangePopup from '../Validation/ChangePopup';
import { UserPermissions } from '../../../types/users.types';


interface ColorOptions {value: string | number, label: string | number, color?: string, focus?: string}


export default function SelectInput({
    label,
    placeholder,
    name,
    value,
    path,
    handleSelect,
    isRequired,
    isCreatable,
    options,
    change,
    validateIndividualChange,
    revertIndividualChange,
    isDisabled,
    colorStyles,
    permissions
}: {
    label: string,
    placeholder: string,
    name: string,
    value: { value: string | number, label: string | number, color?: string, focus?: string },
    path: string,
    handleSelect: (e: any, name: string, path: string) => void,
    isRequired: boolean,
    isCreatable: boolean,
    options: { value: string | number, label: string | number, color?: string, focus?: string }[],
    change?: Change,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    isDisabled: boolean,
    colorStyles?: StylesConfig<ColorOptions>,
    permissions: UserPermissions
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <div className="flex w-full gap-2 justify-start items-start">
                <>
                {isCreatable ? (
                <CreatableSelect 
                    isDisabled={isDisabled}
                    className='w-full max-w-[600px]'
                    options={options}
                    value={!value.value.toString() ? null : value}
                    onChange={(e:any) => handleSelect(e, name, path)}
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
                        ...colorStyles,
                    }}
                />
                ) : (
                <Select 
                    isDisabled={isDisabled}
                    className='w-full max-w-[600px]'
                    options={options}
                    value={!value.value.toString() ? null : value}
                    onChange={(e:any) => handleSelect(e, name, path)}
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
                        ...colorStyles,
                    }}
                />
                )}
                </>
                {change && (
                    <ChangePopup 
                        change={change}
                        name={name}
                        validateIndividualChange={permissions.canVerify ? validateIndividualChange : undefined}
                        revertIndividualChange={revertIndividualChange}
                    />
                )}
            </div>
        </div>
    )
}