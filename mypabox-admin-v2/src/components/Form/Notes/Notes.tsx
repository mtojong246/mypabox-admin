import ReactQuill from "react-quill"
import { Change, GenericSchoolField, NewNote } from "../../../types/newSchools.types"
import { MouseEvent, useEffect, useState } from "react"
import Button from "../../Buttons/Button"
import { ReactComponent as PlusIcon } from '../../../components/Icons/Plus.svg';
import { ReactComponent as EditIcon } from '../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../components/Icons/Trash.svg';
import ChangePopup from "../Validation/ChangePopup";
import IconButton from "../../Buttons/IconButton";

export default function Notes({
    notes,
    field,
    toggleNote,
    schoolField,
    validateIndividualChange,
    revertIndividualChange,
    handleChanges,
    handleModification,
    checkIfValueHasBeenRemoved,
    tab,
    label,
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
    schoolField: GenericSchoolField,
    validateIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: React.MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
    },
    checkIfValueHasBeenRemoved?: (path: string, field: GenericSchoolField) => any | null;
    tab?: 'original' | 'modified';
    label?: string,
}) {
    const [ changes, setChanges ] = useState<Change[]>([]);
    const [ noteValues, setNoteValues ] = useState<{
        note: NewNote,
        toBeRemoved: boolean,
    }[]>([]);

    useEffect(() => {
        if (schoolField !== undefined) {
            const allChanges = schoolField.changes;
            setChanges(allChanges);

            let flaggedNotes: {
                note: NewNote,
                toBeRemoved: boolean,
            }[] = notes.map(note => ({ note, toBeRemoved: false }));

            if (checkIfValueHasBeenRemoved && tab !== undefined && tab === 'modified') {
                const removedChanges = allChanges.filter(change => change.type === 'removed');
                if (removedChanges.length > 0) {
                    removedChanges.forEach(change => {
                        const keys = change.path.split('.');
                        const index = keys[keys.length-1];
    
                        const originalNoteValue = checkIfValueHasBeenRemoved(change.path, schoolField);
                        if (originalNoteValue !== null) {
                            flaggedNotes.splice(Number(index), 0, {
                                note: originalNoteValue,
                                toBeRemoved: true,
                            })
                        }
                    })
                }
            };

            setNoteValues(flaggedNotes);

        }
    }, [schoolField, notes, checkIfValueHasBeenRemoved, tab]);


    const deleteNote = (e:any, name: string, path: string, index: number) => {
        e.preventDefault();

        const {
            originalField,
            draftField,
        } = handleModification(path, schoolField, '', 'remove', index);

        const notePath = `${path}.${index}`;

        handleChanges(schoolField, name, originalField, draftField, notePath, 'removed');

    }
    
    return (
        <div className="flex flex-col gap-2 justify-start items-start w-full">
            <p className="text-default font-medium">{label ? label : ''} Notes:</p>
            {noteValues.length > 0 && noteValues.map((noteValue,i) => {
                const notePath = `${field.notePath}.${i}`;
                const change = changes.find(change => change.path === notePath);
                const note = noteValue.note;

                return (
                <div className="w-full flex justify-between items-start gap-6">
                    <div className="grow flex justify-start items-start gap-2">
                        <div className={`${noteValue.toBeRemoved && 'opacity-50'} grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                            <p className={`${note.type === 'requirement' ? 'text-warning' : 'text-primary'} text-[14px] font-medium`}>{note.type}</p>
                            <ReactQuill 
                                theme='bubble'
                                value={note.note} 
                                readOnly={true} 
                                className='edited-quill'
                            />
                        </div>
                        {change && (
                            <ChangePopup 
                                change={change}
                                name={field.name}
                                validateIndividualChange={validateIndividualChange}
                                revertIndividualChange={revertIndividualChange}
                            />
                        )}
                    </div>
                    {!noteValue.toBeRemoved && (
                        <div className="flex gap-4">
                            <IconButton 
                                action={(e: any) => toggleNote(e, { name: field.name, path: field.notePath, noteIndex: i }, note)}
                                icon={<EditIcon/>}
                                color="primary"
                                isDisabled={false}
                            />
                            <IconButton 
                                action={(e: any) => deleteNote(e, field.name, field.notePath, i)}
                                icon={<DeleteIcon/>}
                                color="warning"
                                isDisabled={false}
                            />
                        </div>
                    )}
                </div>
                )
            })}
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