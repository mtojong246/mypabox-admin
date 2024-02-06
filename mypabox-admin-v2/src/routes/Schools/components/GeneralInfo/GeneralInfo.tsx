import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import countries from "../../../../data/countries.json";
import Select from 'react-select';
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import AddPhoneOrEmail from "../../Assets/AddPhoneOrEmail";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";

import LinkPopup from "../../LinkPopup";

import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFields from "../../Assets/InputsFields";

import { enableEditMode, confirmEdit, undoEdit, revertEdit, confirmEditBool, undoEditBool, revertEditBool, enableEditModeBool } from "./GeneralInfoFunctions";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from "./EmailPhoneFunctions";
import AddNoteFields from "../../Assets/AddNoteFields";





const fields = [
    {
        name: 'School Name',
        value: 'school_name',
        margin: 'mt-10',
        type: 'text',
        required: true,
    },
    {
        name: 'School Logo',
        value: 'school_logo',
        margin: 'mt-12',
        type: 'text',
        required: false,
    },
    {
        name: 'Street Address',
        value: 'school_street',
        margin: 'mt-12',
        type: 'text',
        required: true,
    },
    {
        name: 'City',
        value: 'school_city',
        margin: 'mt-12',
        type: 'text',
        required: true,
    },
    {
        name: 'Country',
        value: 'school_country',
        margin: 'mt-12',
        type: 'select',
        required: true,
    },
    {
        name: 'State',
        value: 'school_state',
        margin: 'mt-12',
        type: 'select',
        required: true,
    },
    {
        name: 'Zip',
        value: 'school_zip_code',
        margin: 'mt-12',
        type: 'text',
        required: true,
    },
    {
        name: 'Website',
        value: 'school_website',
        margin: 'mt-12',
        type: 'text',
        required: true,
    },
    {
        name: 'School Email',
        value: 'school_email',
        margin: 'mt-12',
        type: 'email',
        required: false,
    },
    {
        name: 'School Phone Number',
        value: 'school_phone_number',
        margin: 'mt-12',
        type: 'number',
        required: false,
    },
    {
        name: 'Campus Location',
        value: 'school_campus_location',
        margin: 'mt-28',
        type: 'text',
        required: false,
    },
    {
        name: 'Start Month',
        value: 'school_start_month',
        margin: 'mt-12',
        type: 'select',
        required: false,
    },
    {
        name: 'Class Capacity',
        value: 'school_class_capacity',
        margin: 'mt-12',
        type: 'text',
        required: false,
    },
    {
        name: 'Duration (Full-time)',
        value: 'school_duration_full_time',
        margin: 'mt-12',
        type: 'text',
        required: false,
    },
    {
        name: 'Duration (Part-time)',
        value: 'school_duration_part_time',
        margin: 'mt-12',
        type: 'text',
        required: false,
    },
    {
        name: 'Rolling Admissions',
        value: 'school_rolling_admissions',
        margin: 'mt-28',
        type: 'bool',
        required: false,
    },
    {
        name: 'Non-rolling Admissions',
        value: 'school_nonrolling_admissions',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Pre-PA Curriculum',
        value: 'school_pre_pa_curriculum',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Direct High School Entry',
        value: 'school_direct_high_school_entry',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Part-time Option',
        value: 'school_part_time_option',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Online Learning',
        value: 'school_online_learning',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'On-campus Housing',
        value: 'school_on_campus_housing',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Cadaver Lab',
        value: 'school_cadaver_lab',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Faith-based Learning',
        value: 'school_faith_based_learning',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'Military Personnel Preference',
        value: 'school_military_personnel_preference',
        margin: 'mt-12',
        type: 'bool',
        required: false,
    },
    {
        name: 'General Information Notes',
        value: 'school_general_information',
        margin: 'mt-28',
        type: 'editor',
        required: false,
    }
];

