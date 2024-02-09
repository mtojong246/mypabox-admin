import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";




export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_paid_experience_required') {
        const field = newSchool[name];
        const originalField = newSchool.school_paid_experience_required;
        setNewSchool({
            ...newSchool,
            edited_school_paid_experience_required: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true, 
                notes: field.notes === null ? originalField.school_paid_experience_required_notes : field.notes,
            }
        })
    } else if (name === 'edited_school_patient_experience') {
        const field = newSchool[name];
        const originalField = newSchool.school_patient_experience;
        setNewSchool({
            ...newSchool,
            edited_school_patient_experience: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_patient_care_experience_general_notes : field.notes,
                input: (field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === null && field.edited_school_minimum_patient_care_experience_hours_required.input=== null && 
                    field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === null && field.edited_school_patient_experience_required.input === null) ? null : true,
                edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle,
                    input: field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === null ? originalField.school_average_patient_care_experience_hours_accepted_previous_cycle : field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input,
                },
                edited_school_minimum_patient_care_experience_hours_required: {
                    ...field.edited_school_minimum_patient_care_experience_hours_required,
                    input: field.edited_school_minimum_patient_care_experience_hours_required.input === null ? originalField.school_minimum_patient_care_experience_hours_required && originalField.school_minimum_patient_care_experience_hours_required.input : field.edited_school_minimum_patient_care_experience_hours_required.input,
                    notes: field.edited_school_minimum_patient_care_experience_hours_required.notes === null ? originalField.school_minimum_patient_care_experience_hours_required && originalField.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes : field.edited_school_minimum_patient_care_experience_hours_required.notes,
                },
                edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === null ? originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input,
                    notes: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes === null ? originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes,
                },
                edited_school_patient_experience_required: {
                    ...field.edited_school_patient_experience_required,
                    input: field.edited_school_patient_experience_required.input === null ? originalField.school_patient_experience_required : field.edited_school_patient_experience_required.input,
                }
            }
        })
    } else if (name === 'edited_school_healthcare_experience') {
        const field = newSchool[name];
        const originalField = newSchool.school_healthcare_experience;
        setNewSchool({
            ...newSchool,
            edited_school_healthcare_experience: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_healthcare_experience_general_notes : field.notes,
                input: (field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === null && field.edited_school_healthcare_experience_required.input === null && 
                    field.edited_school_minimum_healthcare_experience_hours_required.input === null && field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === null) ? null : true,
                edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle,
                    input: field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === null ? originalField.school_average_healthcare_experience_hours_accepted_previous_cycle : field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input,
                },
                edited_school_healthcare_experience_required: {
                    ...field.edited_school_healthcare_experience_required,
                    input: field.edited_school_healthcare_experience_required.input === null ? originalField.school_healthcare_experience_required : field.edited_school_healthcare_experience_required.input,
                },
                edited_school_minimum_healthcare_experience_hours_required: {
                    ...field.edited_school_minimum_healthcare_experience_hours_required,
                    input: field.edited_school_minimum_healthcare_experience_hours_required.input === null ? originalField.school_minimum_healthcare_experience_hours_required && originalField.school_minimum_healthcare_experience_hours_required.input : field.edited_school_minimum_healthcare_experience_hours_required.input,
                    notes: field.edited_school_minimum_healthcare_experience_hours_required.notes === null ? originalField.school_minimum_healthcare_experience_hours_required && originalField.school_minimum_healthcare_experience_hours_required.school_minimum_healthcare_experience_hours_required_notes : field.edited_school_minimum_healthcare_experience_hours_required.notes,
                },
                edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === null ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed && originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input : field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input,
                    notes: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes === null ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed && originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes : field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes,
                }
            }
        })
    } else if (name === 'edited_school_community_service') {
        const field = newSchool[name];
        const originalField = newSchool.school_community_service;
        setNewSchool({
            ...newSchool,
            edited_school_community_service: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_community_service_general_notes : field.notes,
                input: (field.edited_school_average_community_service_hours_accepted_previous_cycle.input === null && field.edited_school_community_service_required.input === null && 
                    field.edited_school_community_service_recommended.input === null && field.edited_school_minimum_community_service_hours_required.input === null && 
                    field.edited_school_minimum_community_service_hours_recommended.input === null) ? null : true,
                edited_school_average_community_service_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_community_service_hours_accepted_previous_cycle,
                    input: field.edited_school_average_community_service_hours_accepted_previous_cycle.input === null ? originalField.school_average_community_service_hours_accepted_previous_cycle : field.edited_school_average_community_service_hours_accepted_previous_cycle.input
                },
                edited_school_community_service_required: {
                    ...field.edited_school_community_service_required,
                    input: field.edited_school_community_service_required.input === null ? originalField.school_community_service_required : field.edited_school_community_service_required.input,
                },
                edited_school_community_service_recommended: {
                    ...field.edited_school_community_service_recommended,
                    input: field.edited_school_community_service_recommended.input === null ? originalField.school_community_service_recommended : field.edited_school_community_service_recommended.input,
                },
                edited_school_minimum_community_service_hours_required: {
                    ...field.edited_school_minimum_community_service_hours_required,
                    input: field.edited_school_minimum_community_service_hours_required.input === null ? originalField.school_minimum_community_service_hours_required && originalField.school_minimum_community_service_hours_required.input : field.edited_school_minimum_community_service_hours_required.input,
                    notes: field.edited_school_minimum_community_service_hours_required.notes === null ? originalField.school_minimum_community_service_hours_required && originalField.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes : field.edited_school_minimum_community_service_hours_required.notes,
                },
                edited_school_minimum_community_service_hours_recommended: {
                    ...field.edited_school_minimum_community_service_hours_recommended,
                    input: field.edited_school_minimum_community_service_hours_recommended.input === null ? originalField.school_minimum_community_service_hours_recommended && originalField.school_minimum_community_service_hours_recommended.input : field.edited_school_minimum_community_service_hours_recommended.input,
                    notes: field.edited_school_minimum_community_service_hours_recommended.notes === null ? originalField.school_minimum_community_service_hours_recommended && originalField.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes : field.edited_school_minimum_community_service_hours_recommended.notes,
                }
            }
        })
    } else if (name === 'edited_school_volunteer_service') {
        const field = newSchool[name];
        const originalField = newSchool.school_volunteer_service;
        setNewSchool({
            ...newSchool,
            edited_school_volunteer_service: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_volunteer_service_general_notes : field.notes,
                input: (field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === null && field.edited_school_volunteer_service_required.input === null && 
                    field.edited_school_minimum_volunteer_service_hours_required.input === null && field.edited_school_minimum_volunteer_service_hours_recommended.input === null)  ? null : true,
                edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_volunteer_service_hours_accepted_previous_cycle,
                    input: field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === null ? originalField.school_average_volunteer_service_hours_accepted_previous_cycle : field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input,
                },
                edited_school_volunteer_service_required: {
                    ...field.edited_school_volunteer_service_required,
                    input: field.edited_school_volunteer_service_required.input === null ? originalField.school_volunteer_service_required : field.edited_school_volunteer_service_required.input,
                },
                edited_school_volunteer_service_recommended: {
                    ...field.edited_school_volunteer_service_recommended,
                    input: field.edited_school_volunteer_service_recommended.input === null ? originalField.school_volunteer_service_recommended : field.edited_school_volunteer_service_recommended.input,
                },
                edited_school_minimum_volunteer_service_hours_required: {
                    ...field.edited_school_minimum_volunteer_service_hours_required,
                    input: field.edited_school_minimum_volunteer_service_hours_required.input === null ? originalField.school_minimum_volunteer_service_hours_required && originalField.school_minimum_volunteer_service_hours_required.input : field.edited_school_minimum_volunteer_service_hours_required.input,
                    notes: field.edited_school_minimum_volunteer_service_hours_required.notes === null ? originalField.school_minimum_volunteer_service_hours_required && originalField.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes : field.edited_school_minimum_volunteer_service_hours_required.notes,
                },
                edited_school_minimum_volunteer_service_hours_recommended: {
                    ...field.edited_school_minimum_volunteer_service_hours_recommended,
                    input: field.edited_school_minimum_volunteer_service_hours_recommended.input === null ? originalField.school_minimum_volunteer_service_hours_recommended && originalField.school_minimum_volunteer_service_hours_recommended.input : field.edited_school_minimum_volunteer_service_hours_recommended.input,
                    notes: field.edited_school_minimum_volunteer_service_hours_recommended.notes === null ? originalField.school_minimum_volunteer_service_hours_recommended && originalField.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes : field.edited_school_minimum_volunteer_service_hours_recommended.notes,
                }
            }
        })
    } 
}


