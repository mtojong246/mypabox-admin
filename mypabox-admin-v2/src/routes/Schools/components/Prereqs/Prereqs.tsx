import { Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";
import RequiredCourses from "./RequiredCourses";
import RequiredOptionalCourses from "./RequiredOptionalCourses";
import RequiredCourseCategories from "./RequiredCourseCategories";
import RecommendedCourses from "./RecommendedCourses";
import MinimumGrade from "./MinimumGrade";
import TimeFrameCriteria from "./TimeFrameCriteria";
import BooleanInputs from "./BooleanInputs";
import CompleteConditions from "./CompleteConditions";
import { UserObject } from "../../../../types/users.types";


export default function Prereqs({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    return (
        <>
        {newSchool && (
            <>
                <RequiredCourses  loggedInUser={loggedInUser} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredOptionalCourses loggedInUser={loggedInUser} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredCourseCategories newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit} />
                <RecommendedCourses newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <MinimumGrade newSchool={newSchool} setNewSchool={setNewSchool}loggedInUser={loggedInUser} isEdit={isEdit}/>
                <TimeFrameCriteria newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <BooleanInputs newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <CompleteConditions newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
            </>
        )}
        </>
    )
}