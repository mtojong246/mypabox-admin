import { MouseEvent } from "react"
import { AiOutlineClose } from "react-icons/ai";
import { Note } from "../../../types/schools.types";
import { FiEdit3 } from "react-icons/fi";
import ReactQuill from "react-quill";

export default function AddNoteFields({ notes, originalNotes, deleteNote, openEditNote, name, noteName, isEditMode, groupName, deleteNestedNote } : { 
    notes: Note[] | null,
    originalNotes: Note[] | null,
    deleteNote: (e: MouseEvent<HTMLButtonElement>, index: number, name: string, noteName?: string) => void,
    deleteNestedNote?: (e: MouseEvent<HTMLButtonElement>, index: number, groupName: string, name: string, noteName?: string) => void,
    openEditNote: (e:MouseEvent<HTMLButtonElement>, index: number, note: Note, name: string, noteName?: string, groupName?: string) => void,
    name: string,
    noteName?: string,
    isEditMode: boolean,
    groupName?: string,
    



 }) {


    return (
        <>
        {notes !== null && notes.length > 0 && (
        <div className={`w-full flex flex-col justify-center items-center gap-3 ${notes.length ? 'mt-3' : 'mt-0'}`}>
            {notes.map((note: any, i: number) => {
            return (
            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                <div className='flex justify-between items-start w-full mb-1'>
                    <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                        {note.type}:
                    </p>
                    <div className='flex gap-2'>
                        <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {openEditNote(e, i, note, name, noteName, groupName)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                        <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {deleteNestedNote && groupName ? deleteNestedNote(e, i, groupName, name, noteName) : deleteNote(e, i, name, noteName)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    </div>
                    </div> 
                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
            </div>
            )})}
        </div>
        )}

        {notes === null && originalNotes && originalNotes.length > 0 && (
            <div className={`w-full flex flex-col justify-center items-center gap-3 ${originalNotes && originalNotes.length ? 'mt-3' : 'mt-0'}`}>
                    {originalNotes && originalNotes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button value={name} onClick={(e:any) => {openEditNote(e, i, note, name, noteName, groupName)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={name} onClick={(e:any) => {deleteNestedNote && groupName ? deleteNestedNote(e, i, groupName, name, noteName) : deleteNote(e, i, name, noteName)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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