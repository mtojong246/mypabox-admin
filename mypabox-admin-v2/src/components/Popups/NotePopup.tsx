import ReactQuill from "react-quill"
import { ChangeEvent, useState, MouseEvent, useEffect } from "react"
import 'react-quill/dist/quill.snow.css';
import { NewNote } from "../../types/newSchools.types";

import { ReactComponent as CloseIcon } from '../Icons/X.svg';
import Button from "../Buttons/Button";

const defaultNote = {
    type: 'information',
    note: '',
}


export default function NotePopup({
    toggleNotePopup,
    selectedField,
    selectedNote,
}: {
    toggleNotePopup: (e:MouseEvent<HTMLButtonElement>, field?: { name: string, path: string }, note?: NewNote) => void,
    selectedField: { name: string, path: string },
    selectedNote: NewNote | null,
}) {
    const [ noteForm, setNoteForm ] = useState<NewNote>(defaultNote)

    useEffect(() => {
        if (selectedNote) {
          setNoteForm(selectedNote)
        } else {
          setNoteForm(defaultNote)
        }
    }, [selectedNote])

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
                <div className='w-full max-w-[900px] rounded-lg bg-white'>
                    <div className="flex justify-between items-center gap-6 p-6">
                        <p className="font-medium text-[24px]">{selectedNote ? 'Edit Note' : 'Add Note'}</p>
                        <button onClick={toggleNotePopup} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                    </div>

                    <div className='w-full p-6 flex flex-col justify-start items-start gap-8'>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <label className="text-[16px] font-medium">Select note type:</label>
                            <label htmlFor="information" className="flex justify-start items-center gap-2 py-3 px-6 rounded-lg">
                                <input onChange={handleType} id='information' value='information' type='radio' checked={noteForm.type === 'information'}/>
                                Information
                            </label>
                            <label htmlFor="requirement" className="flex justify-start items-center gap-2 py-3 px-6 rounded-lg">
                                <input onChange={handleType} id='requirement' value='requirement' type='radio' checked={noteForm.type === 'requirement'}/>
                                Requirement
                            </label>
                        </div>
                        
                        <div className='flex flex-col gap-2 justify-start items-start w-full mb-10'>
                            <label className='font-medium'>Note:</label>
                            <ReactQuill className='mt-2 h-[200px] rounded w-full' theme="snow" onChange={handleNote} value={noteForm.note}/>
                        </div>
                    </div>
                    
                    <div className='w-full p-6 flex justify-end items-center gap-3'>
                        <Button 
                            label="Cancel"
                            action={toggleNotePopup}
                            type='disable'
                            styling="outline"
                        />
                        {/* <button onClick={(e) => addOrEditNote(e, noteForm, groupName)} className='border-2 border-[#4573D2] bg-[#4573D2] text-white font-medium px-3 py-2 rounded hover:text-white hover:bg-[#3558A0]'>{editedNote ? 'Edit note' : 'Add note'}</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}