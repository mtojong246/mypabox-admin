import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { School, Note } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import ReactQuill from "react-quill";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import LinkPopup from "../../LinkPopup";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";

import { enableEditMode, confirmEdit, undoEdit, revertEdit, enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./PAShadowingFunctions";
import InputFields from "../../Assets/InputsFields";
import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";




export default function PAShadowing({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ notePopup, setNotePopup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');
    const [ reqInputs, setReqInputs ] = useState<boolean | null>(null);
    const [ recInputs, setRecInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isRecOpen, setIsRecOpen ] = useState(false);

    useEffect(() => {
        if (newSchool.edited_school_pa_shadowing_required.input !== null ||  newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.input !== null) {
            setReqInputs(true);
        } else {
            setReqInputs(null);
        }

        if (newSchool.edited_school_pa_shadowing_recommended.input !== null || newSchool.edited_school_pa_shadowing_recommended.edited_school_minimum_pa_shadowing_hours_recommended.input !== null) {
            setRecInputs(true);
        } else {
            setRecInputs(null);
        }
    }, [newSchool.edited_school_pa_shadowing_required, newSchool.edited_school_pa_shadowing_recommended]);

    useEffect(() => {
        if (newSchool.edited_school_pa_shadowing_required.input === null) {
            if (newSchool.school_pa_shadowing_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_pa_shadowing_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        if (newSchool.edited_school_pa_shadowing_recommended.input === null) {
            if (newSchool.school_pa_shadowing_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        } else {
            if (newSchool.edited_school_pa_shadowing_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        }
    }, [newSchool.edited_school_pa_shadowing_required, newSchool.school_pa_shadowing_required, newSchool.edited_school_pa_shadowing_recommended, newSchool.school_pa_shadowing_recommended])
    
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    })

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as object;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
            }
        })

    }

    const updateNote = (note: Note) => {
    const field = newSchool[name as keyof School] as object;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...field,
            [noteName]: (field[noteName as keyof object] as Note[]).map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            })
        }
    })
    }

    const deleteNote = (e: any, index: number, name: string, noteName: string) => {
        e.preventDefault();
        const field = newSchool[name as keyof School] as object;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
            }
        })
    }


    useEffect(() => {
        if (newSchool.school_pa_shadowing_required.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required ? newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required : 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_required: {
                    ...newSchool.school_pa_shadowing_required,
                    school_minimum_pa_shadowing_hours_required: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_required.input]);

    useEffect(() => {
        if (newSchool.school_pa_shadowing_recommended.input) {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended ? newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended : 0,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pa_shadowing_recommended: {
                    ...newSchool.school_pa_shadowing_recommended,
                    school_minimum_pa_shadowing_hours_recommended: null,
                }
            })
        }
    }, [newSchool.school_pa_shadowing_recommended.input])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const field = newSchool[e.target.name as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [e.target.name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.checked,
                }
            })
        }
        
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_average_pa_shadowing_hours_accepted_previous_cycle: {
                    ...newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle,
                    input: Number(e.target.value),
                }
            })
        }else {
            setNewSchool({
                ...newSchool,
                edited_school_average_pa_shadowing_hours_accepted_previous_cycle: {
                    ...newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle,
                    input: Number(e.target.value)
                }
            })
        }
        
    }

    const handleInputInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        const field = newSchool[category as keyof School] as object;
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                [category]: {
                    ...field,
                    [name]: {
                        ...field[name as keyof object] as object,
                        input: e.target.value,
                    }
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
    };

    
    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && newSchool.edited_school_pa_shadowing_required.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_pa_shadowing_required.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">PA Shadowing Hours Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!reqInputs? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${reqInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_required.input} isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} originalInput={newSchool.school_pa_shadowing_required.input}
                    handleCheck={handleCheck} name='school_pa_shadowing_required' 
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pa_shadowing_required' checked={newSchool.school_pa_shadowing_required.input ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_pa_shadowing_required.input ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                    {isOpen && (
                        <div className={`mt-7 mx-4 mb-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Required</label>   
                            <InputFieldsGroup loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.input} isEditMode={newSchool.edited_school_pa_shadowing_required.edited_school_minimum_pa_shadowing_hours_required.isEditMode}
                            originalInput={newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required} handleInput={handleInputInCategory} category='school_pa_shadowing_required' name='school_minimum_pa_shadowing_hours_required'
                            />
                            {/* <input onChange={(e) => handleInputInCategory(e, 'school_pa_shadowing_required')} name='school_minimum_pa_shadowing_hours_required' value={newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required ? newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required : ''} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />      */}
                        </div>
                    )}
                    {isOpen && (
                    <div className={`max-w-[900px] mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_required.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_required'); setNoteName('school_minimum_pa_shadowing_hours_required_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pa_shadowing_required'); setNoteName('school_minimum_pa_shadowing_hours_required_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_pa_shadowing_required', 'school_minimum_pa_shadowing_hours_required_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>       
                    </div>
                    )}
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} input={reqInputs} name="school_pa_shadowing_required" isEditMode={newSchool.edited_school_pa_shadowing_required.isEditMode} link={newSchool.edited_school_pa_shadowing_required.link} setLinkObj={setLinkObj}
                toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>

            <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && newSchool.edited_school_pa_shadowing_recommended.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_pa_shadowing_recommended.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">PA Shadowing Hours Recommended<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!recInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${recInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_recommended.input} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} 
                    originalInput={newSchool.school_pa_shadowing_recommended.input} name='school_pa_shadowing_recommended' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pa_shadowing_recommended' checked={newSchool.school_pa_shadowing_recommended.input ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_pa_shadowing_recommended.input ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
                    {isRecOpen && (
                        <div className={`mt-7 mx-4 mb-4 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                            <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum PA Shadowing Hours Recommended</label>  
                            <InputFieldsGroup loggedInUser={loggedInUser} input={newSchool.edited_school_pa_shadowing_recommended.edited_school_minimum_pa_shadowing_hours_recommended.input} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} originalInput={newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended}
                            category="school_pa_shadowing_recommended" name='school_minimum_pa_shadowing_hours_recommended' handleInput={handleInputInCategory} 
                            />
                            {/* <input onChange={(e) => handleInputInCategory(e, 'school_pa_shadowing_recommended')} name='school_minimum_pa_shadowing_hours_recommended' value={newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended ? newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended : ''} className='block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />      */}
                        </div>
                    )}
                    {isRecOpen && (
                    <div className={`max-w-[900px] mt-8 mx-5 mb-5`}>
                        {newSchool.school_pa_shadowing_recommended.input && (<label className='font-medium text-xl'>Notes:</label>)}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_pa_shadowing_recommended'); setNoteName('school_minimum_pa_shadowing_hours_recommended_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pa_shadowing_recommended'); setNoteName('school_minimum_pa_shadowing_hours_recommended_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => {deleteNote(e, i, 'school_pa_shadowing_recommended', 'school_minimum_pa_shadowing_hours_recommended_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                        </div>    
                    </div>
                    )}
                </div>
                <EditButtons loggedInUser={loggedInUser} input={recInputs} isEditMode={newSchool.edited_school_pa_shadowing_recommended.isEditMode} name='school_pa_shadowing_recommended' link={newSchool.edited_school_pa_shadowing_recommended.link}
                setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
                />
            </div>

            <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
                <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Average PA Shadowing Hours Accepted Previous Cycle<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>                    
                    <div className='flex justify-center items-start gap-3'>
                        <InputFields loggedInUser={loggedInUser} input={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode}
                        name="school_average_pa_shadowing_hours_accepted_previous_cycle" handleInput={handleInput} originalInput={newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input}
                        />
                        {/* <input onChange={handleInput} value={newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input ? newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.input : ''} className='block grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />      */}
                        <button onClick={(e) => {toggleNotePopup(e); setName('school_average_pa_shadowing_hours_accepted_previous_cycle'); setNoteName('school_average_pa_shadowing_hours_accepted_previous_cycle_notes')}}className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes.length ? 'mt-3' : 'mt-0'}`}>
                    {newSchool.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes.map((note, i) => (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-center w-full mb-1'>
                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                <div className='flex gap-2'>
                                    <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_average_pa_shadowing_hours_accepted_previous_cycle'); setNoteName('school_average_pa_shadowing_hours_accepted_previous_cycle_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button onClick={(e) => {deleteNote(e, i, 'school_average_pa_shadowing_hours_accepted_previous_cycle', 'school_average_pa_shadowing_hours_accepted_previous_cycle_notes');}}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                            </div>
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                    ))}
                    </div>    
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.isEditMode} input={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.input} link={newSchool.edited_school_average_pa_shadowing_hours_accepted_previous_cycle.link}
                toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} newSchool={newSchool} setNewSchool={setNewSchool} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit}
                revertEdit={revertEdit} name='school_average_pa_shadowing_hours_accepted_previous_cycle'
                />}
            </div>
            </>
        )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}