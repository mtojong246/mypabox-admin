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
    const [ selectedName, setSelectedName ] = useState('');
    const [ selectedNote, setSelectedNote ] = useState<NewNote | null>(null);

    const toggleNote = (e:MouseEvent<HTMLButtonElement>, name?: string, note?: NewNote) => {
        e.preventDefault();
        setIsNoteOpen(!isNoteOpen);

        if (name !== undefined) {
            setSelectedName(name);
        } else {
            setSelectedName('');
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
        selectedName,
        selectedNote,
    }


};

export default useSchoolNotes;