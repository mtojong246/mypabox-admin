import { Dispatch, SetStateAction, MouseEvent } from "react"
import { UserObject } from "../../../types/users.types"
import CreatableSelect from 'react-select/creatable';
import { AiOutlineClose } from "react-icons/ai";
import { LuUndo2 } from "react-icons/lu";
import { EditedNote, Note } from "../../../types/schools.types";
import { FiEdit3 } from "react-icons/fi";
import ReactQuill from "react-quill";

export default function AddNoteFields({ loggedInUser, notes, originalNotes, isEditMode, toggleNotePopup, deleteNote, undoDelete, setIndex, setName, setEditedNote, name} : { 
    loggedInUser: UserObject,
    notes: EditedNote[] | null,
    originalNotes: Note[],
    isEditMode: boolean,
    toggleNotePopup: (e:any) => void,
    deleteNote: (e:any, i:number, name:string, isNew: boolean, isEditedInput: boolean) => void,
    undoDelete: (e:any, i:number) => void,
    setIndex: Dispatch<SetStateAction<number>>,
    setName: Dispatch<SetStateAction<string>>,
    setEditedNote: Dispatch<SetStateAction<Note>>,
    name: string,




 }) {
    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {notes !== null ? (
            <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${notes.length ? 'mt-3' : 'mt-0'}`}>
                    {notes.map((note, i) => {
                    const original = originalNotes.find((note,index) => index === i);
                    return (
                    <div className={`py-2 pr-2 pl-3 border ${note.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'}  rounded w-full`}>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'} ${!note.isCorrect && !note.isNew ? 'line-through' : 'no-underline'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(name)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled value={name} onClick={(e:any) => {deleteNote(e, i, name, false, false)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        <ReactQuill theme='bubble' value={original && original.note} readOnly={true} className='edited-quill strike'/>
                    </div>
                    )})}
                </div>
            </>
            ): (
            <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${originalNotes.length ? 'mt-3' : 'mt-0'}`}>
                    {originalNotes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(name)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={name} onClick={(e:any) => {deleteNote(e, i, name, false, false)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
            </>
            )}
            </>
        ): (
            <>
            {notes !== null ? (
            <div className={`w-full flex flex-col justify-center items-center gap-3 ${notes.length ? 'mt-3' : 'mt-0'}`}>
                {notes.map((note, i) => {
                const original = originalNotes.find((note,index) => index === i);
                return (
                <div className={`py-2 pr-2 pl-3 border ${note.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'}  rounded w-full`}>
                    <div className='flex justify-between items-start w-full mb-1'>
                        <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'} ${!note.isCorrect && !note.isNew ? 'line-through' : 'no-underline'}`}>
                            {note.type}:
                        </p>
                        {!note.isCorrect && !note.isNew ? (
                            <button name={name} onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                        ) : (
                            <div className='flex gap-2'>
                                <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(name)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {deleteNote(e, i, name, note.isNew, true)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        )}
                        
                        </div> 
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    <ReactQuill theme='bubble' value={original && original.note} readOnly={true} className='edited-quill strike'/>
                </div>
                )})}
            </div>
            ) : (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${originalNotes.length ? 'mt-3' : 'mt-0'}`}>
                    {originalNotes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(name)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled value={name} onClick={(e:any) => {deleteNote(e, i, name, false, false)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
            )}
            </>
            )}
        </>
    )
}