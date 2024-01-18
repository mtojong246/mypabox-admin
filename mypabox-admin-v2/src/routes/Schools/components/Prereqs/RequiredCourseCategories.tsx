import { School, SchoolPrereqRequiredCourseCategory } from "../../../../types/schools.types";
import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { selectCategories } from "../../../../app/selectors/categories.selectors";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import { UserObject } from "../../../../types/users.types";
import AddRequiredCourseCategories from "./AddRequiredCourseCategories";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";
import EditButtons from "../../Assets/EditButtons";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import CategoryFields from "./CategoryFields";

export default function RequiredCourseCategories({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
}) {
    const courses = useSelector(selectCourses);
    const categories = useSelector(selectCategories);
    const [ openRequiredCourseCategories, setOpenRequiredCourseCategories ] = useState(false);
    const [ editedRequiredCategory, setEditedRequiredCategory ] = useState<SchoolPrereqRequiredCourseCategory | null>(null);
    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    useEffect(() => {
        if (newSchool.edited_school_prereq_required_course_categories.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_prereq_required_course_categories.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    };

    const addCourseOrCategory = (group: SchoolPrereqRequiredCourseCategory, type: string) => {
        const name = type as keyof School;
        const field = newSchool[name] as SchoolPrereqRequiredCourseCategory[];
        const newGroup = [...field, {...group}]
        setNewSchool({
            ...newSchool,
            [name]: newGroup,
        })
    }

    // Updates required course, recommended course, required optional group or required course categories depending on index; then resets index
    const updateCourseOrCategory = (group:SchoolPrereqRequiredCourseCategory, type: string) => {
       const name = type as keyof School;
       const field = newSchool[name] as SchoolPrereqRequiredCourseCategory[];
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



    const toggleRequiredCourseCategories = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourseCategories(!openRequiredCourseCategories);
    }

    const deleteCategory = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_prereq_required_course_categories: newSchool.school_prereq_required_course_categories.filter((category,i) => i !== index)
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_course_categories: {
                    ...newSchool.edited_school_prereq_required_course_categories,
                    input: isNew ? newSchool.edited_school_prereq_required_course_categories.input!.filter((inp,i) => i !== index) : newSchool.edited_school_prereq_required_course_categories.input!.map((inp,i) => {
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
            edited_school_prereq_required_course_categories: {
                ...newSchool.edited_school_prereq_required_course_categories,
                input: newSchool.edited_school_prereq_required_course_categories.input!.map((inp,i) => {
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
                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Required Course Category<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label> 
                <button onClick={toggleRequiredCourseCategories} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Category
                </button>
                <CategoryFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={newSchool.edited_school_prereq_required_course_categories.input} 
                originalInput={newSchool.school_prereq_required_course_categories} categories={categories} courses={courses} setEditedOption={setEditedRequiredCategory} deleteOption={deleteCategory} undoDelete={undoDelete} toggleOptions={toggleRequiredCourseCategories}
                setGroupIndex={setGroupIndex}
                />
                {/* <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_prereq_required_course_categories.length ? 'mt-3' : 'mt-0'}`}>
                {newSchool.school_prereq_required_course_categories.map((category, i) => {
                    const selectedCategory = categories.find(c => c.id === category.school_required_course_category);
                    if (selectedCategory) {
                        return (
                        <div className='p-3 border border-[#545454] rounded w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='font-bold text-xl'>{selectedCategory.category_name}
                                    <span className='font-semibold text-base inline-block pl-3 text-[#6A6A6A]'>
                                        {`(${category.school_required_course_category_number_of_courses_that_need_lab} courses with lab
                                        / ${category.school_required_course_category_number_of_credits_need_to_be_completed} credit hours 
                                        / ${category.school_required_course_category_number_of_quarter_hours_need_to_be_completed} quarter hours)`}                                   
                                    </span>
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleRequiredCourseCategories(e); setEditedRequiredCategory(category); setGroupIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => deleteCategory(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            {category.school_required_course_category_extra_included_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-5 mb-2 text-[#4573D2]'>Included Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_extra_included_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_excluded_courses.length > 0 && (
                            <>
                                <p className='font-semibold underline underline-offset-2 mt-6 mb-2 text-[#F06A6A]'>Excluded Courses:</p>
                                <div className='flex flex-col justify-center items-center gap-4'>
                                {category.school_required_course_category_excluded_courses.map(course => {
                                    const selectedCourse = courses.find(c => c.unique_id === course.school_required_course_id);
                                    if (selectedCourse) {
                                        return (
                                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                                <p className='font-semibold'>{selectedCourse.course_name}</p>
                                                {course.school_required_course_note ? (
                                                    <>
                                                        <p className='font-semibold underline underline-offset-2 mt-3 mb-1'>Note:</p>
                                                        <ReactQuill theme='bubble' value={course.school_required_course_note} readOnly={true} className='edited-quill'/>
                                                    </>
                                                ) : null}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                    
                                })}
                                </div>
                            </>
                            )}
                            {category.school_required_course_category_note_section.length > 0 && (
                                <>
                                    <p className='font-semibold underline underline-offset-2 mt-6 mb-2'>Optional Courses Notes:</p>
                                    <div className='flex flex-col justify-center items-center gap-4'>
                                    {category.school_required_course_category_note_section.map(note => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                            <p className={`font-semibold mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    } else {
                        return null;
                    }
                })}
                </div> */}
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={hasInputs} name='school_prereq_required_course_categories'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_course_categories.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}/>}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {openRequiredCourseCategories && <AddRequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} editedRequiredCategory={editedRequiredCategory} setEditedRequiredCategory={setEditedRequiredCategory} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory} newSchool={newSchool}/>}
        </>
    )
}