import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { School, Note } from "../../../../types/schools.types";
import AddNote from "../Prereqs/AddNote";
import { UserObject } from "../../../../types/users.types";
import Screen from "../../../../components/Screen";
import Indicator from "../../../../components/Indicator";

import LinkPopup from "../../LinkPopup";
import BooleanFields from "../../Assets/BooleanFields";
import EditButtons from "../../Assets/EditButtons";
import InputFields from "../../Assets/InputsFields";
import AddNoteFields from "../../Assets/AddNoteFields";

export default function PACAT({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean, }) {
    const [ pacatRequiredOrRecommended, setPacatRequiredOrRecommended ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);
    const [ editedRecommendedOrRequired, setEditedRecommendedOrRequired ] = useState(false);
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });
    const [ open, setOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }


    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    

    useEffect(() => {
        if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && !pacatRequiredOrRecommended) {
            setPacatRequiredOrRecommended(true);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: newSchool.school_pacat.school_pacat_exam_school_code ? newSchool.school_pacat.school_pacat_exam_school_code : 0,
                    school_pacat_exam_scaled_minimum_score_required: newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required : 0,
                    school_pacat_exam_group_scaled_minimum_score_required: newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required ? newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required : 0,
                }
            })
        } else if ((newSchool.school_pacat.school_pacat_required || newSchool.school_pacat.school_pacat_recommended) && pacatRequiredOrRecommended) {
            return
        } else if (!newSchool.school_pacat.school_pacat_required && !newSchool.school_pacat.school_pacat_recommended) {
            setPacatRequiredOrRecommended(false);
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_school_code: null,
                    school_pacat_exam_scaled_minimum_score_required: null,
                    school_pacat_exam_group_scaled_minimum_score_required: null,
                }
            })
        }
    }, [newSchool.school_pacat.school_pacat_required, newSchool.school_pacat.school_pacat_recommended]);

    useEffect(() => {
        if (newSchool.edited_school_pacat.edited_school_pacat_required.input === null && newSchool.edited_school_pacat.edited_school_pacat_recommended.input === null) {
            if (pacatRequiredOrRecommended) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        } else {
            if (newSchool.edited_school_pacat.edited_school_pacat_required.input || newSchool.edited_school_pacat.edited_school_pacat_recommended.input) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }
    }, [newSchool.edited_school_pacat.edited_school_pacat_required, newSchool.edited_school_pacat.edited_school_pacat_recommended, pacatRequiredOrRecommended])

    useEffect(() => {
        if (newSchool.edited_school_pacat.input !== null) {
            setHasInputs(true);
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_pacat.input, editedRecommendedOrRequired]);


    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof object;
            const field = newSchool.edited_school_pacat[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean};
            setNewSchool({
                ...newSchool,
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    [name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        }
        
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}` as keyof object;
            const field = newSchool.edited_school_pacat[name] as {input: number | null, prev: number | null, isEditMode: boolean};
            setNewSchool({
                ...newSchool,
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    [name]: {
                        ...field,
                        input: e.target.value,
                    }
                }
            })
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.concat(note)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    notes: newSchool.edited_school_pacat.notes!.concat(note)
                }
            })
        }
        
    }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    notes: newSchool.edited_school_pacat.notes!.map((n,i) => {
                        if (i === index) {
                            return { ...note }
                        } else {
                            return { ...n }
                        }
                    })
                }
            })
        }
        
    }

    const deleteNote = (e:any, index: number) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_notes: newSchool.school_pacat.school_pacat_exam_notes.filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    notes: newSchool.edited_school_pacat.notes!.filter((n,i) => i !== index)
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

    const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_pacat: {
                ...newSchool.edited_school_pacat,
                notes: newSchool.edited_school_pacat.notes === null ? newSchool.school_pacat.school_pacat_exam_notes : newSchool.edited_school_pacat.notes,
                input: (newSchool.edited_school_pacat.edited_school_pacat_required.input === null && newSchool.edited_school_pacat.edited_school_pacat_recommended.input === null && 
                    newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === null && newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === null && 
                    newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === null) ? null : true,
                edited_school_pacat_required: {
                    ...newSchool.edited_school_pacat.edited_school_pacat_required,
                    input: newSchool.edited_school_pacat.edited_school_pacat_required.input === null ? newSchool.school_pacat.school_pacat_required : newSchool.edited_school_pacat.edited_school_pacat_required.input,
                    isEditMode: true,
                },
                edited_school_pacat_recommended: {
                    ...newSchool.edited_school_pacat.edited_school_pacat_recommended,
                    input: newSchool.edited_school_pacat.edited_school_pacat_recommended.input === null ? newSchool.school_pacat.school_pacat_recommended : newSchool.edited_school_pacat.edited_school_pacat_recommended.input,
                    isEditMode: true,
                },
                edited_school_pacat_exam_school_code: {
                    ...newSchool.edited_school_pacat.edited_school_pacat_exam_school_code,
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === null ? newSchool.school_pacat.school_pacat_exam_school_code  : newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input,
                    isEditMode: true,
                },
                edited_school_pacat_exam_scaled_minimum_score_required: {
                    ...newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required,
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === null ? newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required : newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input,
                    isEditMode: true,
                },
                edited_school_pacat_exam_group_scaled_minimum_score_required: {
                    ...newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required,
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === null ? newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required : newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input,
                    isEditMode: true,
                }
            }
        })
    };

    const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
        e.preventDefault();
        if (!original) {
            const originalField = newSchool.school_pacat;
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_notes: newSchool.edited_school_pacat.notes ? newSchool.edited_school_pacat.notes : newSchool.school_pacat.school_pacat_exam_notes,
                },
                edited_school_pacat: {
                    ...newSchool.edited_school_pacat,
                    input: (newSchool.edited_school_pacat.edited_school_pacat_required.input === null && newSchool.edited_school_pacat.edited_school_pacat_recommended.input === null && 
                        newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === null && newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === null && 
                        newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === null) ? null : true,
                    edited_school_pacat_required: {
                        input: newSchool.edited_school_pacat.edited_school_pacat_required.input === originalField.school_pacat_required ? null : newSchool.edited_school_pacat.edited_school_pacat_required.input,
                        prev: newSchool.edited_school_pacat.edited_school_pacat_required.input === originalField.school_pacat_required ? null : newSchool.edited_school_pacat.edited_school_pacat_required.input,
                        isEditMode: false,
                    },
                    edited_school_pacat_recommended: {
                        input: newSchool.edited_school_pacat.edited_school_pacat_recommended.input === originalField.school_pacat_recommended ? null : newSchool.edited_school_pacat.edited_school_pacat_recommended.input,
                        prev: newSchool.edited_school_pacat.edited_school_pacat_recommended.input === originalField.school_pacat_recommended ? null : newSchool.edited_school_pacat.edited_school_pacat_recommended.input,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_school_code: {
                        input: newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === originalField.school_pacat_exam_school_code ? null :  newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input,
                        prev: newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === originalField.school_pacat_exam_school_code ? null :  newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_scaled_minimum_score_required: {
                        input: newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === originalField.school_pacat_exam_scaled_minimum_score_required ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input,
                        prev: newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === originalField.school_pacat_exam_scaled_minimum_score_required ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_group_scaled_minimum_score_required: {
                        input: newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === originalField.school_pacat_exam_group_scaled_minimum_score_required ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input,
                        prev: newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === originalField.school_pacat_exam_group_scaled_minimum_score_required ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input,
                        isEditMode: false,
                    }
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_pacat: {
                    ...newSchool.school_pacat,
                    school_pacat_exam_notes: newSchool.edited_school_pacat.notes ? newSchool.edited_school_pacat.notes : newSchool.school_pacat.school_pacat_exam_notes,
                    school_pacat_required: newSchool.edited_school_pacat.edited_school_pacat_required.input !== null ? newSchool.edited_school_pacat.edited_school_pacat_required.input : newSchool.school_pacat.school_pacat_required,
                    school_pacat_recommended: newSchool.edited_school_pacat.edited_school_pacat_recommended.input !== null ? newSchool.edited_school_pacat.edited_school_pacat_recommended.input : newSchool.school_pacat.school_pacat_recommended,
                    school_pacat_exam_school_code: newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input !== null ? newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input : newSchool.school_pacat.school_pacat_exam_school_code,
                    school_pacat_exam_scaled_minimum_score_required: newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input !== null ? newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input : newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required,
                    school_pacat_exam_group_scaled_minimum_score_required: newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input !== null ? newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input : newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required,
                },
                edited_school_pacat: {
                    link: '',
                    input: null,
                    notes: null,
                    edited_school_pacat_required: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_pacat_recommended: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_school_code: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_scaled_minimum_score_required: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_pacat_exam_group_scaled_minimum_score_required: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        }
    };

    const undoEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_pacat: {
                ...newSchool.edited_school_pacat,
                input: (newSchool.edited_school_pacat.edited_school_pacat_required.input === null && newSchool.edited_school_pacat.edited_school_pacat_recommended.input === null && 
                    newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === null && newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === null && 
                    newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === null) ? null : true,
                edited_school_pacat_required: {
                    input: newSchool.edited_school_pacat.edited_school_pacat_required.input === newSchool.school_pacat.school_pacat_required ? null : newSchool.edited_school_pacat.edited_school_pacat_required.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_recommended: {
                    input: newSchool.edited_school_pacat.edited_school_pacat_recommended.input === newSchool.school_pacat.school_pacat_recommended ? null : newSchool.edited_school_pacat.edited_school_pacat_recommended.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_school_code: {
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input === newSchool.school_pacat.school_pacat_exam_school_code ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_scaled_minimum_score_required: {
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input === newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required ? null : newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_group_scaled_minimum_score_required: {
                    input: newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input === newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required? null : newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    };

    const revertEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            edited_school_pacat: {
                link: '',
                input: null,
                notes: null,
                edited_school_pacat_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_school_code: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_group_scaled_minimum_score_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_pacat_exam_scaled_minimum_score_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    };



    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_pacat.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_required.isEditMode} />
            <Indicator label="PACAT" editedInput={newSchool.edited_school_pacat.input} />
                <div className={`mt-6 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Required</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_pacat.edited_school_pacat_required.input} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_required.isEditMode}
                    originalInput={newSchool.school_pacat.school_pacat_required} name='school_pacat_required' handleCheck={handleCheck}
                    />
                </div>

                <div className={`mt-12 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Recommended</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} input={newSchool.edited_school_pacat.edited_school_pacat_recommended.input} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_recommended.isEditMode}
                    originalInput={newSchool.school_pacat.school_pacat_recommended} name='school_pacat_recommended' handleCheck={handleCheck}
                    />

                </div>
                {open && (
                <>
                    <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam School Code</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.input} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_exam_school_code.isEditMode}
                        originalInput={newSchool.school_pacat.school_pacat_exam_school_code} name='school_pacat_exam_school_code' handleInput={handleInput}/>
                        {/* <input onChange={handleInput} name='school_pacat_exam_school_code' value={newSchool.school_pacat.school_pacat_exam_school_code ? newSchool.school_pacat.school_pacat_exam_school_code : ''} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />            */}
                    </div>

                    <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam Scaled Minimum Score Required</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.input} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_exam_scaled_minimum_score_required.isEditMode}
                        originalInput={newSchool.school_pacat.school_pacat_exam_scaled_minimum_score_required} name='school_pacat_exam_scaled_minimum_score_required' handleInput={handleInput}/>
                    </div>

                    <div className={`mt-14 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PA-CAT Exam Group Scaled Minimum Score Required</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} input={newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.input} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_exam_group_scaled_minimum_score_required.isEditMode}
                        originalInput={newSchool.school_pacat.school_pacat_exam_group_scaled_minimum_score_required} name='school_pacat_exam_group_scaled_minimum_score_required' handleInput={handleInput}/>
                    </div>
                </>
                )}

                <div className={`w-full mt-8 mb-5`}>
                    <label className='font-medium text-xl'>Notes:</label>
                    <button onClick={toggleNotePopup} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                   
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_required.isEditMode} notes={newSchool.edited_school_pacat.notes} originalNotes={newSchool.school_pacat.school_pacat_exam_notes} name='school_pacat' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setEditedNote={setEditedNote}
                    />
                </div>
                
            </div>
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} input={hasInputs} isEditMode={newSchool.edited_school_pacat.edited_school_pacat_required.isEditMode} name="school_pacat" link={newSchool.edited_school_pacat.link} toggleLinkPopup={toggleLinkPopup}
            setLinkObj={setLinkObj} enableEditMode={enableEditMode} confirmEdit={confirmEdit} revertEdit={revertEdit} undoEdit={undoEdit} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}