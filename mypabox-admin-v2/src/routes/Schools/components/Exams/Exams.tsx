import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import RequiredOptionalExams from "./RequiredOptionalExams";
import GRE from "./GRE";
import PACAT from "./PACAT";
import Casper from "./Casper";
import EnglishExams from "./EnglishExams";
import { UserObject } from "../../../../types/users.types";
import ReactQuill from "react-quill";

export default function Exams({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_exams_general_note: e,
        })
    };

    return (
        <>
        {newSchool && (
            <>
                <RequiredOptionalExams newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <GRE newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <PACAT newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <Casper newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <EnglishExams newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>

                <div className={`mt-28 text-xl w-full`}>
                    <p>Exams General Notes</p>
                    <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_exams_general_note} 
                    onChange={handleQuill}/>
                </div>
            </>
        )}
        </>
    )
}