import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { GenericSchoolField, NewNote, NewSchool } from "../types/newSchools.types";

const useSchoolNotes = ({
    school,
    setSchool,
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) => {
    const [ isNoteOpen, setIsNoteOpen ] = useState(false);
    const [ selectedField, setSelectedField ] = useState<{
        name: string,
        path: string,
        noteIndex?: number,
    } | null>(null);
    const [ selectedNote, setSelectedNote ] = useState<NewNote | null>(null);

    const toggleNote = (e:MouseEvent<HTMLButtonElement>, field?: { name: string, path: string, noteIndex?: number }, note?: NewNote) => {
        e.preventDefault();
        setIsNoteOpen(!isNoteOpen);

        if (field !== undefined) {
            setSelectedField(field);
        } else {
            setSelectedField(null);
        }

        if (note !== undefined) {
            setSelectedNote(note);
        } else {
            setSelectedNote(null);
        }
    };

    const deleteNote = (e: MouseEvent<HTMLButtonElement>, name: string, path: string, noteIndex: number) => {
        e.preventDefault();

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        const originalField = {...field.original};
        let original = originalField;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i] as keyof object];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }
        
        const originalNotes = original[lastKey as keyof object] as NewNote[];
        (original[lastKey as keyof object] as NewNote[]) = originalNotes.filter((note, i) => i !== noteIndex);

        setSchool({
            ...school,
            [name]: {
                ...field,
                original: originalField,
            }
        })
    }




    return {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
        deleteNote
    }


};

export default useSchoolNotes;