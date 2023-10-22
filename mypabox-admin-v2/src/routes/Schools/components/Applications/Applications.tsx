import { School} from "../../../../types/schools.types";
import { Dispatch, SetStateAction} from "react"

import ApplicationsCaspa from "./ApplicationsCaspa";
import ApplicationsDirectly from "./ApplicationsDirectly";
import SupplementalApplications from "./SupplementalApplications";

export default function Applications({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    return (
        <>
            <ApplicationsCaspa newSchool={newSchool} setNewSchool={setNewSchool} />
            <ApplicationsDirectly newSchool={newSchool} setNewSchool={setNewSchool}/>
            <SupplementalApplications newSchool={newSchool} setNewSchool={setNewSchool}/>

        </>
    )
}