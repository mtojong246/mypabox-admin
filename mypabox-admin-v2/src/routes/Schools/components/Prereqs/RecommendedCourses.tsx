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
import AddNoteFields from "../../Assets/AddNoteFields"
import { Note } from "../../../../types/schools.types"
import AddNote from "./AddNote"

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

    const [notePopup, setNotePopup] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

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
                school_prereq_recommended_courses: {
                    ...newSchool.school_prereq_recommended_courses,
                    courses: newSchool.school_prereq_recommended_courses.courses.filter((course,i) => i !== index)
                } 
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
    };


    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool.school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool.edited_school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool.school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool.edited_school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        }
        
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool.school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool.edited_school_prereq_recommended_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_recommended_courses: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        }
        
    };

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
                <div className="w-full flex justify-between items-center gap-3">
                    <button  disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_recommended_courses.isEditMode) ? false: true}  onClick={toggleRecommendedCourses} className="border text-[#4573D2] border-[#4573D2] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                        Add Course
                    </button>
                    <button onClick={toggleNotePopup}  name='add' className="disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white disabled:hover:bg-none hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                <RecField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={newSchool.edited_school_prereq_recommended_courses.input} originalInput={newSchool.school_prereq_recommended_courses.courses} 
                courses={courses} toggleOptions={toggleRecommendedCourses} setEditedOption={setEditedRecommendedCourse} deleteOption={deleteCourse} undoDelete={undoDelete} setGroupIndex={setGroupIndex}/>
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} notes={newSchool.edited_school_prereq_recommended_courses.notes} originalNotes={newSchool.school_prereq_recommended_courses.notes} name='school_prereq_recommended_courses' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_recommended_courses.isEditMode} input={hasInputs} name='school_prereq_recommended_courses'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRecommendedCourses && <AddRecommendedCourses isEdit={isEdit} toggleRecommendedCourses={toggleRecommendedCourses} groupIndex={groupIndex} loggedInUser={loggedInUser} input={hasInputs} originalInput={newSchool.school_prereq_recommended_courses.courses} setNewSchool={setNewSchool} editedRecommendedCourse={editedRecommendedCourse} setEditedRecommendedCourse={setEditedRecommendedCourse} newSchool={newSchool}/>}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}

        </>
    )
}