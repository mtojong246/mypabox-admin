
import { ChangeEvent, Dispatch, SetStateAction, useState, MouseEvent, useEffect } from "react";
import { School, Note, NumberInput, PreviousCycle } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import LinkPopup from "../../LinkPopup";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./GPAFunctions";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import EditButtons from "../../Assets/EditButtons";
import InputFields from "../../Assets/InputsFields";

const previousCycle = [
    {
        label: 'Average Overall GPA Accepted:',
        value: 'average_overall_gpa_accepted_previous_year'
    },
    {
        label: 'Average BCP GPA Accepted',
        value: 'average_bcp_gpa_accepted_previous_year'
    },
    {
        label: 'Average Science GPA Accepted:',
        value: 'average_science_gpa_accepted_previous_year',
    },
    {
        label: 'Average Prerequisite GPA Accepted:',
        value: 'average_prerequisite_gpa_accepted_previous_year'
    }
]

export default function PreviousCycleSection({newSchool, setNewSchool, loggedInUser, isEdit, handleInputInCategory}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>
    loggedInUser: UserObject,
    isEdit: boolean,
    handleInputInCategory: (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void,
}) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    useEffect(() => {
        if (newSchool.edited_school_average_gpa_accepted_previous_cycle.input !== null) {
                setHasInputs(true)
            } else {
                setHasInputs(null)
            }
    }, [newSchool.edited_school_average_gpa_accepted_previous_cycle.input])

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof object;
            const field = newSchool.school_average_gpa_accepted_previous_cycle[name] as NumberInput;
            setNewSchool({
                ...newSchool,
                school_average_gpa_accepted_previous_cycle: {
                    ...newSchool.school_average_gpa_accepted_previous_cycle,
                    [name]: {
                        ...field,
                        input: e.target.value
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_average_gpa_accepted_previous_cycle[name as keyof object] as {input: number | null;
                prev: number | null;
                isEditMode: boolean;}

            setNewSchool({
                ...newSchool,
                edited_school_average_gpa_accepted_previous_cycle: {
                    ...newSchool.edited_school_average_gpa_accepted_previous_cycle,
                    [name]: {
                        ...field,
                        input: e.target.value
                    }
                }
            })
        }
        
    }

    console.log(newSchool.school_average_gpa_accepted_previous_cycle)

    

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

      const addNote = (note: Note) => {
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note)
                }
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
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
            }
        })
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        const field = newSchool.school_average_gpa_accepted_previous_cycle[name as keyof object] as NumberInput;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...newSchool.school_average_gpa_accepted_previous_cycle,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            }
        })
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
        <div className={`mt-28 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_average_gpa_accepted_previous_cycle.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_average_gpa_accepted_previous_cycle.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Average GPA Accepted Previous Cycle<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                {previousCycle.map((gpa,i) => {
                    const name = `edited_${gpa.value}` as keyof object;
                    const field = newSchool.edited_school_average_gpa_accepted_previous_cycle[name] as {input: number | null, prev: number | null, isEditMode: boolean};
                    const originalField = newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] 
                    return (
                    <>
                        <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mx-4 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                            <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                            <div className='flex justify-start items-start gap-4'>
                                <InputFields loggedInUser={loggedInUser} input={field.input} isEditMode={field.isEditMode} originalInput={originalField.input} name={gpa.value} handleInput={handleInput}/>
                                {/* <input className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' value={(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input ? (newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).input : ''} name={gpa.value} onChange={handleInput} /> */}
                                <button disabled={loggedInUser.isSuperAdmin ? false : true} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]"
                                onClick={(e) => {toggleNotePopup(e); setName(gpa.value)}}>
                                    Add Note
                                </button>
                            </div>
                        
                            {(newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).notes && (newSchool.school_average_gpa_accepted_previous_cycle[gpa.value as keyof PreviousCycle] as NumberInput).notes?.map((note: Note, i: number) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full mt-3'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e) => deleteNote(e, i, gpa.value)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                        <div className='w-full mb-4'></div>
                    </>
                    )
                    })}               
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_average_gpa_accepted_previous_cycle.isEditMode} link={newSchool.edited_school_average_gpa_accepted_previous_cycle.link} setLinkObj={setLinkObj}
            toggleLinkPopup={toggleLinkPopup} name='school_average_gpa_accepted_previous_cycle' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}
        </>
    )
}