import { School, NumberInput, Note } from "../../../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import ReactQuill from "react-quill";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import OtherTypesOfGpa from "./OtherTypesOfGpa";
import SpecificCourse from "./SpecificCourse";
import AddNoteFields from "../../Assets/AddNoteFields";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";

import AddNote from "../Prereqs/AddNote";
import PreviousCycleSection from "./PreviousCycleSection";
import { UserObject } from "../../../../types/users.types";

import LinkPopup from "../../LinkPopup";
import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";
import { confirmEditGroup, enableEditModeGroup, revertEditGroup, undoEditGroup } from "./GPAFunctions";


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

    const [ isRecOpen, setIsRecOpen ] = useState(false);
    const [ isReqOpen, setIsReqOpen ] = useState(false);
    const [ recHasInputs, setRecHasInputs ] = useState<boolean | null>(null);
    const [ reqHasInputs, setReqHasInputs ] = useState<boolean | null>(null);

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
        if (newSchool.school_minimum_gpa_required.input) {
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_required: {
                    ...newSchool.school_minimum_gpa_required,
                    school_minimum_overall_gpa_required: {
                        ...newSchool.school_minimum_gpa_required.school_minimum_overall_gpa_required,
                        input: newSchool.school_minimum_gpa_required.school_minimum_overall_gpa_required?.input ? newSchool.school_minimum_gpa_required.school_minimum_overall_gpa_required?.input : 0,
                        notes: newSchool.school_minimum_gpa_required.school_minimum_overall_gpa_required?.notes ? newSchool.school_minimum_gpa_required.school_minimum_overall_gpa_required.notes : [],
                    },
                    school_minimum_science_gpa_required: {
                        ...newSchool.school_minimum_gpa_required.school_minimum_science_gpa_required,
                        input: newSchool.school_minimum_gpa_required.school_minimum_science_gpa_required?.input ? newSchool.school_minimum_gpa_required.school_minimum_science_gpa_required.input : 0,
                        notes: newSchool.school_minimum_gpa_required.school_minimum_science_gpa_required?.notes ? newSchool.school_minimum_gpa_required.school_minimum_science_gpa_required.notes : [],
                    },
                    school_minimum_prerequisite_gpa_required: {
                        ...newSchool.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required,
                        input: newSchool.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required?.input ? newSchool.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required.input : 0,
                        notes: newSchool.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required?.notes ? newSchool.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required?.notes : [],
                    },
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_required: {
                    ...newSchool.school_minimum_gpa_required,
                    school_minimum_overall_gpa_required: null,
                    school_minimum_prerequisite_gpa_required: null,
                    school_minimum_science_gpa_required: null,
                }
            })
        }
      }, [newSchool.school_minimum_gpa_required.input]);


      useEffect(() => {
        if (newSchool.school_minimum_gpa_recommended.input) {
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_recommended: {
                    ...newSchool.school_minimum_gpa_recommended,
                    school_minimum_overall_gpa_recommended: {
                        ...newSchool.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended,
                        input: newSchool.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended?.input ? newSchool.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended?.input : 0,
                        notes: newSchool.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended?.notes ? newSchool.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended?.notes : [],
                    },
                    school_minimum_science_gpa_recommended: {
                        ...newSchool.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended,
                        input: newSchool.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended?.input ? newSchool.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended?.input : 0,
                        notes: newSchool.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended?.notes ? newSchool.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended?.notes : [],
                    },
                    school_minimum_prerequisite_gpa_recommended: {
                        ...newSchool.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended,
                        input: newSchool.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended?.input ? newSchool.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended?.input : 0,
                        notes: newSchool.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended?.notes ? newSchool.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended?.notes : [],
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_minimum_gpa_recommended: {
                    ...newSchool.school_minimum_gpa_recommended,
                    school_minimum_overall_gpa_recommended: null,
                    school_minimum_prerequisite_gpa_recommended: null,
                    school_minimum_science_gpa_recommended: null,
                }
            })
        }
      }, [newSchool.school_minimum_gpa_recommended.input]);

      useEffect(() => {
        if (newSchool.edited_school_minimum_gpa_required.input === null) {
            if (newSchool.school_minimum_gpa_required.input) {
                setIsReqOpen(true);
            } else {
                setIsReqOpen(false);
            }
        } else {
            if (newSchool.edited_school_minimum_gpa_required.input) {
                setIsReqOpen(true);
            } else {
                setIsReqOpen(false);
            }
        }
      }, [newSchool.edited_school_minimum_gpa_required.input, newSchool.school_minimum_gpa_required.input]);

      useEffect(() => {
        if (newSchool.edited_school_minimum_gpa_recommended.input === null) {
            if (newSchool.school_minimum_gpa_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        } else {
            if (newSchool.edited_school_minimum_gpa_recommended.input) {
                setIsRecOpen(true);
            } else {
                setIsRecOpen(false);
            }
        }
      }, [newSchool.edited_school_minimum_gpa_recommended.input, newSchool.school_minimum_gpa_recommended.input]);

      useEffect(() => {
        if (newSchool.edited_school_minimum_gpa_required.input !== null || newSchool.edited_school_minimum_gpa_required.edited_school_minimum_overall_gpa_required.input !== null || newSchool.edited_school_minimum_gpa_required.edited_school_minimum_prerequisite_gpa_required.input !== null 
            || newSchool.edited_school_minimum_gpa_required.edited_school_minimum_science_gpa_required.input !== null) {
                setReqHasInputs(true)
        } else {
                setReqHasInputs(null)
        };

        if (newSchool.edited_school_minimum_gpa_recommended.input !== null || newSchool.edited_school_minimum_gpa_recommended.edited_school_minimum_overall_gpa_recommended.input !== null || newSchool.edited_school_minimum_gpa_recommended.edited_school_minimum_prerequisite_gpa_recommended.input !== null 
            || newSchool.edited_school_minimum_gpa_recommended.edited_school_minimum_science_gpa_recommended.input !== null) {
                setRecHasInputs(true)
        } else {
                setRecHasInputs(null)
        }
        
      }, [newSchool.edited_school_minimum_gpa_required, newSchool.edited_school_minimum_gpa_recommended])



      const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (name.includes('required')) {
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_required: {
                        ...newSchool.school_minimum_gpa_required,
                        [name]: {
                            input: (newSchool.school_minimum_gpa_required[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_required[name as keyof object] as any).input  : '',
                            notes: (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes ? (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes.concat(note) : [note]
                        }
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_recommended: {
                        ...newSchool.school_minimum_gpa_recommended,
                        [name]: {
                            input: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input  : '',
                            notes: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes ? (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes.concat(note) : [note]
                        }
                    }
                })
            
        }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (name.includes('required')) {
                const field = newSchool.edited_school_minimum_gpa_required[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_required: {
                        ...newSchool.edited_school_minimum_gpa_required,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes ? field.notes.concat(note) : [note],
                        }
                    }
                })
            } else {
                const field = newSchool.edited_school_minimum_gpa_recommended[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_recommended: {
                        ...newSchool.edited_school_minimum_gpa_recommended,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes ? field.notes.concat(note) : [note],
                        }
                    }
                })
            
        }
        }
            
        
    };

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (name.includes('required')) {
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_required: {
                        ...newSchool.school_minimum_gpa_required,
                        [name]: {
                            input: (newSchool.school_minimum_gpa_required[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_required[name as keyof object] as any).input  : '',
                            notes: (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes && (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes.map((n:Note,i:number) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
                } else {
                    setNewSchool({
                        ...newSchool,
                        school_minimum_gpa_recommended: {
                            ...newSchool.school_minimum_gpa_recommended,
                            [name]: {
                                input: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input  : '',
                                notes: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes && (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes.map((n:Note,i:number) => {
                                    if (i === index) {
                                        return { ...note }
                                    } else {
                                        return { ...n }
                                    }
                                })
                            }
                        }
                    })
                }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (name.includes('required')) {
                const field = newSchool.edited_school_minimum_gpa_required[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_required: {
                        ...newSchool.edited_school_minimum_gpa_required,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.map((n:any,i:number) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            } else {
                const field = newSchool.edited_school_minimum_gpa_recommended[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_recommended: {
                        ...newSchool.edited_school_minimum_gpa_recommended,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.map((n:any,i:number) => {
                                if (i === index) {
                                    return { ...note }
                                } else {
                                    return { ...n }
                                }
                            })
                        }
                    }
                })
            
            }
        }
            
        
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (name.includes('required')) {
                setNewSchool({
                    ...newSchool,
                    school_minimum_gpa_required: {
                        ...newSchool.school_minimum_gpa_required,
                        [name]: {
                            input: (newSchool.school_minimum_gpa_required[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_required[name as keyof object] as any).input  : '',
                            notes: (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes && (newSchool.school_minimum_gpa_required[name as keyof object] as any).notes.filter((n:Note,i:number) => i !== index),
                        }
                    }
                })
                } else {
                    setNewSchool({
                        ...newSchool,
                        school_minimum_gpa_recommended: {
                            ...newSchool.school_minimum_gpa_recommended,
                            [name]: {
                                input: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input ? (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).input  : '',
                                notes: (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes && (newSchool.school_minimum_gpa_recommended[name as keyof object] as any).notes.filter((n:Note,i:number) => i !== index),
                            }
                        }
                    })
                }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (name.includes('required')) {
                const field = newSchool.edited_school_minimum_gpa_required[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_required: {
                        ...newSchool.edited_school_minimum_gpa_required,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.filter((n:any, i:number) => i !== index)
                        }
                    }
                })
            } else {
                const field = newSchool.edited_school_minimum_gpa_recommended[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_minimum_gpa_recommended: {
                        ...newSchool.edited_school_minimum_gpa_recommended,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.filter((n:any, i:number) => i !== index)
                        }
                    }
                })
            
            }
        }
        
        
    };

    
    // Handles boolean inputs 
    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
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


    const handleInputInCategory = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        
        if (!isEditedInput) {
            const field = newSchool[category as keyof School] as object;
            if (category === 'school_minimum_gpa_required' || category === 'school_minimum_gpa_recommended') {
                setNewSchool({
                    ...newSchool,
                    [category]: {
                        ...field,
                        [e.target.name]: {
                            ...(field[e.target.name as keyof object] as NumberInput),
                            input: e.target.value
                        },
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    [category]: {
                        ...field,
                        [e.target.name]: e.target.value
                    }
                })
            }
            
        } else {
            const name = `edited_${e.target.name}`;
            const editedCategory = `edited_${category}`;
            const field = newSchool[editedCategory as keyof School] as object;
                setNewSchool({
                    ...newSchool,
                    [editedCategory]: {
                        ...field,
                        [name]: {
                            ...field[name as keyof object] as object,
                            input: e.target.value,
                        }
                    }
                })
        } 
    };


    return (
        <>
        {newSchool && (
            <>
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_minimum_gpa_required.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} />
                <Indicator label="Minimum GPA Required" editedInput={newSchool.edited_school_minimum_gpa_required.input} />
                        <div className='my-2'>
                        <BooleanFields isEdit={isEdit} newSchool={newSchool} input={newSchool.edited_school_minimum_gpa_required.input} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} loggedInUser={loggedInUser} 
                        originalInput={newSchool.school_minimum_gpa_required.input} name='school_minimum_gpa_required' handleCheck={handleCheck}
                        />
                        </div>
                        {isReqOpen && (
                        <>
                            {gpaRequired.map((gpa,i) => {
                                const name = `edited_${gpa.value}`;
                                const field = newSchool.edited_school_minimum_gpa_required[name as keyof object] as {input: number | null, prev: number | null, isEditMode: boolean, notes: Note[] | null};
                                const originalField = newSchool.school_minimum_gpa_required[gpa.value as keyof object] as NumberInput | null;
                            return (
                            <>
                            <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mb-4 flex justify-start items-start gap-3 max-w-[900px] w-full`}>
                                <div className={`relative ml-4 p-4 block grow rounded border-[#545454] border-2`}>
                                    <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                                    <div className='flex justify-start items-start gap-4'>
                                        <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} input={field.input} isEditMode={field.isEditMode} originalInput={originalField ? originalField.input : null} name={gpa.value} category='school_minimum_gpa_required' handleInput={handleInputInCategory} />
                                        <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                            Add Note
                                        </button>
                                    </div>
                                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} notes={field.notes} originalNotes={originalField ? originalField.notes : null} name={gpa.value} toggleNotePopup={toggleNotePopup}
                                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                                    />
                                </div>
                                <div className='mr-4'>
                                </div>
                            </div>
                            </>
                            )})}
                        </>
                        )}
                </div>
                {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={reqHasInputs} isEditMode={newSchool.edited_school_minimum_gpa_required.isEditMode} link={newSchool.edited_school_minimum_gpa_required.link} name='school_minimum_gpa_required' 
                toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
                 />}
            </div>

            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                <Screen isEdit={isEdit} editedInput={newSchool.edited_school_minimum_gpa_recommended.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_minimum_gpa_recommended.isEditMode} />
                <Indicator label="Minimum GPA Recommended" editedInput={newSchool.edited_school_minimum_gpa_recommended.input} />
                <div className="my-2">
                <BooleanFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_minimum_gpa_recommended.input} isEditMode={newSchool.edited_school_minimum_gpa_recommended.isEditMode} originalInput={newSchool.school_minimum_gpa_recommended.input} name='school_minimum_gpa_recommended'
                handleCheck={handleCheck}/>
                </div>
                {isRecOpen &&  (
                <>
                    {gpaRecommended.map((gpa,i) => {
                        const name = `edited_${gpa.value}`;
                        const field = newSchool.edited_school_minimum_gpa_recommended[name as keyof object] as {input: number | null, prev: number | null, isEditMode: boolean};
                        const originalField = newSchool.school_minimum_gpa_recommended[gpa.value as keyof object] as NumberInput | null;
                    return (
                    <>
                    <div className={`${i === 0 ? 'mt-8' : 'mt-12'} mb-4 flex justify-start items-start gap-3 max-w-[900px] w-full`}>
                        <div className={` ml-4 relative grow p-4 block rounded border-[#545454] border-2`}>
                            <label className='absolute top-[-16px] text-xl font-medium bg-white'>{gpa.label}</label>
                            <div className='flex justify-start items-center gap-4'>
                                <InputFieldsGroup isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={field.isEditMode} originalInput={originalField ? originalField.input : null} input={field.input} handleInput={handleInputInCategory} 
                                category="school_minimum_gpa_recommended" name={gpa.value}
                                />
                                {/* <input className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' value={(newSchool[gpa.value as keyof School] as NumberInput) && (newSchool[gpa.value as keyof School] as NumberInput).input ? (newSchool[gpa.value as keyof School] as NumberInput).input : ''} name={gpa.value} onChange={handleInputChange} /> */}
                                <button onClick={(e:any) => {toggleNotePopup(e); setName(gpa.value)}} name='add' value={gpa.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                    Add Note
                                </button>
                            </div>
                            {(newSchool.school_minimum_gpa_recommended[gpa.value as keyof object] as NumberInput) && (newSchool.school_minimum_gpa_recommended[gpa.value as keyof object] as NumberInput).notes && (newSchool.school_minimum_gpa_recommended[gpa.value as keyof object] as NumberInput).notes?.map((note: Note, i: number) => (
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
                            {/* <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).input} isEditMode={(newSchool[`edited_${gpa.value}` as keyof School] as InnerGPA).isEditMode} name={gpa.value}
                            enableEditMode={enableEditModeInner} confirmEdit={confirmEditInner} undoEdit={undoEditInner} revertEdit={revertEditInner} newSchool={newSchool} setNewSchool={setNewSchool}
                            /> */}
                        </div>
                    </div>
                    </>
                    )
                })}
                </>
                )}
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={recHasInputs} isEditMode={newSchool.edited_school_minimum_gpa_recommended.isEditMode} name='school_minimum_gpa_recommended' link={newSchool.edited_school_minimum_gpa_recommended.link} confirmEdit={confirmEditGroup} 
            toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj} enableEditMode={enableEditModeGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>

        <OtherTypesOfGpa newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>

        <SpecificCourse newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>

        <PreviousCycleSection newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit} handleInputInCategory={handleInputInCategory}/>
        
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