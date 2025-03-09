import { Switch } from "@mui/material"
import { ChangeEvent } from "react"

export default function BooleanInput({
    label,
    name,
    value,
    path,
    handleCheck,
    isRequired,
    isDisabled,
}: {
    label: string,
    name: string,
    value: boolean,
    path: string,
    handleCheck: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    isRequired: boolean,
    isDisabled: boolean,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
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
        </div>
    )
}