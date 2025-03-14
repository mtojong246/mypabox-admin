import ReactQuill from "react-quill"
import { NewNote } from "../../../types/newSchools.types"
import { MouseEvent } from "react"
import Button from "../../Buttons/Button"
import { ReactComponent as PlusIcon } from '../../../components/Icons/Plus.svg';
import { ReactComponent as EditIcon } from '../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../components/Icons/Trash.svg';

export default function Notes({
    notes,
    field,
    toggleNote,
    deleteNote,
}: {
    notes: NewNote[],
    field: {
        label: string,
        name: string,
        type: string,
        path: string,
        notePath: string,
    },
    toggleNote: (e:MouseEvent<HTMLButtonElement>, field?: { name: string, path: string, noteIndex?: number }, note?: NewNote) => void,
    deleteNote: (e: MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => void,
}) {
    return (
        <div className="flex flex-col gap-4 justify-start items-start w-full">
            <p className="text-default">Notes:</p>
            {notes.length > 0 && notes.map((note,i) => (
                <div className="w-full flex justify-between items-start gap-6">
                    <div className="grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline">
                        <p className={`${note.type === 'requirement' ? 'text-warning' : 'text-primary'} text-[14px] font-medium`}>{note.type}</p>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={(e:any) => {toggleNote(e, { name: field.name, path: field.notePath, noteIndex: i }, note)}} 
                            className="w-[24px] text-primary"
                        >   
                            <EditIcon/>
                        </button>
                        <button 
                            onClick={(e:any) => {deleteNote(e, field.name, field.notePath, i)}} 
                            className="w-[24px] text-warning"
                        >
                            <DeleteIcon/>
                        </button>
                    </div>
                </div>
            ))}
            <Button 
                type='primary'
                styling="outline"
                label='Add Note'
                action={(e: any) => {toggleNote(e, { name: field.name, path: field.notePath })}}
                adornment={<PlusIcon/>}
            />
        </div>
    )
}