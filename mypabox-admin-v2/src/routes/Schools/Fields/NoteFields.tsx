import { Note, School, EditedField, NoteInfoObj } from "../../../types/schools.types"
import { UserObject } from "../../../types/users.types"
import { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";


export default function NoteFields({toggleNotePopup, name, notes, newSchool, loggedInUser, isEdit, altNoteName, setNoteObj, innerFieldName, deleteNoteObj}: {
    name: string,
    toggleNotePopup: (e:any) => void,
    notes: Note[],
    newSchool: School,
    loggedInUser:UserObject,
    innerFieldName?: string,
    altNoteName?: string,
    isEdit: boolean,
    setNoteObj: Dispatch<SetStateAction<NoteInfoObj | null>>,
    deleteNoteObj: (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, index: number, innerFieldName?: string, altNoteName?: string) => void,
}) {

    const [ editedField, setEditedField ] = useState<EditedField | null>(null);
    const [ canChangeNotes, setCanChangeNotes ] = useState(false);

    useEffect(() => {
        const editedName = `edited_${name}` as keyof object;
        const field = newSchool[editedName];

        setEditedField(field);
    }, [name, newSchool]);


    useEffect(() => {
        if (!isEdit) {
            setCanChangeNotes(true);
        } else {
            if (loggedInUser.permissions.canEditWithVerificationNeeded && editedField && editedField.isEditMode) {
                setCanChangeNotes(true);
            } else if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                if (loggedInUser.permissions.canVerify && editedField && editedField.notes !== null) {
                    setCanChangeNotes(false);
                } else {
                    setCanChangeNotes(true);
                }
                
            }
        }
    }, [isEdit, loggedInUser, editedField]);

    const updateExistingNote = (e:MouseEvent<HTMLButtonElement>, note: Note, index: number) => {
        const isEditedField = editedField && editedField.isEditMode ? true : false;
        setNoteObj({
            name,
            isEditField: isEditedField,
            innerFieldName,
            altNoteName,
            existingNote: note,
            index,
        });
        toggleNotePopup(e);
    }

    const deleteExistingNote = (e:MouseEvent<HTMLButtonElement>, index: number) => {
        const isEditedField = editedField && editedField.isEditMode ? true : false;
        deleteNoteObj(e, name, isEditedField, index, innerFieldName, altNoteName);
    }

    return (
        <>
        {notes.length && (
            <div className={`w-full flex flex-col justify-center items-center gap-3 ${notes.length ? 'mt-3' : 'mt-0'}`}>
                {notes.map((note: any, i: number) => {
                return (
                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                    <div className='flex justify-between items-start w-full mb-1'>
                        <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                            {note.type}:
                        </p>
                        <div className='flex gap-2'>
                            <button onClick={(e:any) => updateExistingNote(e, note, i)} disabled={!canChangeNotes}><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            <button onClick={(e:any) => deleteExistingNote(e, i)} disabled={!canChangeNotes}><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                        </div>
                        </div> 
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                </div>
                )})}
            </div>
        )}
        </>
    )
}