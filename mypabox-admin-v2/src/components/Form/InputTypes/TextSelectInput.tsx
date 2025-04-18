import { OutlinedInput } from '@mui/material';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import Select from 'react-select';
import { Change, GenericSchoolField } from '../../../types/newSchools.types';
import ChangePopup from '../Validation/ChangePopup';

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};

export default function TextSelectInput({
    label,
    placeholder,
    name,
    value,
    inputPath,
    selectPath,
    handleChange,
    options,
    schoolField,
    validateIndividualChange,
    revertIndividualChange,
    isDisabled,
}: {
    label: string,
    placeholder: string,
    name: string,
    value: {
        quantity: number,
        units: string,
    },
    inputPath: string,
    selectPath: string,
    handleChange: (name: string, path: string, value: string | number) => void,
    options: { value: string, label: string }[],
    schoolField: GenericSchoolField,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    isDisabled: boolean,
}) {
    const [ units, setUnits ] = useState('');
    const [ quantity, setQuantity ] = useState(0);

    const [ inputChange, setInputChange ] = useState<Change | null>(null);
    const [ selectChange, setSelectChange ] = useState<Change | null>(null);

    useEffect(() => {
        const input = schoolField.changes.find(change => change.path === inputPath);
        const select = schoolField.changes.find(change => change.path === selectPath);

        if (input) {
            setInputChange(input);
        }

        if (select) {
            setSelectChange(select);
        }
    }, [schoolField.changes, inputPath, selectPath]);

    useEffect(() => {
        setUnits(value.units);
        setQuantity(value.quantity);
    }, [value]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
        handleChange(name, inputPath, Number(e.target.value));
    }

    const handleSelect = (e: any) => {
        setUnits(e.value);
        handleChange(name, selectPath, e.value);
    }

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            <label className="font-medium">{label}</label>
            <div className='flex gap-4 p-6 border border-outline rounded-lg w-full'>
                <div className="w-full flex flex-col gap-2 justify-start items-start">
                    <label className={`font-medium`}>Quantity</label>
                    <div className="flex w-full gap-2 justify-start items-start">
                        <OutlinedInput
                            type='text'
                            placeholder={placeholder}
                            name={name}
                            value={quantity ? quantity : ''}
                            onChange={handleInput}
                            sx={{
                                maxWidth: 600,
                                width: '100%',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-input': {
                                    padding: '12px 16px',
                                }
                            }}
                            disabled={isDisabled}
                        />
                        {inputChange && (
                            <ChangePopup 
                                change={inputChange}
                                name={name}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 justify-start items-start">
                    <label className={`font-medium`}>Units</label>
                    <div className="flex w-full gap-2 justify-start items-start">
                        <Select 
                            className='w-full'
                            options={options}
                            value={!units ? null : { value: units, label: units }}
                            onChange={handleSelect}
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
                            isDisabled={isDisabled}
                        />
                        {selectChange && (
                            <ChangePopup 
                                change={selectChange}
                                name={name}
                                validateIndividualChange={permissions.canVerify ? validateIndividualChange : undefined}
                                revertIndividualChange={revertIndividualChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}