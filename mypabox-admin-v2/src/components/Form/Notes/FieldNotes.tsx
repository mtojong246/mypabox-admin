import ReactQuill from "react-quill";
import { Change, NewNote } from "../../../types/newSchools.types";
import IconButton from "../../Buttons/IconButton";
import NotePopupButton from "../../Popups/NotePopupButton";
import { ReactComponent as DeleteIcon } from '../../../components/Icons/Trash.svg';
import ChangePopup from "../Validation/ChangePopup";

export default function FieldNotes({
    notes,
    label,
    isDisabled,
    handleNotes,
    name,
    changes,
}: {
    notes: NewNote[],
    label?: string,
    isDisabled: boolean,
    handleNotes: (name: string, newNote?: NewNote, index?: number) => void;
    name: string;
    changes: Change[];
}) {


    return (
        <div className="flex flex-col gap-2 justify-start items-start w-full">
            <p className="text-default font-medium">{label ? label : ''} Notes:</p>
            {notes.length > 0 && notes.map((note,i) => {
                const change = changes.find(c => c.name !== undefined && c.name === name);
                const toBeRemoved = change && change.type === 'removed' ? true : false;

                return (
                <div className="w-full flex justify-between items-start gap-6">
                    <div className="grow flex justify-start items-start gap-2">
                        <div className={`${toBeRemoved && 'opacity-50'} grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                            <p className={`${note.type === 'requirement' ? 'text-warning' : 'text-primary'} text-[14px] font-medium`}>{note.type}</p>
                            <ReactQuill 
                                theme='bubble'
                                value={note.note} 
                                readOnly={true} 
                                className='edited-quill'
                            />
                        </div>
                        {/* {change && (
                            <ChangePopup 
                                change={change}
                                name={field.name}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                            />
                        )} */}
                    </div>
                    {!toBeRemoved && (
                        <div className="flex gap-4">
                            <NotePopupButton 
                                selectedNote={note}
                                isDisabled={isDisabled}
                                index={i}
                                handleNotes={handleNotes}
                                name={name}
                            />
                            <IconButton 
                                action={(e: any) => handleNotes(name, undefined, i)}
                                icon={<DeleteIcon/>}
                                color="warning"
                                isDisabled={isDisabled}
                            />
                        </div>
                    )}
                </div>
                )
            })}
            <NotePopupButton 
                isDisabled={isDisabled}
                handleNotes={handleNotes}
                name={name}
            />
        </div>
    )
}