import { School, Note } from '../../../../types/schools.types'
import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState, MouseEvent } from 'react'
import AddNote from '../Prereqs/AddNote'
import { UserObject } from '../../../../types/users.types';
import Screen from '../../../../components/Screen';
import Indicator from '../../../../components/Indicator';
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from './ExamFunctions';
import EditButtons from '../../Assets/EditButtons'
import BooleanFields from '../../Assets/BooleanFields'
import InputFields from '../../Assets/InputsFields'
import SelectInputsFields from '../../Assets/SelectInputsFields'
import AddNoteFields from '../../Assets/AddNoteFields'

const options = [
    { value: '', label: 'Select' },
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' },
    { value: 'Years', label: 'Years' }
]

export default function EnglishExams({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    const [ selection, setSelection ] = useState({
        number: '',
        duration: '',
    });
    const [ editedSelection, setEditedSelection ] = useState<{number: string | null, duration: string | null}>({
        number: null,
        duration: null,
    })
    const [ index, setIndex ] = useState<number | null>(null);
    const [ editedNote, setEditedNote ] = useState<Note | null>(null);
    const [ notePopup, setNotePopup ] = useState(false);
    const [ name, setName ] = useState('');

    const [ openLinkPopup, setOpenLinkPopup ] = useState(false);
    const [ linkObj, setLinkObj ] = useState<{link: string, name: string}>({
        link: '',
        name: '',
    });
    const [ hasInputs, setHasInputs ] = useState<boolean | null>(null);

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isToeflOpen, setIsToeflOpen ] = useState(false);
    const [ isIeltOpen, setIsIeltOpen ] = useState(false);
    const [ isMelabOpen, setIsMelabOpen ] = useState(false);
    const [ isPteOpen, setIsPteOpen ] = useState(false);
    const [ isItepOpen, setIsItepOpen ] = useState(false);
    

    const toggleLinkPopup = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenLinkPopup(!openLinkPopup);
    }

    const toggleNotePopup = (e:any) => {
        e.preventDefault();
        setNotePopup(!notePopup)
    }

    console.log(newSchool.edited_school_english_proficiency_exams)
    useEffect(() => {
        if (newSchool.edited_school_english_proficiency_exams.input !== null) {
            setHasInputs(true)
        } else {
            setHasInputs(null)
        }
    }, [newSchool.edited_school_english_proficiency_exams.input])


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed !== null) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: selection.number + ' ' + selection.duration,
                }
            })
        } 
    }, [selection])


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required) {
            // setNewSchool({
            //     ...newSchool,
            //     school_english_proficiency_exams: {
            //         ...newSchool.school_english_proficiency_exams,
            //         school_toefl_required: newSchool.school_english_proficiency_exams.school_toefl_required ? newSchool.school_english_proficiency_exams.school_toefl_required : false,
            //         school_ielt_required: newSchool.school_english_proficiency_exams.school_ielt_required ? newSchool.school_english_proficiency_exams.school_ielt_required : false,
            //         school_melab_required: newSchool.school_english_proficiency_exams.school_melab_required ? newSchool.school_english_proficiency_exams.school_melab_required : false,
            //         school_pte_academic_required: newSchool.school_english_proficiency_exams.school_pte_academic_required ? newSchool.school_english_proficiency_exams.school_pte_academic_required : false,
            //         school_itep_academic_plus_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_required : false,

            //         school_ielt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required : 0,
            //         school_ielt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes : [],

            //         school_melab_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : 0,
            //         school_melab_minimum_score_notes: newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes : [],

            //         school_pte_academic_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : 0,
            //         school_pte_academic_minimum_score_notes: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes : [],

            //         school_itep_academic_plus_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : 0,
            //         school_itep_academic_plus_minimum_score_notes: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes : [],

            //         school_minimum_time_frame_toefl_needs_to_be_completed: newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed ? newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed : '',
            //         school_toefl_exempt_with_masters_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree : false,
            //         school_toefl_exempt_with_doctoral_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree : false,

            //         school_toefl_ibt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : 0,
            //         school_toefl_ibt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : 0,
            //         school_toefl_ibt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : 0,
            //         school_toefl_ibt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : 0,
            //         school_toefl_ibt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : 0,
            //         school_toefl_ibt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes : [],

            //         school_toefl_pbt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : 0,
            //         school_toefl_pbt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : 0,
            //         school_toefl_pbt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : 0,
            //         school_toefl_pbt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : 0,
            //         school_toefl_pbt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required : 0,
            //         school_toefl_pbt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes : [],
            //     }
            // });
        } else {
            // setNewSchool({
            //     ...newSchool,
            //     school_english_proficiency_exams: {
            //         ...newSchool.school_english_proficiency_exams,
            //         school_toefl_required: null,
            //         school_ielt_required: null,
            //         school_melab_required: null,
            //         school_pte_academic_required: null,
            //         school_itep_academic_plus_required: null,

            //         school_ielt_minimum_total_score_required: null,
            //         school_ielt_minimum_score_notes: null,

            //         school_melab_minimum_total_score_required: null,
            //         school_melab_minimum_score_notes: null,

            //         school_pte_academic_minimum_total_score_required: null,
            //         school_pte_academic_minimum_score_notes: null,

            //         school_itep_academic_plus_minimum_total_score_required: null,
            //         school_itep_academic_plus_minimum_score_notes: null,

            //         school_minimum_time_frame_toefl_needs_to_be_completed: null,
            //         school_toefl_exempt_with_masters_degree: null,
            //         school_toefl_exempt_with_doctoral_degree: null,

            //         school_toefl_ibt_minimum_total_score_required: null,
            //         school_toefl_ibt_minimum_reading_score_required: null,
            //         school_toefl_ibt_minimum_writing_score_required: null,
            //         school_toefl_ibt_minimum_listening_score_required: null,
            //         school_toefl_ibt_minimum_speaking_score_required: null,
            //         school_toefl_ibt_minimum_score_notes: null,

            //         school_toefl_pbt_minimum_total_score_required: null,
            //         school_toefl_pbt_minimum_reading_score_required: null,
            //         school_toefl_pbt_minimum_writing_score_required: null,
            //         school_toefl_pbt_minimum_listening_score_required: null,
            //         school_toefl_pbt_minimum_speaking_score_required: null,
            //         school_toefl_pbt_minimum_score_notes: null,
            //     }
            // })
            setSelection({
                number: '',
                duration: '',
            });
        }
    }, [newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required]);

    useEffect(() => {
        if (newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input !== null) {
            const array = newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input.split(' ');
            setEditedSelection({
                number: array[0],
                duration: array[1],
            })
        } else {
            setEditedSelection({
                number: null,
                duration: null,
            })
        }
    }, [newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed])



    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_toefl_required) {
            // setNewSchool({
            //     ...newSchool,
            //     school_english_proficiency_exams: {
            //         ...newSchool.school_english_proficiency_exams,
            //         school_minimum_time_frame_toefl_needs_to_be_completed: newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed ? newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed : '',
            //         school_toefl_exempt_with_masters_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree : false,
            //         school_toefl_exempt_with_doctoral_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree : false,

            //         school_toefl_ibt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : 0,
            //         school_toefl_ibt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : 0,
            //         school_toefl_ibt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : 0,
            //         school_toefl_ibt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : 0,
            //         school_toefl_ibt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : 0,
            //         school_toefl_ibt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes : [],

            //         school_toefl_pbt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : 0,
            //         school_toefl_pbt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : 0,
            //         school_toefl_pbt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : 0,
            //         school_toefl_pbt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : 0,
            //         school_toefl_pbt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required : 0,
            //         school_toefl_pbt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes : [],
            //     }
            // });
            if (newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed) {
                const array = newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else if (!newSchool.school_english_proficiency_exams.school_toefl_required){
            // setNewSchool({
            //     ...newSchool,
            //     school_english_proficiency_exams: {
            //         ...newSchool.school_english_proficiency_exams,
            //         school_minimum_time_frame_toefl_needs_to_be_completed: null,
            //         school_toefl_exempt_with_masters_degree: null,
            //         school_toefl_exempt_with_doctoral_degree: null,

            //         school_toefl_ibt_minimum_total_score_required: null,
            //         school_toefl_ibt_minimum_reading_score_required: null,
            //         school_toefl_ibt_minimum_writing_score_required: null,
            //         school_toefl_ibt_minimum_listening_score_required: null,
            //         school_toefl_ibt_minimum_speaking_score_required: null,
            //         school_toefl_ibt_minimum_score_notes: null,

            //         school_toefl_pbt_minimum_total_score_required: null,
            //         school_toefl_pbt_minimum_reading_score_required: null,
            //         school_toefl_pbt_minimum_writing_score_required: null,
            //         school_toefl_pbt_minimum_listening_score_required: null,
            //         school_toefl_pbt_minimum_speaking_score_required: null,
            //         school_toefl_pbt_minimum_score_notes: null,
            //     }
            // })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_toefl_required]);


    // useEffect(() => {
    //     if (newSchool.school_english_proficiency_exams.school_ielt_required) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_ielt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required : 0,
    //                 school_ielt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes : [],
    //             }
    //         })
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_ielt_minimum_total_score_required: null,
    //                 school_ielt_minimum_score_notes: null,
    //             }
    //         })
    //     }
    // }, [newSchool.school_english_proficiency_exams.school_ielt_required]);


    // useEffect(() => {
    //     if (newSchool.school_english_proficiency_exams.school_melab_required) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_melab_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : 0,
    //                 school_melab_minimum_score_notes: newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes : [],
    //             }
    //         })
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_melab_minimum_total_score_required: null,
    //                 school_melab_minimum_score_notes: null,
    //             }
    //         })
    //     }
    // }, [newSchool.school_english_proficiency_exams.school_melab_required])


    // useEffect(() => {
    //     if (newSchool.school_english_proficiency_exams.school_pte_academic_required) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_pte_academic_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : 0,
    //                 school_pte_academic_minimum_score_notes: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes : [],
    //             }
    //         });
            
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_pte_academic_minimum_total_score_required: null,
    //                 school_pte_academic_minimum_score_notes: null,
    //             }
    //         })
    //     }
    // }, [newSchool.school_english_proficiency_exams.school_pte_academic_required]);


    // useEffect(() => {
    //     if (newSchool.school_english_proficiency_exams.school_itep_academic_plus_required) {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_itep_academic_plus_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : 0,
    //                 school_itep_academic_plus_minimum_score_notes: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes : [],
    //             }
    //         })
    //     } else {
    //         setNewSchool({
    //             ...newSchool,
    //             school_english_proficiency_exams: {
    //                 ...newSchool.school_english_proficiency_exams,
    //                 school_itep_academic_plus_minimum_total_score_required: null,
    //                 school_itep_academic_plus_minimum_score_notes: null,
    //             }
    //         })
    //     }
    // }, [newSchool.school_english_proficiency_exams.school_itep_academic_plus_required]);

    useEffect(() => {
        if (newSchool.edited_school_english_proficiency_exams.edited_school_english_proficiency_exams_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required) {
                setIsOpen(true);
            } else {
                setIsOpen(false)
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_english_proficiency_exams_required.input) {
                setIsOpen(true);
            } else {
                setIsOpen(false)
            }
        }

        if (newSchool.edited_school_english_proficiency_exams.edited_school_toefl_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_toefl_required) {
                setIsToeflOpen(true)
            } else {
                setIsToeflOpen(false);
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_toefl_required.input) {
                setIsToeflOpen(true)
            } else {
                setIsToeflOpen(false);
            }
        }

        if (newSchool.edited_school_english_proficiency_exams.edited_school_melab_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_melab_required) {
                setIsMelabOpen(true)
            } else {
                setIsMelabOpen(false)
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_melab_required.input) {
                setIsMelabOpen(true)
            } else {
                setIsMelabOpen(false)
            }
        }

        if (newSchool.edited_school_english_proficiency_exams.edited_school_ielt_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_ielt_required) {
                setIsIeltOpen(true)
            } else {
                setIsIeltOpen(false)
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_ielt_required.input) {
                setIsIeltOpen(true)
            } else {
                setIsIeltOpen(false)
            }
        }

        if (newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_pte_academic_required) {
                setIsPteOpen(true)
            } else {
                setIsPteOpen(false)
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_required.input) {
                setIsPteOpen(true)
            } else {
                setIsPteOpen(false)
            }
        }

        if (newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_required.input === null) {
            if (newSchool.school_english_proficiency_exams.school_itep_academic_plus_required) {
                setIsItepOpen(true)
            } else {
                setIsItepOpen(false)
            }
        } else {
            if (newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_required.input) {
                setIsItepOpen(true)
            } else {
                setIsItepOpen(false)
            }
        }
    }, [newSchool.edited_school_english_proficiency_exams.edited_school_english_proficiency_exams_required, newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required,
        newSchool.edited_school_english_proficiency_exams.edited_school_toefl_required, newSchool.school_english_proficiency_exams.school_toefl_required , newSchool.edited_school_english_proficiency_exams.edited_school_melab_required,
        newSchool.school_english_proficiency_exams.school_melab_required, newSchool.edited_school_english_proficiency_exams.edited_school_ielt_required, newSchool.school_english_proficiency_exams.school_ielt_required,
        newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_required, newSchool.school_english_proficiency_exams.school_pte_academic_required, newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_required,
        newSchool.school_english_proficiency_exams.school_itep_academic_plus_required
     ])
    
    const handleCheck = (e: ChangeEvent<HTMLInputElement>, isEditedInput: boolean) => {
        if (!isEditedInput) {

            if (e.target.name === 'school_english_proficiency_exams_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_english_proficiency_exams_required: e.target.checked,
                        school_toefl_required: e.target.checked ? false : null,
                        school_ielt_required: e.target.checked ? false : null,
                        school_melab_required: e.target.checked ? false : null,
                        school_pte_academic_required: e.target.checked ? false : null,
                        school_itep_academic_plus_required: e.target.checked ? false : null,

                        school_ielt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_ielt_minimum_score_notes: e.target.checked ? [] : null,

                        school_melab_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_melab_minimum_score_notes: e.target.checked ? [] : null,

                        school_pte_academic_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_pte_academic_minimum_score_notes: e.target.checked ? [] : null,

                        school_itep_academic_plus_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_itep_academic_plus_minimum_score_notes: e.target.checked ? [] : null,

                        school_minimum_time_frame_toefl_needs_to_be_completed: e.target.checked ? '' : null,
                        school_toefl_exempt_with_masters_degree: e.target.checked ? false : null,
                        school_toefl_exempt_with_doctoral_degree: e.target.checked ? false : null,

                        school_toefl_ibt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_reading_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_writing_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_listening_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_speaking_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_score_notes: e.target.checked ? [] : null,

                        school_toefl_pbt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_reading_score_required: e.target.checked ? 0 : null, 
                        school_toefl_pbt_minimum_writing_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_listening_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_speaking_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_score_notes: e.target.checked ? [] : null,
                    }
                })
            } else if (e.target.name === 'school_toefl_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_toefl_required: e.target.checked,
                        school_minimum_time_frame_toefl_needs_to_be_completed: e.target.checked ? '' : null,
                        school_toefl_exempt_with_masters_degree: e.target.checked ? false : null,
                        school_toefl_exempt_with_doctoral_degree: e.target.checked ? false : null,

                        school_toefl_ibt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_reading_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_writing_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_listening_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_speaking_score_required: e.target.checked ? 0 : null,
                        school_toefl_ibt_minimum_score_notes: e.target.checked ? [] : null,

                        school_toefl_pbt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_reading_score_required: e.target.checked ? 0 : null, 
                        school_toefl_pbt_minimum_writing_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_listening_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_speaking_score_required: e.target.checked ? 0 : null,
                        school_toefl_pbt_minimum_score_notes: e.target.checked ? [] : null,
                    }
                })
            } else if (e.target.name === 'school_ielt_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_ielt_required: e.target.checked,
                        school_ielt_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_ielt_minimum_score_notes: e.target.checked ? [] : null,   
                    }
                })
            } else if (e.target.name === 'school_melab_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_melab_required: e.target.checked,
                        school_melab_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_melab_minimum_score_notes: e.target.checked ? [] : null,
                    }
                })
            } else if (e.target.name === 'school_pte_academic_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_pte_academic_required: e.target.checked,
                        school_pte_academic_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_pte_academic_minimum_score_notes: e.target.checked ? [] : null,
                    }
                })
            } else if (e.target.name === 'school_itep_academic_plus_required') {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        school_itep_academic_plus_required: e.target.checked,
                        school_itep_academic_plus_minimum_total_score_required: e.target.checked ? 0 : null,
                        school_itep_academic_plus_minimum_score_notes: e.target.checked ? [] : null,
                    }
                })
            } else {
                setNewSchool({
                    ...newSchool,
                    school_english_proficiency_exams: {
                        ...newSchool.school_english_proficiency_exams,
                        [e.target.name]: e.target.checked,
                    }
                })
            }

            
        } else {
            const name = `edited_${e.target.name}`
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    [name]: {
                        ...newSchool.edited_school_english_proficiency_exams[name as keyof object] as object,
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
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [e.target.name]: e.target.value,
                }
            })
        } else {
            const name = `edited_${e.target.name}`
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    [name]: {
                        ...newSchool.edited_school_english_proficiency_exams[name as keyof object] as object,
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
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).concat(note)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    [`edited_${name}`]: (newSchool.edited_school_english_proficiency_exams[`edited_${name}` as keyof object] as Note[]) ? (newSchool.edited_school_english_proficiency_exams[`edited_${name}` as keyof object] as Note[]).concat(note) : [note]
                }
            })
        }
            
        }

    const updateNote = (note: Note) => {
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).map((n,i) => {
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
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    [`edited_${name}`]: (newSchool.edited_school_english_proficiency_exams[`edited_${name}` as keyof object] as Note[])!.map((n,i) => {
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

    const deleteNote = (e:any, index: number, name: string) => {
        e.preventDefault();
        if (loggedInUser.permissions.canEditWithoutVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).filter((n,i) => i !== index)
                }
            })
        } else if (loggedInUser.permissions.canEditWithVerificationNeeded) {
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    [`edited_${name}`]: (newSchool.edited_school_english_proficiency_exams[`edited_${name}` as keyof object] as Note[]).filter((n,i) => i !== index)
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

    const handleSelectNumber = (e: ChangeEvent<HTMLInputElement>, category: string, isEditedInput: boolean) => {
        if (!isEditedInput) {
            setSelection({...selection, number: e.target.value.trim()})
        } else {
            setEditedSelection({...editedSelection, number: e.target.value.trim()})
            setNewSchool({
                ...newSchool,
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                        ...newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed,
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
                edited_school_english_proficiency_exams: {
                    ...newSchool.edited_school_english_proficiency_exams,
                    edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
                        ...newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed,
                        input: editedSelection.number + ' ' + e.value,
                    }
                }
            })
        }
    }

    
    return (
        <>
        <div className={`mt-20 flex justify-start items-start gap-3 w-full`}>
            <div className={`grow relative max-w-[900px] border-2 p-4 block rounded border-[#B4B4B4]`}>
            <Screen isEdit={isEdit} editedInput={newSchool.edited_school_english_proficiency_exams.input} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} />
            <Indicator label="English Proficiency Exams Required" editedInput={newSchool.edited_school_english_proficiency_exams.input} />
                <div className={`flex justify-between items-center ${isOpen ? 'mx-4' : 'mx-0'}`}>
                <BooleanFields  isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} originalInput={newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required}
                name='school_english_proficiency_exams_required' handleCheck={handleCheck} input={newSchool.edited_school_english_proficiency_exams.edited_school_english_proficiency_exams_required.input}
                />
                
                    <button onClick={(e:any) => {toggleNotePopup(e); setName('notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                        Add Note
                    </button>
                
                </div>
                <div className={`${isOpen ? 'mx-4' : 'mx-0'}`}>
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_notes} originalNotes={newSchool.school_english_proficiency_exams.notes} name='notes' toggleNotePopup={toggleNotePopup}
                    deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                    />
                </div>
                {isOpen && (
                <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_english_proficiency_exams.school_toefl_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white block">TOEFL Required</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_required}
                    name='school_toefl_required' handleCheck={handleCheck}
                    />


                    {isToeflOpen && (
                    <>
                    <div className={`mt-8 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">Minimum Time Frame TOEFL Needs To Be Completed</label>   
                        <SelectInputsFields isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input}
                        originalInput={newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed} name='school_minimum_time_frame_toefl_needs_to_be_completed' handleInput={handleSelectNumber} handleSelect={handleSelectDuration}
                        number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} options={options}
                        />

                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">TOEFL Exempt with Masters Degree</label>   
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_exempt_with_masters_degree.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree}
                        name='school_toefl_exempt_with_masters_degree' handleCheck={handleCheck}
                        />
                      
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">TOEFL Exempt with Doctoral Degree</label>   
                        <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_exempt_with_doctoral_degree.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree}
                        name='school_toefl_exempt_with_doctoral_degree' handleCheck={handleCheck}
                        />
                       
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] py-5 px-8 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium text-orange-600 bg-white">TOEFL IBT Minimum Scores Required</label>
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white block">Total Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_total_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required}
                            name='school_toefl_ibt_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white block">Reading Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_reading_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required}
                            name='school_toefl_ibt_minimum_reading_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white block">Writing Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_writing_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required}
                            name='school_toefl_ibt_minimum_writing_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white block">Listening Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_listening_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required}
                            name='school_toefl_ibt_minimum_listening_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white block">Speaking Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_speaking_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required}
                            name='school_toefl_ibt_minimum_speaking_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_speaking_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8 mb-5'>
                            <label className="text-xl font-medium bg-white block">TOEFL IBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_ibt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                           
                        <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes} name='school_toefl_ibt_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                    </div>

                    
                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] py-5 px-8 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white text-orange-600">TOEFL PBT Minimum Scores Required</label>   
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white block">Total Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_total_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required}
                            name='school_toefl_pbt_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white block">Reading Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_reading_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required}
                            name='school_toefl_pbt_minimum_reading_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white block">Writing Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_writing_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required}
                            name='school_toefl_pbt_minimum_writing_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white block">Listening Score</label>   
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_listening_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required}
                            name='school_toefl_pbt_minimum_listening_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white block">Speaking Score</label>  
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_speaking_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required}
                            name='school_toefl_pbt_minimum_speaking_score_required' handleInput={handleInput}
                            /> 
                        </div>

                        <div className="mt-8 mb-5">
                            <label className="text-xl font-medium bg-white block">TOEFL PBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_pbt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                           
                        <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes} name='school_toefl_pbt_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                        </div>
                    </div>
                    
                    </>
                    )}

                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_ielt_required? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white block">IELTS Required</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_ielt_required.input} originalInput={newSchool.school_english_proficiency_exams.school_ielt_required}
                    name='school_ielt_required' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_ielt_required' checked={newSchool.school_english_proficiency_exams.school_ielt_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_ielt_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}

                    {isIeltOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">IELTS Minimum Total Score Required</label>  
                        <div className='flex justify-center items-center gap-3'> 
                            <InputFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_ielt_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required} name='school_ielt_minimum_total_score_required' handleInput={handleInput}
                            />
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_ielt_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_ielt_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes} name='school_ielt_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_melab_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white block">MELAB Required</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_melab_required.input}
                    originalInput={newSchool.school_english_proficiency_exams.school_melab_required} name='school_melab_required' handleCheck={handleCheck}
                    />
                    
            
                    {isMelabOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">MELAB Minimum Total Score Required</label> 
                        <div className='flex justify-center items-center gap-3'>  
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_melab_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required} name='school_melab_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_melab_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_melab_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                      
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_melab_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes} name='school_melab_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white block">PTE Academic Required</label>   
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_required.input} 
                    originalInput={newSchool.school_english_proficiency_exams.school_pte_academic_required} name='school_pte_academic_required' handleCheck={handleCheck}
                    />
                   

                    {isPteOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">PTE Academic Minimum Total Score Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} originalInput={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required} 
                            name='school_pte_academic_minimum_total_score_required' input={newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_minimum_total_score_required.input} handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_pte_academic_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_pte_academic_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                    
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes} name='school_pte_academic_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 mb-5 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white block">ITEP Academic Required</label>  
                    <BooleanFields isEdit={isEdit} newSchool={newSchool}  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_required.input}
                    originalInput={newSchool.school_english_proficiency_exams.school_itep_academic_plus_required} name='school_itep_academic_plus_required' handleCheck={handleCheck}
                    /> 
                  

                    {isItepOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white block">ITEP Academic Minimum Total Score Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <InputFields isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required} name='school_itep_academic_plus_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_itep_academic_plus_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_itep_academic_plus_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                      
                    <AddNoteFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} notes={newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_minimum_score_notes} originalNotes={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes} name='school_itep_academic_plus_minimum_score_notes' toggleNotePopup={toggleNotePopup}
                        deleteNote={deleteNote} setIndex={setIndex} setName={setName} setEditedNote={setEditedNote}
                        />
                    </div>
                    )}
                </div>
                </>
                )}
            </div> 
            {isEdit && <EditButtons isEdit={isEdit} loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={hasInputs} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup}
            name='school_english_proficiency_exams' link={newSchool.edited_school_english_proficiency_exams.link} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}