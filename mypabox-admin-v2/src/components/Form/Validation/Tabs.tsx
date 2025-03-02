import { MouseEvent } from "react";

export default function Tabs({
    selectedIndex,
    tabs,
}: {
    selectedIndex: number,
    tabs: {
        label: string,
        action: (e:MouseEvent<HTMLButtonElement>) => void,
    }[]
}) {

    return (
        <div className="flex justify-start items-stretch gap-2 w-full">
            {tabs.map((tab,i) => (
                <button onClick={tab.action} className={`border-t border-l border-r rounded-tl-lg rounded-tr-lg border-outline py-3 px-4 text-[14px] ${selectedIndex === i ? 'bg-outline font-medium' : 'bg-white font-normal'}`}>
                    {tab.label}
                </button>
            ))}
        </div>
    )
}