import { School } from "../../../../types/schools.types"
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react"
import EditButtons from "../../Assets/EditButtons"
import AddRecommendedCourses from "./AddRecommendedCourses"
import Indicator from "../../../../components/Indicator"
import Screen from "../../../../components/Screen"

import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";
import LinkPopup from "../../LinkPopup"
import { UserObject } from "../../../../types/users.types"
import RecField from "./RecField"

export default function RecommendedCourses({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
}) {
    const courses = useSelector(selectCourses);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ editedRecommendedCourse, setEditedRecommendedCourse ] = useState<any | null>(null);
    const [ openRecommendedCourses, setOpenRecommendedCourses ] = useState(false);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    useEffect(() => {
        if (newSchool.edited_school_prereq_recommended_courses.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_prereq_recommended_courses.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    };

    const toggleRecommendedCourses = (e:any) => {
        e.preventDefault();
        setOpenRecommendedCourses(!openRecommendedCourses);
    }


    

    const deleteCourse = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.filter((course,i) => i !== index)
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...newSchool.edited_school_prereq_recommended_courses,
                    input: isNew ? newSchool.edited_school_prereq_recommended_courses.input!.filter((inp,i) => i !== index) : newSchool.edited_school_prereq_recommended_courses.input!.map((inp,i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: false }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const undoDelete = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_prereq_recommended_courses: {
                ...newSchool.edited_school_prereq_recommended_courses,
                input: newSchool.edited_school_prereq_recommended_courses.input!.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: true }
                    } else {
                        return { ...inp }
                    }
                })
            }
        })
    }

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        const linkName = `edited_${linkObj.name}`
        setNewSchool({
            ...newSchool,
            [linkName]: {
                ...newSchool[linkName as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    };

    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_prereq_recommended_courses.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} />
            <Indicator label="Recommended Courses" editedInput={newSchool.edited_school_prereq_recommended_courses.input} />
                <button  disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_recommended_courses.isEditMode) ? false: true}  onClick={toggleRecommendedCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Course
                </button>
                <RecField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={newSchool.edited_school_prereq_recommended_courses.input} originalInput={newSchool.school_prereq_recommended_courses} 
                courses={courses} toggleOptions={toggleRecommendedCourses} setEditedOption={setEditedRecommendedCourse} deleteOption={deleteCourse} undoDelete={undoDelete} setGroupIndex={setGroupIndex}/>
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={hasInputs} name='school_prereq_recommended_courses'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRecommendedCourses && <AddRecommendedCourses isEdit={isEdit} toggleRecommendedCourses={toggleRecommendedCourses} groupIndex={groupIndex} loggedInUser={loggedInUser} input={hasInputs} originalInput={newSchool.school_prereq_recommended_courses} setNewSchool={setNewSchool} editedRecommendedCourse={editedRecommendedCourse} setEditedRecommendedCourse={setEditedRecommendedCourse} newSchool={newSchool}/>}
        </>
    )
}