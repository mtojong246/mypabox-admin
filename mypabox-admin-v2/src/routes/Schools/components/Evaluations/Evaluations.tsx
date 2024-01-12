import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import EvaluationsRequired from "./EvaluationsRequired";
import EvaluationsRecommended from "./EvaluationsRecommended";
import { UserObject } from "../../../../types/users.types";





export default function Evaluations({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean}) {
    
    return (
        <>
        {newSchool && (
            <>
                <EvaluationsRequired newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <EvaluationsRecommended newSchool={newSchool} setNewSchool={setNewSchool}  loggedInUser={loggedInUser} isEdit={isEdit}/>
            </>
        )}
        </>
    )
}