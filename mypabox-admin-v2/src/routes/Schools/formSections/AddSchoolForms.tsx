import { Dispatch, SetStateAction, useEffect } from "react"
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
import { useSelector } from "react-redux"
import { selectIsEditSchool } from "../../../app/selectors/selectedSchool.selectors"



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
    const isEditSchool = useSelector(selectIsEditSchool);
    
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [])

    return (
        <form className={`flex flex-col gap-10 p-8 justify-start items-start`}>
            <>
                {tab === '#general-info' ? (
                    <GeneralInformation 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                    />
                ) : tab === '#degree-info' ? (
                    <DegreeInformation
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                    />
                ) : tab === '#accreditation-status' ? (
                   <AccreditationStatus 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#mission-statement' ? (
                    <MissionStatement 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#tuition' ? (
                    <Tuition 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#pance-pass-rate' ? (
                    <PANCEPassRate 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#GPA' ? (
                    <GPA 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#prerequisites' ? (
                    <Prerequisites 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#experience' ? (
                    <Experience 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#pa-shadowing' ? (
                    <PAShadowing 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#exams' ? (
                    <Exams 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#evaluations' ? (
                    <Evaluations 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#international-students' ? (
                    <InternationalStudents 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#certifications' ? (
                    <Certifications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#applications' ? (
                    <Applications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : tab === '#preference' ? (
                    <Preference 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={isEditSchool}
                        showChangesOnly={showChangesOnly}
                   />
                ) : (
                    <></>
                )}
            </>
        </form>
    )
}