import { Dispatch, SetStateAction } from "react"
import { NewSchool } from "../../../types/newSchools.types"
import GeneralInformation from "./GeneralInformation/GeneralInformation"
import DegreeInformation from "./DegreeInformation/DegreeInformation"
import AccreditationStatus from "./AccreditationStatus/AccreditationStatus"
import MissionStatement from "./MissionStatement/MissionStatement"
import Tuition from "./Tuition/Tuition"
import PANCEPassRate from "./PANCEPassRate/PANCEPassRate"
import GPA from "./GPA/GPA"



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
                    <></>
                ) : tab === '#pa-shadowing' ? (
                    <></>
                ) : tab === '#exams' ? (
                    <></>
                ) : tab === '#evaluations' ? (
                    <></>
                ) : tab === '#international-students' ? (
                    <></>
                ) : tab === '#certifications' ? (
                    <></>
                ) : tab === '#applications' ? (
                    <></>
                ) : tab === '#preference' ? (
                    <></>
                ) : (
                    <></>
                )}
            </>
        </form>
    )
}