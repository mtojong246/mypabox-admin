import { ChangeEvent, Dispatch, SetStateAction, useState, KeyboardEvent, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import AddNoteFields from "../../Assets/AddNoteFields";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";

import { enableEditMode, confirmEdit, undoEdit, revertEdit } from "./GeneralInfoFunctions";
import InputFields from "../../Assets/InputsFields";

export default function PANCEPassRate({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

    const [firstSelected, setFirstSelected] = useState('');
    const [fiveSelected, setFiveSelected] = useState('');

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInput | NumberInput;
        let value = e.target.value;
        if (e.target.value.includes('%')) {
            value = e.target.value.replace('%', '')
        }
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: value + '%',
                }
            })
        
    };

    const keyDownFirst = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (firstSelected) {
                setNewSchool({
                    ...newSchool,
                    school_first_time_pass_rate: {
                        ...newSchool.school_first_time_pass_rate,
                        input: newSchool.school_first_time_pass_rate.input.replace(firstSelected, '')
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_first_time_pass_rate: {
                        ...newSchool.school_first_time_pass_rate,
                        input: newSchool.school_first_time_pass_rate.input.replace('%', '')
                    }
                })
            }
            setFirstSelected('')
        }
    }

    const keyDownFive = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (fiveSelected) {
                setNewSchool({
                    ...newSchool,
                    school_average_five_year_first_time_pass_rate: {
                        ...newSchool.school_average_five_year_first_time_pass_rate,
                        input: newSchool.school_average_five_year_first_time_pass_rate.input.replace(fiveSelected, '')
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_average_five_year_first_time_pass_rate: {
                        ...newSchool.school_average_five_year_first_time_pass_rate,
                        input: newSchool.school_average_five_year_first_time_pass_rate.input.replace('%', '')
                    }
                })
            }
            setFiveSelected('')
        }
    }

    const mouseUp = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedValue = selection.toString();
            setFirstSelected(selectedValue)
        }
    }

    const mouseUp2 = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedValue = selection.toString();
            setFiveSelected(selectedValue)
        }
    }



    

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_pance_pass_rate_note: e,
        })
    };

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        }
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        }
        
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const field = newSchool[`edited_${name}` as keyof School] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        }
        
    };

    const addLink = (e:MouseEvent<HTMLButtonElement>, newLink: string) => {
        e.preventDefault();
        const linkName = `edited_${linkObj.name}`
        setNewSchool({
            ...newSchool,
            [linkName]: {
                ...newSchool[linkName as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }

    console.log(newSchool.edited_school_first_time_pass_rate)


    return (
        <>
        <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
        <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`} onMouseUp={mouseUp}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_first_time_pass_rate.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} />
            <Indicator label="First Time Pass Rate" editedInput={newSchool.edited_school_first_time_pass_rate.input} />
                <div className='flex justify-center items-start gap-3'>
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_first_time_pass_rate.input} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} originalInput={newSchool.school_first_time_pass_rate.input} name='school_first_time_pass_rate' handleInput={handleInput} keyDown={keyDownFirst}/>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} notes={newSchool.edited_school_first_time_pass_rate.notes} originalNotes={newSchool.school_first_time_pass_rate.notes} name='school_first_time_pass_rate' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_first_time_pass_rate.isEditMode} input={newSchool.edited_school_first_time_pass_rate.input} link={newSchool.edited_school_first_time_pass_rate.link} 
                   setLinkObj={setLinkObj} name='school_first_time_pass_rate' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`} onMouseUp={mouseUp2}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_average_five_year_first_time_pass_rate.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} />
                <Indicator label="Five Year Average First-Time Pass Rate" editedInput={newSchool.edited_school_average_five_year_first_time_pass_rate.input} />
                <div className='flex justify-center items-start gap-3'>
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_average_five_year_first_time_pass_rate.input} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} originalInput={newSchool.school_average_five_year_first_time_pass_rate.input} name='school_average_five_year_first_time_pass_rate' handleInput={handleInput} keyDown={keyDownFive}/>
                    
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('school_average_five_year_first_time_pass_rate')}} name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} notes={newSchool.edited_school_average_five_year_first_time_pass_rate.notes} originalNotes={newSchool.school_average_five_year_first_time_pass_rate.notes} name='school_average_five_year_first_time_pass_rate' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            {isEdit && <EditButtons isEdit={isEdit}loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_five_year_first_time_pass_rate.isEditMode} input={newSchool.edited_school_average_five_year_first_time_pass_rate.input} link={newSchool.edited_school_average_five_year_first_time_pass_rate.link} 
                   setLinkObj={setLinkObj} name='school_average_five_year_first_time_pass_rate' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>

            <div className={`mt-28 text-xl w-full`}>
                <p>PANCE Pass Rate Notes</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_pance_pass_rate_note} 
                onChange={handleQuill}/>
            </div>

            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}