import { MouseEvent, ReactNode } from "react"

export default function Button({
    type,
    style,
    label,
    action,
    adornment,
}: {
    type: 'warning' | 'primary' | 'success' | 'disable',
    style: 'outline' | 'solid',
    label: string,
    action: (e: MouseEvent<HTMLButtonElement>) => void,
    adornment?: ReactNode,
}) {
    return (
        <>
        {type === 'warning' ? (
            <button onClick={action} className={`flex justify-center items-center gap-2 rounded-lg border-warning transition-all ${style === 'outline' ? 'bg-none hover:bg-warning text-warning hover:text-white' : 'bg-warning text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'primary' ? (
            <button onClick={action} className={`flex justify-center items-center gap-2 rounded-lg border-primary transition-all ${style === 'outline' ? 'bg-none hover:bg-primary text-primary hover:text-white' : 'bg-primary text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : type === 'success' ? (
            <button onClick={action} className={`flex justify-center items-center gap-2 rounded-lg border-success transition-all ${style === 'outline' ? 'bg-none hover:bg-success text-success hover:text-white' : 'bg-success text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        ) : (
            <button disabled onClick={action} className={`flex justify-center items-center gap-2 rounded-lg border-disable transition-all ${style === 'outline' ? 'bg-none hover:bg-disable text-disable hover:text-white' : 'bg-disable text-white hover:brightness-90'}`}>
                {adornment && <div className="w-[14px]">{adornment}</div>}
                <p>{label}</p>
            </button>
        )}
        </>
    )
}