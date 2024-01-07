import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import RequiredOptionalExams from "./RequiredOptionalExams";
import GRE from "./GRE";
import PACAT from "./PACAT";
import Casper from "./Casper";
import EnglishExams from "./EnglishExams";
import { UserObject } from "../../../../types/users.types";

export default function Exams({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    return (
        <>
        {newSchool && (
            <>
                <RequiredOptionalExams newSchool={newSchool} setNewSchool={setNewSchool}/>
                <GRE newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <PACAT newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <Casper newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <EnglishExams newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
            </>
        )}
        </>
    )
}