const months = [
    {value: 'January', label: 'January'},
    {value: 'February', label: 'February'},
    {value: 'March', label:'March'},
    {value: 'April', label: 'April'},
    {value: 'May', label: 'May'},
    {value: 'June', label: 'June'},
    {value: 'July', label: 'July'},
    {value: 'August', label: 'August'},
    {value: 'September', label: 'September'},
    {value: 'October', label: 'October'},
    {value: 'November', label: 'November'},
    {value: 'December', label: 'December'}
]

export default function GeneralInfo({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [stateNames, setStateNames] = useState<any>([]);
    const [countryNames, setCountryNames] = useState<any>([]);

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

    const [phone, setPhone] = useState({
        category: '',
        number: '',
    });

    const [email, setEmail] = useState({
        category: '',
        email: '',
    })

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
          target: {name: "school_country", type: 'text', value: country.name }})))
    
        setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
         .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
         value: state.name, } })))
    
    }, [newSchool.school_country.input]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            const name = e.target.name as keyof School;
            const field = newSchool[name] as StringInput | NumberInput;
            let value: string | number = e.target.value;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: value,
                }
            })
        } else {
            const name = `edited_${e.currentTarget.name}` as keyof School;
            const field = newSchool[name] as object;
            let value: string | number = e.target.value;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: value,
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

    const handleSelect = (e: any, name: string, isEditedInput: boolean) => {
        console.log(e, name, isEditedInput)
        if (!isEditedInput) {
            const field = newSchool[name as keyof School] as StringInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.value,
                }
            })
        } else {
            const field = newSchool[name as keyof School] as object;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: e.value,
                }
            })
        }
        
    };

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_general_information: e,
        })
    };

    const addNote = (note: Note) => {
        if (loggedInUser.isSuperAdmin) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        } else {
            const field = newSchool[`edited_${name}` as keyof object] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).concat(note),
                }
            })
        }
        
    };

    console.log(newSchool.edited_school_campus_location)

    const updateNote = (note: Note) => {
        if (loggedInUser.isSuperAdmin) {
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
        } else {
            const field = newSchool[`edited_${name}` as keyof object] as any;
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
        if (loggedInUser.isSuperAdmin) {
            const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        } else {
            const field = newSchool[`edited_${name}` as keyof object] as any;
            setNewSchool({
                ...newSchool,
                [`edited_${name}`]: {
                    ...field,
                    notes: (field.notes as Note[]).filter((n,i) => i !== index)
                }
            })
        }
        
    };

    const addPhone = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
            ...newSchool,
            school_phone_number: {
                ...newSchool.school_phone_number,
                input: newSchool.school_phone_number.input.concat(phone),
            }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_phone_number: {
                    ...newSchool.edited_school_phone_number,
                    input: newSchool.edited_school_phone_number.input!.concat({
                        category: phone.category,
                        number: phone.number,
                        isCorrect: true,
                        isNew: true,
                    })
                }
            })
        }
        
        setPhone({
            ...phone,
            number: '',
        })
        
    };

    const addEmail = (e: MouseEvent<HTMLButtonElement>, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_email: {
                    ...newSchool.school_email,
                    input: newSchool.school_email.input.concat(email),
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_email: {
                    ...newSchool.edited_school_email,
                    input: newSchool.edited_school_email.input!.concat({
                        category: email.category,
                        email: email.email,
                        isCorrect: true,
                        isNew: true,
                    })
                }
            })
        }
        
        setEmail({
            ...email,
            email: '',
        })
        
    };

    const deletePhone = (e:any, index:number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_phone_number: {
                    ...newSchool.school_phone_number,
                    input: newSchool.school_phone_number.input.filter((n,i) => i !== index)
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_phone_number: {
                    ...newSchool.edited_school_phone_number,
                    input: isNew ? newSchool.edited_school_phone_number.input!.filter((inp, i) => i !== index) : 
                    newSchool.edited_school_phone_number.input!.map((inp, i) => {
                        if (i === index) {
                            return {
                                ...inp,
                                isCorrect: false,
                            }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const deleteEmail = (e:any, index: number, isNew: boolean, isEditedInput: boolean) => {
        e.preventDefault();
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_email: {
                    ...newSchool.school_email,
                    input: newSchool.school_email.input.filter((n,i) => i !== index),
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_email: {
                    ...newSchool.edited_school_email,
                    input: isNew ? newSchool.edited_school_email.input!.filter((inp,i) => i !== index) : newSchool.edited_school_email.input!.map((inp,i) => {
                        if (i === index) {
                            return {
                                ...inp, 
                                isCorrect: false,
                            }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
        
    };

    const undoChange = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        if (e.currentTarget.name === 'school_email') {
            setNewSchool({
                ...newSchool,
                edited_school_email: {
                    ...newSchool.edited_school_email,
                    input: newSchool.edited_school_email.input!.map((inp,i) => {
                        if (i === index) {
                            return {
                                ...inp, 
                                isCorrect: true,
                            }
                        } else { 
                            return { ...inp }
                        }
                    })
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_phone_number: {
                    ...newSchool.edited_school_phone_number,
                    input: newSchool.edited_school_phone_number.input!.map((inp, i) => {
                        if (i === index) {
                            return { ...inp, isCorrect: true }
                        } else {
                            return { ...inp }
                        }
                    })
                }
            })
        }
    } 


    const setPhoneFormat = (e:any) => {
        const value = e.target.value.replace(/(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/, '$1$2$3-$4$5$6-$7$8$9$10');
        setPhone({
            ...phone,
            number: value,
        })
    }

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
        {fields.map((cat) => {

        if (cat.type === 'text') {
            const name = `edited_${cat.value}` as keyof School;
            const field = newSchool[name] as {input: string, prev: string, isEditMode: boolean, link: string, notes?: Note[] | null};
            return (
            <div className={`${cat.margin} flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && field.input !== null) || (!loggedInUser.permissions.canVerify && !field.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">{cat.name}{cat.required && <span className='text-red-600'>*</span>}<PiCheckCircle className={`h-5 w-5 ml-[2px] ${field.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-start gap-3'>
                        <InputFields loggedInUser={loggedInUser} input={field.input} isEditMode={field.isEditMode} originalInput={((newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number)} name={cat.value} handleInput={handleInput}/>
                        {(newSchool[cat.value as keyof School] as StringInput | NumberInput).notes && (<button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} name='add' value={cat.value} className="disabled:opacity-70 w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white disabled:hover:bg-none hover:bg-[#F06A6A]">
                            Add Note
                        </button>)}
                    </div>
                    {/* {
                    (newSchool[cat.value as keyof School] as StringInput | NumberInput).notes ? (
                    <>
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${(newSchool[cat.value as keyof School] as StringInput | NumberInput).notes.length ? 'mt-3' : 'mt-0'}`}>
                        {(newSchool[cat.value as keyof School] as StringInput | NumberInput).notes?.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                    </div>
                    </>
                    ) : ''
                    } */}
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={field.isEditMode} notes={field.notes ? field.notes : null} originalNotes={((newSchool[cat.value as keyof School] as StringInput | NumberInput).notes as Note[]) ? ((newSchool[cat.value as keyof School] as StringInput | NumberInput).notes as Note[]) : null} name={cat.value} toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={field.isEditMode} input={field.input} link={field.link} 
                   setLinkObj={setLinkObj} name={cat.value} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
            )

        // ** SELECT INPUT ** //

        } else if (cat.type === 'select') {
            const name = `edited_${cat.value}` as keyof School;
            const field = newSchool[name] as {input: string, prev: string, isEditMode: boolean, link: string, notes?: Note[] | null};
            const originalField = newSchool[cat.value as keyof object] as any;
            return (
            <div className={`${cat.margin} flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && field.input !== null) || (!loggedInUser.permissions.canVerify && !field.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">{cat.name}{cat.required && <span className='text-red-600'>*</span>}<PiCheckCircle className={`h-5 w-5 ml-[2px] ${field.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-center items-start gap-3'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {field.input !== null ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <Select isDisabled className="w-full focus:outline-none rounded"
                            options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} value={cat.value === 'school_state' && newSchool.edited_school_state.input ? {value: newSchool.edited_school_state.input, label: newSchool.edited_school_state.input} : cat.value === 'school_country' && newSchool.edited_school_country.input ? {value: newSchool.edited_school_country.input, label: newSchool.edited_school_country.input} : cat.value === 'school_start_month' && newSchool.edited_school_start_month.input ? {value: newSchool.edited_school_start_month.input, label: newSchool.edited_school_start_month.input} : null}/>
                            <Select isDisabled className={`w-full focus:outline-none rounded ${field.input ? 'line-through' : 'no-underline'}`}
                            options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} value={cat.value === 'school_state' && newSchool.school_state.input ? {value: newSchool.school_state.input, label: newSchool.school_state.input} : cat.value === 'school_country' && newSchool.school_country.input ? {value: newSchool.school_country.input, label: newSchool.school_country.input} : cat.value === 'school_start_month' && newSchool.school_start_month.input ? {value: newSchool.school_start_month.input, label: newSchool.school_start_month.input} : null}/>
                            </div>
                        ) : (
                        <Select className="grow focus:outline-none rounded"
                        options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} onChange={(e:any) => handleSelect(e, cat.value, false)} value={cat.value === 'school_state' && newSchool.school_state.input ? {value: newSchool.school_state.input, label: newSchool.school_state.input} : cat.value === 'school_country' && newSchool.school_country.input ? {value: newSchool.school_country.input, label: newSchool.school_country.input} : cat.value === 'school_start_month' && newSchool.school_start_month.input ? {value: newSchool.school_start_month.input, label: newSchool.school_start_month.input} : null}/>
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(field.input !== null || field.isEditMode) && <Select onChange={(e:any) => handleSelect(e, name, true)} isDisabled={field.isEditMode ? false : true} className="w-full focus:outline-none rounded"
                            options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} value={cat.value === 'school_state' && newSchool.edited_school_state.input ? {value: newSchool.edited_school_state.input, label: newSchool.edited_school_state.input} : cat.value === 'school_country' && newSchool.edited_school_country.input ? {value: newSchool.edited_school_country.input, label: newSchool.edited_school_country.input} : cat.value === 'school_start_month' && newSchool.edited_school_start_month.input ? {value: newSchool.edited_school_start_month.input, label: newSchool.edited_school_start_month.input} : null}/>}
                            {(!field.isEditMode || (field.isEditMode && (field.input !== originalField.input))) && <Select isDisabled className={`w-full focus:outline-none rounded ${field.input ? 'line-through' : 'no-underline'}`}
                            options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} value={cat.value === 'school_state' && newSchool.school_state.input ? {value: newSchool.school_state.input, label: newSchool.school_state.input} : cat.value === 'school_country' && newSchool.school_country.input ? {value: newSchool.school_country.input, label: newSchool.school_country.input} : cat.value === 'school_start_month' && newSchool.school_start_month.input ? {value: newSchool.school_start_month.input, label: newSchool.school_start_month.input} : null}/>}
                        </div>
                    )}
                        {(newSchool[cat.value as keyof School] as StringInput).notes && <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                            Add Note
                        </button>}
                    </div>
                    {/* {
                    (newSchool[cat.value as keyof School] as StringInput).notes ? (
                    <>
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${(newSchool[cat.value as keyof School] as StringInput).notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {(newSchool[cat.value as keyof School] as StringInput).notes?.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                    </div>
                    </>
                    ) : ''
                    } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={field.isEditMode} notes={field.notes ? field.notes : null} originalNotes={((newSchool[cat.value as keyof School] as StringInput | NumberInput).notes as Note[]) ? ((newSchool[cat.value as keyof School] as StringInput | NumberInput).notes as Note[]) : null} name={cat.value} toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={field.isEditMode} input={field.input} link={field.link} 
                   setLinkObj={setLinkObj} name={cat.value} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditMode} confirmEdit={confirmEdit} undoEdit={undoEdit} revertEdit={revertEdit} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
            )

        // ** BOOLEAN INPUT ** //

        } else if (cat.type === 'bool') {
            const name = `edited_${cat.value}` as keyof School;
            const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string, notes?: Note[] | null};
            return (
            <div className={`${cat.margin} flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    {((loggedInUser.permissions.canVerify && field.input !== null) || (!loggedInUser.permissions.canVerify && !field.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20 bg-none">{cat.name}{cat.required && <span className='text-red-600'>*</span>}<PiCheckCircle className={`h-5 w-5 ml-[2px] ${field.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-center gap-3 '>
                        <BooleanFields loggedInUser={loggedInUser} input={field.input} isEditMode={field.isEditMode} originalInput={(newSchool[cat.value as keyof School] as BooleanInput).input} name={cat.value} handleCheck={handleCheck}/>
                        <button  onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    {/* {
                    (newSchool[cat.value as keyof School] as BooleanInput).notes ? (
                    <>
                    <div className={`w-full flex flex-col justify-center items-center gap-3 ${(newSchool[cat.value as keyof School] as BooleanInput).notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {(newSchool[cat.value as keyof School] as BooleanInput).notes?.map((note: any, i: number) => {
                        return (
                        <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                            <div className='flex justify-between items-start w-full mb-1'>
                                <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                    {note.type}:
                                </p>
                                <div className='flex gap-2'>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                </div>
                                </div> 
                            <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                        </div>
                        )})}
                    </div>
                    </>
                    ) : ''
                    } */}
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={field.isEditMode} notes={field.notes ? field.notes : null} originalNotes={((newSchool[cat.value as keyof School] as BooleanInput).notes as Note[]) ? ((newSchool[cat.value as keyof School] as BooleanInput).notes as Note[]) : null} name={cat.value} toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={field.isEditMode} input={field.input} link={field.link} 
                   setLinkObj={setLinkObj} name={cat.value} toggleLinkPopup={toggleLinkPopup} enableEditMode={enableEditModeBool} confirmEdit={confirmEditBool} undoEdit={undoEditBool} revertEdit={revertEditBool} newSchool={newSchool} setNewSchool={setNewSchool}
                />}
            </div>
            )

        // ** TEXT EDITOR ** //

        } else if (cat.type === 'editor') {
            return (
            <div className={`${cat.margin} text-xl w-full`}>
                <p>{cat.name}</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool[cat.value as keyof School] as string} 
                onChange={handleQuill}/>
            </div>
            )

        } else if (cat.type === 'number') {
            return (
            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                {((loggedInUser.permissions.canVerify && newSchool.edited_school_phone_number.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_phone_number.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">School Phone Number<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_phone_number.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_phone_number.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <AddPhoneOrEmail loggedInUser={loggedInUser} input={newSchool.edited_school_phone_number.input} originalInput={newSchool.school_phone_number.input} isEditMode={newSchool.edited_school_phone_number.isEditMode} setEmail={setEmail} setPhone={setPhone} setPhoneFormat={setPhoneFormat} setName={setName} email={email} phone={phone} 
                addFunc={addPhone} deleteFunc={deletePhone} undoFunc={undoChange} value={cat.value} toggleNotePopup={toggleNotePopup} newSchool={newSchool}
                />
                {/* <div className='flex justify-center items-center gap-3'>
                    <div className='w-1/4 flex justify-center items-start gap-1'>
                        <CreatableSelect className="grow focus:outline-none rounded"
                        options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => setPhone({...phone, category: e.value})}/>
                        <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={phone.number} onChange={setPhoneFormat}/>
                    <button className="px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={addPhone}>Add Number</button>
                    <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                {newSchool.school_phone_number.input && newSchool.school_phone_number.input.map((num, i) => (
                    <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                        <p className='text font-semibold'>{num.category}: <span className='font-normal inline-block ml-1'>{num.number}</span></p>
                        <button onClick={(e:any) => deletePhone(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    </div>
                ))} */}
                {/* {newSchool.school_phone_number.notes.length ? (
                <>
                <label className='font-semibold inline-block mt-6'>Notes:</label>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_phone_number.notes.length ? 'mt-1' : 'mt-0'}`}>
                    {newSchool.school_phone_number.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_phone_number.isEditMode} notes={newSchool.edited_school_phone_number.notes ? newSchool.edited_school_phone_number.notes : null} originalNotes={newSchool.school_phone_number.notes} name='school_phone_number' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_phone_number.isEditMode} input={newSchool.edited_school_phone_number.input} link={newSchool.edited_school_phone_number.link} 
            setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} undoEdit={undoEditGroup} confirmEdit={confirmEditGroup} enableEditMode={enableEditModeGroup} revertEdit={revertEditGroup} name="school_phone_number" newSchool={newSchool}
            setNewSchool={setNewSchool}
            />}
            </div>
            )
        } else if (cat.type === 'email') {
            return (
            <div className={`mt-12 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_email.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_email.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
                <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center z-20">School Email<PiCheckCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_email.input === null ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${newSchool.edited_school_email.input !== null ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <AddPhoneOrEmail loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_email.isEditMode} input={newSchool.edited_school_email.input} originalInput={newSchool.school_email.input} setEmail={setEmail} setPhone={setPhone} setPhoneFormat={setPhoneFormat} setName={setName} email={email} phone={phone} 
                addFunc={addEmail} deleteFunc={deleteEmail} undoFunc={undoChange} value={cat.value} toggleNotePopup={toggleNotePopup} newSchool={newSchool}
                />
                {/* <div className='flex justify-center items-center gap-3'>
                    <div className='w-1/4 flex justify-center items-start gap-1'>
                        <CreatableSelect className="grow focus:outline-none rounded"
                        options={[{value: 'Main', label: 'Main'}]} onChange={(e:any) => setEmail({...email, category: e.value})}/>
                        <Tooltip title="Type and press enter to create new option" placement='right'>
                            <IconButton style={{padding: '0px'}}>
                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" value={email.email} onChange={(e:any) => setEmail({...email, email: e.target.value})}/>
                    <button className="px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]" onClick={addEmail}>Add Email</button>
                    <button disabled={!loggedInUser.isSuperAdmin ? true : false} onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                {newSchool.school_email.input && newSchool.school_email.input.map((em, i) => (
                    <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                        <p className='text font-semibold'>{em.category}: <span className='font-normal inline-block ml-1'>{em.email}</span></p>
                        <button onClick={(e:any) => deleteEmail(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    </div>
                ))} */}
                {/* {
                newSchool.school_email.notes.length ? (
                <>
                <label className='font-semibold inline-block mt-6'>Notes:</label>
                <div className={`w-full flex flex-col justify-center items-center gap-3 ${newSchool.school_email.notes.length ? 'mt-1' : 'mt-0'}`}>
                    {newSchool.school_email.notes.map((note: any, i: number) => {
                    return (
                    <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                        <div className='flex justify-between items-start w-full mb-1'>
                            <p className={`capitalize mb-1 ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#d2455f]'}`}>
                                {note.type}:
                            </p>
                            <div className='flex gap-2'>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button disabled={!loggedInUser.isSuperAdmin ? true : false} value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='disabled:opacity-70 disabled:hover:bg-none h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                            </div>
                            </div> 
                        <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                    </div>
                    )})}
                </div>
                </>
                ) : ''
                } */}
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_email.isEditMode} notes={newSchool.edited_school_email.notes ? newSchool.edited_school_email.notes : null} originalNotes={newSchool.school_email.notes} name='school_email' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_email.isEditMode} input={newSchool.edited_school_email.input} link={newSchool.edited_school_email.link} toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj}
            confirmEdit={confirmEditGroup} enableEditMode={enableEditModeGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} name='school_email'
            />}
            </div>
            )
        }

        })}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />
      )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        </>
    )
}