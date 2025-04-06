import { ReactNode } from "react"

export default function IconButton({
    icon,
    action,
    color,
    isDisabled,
}: {
    icon: ReactNode,
    action: (e: React.MouseEvent<HTMLButtonElement>) => void,
    color: 'primary' | 'warning',
    isDisabled: boolean,
}) {
    return (
        <>
        {isDisabled ? (
        <button 
            onClick={action}
            disabled
            className={`w-[28px] aspect-square rounded flex justify-center items-center text-placeholder bg-placeholder/[0.1] opacity-50`}
         >   
             <div className="w-[16px]">{icon}</div>
         </button>
        ) : (  
        <button 
            onClick={action}
            className={`${color === 'primary' ? 'text-primary bg-primary/[0.1]' : 'text-warning bg-warning/[0.1]'} hover:brightness-90 transition-all w-[28px] aspect-square rounded flex justify-center items-center`}
        >   
            <div className="w-[16px]">{icon}</div>
        </button>
        )}
        </>
    )
}