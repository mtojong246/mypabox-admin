export default function AddSchoolForms({
    tab,
}: {
    tab: string,
}) {
    return (
        <form className={`pb-24 `}>
            <>
                {tab === '#general-info' ? (
                    <></>
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