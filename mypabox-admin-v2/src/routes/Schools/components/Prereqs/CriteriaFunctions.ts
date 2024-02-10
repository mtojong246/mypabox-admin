import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";


export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_grade_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_minimum_grade_required_for_all_courses.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_grade_criteria.school_grade_criteria_note_section : field.notes,
                edited_school_minimum_grade_required_for_all_courses: {
                    ...field.edited_school_minimum_grade_required_for_all_courses,
                    input: field.edited_school_minimum_grade_required_for_all_courses.input === null ? newSchool.school_grade_criteria.school_minimum_grade_required_for_all_courses : field.edited_school_minimum_grade_required_for_all_courses.input,
                }
            }
        })
    } else if (name === 'edited_school_time_frame_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? newSchool.school_time_frame_criteria.school_time_frame_criteria_note_section : field.notes,
                input: (field.edited_school_time_frame_all_courses_must_be_completed.input === null && field.edited_school_time_frame_math_courses_must_be_completed.input === null && 
                    field.edited_school_time_frame_science_courses_must_be_completed.input === null) ? null: true,
                edited_school_time_frame_all_courses_must_be_completed: {
                    ...field.edited_school_time_frame_all_courses_must_be_completed,
                    input: field.edited_school_time_frame_all_courses_must_be_completed.input === null ? newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input : field.edited_school_time_frame_all_courses_must_be_completed.input,
                    notes: field.edited_school_time_frame_all_courses_must_be_completed.notes === null ? newSchool.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes : field.edited_school_time_frame_all_courses_must_be_completed.notes,
                },
                edited_school_time_frame_math_courses_must_be_completed: {
                    ...field.edited_school_time_frame_math_courses_must_be_completed,
                    input: field.edited_school_time_frame_math_courses_must_be_completed.input === null ? newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input : field.edited_school_time_frame_math_courses_must_be_completed.input,
                    notes: field.edited_school_time_frame_math_courses_must_be_completed.notes === null ? newSchool.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes : field.edited_school_time_frame_math_courses_must_be_completed.notes,
                },
                edited_school_time_frame_science_courses_must_be_completed: {
                    ...field.edited_school_time_frame_science_courses_must_be_completed,
                    input: field.edited_school_time_frame_science_courses_must_be_completed.input === null ? newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input : field.edited_school_time_frame_science_courses_must_be_completed.input,
                    notes: field.edited_school_time_frame_science_courses_must_be_completed.notes === null ? newSchool.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes : field.edited_school_time_frame_science_courses_must_be_completed.notes,
                }

            }
        })
    } else if (name === 'edited_school_prerequisite_completion_criteria') {
        const field = newSchool[name];
        const originalField = newSchool.school_prerequisite_completion_criteria;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_prerequisite_completion_criteria_note_section : field.notes,
                input: (field.edited_school_all_courses_most_be_completed_before_applying.input === null && field.edited_school_courses_can_be_in_progress_while_applying.input === null && 
                    field.edited_school_date_pending_courses_must_be_completed.input === null && field.edited_school_maximum_number_of_courses_pending_while_applying.input === null && 
                    field.edited_school_maximum_number_of_credits_pending_while_applying.input === null && field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === null && 
                    field.edited_school_minimum_grade_required_for_pending_courses.input === null && field.edited_school_semester_pending_courses_must_be_completed.input === null) ? null : true,
                edited_school_all_courses_most_be_completed_before_applying: {
                    ...field.edited_school_all_courses_most_be_completed_before_applying,
                    input: field.edited_school_all_courses_most_be_completed_before_applying.input === null ? originalField.school_all_courses_most_be_completed_before_applying : field.edited_school_all_courses_most_be_completed_before_applying.input === null,
                },
                edited_school_courses_can_be_in_progress_while_applying: {
                    ...field.edited_school_courses_can_be_in_progress_while_applying,
                    input: field.edited_school_courses_can_be_in_progress_while_applying.input === null ? originalField.school_courses_can_be_in_progress_while_applying : field.edited_school_courses_can_be_in_progress_while_applying.input,
                },
                edited_school_date_pending_courses_must_be_completed: {
                    ...field.edited_school_date_pending_courses_must_be_completed,
                    input: field.edited_school_date_pending_courses_must_be_completed.input === null ? originalField.school_date_pending_courses_must_be_completed &&  originalField.school_date_pending_courses_must_be_completed.input :field.edited_school_date_pending_courses_must_be_completed.input, 
                    notes: field.edited_school_date_pending_courses_must_be_completed.notes === null ? originalField.school_date_pending_courses_must_be_completed &&  originalField.school_date_pending_courses_must_be_completed.notes :field.edited_school_date_pending_courses_must_be_completed.notes, 
                },
                edited_school_maximum_number_of_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_courses_pending_while_applying.input === null ? originalField.school_maximum_number_of_courses_pending_while_applying && originalField.school_maximum_number_of_courses_pending_while_applying.input : field.edited_school_maximum_number_of_courses_pending_while_applying.input,
                    notes: field.edited_school_maximum_number_of_courses_pending_while_applying.notes === null ? originalField.school_maximum_number_of_courses_pending_while_applying && originalField.school_maximum_number_of_courses_pending_while_applying.notes : field.edited_school_maximum_number_of_courses_pending_while_applying.notes,
                },
                edited_school_maximum_number_of_credits_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_credits_pending_while_applying,
                    input: field.edited_school_maximum_number_of_credits_pending_while_applying.input === null ? originalField.school_maximum_number_of_credits_pending_while_applying && originalField.school_maximum_number_of_credits_pending_while_applying?.input : field.edited_school_maximum_number_of_credits_pending_while_applying.input,
                    notes: field.edited_school_maximum_number_of_credits_pending_while_applying.notes === null ? originalField.school_maximum_number_of_credits_pending_while_applying && originalField.school_maximum_number_of_credits_pending_while_applying?.notes : field.edited_school_maximum_number_of_credits_pending_while_applying.notes,
                },
                edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_non_science_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === null ? originalField.school_maximum_number_of_non_science_courses_pending_while_applying && originalField.school_maximum_number_of_non_science_courses_pending_while_applying.input : field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input,
                    notes: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes === null ? originalField.school_maximum_number_of_non_science_courses_pending_while_applying && originalField.school_maximum_number_of_non_science_courses_pending_while_applying.notes : field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes,
                },
                edited_school_maximum_number_of_science_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_science_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_science_courses_pending_while_applying.input === null ? originalField.school_maximum_number_of_science_courses_pending_while_applying && originalField.school_maximum_number_of_science_courses_pending_while_applying.input : field.edited_school_maximum_number_of_science_courses_pending_while_applying.input,
                    notes: field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes === null ? originalField.school_maximum_number_of_science_courses_pending_while_applying && originalField.school_maximum_number_of_science_courses_pending_while_applying.notes : field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes,
                },
                edited_school_minimum_grade_required_for_pending_courses: {
                    ...field.edited_school_minimum_grade_required_for_pending_courses,
                    input: field.edited_school_minimum_grade_required_for_pending_courses.input === null ? originalField.school_minimum_grade_required_for_pending_courses && originalField.school_minimum_grade_required_for_pending_courses.input : field.edited_school_minimum_grade_required_for_pending_courses.input,
                    notes: field.edited_school_minimum_grade_required_for_pending_courses.notes === null ? originalField.school_minimum_grade_required_for_pending_courses && originalField.school_minimum_grade_required_for_pending_courses.notes : field.edited_school_minimum_grade_required_for_pending_courses.notes,
                },
                edited_school_semester_pending_courses_must_be_completed: {
                    ...field.edited_school_semester_pending_courses_must_be_completed,
                    input: field.edited_school_semester_pending_courses_must_be_completed.input === null ? originalField.school_semester_pending_courses_must_be_completed && originalField.school_semester_pending_courses_must_be_completed.input : field.edited_school_semester_pending_courses_must_be_completed.input,
                    notes: field.edited_school_semester_pending_courses_must_be_completed.notes === null ? originalField.school_semester_pending_courses_must_be_completed && originalField.school_semester_pending_courses_must_be_completed.notes : field.edited_school_semester_pending_courses_must_be_completed.notes,
                }
            }
        })
    }
    
}


