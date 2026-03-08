import { Tab, Tabs } from "@mui/material";

export default function FieldTabs({
    selectedIndex,
    modifyIndex,
    tabs,
    name,
}: {
    selectedIndex: number,
    modifyIndex: (name: string, newIndex: number) => void,
    tabs: string[];
    name: string;
}) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        modifyIndex(name, newValue);
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