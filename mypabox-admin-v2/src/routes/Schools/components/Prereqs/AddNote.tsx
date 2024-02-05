import ReactQuill from "react-quill"
import { Note } from "../../../../types/schools.types"
import { ChangeEvent, useState, MouseEvent, useEffect, Dispatch, SetStateAction } from "react"
import { UserObject } from "../../../../types/users.types"

const defaultNote = {
    type: 'information',
    note: '',
}


export default function AddNote({ loggedInUser, toggleNotePopup, addNote, editedNote, setEditedNote, updateNote }: { 
    toggleNotePopup: (e:any) => void, 
    addNote: (note: Note, isEditedInput?: boolean) => void,
    editedNote: Note | null,
    updateNote: (note: Note, isEditedInput?: boolean) => void,
    setEditedNote: Dispatch<SetStateAction<Note | null>>,
    loggedInUser?: UserObject
}) {
    const [ optionalNote, setOptionalNote ] = useState<Note>(defaultNote)

    useEffect(() => {
        if (editedNote) {
            setOptionalNote(editedNote)
        } else {
            setOptionalNote(defaultNote)
        }
    }, [editedNote])

    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        setOptionalNote({
            ...optionalNote,
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
        setOptionalNote({
            ...optionalNote,
            note: note,
        })
    }

    const addOrEditNote = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (optionalNote.note === '') {
            alert('Please add text to note')
        } else {
            if (editedNote) {
                updateNote(optionalNote, loggedInUser === undefined ? undefined : loggedInUser.isSuperAdmin ? false : true)
            } else {
                addNote(optionalNote, loggedInUser === undefined ? undefined : loggedInUser.isSuperAdmin ? false : true)
            }
            toggleNotePopup(e)
            // resets note to be edited
            setEditedNote(null)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedNote ? 'Edit Note' : 'Add Note'}</p>
                    <div className='w-full mb-8'>
                        <p className='mb-4 font-medium'>Select type:</p>
                        <div className='ml-4 mb-2'>
                            <input onChange={handleType} value='information' type='radio' className='mr-2' checked={optionalNote.type === 'information' ? true : false}/>
                            <label>Information</label>
                        </div>
                        <div className='ml-4'>
                            <input onChange={handleType} value='requirement' type='radio' className='mr-2' checked={optionalNote.type === 'requirement' ? true : false}/>
                            <label>Requirement</label>
                        </div>
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={optionalNote.note}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(null)}} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => addOrEditNote(e)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedNote ? 'Edit note' : 'Add note'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}