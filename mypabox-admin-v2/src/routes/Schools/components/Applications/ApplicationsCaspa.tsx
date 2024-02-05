import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent} from "react"
import ReactQuill from "react-quill";
import Select, {StylesConfig} from 'react-select'
import AddNote from "../Prereqs/AddNote";

import LinkPopup from "../../LinkPopup";

import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';

import { enableEditModeGroup, confirmEditGroup, undoEditGroup, revertEditGroup } from "./ApplicationFunctions";


import { UserObject } from "../../../../types/users.types";
import EditButtons from "../../Assets/EditButtons";
import BooleanFields from "../../Assets/BooleanFields";
import InputFieldsGroup from "../../Assets/InputsFieldsGroup";

const options = [
    {value: 'Verified', label: 'Verified', color: '#27AE60', focus: '#27AE60'},
    {value: 'Completed', label: 'Completed', color: '#F39C12', focus: '#F39C12'},
    {value: 'Submitted', label: 'Submitted', color: '#3498DB', focus: '#3498DB'},
];


interface ColorOptions {value: string, label: string, color: string, focus: string}


const dot = (color:string = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color ,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 10,
      height: 10,
      width: 10,
    },
  });

const colorStyles: StylesConfig<ColorOptions> = {
    control: (styles) => ({...styles, backgroundColor: 'white'}),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? data.focus : undefined,
            color: isDisabled ? '#ccc' : isSelected ? 'white' : isFocused ? 'white' : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? isSelected ? data.color : data.focus : undefined,
            }
        }
    },
    input: (styles) => ({...styles, ...dot()}),
    placeholder: (styles) => ({...styles, ...dot('#ccc')}),
    singleValue: (styles, {data}) => ({...styles, ...dot(data.color)})
}


