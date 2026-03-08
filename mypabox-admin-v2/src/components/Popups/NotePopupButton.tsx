import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import Modal from '@mui/material/Modal';
import { NewNote } from "../../types/newSchools.types";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { ReactComponent as CloseIcon } from '../Icons/X.svg';
import { ReactComponent as PlusIcon } from '../../components/Icons/Plus.svg';
import { ReactComponent as EditIcon } from '../../components/Icons/Edit-With-Line.svg';
import Button from "../Buttons/Button";
import IconButton from "../Buttons/IconButton";

const defaultNote = {
    type: 'information',
    note: '',
}

export default function NotePopupButton({
    selectedNote,
    isDisabled,
    index,
    handleNotes,
    name,
}: {
    selectedNote?: NewNote,
    isDisabled: boolean,
    index?: number,
    handleNotes: (name: string, newNote?: NewNote, index?: number) => void,
    name: string,
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleNotes(name, noteForm, index);
        handleClose();
    }

    return (
    <div>
        {selectedNote ? (
            <IconButton 
                action={handleOpen}
                icon={<EditIcon/>}
                color="primary"
                isDisabled={isDisabled}
            />
        ) : (
            <Button 
                type={isDisabled ? 'disable' : 'primary'}
                styling="outline"
                label='Add Note'
                action={handleOpen}
                adornment={<PlusIcon/>}
            />
        )}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='w-full max-w-[600px] rounded-lg bg-white'>
                <div className="flex justify-between items-center gap-6 p-6">
                    <p className="font-medium text-[24px]">{selectedNote ? 'Edit Note' : 'Add Note'}</p>
                    <button onClick={handleClose} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
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
                        action={handleClose}
                        type='default'
                        styling="outline"
                    />
                    <Button 
                        label={`${selectedNote ? 'Edit' : 'Add'} Note`}
                        action={handleSubmit}
                        type='primary'
                        styling="solid"
                    />
                </div>
            </div>
      </Modal>
    </div>
    )
}