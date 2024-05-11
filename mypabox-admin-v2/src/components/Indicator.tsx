import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";

export default function Indicator({ label, editedInput }: { label: string, editedInput: any | null }) {
    return (
        <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">
            {label}
            <PiCheckCircle className={`h-5 w-5 ml-[2px] ${editedInput === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} />
            <PiWarningCircle className={`h-5 w-5 ml-[2px] ${editedInput !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/>
        </label>
        
    )
}