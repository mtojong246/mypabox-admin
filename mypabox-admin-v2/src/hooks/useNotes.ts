import { useSelector } from "react-redux";
import { Note, School } from "../types/schools.types";
import { selectLogin } from "../app/selectors/login.selector";
import { selectUsers } from "../app/selectors/users.selectors";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { UserObject } from "../types/users.types";

const useNotes = ({ newSchool, setNewSchool }: {
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
}) => {
    const login = useSelector(selectLogin);
    const users = useSelector(selectUsers);

    const [ loggedInUser, setLoggedInUser ] = useState<UserObject | null>(null);
    const [ noteToEdit, setNoteToEdit ] = useState<Note | null>(null);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState<string | undefined>(undefined);
    const [ noteIndex, setNoteIndex ] = useState(0);
    const [ isNoteOpen, setIsNoteOpen ] = useState(false);

    useEffect(() => {
        const currentUser = users.find(user => user.email === login);
        if (currentUser) {
            setLoggedInUser(currentUser);
        }
    }, [login, users]);

    const toggleNote = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsNoteOpen(!isNoteOpen);
    };

   const openAddNote = (e:MouseEvent<HTMLButtonElement>, name: string, noteName?: string) => {
        e.preventDefault();
        toggleNote(e);
        setName(name);
        setNoteName(noteName);
   };

   const openEditNote = (e:MouseEvent<HTMLButtonElement>, index: number, note: Note, name: string, noteName?: string) => {
        e.preventDefault();
        toggleNote(e);
        setName(name);
        setNoteToEdit(note);
        setNoteName(noteName);
        setNoteIndex(index);
   }

    const addNote = (note: Note) => {
        if (loggedInUser) {

            if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                const field = newSchool[name as keyof School] as any;
                const notes = field[noteName ? noteName : 'notes'] as Note[];
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [noteName ? noteName : 'notes']: notes.concat(note),
                    }
                })
            } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                const editedName = `edited_${name}`;

                const field = newSchool[editedName as keyof object] as any;
                const notes = field.notes as Note[];
                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        notes: notes.concat(note),
                    }
                })
            }

        }
        
    };
    

    const updateNote = (note: Note) => {
        if (loggedInUser) {

            if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {

                const field = newSchool[name as keyof School] as any;
                const notes = field[noteName ? noteName : 'notes'] as Note[];

                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [noteName ? noteName : 'notes']: notes.map((n,i) => {
                            if (i === noteIndex) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                const editedName = `edited_${name}`;

                const field = newSchool[editedName as keyof object] as any;
                const notes = field.notes as Note[];

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        [noteName ? noteName : 'notes']: notes.map((n,i) => {
                            if (i === noteIndex) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            }

        }
        
        
    };


    const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number, name: string, noteName?: string) => {
        e.preventDefault();

        if (loggedInUser) {

            if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
                const field = newSchool[name as keyof School] as any;
                const notes = field[noteName ? noteName : 'notes'] as Note[];

                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...field,
                        [noteName ? noteName : 'notes']: notes.filter((n,i) => i !== index)
                    }
                })
            } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
                const editedName = `edited_${name}`;

                const field = newSchool[editedName as keyof object] as any;
                const notes = field.notes as Note[];

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...field,
                        [noteName ? noteName : 'notes']: notes.filter((n,i) => i !== index)
                    }
                })
            }

        };
        resetValues();
    };

    const addOrEditNote = (e: MouseEvent<HTMLButtonElement>, noteForm: Note) => {
        e.preventDefault();
        if (noteForm.note === '') {
            alert('Please add text to note')
        } else {
            if (noteToEdit) {
              updateNote(noteForm);
            } else {
                addNote(noteForm);
            }
            toggleNote(e)
            resetValues();
        }
    };

    const cancelNote = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleNote(e);
        resetValues();
    };

    const resetValues = () => {
        setName('');
        setNoteIndex(0);
        setNoteName(undefined);
        setNoteToEdit(null);
    }

    return {
        deleteNote,
        openAddNote,
        openEditNote,
        toggleNote,
        isNoteOpen,
        noteToEdit,
        addOrEditNote,
        cancelNote,
        setName
    }

};

export default useNotes;