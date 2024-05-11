import { Dispatch, SetStateAction } from "react";
import { School, Note, EditedField } from '../../../../../types/schools.types';
import { UserObject } from "../../../../../types/users.types";
import useInput from "../../../../../app/hooks/useInput";
import useNotes from "../../../../../app/hooks/useNotes";
import Screen from "../../../../../components/Screen";
import Indicator from "../../../../../components/Indicator";
import InputFields from "../../../Fields/InputFields";
import NoteFields from "../../../Fields/NoteFields";
import EditButtons from "../../../Fields/EditButtons";
import AddUpdateNote from "../../../Fields/AddUpdateNote";
import { isDisabled } from "../../../../../data/functions";

import { tuitionFields } from "../../../../../data/defaultValues";


export default function TuitionNew({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const {
        handleStringOrNumberInput,
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
    } = useNotes({ newSchool, setNewSchool })




    return (
        <>
        {tuitionFields.map((fieldObj, i) => {
            const { label, name } = fieldObj
            const field = newSchool[name as keyof School];
            const editedField = newSchool[`edited_${name}` as keyof School] as EditedField;
            const input = 'input' as keyof object;
            const notes = 'notes' as keyof object;
            const inputValue = field[input];
            const editedValue = editedField[input];
            const noteValue = field[notes] as Note[] | undefined;
            const editedNoteValue = editedField[notes] as Note[] | null;
            
            return (
                <div className={`${i === 0 ? 'mt-12' : 'mt-20'} flex justify-start items-start gap-3 w-full`}>
                        <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                            <Screen isEdit={isEdit} editedInput={editedValue} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
                            <Indicator label={label} editedInput={editedValue} />
                            <div className='flex justify-center items-start gap-3'>
                                <InputFields label={label} name={name} value={inputValue} editedValue={editedValue} handleInputChange={handleStringOrNumberInput} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                {noteValue !== undefined && (
                                    <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true)}  className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                        Add Note
                                    </button>
                                )}
                            </div>
                            {noteValue !== undefined && (
                                <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} 
                                newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />
                            )}
                        </div>
                        {isEdit && <EditButtons loggedInUser={loggedInUser} name={name} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool} />}
                </div>
            )
        })}
        {isNoteOpen && <AddUpdateNote noteInfoObj={noteInfoObj} setNoteInfoObj={setNoteInfoObj} toggleNotePopup={toggleNotePopup} updateNote={updateNoteObj} addNote={addNoteObj}/>}
        </>
    )
}