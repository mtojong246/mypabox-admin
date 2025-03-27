import { InputAdornment, OutlinedInput } from "@mui/material"
import { ChangeEvent, ReactNode } from "react"
import { ReactComponent as ExternalLinkIcon } from '../../Icons/External-Link.svg';

export default function TextInput({
    label,
    placeholder,
    name,
    value,
    path,
    handleInput,
    isRequired,
    startingAdornment,
    link
}: {
    label: string,
    placeholder: string,
    name: string,
    value: string | number,
    path: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
    isRequired: boolean,
    startingAdornment?: ReactNode,
    link?: string,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <OutlinedInput
                type='text'
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
        </div>
    )
}