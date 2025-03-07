import { useState, MouseEvent } from "react";

const useSchoolNotes = () => {
    const [ isNoteOpen, setIsNoteOpen ] = useState(false);

    const toggleNote = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsNoteOpen(!isNoteOpen);
    };
};

export default useSchoolNotes;