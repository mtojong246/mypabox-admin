import { CircularProgress } from "@mui/material"
import { MouseEvent, ReactNode } from "react"

export default function Button({
    type,
    styling,
    label,
    action,
    adornment,
    value,
    isLoading,
}: {
    type: 'warning' | 'primary' | 'success' | 'disable' | 'default',
    styling: 'outline' | 'solid',
    label: string,
    action: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>,
    adornment?: ReactNode,
    value?: string,
    isLoading?: boolean,
}) {
    return (
        <>
        {type === 'warning' ? (
            <button value={value} onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-warning transition-all ${styling === 'outline' ? 'bg-none hover:bg-warning text-warning hover:text-white' : 'bg-warning text-white hover:brightness-90'}`}>
                {isLoading !== undefined && isLoading && (
                    <CircularProgress size={14} color="inherit"/>
                )}
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'primary' ? (
            <button value={value} onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-primary transition-all ${styling === 'outline' ? 'bg-none hover:bg-primary text-primary hover:text-white' : 'bg-primary text-white hover:brightness-90'}`}>
                {isLoading !== undefined && isLoading && (
                    <CircularProgress size={14} color="inherit"/>
                )}
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'success' ? (
            <button value={value} onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-success transition-all ${styling === 'outline' ? 'bg-none hover:bg-success text-success hover:text-white' : 'bg-success text-white hover:brightness-90'}`}>
                {isLoading !== undefined && isLoading && (
                    <CircularProgress size={14} color="inherit"/>
                )}
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'default' ? (
            <button value={value} onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 border rounded-lg border-outline transition-all ${styling === 'outline' ? 'bg-none text-default hover:text-primary hover:border-primary' : 'bg-disable text-white hover:brightness-90'}`}>
                {isLoading !== undefined && isLoading && (
                    <CircularProgress size={14} color="inherit"/>
                )}
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : (
            <button disabled value={value} onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 border rounded-lg border-outline text-outline opacity-[75]`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        )}
        </>
    )
}