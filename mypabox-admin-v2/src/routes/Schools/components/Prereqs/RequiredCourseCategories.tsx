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
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";

export default function RequiredCourseCategories({ newSchool, setNewSchool, loggedInUser, isEdit }: { 
    newSchool: School, 
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    isEdit: boolean,
}) {
    const courses = useSelector(selectCourses);
    const categories = useSelector(selectCategories);
    const [ openRequiredCourseCategories, setOpenRequiredCourseCategories ] = useState(false);
    const [ editedRequiredCategory, setEditedRequiredCategory ] = useState<any | null>(null);
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
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_prereq_required_course_categories.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} />
            <Indicator label="Required Course Categories" editedInput={newSchool.edited_school_prereq_required_course_categories.input} />
                <button onClick={toggleRequiredCourseCategories} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Category
                </button>
                <CategoryFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={newSchool.edited_school_prereq_required_course_categories.input} 
                originalInput={newSchool.school_prereq_required_course_categories} categories={categories} courses={courses} setEditedOption={setEditedRequiredCategory} deleteOption={deleteCategory} undoDelete={undoDelete} toggleOptions={toggleRequiredCourseCategories}
                setGroupIndex={setGroupIndex}
                />
                
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_course_categories.isEditMode} input={hasInputs} name='school_prereq_required_course_categories'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_course_categories.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}/>}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {openRequiredCourseCategories && <AddRequiredCourseCategories isEdit={isEdit} loggedInUser={loggedInUser} toggleRequiredCourseCategories={toggleRequiredCourseCategories} editedRequiredCategory={editedRequiredCategory} setEditedRequiredCategory={setEditedRequiredCategory} newSchool={newSchool}
            setNewSchool={setNewSchool} input={hasInputs} groupIndex={groupIndex}
            />}
        </>
    )
}