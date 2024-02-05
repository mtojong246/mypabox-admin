import { School, Note } from '../../../../types/schools.types'
import { Dispatch, SetStateAction, ChangeEvent, useEffect, useState, MouseEvent } from 'react'
import AddNote from '../Prereqs/AddNote'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import ReactQuill from 'react-quill'
import { UserObject } from '../../../../types/users.types';
import { PiCheckCircle, PiWarningCircle } from "react-icons/pi";
import LinkPopup from "../../LinkPopup";
import { enableEditModeGroup, confirmEditGroup, revertEditGroup, undoEditGroup } from './ExamFunctions';
import EditButtons from '../../Assets/EditButtons'
import BooleanFields from '../../Assets/BooleanFields'
import InputFields from '../../Assets/InputsFields'
import SelectInputsFields from '../../Assets/SelectInputsFields'

const options = [
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
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_toefl_required: newSchool.school_english_proficiency_exams.school_toefl_required ? newSchool.school_english_proficiency_exams.school_toefl_required : false,
                    school_ielt_required: newSchool.school_english_proficiency_exams.school_ielt_required ? newSchool.school_english_proficiency_exams.school_ielt_required : false,
                    school_melab_required: newSchool.school_english_proficiency_exams.school_melab_required ? newSchool.school_english_proficiency_exams.school_melab_required : false,
                    school_pte_academic_required: newSchool.school_english_proficiency_exams.school_pte_academic_required ? newSchool.school_english_proficiency_exams.school_pte_academic_required : false,
                    school_itep_academic_plus_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_required : false,

                    school_ielt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required : 0,
                    school_ielt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes : [],

                    school_melab_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : 0,
                    school_melab_minimum_score_notes: newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes : [],

                    school_pte_academic_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : 0,
                    school_pte_academic_minimum_score_notes: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes : [],

                    school_itep_academic_plus_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : 0,
                    school_itep_academic_plus_minimum_score_notes: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes : [],

                    school_minimum_time_frame_toefl_needs_to_be_completed: newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed ? newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed : '',
                    school_toefl_exempt_with_masters_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree : false,
                    school_toefl_exempt_with_doctoral_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree : false,

                    school_toefl_ibt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : 0,
                    school_toefl_ibt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : 0,
                    school_toefl_ibt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : 0,
                    school_toefl_ibt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : 0,
                    school_toefl_ibt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : 0,
                    school_toefl_ibt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes : [],

                    school_toefl_pbt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : 0,
                    school_toefl_pbt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : 0,
                    school_toefl_pbt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : 0,
                    school_toefl_pbt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : 0,
                    school_toefl_pbt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required : 0,
                    school_toefl_pbt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes : [],
                }
            });
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_toefl_required: null,
                    school_ielt_required: null,
                    school_melab_required: null,
                    school_pte_academic_required: null,
                    school_itep_academic_plus_required: null,

                    school_ielt_minimum_total_score_required: null,
                    school_ielt_minimum_score_notes: null,

                    school_melab_minimum_total_score_required: null,
                    school_melab_minimum_score_notes: null,

                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: null,

                    school_itep_academic_plus_minimum_total_score_required: null,
                    school_itep_academic_plus_minimum_score_notes: null,

                    school_minimum_time_frame_toefl_needs_to_be_completed: null,
                    school_toefl_exempt_with_masters_degree: null,
                    school_toefl_exempt_with_doctoral_degree: null,

                    school_toefl_ibt_minimum_total_score_required: null,
                    school_toefl_ibt_minimum_reading_score_required: null,
                    school_toefl_ibt_minimum_writing_score_required: null,
                    school_toefl_ibt_minimum_listening_score_required: null,
                    school_toefl_ibt_minimum_speaking_score_required: null,
                    school_toefl_ibt_minimum_score_notes: null,

                    school_toefl_pbt_minimum_total_score_required: null,
                    school_toefl_pbt_minimum_reading_score_required: null,
                    school_toefl_pbt_minimum_writing_score_required: null,
                    school_toefl_pbt_minimum_listening_score_required: null,
                    school_toefl_pbt_minimum_speaking_score_required: null,
                    school_toefl_pbt_minimum_score_notes: null,
                }
            })
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
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed ? newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed : '',
                    school_toefl_exempt_with_masters_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree : false,
                    school_toefl_exempt_with_doctoral_degree: newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree : false,

                    school_toefl_ibt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : 0,
                    school_toefl_ibt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : 0,
                    school_toefl_ibt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : 0,
                    school_toefl_ibt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : 0,
                    school_toefl_ibt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : 0,
                    school_toefl_ibt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes : [],

                    school_toefl_pbt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : 0,
                    school_toefl_pbt_minimum_reading_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : 0,
                    school_toefl_pbt_minimum_writing_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : 0,
                    school_toefl_pbt_minimum_listening_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : 0,
                    school_toefl_pbt_minimum_speaking_score_required: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required : 0,
                    school_toefl_pbt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes : [],
                }
            });
            if (newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed) {
                const array = newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ');
                setSelection({
                    number: array[0],
                    duration: array[1]
                })
            }
        } else if (!newSchool.school_english_proficiency_exams.school_toefl_required){
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_minimum_time_frame_toefl_needs_to_be_completed: null,
                    school_toefl_exempt_with_masters_degree: null,
                    school_toefl_exempt_with_doctoral_degree: null,

                    school_toefl_ibt_minimum_total_score_required: null,
                    school_toefl_ibt_minimum_reading_score_required: null,
                    school_toefl_ibt_minimum_writing_score_required: null,
                    school_toefl_ibt_minimum_listening_score_required: null,
                    school_toefl_ibt_minimum_speaking_score_required: null,
                    school_toefl_ibt_minimum_score_notes: null,

                    school_toefl_pbt_minimum_total_score_required: null,
                    school_toefl_pbt_minimum_reading_score_required: null,
                    school_toefl_pbt_minimum_writing_score_required: null,
                    school_toefl_pbt_minimum_listening_score_required: null,
                    school_toefl_pbt_minimum_speaking_score_required: null,
                    school_toefl_pbt_minimum_score_notes: null,
                }
            })
            setSelection({
                number: '',
                duration: '',
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_toefl_required]);


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_ielt_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_ielt_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required : 0,
                    school_ielt_minimum_score_notes: newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_ielt_minimum_total_score_required: null,
                    school_ielt_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_ielt_required]);


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_melab_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_melab_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : 0,
                    school_melab_minimum_score_notes: newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_melab_minimum_total_score_required: null,
                    school_melab_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_melab_required])


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_pte_academic_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : 0,
                    school_pte_academic_minimum_score_notes: newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes : [],
                }
            });
            
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_pte_academic_minimum_total_score_required: null,
                    school_pte_academic_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_pte_academic_required]);


    useEffect(() => {
        if (newSchool.school_english_proficiency_exams.school_itep_academic_plus_required) {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_itep_academic_plus_minimum_total_score_required: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : 0,
                    school_itep_academic_plus_minimum_score_notes: newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes : [],
                }
            })
        } else {
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    school_itep_academic_plus_minimum_total_score_required: null,
                    school_itep_academic_plus_minimum_score_notes: null,
                }
            })
        }
    }, [newSchool.school_english_proficiency_exams.school_itep_academic_plus_required]);

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
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [e.target.name]: e.target.checked,
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
            setNewSchool({
                ...newSchool,
                school_english_proficiency_exams: {
                    ...newSchool.school_english_proficiency_exams,
                    [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).concat(note)
                }
            })
        }

    const updateNote = (note: Note) => {
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
    }

    const deleteNote = (e:any, index: number, name: string) => {
        e.preventDefault();
        setNewSchool({
            ...newSchool,
            school_english_proficiency_exams: {
                ...newSchool.school_english_proficiency_exams,
                [name]: (newSchool.school_english_proficiency_exams[name as keyof object] as Note[]).filter((n,i) => i !== index)
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
            {((loggedInUser.permissions.canVerify && newSchool.edited_school_english_proficiency_exams.input !== null) || (!loggedInUser.permissions.canVerify && !newSchool.edited_school_english_proficiency_exams.isEditMode)) && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#e8e8e8] opacity-50 z-10'></div>}
            <label className="z-20 absolute top-[-16px] text-xl bg-white flex justify-start items-center">English Proficiency Exams Required<PiCheckCircle className={`h-5 w-5 ml-[2px] ${!hasInputs ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`} /><PiWarningCircle className={`h-5 w-5 ml-[2px] ${hasInputs ? 'text-[#F06A6A]' : 'text-[#B4B4B4]'}`}/></label>
                <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} originalInput={newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required}
                name='school_english_proficiency_exams_required' handleCheck={handleCheck} input={newSchool.edited_school_english_proficiency_exams.edited_school_english_proficiency_exams_required.input}
                />
                {/* <div className='w-full mt-2'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleCheck} name='school_english_proficiency_exams_required' checked={newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required ? true : false} type="checkbox" className="sr-only peer"/>
                        <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_english_proficiency_exams_required ? 'True' : 'False'}</span>
                    </label>
                </div> */}
                {isOpen && (
                <>
                <div className={`mt-8 mx-4 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_english_proficiency_exams.school_toefl_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Required</label>   
                    <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_required}
                    name='school_toefl_required' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_toefl_required' checked={newSchool.school_english_proficiency_exams.school_toefl_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}

                    {isToeflOpen && (
                    <>
                    <div className={`mt-8 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">Minimum Time Frame TOEFL Needs To Be Completed</label>   
                        <SelectInputsFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_minimum_time_frame_toefl_needs_to_be_completed.input}
                        originalInput={newSchool.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed} name='school_minimum_time_frame_toefl_needs_to_be_completed' handleInput={handleSelectNumber} handleSelect={handleSelectDuration}
                        number={editedSelection.number} duration={editedSelection.duration} originalNumber={selection.number} originalDuration={selection.duration} options={options}
                        />
                        {/* <div className='flex justify-start items-center gap-2'>
                            <input onChange={(e) => setSelection({...selection, number: e.target.value.trim()})} value={selection.number} className='w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />  
                            <Select onChange={(e:any) => setSelection({...selection, duration: e.value})} options={options} value={selection.duration ? {value: selection.duration, label: selection.duration} : null} className="w-1/3 focus:outline-none"/>
                        </div>      */}
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Masters Degree</label>   
                        <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_exempt_with_masters_degree.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree}
                        name='school_toefl_exempt_with_masters_degree' handleCheck={handleCheck}
                        />
                        {/* <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleCheck} name='school_toefl_exempt_with_masters_degree' checked={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? true : false} type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree ? 'True' : 'False'}</span>
                            </label>
                        </div>     */}
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">TOEFL Exempt with Doctoral Degree</label>   
                        <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_exempt_with_doctoral_degree.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree}
                        name='school_toefl_exempt_with_doctoral_degree' handleCheck={handleCheck}
                        />
                        {/* <div className='w-full mt-2'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onChange={handleCheck} name='school_toefl_exempt_with_doctoral_degree' checked={newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? true : false} type="checkbox" className="sr-only peer"/>
                                <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                                <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree ? 'True' : 'False'}</span>
                            </label>
                        </div>     */}
                    </div>

                    <div className={`mt-12 mx-5 relative max-w-[900px] py-5 px-8 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium text-orange-600 bg-white">TOEFL IBT Minimum Scores Required</label>
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white">Total Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_total_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required}
                            name='school_toefl_ibt_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Reading Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_reading_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required}
                            name='school_toefl_ibt_minimum_reading_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Writing Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_writing_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required}
                            name='school_toefl_ibt_minimum_writing_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Listening Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_listening_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required}
                            name='school_toefl_ibt_minimum_listening_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Speaking Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_ibt_minimum_speaking_score_required.input} originalInput={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required}
                            name='school_toefl_ibt_minimum_speaking_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_ibt_minimum_speaking_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8 mb-5'>
                            <label className="text-xl font-medium bg-white">TOEFL IBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_ibt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes?.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_toefl_ibt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i, 'school_toefl_ibt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>

                    
                    <div className={`mt-12 mx-5 mb-5 relative max-w-[900px] py-5 px-8 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white text-orange-600">TOEFL PBT Minimum Scores Required</label>   
                        <div className='mt-2'>
                            <label className="text-xl font-medium bg-white">Total Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_total_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required}
                            name='school_toefl_pbt_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className='mt-8'>
                            <label className="text-xl font-medium bg-white">Reading Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_reading_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required}
                            name='school_toefl_pbt_minimum_reading_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_reading_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Writing Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_writing_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required}
                            name='school_toefl_pbt_minimum_writing_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_writing_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Listening Score</label>   
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_listening_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required}
                            name='school_toefl_pbt_minimum_listening_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_listening_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8">
                            <label className="text-xl font-medium bg-white">Speaking Score</label>  
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_toefl_pbt_minimum_speaking_score_required.input}  originalInput={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required}
                            name='school_toefl_pbt_minimum_speaking_score_required' handleInput={handleInput}
                            /> 
                            {/* <input onChange={handleInput} name='school_toefl_pbt_minimum_speaking_score_required' value={newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required ? newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required : ''} className='mt-1 block w-1/3 focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                        </div>

                        <div className="mt-8 mb-5">
                            <label className="text-xl font-medium bg-white">TOEFL PBT Minimum Score Notes</label>   
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_toefl_pbt_minimum_score_notes')}} className="mt-1 block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                            <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                            {newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes?.map((note, i) => (
                                <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                    <div className='flex justify-between items-center w-full mb-1'>
                                        <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                        <div className='flex gap-2'>
                                            <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_toefl_pbt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                            <button onClick={(e) => deleteNote(e, i, 'school_toefl_pbt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                        </div>
                                    </div>
                                    <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    
                    </>
                    )}

                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_ielt_required? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Required</label>   
                    <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_ielt_required.input} originalInput={newSchool.school_english_proficiency_exams.school_ielt_required}
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
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">IELT Minimum Total Score Required</label>  
                        <div className='flex justify-center items-center gap-3'> 
                            <InputFields  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_ielt_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required} name='school_ielt_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_ielt_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_ielt_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_ielt_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes && newSchool.school_english_proficiency_exams.school_ielt_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_ielt_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_ielt_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_melab_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Required</label>   
                    <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_melab_required.input}
                    originalInput={newSchool.school_english_proficiency_exams.school_melab_required} name='school_melab_required' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_melab_required' checked={newSchool.school_english_proficiency_exams.school_melab_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_melab_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}
            
                    {isMelabOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">MELAB Minimum Total Score Required</label> 
                        <div className='flex justify-center items-center gap-3'>  
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_melab_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required} name='school_melab_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_melab_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_melab_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_melab_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes && newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes && newSchool.school_english_proficiency_exams.school_melab_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_melab_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_melab_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 relative max-w-[900px] p-4 block border-2 rounded ${newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Required</label>   
                    <BooleanFields  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_required.input} 
                    originalInput={newSchool.school_english_proficiency_exams.school_pte_academic_required} name='school_pte_academic_required' handleCheck={handleCheck}
                    />
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_pte_academic_required' checked={newSchool.school_english_proficiency_exams.school_pte_academic_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_pte_academic_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}

                    {isPteOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">PTE Academic Minimum Total Score Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <InputFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} originalInput={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required} 
                            name='school_pte_academic_minimum_total_score_required' input={newSchool.edited_school_english_proficiency_exams.edited_school_pte_academic_minimum_total_score_required.input} handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_pte_academic_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_pte_academic_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes && newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes && newSchool.school_english_proficiency_exams.school_pte_academic_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_pte_academic_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_pte_academic_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>

                <div className={`mt-12 mx-4 mb-5 relative max-w-[900px] border-2 p-4 block rounded ${newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? 'border-[#4573D2]' : 'border-[#545454]'}`}>
                    <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Required</label>  
                    <BooleanFields loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_required.input}
                    originalInput={newSchool.school_english_proficiency_exams.school_itep_academic_plus_required} name='school_itep_academic_plus_required' handleCheck={handleCheck}
                    /> 
                    {/* <div className='w-full mt-2'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={handleCheck} name='school_itep_academic_plus_required' checked={newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? true : false} type="checkbox" className="sr-only peer"/>
                            <div className="w-12 h-8 bg-gray-200 peer-focus:outline-none rounded-full shadow-inner peer dark:bg-gray-200 peer-checked:after:translate-x-[16px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600"></div>
                            <span className="ml-3 text-xl text-black">{newSchool.school_english_proficiency_exams.school_itep_academic_plus_required ? 'True' : 'False'}</span>
                        </label>
                    </div> */}

                    {isItepOpen && (
                    <div className={`mt-8 mx-5 mb-5 relative max-w-[900px] p-4 block rounded border-[#545454] border-2`}>
                        <label className="absolute top-[-16px] text-xl font-medium bg-white">ITEP Academic Minimum Total Score Required</label>   
                        <div className='flex justify-center items-center gap-3'>
                            <InputFields  loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={newSchool.edited_school_english_proficiency_exams.edited_school_itep_academic_plus_minimum_total_score_required.input}
                            originalInput={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required} name='school_itep_academic_plus_minimum_total_score_required' handleInput={handleInput}
                            />
                            {/* <input onChange={handleInput} name='school_itep_academic_plus_minimum_total_score_required' value={newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required ? newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required : ''} className='grow focus:outline-none border border-[#B4B4B4] p-3 rounded' />   */}
                            <button onClick={(e) => {toggleNotePopup(e); setName('school_itep_academic_plus_minimum_score_notes')}} className="block border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] px-5 text-xl hover:text-white hover:bg-[#F06A6A]">
                                Add Note
                            </button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-3 ${newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes && newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes?.length ? 'mt-3' : 'mt-0'}`}>
                        {newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes && newSchool.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes?.map((note, i) => (
                            <div className='py-2 pr-2 pl-3 border border-[#B4B4B4] rounded w-full'>
                                <div className='flex justify-between items-center w-full mb-1'>
                                    <p className={`font-semibold ${note.type === 'information' ? 'text-[#4573D2]' : 'text-[#F06A6A]'}`}>{note.type}:</p>
                                    <div className='flex gap-2'>
                                        <button onClick={(e) => {toggleNotePopup(e); setEditedNote(note); setIndex(i); setName('school_itep_academic_plus_minimum_score_notes')}}><FiEdit3 className='h-7 w-7 border-2 rounded-md border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>
                                        <button onClick={(e) => deleteNote(e, i, 'school_itep_academic_plus_minimum_score_notes')}><AiOutlineClose className='h-7 w-7 border-2 rounded-md border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>
                                    </div>
                                </div>
                                <ReactQuill theme='bubble' value={note.note} readOnly={true} className='edited-quill'/>
                            </div>
                        ))}
                    </div>
                    </div>
                    )}
                </div>
                </>
                )}
            </div> 
            {isEdit && <EditButtons loggedInUser={loggedInUser} isEditMode={newSchool.edited_school_english_proficiency_exams.isEditMode} input={hasInputs} enableEditMode={enableEditModeGroup} confirmEdit={confirmEditGroup} undoEdit={undoEditGroup} revertEdit={revertEditGroup}
            name='school_english_proficiency_exams' link={newSchool.edited_school_english_proficiency_exams.link} setLinkObj={setLinkObj} toggleLinkPopup={toggleLinkPopup} newSchool={newSchool} setNewSchool={setNewSchool}
            />}
            </div>
            {openLinkPopup && <LinkPopup toggleLinkPopup={toggleLinkPopup} addLink={addLink} linkObj={linkObj} />}
            {notePopup && <AddNote toggleNotePopup={toggleNotePopup} addNote={addNote} editedNote={editedNote} setEditedNote={setEditedNote} updateNote={updateNote}/>}
        </>
    )
}