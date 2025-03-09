import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { NewNote, NewSchool } from "../types/newSchools.types";

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


    return {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
    }


};

export default useSchoolNotes;