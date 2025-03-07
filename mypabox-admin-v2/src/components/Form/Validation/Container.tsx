import { ReactNode, useState, MouseEvent } from "react"
import Tabs from "./Tabs";

export default function Container({
    label,
    originalInputs,
    modifiedInputs,
}: {
    label: string,
    originalInputs: ReactNode,
    modifiedInputs?: ReactNode,
}) {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const tabs = [ 'Modified', 'Original' ];

    return (
        <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="flex justify-between items-center gap-2">
                <label className="text-[18px] font-semibold">{label}</label>
            </div>

            <div className="flex flex-col justify-start items-start rounded-lg overflow-hidden w-full">
                {modifiedInputs && <Tabs 
                    tabs={tabs.map((tab,i) => ({
                        label: tab,
                        action: (e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setSelectedIndex(i);
                        }
                    }))}
                    selectedIndex={selectedIndex}
                />}
                <div className={`${!modifiedInputs && 'rounded-tl-lg'} border border-outline rounded-tr-lg rounded-br-lg rounded-bl-lg p-6 w-full max-w-[600px]`}>
                    {modifiedInputs && tabs[selectedIndex] === 'Modified' ? (
                        <>{modifiedInputs}</>
                    ) : (
                        <>{originalInputs}</>
                    )}
                </div>
            </div>

        </div>
    )
}