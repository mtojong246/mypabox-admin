import ReactQuill from "react-quill"
import { ChangeEvent, useState, MouseEvent, useEffect } from "react"
import { Note } from "../../../types/schools.types"
import 'react-quill/dist/quill.snow.css';

const defaultNote = {
    type: 'information',
    note: '',
}


export default function AddNote({ editedNote, addOrEditNote, cancelNote }: { 
    editedNote: Note | null,
    addOrEditNote: (e: MouseEvent<HTMLButtonElement>, noteForm: Note) => void,
    cancelNote: (e: MouseEvent<HTMLButtonElement>) => void,
}) {
    const [ noteForm, setNoteForm ] = useState<Note>(defaultNote)

    useEffect(() => {
        if (editedNote) {
          setNoteForm(editedNote)
        } else {
          setNoteForm(defaultNote)
        }
    }, [editedNote])

    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
      setNoteForm({
            ...noteForm,
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
        setNoteForm({
            ...noteForm,
            note: note,
        })
    }



    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{editedNote ? 'Edit Note' : 'Add Note'}</p>
                    <div className='w-full mb-8'>
                        <p className='mb-4 font-medium'>Select type:</p>
                        <div className='ml-4 mb-2'>
                            <input onChange={handleType} value='information' type='radio' className='mr-2' checked={noteForm.type === 'information' ? true : false}/>
                            <label>Information</label>
                        </div>
                        <div className='ml-4'>
                            <input onChange={handleType} value='requirement' type='radio' className='mr-2' checked={noteForm.type === 'requirement' ? true : false}/>
                            <label>Requirement</label>
                        </div>
                    </div>
                    <div className='w-full mb-14'>
                        <label className='font-medium'>Note:</label>
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={noteForm.note}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={(e) => cancelNote(e)} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded hover:text-white hover:bg-[#B4B4B4]'>Cancel</button>
                        <button onClick={(e) => addOrEditNote(e, noteForm)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedNote ? 'Edit note' : 'Add note'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}