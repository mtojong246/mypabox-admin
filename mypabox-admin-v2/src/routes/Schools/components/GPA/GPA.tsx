import { School, NumberInput, Note } from "../../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import OtherTypesOfGpa from "./OtherTypesOfGpa";
import SpecificCourse from "./SpecificCourse";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";

import AddNote from "../Prereqs/AddNote";
import PreviousCycleSection from "./PreviousCycleSection";
import { UserObject } from "../../../../types/users.types";

import LinkPopup from "../../LinkPopup";
import { revertEditBool } from "../GeneralInfo/GeneralInfoFunctions";
import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import InputFields from "../../Assets/InputsFields";

//*******TO DO*******:
//  Fixed radio input so that option stays highlighted after selected 

interface InnerGPA {
    input: number | null;
    verified_input: number | null;
    prev: number | null;
    isEditMode: boolean;  
}

const gpaRequired = [
    {
        label: 'Minimum Overall GPA Required:',
        value: 'school_minimum_overall_gpa_required'
    },
    {
        label: 'Minimum Science GPA Required:',
        value: 'school_minimum_science_gpa_required'
    },
    {
        label: 'Minimum Prerequisite GPA Required:',
        value: 'school_minimum_prerequisite_gpa_required'
    }
]

const gpaRecommended = [
    {
        label: 'Minimum Overall GPA Recommended:',
        value: 'school_minimum_overall_gpa_recommended'
    },
    {
        label: 'Minimum Science GPA Recommended:',
        value: 'school_minimum_science_gpa_recommended'
    },
    {
        label: 'Minimum Prerequisite GPA Recommended:',
        value: 'school_minimum_prerequisite_gpa_recommended'
    }
]


