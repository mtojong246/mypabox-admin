import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NewSchool } from "../../../types/newSchools.types"
import GeneralInformation from "./GeneralInformation/GeneralInformation"
import DegreeInformation from "./DegreeInformation/DegreeInformation"
import AccreditationStatus from "./AccreditationStatus/AccreditationStatus"
import MissionStatement from "./MissionStatement/MissionStatement"
import Tuition from "./Tuition/Tuition"
import PANCEPassRate from "./PANCEPassRate/PANCEPassRate"
import GPA from "./GPA/GPA"
import Preference from "./Preference/Preference"
import InternationalStudents from "./InternationalStudents/InternationalStudents"
import Certifications from "./Certifications/Certifications"
import Evaluations from "./Evaluations/Evaluations"
import PAShadowing from "./PAShadowing/PAShadowing"
import Experience from "./Experience/Experience"
import Applications from "./Applications/Applications"
import Exams from "./Exams/Exams"
import Prerequisites from "./Prerequisites/Prerequisites"
import { useDispatch, useSelector } from "react-redux"
import { selectIsEditSchool } from "../../../app/selectors/selectedSchool.selectors"
import { getAllUsers } from "../../../utils/firebase/firebase.utils"
import { UserObject, UserPermissions } from "../../../types/users.types"
import { setUsers } from "../../../app/slices/users"
import { selectUsers } from "../../../app/selectors/users.selectors"
import { selectLogin } from "../../../app/selectors/login.selector"

const defaultPermissions = {
    canEditWithVerificationNeeded: false,
    canEditWithoutVerificationNeeded: true,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};


export default function AddSchoolForms({
    tab,
    school,
    setSchool,
    showChangesOnly,
}: {
    tab: string,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
    showChangesOnly: boolean,
}) {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const login = useSelector(selectLogin);
    const isEditSchool = useSelector(selectIsEditSchool);
    const [ permissions, setPermissions ] = useState<UserPermissions>(defaultPermissions);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                let userData: UserObject[] = [];
                if (allUsers) {
                    allUsers.forEach(user => (
                        userData.push({
                            id: user.id,
                            displayName: user.data.displayName,
                            email: user.data.email,
                            isSuperAdmin: user.data.isSuperAdmin,
                            permissions: user.data.permissions,
                            activeTasks: user.data.activeTasks,
                            completedTasks: user.data.completedTasks,
                            archivedTasks: user.data.archivedTasks,
                        })
                    )) 
                    dispatch(setUsers(userData))
                }
    
            } catch (error: any) {
                console.log(error);
            }
        }
    
        fetchUsers();
    
    }, [dispatch]);

    useEffect(() => {
        if (users.length > 0 && login) {
            const currentUser = users.find(user => user.email === login);

            if (currentUser) {
                setPermissions(currentUser.permissions);
            } 
        }
    }, [users, login]);
    
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, []);

    return (
        <form className={`flex flex-col gap-10 p-8 justify-start items-start`}>
            <>
                {tab === '#general-info' ? (
                    <GeneralInformation 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                    />
                ) : tab === '#degree-info' ? (
                    <DegreeInformation
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                    />
                ) : tab === '#accreditation-status' ? (
                   <AccreditationStatus 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#mission-statement' ? (
                    <MissionStatement 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#tuition' ? (
                    <Tuition 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#pance-pass-rate' ? (
                    <PANCEPassRate 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#GPA' ? (
                    <GPA 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#prerequisites' ? (
                    <Prerequisites 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#experience' ? (
                    <Experience 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#pa-shadowing' ? (
                    <PAShadowing 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#exams' ? (
                    <Exams 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#evaluations' ? (
                    <Evaluations 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#international-students' ? (
                    <InternationalStudents 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#certifications' ? (
                    <Certifications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#applications' ? (
                    <Applications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : tab === '#preference' ? (
                    <Preference 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                        permissions={permissions}
                   />
                ) : (
                    <></>
                )}
            </>
        </form>
    )
}