export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_paid_experience_required') {
            const field = newSchool[name];
            const originalField = newSchool.school_paid_experience_required;
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    school_paid_experience_required_notes: field.notes ? field.notes : newSchool.school_paid_experience_required.school_paid_experience_required_notes,
                },
                edited_school_paid_experience_required: {
                    ...field,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false, 
                }
            })
        } else if (name === 'edited_school_patient_experience') {
            const field = newSchool[name];
            const originalField = newSchool.school_patient_experience;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...newSchool.school_patient_experience,
                    school_patient_care_experience_general_notes: field.notes ? field.notes : newSchool.school_patient_experience.school_patient_care_experience_general_notes,
                    school_minimum_patient_care_experience_hours_required: field.edited_school_minimum_patient_care_experience_hours_required ? {
                        input: newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : 0,
                        school_minimum_patient_care_experience_hours_required_notes: field.edited_school_minimum_patient_care_experience_hours_required.notes ? field.edited_school_minimum_patient_care_experience_hours_required.notes : newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes : [],
                    } : originalField.school_minimum_patient_care_experience_hours_required,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? {
                        input: newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes ? field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes : originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ?  originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : [],
                    } : originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                },
                edited_school_patient_experience: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === null && field.edited_school_minimum_patient_care_experience_hours_required.input=== null && 
                        field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === null && field.edited_school_patient_experience_required.input === null) ? null : true,
                    edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                        ...field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle,
                        input: field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === originalField.school_average_patient_care_experience_hours_accepted_previous_cycle ? null : field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input,
                        prev: field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === originalField.school_average_patient_care_experience_hours_accepted_previous_cycle ? null : field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input,
                    },
                    edited_school_minimum_patient_care_experience_hours_required: {
                        ...field.edited_school_minimum_patient_care_experience_hours_required,
                        input: field.edited_school_minimum_patient_care_experience_hours_required.input === (originalField.school_minimum_patient_care_experience_hours_required && originalField.school_minimum_patient_care_experience_hours_required.input) ? null : field.edited_school_minimum_patient_care_experience_hours_required.input,
                        prev: field.edited_school_minimum_patient_care_experience_hours_required.input === (originalField.school_minimum_patient_care_experience_hours_required && originalField.school_minimum_patient_care_experience_hours_required.input) ? null : field.edited_school_minimum_patient_care_experience_hours_required.input,
                    },
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        ...field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                        input: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === (originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input) ? null : field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input,
                        prev: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === (originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed && originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input) ? null : field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input,
                    },
                    edited_school_patient_experience_required: {
                        ...field.edited_school_patient_experience_required,
                        input: field.edited_school_patient_experience_required.input === originalField.school_patient_experience_required ? null : field.edited_school_patient_experience_required.input,
                        prev: field.edited_school_patient_experience_required.input === originalField.school_patient_experience_required ? null : field.edited_school_patient_experience_required.input,
                    }
                }
            })
        } else if (name === 'edited_school_healthcare_experience') {
            const field = newSchool[name];
            const originalField = newSchool.school_healthcare_experience;
            setNewSchool({
                ...newSchool,
                school_healthcare_experience: {
                    ...newSchool.school_healthcare_experience,
                    school_healthcare_experience_general_notes: field.notes === null ? originalField.school_healthcare_experience_general_notes : field.notes,
                    school_minimum_healthcare_experience_hours_required: field.edited_school_minimum_healthcare_experience_hours_required ?  {
                        input: originalField.school_minimum_healthcare_experience_hours_required ? originalField.school_minimum_healthcare_experience_hours_required.input : 0,
                        school_minimum_healthcare_experience_hours_required_notes: field.edited_school_minimum_healthcare_experience_hours_required.notes ? field.edited_school_minimum_healthcare_experience_hours_required.notes : originalField.school_minimum_healthcare_experience_hours_required ? originalField.school_minimum_healthcare_experience_hours_required.school_minimum_healthcare_experience_hours_required_notes : [],
                    } : originalField.school_minimum_healthcare_experience_hours_required,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? {
                        input: originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes ? field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes : originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes : [],  
                    } : originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed,
                },
                edited_school_healthcare_experience: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === null && field.edited_school_healthcare_experience_required.input === null && 
                        field.edited_school_minimum_healthcare_experience_hours_required.input === null && field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === null) ? null : true,
                    edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
                        ...field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle,
                        input: field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === originalField.school_average_healthcare_experience_hours_accepted_previous_cycle ? null : field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input,
                        prev: field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === originalField.school_average_healthcare_experience_hours_accepted_previous_cycle ? null : field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input,
                    },
                    edited_school_healthcare_experience_required: {
                        ...field.edited_school_healthcare_experience_required,
                        input: field.edited_school_healthcare_experience_required.input === originalField.school_healthcare_experience_required ? null : field.edited_school_healthcare_experience_required.input,
                        prev: field.edited_school_healthcare_experience_required.input === originalField.school_healthcare_experience_required ? null : field.edited_school_healthcare_experience_required.input,
                    },
                    edited_school_minimum_healthcare_experience_hours_required: {
                        ...field.edited_school_minimum_healthcare_experience_hours_required,
                        input: field.edited_school_minimum_healthcare_experience_hours_required.input === (originalField.school_minimum_healthcare_experience_hours_required && originalField.school_minimum_healthcare_experience_hours_required.input) ? null : field.edited_school_minimum_healthcare_experience_hours_required.input,
                        prev: field.edited_school_minimum_healthcare_experience_hours_required.input === (originalField.school_minimum_healthcare_experience_hours_required && originalField.school_minimum_healthcare_experience_hours_required.input) ? null : field.edited_school_minimum_healthcare_experience_hours_required.input,
                    },
                    edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
                        ...field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed,
                        input: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === (originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed && originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input) ? null : field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input,
                        prev: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === (originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed && originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input) ? null : field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input,
                    }
                }
            })
        } else if (name === 'edited_school_community_service') {
            const field = newSchool[name];
            const originalField = newSchool.school_community_service;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...newSchool.school_community_service,
                    school_community_service_general_notes: field.notes === null ? originalField.school_community_service_general_notes : field.notes,
                    school_minimum_community_service_hours_required: field.edited_school_minimum_community_service_hours_required ? {
                        input: originalField.school_minimum_community_service_hours_required ? originalField.school_minimum_community_service_hours_required.input : 0,
                        school_minimum_community_service_hours_required_notes: field.edited_school_minimum_community_service_hours_required.notes ? field.edited_school_minimum_community_service_hours_required.notes : originalField.school_minimum_community_service_hours_required ? originalField.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes : [], 
                    } : originalField.school_minimum_community_service_hours_required,
                    school_minimum_community_service_hours_recommended: field.edited_school_minimum_community_service_hours_recommended ? {
                        input: originalField.school_minimum_community_service_hours_recommended ? originalField.school_minimum_community_service_hours_recommended.input : 0,
                        school_minimum_community_service_hours_recommended_notes: field.edited_school_minimum_community_service_hours_recommended.notes ? field.edited_school_minimum_community_service_hours_recommended.notes : originalField.school_minimum_community_service_hours_recommended ? originalField.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes : [], 
                    } : originalField.school_minimum_community_service_hours_recommended,
                },
                edited_school_community_service: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_average_community_service_hours_accepted_previous_cycle.input === null && field.edited_school_community_service_required.input === null && 
                        field.edited_school_community_service_recommended.input === null && field.edited_school_minimum_community_service_hours_required.input === null && 
                        field.edited_school_minimum_community_service_hours_recommended.input === null) ? null : true,
                    edited_school_average_community_service_hours_accepted_previous_cycle: {
                        ...field.edited_school_average_community_service_hours_accepted_previous_cycle,
                        input: field.edited_school_average_community_service_hours_accepted_previous_cycle.input === originalField.school_average_community_service_hours_accepted_previous_cycle ? null : field.edited_school_average_community_service_hours_accepted_previous_cycle.input,
                        prev: field.edited_school_average_community_service_hours_accepted_previous_cycle.input === originalField.school_average_community_service_hours_accepted_previous_cycle ? null : field.edited_school_average_community_service_hours_accepted_previous_cycle.input,
                    },
                    edited_school_community_service_required: {
                        ...field.edited_school_community_service_required,
                        input: field.edited_school_community_service_required.input === originalField.school_community_service_required ? null : field.edited_school_community_service_required.input,
                        prev: field.edited_school_community_service_required.input === originalField.school_community_service_required ? null : field.edited_school_community_service_required.input,
                    },
                    edited_school_community_service_recommended: {
                        ...field.edited_school_community_service_recommended,
                        input: field.edited_school_community_service_recommended.input === originalField.school_community_service_recommended ? null : field.edited_school_community_service_recommended.input,
                        prev: field.edited_school_community_service_recommended.input === originalField.school_community_service_recommended ? null : field.edited_school_community_service_recommended.input,
                    },
                    edited_school_minimum_community_service_hours_required: {
                        ...field.edited_school_minimum_community_service_hours_required,
                        input: field.edited_school_minimum_community_service_hours_required.input === (originalField.school_minimum_community_service_hours_required && originalField.school_minimum_community_service_hours_required.input) ? null : field.edited_school_minimum_community_service_hours_required.input,
                        prev: field.edited_school_minimum_community_service_hours_required.input === (originalField.school_minimum_community_service_hours_required && originalField.school_minimum_community_service_hours_required.input) ? null : field.edited_school_minimum_community_service_hours_required.input,
                    },
                    edited_school_minimum_community_service_hours_recommended: {
                        ...field.edited_school_minimum_community_service_hours_recommended,
                        input: field.edited_school_minimum_community_service_hours_recommended.input === (originalField.school_minimum_community_service_hours_recommended && originalField.school_minimum_community_service_hours_recommended.input) ? null : field.edited_school_minimum_community_service_hours_recommended.input,
                        prev: field.edited_school_minimum_community_service_hours_recommended.input === (originalField.school_minimum_community_service_hours_recommended && originalField.school_minimum_community_service_hours_recommended.input) ? null : field.edited_school_minimum_community_service_hours_recommended.input,
                    }
                }
            })
        } else if (name === 'edited_school_volunteer_service') {
            const field = newSchool[name];
            const originalField = newSchool.school_volunteer_service;
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...newSchool.school_volunteer_service,
                    school_volunteer_service_general_notes: field.notes === null ? originalField.school_volunteer_service_general_notes : field.notes,
                    school_minimum_volunteer_service_hours_required: field.edited_school_minimum_volunteer_service_hours_required ? {
                        input: originalField.school_minimum_volunteer_service_hours_required ? originalField.school_minimum_volunteer_service_hours_required.input : 0,
                        school_minimum_volunteer_service_hours_required_notes: field.edited_school_minimum_volunteer_service_hours_required.notes ? field.edited_school_minimum_volunteer_service_hours_required.notes : originalField.school_minimum_volunteer_service_hours_required ? originalField.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes : [],
                    } : originalField.school_minimum_volunteer_service_hours_required,
                    school_minimum_volunteer_service_hours_recommended: field.edited_school_minimum_volunteer_service_hours_recommended ? {
                        input: originalField.school_minimum_volunteer_service_hours_recommended ? originalField.school_minimum_volunteer_service_hours_recommended.input : 0,
                        school_minimum_volunteer_service_hours_recommended_notes: field.edited_school_minimum_volunteer_service_hours_recommended.notes ? field.edited_school_minimum_volunteer_service_hours_recommended.notes : originalField.school_minimum_volunteer_service_hours_recommended ? originalField.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes : [],
                    } : originalField.school_minimum_volunteer_service_hours_recommended,
                },
                edited_school_volunteer_service: {
                    ...field,
                    isEditMode: false,
                    input: (field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === null && field.edited_school_volunteer_service_required.input === null && 
                        field.edited_school_minimum_volunteer_service_hours_required.input === null && field.edited_school_minimum_volunteer_service_hours_recommended.input === null)  ? null : true,
                    edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                        ...field.edited_school_average_volunteer_service_hours_accepted_previous_cycle,
                        input: field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === originalField.school_average_volunteer_service_hours_accepted_previous_cycle ? null : field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input,
                        prev: field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === originalField.school_average_volunteer_service_hours_accepted_previous_cycle ? null : field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input,
                    },
                    edited_school_volunteer_service_required: {
                        ...field.edited_school_volunteer_service_required,
                        input: field.edited_school_volunteer_service_required.input === originalField.school_volunteer_service_required ? null : field.edited_school_volunteer_service_required.input,
                        prev: field.edited_school_volunteer_service_required.input === originalField.school_volunteer_service_required ? null : field.edited_school_volunteer_service_required.input,
                    },
                    edited_school_volunteer_service_recommended: {
                        ...field.edited_school_volunteer_service_recommended,
                        input: field.edited_school_volunteer_service_recommended.input === originalField.school_volunteer_service_recommended ? null : field.edited_school_volunteer_service_recommended.input,
                        prev: field.edited_school_volunteer_service_recommended.input === originalField.school_volunteer_service_recommended ? null : field.edited_school_volunteer_service_recommended.input,
                    },
                    edited_school_minimum_volunteer_service_hours_required: {
                        ...field.edited_school_minimum_volunteer_service_hours_required,
                        input: field.edited_school_minimum_volunteer_service_hours_required.input === (originalField.school_minimum_volunteer_service_hours_required && originalField.school_minimum_volunteer_service_hours_required.input) ? null : field.edited_school_minimum_volunteer_service_hours_required.input,
                        prev: field.edited_school_minimum_volunteer_service_hours_required.input === (originalField.school_minimum_volunteer_service_hours_required && originalField.school_minimum_volunteer_service_hours_required.input) ? null : field.edited_school_minimum_volunteer_service_hours_required.input,
                    },
                    edited_school_minimum_volunteer_service_hours_recommended: {
                        ...field.edited_school_minimum_volunteer_service_hours_recommended,
                        input: field.edited_school_minimum_volunteer_service_hours_recommended.input === (originalField.school_minimum_volunteer_service_hours_recommended && originalField.school_minimum_volunteer_service_hours_recommended.input) ? null : field.edited_school_minimum_volunteer_service_hours_recommended.input,
                        prev: field.edited_school_minimum_volunteer_service_hours_recommended.input === (originalField.school_minimum_volunteer_service_hours_recommended && originalField.school_minimum_volunteer_service_hours_recommended.input) ? null : field.edited_school_minimum_volunteer_service_hours_recommended.input,
                    }
                }
            })
        } 
    } else {
        if (name === 'edited_school_paid_experience_required') {
            const field = newSchool[name];
            const originalField = newSchool.school_paid_experience_required;
            setNewSchool({
                ...newSchool,
                school_paid_experience_required: {
                    ...newSchool.school_paid_experience_required,
                    input: field.input === null ? originalField.input : field.input,
                    school_paid_experience_required_notes: field.notes ? field.notes : newSchool.school_paid_experience_required.school_paid_experience_required_notes,
                    
                },
                edited_school_paid_experience_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    notes: null,
                }
            })
        } else if (name === 'edited_school_patient_experience') {
            const field = newSchool[name];
            const originalField = newSchool.school_patient_experience;
            setNewSchool({
                ...newSchool,
                school_patient_experience: {
                    ...originalField,
                    school_patient_care_experience_general_notes: field.notes ? field.notes : newSchool.school_patient_experience.school_patient_care_experience_general_notes,
                    school_average_patient_care_experience_hours_accepted_previous_cycle: field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === null ? originalField.school_average_patient_care_experience_hours_accepted_previous_cycle : field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input,
                    school_minimum_patient_care_experience_hours_required: field.edited_school_minimum_patient_care_experience_hours_required ? {
                        input: field.edited_school_minimum_patient_care_experience_hours_required.input ? field.edited_school_minimum_patient_care_experience_hours_required.input : newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.input : 0,
                        school_minimum_patient_care_experience_hours_required_notes: field.edited_school_minimum_patient_care_experience_hours_required.notes ? field.edited_school_minimum_patient_care_experience_hours_required.notes : newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required ? newSchool.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes : [],
                    } : originalField.school_minimum_patient_care_experience_hours_required,
                    school_minimum_time_frame_patient_care_experience_needs_to_be_completed: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? {
                        input: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input ? field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ? newSchool.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes ? field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.notes : originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed ?  originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes : [],
                    } : originalField.school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                    school_patient_experience_required: field.edited_school_patient_experience_required.input === null ? originalField.school_patient_experience_required : field.edited_school_patient_experience_required.input,
                },
                edited_school_patient_experience: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_patient_care_experience_hours_required: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_patient_experience_required: {
                        input: null,
                        prev: null,
                    },
                }
            })
        } else if (name === 'edited_school_healthcare_experience') {
            const field = newSchool[name];
            const originalField = newSchool.school_healthcare_experience;
            setNewSchool({
                ...newSchool,
                school_healthcare_experience: {
                    ...newSchool.school_healthcare_experience,
                    school_healthcare_experience_general_notes: field.notes === null ? originalField.school_healthcare_experience_general_notes : field.notes,
                    school_minimum_healthcare_experience_hours_required: field.edited_school_minimum_healthcare_experience_hours_required ?  {
                        input: field.edited_school_minimum_healthcare_experience_hours_required.input ? field.edited_school_minimum_healthcare_experience_hours_required.input : originalField.school_minimum_healthcare_experience_hours_required ? originalField.school_minimum_healthcare_experience_hours_required.input : 0,
                        school_minimum_healthcare_experience_hours_required_notes: field.edited_school_minimum_healthcare_experience_hours_required.notes ? field.edited_school_minimum_healthcare_experience_hours_required.notes : originalField.school_minimum_healthcare_experience_hours_required ? originalField.school_minimum_healthcare_experience_hours_required.school_minimum_healthcare_experience_hours_required_notes : [],
                    } : originalField.school_minimum_healthcare_experience_hours_required,
                    school_minimum_time_frame_healthcare_experience_needs_to_be_completed: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? {
                        input: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input ? field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input : originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input : '',
                        school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes ? field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.notes : originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed ? originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes : [],  
                    } : originalField.school_minimum_time_frame_healthcare_experience_needs_to_be_completed,
                    school_average_healthcare_experience_hours_accepted_previous_cycle: field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === null ? originalField.school_average_healthcare_experience_hours_accepted_previous_cycle : field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input,
                    school_healthcare_experience_required: field.edited_school_healthcare_experience_required.input === null ? originalField.school_healthcare_experience_required : field.edited_school_healthcare_experience_required.input,
                },
                edited_school_healthcare_experience: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
                        input: null,
                        prev: null,
                    },
                    edited_school_healthcare_experience_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_healthcare_experience_hours_required: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                }
            })
        } else if (name === 'edited_school_community_service') {
            const field = newSchool[name];
            const originalField = newSchool.school_community_service;
            setNewSchool({
                ...newSchool,
                school_community_service: {
                    ...originalField,
                    school_community_service_general_notes: field.notes === null ? originalField.school_community_service_general_notes : field.notes,
                    school_minimum_community_service_hours_required: field.edited_school_minimum_community_service_hours_required ? {
                        input: field.edited_school_minimum_community_service_hours_required.input ? field.edited_school_minimum_community_service_hours_required.input :  originalField.school_minimum_community_service_hours_required ? originalField.school_minimum_community_service_hours_required.input : 0,
                        school_minimum_community_service_hours_required_notes: field.edited_school_minimum_community_service_hours_required.notes ? field.edited_school_minimum_community_service_hours_required.notes : originalField.school_minimum_community_service_hours_required ? originalField.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes : [], 
                    } : originalField.school_minimum_community_service_hours_required,
                    school_minimum_community_service_hours_recommended: field.edited_school_minimum_community_service_hours_recommended ? {
                        input: field.edited_school_minimum_community_service_hours_recommended.input ? field.edited_school_minimum_community_service_hours_recommended.input : originalField.school_minimum_community_service_hours_recommended ? originalField.school_minimum_community_service_hours_recommended.input : 0,
                        school_minimum_community_service_hours_recommended_notes: field.edited_school_minimum_community_service_hours_recommended.notes ? field.edited_school_minimum_community_service_hours_recommended.notes : originalField.school_minimum_community_service_hours_recommended ? originalField.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes : [], 
                    } : originalField.school_minimum_community_service_hours_recommended,
                    school_average_community_service_hours_accepted_previous_cycle: field.edited_school_average_community_service_hours_accepted_previous_cycle.input === null ? originalField.school_average_community_service_hours_accepted_previous_cycle : field.edited_school_average_community_service_hours_accepted_previous_cycle.input,
                    school_community_service_required: field.edited_school_community_service_required.input === null ? originalField.school_community_service_required : field.edited_school_community_service_required.input,
                    school_community_service_recommended: field.edited_school_community_service_recommended.input === null ? originalField.school_community_service_recommended : field.edited_school_community_service_recommended.input,
                },
                edited_school_community_service: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_average_community_service_hours_accepted_previous_cycle: {
                        input: null,
                        prev: null,
                    },
                    edited_school_community_service_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_community_service_recommended: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_community_service_hours_required: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_minimum_community_service_hours_recommended: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                }
            })
        } else if (name === 'edited_school_volunteer_service') {
            const field = newSchool[name];
            const originalField = newSchool.school_volunteer_service;
            setNewSchool({
                ...newSchool,
                school_volunteer_service: {
                    ...originalField,
                    school_volunteer_service_general_notes: field.notes === null ? originalField.school_volunteer_service_general_notes : field.notes,
                    school_minimum_volunteer_service_hours_required: field.edited_school_minimum_volunteer_service_hours_required ? {
                        input: field.edited_school_minimum_volunteer_service_hours_required.input ? field.edited_school_minimum_volunteer_service_hours_required.input : originalField.school_minimum_volunteer_service_hours_required ? originalField.school_minimum_volunteer_service_hours_required.input : 0,
                        school_minimum_volunteer_service_hours_required_notes: field.edited_school_minimum_volunteer_service_hours_required.notes ? field.edited_school_minimum_volunteer_service_hours_required.notes : originalField.school_minimum_volunteer_service_hours_required ? originalField.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes : [],
                    } : originalField.school_minimum_volunteer_service_hours_required,
                    school_minimum_volunteer_service_hours_recommended: field.edited_school_minimum_volunteer_service_hours_recommended ? {
                        input: field.edited_school_minimum_volunteer_service_hours_recommended.input ? field.edited_school_minimum_volunteer_service_hours_recommended.input : originalField.school_minimum_volunteer_service_hours_recommended ? originalField.school_minimum_volunteer_service_hours_recommended.input : 0,
                        school_minimum_volunteer_service_hours_recommended_notes: field.edited_school_minimum_volunteer_service_hours_recommended.notes ? field.edited_school_minimum_volunteer_service_hours_recommended.notes : originalField.school_minimum_volunteer_service_hours_recommended ? originalField.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes : [],
                    } : originalField.school_minimum_volunteer_service_hours_recommended,
                    school_average_volunteer_service_hours_accepted_previous_cycle: field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === null ? originalField.school_average_volunteer_service_hours_accepted_previous_cycle : field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input,
                    school_volunteer_service_required: field.edited_school_volunteer_service_required.input === null ? originalField.school_volunteer_service_required : field.edited_school_volunteer_service_required.input,
                    school_volunteer_service_recommended: field.edited_school_volunteer_service_recommended.input === null ? originalField.school_volunteer_service_recommended : field.edited_school_volunteer_service_recommended.input,
                },
                edited_school_volunteer_service: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                        input: null,
                        prev: null,
                    },
                    edited_school_volunteer_service_required: {
                        input: null,
                        prev: null,
                    },
                    edited_school_volunteer_service_recommended: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_volunteer_service_hours_required: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                    edited_school_minimum_volunteer_service_hours_recommended: {
                        input: null,
                        prev: null,
                        notes: null,
                    },
                }
            })
        } 
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_paid_experience_required') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            edited_school_paid_experience_required: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
            }
        })
    } else if (name === 'edited_school_patient_experience') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            edited_school_patient_experience: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.input === null && field.edited_school_minimum_patient_care_experience_hours_required.input=== null && 
                    field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input === null && field.edited_school_patient_experience_required.input === null) ? null : true,
                edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle,
                    input: field.edited_school_average_patient_care_experience_hours_accepted_previous_cycle.prev,
                    prev: null,
                },
                edited_school_minimum_patient_care_experience_hours_required: {
                    ...field.edited_school_minimum_patient_care_experience_hours_required,
                    input: field.edited_school_minimum_patient_care_experience_hours_required.prev,
                    prev: null,
                },
                edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed.prev,
                    prev: null,
                },
                edited_school_patient_experience_required: {
                    ...field.edited_school_patient_experience_required,
                    input: field.edited_school_patient_experience_required.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_healthcare_experience') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            edited_school_healthcare_experience: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.input === null && field.edited_school_healthcare_experience_required.input === null && 
                    field.edited_school_minimum_healthcare_experience_hours_required.input === null && field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input === null) ? null : true,
                edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle,
                    input: field.edited_school_average_healthcare_experience_hours_accepted_previous_cycle.prev,
                    prev: null,
                },
                edited_school_healthcare_experience_required: {
                    ...field.edited_school_healthcare_experience_required,
                    input: field.edited_school_healthcare_experience_required.prev,
                    prev: null,
                },
                edited_school_minimum_healthcare_experience_hours_required: {
                    ...field.edited_school_minimum_healthcare_experience_hours_required,
                    input: field.edited_school_minimum_healthcare_experience_hours_required.prev,
                    prev: null,
                },
                edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
                    ...field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed,
                    input: field.edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_community_service') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            edited_school_community_service: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_average_community_service_hours_accepted_previous_cycle.input === null && field.edited_school_community_service_required.input === null && 
                    field.edited_school_community_service_recommended.input === null && field.edited_school_minimum_community_service_hours_required.input === null && 
                    field.edited_school_minimum_community_service_hours_recommended.input === null) ? null : true,
                edited_school_average_community_service_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_community_service_hours_accepted_previous_cycle,
                    input: field.edited_school_average_community_service_hours_accepted_previous_cycle.prev,
                    prev: null,
                },
                edited_school_community_service_required: {
                    ...field.edited_school_community_service_required,
                    input: field.edited_school_community_service_required.prev,
                    prev: null,
                },
                edited_school_community_service_recommended: {
                    ...field.edited_school_community_service_recommended,
                    input: field.edited_school_community_service_recommended.prev,
                    prev: null,
                },
                edited_school_minimum_community_service_hours_required: {
                    ...field.edited_school_minimum_community_service_hours_required,
                    input: field.edited_school_minimum_community_service_hours_required.prev,
                    prev: null,
                },
                edited_school_minimum_community_service_hours_recommended: {
                    ...field.edited_school_minimum_community_service_hours_recommended,
                    input: field.edited_school_minimum_community_service_hours_recommended.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_volunteer_service') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            edited_school_volunteer_service: {
                ...field,
                isEditMode: false,
                input: (field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.input === null && field.edited_school_volunteer_service_required.input === null && 
                    field.edited_school_minimum_volunteer_service_hours_required.input === null && field.edited_school_minimum_volunteer_service_hours_recommended.input === null)  ? null : true,
                edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                    ...field.edited_school_average_volunteer_service_hours_accepted_previous_cycle,
                    input: field.edited_school_average_volunteer_service_hours_accepted_previous_cycle.prev,
                    prev: null,
                },
                edited_school_volunteer_service_required: {
                    ...field.edited_school_volunteer_service_required,
                    input: field.edited_school_volunteer_service_required.prev,
                    prev: null,
                },
                edited_school_volunteer_service_recommended: {
                    ...field.edited_school_volunteer_service_recommended,
                    input: field.edited_school_volunteer_service_recommended.prev,
                    prev: null,
                },
                edited_school_minimum_volunteer_service_hours_required: {
                    ...field.edited_school_minimum_volunteer_service_hours_required,
                    input: field.edited_school_minimum_volunteer_service_hours_required.prev,
                    prev: null,
                },
                edited_school_minimum_volunteer_service_hours_recommended: {
                    ...field.edited_school_minimum_volunteer_service_hours_recommended,
                    input: field.edited_school_minimum_volunteer_service_hours_recommended.prev,
                    prev: null,
                }
            }
        })
    } 
}


