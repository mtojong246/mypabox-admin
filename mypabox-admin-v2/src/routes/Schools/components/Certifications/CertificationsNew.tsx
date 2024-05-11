import { School, Note, EditedField } from "../../../../types/schools.types"
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import AddUpdateNote from "../../Fields/AddUpdateNote";
import NoteFields from "../../Fields/NoteFields";
import useInput from "../../../../app/hooks/useInput";
import useArrayFields from "../../../../app/hooks/useArrayFields";
import useNotes from "../../../../app/hooks/useNotes";
import Indicator from "../../../../components/Indicator";
import Screen from "../../../../components/Screen";
import ConditionFields from "../../Fields/ConditionFields";
import { isDisabled } from "../../../../data/functions";

import { UserObject } from "../../../../types/users.types";
import BooleanFields from "../../Fields/BooleanFields";
import EditButtons from "../../Fields/EditButtons";





const additionalFields: {label: string, name: string}[] = [
    {
        label: 'Required Certifications',
        name: 'school_certifications_required_options',
    }
]



export default function CertificationsNew({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
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

    const label = 'Certification Required';
    const name = 'school_certifications_required';
    const field = newSchool[name as keyof School];
    const editedField = newSchool[`edited_${name}` as keyof School] as EditedField;
    const input = 'input' as keyof object;
    const notes = 'notes' as keyof object;
    const altNote = 'school_certification_notes' as keyof object;
    const inputValue = field[input];
    const editedValue = editedField[input];
    const noteValue = field[altNote] as Note[] | undefined;
    const editedNoteValue = editedField[notes] as Note[] | null;

    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative grow max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={editedValue} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
                <Indicator label={label} editedInput={editedValue} />
                <div className='flex justify-center items-start gap-3'>
                    
                    <BooleanFields label={label} name={name} value={inputValue} editedValue={editedValue} handleInputChange={handleBooleanValue} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>

                    {noteValue !== undefined && (
                        <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true, undefined, altNote)}  className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    )}
                </div>
                <ConditionFields fieldName={name} inputValue={inputValue} editedValue={editedValue} newSchool={newSchool} isEdit={isEdit} setNewSchool={setNewSchool} loggedInUser={loggedInUser} innerFields={additionalFields}/>
                {noteValue !== undefined && (
                    <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} altNoteName={altNote}
                    newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />
                )}
                
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} name={name} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool} altNoteName={altNote} fieldNames={['school_certifications_required_options']} />}
        </div>
        {isNoteOpen && <AddUpdateNote noteInfoObj={noteInfoObj} setNoteInfoObj={setNoteInfoObj} toggleNotePopup={toggleNotePopup} updateNote={updateNoteObj} addNote={addNoteObj}/>}

        </>
    )
}