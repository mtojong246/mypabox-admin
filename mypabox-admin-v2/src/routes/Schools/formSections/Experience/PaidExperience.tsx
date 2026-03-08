import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NewSchool } from "../../../../types/newSchools.types"
import { UserPermissions } from "../../../../types/users.types"



export default function PaidExperience({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions,
    paidExperience,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions,
    paidExperience: any,
}) {
    const { original, draft, changes, link } = paidExperience;
    const [ tabs, setTabs ] = useState<{
        [key: string]: string[]
    }>({
        school_paid_experience_required: [],
    });

    useEffect(() => {

    })

    return (
        <></>
    )
}