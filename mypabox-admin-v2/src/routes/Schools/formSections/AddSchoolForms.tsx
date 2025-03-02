import { Dispatch, SetStateAction } from "react"
import { NewSchool } from "../../../types/newSchools.types"
import GeneralInformation from "./GeneralInformation/GeneralInformation"

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
                    />
                ) : tab === '#degree-info' ? (
                    <></>
                ) : tab === '#accreditation-status' ? (
                    <></>
                ) : tab === '#mission-statement' ? (
                    <></>
                ) : tab === '#tuition' ? (
                    <></>
                ) : tab === '#pance-pass-rate' ? (
                    <></>
                ) : tab === '#GPA' ? (
                    <></>
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