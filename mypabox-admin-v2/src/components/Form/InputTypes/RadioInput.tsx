import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { ChangeEvent, MouseEvent } from "react"
import { Change } from "../../../types/newSchools.types"
import ChangePopup from "../Validation/ChangePopup"

export default function RadioInput({
    label,
    name,
    value,
    path,
    handleInput,
    options,
    isRequired,
    isDisabled,
    change,
    validateIndividualChange,
    revertIndividualChange,

}: {
    label: string,
    name: string,
    value: string | number,
    path: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    options: {
        label: string,
        value: string,
    }[],
    isRequired: boolean,
    isDisabled: boolean,
    change?: Change,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <div className="flex w-full gap-2 justify-start items-start">
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                {options.length > 0 && options.map(option => (
                    <FormControlLabel 
                        onChange={(e:any) => handleInput(e, path)} 
                        value={option.value} 
                        name={name} 
                        checked={value === option.value ? true : false} 
                        control={<Radio />} 
                        label={option.label} 
                        disabled={isDisabled}
                    />
                ))}
                </RadioGroup>
                {change && (
                    <ChangePopup 
                        change={change}
                        name={name}
                        validateIndividualChange={validateIndividualChange}
                        revertIndividualChange={revertIndividualChange}
                    />
                )}
            </div>
        </div>
    )
}