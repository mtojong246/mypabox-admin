import { Dispatch, SetStateAction, useState } from "react";
import { Note, School } from "../../../../types/schools.types";
import RequiredCourses from "./RequiredCourses";
import RequiredOptionalCourses from "./RequiredOptionalCourses";
import RequiredCourseCategories from "./RequiredCourseCategories";
import RecommendedCourses from "./RecommendedCourses";
import MinimumGrade from "./MinimumGrade";
import TimeFrameCriteria from "./TimeFrameCriteria";
import BooleanInputs from "./BooleanInputs";
import CompleteConditions from "./CompleteConditions";
import { UserObject } from "../../../../types/users.types";
import AddNoteFields from "../../Assets/AddNoteFields";
import AddNote from "./AddNote";


export default function Prereqs({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [notePopup, setNotePopup] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };


      const addNote = (note: Note) => {
        const obj = newSchool.school_prereq_required_notes;
        setNewSchool({
            ...newSchool,
            school_prereq_required_notes: {
                ...obj,
                notes: obj.notes.concat(note),
            }
        })
            
    }

    const updateNote = (note: Note) => {
        const obj = newSchool.school_prereq_required_notes;
            setNewSchool({
                ...newSchool,
                school_prereq_required_notes: {
                    ...obj,
                    notes: obj.notes.map((n, i) => {
                        if (i === index) {
                            return {...note}
                        } else {
                            return {...n}
                        }
                    }),
                }
            })        
    };

    const deleteNote = (e: any, index: number) => {
        const obj = newSchool.school_prereq_required_notes;
            setNewSchool({
                ...newSchool,
                school_prereq_required_notes: {
                    ...obj,
                    notes: obj.notes.filter((n,i) => i !== index),
                }
            })  
    }

    return (
        <>
        {newSchool && (
            <>
            <div className={`grow mt-10 relative border-2 p-8 flex flex-col gap-10 rounded border-[#B4B4B4] max-w-[900px] w-full`}>
                <label className={`absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20 font-semibold`}>
                    Required Courses & Categories
                </label>
                <RequiredCourses  loggedInUser={loggedInUser} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredOptionalCourses loggedInUser={loggedInUser} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredCourseCategories newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit} />
                <div className="w-full flex flex-col gap-2">
                    <div className='w-full'>
                        <label className='text-xl font-medium'>Notes:</label>
                        <button  onClick={(e) => {toggleNotePopup(e);}} value='school_prereq_required_notes' name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-2 block">
                            Add Note
                        </button>
                    </div>
                    <div className='max-w-[900px]'>
                        <AddNoteFields 
                        loggedInUser={loggedInUser} 
                        isEditMode={true} 
                        notes={newSchool.school_prereq_required_notes.notes ? newSchool.school_prereq_required_notes.notes : null} 
                        originalNotes={newSchool.school_prereq_required_notes.notes ? newSchool.school_prereq_required_notes.notes : null} 
                        name='school_prereq_required_notes' 
                        toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} 
                        setIndex={setIndex} 
                        setEditedNote={setEditedNote}
                        />
                    </div>
                </div>
            </div>
                
                <RecommendedCourses newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <MinimumGrade newSchool={newSchool} setNewSchool={setNewSchool}loggedInUser={loggedInUser} isEdit={isEdit}/>
                <TimeFrameCriteria newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <BooleanInputs newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <CompleteConditions newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
            </>
        )}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}