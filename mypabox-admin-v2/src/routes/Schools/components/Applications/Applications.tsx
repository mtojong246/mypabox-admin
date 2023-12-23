import { School} from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect } from "react"

import ApplicationsCaspa from "./ApplicationsCaspa";
import ApplicationsDirectly from "./ApplicationsDirectly";
import SupplementalApplications from "./SupplementalApplications";
import { UserObject } from "../../../../types/users.types";

// school_application_submitted_on_caspa: {
//     input: false,
//     school_caspa_application_deadline_date: null,
//     school_caspa_application_deadline_type: null,
//     school_caspa_application_notes: [],
// },

// school_application_submitted_directly_to_school: {
//     input: false,
//     school_application_direct_to_school_deadline: null,
//     school_application_direct_to_school_fee: null,
//     school_application_direct_to_school_notes: [],
// },

export default function Applications({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    return (
        <>
            {(<ApplicationsCaspa newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>)}
            {(<ApplicationsDirectly newSchool={newSchool} setNewSchool={setNewSchool}/>)}
            <SupplementalApplications newSchool={newSchool} setNewSchool={setNewSchool}/>
        </>
    )
}