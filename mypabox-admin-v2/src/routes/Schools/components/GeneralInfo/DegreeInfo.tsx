import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { School, Note, BooleanInput, StringInputWithFields } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";
import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import { LuUndo2 } from "react-icons/lu";
import { GoLink } from "react-icons/go";
import LinkPopup from "../../LinkPopup";

import { enableEditMode, confirmEditBool, undoEditBool, revertEditBool } from "./GeneralInfoFunctions";
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

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name] as BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: e.target.checked,
            }
        })
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
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Dual-Degree Program<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_dual_degree_program.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_dual_degree_program.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-start gap-2'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {newSchool.edited_school_dual_degree_program.input !== null ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <div className='w-full mt-2'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled className="sr-only peer" name='edited_school_dual_degree_program' checked={newSchool.edited_school_dual_degree_program.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {newSchool.edited_school_dual_degree_program.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                            <div className='w-full mt-2'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input disabled type="checkbox" className="sr-only peer" name='school_dual_degree_program' checked={newSchool.school_dual_degree_program.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${newSchool.edited_school_dual_degree_program.input ? 'line-through' : 'no-underline'}`}>
                                    {newSchool.school_dual_degree_program.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                        ): (
                        <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" name='school_dual_degree_program' onChange={handleCheck} checked={newSchool.school_dual_degree_program.input ? true : false}/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">
                                {newSchool.school_dual_degree_program.input ? 'True' : 'False'}
                                </span>
                            </label>
                        </div>
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(newSchool.edited_school_dual_degree_program.input !== null || newSchool.edited_school_dual_degree_program.isEditMode) && <div className='w-full mt-2'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled={newSchool.edited_school_dual_degree_program.isEditMode ? false : true} onChange={handleCheck} className="sr-only peer" name='edited_school_dual_degree_program' checked={newSchool.edited_school_dual_degree_program.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {newSchool.edited_school_dual_degree_program.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>}
                            <div className='w-full mt-2'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input disabled type="checkbox" className="sr-only peer" name='school_dual_degree_program' checked={newSchool.school_dual_degree_program.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${newSchool.edited_school_dual_degree_program.input ? 'line-through' : 'no-underline'}`}>
                                    {newSchool.school_dual_degree_program.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}
                        
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
                {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                    <div className='flex justify-start items-start gap-2'>
                        {!loggedInUser.permissions.canVerify ? (
                        <>
                            {!newSchool.edited_school_dual_degree_program.isEditMode && <button name='school_dual_degree_program' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                            {newSchool.edited_school_dual_degree_program.isEditMode && <button name='school_dual_degree_program' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool)} value={newSchool.edited_school_dual_degree_program.input !== null ? newSchool.edited_school_dual_degree_program.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_dual_degree_program.isEditMode && <button name='school_dual_degree_program' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEditBool(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            {(!newSchool.edited_school_dual_degree_program.isEditMode && newSchool.edited_school_dual_degree_program.input !== null) ? (<button name='school_dual_degree_program' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                        </>
                        ) : (
                        <>
                            {newSchool.edited_school_dual_degree_program.input !== null && <button name='school_dual_degree_program' value={newSchool.edited_school_dual_degree_program.input.toString()} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool, 'school_dual_degree_program')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_dual_degree_program.input !== null && <button name='school_dual_degree_program' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        </>
                        )}
                    </div>
                    {!loggedInUser.permissions.canVerify && (
                        <>
                        {!newSchool.edited_school_dual_degree_program.link && newSchool.edited_school_dual_degree_program.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_dual_degree_program'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                        {newSchool.edited_school_dual_degree_program.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_dual_degree_program.link, name: 'edited_school_dual_degree_program'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                    )}
                    {loggedInUser.permissions.canVerify && newSchool.edited_school_dual_degree_program.link && <a href={newSchool.edited_school_dual_degree_program.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
                </div>}
            </div>

            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Bachelors Degree Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_bachelors_degree_required.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_bachelors_degree_required.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-start gap-2'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {newSchool.edited_school_dual_degree_program.input !== null ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input disabled type="checkbox" className="sr-only peer" name='edited_school_bachelors_degree_required' checked={newSchool.edited_school_bachelors_degree_required.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {newSchool.edited_school_bachelors_degree_required.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input disabled type="checkbox" className="sr-only peer" name='school_bachelors_degree_required' checked={newSchool.school_bachelors_degree_required.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${newSchool.edited_school_bachelors_degree_required.input ? 'line-through' : 'no-underline'}`}>
                                    {newSchool.school_bachelors_degree_required.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                        ): (
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" name='school_bachelors_degree_required' onChange={handleCheck} checked={newSchool.school_bachelors_degree_required.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {newSchool.school_bachelors_degree_required.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(newSchool.edited_school_bachelors_degree_required.input !== null || newSchool.edited_school_bachelors_degree_required.isEditMode) && <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" name='edited_school_bachelors_degree_required' onChange={handleCheck} checked={newSchool.edited_school_bachelors_degree_required.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {newSchool.edited_school_bachelors_degree_required.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>}
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input disabled type="checkbox" className="sr-only peer" name='school_bachelors_degree_required' checked={newSchool.school_bachelors_degree_required.input ? true : false}/>
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${newSchool.edited_school_bachelors_degree_required.input ? 'line-through' : 'no-underline'}`}>
                                    {newSchool.school_bachelors_degree_required.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}
                        
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
                {isEdit && <div className='flex flex-col justify-start items-start gap-2'>
                    <div className='flex justify-start items-start gap-2'>
                        {!loggedInUser.permissions.canVerify ? (
                        <>
                            {!newSchool.edited_school_bachelors_degree_required.isEditMode && <button name='school_bachelors_degree_required' onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                            {newSchool.edited_school_bachelors_degree_required.isEditMode && <button name='school_bachelors_degree_required' onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool)} value={newSchool.edited_school_bachelors_degree_required.input !== null ? newSchool.edited_school_bachelors_degree_required.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_bachelors_degree_required.isEditMode && <button name='school_bachelors_degree_required' onClick={(e:MouseEvent<HTMLButtonElement>) => undoEditBool(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            {(!newSchool.edited_school_bachelors_degree_required.isEditMode && newSchool.edited_school_bachelors_degree_required.input !== null) ? (<button name='school_bachelors_degree_required' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                        </>
                        ) : (
                        <>
                            {newSchool.edited_school_bachelors_degree_required.input !== null && <button name='school_bachelors_degree_required' value={newSchool.edited_school_bachelors_degree_required.input.toString()} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool, 'school_bachelors_degree_required')}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {newSchool.edited_school_bachelors_degree_required.input !== null && <button name='school_bachelors_degree_required' onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        </>
                        )}
                    </div>
                    {!loggedInUser.permissions.canVerify && (
                        <>
                        {!newSchool.edited_school_bachelors_degree_required.link && newSchool.edited_school_bachelors_degree_required.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name: 'edited_school_bachelors_degree_required'})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                        {newSchool.edited_school_bachelors_degree_required.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: newSchool.edited_school_bachelors_degree_required.link, name: 'edited_school_bachelors_degree_required'})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                    )}
                    {loggedInUser.permissions.canVerify && newSchool.edited_school_bachelors_degree_required.link && <a href={newSchool.edited_school_bachelors_degree_required.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
                </div>}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}

            {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}