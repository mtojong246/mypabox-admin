import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";
import { School, SchoolPrereqRequiredCourse } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import AddRequiredCourses from "./AddRequiredCourses";
import LinkPopup from "../../LinkPopup";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { UserObject } from "../../../../types/users.types";

export default function RequiredCourses({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean
}) {
    const courses = useSelector(selectCourses);
    const [ openRequiredCourses, setOpenRequiredCourses ] = useState(false);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ editedRequiredCourse, setEditedRequiredCourse ] = useState<SchoolPrereqRequiredCourse | null>(null);
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

    const deleteCourse = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_prereq_required_courses: newSchool.school_prereq_required_courses.filter((course,i) => i !== index)
        })
    };

    const addCourseOrCategory = (group: SchoolPrereqRequiredCourse, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool.school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: field.concat(group)
            })
        } else {
            const field = newSchool.edited_school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
                    ...field,
                    input: field.input!.concat({
                        edited_school_required_course_credit_hours: group.school_required_course_credit_hours,
                        edited_school_required_course_id: group.school_required_course_id,
                        edited_school_required_course_lab: group.school_required_course_lab,
                        edited_school_required_course_lab_preferred: group.school_required_course_lab_preferred,
                        edited_school_required_course_note_section: group.school_required_course_note_section,
                        edited_school_required_course_quarter_hours: group.school_required_course_quarter_hours,
                        isCorrect: true,
                        isNew: false,
                    })
                }
            })
        }
        
    }

    const updateCourseOrCategory = (group: SchoolPrereqRequiredCourse, type: string) => {
       const name = type as keyof School;
       const field = newSchool[name] as SchoolPrereqRequiredCourse[];
       const newGroup = field.map((g,i) => {
        if (i === groupIndex) {
            return { ...group }
        } else {
            return { ...g }
        }
       })
       setNewSchool({
        ...newSchool,
        [name]: newGroup,
       })
       setGroupIndex(null)
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
        <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Required Courses<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label> 
            <button onClick={toggleRequiredCourses} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                Add Course
            </button>
            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prereq_required_courses.length ? 'mt-3' : 'mt-0'}`}>
            {courses && newSchool.school_prereq_required_courses.map((course, i) => {
                const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id)
                if (selectedCourse) {
                    return (
                        <div className='py-2 pr-2 pl-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold'>{selectedCourse?.course_name}
                                    <span className='font-semibold text-sm inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${course.school_required_course_lab ? 'with lab' : 'without lab'}
                                        ${!course.school_required_course_lab && course.school_required_course_lab_preferred ? ' / lab preferred' : ''}  
                                        / ${course.school_required_course_credit_hours} credit hours 
                                        / ${course.school_required_course_quarter_hours} quarter hours)`}                                   
                                    </span>
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleRequiredCourses(e); setEditedRequiredCourse(course); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteCourse(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {course.school_required_course_note_section ? (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                    <ReactQuill theme='bubble' value={course.school_required_course_note_section} readOnly={true} className='edited-quill'/>
                                </>
                            ) : null}
                        </div>
                    )
                } else {
                    return null
                }
            })}
            </div>
        </div>
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRequiredCourses && <AddRequiredCourses toggleRequiredCourses={toggleRequiredCourses} editedRequiredCourse={editedRequiredCourse} setEditedRequiredCourse={setEditedRequiredCourse} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory} newSchool={newSchool}/>}

        </>
    )
}