import { Dispatch, SetStateAction, MouseEvent } from "react"
import { UserObject } from "../../../types/users.types"
import { AiOutlineClose } from "react-icons/ai";
import { Note } from "../../../types/schools.types";
import { FiEdit3 } from "react-icons/fi";
import ReactQuill from "react-quill";
import { EditedNote } from "../../../types/schools.types";
import { LuUndo2 } from 'react-icons/lu';


export default function TestAddNoteFields({ loggedInUser, notes, originalNotes, isEditMode, toggleNotePopup, deleteNote, setIndex, setName, setEditedNote, name, noteName, isIndividual, setIsIndividual, undoDelete, setNoteName,
setObjIndex, objIndex} : { 
    loggedInUser: UserObject,
    notes: EditedNote[] | null,
    originalNotes: Note[] | null,
    isEditMode: boolean,
    toggleNotePopup: (e:any) => void,
    deleteNote: (e: any, index: number, name: string, isNew: boolean, noteName?: string, isIndividual?: boolean, objIndex?: number) => void,
    undoDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void,
    setIndex: Dispatch<SetStateAction<number | null>>,
    setName?: Dispatch<SetStateAction<string>>,
    setEditedNote: Dispatch<SetStateAction<Note | null>>,
    name: string,
    noteName?: string,
    isIndividual?: boolean,
    setIsIndividual?: Dispatch<SetStateAction<boolean | undefined>>,
    setNoteName?: Dispatch<SetStateAction<string | undefined>>,
    objIndex?: number,
    setObjIndex?: Dispatch<SetStateAction<number | undefined>>,


 }) {


    return (
        <>
        {loggedInUser.permissions.canVerify ? (
            <>
            {notes !== null ? (
            <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${notes.length ? 'mt-3' : 'mt-0'}`}>
                    {notes.map((note: any, i: number) => {
                        const originalNote = originalNotes && originalNotes.find((n,index) => index === i);
                    return (
                    <div className={`py-2 pr-2 pl-3 border ${note.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'}  rounded w-full`}>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'} ${!note.isNew && !note.isCorrect ? 'line-through' : 'no-underline'}`}>
                               {originalNote && originalNote.type !== note.type &&<span className="line-through">{originalNote.type}</span>} {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName && setName(name); setIsIndividual && setIsIndividual(isIndividual); setNoteName && setNoteName(noteName); setObjIndex && setObjIndex(objIndex)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled value={name} onClick={(e:any) => {deleteNote(e, i, name, note.isNew, noteName ? noteName : undefined, isIndividual !== undefined ? isIndividual : undefined, objIndex !== undefined ? objIndex : undefined)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        {originalNote && originalNote.type !== note.type && <ReactQuill theme='bubble' value={originalNote.note} readOnly={true} className='strike'/>}
                    </div>
                    )})}
                </div>
            </>
            ): (
            <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${originalNotes && originalNotes.length ? 'mt-3' : 'mt-0'}`}>
                    {originalNotes && originalNotes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'} ${!note.isNew && !note.isCorrect ? 'line-through' : 'no-underline'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName && setName(name); setIsIndividual && setIsIndividual(isIndividual); setNoteName && setNoteName(noteName); setObjIndex && setObjIndex(objIndex)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={name} onClick={(e:any) => {deleteNote(e, i, name, false, noteName ? noteName : undefined, isIndividual !== undefined ? isIndividual : undefined, objIndex !== undefined ? objIndex : undefined)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                {notes.map((note: any, i: number) => {
                    const originalNote = originalNotes && originalNotes.find((n,index) => index === i);
                return (
                <div className={`py-2 pr-2 pl-3 border ${note.isNew ? 'border-orange-600' : 'border-[#B4B4B4]'}  rounded w-full`}>
                    <div className='flex justify-between items-start w-full mb-1'>
                        <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                            {note.type}:
                        </p>
                        {/* <div className='flex gap-2'>
                            <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName && setName(name);  setIsIndividual && setIsIndividual(isIndividual); setNoteName && setNoteName(noteName); setObjIndex && setObjIndex(objIndex)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                            <button disabled={isEditMode ? false : true} value={name} onClick={(e:any) => {deleteNote(e, i, name, note.isNew, noteName ? noteName : undefined, isIndividual !== undefined ? isIndividual : undefined, objIndex !== undefined ? objIndex : undefined)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                        </div> */}
                        <div className='flex gap-2'>
                        {!note.isCorrect && !note.isNew ? (
                            <button onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]" /></button>
                        ) : (
                            <>
                            <button disabled={isEditMode ? false : true} onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i)}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2]'/></button>
                            <button disabled={isEditMode ? false : true} onClick={(e) => deleteNote(e,i, note.isNew, true)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A]'/></button>
                            </>
                        )}
                        </div>
                        </div> 
                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    {originalNote && originalNote.type !== note.type && <ReactQuill theme='bubble' value={originalNote.note} readOnly={true} className='strike'/>}
                </div>
                )})}
            </div>
            ) : (
                <>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${originalNotes && originalNotes.length ? 'mt-3' : 'mt-0'}`}>
                    {originalNotes && originalNotes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled value={name} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName && setName(name);  setIsIndividual && setIsIndividual(isIndividual); setNoteName && setNoteName(noteName); setObjIndex && setObjIndex(objIndex)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled value={name} onClick={(e:any) => {deleteNote(e, i, name, false, noteName ? noteName : undefined, isIndividual !== undefined ? isIndividual : undefined, objIndex !== undefined ? objIndex : undefined)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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