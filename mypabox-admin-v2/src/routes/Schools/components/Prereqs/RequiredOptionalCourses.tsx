import { School, SchoolPrereqRequiredOptionalCourse } from "../../../../types/schools.types";
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import EditButtons from "../../Assets/EditButtons";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import { UserObject } from "../../../../types/users.types";
import AddRequiredOptionalCourses from "./AddRequiredOptionalCourses";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";
import LinkPopup from "../../LinkPopup";
import OptionalFields from "./OptionalFields";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";

export default function RequiredOptionalCourses({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
}) {
    const courses = useSelector(selectCourses);
    const [ editedRequiredOption, setEditedRequiredOption ] = useState<SchoolPrereqRequiredOptionalCourse | null>(null);
    const [ openRequiredOptionalCourses, setOpenRequiredOptionalCourses ] = useState(false);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    useEffect(() => {
        if (newSchool.edited_school_prereq_required_optional_courses.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_prereq_required_optional_courses.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    };

    const toggleRequiredOptionalCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredOptionalCourses(!openRequiredOptionalCourses);
    }

    const deleteOption = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_required_optional_courses: newSchool.school_prereq_required_optional_courses.filter((category,i) => i !== index)
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_optional_courses: {
                    ...newSchool.edited_school_prereq_required_optional_courses,
                    input: isNew ? newSchool.edited_school_prereq_required_optional_courses.input!.filter((inp,i) => i !== index) : newSchool.edited_school_prereq_required_optional_courses.input!.map((inp,i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: false }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
    }

    const undoDelete = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_prereq_required_optional_courses: {
                ...newSchool.edited_school_prereq_required_optional_courses,
                input: newSchool.edited_school_prereq_required_optional_courses.input!.map((inp,i) => {
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
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_prereq_required_optional_courses.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} />
        <Indicator label="Required Optional Courses" editedInput={newSchool.edited_school_prereq_required_optional_courses.input} />
            <button disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_required_optional_courses.isEditMode) ? false: true} onClick={toggleRequiredOptionalCourses} className="border text-[#4573D2] border-[#4573D2] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                Add Option
            </button>
            <OptionalFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={newSchool.edited_school_prereq_required_optional_courses.input} originalInput={newSchool.school_prereq_required_optional_courses} 
                courses={courses} toggleOptions={toggleRequiredOptionalCourses} setEditedOption={setEditedRequiredOption} deleteOption={deleteOption} undoDelete={undoDelete} setGroupIndex={setGroupIndex}/>
           
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_optional_courses.isEditMode} input={hasInputs} name='school_prereq_required_optional_courses'
        toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_optional_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
        revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRequiredOptionalCourses && <AddRequiredOptionalCourses isEdit={isEdit} setGroupIndex={setGroupIndex} toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} editedRequiredOption={editedRequiredOption} setEditedRequiredOption={setEditedRequiredOption} newSchool={newSchool} setNewSchool={setNewSchool} groupIndex={groupIndex}
        input={hasInputs} loggedInUser={loggedInUser}
        />}
        </>
    )
}