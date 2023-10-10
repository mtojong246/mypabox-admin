import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import EvaluationsRequired from "./EvaluationsRequired";
import EvaluationsRecommended from "./EvaluationsRecommended";





export default function Evaluations({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>}) {
    
    return (
        <>
        {newSchool && (
            <>
                <EvaluationsRequired newSchool={newSchool} setNewSchool={setNewSchool} />
                <EvaluationsRecommended newSchool={newSchool} setNewSchool={setNewSchool} />
            </>
        )}
        </>
    )
}