export default function GPA({ newSchool, setNewSchool, handleInputChange, loggedInUser, isEdit }: { 
    newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, 
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void, 
    loggedInUser: UserObject,
    isEdit: boolean,
}) {

    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [name, setName] = useState('');

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

      useEffect(() => {
        if (newSchool.school_minimum_gpa_required) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_required: {
                    ...newSchool.school_minimum_overall_gpa_required,
                    input: newSchool.school_minimum_overall_gpa_required?.input ? newSchool.school_minimum_overall_gpa_required.input : 0,
                    notes: newSchool.school_minimum_overall_gpa_required?.notes ? newSchool.school_minimum_overall_gpa_required.notes : [],
                },
                school_minimum_science_gpa_required: {
                    ...newSchool.school_minimum_science_gpa_required,
                    input: newSchool.school_minimum_science_gpa_required?.input ? newSchool.school_minimum_science_gpa_required.input : 0,
                    notes: newSchool.school_minimum_science_gpa_required?.notes ? newSchool.school_minimum_science_gpa_required.notes : [],
                },
                school_minimum_prerequisite_gpa_required: {
                    ...newSchool.school_minimum_prerequisite_gpa_required,
                    input: newSchool.school_minimum_prerequisite_gpa_required?.input ? newSchool.school_minimum_prerequisite_gpa_required.input : 0,
                    notes: newSchool.school_minimum_prerequisite_gpa_required?.notes ? newSchool.school_minimum_prerequisite_gpa_required?.notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_required: null,
                school_minimum_prerequisite_gpa_required: null,
                school_minimum_science_gpa_required: null,
            })
        }
      }, [newSchool.school_minimum_gpa_required]);


      useEffect(() => {
        if (newSchool.school_minimum_gpa_recommended) {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_recommended: {
                    ...newSchool.school_minimum_overall_gpa_recommended,
                    input: newSchool.school_minimum_overall_gpa_recommended?.input ? newSchool.school_minimum_overall_gpa_recommended?.input : 0,
                    notes: newSchool.school_minimum_overall_gpa_recommended?.notes ? newSchool.school_minimum_overall_gpa_recommended?.notes : [],
                },
                school_minimum_science_gpa_recommended: {
                    ...newSchool.school_minimum_science_gpa_recommended,
                    input: newSchool.school_minimum_science_gpa_recommended?.input ? newSchool.school_minimum_science_gpa_recommended?.input : 0,
                    notes: newSchool.school_minimum_science_gpa_recommended?.notes ? newSchool.school_minimum_science_gpa_recommended?.notes : [],
                },
                school_minimum_prerequisite_gpa_recommended: {
                    ...newSchool.school_minimum_prerequisite_gpa_recommended,
                    input: newSchool.school_minimum_prerequisite_gpa_recommended?.input ? newSchool.school_minimum_prerequisite_gpa_recommended?.input : 0,
                    notes: newSchool.school_minimum_prerequisite_gpa_recommended?.notes ? newSchool.school_minimum_prerequisite_gpa_recommended?.notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_minimum_overall_gpa_recommended: null,
                school_minimum_science_gpa_recommended: null,
                school_minimum_prerequisite_gpa_recommended: null
            })
        }
      }, [newSchool.school_minimum_gpa_recommended]);

      useEffect(() => {
        if (newSchool.edited_school_minimum_gpa_required.input === false) {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_overall_gpa_required: {
                    ...newSchool.edited_school_minimum_overall_gpa_required,
                    input: null,
                },
                edited_school_minimum_science_gpa_required: {
                    ...newSchool.edited_school_minimum_science_gpa_required,
                    input: null,
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    ...newSchool.edited_school_minimum_prerequisite_gpa_required,
                    input: null,
                }
            })
        }
      }, [newSchool.edited_school_minimum_gpa_required.input]);

      useEffect(() => {
        if (newSchool.edited_school_minimum_gpa_recommended.input === false) {
            setNewSchool({
                ...newSchool,
                edited_school_minimum_overall_gpa_recommended: {
                    ...newSchool.edited_school_minimum_overall_gpa_recommended,
                    input: null
                },
                edited_school_minimum_science_gpa_recommended: {
                    ...newSchool.edited_school_minimum_science_gpa_recommended,
                    input: null,
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    ...newSchool.edited_school_minimum_prerequisite_gpa_recommended,
                    input: null,
                }
            })
        }
      }, [newSchool.edited_school_minimum_gpa_recommended.input])


      const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        const field = newSchool[name as keyof School] as NumberInput;
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
        const field = newSchool[name as keyof School] as NumberInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
    };

    // useEffect(() => {
    //     // Resets inputs if value change to false
    //     if (!newSchool.school_minimum_gpa_required) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_minimum_overall_gpa_required: {
    //                 input: 0,
    //                 notes: [],
    //             },
    //             school_minimum_science_gpa_required: {
    //                 input: 0,
    //                 notes: []
    //             },
    //             school_minimum_prerequisite_gpa_required: {
    //                 input: 0,
    //                 notes: []
    //             }
    //         })
    //     }

    //     if (!newSchool.school_minimum_gpa_recommended) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_minimum_overall_gpa_recommended: {
    //                 input: 0,
    //                 notes: [],
    //             },
    //             school_minimum_science_gpa_recommended: {
    //                 input: 0,
    //                 notes: []
    //             },
    //             school_minimum_prerequisite_gpa_recommended: {
    //                 input: 0,
    //                 notes: []
    //             }
    //         })
    //     }
    // }, [newSchool.school_minimum_gpa_required, newSchool.school_minimum_gpa_recommended])

    
    // Handles boolean inputs 
    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            setNewSchool({
                ...newSchool,
                [name]: e.target.checked,
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

    const handleQuill = (e: any) => {
        setNewSchool({
            ...newSchool,
            school_gpa_general_note: e
        })
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

    const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const original = e.currentTarget.name as keyof School;
        const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
        const originalField = newSchool[original] as boolean;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField : field.input,
                isEditMode: true,
            }
        })
    }

    const enableEditModeInner = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const original = e.currentTarget.name as keyof School;
        const field = newSchool[name] as InnerGPA;
        const originalField = newSchool[original] as NumberInput | null;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null && originalField ? originalField.input : field.input,
                isEditMode: true,
            }
        })

    }

    const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const originalName = e.currentTarget.name as keyof School;
        const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
        const originalField = newSchool[originalName] as boolean;
        const value = (e.currentTarget as HTMLButtonElement).value === 'true' ? true : false;
        if (!original) {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...newSchool[name as keyof School] as object,
                    input: field.input === originalField ? null : field.input,
                    prev: field.input === originalField ? null : value,
                    isEditMode: false,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                [original]: value,
                [name]: {
                    ...newSchool[name] as object,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                },
            })
        }
    }

    const confirmEditInner = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const originalName = e.currentTarget.name as keyof School;
        const field = newSchool[name] as InnerGPA;
        const originalField = newSchool[originalName] as NumberInput | null;
        const value = (e.currentTarget as HTMLButtonElement).value;
        if (!original) {
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: originalField && field.input === originalField.input ? null : field.input,
                    prev: originalField && field.input === originalField.input ? null : value,
                    isEditMode: false,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                [original]: {
                    ...originalField,
                    input: value,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            })
        }
    }

    const undoEdit= (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const original = e.currentTarget.name as keyof School;
        const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
        const originalField = newSchool[original] as boolean;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...newSchool[name as keyof School] as object,
                input: field.input === originalField ? null : field.prev,
                prev: null,
                isEditMode: false,
            }
        })
    };

    const undoEditInner = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        const original = e.currentTarget.name as keyof School;
        const field = newSchool[name] as InnerGPA;
        const originalField = newSchool[original] as NumberInput | null;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...newSchool[name as keyof School] as object,
                input: originalField && field.input === originalField.input ? null : field.prev,
                prev: null,
                isEditMode: false,
            }
        })
    };

    const revertEditInner = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}` as keyof School;
        setNewSchool({
            ...newSchool,
            [name]: {
                input: null,
                verified_input: null,
                prev: null,
                isEditMode: false,
                link: '',
            }
        })
    };

    

    const handleInput = (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as NumberInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof School;
            const field = newSchool[name] as InnerGPA;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.target.value,
                }
            })
        }
    }


    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Minimum GPA Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_required.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_required.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                        <div className='my-2'>
                        <BooleanFields input={newSchool.edited_school_minimum_gpa_required.input} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} loggedInUser={loggedInUser} 
                        originalInput={newSchool.school_minimum_gpa_required} name='school_minimum_gpa_required' handleCheck={handleCheck}
                        />
                        </div>
                        {(newSchool.school_minimum_gpa_required || newSchool.edited_school_minimum_gpa_required.input === true) && (
                        <>
                            {gpaRequired.map((gpa,i) => {
                            return (
                            <>
                            <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mb-4 flex justify-start items-start gap-3 max-w-[900px] w-full`}>
                                <div className={`relative ml-4 p-4 block grow rounded border-[#545454] border-2`}>
                                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                                    <div className='flex justify-start items-start gap-4'>
                                        <InputFields loggedInUser={loggedInUser} input={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).input} isEditMode={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).isEditMode} originalInput={newSchool[gpa.value as keyof School] ? (newSchool[gpa.value as keyof School] as NumberInput).input : null} name={gpa.value}
                                        handleInput={handleInput}
                                        />
                                        {/* <input className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' value={(newSchool[gpa.value as keyof School] as NumberInput) && (newSchool[gpa.value as keyof School] as NumberInput).input ? (newSchool[gpa.value as keyof School] as NumberInput).input : ''} name={gpa.value} onChange={handleInputChange} /> */}
                                        <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                            Add Note
                                        </button>
                                    </div>
                                    {(newSchool[gpa.value as keyof School] as NumberInput) && (newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded max-w-[900px] mt-3'>
                                            <div className='flex justify-between items-center w-full mb-1'>
                                                <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                                <div className='flex gap-2'>
                                                    <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                                    <button onClick={(e) => deleteNote(e, i, gpa.value)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                                </div>
                                            </div>
                                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                        </div>
                                    ))}
                                </div>
                                <div className='mr-4'>
                                <EditButtons loggedInUser={loggedInUser} input={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).input} isEditMode={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).isEditMode} name={gpa.value}
                                enableEditMode={enableEditModeInner} confirmEdit={confirmEditInner} undoEdit={undoEditInner} revertEdit={revertEditInner} newSchool={newSchool} setNewSchool={setNewSchool}
                                />
                                </div>
                            </div>
                            </>
                            )})}
                        </>
                        )}
                </div>
                <EditButtons loggedInUser={loggedInUser} input={newSchool.edited_school_minimum_gpa_required.input} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} link={newSchool.edited_school_minimum_gpa_required.link} name='school_minimum_gpa_required' 
                toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                 />
            </div>

            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">Minimum GPA Recommended<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_recommended.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_minimum_gpa_recommended.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <div className="my-2">
                <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_minimum_gpa_recommended.input} isEditMode={newSchool.edited_school_minimum_gpa_recommended.isEditMode} originalInput={newSchool.school_minimum_gpa_recommended} name='school_minimum_gpa_recommended'
                handleCheck={handleCheck}/>
                </div>
                {(newSchool.school_minimum_gpa_recommended || newSchool.edited_school_minimum_gpa_recommended.input === true) &&  (
                <>
                    {gpaRecommended.map((gpa,i) => (
                    <>
                    <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mb-4 flex justify-start items-start gap-3 max-w-[900px] w-full`}>
                        <div className={` ml-4 relative grow p-4 block rounded border-[#545454] border-2`}>
                            <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                            <div className='flex justify-start items-center gap-4'>
                                <InputFields loggedInUser={loggedInUser} input={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).input} isEditMode={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).isEditMode} originalInput={newSchool[gpa.value as keyof School] ? (newSchool[gpa.value as keyof School] as NumberInput).input : null} name={gpa.value}
                                handleInput={handleInput}
                                />
                                {/* <input className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' value={(newSchool[gpa.value as keyof School] as NumberInput) && (newSchool[gpa.value as keyof School] as NumberInput).input ? (newSchool[gpa.value as keyof School] as NumberInput).input : ''} name={gpa.value} onChange={handleInputChange} /> */}
                                <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                            {(newSchool[gpa.value as keyof School] as NumberInput) && (newSchool[gpa.value as keyof School] as NumberInput).notes && (newSchool[gpa.value as keyof School] as NumberInput).notes?.map((note: Note, i: number) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded max-w-[900px] mt-3'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setIndex(i); setEditedNote(note)}}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i, gpa.value)}><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                        <div className='mr-4'>
                            <EditButtons loggedInUser={loggedInUser} input={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).input} isEditMode={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).isEditMode} name={gpa.value}
                            enableEditMode={enableEditModeInner} confirmEdit={confirmEditInner} undoEdit={undoEditInner} revertEdit={revertEditInner} newSchool={newSchool} setNewSchool={setNewSchool}
                            />
                        </div>
                    </div>
                    </>
                    ))}
                </>
                )}
            </div>
            <EditButtons loggedInUser={loggedInUser} input={newSchool.edited_school_minimum_gpa_recommended.input} isEditMode={newSchool.edited_school_minimum_gpa_recommended.isEditMode} name='school_minimum_gpa_recommended' link={newSchool.edited_school_minimum_gpa_recommended.link} confirmEdit={confirmEdit} 
            toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditMode} undoEdit={undoEdit} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
            />
        </div>

        <OtherTypesOfGpa newSchool={newSchool} setNewSchool={setNewSchool}/>

        <SpecificCourse newSchool={newSchool} setNewSchool={setNewSchool}/>

        <PreviousCycleSection newSchool={newSchool} setNewSchool={setNewSchool} />
        
        <div className={`mt-28 text-xl w-full`}>
                <p>GPA General Notes</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_gpa_general_note} 
                onChange={handleQuill}/>
        </div>
        </>
        )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />)}

        </>
    )
}