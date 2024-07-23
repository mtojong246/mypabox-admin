import { useSelector } from "react-redux"
import { selectCourses } from "../../../../app/selectors/courses.selectors"
import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from "react";
import AddRequiredCourses from "./AddRequiredCourses";
import LinkPopup from "../../LinkPopup";

import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";
import { UserObject } from "../../../../types/users.types";
import ReqField from "./ReqField";
import EditButtons from "../../Assets/EditButtons";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GroupFunctions";
import AddNoteFields from "../../Assets/AddNoteFields";
import AddNote from "./AddNote";


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
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [notePopup, setNotePopup] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })
    const [ index, setIndex ] = useState<number | null>(null);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };


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
                school_prereq_required_courses: {
                    ...newSchool.school_prereq_required_courses,
                    courses: newSchool.school_prereq_required_courses.courses.filter((course,i) => i !== index)
                }
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

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool.school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool.edited_school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool.school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: {
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
            const field = newSchool.edited_school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
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
            const field = newSchool.school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool.edited_school_prereq_required_courses;
            setNewSchool({
                ...newSchool,
                edited_school_prereq_required_courses: {
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
                <div className="w-full flex justify-between items-center gap-3">
                    <button disabled={(loggedInUser.permissions.canVerify && !hasInputs) || (!loggedInUser.permissions.canVerify && newSchool.edited_school_prereq_required_courses.isEditMode) ? false: true} onClick={toggleRequiredCourses} className="border text-[#4573D2] border-[#4573D2] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#4573D2]">
                        Add Course
                    </button>
                    <button onClick={toggleNotePopup}  name='add' className="disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white disabled:hover:bg-none hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                <ReqField loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={newSchool.edited_school_prereq_required_courses.input} originalInput={newSchool.school_prereq_required_courses.courses} 
                courses={courses} toggleOptions={toggleRequiredCourses} setEditedOption={setEditedRequiredCourse} deleteOption={deleteCourse} undoDelete={undoDelete} setGroupIndex={setGroupIndex}
                />
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} notes={newSchool.edited_school_prereq_required_courses.notes} originalNotes={newSchool.school_prereq_required_courses.notes} name='school_prereq_required_courses' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_prereq_required_courses.isEditMode} input={hasInputs} name='school_prereq_required_courses'
            toggleLinkPopup={toggleLinkPopup} link={newSchool.edited_school_prereq_required_courses.link} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} 
            revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {openRequiredCourses && <AddRequiredCourses isEdit={isEdit} loggedInUser={loggedInUser} groupIndex={groupIndex} originalInput={newSchool.school_prereq_required_courses.courses} input={hasInputs} toggleRequiredCourses={toggleRequiredCourses} editedRequiredCourse={editedRequiredCourse} setEditedRequiredCourse={setEditedRequiredCourse} newSchool={newSchool} setNewSchool={setNewSchool}/>}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}