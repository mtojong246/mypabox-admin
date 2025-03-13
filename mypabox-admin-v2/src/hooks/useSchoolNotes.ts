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
    } | null>(null);
    const [ selectedNote, setSelectedNote ] = useState<NewNote | null>(null);

    const toggleNote = (e:MouseEvent<HTMLButtonElement>, field?: { name: string, path: string }, note?: NewNote) => {
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

    const addNote = (e: MouseEvent<HTMLButtonElement>, name: string, path: string, newNote: NewNote) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.').filter(key => key); // Split the index string into keys
        let original = field.original;

        for (let i = 0; i < keys.length - 1; i++) {
            let key: string | number = keys[i];

            if (!isNaN(Number(key))) {
                key = Number(key);
            }
            
            if (!(keys[i] in field)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }

        let lastKey: string | number = keys[keys.length-1];
        if (!isNaN(Number(lastKey))) {
            lastKey = Number(lastKey);
        }
        
        original[lastKey] = newNote;

        console.log(original);
    }


    return {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
        addNote,
    }


};

export default useSchoolNotes;