import { Tab, Tabs } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function SchoolFieldTabs({
    selectedIndex,
    setSelectedIndex,
    tabs,
}: {
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    tabs: string[];
}) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedIndex(newValue);
      };

    return (
        <div className="flex justify-start items-stretch border-b border-outline w-full">
            <Tabs
                value={selectedIndex}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                {tabs.map((tab,i) => (
                    <Tab 
                        value={i} 
                        label={tab} 
                        sx={{
                            padding: '24px'
                        }}
                    />
                ))}
            </Tabs>
        </div>
    )
}