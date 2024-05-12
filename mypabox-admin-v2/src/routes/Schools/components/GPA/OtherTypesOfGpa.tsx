import { School, Note, OtherTypesOfGpaEvaluted } from "../../../../types/schools.types";
import { MouseEvent, ChangeEvent, SetStateAction, Dispatch, useState, useEffect } from "react";
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import EditButtons from "../../Assets/EditButtons";
import { confirmEditGroup, enableEditModeGroup, revertEditGroup, undoEditGroup } from "./GPAFunctions";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import CreatableSelectField from "../../Assets/CreatableSelectField";
import InputFields from "../../Assets/InputsFields";
import SelectChoices from "../../Assets/SelectChoices";
import AddNoteFields from "../../Assets/AddNoteFields";

const typeOfGpa = [
    { value: 'Science', label: 'Science' },
    { value: 'Overall', label: 'Overall' },
    { value: 'Prerequisite', label: 'Prerequisite' },
    { value: 'BCP', label: 'BCP' }
]

const otherGpaDefault = {
    gpa_value_required_or_recommended: "required",
    minimum_gpa_value_needed: 0,
    minimum_number_of_credits_evaluated: 0,
    type_of_gpa_evaluated: "",
    notes: [],
}

export default function OtherTypesOfGpa({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [index, setIndex] = useState<number | null>(null);
    const [objIndex, setObjIndex] = useState<number | undefined>(0)
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ array, setArray ] = useState<any[]>([])

    useEffect(() => {
        if (loggedInUser.permissions.canVerify && newSchool.edited_school_other_types_of_gpa_evaluated.input === null) {
            setArray(newSchool.school_other_types_of_gpa_evaluated)
        } else if (loggedInUser.permissions.canVerify && newSchool.edited_school_other_types_of_gpa_evaluated.input !== null) {
            setArray(newSchool.edited_school_other_types_of_gpa_evaluated.input) 
        } else if (!loggedInUser.permissions.canVerify && newSchool.edited_school_other_types_of_gpa_evaluated.input === null) {
            setArray(newSchool.school_other_types_of_gpa_evaluated)
        } else if (!loggedInUser.permissions.canVerify && newSchool.edited_school_other_types_of_gpa_evaluated.input !== null) {
            setArray(newSchool.edited_school_other_types_of_gpa_evaluated.input) 
        }
    }, [loggedInUser, newSchool.edited_school_other_types_of_gpa_evaluated , newSchool.school_other_types_of_gpa_evaluated])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    const addField = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            const updatedField = newSchool.school_other_types_of_gpa_evaluated.concat(otherGpaDefault);
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: updatedField,
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: newSchool.edited_school_other_types_of_gpa_evaluated.input!.concat({
                        ...otherGpaDefault,
                        isCorrect: true,
                        isNew: true,
                    })
                }
            })
        }
        
        
    }

    // Deletes specific field from objects 
    const deleteField = (e: MouseEvent<HTMLButtonElement>, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            const updatedField = newSchool.school_other_types_of_gpa_evaluated.filter((field, i)=> i !== index);
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: updatedField,
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: isNew ? newSchool.edited_school_other_types_of_gpa_evaluated.input!.filter((inp, i) => i !== index) : newSchool.edited_school_other_types_of_gpa_evaluated.input!.map((inp, i) => {
                        if (i === index) {
                            return {...inp, isCorrect: false,}
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const undoDelete = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_other_types_of_gpa_evaluated: {
                ...newSchool.edited_school_other_types_of_gpa_evaluated,
                input: newSchool.edited_school_other_types_of_gpa_evaluated.input!.map((inp,i) => {
                    if (i === index) {
                        return { ...inp, isCorrect: true }
                    } else {
                        return { ...inp }
                    }
                }) 
            }
        })
    }

    const handleSelect = (e: any, name: string, index: number, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
            const updatedObj = {
                ...objToBeUpdated,
                [name]: e.value,
            }
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                    if (i === index) {
                        return updatedObj;
                    } else {
                        return field;
                    }
                }) 
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: newSchool.edited_school_other_types_of_gpa_evaluated.input!.map((inp,i) => {
                        if (i === index) {
                            return {...inp, type_of_gpa_evaluated: e.value}
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const handleObjInput = (e: ChangeEvent<HTMLInputElement>, name: string, index: number, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const value = e.target.value;
            const objToBeUpdated = newSchool.school_other_types_of_gpa_evaluated.find((obj,i) => i === index) as OtherTypesOfGpaEvaluted;
    
            const updatedObj = {
                ...objToBeUpdated,
                [name]: value,
            }
            setNewSchool({
                ...newSchool,
                school_other_types_of_gpa_evaluated: newSchool.school_other_types_of_gpa_evaluated.map((field, i) => {
                    if (i === index) {
                        return updatedObj;
                    } else {
                        return field;
                    }
                }) 
            })
        } else {
            const field = newSchool.edited_school_other_types_of_gpa_evaluated;
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...field,
                    input: field.input!.map((inp, i) => {
                        if (i === index) {
                            return { ...inp, [name]: e.target.value }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        

    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        console.log(e)
        return;
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

            const currentField = newSchool.school_other_types_of_gpa_evaluated
                const updatedObj = { ...obj, notes: obj.notes.concat(note) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } 
                    return field;
                })
                setNewSchool({
                    ...newSchool,
                    school_other_types_of_gpa_evaluated: updatedField,
                })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const obj = newSchool.edited_school_other_types_of_gpa_evaluated.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_other_types_of_gpa_evaluated.input!
            const updatedObj = { ...obj!, notes: obj!.notes.concat(note) }
            const updatedField = currentField.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
                
            })
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: updatedField,
                },
            })
        }
        
            
        }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

            const currentField = newSchool.school_other_types_of_gpa_evaluated
                const updatedObj = { ...obj, notes: obj.notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                }) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } else {
                        return field;
                    }
                    
                })
                setNewSchool({
                    ...newSchool,
                    school_other_types_of_gpa_evaluated: updatedField,
                })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const obj = newSchool.edited_school_other_types_of_gpa_evaluated.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_other_types_of_gpa_evaluated
            const updatedObj = { ...obj!, notes: obj!.notes.map((n,i) => {
                if (i === index) {
                    return { ...note }
                } else {
                    return { ...n }
                }
            }) }
            const updatedField = currentField.input!.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
            })
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: updatedField,
                },
            })
        }
        
            
    };

    const deleteNote = (e: any, index: number, name: string, noteName?: string, isIndividual?: boolean, objIndex?: number) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            const obj = newSchool.school_other_types_of_gpa_evaluated.find((obj, i) => i === objIndex) as OtherTypesOfGpaEvaluted;

            const currentField = newSchool.school_other_types_of_gpa_evaluated
                const updatedObj = { ...obj, notes: obj.notes.filter((n,i) => i !== index) }
                const updatedField = currentField.map((field, i) => {
                    if (i === objIndex) {
                        return updatedObj;
                    } 
                    return field;
                })
                setNewSchool({
                    ...newSchool,
                    school_other_types_of_gpa_evaluated: updatedField,
                })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            const obj = newSchool.edited_school_other_types_of_gpa_evaluated.input!.find((obj, i) => i === objIndex);

            const currentField = newSchool.edited_school_other_types_of_gpa_evaluated
            const updatedObj = { ...obj!, notes: obj!.notes.filter((n,i) => i !== index) }
            const updatedField = currentField.input!.map((field, i) => {
                if (i === objIndex) {
                    return updatedObj;
                } else {
                    return field;
                }
            })
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...newSchool.edited_school_other_types_of_gpa_evaluated,
                    input: updatedField,
                }
            })
        }
        
            
    }

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
        {array.map((field, i) => {
            const input = newSchool.edited_school_other_types_of_gpa_evaluated.input && newSchool.edited_school_other_types_of_gpa_evaluated.input.find((ind: any, index: number) => index === i);
            const originalInput = newSchool.school_other_types_of_gpa_evaluated.find((ind: any, index: number) => index === i);
        return (
        <div className={`${i>0 ? 'mt-10' : 'mt-28'} flex justify-start items-start gap-3 w-full`}>
        <div className={` grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_other_types_of_gpa_evaluated.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} />
            <div className='absolute top-[-16px] left-[20px] flex justify-between items-center w-full pr-[40px]'>
            <Indicator isArrayField={true} label="Other Types of GPA Evaluated" editedInput={newSchool.edited_school_other_types_of_gpa_evaluated.input} />
                {!loggedInUser.permissions.canVerify && input && !input.isCorrect && !input.isNew ? 
                <button disabled={!newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode ? true : false} onClick={(e:MouseEvent<HTMLButtonElement>) => undoDelete(e, i)} className={`bg-[#4573D2] rounded text-white text-sm px-3 py-1 font-bold hover:bg-[#26354C] ${i > 0 ? 'block' : 'hidden'}`}>Undo</button> : 
                    <button disabled={(!loggedInUser.permissions.canVerify && !newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode) || (loggedInUser.permissions.canVerify && newSchool.edited_school_other_types_of_gpa_evaluated.input !== null) ? true : false} onClick={(e:any) => {input === null ? deleteField(e, i, false, false) : deleteField(e, i, input!.isNew, true)}} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold hover:bg-[#B52020] relative z-20 ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>}
            </div>
            
            <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Type of GPA Evaluated</label>
                    {/* <div className='flex justify-between items-center mb-3'>
                        <label className='text-xl'>Type of GPA Evaluated</label>
                        <button onClick={(e) => deleteField(e,i)} className={`bg-[#F06A6A] rounded text-white text-sm px-3 py-1 font-bold ${i > 0 ? 'block' : 'hidden'}`}>- Delete Field</button>
                    </div> */}
                    <CreatableSelectField isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} index={i} input={input ? input.type_of_gpa_evaluated : null} originalInput={originalInput ? originalInput.type_of_gpa_evaluated : null}
                    name='type_of_gpa_evaluated' handleSelect={handleSelect} options={typeOfGpa} category="school_other_types_of_gpa_evaluated"
                    />
                    {/* <div className='flex justify-center items-start gap-1 w-full'>
                        <CreatableSelect options={typeOfGpa} 
                        value={field.type_of_gpa_evaluated ? {value: field.type_of_gpa_evaluated, label: field.type_of_gpa_evaluated} : null } 
                        className="grow focus:outline-none rounded" 
                        onChange={(e) => handleSelect(e, 'type_of_gpa_evaluated', i)}/>
                        <Tooltip title="Type and press enter to create new option" placement='right'>
                                <IconButton style={{padding: '0px'}}>
                                    <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                </IconButton>
                        </Tooltip>
                    </div> */}
                </div>
                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>GPA Required Or Recommended</label>
                    <SelectChoices loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} input={input ? input.gpa_value_required_or_recommended : null}
                    originalInput={originalInput ? originalInput.gpa_value_required_or_recommended : null} name="gpa_value_required_or_recommended" handleInputInArray={handleObjInput} index={i} 
                    />
                    {/* <div className='flex justify-start items-center gap-10 p-2'>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='required' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'required' ? true : false}/>
                            <span className='text-xl'>Required</span>
                        </div>
                        <div>
                            <input onChange={(e) => handleObjInput(e, i, 'gpa_value_required_or_recommended')} type='radio' name={`gpa_value_required_or_recommended-${i.toString()}`} value='recommended' className='mr-2'
                            checked={field.gpa_value_required_or_recommended === 'recommended' ? true : false}/>
                            <span className='text-xl'>Recommended</span>
                        </div>
                    </div> */}
                </div>
                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Minimum GPA Value Needed</label>
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} input={input ? input.minimum_gpa_value_needed : null} 
                    originalInput={originalInput ? originalInput.minimum_gpa_value_needed : null} name='minimum_gpa_value_needed' handleInput={handleInput} handleInputInArray={handleObjInput} index={i}
                    />
                    {/* <input onChange={(e) => handleObjInput(e, i, 'minimum_gpa_value_needed')} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded block' value={field.minimum_gpa_value_needed ? field.minimum_gpa_value_needed : ''} name='minimum_gpa_value_needed'/> */}
                </div>
                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>Minimum Number of Credits Evaluated</label>
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} input={input ? input.minimum_number_of_credits_evaluated : null}
                    originalInput={originalInput ? originalInput.minimum_number_of_credits_evaluated : null} name='minimum_number_of_credits_evaluated' handleInput={handleInput} handleInputInArray={handleObjInput} index={i}
                    />
                    {/* <input onChange={(e) => handleObjInput(e, i, 'minimum_number_of_credits_evaluated')} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded block' value={field.minimum_number_of_credits_evaluated ? field.minimum_number_of_credits_evaluated : ''} name='minimum_number_of_credits_evaluated' /> */}
                </div>
                <div className='w-full mt-8 mx-4'>
                    <label className='text-xl font-medium'>Notes:</label>
                    <button  onClick={(e) => {toggleNotePopup(e); setObjIndex(i)}} value='school_other_types_of_gpa_evaluated' name='add' className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-2 block">
                        Add Note
                    </button>
                </div>
                <div className='max-w-[900px] mx-4'>
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} notes={input ? input.notes : null} originalNotes={originalInput ? originalInput.notes : null} name='school_other_types_of_gpa_evaluated' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote} objIndex={objIndex} setObjIndex={setObjIndex}
                    />
                    </div>
                {/* {field.notes && field.notes.map((note: Note, index: number) => (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded max-w-[900px] mt-3 mx-4'>
                        <div className='flex justify-between items-center w-full mb-1'>
                            <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                            <div className='flex gap-2'>
                                <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setObjIndex(i); setIndex(index)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button  onClick={(e) => deleteNote(e, i, index)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                        </div>
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                ))} */}

            </>
            {i === array.length-1 ? (
            <button className="mx-4 mb-5 w-[180px] border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A] mt-8 block" onClick={(e:any) => {input === null ? addField(e, false) : addField(e, true)}}>
                + Add New Field
            </button>
            ) : (
                <div className='w-full mb-5'></div>
            )}
        </div>
        {isEdit && i === 0 && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_other_types_of_gpa_evaluated.isEditMode} input={newSchool.edited_school_other_types_of_gpa_evaluated.input} link={newSchool.edited_school_other_types_of_gpa_evaluated.link}
        toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} newSchool={newSchool} setNewSchool={setNewSchool} name='school_other_types_of_gpa_evaluated' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup}
        revertEdit={revertEditGroup} undoEdit={undoEditGroup}
        />}
        </div>
        )})}  
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>

    )
}