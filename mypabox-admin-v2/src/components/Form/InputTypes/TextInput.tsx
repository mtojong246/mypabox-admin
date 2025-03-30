import { InputAdornment, OutlinedInput } from "@mui/material"
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode, MouseEvent } from "react"
import { ReactComponent as ExternalLinkIcon } from '../../Icons/External-Link.svg';
import { Change } from "../../../types/newSchools.types";
import ChangePopup from "../Validation/ChangePopup";

export default function TextInput({
    label,
    placeholder,
    name,
    value,
    path,
    handleInput,
    isRequired,
    startingAdornment,
    link,
    type,
    change,
    validateIndividualChange,
    revertIndividualChange
}: {
    label: string,
    placeholder: string,
    name: string,
    value: string | number,
    path: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    isRequired: boolean,
    startingAdornment?: ReactNode,
    type: HTMLInputTypeAttribute,
    link?: string,
    change?: Change,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <div className="flex w-full gap-2 justify-start items-start">
                <OutlinedInput
                    type={type}
                    placeholder={placeholder}
                    startAdornment={
                        startingAdornment ? 
                        <InputAdornment
                            position="start"
                            sx={{
                                width: 16,
                                height: 16,
                                color: '#A2A0A2',
                            }}
                        >
                            {startingAdornment}
                        </InputAdornment>
                        : undefined
                    }
                    endAdornment={
                        link ? 
                        <InputAdornment
                            position="end"
                        >
                            <a href={link} rel="noreferrer" target="_blank" className="w-[18px] text-placeholder hover:text-primary transition-all">
                                <ExternalLinkIcon />
                            </a>
                        </InputAdornment>
                        : undefined
                    }
                    name={name}
                    value={value ? value : ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e, path)}
                    sx={{
                        maxWidth: 600,
                        width: '100%',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-input': {
                            padding: '12px 16px',
                        }
                    }}
                />
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