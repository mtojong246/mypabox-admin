import { Dispatch, SetStateAction, useState } from "react"
import { NewSchool } from "../../../types/newSchools.types"
import GeneralInformation from "./GeneralInformation/GeneralInformation"
import DegreeInformation from "./DegreeInformation/DegreeInformation"



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
                        isEditSchool={true}
                    />
                ) : tab === '#degree-info' ? (
                    <DegreeInformation
                        school={school}
                        setSchool={setSchool}
                        isEditSchool={false}
                    />
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