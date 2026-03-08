import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NewNote, NewSchool } from "../../../../types/newSchools.types"
import { UserPermissions } from "../../../../types/users.types"
import { setupValidationInterface, TabsAndIndices } from "../../../../utils/utils.schools";
import FieldContainer from "../../../../components/Form/Validation/FieldContainer";

const defaultTabsAndIndices = {
    school_paid_experience_required: {
        tabs: [],
        selectedIndex: null,
    }
}

export default function PaidExperience({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions,
    paidExperience,
    validateAllRemovals,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions,
    paidExperience: any,
    validateAllRemovals?: (name: string) => {input: any; notes?: NewNote[] | undefined},
}) {
    const { original, draft, changes, link } = paidExperience;
    const [ tabsAndIndices, setTabsAndIndices ] = useState<TabsAndIndices>(defaultTabsAndIndices);

    useEffect(() => {
        const updatedTabs = setupValidationInterface(defaultTabsAndIndices, permissions, changes);
        setTabsAndIndices(updatedTabs);

    }, [changes, permissions]);

    const modifyIndex = (name: string, newIndex: number) => {
        const tabAndIndex = tabsAndIndices[name];
        setTabsAndIndices({
            ...tabsAndIndices,
            [name]: {
                ...tabAndIndex,
                selectedIndex: newIndex,
            }
        })
    } 

    return (
        <>
            <FieldContainer
                name="school_paid_experience_required"
                changes={changes}
                permissions={permissions}
                label="Paid Experience Required"
                tabsAndIndex={tabsAndIndices["school_paid_experience_required"]}
                modifyIndex={modifyIndex}
                link={link}
                school={school}
                setSchool={setSchool}
                validateAllRemovals={validateAllRemovals}
            >
                <></>
            </FieldContainer>
        </>
    )
}