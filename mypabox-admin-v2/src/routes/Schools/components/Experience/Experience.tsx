import { School, Note } from "../../../../types/schools.types"
import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react"
import PatientExperience from "./PatientExperience"
import HealthcareExperience from "./HealthcareExperience"
import CommunityService from "./CommunityService"
import VolunteerService from "./VolunteerService"
import AddNoteFields from "../../Assets/AddNoteFields"
import Screen from "../../../../components/Screen"
import Indicator from "../../../../components/Indicator"

import AddNote from "../Prereqs/AddNote"
import { UserObject } from "../../../../types/users.types"

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup"
import EditButtons from "../../Assets/EditButtons"
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./ExperienceFunctions"
import BooleanFields from "../../Assets/BooleanFields"


export default function Experience({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean}) {
    
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_paid_experience_required: {
                    ...newSchool.edited_school_paid_experience_required,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.concat(note)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_paid_experience_required: {
                    ...newSchool.edited_school_paid_experience_required,
                    notes: newSchool.edited_school_paid_experience_required.notes ? newSchool.edited_school_paid_experience_required.notes.concat(note) : [note]
                }
            })
        }
            
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_paid_experience_required: {
                    ...newSchool.edited_school_paid_experience_required,
                    notes: newSchool.edited_school_paid_experience_required.notes!.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        }
            
    }

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault()
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: newSchool.school_paid_experience_required.school_paid_experience_required_notes.filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_paid_experience_required: {
                    ...newSchool.edited_school_paid_experience_required,
                    notes: newSchool.edited_school_paid_experience_required.notes!.filter((n,i) => i !== index)
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
        {newSchool && (
            <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_paid_experience_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_paid_experience_required.isEditMode} />
                <Indicator label="Paid Experience Required" editedInput={newSchool.edited_school_paid_experience_required.input} />
                    <div className='flex justify-start items-center gap-3'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_paid_experience_required.isEditMode} input={newSchool.edited_school_paid_experience_required.input} originalInput={newSchool.school_paid_experience_required.input}
                        name='school_paid_experience_required' handleCheck={handleInput} />
                        <button onClick={(e) => {toggleNotePopup(e);}} className="border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div> 
                        <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_paid_experience_required.isEditMode} notes={newSchool.edited_school_paid_experience_required.notes} originalNotes={newSchool.school_paid_experience_required.school_paid_experience_required_notes} name='school_paid_experience_required' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                        />
                </div>
                {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_paid_experience_required.isEditMode} input={newSchool.edited_school_paid_experience_required.input} link={newSchool.edited_school_paid_experience_required.link} 
                toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} name='school_paid_experience_required'
                />}
            </div>


                <PatientExperience newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <HealthcareExperience newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <CommunityService newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
                <VolunteerService newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>
            </>
        )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}