export default function ApplicationsCaspa({ newSchool, setNewSchool, loggedInUser, isEdit, handleCheck, handleInputInCategory }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean,
handleCheck: (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => void, handleInputInCategory: (e:ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => void,
}) {
    const [index, setIndex] = useState<number | null>(null);
    const [editedNote, setEditedNote] = useState<Note | null>(null);
    const [notePopup, setNotePopup] = useState(false);
    const [ color, setColor ] = useState('');
    const [ editedColor, setEditedColor ] = useState('');

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });

    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e: any) => {
        e.preventDefault();
        setNotePopup(!notePopup);
      };

    useEffect(() => {
        if (newSchool.school_application_submitted_on_caspa.input) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_date: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date : '',
                    school_caspa_application_deadline_type: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type : '',
                    school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes ? newSchool.school_application_submitted_on_caspa.school_caspa_application_notes : []
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_date: null,
                    school_caspa_application_deadline_type: null,
                    school_caspa_application_notes: []
                }
            })
        }
    }, [newSchool.school_application_submitted_on_caspa.input]);

    useEffect(() => {
        const obj = options.find(opt => opt.value === newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type);
        if (obj) setColor(obj.color);

        const editedObj = options.find(opt => opt.value === newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input);
        if (editedObj) setEditedColor(editedObj?.color)
    }, [newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_on_caspa.input === null) {
            if (newSchool.school_application_submitted_on_caspa.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_application_submitted_on_caspa.input) {
                setIsOpen(true)
            } else {
                setIsOpen(false);
            }
        }
}, [newSchool.edited_school_application_submitted_on_caspa, newSchool.school_application_submitted_on_caspa]);

    useEffect(() => {
        if (newSchool.edited_school_application_submitted_on_caspa.input !== null || newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input !== null || newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null 
        ) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_application_submitted_on_caspa])

    // const handleCheck = (e:ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
    //     if (!isEditedInput) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_application_submitted_on_caspa: {
    //                 ...newSchool.school_application_submitted_on_caspa,
    //                 input: e.target.checked,
    //             }
    //         })
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             edited_school_application_submitted_on_caspa: {
    //                 ...newSchool.edited_school_application_submitted_on_caspa,
    //                 input: e.target.checked,
    //             }
    //         })
    //     }
        
    // };

    // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewSchool({
    //         ...newSchool,
    //         school_application_submitted_on_caspa: {
    //             ...newSchool.school_application_submitted_on_caspa,
    //             school_caspa_application_deadline_date: e.target.value,
    //         }
    //     })
    // }

    const handleSelect = (e: any, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_deadline_type: e.value,
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                edited_school_application_submitted_on_caspa: {
                    ...newSchool.edited_school_application_submitted_on_caspa,
                    edited_school_caspa_application_deadline_type: {
                        ...newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date,
                        input: e.value,
                    }
                }
            })
        }
        
    };

    const addNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.concat(note),
            }
        })
    };

    const updateNote = (note: Note) => {
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.map((n,i) => {
                    if (i === index) {
                        return { ...note }
                    } else {
                        return { ...n }
                    }
                })
            }
        })
    };

    const deleteNote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_application_submitted_on_caspa: {
                ...newSchool.school_application_submitted_on_caspa,
                school_caspa_application_notes: newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.filter((n,i) => i !== index)
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
        {/* <div className={`${newSchool.school_application_submitted_directly_to_school.input && newSchool.edited_school_application_submitted_on_caspa.input === null && loggedInUser.permissions.canVerify ? 'hidden' : 'block'}`}> */}
            <div className={`mt-10 flex justify-start items-start gap-3 w-full`}>
            <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_application_submitted_on_caspa.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_application_submitted_on_caspa.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">Application Submitted On Caspa<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs  ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label> 
                <BooleanFields loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_on_caspa.input} isEditMode={newSchool.edited_school_application_submitted_on_caspa.isEditMode} originalInput={newSchool.school_application_submitted_on_caspa.input}
                name='school_application_submitted_on_caspa' handleCheck={handleCheck}
                />
                {isOpen && (
                    <>
                        <div className={`mt-8 mx-4 relative max-w-[900px] flex justify-start items-start gap-3`}>
                            <div className={`p-4 grow block rounded border-[#545454] border-2`}>
                                <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline</label> 
                                <InputFieldsGroup loggedInUser={loggedInUser} input={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.input} isEditMode={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_date.isEditMode} 
                                originalInput={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_date} handleInput={handleInputInCategory} name='school_caspa_application_deadline_date' category="school_application_submitted_on_caspa"
                                />
                            </div> 
                        </div>
                        <div className={`mt-12 mb-4 mx-4 relative max-w-[900px] flex justify-start items-start gap-3`}>
                            <div className={`p-4 grow block rounded border-[#545454] border-2`}>
                                <label className="absolute top-[-16px] text-xl font-medium bg-white">Application Submission Deadline Type</label> 
                                {loggedInUser.permissions.canVerify ? (
                                    <>
                                    {newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null ? (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        <Select styles={colorStyles} isDisabled options={options} className="w-1/3 focus:outline-none" value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? {value: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, label: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, color: editedColor, focus: ''} : null}/>
                                        <Select styles={colorStyles} isDisabled options={options} className={`w-1/3 focus:outline-none ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/>
                                    </div>
                                    ): (
                                        <Select styles={colorStyles} onChange={(e:any) => handleSelect(e, false)} options={options} className="w-1/3 focus:outline-none" value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/>
                                    )}
                                    </>
                                ): (
                                    <div className='flex flex-col justify-start items-start gap-3 grow'>
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== null || newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode) && <Select styles={colorStyles} onChange={(e:any) => handleSelect(e, true)} options={options} className="w-1/3 focus:outline-none" value={newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? {value: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, label: newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input, color: editedColor, focus: ''} : null}/>}
                                        {(newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input !== newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type) || !newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.isEditMode ? <Select styles={colorStyles} isDisabled options={options} className={`w-1/3 focus:outline-none ${newSchool.edited_school_application_submitted_on_caspa.edited_school_caspa_application_deadline_type.input ? 'line-through' : 'no-underline'}`} value={newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type ? {value: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, label: newSchool.school_application_submitted_on_caspa.school_caspa_application_deadline_type, color: color, focus: ''} : null}/> : null}
                                    </div>
                                )}
                            </div> 
                        </div>
                    </>
                )}
                {isOpen && (
                <div className={`mx-5 mb-5`}>
                <label className='font-medium inline-block mt-6 text-xl'>Notes:</label>
                <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] mt-2 px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes && (
                    <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_application_submitted_on_caspa.school_caspa_application_notes.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i);}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i)}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                )}
                </div>
                )}
            </div>
            {isEdit && <EditButtons loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_application_submitted_on_caspa.isEditMode} link={newSchool.edited_school_application_submitted_on_caspa.link} setLinkObj={setLinkObj} 
            toggleLinkPopup={toggleLinkPopup} name='school_application_submitted_on_caspa' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup} newSchool={newSchool} setNewSchool={setNewSchool} />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        {/* </div> */}
        </>
    )
}