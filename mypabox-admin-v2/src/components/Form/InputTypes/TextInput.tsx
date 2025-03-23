import { InputAdornment, OutlinedInput } from "@mui/material"
import { ChangeEvent, ReactNode } from "react"

export default function TextInput({
    label,
    placeholder,
    name,
    value,
    path,
    handleInput,
    isRequired,
    startingAdornment,
    endingAdornment
}: {
    label: string,
    placeholder: string,
    name: string,
    value: string | number,
    path: string,
    handleInput: (e: ChangeEvent<HTMLInputElement>, path: string) => void,
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
                endAdornment={endingAdornment}
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