import ReactQuill from "react-quill"
import { ChangeEvent, useState, MouseEvent, useEffect } from "react"
import 'react-quill/dist/quill.snow.css';
import { NewNote } from "../../../../../types/newSchools.types";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg'
import Button from "../../../../../components/Buttons/Button";

const defaultNote = {
    type: 'information',
    note: '',
}


export default function NotePopup({
    selectedNote,
    toggleNotePopup,
    handleSubmit,
}: {
    selectedNote: NewNote | null,
    toggleNotePopup: (e: React.MouseEvent<HTMLButtonElement>, index?: number, note?: any) => void,
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, form: NewNote) => void,

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
    };


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[600px] rounded-lg bg-white'>
                    <div className="flex justify-between items-center gap-6 p-6">
                        <p className="font-medium text-[24px]">{selectedNote ? 'Edit Note' : 'Add Note'}</p>
                        <button onClick={toggleNotePopup} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                    </div>

                    <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>
                        <div className="flex flex-col gap-4 justify-start items-start w-full">
                            <label className="text-[16px] font-medium">Select note type:</label>
                            <label htmlFor="information" className={`flex justify-start items-center gap-2 py-3 px-6 rounded-lg border w-full hover:cursor-pointer transition-all ${noteForm.type === 'information' ? 'border-primary bg-primary/[0.1]' : 'border-outline bg-none hover:bg-primary/[0.05]'}`}>
                                <input onChange={handleType} id='information' value='information' type='radio' checked={noteForm.type === 'information'}/>
                                Information
                            </label>
                            <label htmlFor="requirement" className={`flex justify-start items-center gap-2 py-3 px-6 rounded-lg border w-full hover:cursor-pointer transition-all ${noteForm.type === 'requirement' ? 'border-primary bg-primary/[0.1]' : 'border-outline bg-none hover:bg-primary/[0.05]'}`}>
                                <input onChange={handleType} id='requirement' value='requirement' type='radio' checked={noteForm.type === 'requirement'}/>
                                Requirement
                            </label>
                        </div>
                        
                        <div className='flex flex-col gap-2 justify-start items-start w-full mb-10'>
                            <label className='font-medium'>Note:</label>
                            <ReactQuill 
                                theme="snow" 
                                onChange={handleNote} 
                                value={noteForm.note}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className='w-full p-6 flex justify-end items-center gap-3'>
                        <Button 
                            label="Cancel"
                            action={toggleNotePopup}
                            type='default'
                            styling="outline"
                        />
                        <Button 
                            label={`${selectedNote ? 'Edit' : 'Add'} Note`}
                            action={(e:any) => handleSubmit(e, noteForm)}
                            type='primary'
                            styling="solid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}