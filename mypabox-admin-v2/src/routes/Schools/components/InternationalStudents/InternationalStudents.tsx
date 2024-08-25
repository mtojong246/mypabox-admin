import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School } from "../../../../types/schools.types";
import AddNote from "../AddNote";
import AddNoteFields from "../AddNoteFields";

import { UserObject } from "../../../../types/users.types";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";
import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import LinkPopup from "../../LinkPopup";

import { enableEditModeBool, confirmEditBool, revertEditBool, undoEditBool } from "../GeneralInfo/GeneralInfoFunctions";
import useNotes from "../../../../hooks/useNotes";

export default function InternationalStudents({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const {
        deleteNote,
        openAddNote,
        openEditNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
    } = useNotes({newSchool, setNewSchool});

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

  

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_international_students_accepted: {
                    ...newSchool.school_international_students_accepted,
                    input: e.target.checked,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_international_students_accepted: {
                    ...newSchool.edited_school_international_students_accepted,
                    input: e.target.checked,
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
    }
    


    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_international_students_accepted.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} />
                <Indicator label="International Students Accepted" editedInput={newSchool.edited_school_international_students_accepted.input} />
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_international_students_accepted.input} isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} originalInput={newSchool.school_international_students_accepted.input}
                    name='school_international_students_accepted' handleCheck={handleCheck}
                    />
        
                    <button onClick={(e:any) => openAddNote(e, 'school_international_students_accepted')} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
               
                <AddNoteFields 
                 isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} 
                 notes={newSchool.edited_school_international_students_accepted.notes} 
                 originalNotes={newSchool.school_international_students_accepted.notes} 
                 name='school_international_students_accepted' 
                deleteNote={deleteNote} 
                openEditNote={openEditNote}
                    />
            </div>
            <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={newSchool.edited_school_international_students_accepted.input} isEditMode={newSchool.edited_school_international_students_accepted.isEditMode} link={newSchool.edited_school_international_students_accepted.link} 
            name='school_international_students_accepted' toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
            />
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {isNoteOpen && (
            <AddNote editedNote={noteToEdit} addOrEditNote={addOrEditNote} cancelNote={cancelNote} />
            )}
        </>
    )
}