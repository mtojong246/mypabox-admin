import ReactQuill from "react-quill"
import { Note } from "../../../../types/schools.types"
import { ChangeEvent, useState } from "react"

const defaultNote = {
    type: 'information',
    note: '',
}

const placeHolder = () => {
    return null;
}

export default function AddNote({ toggleNotePopup, addNote, addNoteToCategory }: { toggleNotePopup: (e:any) => void, addNote?: (note: Note) => void, addNoteToCategory?: (note: Note) => void, }) {
    const [ optionalNote, setOptionalNote ] = useState<Note>(defaultNote)

    const handleType = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        setOptionalNote({
            ...optionalNote,
            type: (e.target as HTMLInputElement).value,
        })
    }

    const handleNote = (e:any) => {
        setOptionalNote({
            ...optionalNote,
            note: e,
        })
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[900px] rounded-lg p-4 bg-white'>
                    <p className='text-xl font-semibold mb-8'>{addNote ? 'Add Note to Required Optional Group' : 'Add Note to Required Course Category'}</p>
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
                        <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote}/>
                    </div>
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button onClick={toggleNotePopup} className='border-2 border-[#B4B4B4] bg-none text-[#B4B4B4] font-medium px-3 py-2 rounded-md'>Cancel</button>
                        <button onClick={(e) => {toggleNotePopup(e); (addNote) ? addNote(optionalNote) : addNoteToCategory && addNoteToCategory(optionalNote)}} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded-md'>Add note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}