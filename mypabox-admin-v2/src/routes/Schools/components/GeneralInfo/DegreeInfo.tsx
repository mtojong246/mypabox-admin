import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent, useEffect } from "react";
import { School, Note, BooleanInput, StringInputWithFields } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import LinkPopup from "../../LinkPopup";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import AddNoteFields from "../../Assets/AddNoteFields";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import { enableEditModeBool, confirmEditBool, undoEditBool, revertEditBool } from "./GeneralInfoFunctions";
import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./EmailPhoneFunctions";
import { UserObject } from "../../../../types/users.types";
import TypeOfDegree from "./TypeOfDegree";

export default function DegreeInfo({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');
    // const [inputList, setInputList] = useState([{ input: '' }]);
    const [ field, setField ] = useState('');
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);

    useEffect(() => {
        if (newSchool.edited_school_type_of_degree_offered.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_type_of_degree_offered.input])

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

    const addField = (e:any, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_type_of_degree_offered: {
                    ...newSchool.school_type_of_degree_offered,
                    fields: newSchool.school_type_of_degree_offered.fields.concat(field),
                }
            });
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_type_of_degree_offered: {
                    ...newSchool.edited_school_type_of_degree_offered,
                    input: newSchool.edited_school_type_of_degree_offered.input!.concat({
                        name: field,
                        isCorrect: true,
                        isNew: true,
                    })
                }
            })
        }
        
        setField('')
    };

    const removeField = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_type_of_degree_offered: {
                    ...newSchool.school_type_of_degree_offered,
                    fields: newSchool.school_type_of_degree_offered.fields.filter((f,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_type_of_degree_offered: {
                    ...newSchool.edited_school_type_of_degree_offered,
                    input: isNew ? newSchool.edited_school_type_of_degree_offered.input!.filter((inp,i) => i !== index) : newSchool.edited_school_type_of_degree_offered.input!.map((inp,i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: false }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    }

    const undoDelete = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_type_of_degree_offered: {
                ...newSchool.edited_school_type_of_degree_offered,
                input: newSchool.edited_school_type_of_degree_offered.input!.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: true }
                    } else {
                        return { ...inp }
                    }
                })
            }
        })
    }


    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
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
            const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
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
        }
        
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
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
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        }
        
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.currentTarget.name}` as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
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


      
    return (
        <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative grow max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <Screen isEdit={isEdit} editedInput={newSchool.edited_school_type_of_degree_offered.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_type_of_degree_offered.isEditMode} />
                    <Indicator label="Type of Degrees Offered" editedInput={newSchool.edited_school_type_of_degree_offered.input} />
                    <div className='flex justify-center items-start gap-2'>
                        <input disabled={(loggedInUser.permissions.canVerify && hasInputs) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_type_of_degree_offered.isEditMode) ? true : false} className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" onChange={(e:ChangeEvent<HTMLInputElement>) => setField(e.target.value)} value={field}/>
                        <button className='border rounded border-[#4573D2] text-[#4573D2] px-5 h-[50px] text-xl hover:text-white hover:bg-[#4573D2]' onClick={(e:any) => {hasInputs ? addField(e, true) : addField(e, false)}}>Add type</button>
                        <button value="school_type_of_degree_offered" className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" 
                            onClick={(e:any) => {toggleNotePopup(e); setName('school_type_of_degree_offered')}}>
                            Add Note
                        </button>
                    </div>
                    <TypeOfDegree loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_type_of_degree_offered.isEditMode} input={newSchool.edited_school_type_of_degree_offered.input} originalInput={newSchool.school_type_of_degree_offered.fields}
                    deleteFunc={removeField} undoFunc={undoDelete}
                    />
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_type_of_degree_offered.isEditMode} notes={newSchool.edited_school_type_of_degree_offered.notes} originalNotes={newSchool.school_type_of_degree_offered.notes} name='school_type_of_degree_offered' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons isEdit={isEdit}loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_type_of_degree_offered.isEditMode} input={hasInputs} 
                newSchool={newSchool} setNewSchool={setNewSchool} link={newSchool.edited_school_type_of_degree_offered.link} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup}
                enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} name='school_type_of_degree_offered'
                />}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <Screen isEdit={isEdit} editedInput={newSchool.edited_school_dual_degree_program.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} />
                    <Indicator label="Dual-Degree Program" editedInput={newSchool.edited_school_dual_degree_program.input} />
                    <div className='flex justify-start items-center gap-2'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_dual_degree_program.input} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} originalInput={newSchool.school_dual_degree_program.input} name='school_dual_degree_program' handleCheck={handleCheck}/>         
                        <button onClick={(e:any) => {toggleNotePopup(e); setName('school_dual_degree_program')}} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} notes={newSchool.edited_school_dual_degree_program.notes} originalNotes={newSchool.school_dual_degree_program.notes} name='school_dual_degree_program' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons isEdit={isEdit}loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} input={newSchool.edited_school_dual_degree_program.input} link={newSchool.edited_school_dual_degree_program.link} 
                   setLinkObj={setLinkObj} name='school_dual_degree_program' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <Screen isEdit={isEdit} editedInput={newSchool.edited_school_bachelors_degree_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} />
                    <Indicator label="Bachelor's Degree Required" editedInput={newSchool.edited_school_bachelors_degree_required.input} />
                    <div className='flex justify-start items-center gap-2'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_bachelors_degree_required.input} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} originalInput={newSchool.school_bachelors_degree_required.input} name='school_bachelors_degree_required' handleCheck={handleCheck}/>
                        <button onClick={(e:any) => {toggleNotePopup(e); setName('school_bachelors_degree_required')}} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} notes={newSchool.edited_school_bachelors_degree_required.notes} originalNotes={newSchool.school_bachelors_degree_required.notes} name='school_bachelors_degree_required' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} input={newSchool.edited_school_bachelors_degree_required.input} link={newSchool.edited_school_bachelors_degree_required.link} 
                   setLinkObj={setLinkObj} name='school_bachelors_degree_required' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}

            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}