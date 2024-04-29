import { Dispatch, SetStateAction, MouseEvent, useState } from "react";
import { Note, NoteInfoObj, School } from "../../types/schools.types";

const useNotes = ({ newSchool, setNewSchool }: {
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
}) => {

    const [ isNoteOpen, setIsNoteOpen ] = useState(false);
    const [ noteInfoObj, setNoteInfoObj ] = useState<NoteInfoObj | null>(null);

    const toggleNotePopup = (e:any) => {
        setIsNoteOpen(!isNoteOpen);
    }

    const addNewNote = (e:MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, innerFieldName?: string, altNoteName?: string) => {
        setNoteInfoObj({
            name: fieldName,
            isEditField: isEditMode,
            innerFieldName,
            altNoteName,
        })
        toggleNotePopup(e);
    }

    const addNoteObj = (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, note: Note, innerFieldName?: string, altNoteName?: string) => {
        const name = fieldName as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const notes = 'notes' as keyof object;
        const alt = altNoteName as keyof object;


        if (innerFieldName === undefined) {
            
            if (isEditMode) {
                const noteArr: Note[] = Array.from(field[notes]);
                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        notes: !noteArr.length || !noteArr ? [note] : noteArr.concat(note),
                    }
                })
            } else {
                const noteArr: Note[] = Array.from(field[altNoteName ? alt : notes]);
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [altNoteName ? alt : notes]: !noteArr.length || !noteArr ? [note] : noteArr.concat(note),
                    }
                })
            }

        } else {

            const innerField = isEditMode ? `edited_${innerFieldName}` as keyof object : innerFieldName as keyof object;
            let innerObj = field[innerField] as object;
            const noteArr: Note[] = Array.from(field[innerField][isEditMode ? notes : altNoteName ? alt : notes]);

            setNewSchool({
                ...newSchool,
                [isEditMode ? editedName : name]: {
                    ...field,
                    [innerField]: {
                        ...innerObj,
                        [isEditMode ? notes : altNoteName ? alt : notes]: noteArr.length || !noteArr ? [note] : noteArr.concat(note),
                    }
                }
            })
        }
    }

    const updateNoteObj = (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, note: Note, index: number, innerFieldName?: string, altNoteName?: string) => {
        const name = fieldName as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const notes = 'notes' as keyof object;
        const alt = altNoteName as keyof object;

        if (innerFieldName === undefined) {
            
            if (isEditMode) {
                const noteArr: Note[] = Array.from(field[notes]);
                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        notes: noteArr.map((n,i) => {
                            if (i === index) {
                                return {...note}
                            } else {
                                return {...n}
                            }
                        })
                    }
                })
            } else {
                const noteArr: Note[] = Array.from(field[altNoteName ? alt : notes]);
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [altNoteName ? alt : notes]: noteArr.map((n,i) => {
                            if (i === index) {
                                return {...note}
                            } else {
                                return {...n}
                            }
                        }),
                    }
                })
            }

        } else {

            const innerField = isEditMode ? `edited_${innerFieldName}` as keyof object : innerFieldName as keyof object;
            let innerObj = field[innerField] as object;
            const noteArr: Note[] = Array.from(field[innerField][isEditMode ? notes : altNoteName ? alt : notes]);

            setNewSchool({
                ...newSchool,
                [isEditMode ? editedName : name]: {
                    ...field,
                    [innerField]: {
                        ...innerObj,
                        [isEditMode ? notes : altNoteName ? alt : notes]: noteArr.map((n,i) => {
                            if (i === index) {
                                return {...note}
                            } else {
                                return {...n}
                            }
                        }),
                    }
                }
            })
        }
    }

    const deleteNoteObj = (e: MouseEvent<HTMLButtonElement>, fieldName: string, isEditMode: boolean, index: number, innerFieldName?: string, altNoteName?: string) => {
        const name = fieldName as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const notes = 'notes' as keyof object;
        const alt = altNoteName as keyof object;

        if (innerFieldName === undefined) {
            
            if (isEditMode) {
                const noteArr: Note[] = Array.from(field[notes]);
                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        notes: noteArr.filter((n,i) => i !== index),
                    }
                })
            } else {
                const noteArr: Note[] = Array.from(field[altNoteName ? alt : notes]);
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [altNoteName ? alt : notes]: noteArr.filter((n,i) => i !== index),
                    }
                })
            }

        } else {

            const innerField = isEditMode ? `edited_${innerFieldName}` as keyof object : innerFieldName as keyof object;
            let innerObj = field[innerField] as object;
            const noteArr: Note[] = Array.from(field[innerField][isEditMode ? notes : altNoteName ? alt : notes]);

            setNewSchool({
                ...newSchool,
                [isEditMode ? editedName : name]: {
                    ...field,
                    [innerField]: {
                        ...innerObj,
                        [isEditMode ? notes : altNoteName ? alt : notes]: noteArr.filter((n,i) => i !== index),
                    }
                }
            })
        }

        
    }

    return {
        addNoteObj,
        updateNoteObj,
        deleteNoteObj,
        addNewNote,
        isNoteOpen,
        toggleNotePopup,
        noteInfoObj,
        setNoteInfoObj,
    }

}

export default useNotes;
