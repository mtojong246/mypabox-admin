import { Note, School } from '../../../../types/schools.types';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, MouseEvent } from 'react';
import AddNote from '../Prereqs/AddNote';
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from './ExamFunctions';
import { UserObject } from '../../../../types/users.types';
import EditButtons from '../../Assets/EditButtons';
import BooleanFields from '../../Assets/BooleanFields';
import InputFields from '../../Assets/InputsFields';
import SelectInputsFields from '../../Assets/SelectInputsFields';
import AddNoteFields from '../../Assets/AddNoteFields';
import Screen from '../../../../components/Screen';
import Indicator from '../../../../components/Indicator';

const options = [
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function GRE({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ gpaRequiredOrRecommended, setGpaRequiredOrRecommended ] = useState(false);
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ editedSelection, setEditedSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    })

    const [ isGroup, setIsGroup ] = useState(false);
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ name, setName ] = useState('');
    const [ noteName, setNoteName ] = useState('');
    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isInsideOpen, setIsInsideOpen ] = useState(false);

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    useEffect(() => {
        if ((newSchool.school_gre.school_gre_required || newSchool.school_gre.school_gre_recommended) && !gpaRequiredOrRecommended) {
            setGpaRequiredOrRecommended(true);
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_caspa_gre_institution_code: newSchool.school_gre.school_caspa_gre_institution_code ? newSchool.school_gre.school_caspa_gre_institution_code : 0,
                    school_gre_institution_code: newSchool.school_gre.school_gre_institution_code ? newSchool.school_gre.school_gre_institution_code : 0,

                    school_minimum_time_frame_gre_must_be_completed: {
                        input: newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed && newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.input ? newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.input : '',
                        school_minimum_time_frame_gre_must_be_completed_notes: newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed && newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes ? newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes : [],
                    },
            
                    school_mcat_accepted_in_place_of_gre: {
                        input: newSchool.school_gre.school_mcat_accepted_in_place_of_gre && newSchool.school_gre.school_mcat_accepted_in_place_of_gre.input ? newSchool.school_gre.school_mcat_accepted_in_place_of_gre.input : false,
                        school_mcat_accepted_in_place_of_gre_notes: newSchool.school_gre.school_mcat_accepted_in_place_of_gre && newSchool.school_gre.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes ? newSchool.school_gre.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes : [],
                    },
            
                    school_gre_exempt_with_masters_degree: {
                        input: newSchool.school_gre.school_gre_exempt_with_masters_degree && newSchool.school_gre.school_gre_exempt_with_masters_degree.input ? newSchool.school_gre.school_gre_exempt_with_masters_degree.input : false,
                        school_gre_exempt_with_masters_degree_notes: newSchool.school_gre.school_gre_exempt_with_masters_degree && newSchool.school_gre.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes ? newSchool.school_gre.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes : [],
                    },
            
                    school_gre_exempt_with_phd_degree: {
                        input: newSchool.school_gre.school_gre_exempt_with_phd_degree && newSchool.school_gre.school_gre_exempt_with_phd_degree.input ? newSchool.school_gre.school_gre_exempt_with_phd_degree.input : false,
                        school_gre_exempt_with_phd_degree_notes: newSchool.school_gre.school_gre_exempt_with_phd_degree && newSchool.school_gre.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes ? newSchool.school_gre.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes : [],
                    },
                    school_minimum_gre_scores_required: newSchool.school_gre.school_minimum_gre_scores_required ? newSchool.school_gre.school_minimum_gre_scores_required : false,

                    school_average_gre_verbal_score_accepted_previous_year: newSchool.school_gre.school_average_gre_verbal_score_accepted_previous_year ? newSchool.school_gre.school_average_gre_verbal_score_accepted_previous_year : 0,
                    school_average_gre_quantitative_score_accepted_previous_year: newSchool.school_gre.school_average_gre_quantitative_score_accepted_previous_year ? newSchool.school_gre.school_average_gre_quantitative_score_accepted_previous_year : 0,
                    school_average_gre_analytical_writing_score_accepted_previous_year: newSchool.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year ? newSchool.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year : 0,
                    school_average_gre_combined_score_accepted_previous_year: newSchool.school_gre.school_average_gre_combined_score_accepted_previous_year ? newSchool.school_gre.school_average_gre_combined_score_accepted_previous_year : 0,
            
                    school_average_gre_verbal_percentile_accepted_previous_year: newSchool.school_gre.school_average_gre_verbal_percentile_accepted_previous_year ? newSchool.school_gre.school_average_gre_verbal_percentile_accepted_previous_year : 0,
                    school_average_gre_quantitative_percentile_accepted_previous_year: newSchool.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year ? newSchool.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year : 0,
                    school_average_gre_analytical_writing_percentile_accepted_previous_year: newSchool.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year ? newSchool.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year : 0,
                    school_average_gre_combined_percentile_accepted_previous_year: newSchool.school_gre.school_average_gre_combined_percentile_accepted_previous_year ? newSchool.school_gre.school_average_gre_combined_percentile_accepted_previous_year : 0,
                }
            });

            if (newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed) {
                const array = newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.input.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else if ((newSchool.school_gre.school_gre_required || newSchool.school_gre.school_gre_recommended) && gpaRequiredOrRecommended) {
            return 
        } else if (!newSchool.school_gre.school_gre_required && !newSchool.school_gre.school_gre_recommended) {
            setGpaRequiredOrRecommended(false);
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_caspa_gre_institution_code: null,
                    school_gre_institution_code: null,
                    school_minimum_time_frame_gre_must_be_completed: null,
                    school_mcat_accepted_in_place_of_gre: null,
                    school_gre_exempt_with_masters_degree: null,
                    school_gre_exempt_with_phd_degree: null,
                    school_minimum_gre_scores_required: null,

                    school_average_gre_verbal_score_accepted_previous_year: null,
                    school_average_gre_quantitative_score_accepted_previous_year: null,
                    school_average_gre_analytical_writing_score_accepted_previous_year: null,
                    school_average_gre_combined_score_accepted_previous_year: null,
            
                    school_average_gre_verbal_percentile_accepted_previous_year: null,
                    school_average_gre_quantitative_percentile_accepted_previous_year: null,
                    school_average_gre_analytical_writing_percentile_accepted_previous_year: null,
                    school_average_gre_combined_percentile_accepted_previous_year: null,


                }
            })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_gre.school_gre_required, newSchool.school_gre.school_gre_recommended]);


    useEffect(() => {
        if (newSchool.school_gre.school_minimum_gre_scores_required) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_gre_minimum_verbal_score: newSchool.school_gre.school_gre_minimum_verbal_score ? newSchool.school_gre.school_gre_minimum_verbal_score : 0,
                    school_gre_minimum_quantitative_score: newSchool.school_gre.school_gre_minimum_quantitative_score ? newSchool.school_gre.school_gre_minimum_quantitative_score : 0,
                    school_gre_minimum_analytical_writing_score: newSchool.school_gre.school_gre_minimum_analytical_writing_score ? newSchool.school_gre.school_gre_minimum_analytical_writing_score : 0,
                    school_gre_minimum_combined_score: newSchool.school_gre.school_gre_minimum_combined_score ? newSchool.school_gre.school_gre_minimum_combined_score : 0,
                    school_minimum_gre_score_notes: newSchool.school_gre.school_minimum_gre_score_notes ? newSchool.school_gre.school_minimum_gre_score_notes : [],

                    school_gre_minimum_verbal_percentile: newSchool.school_gre.school_gre_minimum_verbal_percentile ? newSchool.school_gre.school_gre_minimum_verbal_percentile : 0,
                    school_gre_minimum_quantitative_percentile: newSchool.school_gre.school_gre_minimum_quantitative_percentile ? newSchool.school_gre.school_gre_minimum_quantitative_percentile : 0,
                    school_gre_minimum_analytical_writing_percentile: newSchool.school_gre.school_gre_minimum_analytical_writing_percentile ? newSchool.school_gre.school_gre_minimum_analytical_writing_percentile : 0,
                    school_gre_minimum_combined_percentile: newSchool.school_gre.school_gre_minimum_combined_percentile ? newSchool.school_gre.school_gre_minimum_combined_percentile : 0,
                    school_minimum_gre_percentile_notes: newSchool.school_gre.school_minimum_gre_percentile_notes ? newSchool.school_gre.school_minimum_gre_percentile_notes : [],

                    
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_gre_minimum_verbal_score: null,
                    school_gre_minimum_quantitative_score: null,
                    school_gre_minimum_analytical_writing_score: null,
                    school_gre_minimum_combined_score: null,
                    school_minimum_gre_score_notes: null,

                    school_gre_minimum_verbal_percentile: null,
                    school_gre_minimum_quantitative_percentile: null,
                    school_gre_minimum_analytical_writing_percentile: null,
                    school_gre_minimum_combined_percentile: null,
                    school_minimum_gre_percentile_notes: null,

                    
                }
            })
        }
    }, [newSchool.school_gre.school_minimum_gre_scores_required])

    useEffect(() => {
        if (newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    school_minimum_time_frame_gre_must_be_completed: {
                        ...newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed,
                        input: selection.number + ' ' + selection.duration,
                    }
                }
            })
        } 
    }, [selection]);

    useEffect(() => {
        if (newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed.input !== null) {
            const array = newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed.input.split(' ');
            setEditedSelection({
                number: array[0],
                duration: array[1]
            })
        } else {
            setEditedSelection({
                number: null,
                duration: null,
            })
        }
    }, [newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed])
    

    useEffect(() => {
        if (newSchool.edited_school_gre.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_gre.input]);

    useEffect(() => {
        if (newSchool.edited_school_gre.edited_school_gre_required.input === null && newSchool.edited_school_gre.edited_school_gre_recommended.input === null) {
            if (gpaRequiredOrRecommended) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            if (newSchool.edited_school_gre.edited_school_gre_required.input || newSchool.edited_school_gre.edited_school_gre_recommended.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        if (newSchool.edited_school_gre.edited_school_minimum_gre_scores_required.input === null) {
            if (newSchool.school_gre.school_minimum_gre_scores_required !== null && newSchool.school_gre.school_minimum_gre_scores_required === true) {
                setIsInsideOpen(true)
            } else {
                setIsInsideOpen(false)
            }
        } else {
            if (newSchool.edited_school_gre.edited_school_minimum_gre_scores_required.input) {
                setIsInsideOpen(true);
            } else {
                setIsInsideOpen(false);
            }
        }
    }, [newSchool.edited_school_gre.edited_school_gre_required, newSchool.edited_school_gre.edited_school_gre_recommended, gpaRequiredOrRecommended,newSchool.edited_school_gre.edited_school_minimum_gre_scores_required, newSchool.school_gre.school_minimum_gre_scores_required ])

    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [e.target.name]: e.target.checked,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_gre[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...newSchool.edited_school_gre,
                    [name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        }
    };

    const handleCheckGroup = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) =>  {
        if (!isEditedInput) {
            const field = newSchool.school_gre[e.target.name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                school_gre: {
                    ...newSchool.school_gre,
                    [e.target.name]: {
                        ...field,
                        input: e.target.checked,
                    }
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            const field = newSchool.edited_school_gre[name as keyof object] as object;
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...newSchool.edited_school_gre,
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
                school_gre: {
                    ...newSchool.school_gre,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`;
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...newSchool.edited_school_gre,
                    [name]: {
                        ...newSchool.edited_school_gre[name as keyof object] as object,
                        input: e.target.value,
                    }
                }
            })
        }
        
    }

    const addNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (!isGroup) {
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
                        [name]: (newSchool.school_gre[name as keyof object] as Note[]).concat(note)
                    }
                })
            } else {
                const field = newSchool.school_gre[name as keyof object] as object;
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
                        [name]: {
                            ...field,
                            [noteName]: (field[noteName as keyof object] as Note[]).concat(note)
                        }
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (!isGroup) {
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
                        [`edited_${name}`]: (newSchool.edited_school_gre[`edited_${name}` as keyof object] as Note[]) ? (newSchool.edited_school_gre[`edited_${name}` as keyof object] as Note[]).concat(note) : [note]
                    }
                })
            } else {
                const field = newSchool.edited_school_gre[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes ? field.notes.concat(note) : [note]
                        }
                    }
                })
            }
        }
        
    }


    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (!isGroup) {
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
                        [name]: (newSchool.school_gre[name as keyof object] as Note[]).map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            } else {
                const field = newSchool.school_gre[name as keyof object] as object;
                console.log(noteName)
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
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
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (!isGroup) {
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
                        [`edited_${name}`]: (newSchool.edited_school_gre[`edited_${name}` as keyof object] as Note[]).map((n,i) => {
                            if (i === index) {
                                return { ...note }
                            } else {
                                return { ...n }
                            }
                        })
                    }
                })
            } else {
                const field = newSchool.edited_school_gre[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
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
        
    }

    const deleteNote = (e:any, index: number, name?: string, noteName?: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            if (name && !noteName) {
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
                        [name]: (newSchool.school_gre[name as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                })
            } else if (name && noteName) {
                const field = newSchool.school_gre[name as keyof object] as object;
                setNewSchool({
                    ...newSchool,
                    school_gre: {
                        ...newSchool.school_gre,
                        [name]: {
                            ...field,
                            [noteName]: (field[noteName as keyof object] as Note[]).filter((n,i) => i !== index)
                        }
                    }
                })
            }
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            if (name && !noteName) {
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
                        [`edited_${name}`]: (newSchool.edited_school_gre[`edited_${name}` as keyof object] as Note[]).filter((n,i) => i !== index)
                    }
                })
            } else if (name && noteName) {
                const field = newSchool.edited_school_gre[`edited_${name}` as keyof object] as any;
                setNewSchool({
                    ...newSchool,
                    edited_school_gre: {
                        ...newSchool.edited_school_gre,
                        [`edited_${name}`]: {
                            ...field,
                            notes: field.notes.filter((n:any,i:any) => i !== index)
                        }
                    }
                })
            }
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

    const handleSelectNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({...selection, number: e.target.value.trim()})
        }  else {
            setEditedSelection({...editedSelection, number: e.target.value.trim()})
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...newSchool.edited_school_gre,
                    edited_school_minimum_time_frame_gre_must_be_completed: {
                        ...newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed,
                        input: (e.target.value.trim()) + ' ' + editedSelection.duration,
                    }
                }
            })
        }
    }

    const handleSelectDuration = (e:any, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({...selection, duration: e.value})
        } else {
            setEditedSelection({...editedSelection, duration: e.value});
            setNewSchool({
                ...newSchool,
                edited_school_gre: {
                    ...newSchool.edited_school_gre,
                    edited_school_minimum_time_frame_gre_must_be_completed: {
                        ...newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed,
                        input: editedSelection.number + ' ' + e.value,
                    }
                }
            })
        }
    }



    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
        <div className={`grow relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#B4B4B4]`}>
        <Screen isEdit={isEdit} editedInput={newSchool.edited_school_gre.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} />
        <Indicator label="GRE" editedInput={newSchool.edited_school_gre.input} />
            <div className={`mt-7 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white block">GRE Required</label>   
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_required.input} originalInput={newSchool.school_gre.school_gre_required}
                name='school_gre_required' handleCheck={handleCheck}
                />
        
            </div>

            <div className={`mt-12 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white block">GRE Recommended</label>   
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_recommended.input} originalInput={newSchool.school_gre.school_gre_recommended}
                name='school_gre_recommended' handleCheck={handleCheck}
                />
               
            </div>

            {isOpen && (
            <>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white block">CASPA GRE Institution Code</label>   
                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_caspa_gre_institution_code.input} originalInput={newSchool.school_gre.school_caspa_gre_institution_code}
                name='school_caspa_gre_institution_code' handleInput={handleInput}
                />
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="absolute top-[-16px] text-xl font-medium bg-white block">GRE Insitution Code</label> 
                <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_institution_code.input} originalInput={newSchool.school_gre.school_gre_institution_code}
                name='school_gre_institution_code' handleInput={handleInput}
                />  
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Minimum Time Frame GRE Must Be Completed</label>
                <div className='flex justify-start items-start gap-3 '>
                    <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed.input} originalInput={newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed && newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.input}
                    name='school_minimum_time_frame_gre_must_be_completed' number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} handleInput={handleSelectNumber}
                    handleSelect={handleSelectDuration} options={options}
                    />
                    
                    <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_minimum_time_frame_gre_must_be_completed'); setNoteName('school_minimum_time_frame_gre_must_be_completed_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
                
                <AddNoteFields setIsGroup={setIsGroup} isGroup={true} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_minimum_time_frame_gre_must_be_completed.notes} originalNotes={newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed ? newSchool.school_gre.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes : null} name='school_minimum_time_frame_gre_must_be_completed' noteName='school_minimum_time_frame_gre_must_be_completed_notes' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setNoteName={setNoteName} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>

            
            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">MCAT Accepted In Place of GRE</label>
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_mcat_accepted_in_place_of_gre.input} originalInput={newSchool.school_gre.school_mcat_accepted_in_place_of_gre && newSchool.school_gre.school_mcat_accepted_in_place_of_gre.input}
                    name='school_mcat_accepted_in_place_of_gre' handleCheck={handleCheckGroup}
                    />
                   
                    <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_mcat_accepted_in_place_of_gre'); setNoteName('school_mcat_accepted_in_place_of_gre_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
               
                <AddNoteFields setIsGroup={setIsGroup} isGroup={true} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_mcat_accepted_in_place_of_gre.notes} originalNotes={newSchool.school_gre.school_mcat_accepted_in_place_of_gre ? newSchool.school_gre.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes : null} name='school_mcat_accepted_in_place_of_gre' noteName='school_mcat_accepted_in_place_of_gre_notes' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setNoteName={setNoteName} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
            

            
            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">GRE Exempt with Masters Degree</label>
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_exempt_with_masters_degree.input} originalInput={newSchool.school_gre.school_gre_exempt_with_masters_degree && newSchool.school_gre.school_gre_exempt_with_masters_degree.input} 
                    name='school_gre_exempt_with_masters_degree' handleCheck={handleCheckGroup}
                    />
                   
                    <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_gre_exempt_with_masters_degree'); setNoteName('school_gre_exempt_with_masters_degree_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
               
                 <AddNoteFields setIsGroup={setIsGroup} isGroup={true} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_gre_exempt_with_masters_degree.notes} originalNotes={newSchool.school_gre.school_gre_exempt_with_masters_degree ? newSchool.school_gre.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes : null} name='school_gre_exempt_with_masters_degree' noteName='school_gre_exempt_with_masters_degree_notes' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setNoteName={setNoteName} setName={setName} setEditedNote={setEditedNote}
                    />
            </div>
           

            
            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">GRE Exempt with Doctoral Degree</label>
                <div className='flex justify-center items-center gap-3'>
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_exempt_with_phd_degree.input} originalInput={newSchool.school_gre.school_gre_exempt_with_phd_degree && newSchool.school_gre.school_gre_exempt_with_phd_degree.input}
                    name='school_gre_exempt_with_phd_degree' handleCheck={handleCheckGroup}
                    />
                    
                    <button onClick={(e) => {toggleNotePopup(e); setIsGroup(true); setName('school_gre_exempt_with_phd_degree'); setNoteName('school_gre_exempt_with_phd_degree_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                </div>
               
                <AddNoteFields setIsGroup={setIsGroup} isGroup={true} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_gre_exempt_with_phd_degree.notes} originalNotes={newSchool.school_gre.school_gre_exempt_with_phd_degree ? newSchool.school_gre.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes : null} name='school_gre_exempt_with_phd_degreex' noteName='school_gre_exempt_with_phd_degree_notes' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setNoteName={setNoteName} setName={setName} setEditedNote={setEditedNote}
                    />
               
            </div>
            

            <div className={`mt-12 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_gre.school_minimum_gre_scores_required ? 'border-[#4573D2]' : 'border-orange-600'}`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Minimum GRE Scores Required</label>
                <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_minimum_gre_scores_required.input} originalInput={newSchool.school_gre.school_minimum_gre_scores_required} 
                name='school_minimum_gre_scores_required' handleCheck={handleCheck}
                />
               
                {isInsideOpen && (
                <>
                <div className={`mt-8 mx-5 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium text-orange-600 bg-white">Minimum GRE Scores</label> 
                    <div className='mt-4'>
                        <label className="text-xl font-medium bg-white block">Verbal Score</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_verbal_score.input} originalInput={newSchool.school_gre.school_gre_minimum_verbal_score}
                        name='school_gre_minimum_verbal_score' handleInput={handleInput}
                        />
                        </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Quantitative Score</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_quantitative_score.input} originalInput={newSchool.school_gre.school_gre_minimum_quantitative_score}
                        name='school_gre_minimum_quantitative_score' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Analytical Writing Score</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_analytical_writing_score.input} originalInput={newSchool.school_gre.school_gre_minimum_analytical_writing_score}
                        name='school_gre_minimum_analytical_writing_score' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Combined Score</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_combined_score.input} originalInput={newSchool.school_gre.school_gre_minimum_combined_score}
                        name='school_gre_minimum_combined_score' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8 mb-5'>
                        <label className="text-xl font-medium bg-white block">Minimum GRE Score Notes</label>   
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_gre_score_notes');}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                       
                        <AddNoteFields setIsGroup={setIsGroup} setNoteName={setNoteName} isGroup={false} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_minimum_gre_score_notes} originalNotes={newSchool.school_gre.school_minimum_gre_score_notes ? newSchool.school_gre.school_minimum_gre_score_notes : null} name='school_minimum_gre_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                </div>
                <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] border-2 py-5 px-8 block rounded border-[#545454]`}>
                    <label className="absolute top-[-16px] text-xl font-medium text-orange-600 bg-white">Minimum GRE Percentiles</label> 
                    <div className='mt-4'>
                        <label className="text-xl font-medium bg-white block">Verbal Percentile</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_verbal_percentile.input} originalInput={newSchool.school_gre.school_gre_minimum_verbal_percentile}
                        name='school_gre_minimum_verbal_percentile' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Quantitative Percentile</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_quantitative_percentile.input} originalInput={newSchool.school_gre.school_gre_minimum_quantitative_percentile}
                        name='school_gre_minimum_quantitative_percentile' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Analytical Writing Percentile</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_analytical_writing_percentile.input} originalInput={newSchool.school_gre.school_gre_minimum_analytical_writing_percentile}
                        name='school_gre_minimum_analytical_writing_percentile' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8'>
                        <label className="text-xl font-medium bg-white block">Combined Percentile</label>   
                        <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_gre_minimum_combined_percentile.input} originalInput={newSchool.school_gre.school_gre_minimum_combined_percentile}
                        name='school_gre_minimum_combined_percentile' handleInput={handleInput}
                        />
                    </div>
                    <div className='mt-8 mb-5'>
                        <label className="text-xl font-medium bg-white block">Minimum GRE Percentile Notes</label>   
                        <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_minimum_gre_percentile_notes');}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                            Add Note
                        </button>
                        
                        <AddNoteFields setIsGroup={setIsGroup} setNoteName={setNoteName} isGroup={false} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_minimum_gre_percentile_notes} originalNotes={newSchool.school_gre.school_minimum_gre_percentile_notes ? newSchool.school_gre.school_minimum_gre_percentile_notes : null} name='school_minimum_gre_percentile_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                </div>

                    
                </>
                )}
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 py-5 px-8 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Average GRE Scores Accepted Previous Year</label>
                <div className='mt-4'>
                    <label className="text-xl font-medium bg-white block">Verbal Score</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_verbal_score_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_verbal_score_accepted_previous_year}
                        name='school_average_gre_verbal_score_accepted_previous_year' handleInput={handleInput}
                        />
                </div>
                <div className='mt-8'>
                    <label className="text-xl font-medium bg-white block">Quantitative Score</label>  
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_quantitative_score_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_quantitative_score_accepted_previous_year}
                        name='school_average_gre_quantitative_score_accepted_previous_year' handleInput={handleInput}
                        /> 
                </div>
                <div className='mt-8'>
                    <label className="text-xl font-medium bg-white block">Analytical Writing Score</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_analytical_writing_score_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year}
                        name='school_average_gre_analytical_writing_score_accepted_previous_year' handleInput={handleInput}
                        /> 
                </div>
                <div className='mt-8 mb-5'>
                    <label className="text-xl font-medium bg-white block">Combined Score</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_combined_score_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_combined_score_accepted_previous_year}
                        name='school_average_gre_combined_score_accepted_previous_year' handleInput={handleInput}
                        /> 
                </div>
            </div>

            <div className={`mt-12 relative max-w-[900px] border-2 py-5 px-8 block rounded border-orange-600`}>
                <label className="font-medium absolute top-[-16px] text-xl bg-white">Average GRE Percentiles Accepted Previous Year</label>
                <div className='mt-4'>
                    <label className="text-xl font-medium bg-white block">Verbal Percentile</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_verbal_percentile_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_verbal_percentile_accepted_previous_year}
                        name='school_average_gre_verbal_percentile_accepted_previous_year' handleInput={handleInput}
                        /> 
                </div>
                <div className='mt-8'>
                    <label className="text-xl font-medium bg-white block">Quantitative Percentile</label> 
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_quantitative_percentile_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year}
                        name='school_average_gre_quantitative_percentile_accepted_previous_year' handleInput={handleInput}
                        />   
                </div>
                <div className='mt-8'>
                    <label className="text-xl font-medium bg-white block">Analytical Writing Percentile</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_analytical_writing_percentile_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year}
                        name='school_average_gre_analytical_writing_percentile_accepted_previous_year' handleInput={handleInput}
                        />  
                </div>
                <div className='mt-8 mb-5'>
                    <label className="text-xl font-medium bg-white block">Combined Percentile</label>   
                    <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={newSchool.edited_school_gre.edited_school_average_gre_combined_percentile_accepted_previous_year.input} originalInput={newSchool.school_gre.school_average_gre_combined_percentile_accepted_previous_year}
                        name='school_average_gre_combined_percentile_accepted_previous_year' handleInput={handleInput}
                        />  
                </div>
            </div>
            </>
            )}

            

            <div className={`w-full mt-8 mb-5`}>
                <label className='font-medium text-xl'>Notes:</label>
                <button onClick={(e) => {toggleNotePopup(e); setIsGroup(false); setName('school_gre_general_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded mt-2 h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                    Add Note
                </button>
                
                <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} notes={newSchool.edited_school_gre.edited_school_gre_general_notes} originalNotes={newSchool.school_gre.school_gre_general_notes ? newSchool.school_gre.school_gre_general_notes : null} name='school_gre_general_notes' toggleNotePopup={toggleNotePopup}
                deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                />
            </div>

            
        </div>
        {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_gre.isEditMode} input={hasInputs} link={newSchool.edited_school_gre.link} toggleLinkPopup={toggleLinkPopup} setLinkObj={setLinkObj}
        name='school_gre' enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} revertEdit={revertEditGroup} undoEdit={undoEditGroup} newSchool={newSchool} setNewSchool={setNewSchool}
        />}
        </div>
        {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
        {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}