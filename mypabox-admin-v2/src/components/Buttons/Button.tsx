import { MouseEvent, ReactNode } from "react"

export default function Button({
    type,
    styling,
    label,
    action,
    adornment,
}: {
    type: 'warning' | 'primary' | 'success' | 'disable',
    styling: 'outline' | 'solid',
    label: string,
    action: (e: MouseEvent<HTMLButtonElement>) => void,
    adornment?: ReactNode,
}) {
    return (
        <>
        {type === 'warning' ? (
            <button onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-warning transition-all ${styling === 'outline' ? 'bg-none hover:bg-warning text-warning hover:text-white' : 'bg-warning text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'primary' ? (
            <button onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-primary transition-all ${styling === 'outline' ? 'bg-none hover:bg-primary text-primary hover:text-white' : 'bg-primary text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'success' ? (
            <button onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 rounded-lg border border-success transition-all ${styling === 'outline' ? 'bg-none hover:bg-success text-success hover:text-white' : 'bg-success text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : (
            <button onClick={action} className={`py-3 px-4 flex justify-center items-center gap-2 border rounded-lg border-disable transition-all ${styling === 'outline' ? 'bg-none hover:bg-disable text-disable hover:text-white' : 'bg-disable text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        )}
        </>
    )
}