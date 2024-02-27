import { School } from "../../../../types/schools.types"
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react"
import EditButtons from "../../Assets/EditButtons"
import AddRecommendedCourses from "./AddRecommendedCourses"

import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
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
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_recommended_courses.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_prereq_recommended_courses.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#999999] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Recommended Courses<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label> 
                <button  disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_recommended_courses.isEditMode) ? false: true}  onClick={toggleRecommendedCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Course
                </button>
                <RecField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={newSchool.edited_school_prereq_recommended_courses.input} originalInput={newSchool.school_prereq_recommended_courses} 
                courses={courses} toggleOptions={toggleRecommendedCourses} setEditedOption={setEditedRecommendedCourse} deleteOption={deleteCourse} undoDelete={undoDelete} setGroupIndex={setGroupIndex}/>
                {/* <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prereq_recommended_courses.length ? 'mt-3' : 'mt-0'}`}>
                {courses && newSchool.school_prereq_recommended_courses.map((course, i) => {
                    const selectedCourse = courses.find(c => c.unique_id === course.school_recommended_course_id)
                    if (selectedCourse) {
                        return (
                            <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='font-bold'>{selectedCourse?.course_name}
                                        <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                            {`(${course.school_recommended_course_lab ? 'with lab' : 'without lab'}
                                            ${!course.school_recommended_course_lab && course.school_recommended_course_lab_preferred ? ' / lab preferred' : ''}  
                                            / ${course.school_recommended_course_credit_hours} credit hours 
                                            / ${course.school_recommended_course_quarter_hours} quarter hours)`}                                   
                                        </span>
                                    </p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleRecommendedCourses(e); setEditedRecommendedCourse(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteCourse(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                {course.school_recommended_course_note_section ? (
                                    <>
                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                        <ReactQuill theme='bubble' value={course.school_recommended_course_note_section} readOnly={true} className='edited-quill'/>
                                    </>
                                ) : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                </div> */}
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={hasInputs} name='school_prereq_recommended_courses'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRecommendedCourses && <AddRecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} groupIndex={groupIndex} loggedInUser={loggedInUser} input={hasInputs} originalInput={newSchool.school_prereq_recommended_courses} setNewSchool={setNewSchool} editedRecommendedCourse={editedRecommendedCourse} setEditedRecommendedCourse={setEditedRecommendedCourse} newSchool={newSchool}/>}
        </>
    )
}