export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_grade_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...newSchool.school_grade_criteria,
                    school_grade_criteria_note_section: field.notes ? field.notes : newSchool.school_grade_criteria.school_grade_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_minimum_grade_required_for_all_courses.input === null ? null : true,
                    edited_school_minimum_grade_required_for_all_courses: {
                        ...field.edited_school_minimum_grade_required_for_all_courses,
                        input: field.edited_school_minimum_grade_required_for_all_courses.input,
                        prev: field.edited_school_minimum_grade_required_for_all_courses.input,
                    }
                }
            })
        } else if (name === 'edited_school_time_frame_criteria') {
            const field = newSchool[name];
            const originalField = newSchool.school_time_frame_criteria;
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    school_time_frame_criteria_note_section: field.notes ? field.notes : originalField.school_time_frame_criteria_note_section,
                    school_time_frame_all_courses_must_be_completed: {
                        input: originalField.school_time_frame_all_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_all_courses_must_be_completed.notes ? field.edited_school_time_frame_all_courses_must_be_completed.notes : originalField.school_time_frame_all_courses_must_be_completed.notes,
                    },
                    school_time_frame_math_courses_must_be_completed: {
                        input: originalField.school_time_frame_math_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_math_courses_must_be_completed.notes ? field.edited_school_time_frame_math_courses_must_be_completed.notes : originalField.school_time_frame_math_courses_must_be_completed.notes,
                    },
                    school_time_frame_science_courses_must_be_completed: {
                        input: originalField.school_time_frame_science_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_science_courses_must_be_completed.notes ? field.edited_school_time_frame_science_courses_must_be_completed.notes : originalField.school_time_frame_science_courses_must_be_completed.notes,
                    }
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_time_frame_all_courses_must_be_completed.input === null && field.edited_school_time_frame_math_courses_must_be_completed.input === null && 
                        field.edited_school_time_frame_science_courses_must_be_completed.input === null) ? null: true,
                    edited_school_time_frame_all_courses_must_be_completed: {
                        ...field.edited_school_time_frame_all_courses_must_be_completed,
                        input: field.edited_school_time_frame_all_courses_must_be_completed.input === (originalField.school_time_frame_all_courses_must_be_completed && originalField.school_time_frame_all_courses_must_be_completed.input) ? null : field.edited_school_time_frame_all_courses_must_be_completed.input,
                        prev: field.edited_school_time_frame_all_courses_must_be_completed.input === (originalField.school_time_frame_all_courses_must_be_completed && originalField.school_time_frame_all_courses_must_be_completed.input) ? null : field.edited_school_time_frame_all_courses_must_be_completed.input,
                    },
                    edited_school_time_frame_math_courses_must_be_completed: {
                        ...field.edited_school_time_frame_math_courses_must_be_completed,
                        input: field.edited_school_time_frame_math_courses_must_be_completed.input === (originalField.school_time_frame_math_courses_must_be_completed && originalField.school_time_frame_math_courses_must_be_completed.input) ? null : field.edited_school_time_frame_math_courses_must_be_completed.input,
                        prev: field.edited_school_time_frame_math_courses_must_be_completed.input === (originalField.school_time_frame_math_courses_must_be_completed && originalField.school_time_frame_math_courses_must_be_completed.input) ? null : field.edited_school_time_frame_math_courses_must_be_completed.input,
                    },
                    edited_school_time_frame_science_courses_must_be_completed: {
                        ...field.edited_school_time_frame_science_courses_must_be_completed,
                        input: field.edited_school_time_frame_science_courses_must_be_completed.input === (originalField.school_time_frame_science_courses_must_be_completed && originalField.school_time_frame_science_courses_must_be_completed.input) ? null : field.edited_school_time_frame_science_courses_must_be_completed.input,
                        prev: field.edited_school_time_frame_science_courses_must_be_completed.input === (originalField.school_time_frame_science_courses_must_be_completed && originalField.school_time_frame_science_courses_must_be_completed.input) ? null : field.edited_school_time_frame_science_courses_must_be_completed.input,
                    }
    
                }
            })
        } else if (name === 'edited_school_prerequisite_completion_criteria') {
            const field = newSchool[name];
            const originalField = newSchool.school_prerequisite_completion_criteria;
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...newSchool.school_prerequisite_completion_criteria,
                    school_prerequisite_completion_criteria_note_section: field.notes ? field.notes : originalField.school_prerequisite_completion_criteria_note_section,
                    school_date_pending_courses_must_be_completed: field.edited_school_date_pending_courses_must_be_completed.notes ? {
                        input: originalField.school_date_pending_courses_must_be_completed ? originalField.school_date_pending_courses_must_be_completed.input : '',
                        notes: field.edited_school_date_pending_courses_must_be_completed.notes,
                    } : originalField.school_date_pending_courses_must_be_completed,
                    school_maximum_number_of_courses_pending_while_applying: field.edited_school_maximum_number_of_courses_pending_while_applying.notes ? {
                        input: originalField.school_maximum_number_of_courses_pending_while_applying ? originalField.school_maximum_number_of_courses_pending_while_applying.input : 0,
                        notes: field.edited_school_maximum_number_of_courses_pending_while_applying.notes,
                    } : originalField.school_maximum_number_of_courses_pending_while_applying,
                    school_maximum_number_of_credits_pending_while_applying: field.edited_school_maximum_number_of_credits_pending_while_applying.notes ? {
                        input: originalField.school_maximum_number_of_credits_pending_while_applying ? originalField.school_maximum_number_of_credits_pending_while_applying.input : 0,
                        notes: field.edited_school_maximum_number_of_credits_pending_while_applying.notes,
                    } : originalField.school_maximum_number_of_credits_pending_while_applying,
                    school_maximum_number_of_non_science_courses_pending_while_applying: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes ? {
                        input: originalField.school_maximum_number_of_non_science_courses_pending_while_applying ? originalField.school_maximum_number_of_non_science_courses_pending_while_applying.input : 0,
                        notes: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes,
                    } : originalField.school_maximum_number_of_non_science_courses_pending_while_applying,
                    school_maximum_number_of_science_courses_pending_while_applying: field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes ? {
                        input: originalField.school_maximum_number_of_science_courses_pending_while_applying ? originalField.school_maximum_number_of_science_courses_pending_while_applying.input : 0,
                        notes: field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes,
                    } : originalField.school_maximum_number_of_science_courses_pending_while_applying,
                    school_minimum_grade_required_for_pending_courses: field.edited_school_minimum_grade_required_for_pending_courses.notes ? {
                        input: originalField.school_minimum_grade_required_for_pending_courses ? originalField.school_minimum_grade_required_for_pending_courses.input : '',
                        notes: field.edited_school_minimum_grade_required_for_pending_courses.notes,
                    } : originalField.school_minimum_grade_required_for_pending_courses,
                    school_semester_pending_courses_must_be_completed: field.edited_school_semester_pending_courses_must_be_completed.notes ? {
                        input: originalField.school_semester_pending_courses_must_be_completed ? originalField.school_semester_pending_courses_must_be_completed.input : '',
                        notes: field.edited_school_semester_pending_courses_must_be_completed.notes,
                    } : originalField.school_semester_pending_courses_must_be_completed,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_all_courses_most_be_completed_before_applying.input === null && field.edited_school_courses_can_be_in_progress_while_applying.input === null && 
                        field.edited_school_date_pending_courses_must_be_completed.input === null && field.edited_school_maximum_number_of_courses_pending_while_applying.input === null && 
                        field.edited_school_maximum_number_of_credits_pending_while_applying.input === null && field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === null && 
                        field.edited_school_minimum_grade_required_for_pending_courses.input === null && field.edited_school_semester_pending_courses_must_be_completed.input === null) ? null : true,
                    edited_school_all_courses_most_be_completed_before_applying: {
                        ...field.edited_school_all_courses_most_be_completed_before_applying,
                        input: field.edited_school_all_courses_most_be_completed_before_applying.input === originalField.school_all_courses_most_be_completed_before_applying ? null : field.edited_school_all_courses_most_be_completed_before_applying.input,
                        prev: field.edited_school_all_courses_most_be_completed_before_applying.input === originalField.school_all_courses_most_be_completed_before_applying ? null : field.edited_school_all_courses_most_be_completed_before_applying.input,
                    },
                    edited_school_courses_can_be_in_progress_while_applying: {
                        ...field.edited_school_courses_can_be_in_progress_while_applying,
                        input: field.edited_school_courses_can_be_in_progress_while_applying.input === originalField.school_courses_can_be_in_progress_while_applying ? null : field.edited_school_courses_can_be_in_progress_while_applying.input,
                        prev: field.edited_school_courses_can_be_in_progress_while_applying.input === originalField.school_courses_can_be_in_progress_while_applying ? null : field.edited_school_courses_can_be_in_progress_while_applying.input,
                    },
                    edited_school_date_pending_courses_must_be_completed: {
                        ...field.edited_school_date_pending_courses_must_be_completed,
                        input: field.edited_school_date_pending_courses_must_be_completed.input === (originalField.school_date_pending_courses_must_be_completed && originalField.school_date_pending_courses_must_be_completed.input) ? null : field.edited_school_date_pending_courses_must_be_completed.input,
                        prev: field.edited_school_date_pending_courses_must_be_completed.input === (originalField.school_date_pending_courses_must_be_completed && originalField.school_date_pending_courses_must_be_completed.input) ? null : field.edited_school_date_pending_courses_must_be_completed.input,
                    },
                    edited_school_maximum_number_of_courses_pending_while_applying: {
                        ...field.edited_school_maximum_number_of_courses_pending_while_applying,
                        input: field.edited_school_maximum_number_of_courses_pending_while_applying.input === (originalField.school_maximum_number_of_courses_pending_while_applying && originalField.school_maximum_number_of_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_courses_pending_while_applying.input,
                        prev: field.edited_school_maximum_number_of_courses_pending_while_applying.input === (originalField.school_maximum_number_of_courses_pending_while_applying && originalField.school_maximum_number_of_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_courses_pending_while_applying.input,
                    },
                    edited_school_maximum_number_of_credits_pending_while_applying: {
                        ...field.edited_school_maximum_number_of_credits_pending_while_applying,
                        input: field.edited_school_maximum_number_of_credits_pending_while_applying.input === (originalField.school_maximum_number_of_credits_pending_while_applying && originalField.school_maximum_number_of_credits_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_credits_pending_while_applying.input,
                        prev: field.edited_school_maximum_number_of_credits_pending_while_applying.input === (originalField.school_maximum_number_of_credits_pending_while_applying && originalField.school_maximum_number_of_credits_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_credits_pending_while_applying.input,
                    },
                    edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
                        ...field.edited_school_maximum_number_of_non_science_courses_pending_while_applying,
                        input: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === (originalField.school_maximum_number_of_non_science_courses_pending_while_applying && originalField.school_maximum_number_of_non_science_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input ,
                        prev: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === (originalField.school_maximum_number_of_non_science_courses_pending_while_applying && originalField.school_maximum_number_of_non_science_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input,
                    },
                    edited_school_maximum_number_of_science_courses_pending_while_applying: {
                        ...field.edited_school_maximum_number_of_science_courses_pending_while_applying,
                        input: field.edited_school_maximum_number_of_science_courses_pending_while_applying.input === (originalField.school_maximum_number_of_science_courses_pending_while_applying && originalField.school_maximum_number_of_science_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_science_courses_pending_while_applying.input,
                        prev: field.edited_school_maximum_number_of_science_courses_pending_while_applying.input === (originalField.school_maximum_number_of_science_courses_pending_while_applying && originalField.school_maximum_number_of_science_courses_pending_while_applying.input) ? null : field.edited_school_maximum_number_of_science_courses_pending_while_applying.input,
                    },
                    edited_school_minimum_grade_required_for_pending_courses: {
                        ...field.edited_school_minimum_grade_required_for_pending_courses,
                        input: field.edited_school_minimum_grade_required_for_pending_courses.input === (originalField.school_minimum_grade_required_for_pending_courses && originalField.school_minimum_grade_required_for_pending_courses.input) ? null : field.edited_school_minimum_grade_required_for_pending_courses.input,
                        prev: field.edited_school_minimum_grade_required_for_pending_courses.input === (originalField.school_minimum_grade_required_for_pending_courses && originalField.school_minimum_grade_required_for_pending_courses.input) ? null : field.edited_school_minimum_grade_required_for_pending_courses.input,
                    },
                    edited_school_semester_pending_courses_must_be_completed: {
                        ...field.edited_school_semester_pending_courses_must_be_completed,
                        input: field.edited_school_semester_pending_courses_must_be_completed.input === (originalField.school_semester_pending_courses_must_be_completed && originalField.school_semester_pending_courses_must_be_completed.input) ? null : field.edited_school_semester_pending_courses_must_be_completed.input,
                        prev: field.edited_school_semester_pending_courses_must_be_completed.input === (originalField.school_semester_pending_courses_must_be_completed && originalField.school_semester_pending_courses_must_be_completed.input) ? null : field.edited_school_semester_pending_courses_must_be_completed.input,
                    }
                }
            })
        }
    } else {
        if (name === 'edited_school_grade_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_grade_criteria: {
                    ...newSchool.school_grade_criteria,
                    school_minimum_grade_required_for_all_courses: field.edited_school_minimum_grade_required_for_all_courses.input!,
                    school_grade_criteria_note_section: field.notes ? field.notes : newSchool.school_grade_criteria.school_grade_criteria_note_section,
                },
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_minimum_grade_required_for_all_courses: {
                        input: null,
                        prev: null,
                    }
                }
            })
        } else if (name === 'edited_school_time_frame_criteria') {
            const field = newSchool[name];
            const originalField = newSchool.school_time_frame_criteria;
            setNewSchool({
                ...newSchool,
                school_time_frame_criteria: {
                    ...newSchool.school_time_frame_criteria,
                    school_time_frame_criteria_note_section: field.notes ? field.notes : originalField.school_time_frame_criteria_note_section,
                    school_time_frame_all_courses_must_be_completed: {
                        input: field.edited_school_time_frame_all_courses_must_be_completed.input ? field.edited_school_time_frame_all_courses_must_be_completed.input : originalField.school_time_frame_all_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_all_courses_must_be_completed.notes ? field.edited_school_time_frame_all_courses_must_be_completed.notes : originalField.school_time_frame_all_courses_must_be_completed.notes,
                    },
                    school_time_frame_math_courses_must_be_completed: {
                        input: field.edited_school_time_frame_math_courses_must_be_completed.input ? field.edited_school_time_frame_math_courses_must_be_completed.input : originalField.school_time_frame_math_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_math_courses_must_be_completed.notes ? field.edited_school_time_frame_math_courses_must_be_completed.notes : originalField.school_time_frame_math_courses_must_be_completed.notes,
                    },
                    school_time_frame_science_courses_must_be_completed: {
                        input: field.edited_school_time_frame_science_courses_must_be_completed.input ? field.edited_school_time_frame_science_courses_must_be_completed.input : originalField.school_time_frame_science_courses_must_be_completed.input,
                        notes: field.edited_school_time_frame_science_courses_must_be_completed.notes ? field.edited_school_time_frame_science_courses_must_be_completed.notes : originalField.school_time_frame_science_courses_must_be_completed.notes,
                    }
                },
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_time_frame_all_courses_must_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_time_frame_math_courses_must_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_time_frame_science_courses_must_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
    
                }
            })
        } else if (name === 'edited_school_prerequisite_completion_criteria') {
            const field = newSchool[name];
            const originalField = newSchool.school_prerequisite_completion_criteria;
            setNewSchool({
                ...newSchool,
                school_prerequisite_completion_criteria: {
                    ...originalField,
                    school_prerequisite_completion_criteria_note_section: field.notes ? field.notes : originalField.school_prerequisite_completion_criteria_note_section,
                    school_date_pending_courses_must_be_completed: field.edited_school_date_pending_courses_must_be_completed.input !== null ? {
                        input: field.edited_school_date_pending_courses_must_be_completed.input,
                        notes: field.edited_school_date_pending_courses_must_be_completed.notes ? field.edited_school_date_pending_courses_must_be_completed.notes : originalField.school_date_pending_courses_must_be_completed ? originalField.school_date_pending_courses_must_be_completed.notes : [],
                    } : originalField.school_date_pending_courses_must_be_completed,
                    school_maximum_number_of_courses_pending_while_applying: field.edited_school_maximum_number_of_courses_pending_while_applying.input !== null ? {
                        input: field.edited_school_maximum_number_of_courses_pending_while_applying.input,
                        notes: field.edited_school_maximum_number_of_courses_pending_while_applying.notes ? field.edited_school_maximum_number_of_courses_pending_while_applying.notes : originalField.school_maximum_number_of_courses_pending_while_applying ? originalField.school_maximum_number_of_courses_pending_while_applying.notes : [],
                    } : originalField.school_maximum_number_of_courses_pending_while_applying,
                    school_maximum_number_of_credits_pending_while_applying: field.edited_school_maximum_number_of_credits_pending_while_applying.input !== null ? {
                        input: field.edited_school_maximum_number_of_credits_pending_while_applying.input,
                        notes: field.edited_school_maximum_number_of_credits_pending_while_applying.notes ? field.edited_school_maximum_number_of_credits_pending_while_applying.notes : originalField.school_maximum_number_of_credits_pending_while_applying ? originalField.school_maximum_number_of_credits_pending_while_applying.notes : [],
                    } : originalField.school_maximum_number_of_credits_pending_while_applying,
                    school_maximum_number_of_non_science_courses_pending_while_applying: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input !== null ? {
                        input: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input,
                        notes: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes ? field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.notes : originalField.school_maximum_number_of_non_science_courses_pending_while_applying ? originalField.school_maximum_number_of_non_science_courses_pending_while_applying.notes : [],
                    } : originalField.school_maximum_number_of_non_science_courses_pending_while_applying,
                    school_maximum_number_of_science_courses_pending_while_applying: field.edited_school_maximum_number_of_science_courses_pending_while_applying.input !== null ? {
                        input: field.edited_school_maximum_number_of_science_courses_pending_while_applying.input,
                        notes: field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes ? field.edited_school_maximum_number_of_science_courses_pending_while_applying.notes : originalField.school_maximum_number_of_science_courses_pending_while_applying ? originalField.school_maximum_number_of_science_courses_pending_while_applying.notes : [],
                    } : originalField.school_maximum_number_of_science_courses_pending_while_applying,
                    school_minimum_grade_required_for_pending_courses: field.edited_school_minimum_grade_required_for_pending_courses.input !== null ? {
                        input: field.edited_school_minimum_grade_required_for_pending_courses.input,
                        notes: field.edited_school_minimum_grade_required_for_pending_courses.notes ? field.edited_school_minimum_grade_required_for_pending_courses.notes : originalField.school_minimum_grade_required_for_pending_courses ? originalField.school_minimum_grade_required_for_pending_courses.notes : [],
                    } : originalField.school_minimum_grade_required_for_pending_courses,
                    school_semester_pending_courses_must_be_completed: field.edited_school_semester_pending_courses_must_be_completed.input !== null ? {
                        input: field.edited_school_semester_pending_courses_must_be_completed.input,
                        notes: field.edited_school_semester_pending_courses_must_be_completed.notes ? field.edited_school_semester_pending_courses_must_be_completed.notes : originalField.school_semester_pending_courses_must_be_completed ? originalField.school_semester_pending_courses_must_be_completed.notes : [],
                    } : originalField.school_semester_pending_courses_must_be_completed,
                    school_all_courses_most_be_completed_before_applying: field.edited_school_all_courses_most_be_completed_before_applying.input === null ? originalField.school_all_courses_most_be_completed_before_applying : field.edited_school_all_courses_most_be_completed_before_applying.input === null,
                    school_courses_can_be_in_progress_while_applying: field.edited_school_courses_can_be_in_progress_while_applying.input === null ? originalField.school_courses_can_be_in_progress_while_applying : field.edited_school_courses_can_be_in_progress_while_applying.input,
                },
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_all_courses_most_be_completed_before_applying: {
                        input: null,
                        prev: null,
                    },
                    edited_school_courses_can_be_in_progress_while_applying: {
                        input: null,
                        prev: null,
                    },
                    edited_school_date_pending_courses_must_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_maximum_number_of_courses_pending_while_applying: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_maximum_number_of_credits_pending_while_applying: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_maximum_number_of_science_courses_pending_while_applying: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_minimum_grade_required_for_pending_courses: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_semester_pending_courses_must_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                }
            })
        }
        // if (name === 'edited_school_pass_fail_criteria') {
        //     const field = newSchool[name];
        //     setNewSchool({
        //         ...newSchool,
        //         school_pass_fail_criteria: {
        //             ...newSchool.school_pass_fail_criteria,
        //             school_pass_fail_grade_accepted: field.edited_school_pass_fail_grade_accepted.input!,
        //         },
        //         [name]: {
        //             ...field,
        //             isEditMode: false,
        //             edited_school_pass_fail_grade_accepted: {
        //                 ...field.edited_school_pass_fail_grade_accepted,
        //                 input: null,
        //                 prev: null,
        //             }
        //         }
        //     })
        //  } else if (name === 'edited_school_ap_criteria') {
        //     const field = newSchool[name];
        //     setNewSchool({
        //         ...newSchool,
        //         school_ap_criteria: {
        //             ...newSchool.school_ap_criteria,
        //             school_ap_courses_accepted: field.edited_school_ap_courses_accepted.input!,
        //         },
        //         [name]: {
        //             ...field,
        //             isEditMode: false,
        //             edited_school_ap_courses_accepted: {
        //                 ...field.edited_school_ap_courses_accepted,
        //                 input: null,
        //                 prev: null,
        //             }
        //         }
        //     })
        // } else if (name === 'edited_school_community_college_criteria') {
        //     const field = newSchool[name];
        //     setNewSchool({
        //         ...newSchool,
        //         school_community_college_criteria: {
        //             ...newSchool.school_community_college_criteria,
        //             school_community_college_credits_accepted: field.edited_school_community_college_credits_accepted.input!,
        //         },
        //         [name]: {
        //             ...field,
        //             isEditMode: false,
        //             edited_school_community_college_credits_accepted: {
        //                 ...field.edited_school_community_college_credits_accepted,
        //                 input: null,
        //                 prev: null,
        //             }
        //         }
        //     })
        // } else if (name === 'edited_school_clep_criteria') {
        //     const field = newSchool[name];
        //     setNewSchool({
        //         ...newSchool,
        //         school_clep_criteria: {
        //             ...newSchool.school_clep_criteria,
        //             school_clep_credits_accepted: field.edited_school_clep_credits_accepted.input!,
        //         },  
        //         [name]: {
        //             ...field,
        //             isEditMode: false,
        //             edited_school_clep_credits_accepted: {
        //                 ...field.edited_school_clep_credits_accepted,
        //                 input: null,
        //                 prev: null,
        //             }
        //         }
        //     })
        // } else if (name === 'edited_school_online_courses_criteria') {
        //     const field = newSchool[name];
        //     setNewSchool({
        //         ...newSchool,
        //         school_online_courses_criteria: {
        //             ...newSchool.school_online_courses_criteria,
        //             school_online_courses_accepted: field.edited_school_online_courses_accepted.input!,
        //         },
        //         [name]: {
        //             ...field,
        //             isEditMode: false,
        //             edited_school_online_courses_accepted: {
        //                 ...field.edited_school_online_courses_accepted,
        //                 input: null,
        //                 prev: null,
        //             }
        //         }
        //     })
        // }
    }

}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_grade_criteria') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_minimum_grade_required_for_all_courses: {
                    input: null,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_time_frame_criteria') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_time_frame_all_courses_must_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_time_frame_math_courses_must_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_time_frame_science_courses_must_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },

            }
        })
    } else if (name === 'edited_school_prerequisite_completion_criteria') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_all_courses_most_be_completed_before_applying: {
                    input: null,
                    prev: null,
                },
                edited_school_courses_can_be_in_progress_while_applying: {
                    input: null,
                    prev: null,
                },
                edited_school_date_pending_courses_must_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_maximum_number_of_courses_pending_while_applying: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_maximum_number_of_credits_pending_while_applying: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_maximum_number_of_science_courses_pending_while_applying: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_minimum_grade_required_for_pending_courses: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_semester_pending_courses_must_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
            }
        })
    }

}

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_grade_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_minimum_grade_required_for_all_courses.input === null ? null : true,
                edited_school_minimum_grade_required_for_all_courses: {
                    ...field.edited_school_minimum_grade_required_for_all_courses,
                    input: field.edited_school_minimum_grade_required_for_all_courses.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_time_frame_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_time_frame_all_courses_must_be_completed.input === null && field.edited_school_time_frame_math_courses_must_be_completed.input === null && 
                    field.edited_school_time_frame_science_courses_must_be_completed.input === null) ? null: true,
                edited_school_time_frame_all_courses_must_be_completed: {
                    ...field.edited_school_time_frame_all_courses_must_be_completed,
                    input: field.edited_school_time_frame_all_courses_must_be_completed.prev,
                    prev: null,
                },
                edited_school_time_frame_math_courses_must_be_completed: {
                    ...field.edited_school_time_frame_math_courses_must_be_completed,
                    input: field.edited_school_time_frame_math_courses_must_be_completed.prev,
                    prev: null,
                },
                edited_school_time_frame_science_courses_must_be_completed: {
                    ...field.edited_school_time_frame_science_courses_must_be_completed,
                    input: field.edited_school_time_frame_science_courses_must_be_completed.prev,
                    prev: null,
                }

            }
        })
    } else if (name === 'edited_school_prerequisite_completion_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_all_courses_most_be_completed_before_applying.input === null && field.edited_school_courses_can_be_in_progress_while_applying.input === null && 
                    field.edited_school_date_pending_courses_must_be_completed.input === null && field.edited_school_maximum_number_of_courses_pending_while_applying.input === null && 
                    field.edited_school_maximum_number_of_credits_pending_while_applying.input === null && field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.input === null && 
                    field.edited_school_minimum_grade_required_for_pending_courses.input === null && field.edited_school_semester_pending_courses_must_be_completed.input === null) ? null : true,
                edited_school_all_courses_most_be_completed_before_applying: {
                    ...field.edited_school_all_courses_most_be_completed_before_applying,
                    input: field.edited_school_all_courses_most_be_completed_before_applying.prev,
                    prev: null,
                },
                edited_school_courses_can_be_in_progress_while_applying: {
                    ...field.edited_school_courses_can_be_in_progress_while_applying,
                    input: field.edited_school_courses_can_be_in_progress_while_applying.prev,
                    prev: null,
                },
                edited_school_date_pending_courses_must_be_completed: {
                    ...field.edited_school_date_pending_courses_must_be_completed,
                    input: field.edited_school_date_pending_courses_must_be_completed.prev,
                    prev: null,
                },
                edited_school_maximum_number_of_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_courses_pending_while_applying.prev,
                    prev: null,
                },
                edited_school_maximum_number_of_credits_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_credits_pending_while_applying,
                    input: field.edited_school_maximum_number_of_credits_pending_while_applying.prev,
                    prev: null,
                },
                edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_non_science_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_non_science_courses_pending_while_applying.prev,
                    prev: null,
                },
                edited_school_maximum_number_of_science_courses_pending_while_applying: {
                    ...field.edited_school_maximum_number_of_science_courses_pending_while_applying,
                    input: field.edited_school_maximum_number_of_science_courses_pending_while_applying.prev,
                    prev: null,
                },
                edited_school_minimum_grade_required_for_pending_courses: {
                    ...field.edited_school_minimum_grade_required_for_pending_courses,
                    input: field.edited_school_minimum_grade_required_for_pending_courses.prev,
                    prev: null,
                },
                edited_school_semester_pending_courses_must_be_completed: {
                    ...field.edited_school_semester_pending_courses_must_be_completed,
                    input: field.edited_school_semester_pending_courses_must_be_completed.prev,
                    prev: null,
                }
            }
        })
    }

}

