import { Switch } from "@mui/material"
import { ChangeEvent, MouseEvent } from "react"
import { Change } from "../../../types/newSchools.types"
import ChangePopup from "../Validation/ChangePopup"

export default function BooleanInput({
    label,
    name,
    value,
    path,
    handleCheck,
    isRequired,
    isDisabled,
    change,
    validateIndividualChange,
    revertIndividualChange
}: {
    label: string,
    name: string,
    value: boolean,
    path: string,
    handleCheck: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
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
                <label htmlFor={name} className="flex justify-start items-center gap-4 px-4 h-[47px] border border-outline rounded-lg">
                    <Switch 
                        id={name}
                        name={name}
                        checked={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheck(e, path)}
                        disabled={isDisabled}
                    />
                    {value ? 'True' : 'False'}
                </label>
                {change && validateIndividualChange && revertIndividualChange && (
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