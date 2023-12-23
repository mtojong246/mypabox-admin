import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note, BooleanInput, StringInputWithFields } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";
import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";

import { enableEditModeBool, confirmEditBool, undoEditBool, revertEditBool } from "./GeneralInfoFunctions";
import { UserObject } from "../../../../types/users.types";

export default function DegreeInfo({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');
    const [inputList, setInputList] = useState([{ input: '' }]);
    const [ field, setField ] = useState('');

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

    const addField = (e:any) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_type_of_degree_offered: {
                ...newSchool.school_type_of_degree_offered,
                fields: newSchool.school_type_of_degree_offered.fields.concat(field),
            }
        });
        setField('')
    };

    const removeField = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_type_of_degree_offered: {
                ...newSchool.school_type_of_degree_offered,
                fields: newSchool.school_type_of_degree_offered.fields.filter((f,i) => i !== index)
            }
        })
    }

    // const removeField = (e: any, index: number) => {
    //     e.preventDefault();
        
    //     const list = inputList.filter(input => inputList.indexOf(input) !== index);

    //     setInputList(list)

    //     setNewSchool({
    //     ...newSchool,
    //     school_type_of_degree_offered: {
    //         ...newSchool.school_type_of_degree_offered,
    //         fields: list
    //     }
    //     })
    // };

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        // Input changes based on what user types 
        const name = e.target.name as keyof School;
        const field = newSchool[name] as StringInputWithFields;

        const list: any = [...inputList]

        list[index].input = e.target.value
        
        setInputList(list)

        setNewSchool({
        ...newSchool,
        [name]: {
            ...field, 
            fields: list
        }
        })
    }

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
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
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        const field = newSchool[name as keyof School] as StringInputWithFields | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
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
        setNewSchool({
            ...newSchool,
            [linkObj.name]: {
                ...newSchool[linkObj.name as keyof School] as object,
                link: newLink,
            }
        });
        setLinkObj({
            link: '',
            name: '',
        })
    }

    console.log(newSchool.edited_school_dual_degree_program)

      
    return (
        <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative grow max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white">Types of Degrees Offered</label>
                    <div className='flex justify-center items-start gap-2'>
                        <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" onChange={(e:ChangeEvent<HTMLInputElement>) => setField(e.target.value)} value={field}/>
                        <button className='border rounded border-[#4573D2] text-[#4573D2] px-5 h-[50px] text-xl hover:text-white hover:bg-[#4573D2]' onClick={addField}>Add type</button>
                        <button disabled={loggedInUser.isSuperAdmin ? false : true} value="school_type_of_degree_offered" className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" 
                            onClick={(e:any) => {toggleNotePopup(e); setName('school_type_of_degree_offered')}}>
                            Add Note
                        </button>
                    </div>
                    {newSchool.school_type_of_degree_offered.fields.length ? newSchool.school_type_of_degree_offered.fields.map((field,i) => (
                        <div className='flex justify-between items-center border border-[#B4B4B4] rounded mt-3 py-2 pl-3 pr-2'>
                            <p className='font-medium'>{field}</p>
                            <button onClick={(e:any) => removeField(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                        </div>
                    )): null}
                    {newSchool.school_type_of_degree_offered.notes.length ? (
                        <>
                        <label className='font-semibold inline-block mt-6'>Notes:</label>
                        <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_type_of_degree_offered.notes.length ? 'mt-1' : 'mt-0'}`}>
                        {newSchool.school_type_of_degree_offered.notes.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_type_of_degree_offered')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e:any) => {deleteNote(e, i, 'school_type_of_degree_offered')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                        </div>
                        </>
                    ) : ''
                    }
                </div>
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Dual-Degree Program<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_dual_degree_program.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_dual_degree_program.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-center gap-2'>
                        <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_dual_degree_program.input} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} originalInput={newSchool.school_dual_degree_program.input} name='school_dual_degree_program' handleCheck={handleCheck}/>         
                        <button disabled={loggedInUser.isSuperAdmin ? false : true} onClick={(e:any) => {toggleNotePopup(e); setName('school_dual_degree_program')}} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    {
                    newSchool.school_dual_degree_program.notes ? (
                    <>
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_dual_degree_program.notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_dual_degree_program.notes.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_dual_degree_program')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e:any) => {deleteNote(e, i, 'school_dual_degree_program')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                    </div>
                    </>
                    ) : ''
                    }
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_dual_degree_program.isEditMode} input={newSchool.edited_school_dual_degree_program.input} link={newSchool.edited_school_dual_degree_program.link} 
                   setLinkObj={setLinkObj} name='school_dual_degree_program' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Bachelors Degree Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_bachelors_degree_required.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_bachelors_degree_required.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-center gap-2'>
                        <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_bachelors_degree_required.input} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} originalInput={newSchool.school_bachelors_degree_required.input} name='school_bachelors_degree_required' handleCheck={handleCheck}/>
                        <button disabled={loggedInUser.isSuperAdmin ? false : true} onClick={(e:any) => {toggleNotePopup(e); setName('school_bachelors_degree_required')}} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    {
                    newSchool.school_bachelors_degree_required.notes ? (
                    <>
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_bachelors_degree_required.notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_bachelors_degree_required.notes.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_bachelors_degree_required')}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e:any) => {deleteNote(e, i, 'school_bachelors_degree_required')}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                    </div>
                    </>
                    ) : ''
                    }
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_bachelors_degree_required.isEditMode} input={newSchool.edited_school_bachelors_degree_required.input} link={newSchool.edited_school_bachelors_degree_required.link} 
                   setLinkObj={setLinkObj} name='school_bachelors_degree_required' toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}

            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}