import { Dispatch, SetStateAction } from "react"
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



export default function AddSchoolForms({
    tab,
    school,
    setSchool,
}: {
    tab: string,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {

    return (
        <form className={`flex flex-col gap-10 p-8 justify-start items-start`}>
            <>
                {tab === '#general-info' ? (
                    <GeneralInformation 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                    />
                ) : tab === '#degree-info' ? (
                    <DegreeInformation
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                    />
                ) : tab === '#accreditation-status' ? (
                   <AccreditationStatus 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#mission-statement' ? (
                    <MissionStatement 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#tuition' ? (
                    <Tuition 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#pance-pass-rate' ? (
                    <PANCEPassRate 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#GPA' ? (
                    <GPA 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#prerequisites' ? (
                    <></>
                ) : tab === '#experience' ? (
                    <Experience 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#pa-shadowing' ? (
                    <PAShadowing 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#exams' ? (
                    <></>
                ) : tab === '#evaluations' ? (
                    <Evaluations 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#international-students' ? (
                    <InternationalStudents 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#certifications' ? (
                    <Certifications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#applications' ? (
                    <Applications 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : tab === '#preference' ? (
                    <Preference 
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                   />
                ) : (
                    <></>
                )}
            </>
        </form>
    )
}