export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_paid_experience_required') {
        setNewSchool({
            ...newSchool,
            edited_school_paid_experience_required: {
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
            }
        })
    } else if (name === 'edited_school_patient_experience') {
        setNewSchool({
            ...newSchool,
            edited_school_patient_experience: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_patient_care_experience_hours_required: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_patient_experience_required: {
                    input: null,
                    prev: null,
                },
            }
        })
    } else if (name === 'edited_school_healthcare_experience') {
        setNewSchool({
            ...newSchool,
            edited_school_healthcare_experience: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    input: null,
                    prev: null,
                },
                edited_school_healthcare_experience_required: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_healthcare_experience_hours_required: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
                    input: null,
                    prev: null,
                    notes: null,
                },
            }
        })
    } else if (name === 'edited_school_community_service') {
        setNewSchool({
            ...newSchool,
            edited_school_community_service: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_average_community_service_hours_accepted_previous_cycle: {
                    input: null,
                    prev: null,
                },
                edited_school_community_service_required: {
                    input: null,
                    prev: null,
                },
                edited_school_community_service_recommended: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_community_service_hours_required: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_minimum_community_service_hours_recommended: {
                    input: null,
                    prev: null,
                    notes: null,
                },
            }
        })
    } else if (name === 'edited_school_volunteer_service') {
        setNewSchool({
            ...newSchool,
            edited_school_volunteer_service: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_average_volunteer_service_hours_accepted_previous_cycle: {
                    input: null,
                    prev: null,
                },
                edited_school_volunteer_service_required: {
                    input: null,
                    prev: null,
                },
                edited_school_volunteer_service_recommended: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_volunteer_service_hours_required: {
                    input: null,
                    prev: null,
                    notes: null,
                },
                edited_school_minimum_volunteer_service_hours_recommended: {
                    input: null,
                    prev: null,
                    notes: null,
                },
            }
        })
    } 
}

