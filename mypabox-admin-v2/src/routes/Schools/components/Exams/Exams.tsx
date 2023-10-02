import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import RequiredOptionalExams from "./RequiredOptionalExams";
import GRE from "./GRE";
import PACAT from "./PACAT";
import Casper from "./Casper";
import EnglishExams from "./EnglishExams";

export default function Exams({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    return (
        <>
        {newSchool && (
            <>
                <RequiredOptionalExams />
                <GRE newSchool={newSchool} setNewSchool={setNewSchool}/>
                <PACAT />
                <Casper />
                <EnglishExams />
            </>
        )}
        </>
    )
}