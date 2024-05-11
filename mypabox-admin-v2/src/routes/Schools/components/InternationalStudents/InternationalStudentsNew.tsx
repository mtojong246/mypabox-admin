import { Dispatch, SetStateAction } from "react";
import { School, Note } from "../../../../types/schools.types";
import { EditedField } from "../../../../types/schools.types";

import { UserObject } from "../../../../types/users.types";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";
import { isDisabled } from "../../../../data/functions";


import BooleanFields from "../../Fields/BooleanFields";
import EditButtons from "../../Fields/EditButtons";
import NoteFields from "../../Fields/NoteFields";
import AddUpdateNote from "../../Fields/AddUpdateNote";
import useInput from "../../../../app/hooks/useInput";
import useNotes from "../../../../app/hooks/useNotes";


export default function InternationalStudentsNew({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const {
        handleBooleanValue,
    } = useInput({ newSchool, setNewSchool });

    const {
        addNoteObj,
        updateNoteObj,
        deleteNoteObj,
        addNewNote,
        isNoteOpen,
        toggleNotePopup,
        noteInfoObj,
        setNoteInfoObj,
    } = useNotes({ newSchool, setNewSchool });


    const infoFields = {
        label: 'International Students Accepted',
        name: 'school_international_students_accepted'
    }

    const { label, name } = infoFields
    const field = newSchool[name as keyof School];
    const editedField = newSchool[`edited_${name}` as keyof School] as EditedField;
    const notes = 'notes' as keyof object;
    const noteValue = field[notes] as Note[]
    const editedNoteValue = editedField[notes] as Note[] | null;
    const editedValue = editedField.input
    const inputValue = field['input' as keyof object];
    


    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={editedValue} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
            <Indicator label={label} editedInput={editedValue} />
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields label={label} name={name} value={inputValue} editedValue={editedValue} handleInputChange={handleBooleanValue} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                    <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true)} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                
                <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} 
                newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} name={name} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool} />}
        </div>
        {isNoteOpen && <AddUpdateNote noteInfoObj={noteInfoObj} setNoteInfoObj={setNoteInfoObj} toggleNotePopup={toggleNotePopup} updateNote={updateNoteObj} addNote={addNoteObj}/>}
        </>
    )
}