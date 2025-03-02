import { OutlinedInput } from "@mui/material"
import { ChangeEvent, ReactNode } from "react"

export default function TextInput({
    label,
    placeholder,
    name,
    value,
    handleInput,
    isRequired,
    startingAdornment,
    endingAdornment
}: {
    label: string,
    placeholder: string,
    name: string,
    value: string | number,
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
    isRequired: boolean,
    startingAdornment?: ReactNode,
    endingAdornment?: ReactNode,
}) {
    return (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className={`font-medium ${isRequired && 'required'}`}>{label}</label>
            <OutlinedInput
                type='text'
                placeholder={placeholder}
                startAdornment={startingAdornment}
                endAdornment={endingAdornment}
                name={name}
                value={value ? value : ''}
                onChange={handleInput}
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