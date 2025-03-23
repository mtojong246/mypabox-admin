import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { ChangeEvent } from "react"

export default function RadioInput({
    label,
    name,
    value,
    path,
    handleInput,
    options,
    isRequired,

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

}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
            {options.length > 0 && options.map(option => (
                <FormControlLabel onChange={(e:any) => handleInput(e, path)} value={option.value} name={name} checked={value === option.value ? true : false} control={<Radio />} label={option.label} />
            ))}
            </RadioGroup>
    
        </div>
    )
}