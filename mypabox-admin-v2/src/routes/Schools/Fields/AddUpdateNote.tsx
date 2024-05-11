import ReactQuill from "react-quill"
import { Note, NoteInfoObj } from "../../../types/schools.types"
import { ChangeEvent, useState, MouseEvent, useEffect, Dispatch, SetStateAction } from "react"


const defaultNote = {
    type: 'information',
    note: '',
}


export default function AddUpdateNote({ noteInfoObj, toggleNotePopup, addNote, setNoteInfoObj, updateNote }: { 
    toggleNotePopup: (e:any) => void, 
    addNote: (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, note: Note, innerFieldName?: string, altNoteName?: string) => void,
    updateNote: (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, note: Note, index: number, innerFieldName?: string, altNoteName?: string) => void,
    setNoteInfoObj: Dispatch<SetStateAction<NoteInfoObj | null>>
    noteInfoObj: NoteInfoObj | null,
}) {
    const [ noteObj, setNoteObj ] = useState<Note>(defaultNote)

    useEffect(() => {
        if (noteInfoObj && noteInfoObj.existingNote) {
            setNoteObj(noteInfoObj.existingNote)
        } else {
            setNoteObj(defaultNote);
        }
    }, [noteInfoObj])

    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        setNoteObj({
            ...noteObj,
            type: (e.target as HTMLInputElement).value,
        })
    }

    const handleNote = (e:any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        setNoteObj({
            ...noteObj,
            note: note,
        })
    }

    const addOrEditNote = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (noteObj.note === '') {
            alert('Please add text to note')
        } else {
            if (noteInfoObj) {
                const { altNoteName, index, innerFieldName, isEditField, name} = noteInfoObj;

                if (index !== undefined) {
                    updateNote(e, name, isEditField, noteObj, index, innerFieldName, altNoteName);
                } else {
                    addNote(e, name, isEditField, noteObj, innerFieldName, altNoteName);
                }
                toggleNotePopup(e)
                // resets note to be edited
                setNoteInfoObj(null);
            }
            
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{noteInfoObj && noteInfoObj.index !== undefined ? 'Edit Note' : 'Add Note'}</p>
                    <div className='w-full mb-8'>
                        <p className='mb-4 font-medium'>Select type:</p>
                        <div className='ml-4 mb-2'>
                            <input onChange={handleType} value='information' type='radio' className='mr-2' checked={noteObj.type === 'information' ? true : false}/>
                            <label>Information</label>
                        </div>
                        <div className='ml-4'>
                            <input onChange={handleType} value='requirement' type='radio' className='mr-2' checked={noteObj.type === 'requirement' ? true : false}/>
                            <label>Requirement</label>
                        </div>
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={noteObj.note}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleNotePopup(e); setNoteInfoObj(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => addOrEditNote(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{noteInfoObj && noteInfoObj.index !== undefined ? 'Edit note' : 'Add note'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}