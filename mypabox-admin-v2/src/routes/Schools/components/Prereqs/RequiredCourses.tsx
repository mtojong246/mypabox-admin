import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { School } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import AddRequiredCourses from "./AddRequiredCourses";
import LinkPopup from "../../LinkPopup";

import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";
import { UserObject } from "../../../../types/users.types";
import ReqField from "./ReqField";
import EditButtons from "../../Assets/EditButtons";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";

export default function RequiredCourses({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean
}) {
    const courses = useSelector(selectCourses);
    const [ openRequiredCourses, setOpenRequiredCourses ] = useState(false);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ editedRequiredCourse, setEditedRequiredCourse ] = useState<any | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleRequiredCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourses(!openRequiredCourses);
    }

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const deleteCourse = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: newSchool.school_prereq_required_courses.filter((course,i) => i !== index)
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
                    ...newSchool.edited_school_prereq_required_courses,
                    input: isNew ? newSchool.edited_school_prereq_required_courses.input!.filter((inp,i) => i !== index) : newSchool.edited_school_prereq_required_courses.input!.map((inp,i) => {
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
            edited_school_prereq_required_courses: {
                ...newSchool.edited_school_prereq_required_courses,
                input: newSchool.edited_school_prereq_required_courses.input!.map((inp,i) => {
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

    useEffect(() => {
        if (newSchool.edited_school_prereq_required_courses.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_prereq_required_courses.input])

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_prereq_required_courses.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} />
            <Indicator label="Required Courses" editedInput={newSchool.edited_school_prereq_required_courses.input} /> 
                <button disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_required_courses.isEditMode) ? false: true} onClick={toggleRequiredCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Course
                </button>
                <ReqField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={newSchool.edited_school_prereq_required_courses.input} originalInput={newSchool.school_prereq_required_courses} 
                courses={courses} toggleOptions={toggleRequiredCourses} setEditedOption={setEditedRequiredCourse} deleteOption={deleteCourse} undoDelete={undoDelete} setGroupIndex={setGroupIndex}
                />
               
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={hasInputs} name='school_prereq_required_courses'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRequiredCourses && <AddRequiredCourses isEdit={isEdit} loggedInUser={loggedInUser} groupIndex={groupIndex} originalInput={newSchool.school_prereq_required_courses} input={hasInputs} toggleRequiredCourses={toggleRequiredCourses} editedRequiredCourse={editedRequiredCourse} setEditedRequiredCourse={setEditedRequiredCourse} newSchool={newSchool} setNewSchool={setNewSchool}/>}

        </>
    )
}