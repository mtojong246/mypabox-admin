import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from "react";
import { School, Note, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";
import ReactQuill from "react-quill";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import countries from "../../../../data/countries.json";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AddNote from "../Prereqs/AddNote";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { UserObject } from "../../../../types/users.types";

import { PiCheckCircle } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import { LuUndo2 } from "react-icons/lu";
import { GoLink } from "react-icons/go";
import LinkPopup from "../../LinkPopup";

import { enableEditMode, confirmEdit, undoEdit, revertEdit, confirmEditBool, undoEditBool, revertEditBool } from "./GeneralInfoFunctions";





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

    const handleSelect = (e: any, name: string) => {
        const field = newSchool[name as keyof School] as StringInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: e.value,
            }
        })
    };

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_general_information: e,
        })
    };

    const addNote = (note: Note) => {
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
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
    };

    const deleteNote = (e: any, index: number, name: string) => {
        e.preventDefault();
        const field = newSchool[name as keyof School] as StringInput | NumberInput | BooleanInput;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                notes: (field.notes as Note[]).filter((n,i) => i !== index)
            }
        })
    };

    const addPhone = (e:any) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_phone_number: {
                ...newSchool.school_phone_number,
                input: newSchool.school_phone_number.input.concat(phone),
            }
        })
        setPhone({
            ...phone,
            number: '',
        })
        
    };

    const addEmail = (e:any) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_email: {
                ...newSchool.school_email,
                input: newSchool.school_email.input.concat(email),
            }
        })
        setEmail({
            ...email,
            email: '',
        })
        
    };

    const deletePhone = (e:any, index:number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_phone_number: {
                ...newSchool.school_phone_number,
                input: newSchool.school_phone_number.input.filter((n,i) => i !== index)
            }
        })
    };

    const deleteEmail = (e:any, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_email: {
                ...newSchool.school_email,
                input: newSchool.school_email.input.filter((n,i) => i !== index),
            }
        })
    };


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
            const field = newSchool[name] as {input: string, prev: string, isEditMode: boolean, link: string};
            return (
            <div className={`${cat.margin} flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">{cat.name}{cat.required && <span className='text-red-600'>*</span>}<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!field.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-start gap-3'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {field.input ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <input disabled className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={cat.value === 'school_duration_full_time' || cat.value === 'school_duration_part_time' ? '# of months' : ''}
                            value={field.input} name={cat.value}/>
                            <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${field.input ? 'line-through' : 'no-underline'}`} value={(newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number}/>
                        </div>
                        ) : (
                        <input className="grow focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={cat.value === 'school_duration_full_time' || cat.value === 'school_duration_part_time' ? '# of months' : ''}
                        value={((newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number) ? ((newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number) : ''} name={cat.value} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e,false)}/>
                        )}
                        </>
                    ) : (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(field.input || field.isEditMode) && <input disabled={field.isEditMode ? false : true} className="w-full focus:outline-none border border-[#B4B4B4] p-3 rounded" placeholder={cat.value === 'school_duration_full_time' || cat.value === 'school_duration_part_time' ? '# of months' : ''}
                            value={field.input} name={cat.value} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInput(e, true)}/>}
                            <input disabled className={`w-full focus:outline-none border border-[#B4B4B4] p-3 rounded ${field.input || field.isEditMode ? 'line-through' : 'no-underline'}`} value={(newSchool[cat.value as keyof School] as StringInput | NumberInput).input as string | number}/>
                        </div>
                    )}
                        {(newSchool[cat.value as keyof School] as StringInput | NumberInput).notes && (<button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} name='add' value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>)}
                    </div>
                    {
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
                                    <button value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                            {!field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                            {field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool)} value={field.input}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => undoEdit(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            {(!field.isEditMode && field.input) ? (<button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                        </>
                        ) : (
                        <>
                            {field.input && <button name={cat.value} value={field.input} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEdit(e, newSchool, setNewSchool, cat.value)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {field.input && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEdit(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        </>
                        )}
                    </div>
                    {!loggedInUser.permissions.canVerify && (
                        <>
                        {!field.link && field.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                        {field.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: field.link, name})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                    )}
                    {loggedInUser.permissions.canVerify && field.link && <a href={field.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
                </div>}
            </div>
            )

        // ** SELECT INPUT ** //

        } else if (cat.type === 'select') {
            return (
            <div className={`${cat.margin} relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">{cat.name}</label>
                <div className='flex justify-center items-center gap-3'>
                    <Select className="grow focus:outline-none rounded"
                    options={cat.value === 'school_state' ? stateNames : cat.value === 'school_country' ? countryNames : months} onChange={(e:any) => handleSelect(e, cat.value)} value={cat.value === 'school_state' && newSchool.school_state.input ? {value: newSchool.school_state.input, label: newSchool.school_state.input} : cat.value === 'school_country' && newSchool.school_country.input ? {value: newSchool.school_country.input, label: newSchool.school_country.input} : cat.value === 'school_start_month' && newSchool.school_start_month.input ? {value: newSchool.school_start_month.input, label: newSchool.school_start_month.input} : null}/>
                    {(newSchool[cat.value as keyof School] as StringInput).notes && <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>}
                </div>
                {
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
                                <button value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            )

        // ** BOOLEAN INPUT ** //

        } else if (cat.type === 'bool') {
            const name = `edited_${cat.value}` as keyof School;
            const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
            return (
            <div className={`${cat.margin} flex justify-start items-start gap-3 w-full`}>
                <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                    <label className="absolute top-[-16px] text-xl bg-white flex justify-start items-center">{cat.name}{cat.required && <span className='text-red-600'>*</span>}<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!field.input ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${field.input ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                    <div className='flex justify-start items-start gap-3'>
                    {loggedInUser.permissions.canVerify ? (
                        <>
                        {field.input !== null ? (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled className="sr-only peer" name={cat.value} checked={field.input ? true : false}  />
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {field.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled className="sr-only peer" name={cat.value} checked={(newSchool[cat.value as keyof School] as BooleanInput).input ? true : false}  />
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${field.input ? 'line-through' : 'no-underline'}`}>
                                    {(newSchool[cat.value as keyof School] as BooleanInput).input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                        ): (
                        <div className='mt-2 grow'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" name={cat.value} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, false)} checked={(newSchool[cat.value as keyof School] as BooleanInput).input ? true : false}  />
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">
                                {(newSchool[cat.value as keyof School] as BooleanInput).input ? 'True' : 'False'}
                                </span>
                            </label>
                        </div>
                        )}
                        </>
                    ): (
                        <div className='flex flex-col justify-start items-start gap-3 grow'>
                            {(field.input !== null || field.isEditMode) && <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled={field.isEditMode ? false : true} className="sr-only peer" name={cat.value} onChange={(e:ChangeEvent<HTMLInputElement>) => handleCheck(e, true)} checked={field.input ? true : false}  />
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className="ml-3 text-xl text-black">
                                    {field.input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>}
                            <div className='mt-2 w-full'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" disabled className="sr-only peer" name={cat.value} checked={(newSchool[cat.value as keyof School] as BooleanInput).input ? true : false}  />
                                    <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                    <span className={`ml-3 text-xl text-black ${field.input || field.isEditMode ? 'line-through' : 'no-underline'}`}>
                                    {(newSchool[cat.value as keyof School] as BooleanInput).input ? 'True' : 'False'}
                                    </span>
                                </label>
                            </div>
                        </div>
                        )}
                        <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                    </div>
                    
                    {
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
                                    <button value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                    <button value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
                            {!field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => enableEditMode(e,newSchool, setNewSchool)}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                            {field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool)} value={field.input !== null ? field.input.toString() : ''}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {field.isEditMode && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => undoEditBool(e, newSchool, setNewSchool)}><AiOutlineClose className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                            {(!field.isEditMode && field.input !== null) ? (<button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>) : null}
                        </>
                        ) : (
                        <>
                            {field.input !== null && <button name={cat.value} value={field.input.toString()} onClick={(e:MouseEvent<HTMLButtonElement>) => confirmEditBool(e, newSchool, setNewSchool, cat.value)}><AiOutlineCheck className="h-7 w-7 border-2 rounded-md border-[#4FC769] bg-none text-[#4FC769] hover:text-white hover:bg-[#4FC769]"/></button>}
                            {field.input !== null && <button name={cat.value} onClick={(e:MouseEvent<HTMLButtonElement>) => revertEditBool(e, newSchool, setNewSchool)}><LuUndo2 className="h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]" /></button>}
                        </>
                        )}
                    </div>
                    {!loggedInUser.permissions.canVerify && (
                        <>
                        {!field.link && field.isEditMode && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: '', name})}} className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Add</span></button>}
                        {field.link && <button onClick={(e:MouseEvent<HTMLButtonElement>) => {toggleLinkPopup(e); setLinkObj({link: field.link, name})}}  className='flex justify-center items-center gap-1 border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold'><GoLink className="h-5 w-5"/><span>Edit</span></button>}
                    </>
                    )}
                    {loggedInUser.permissions.canVerify && field.link && <a href={field.link} className="flex justify-center items-center gap-1 no-underline border-2 rounded-md py-1 px-2 border-[#FF8F0B] text-[#FF8F0B] hover:bg-[#FF8F0B] hover:text-white font-semibold" target="_blank" rel="noreferrer"><GoLink className="h-5 w-5"/><span>View</span></a>}
                </div>}
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
            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">School Phone Number</label>
                <div className='flex justify-center items-center gap-3'>
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
                    <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                {newSchool.school_phone_number.input && newSchool.school_phone_number.input.map((num, i) => (
                    <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                        <p className='text font-semibold'>{num.category}: <span className='font-normal inline-block ml-1'>{num.number}</span></p>
                        <button onClick={(e:any) => deletePhone(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    </div>
                ))}
                {newSchool.school_phone_number.notes.length ? (
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
                                <button value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            )
        } else if (cat.type === 'email') {
            return (
            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">School Email</label>
                <div className='flex justify-center items-center gap-3'>
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
                    <button onClick={(e:any) => {toggleNotePopup(e); setName(cat.value)}} value={cat.value} className="w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]" >
                        Add Note
                    </button>
                </div>
                {newSchool.school_email.input && newSchool.school_email.input.map((em, i) => (
                    <div className='w-full flex justify-between items-center py-2 pl-3 pr-2 mt-3 rounded border border-[#B4B4B4]'>
                        <p className='text font-semibold'>{em.category}: <span className='font-normal inline-block ml-1'>{em.email}</span></p>
                        <button onClick={(e:any) => deleteEmail(e,i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                    </div>
                ))}
                {
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
                                <button value={cat.value} onClick={(e:any) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName(cat.value)}} ><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                <button value={cat.value} onClick={(e:any) => {deleteNote(e, i, cat.value)}} ><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
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
            )
        }

        })}
        {notePopup && (<AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote} />
      )}
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        </>
    )
}