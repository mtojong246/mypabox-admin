import { ChangeEvent } from "react";

import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, Note, NumberInput } from "../../../../types/schools.types";


interface PreviousCycle {
    average_overall_gpa_accepted_previous_year: NumberInput;
    average_bcp_gpa_accepted_previous_year: NumberInput;
    average_science_gpa_accepted_previous_year: NumberInput;
    average_prerequisite_gpa_accepted_previous_year: NumberInput;
}

interface EditedPreviousCycle {
    link: string;
    isEditMode: boolean;
    edited_average_overall_gpa_accepted_previous_year: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
    edited_average_bcp_gpa_accepted_previous_year: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
    edited_average_science_gpa_accepted_previous_year: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
    edited_average_prerequisite_gpa_accepted_previous_year: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
}

export interface Required {
    input: boolean;
    school_minimum_overall_gpa_required: NumberInput | null;
    school_minimum_science_gpa_required: NumberInput | null;
    school_minimum_prerequisite_gpa_required: NumberInput | null;
}

interface EditedRequired {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    edited_school_minimum_overall_gpa_required: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
    edited_school_minimum_science_gpa_required: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
    edited_school_minimum_prerequisite_gpa_required: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
}

export interface Recommended {
        input: boolean;
        school_minimum_overall_gpa_recommended: NumberInput | null;
        school_minimum_science_gpa_recommended: NumberInput | null;
        school_minimum_prerequisite_gpa_recommended: NumberInput | null;
    }

interface EditedRecommended {
        input: boolean | null;
        prev: boolean | null,
        isEditMode: boolean,
        link: string,
        edited_school_minimum_overall_gpa_recommended: {
            input: number | null;
            prev: number | null;
            isEditMode: boolean;
        }
        edited_school_minimum_science_gpa_recommended: {
            input: number | null;
            prev: number | null;
            isEditMode: boolean;
        }
        edited_school_minimum_prerequisite_gpa_recommended: {
            input: number | null;
            prev: number | null;
            isEditMode: boolean;
        }
    }




export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const field = newSchool[name];
        const originalField = newSchool.school_average_gpa_accepted_previous_cycle;
        setNewSchool({
            ...newSchool,
            edited_school_average_gpa_accepted_previous_cycle: {
                ...field,
                isEditMode: true,
                input: (field.edited_average_overall_gpa_accepted_previous_year.input === null && field.edited_average_prerequisite_gpa_accepted_previous_year.input === null
                    && field.edited_average_science_gpa_accepted_previous_year.input === null && field.edited_average_bcp_gpa_accepted_previous_year.input === null) ? null : true,
                edited_average_overall_gpa_accepted_previous_year: {
                    ...field.edited_average_overall_gpa_accepted_previous_year,
                    input: field.edited_average_overall_gpa_accepted_previous_year.input === null ? (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.input) : field.edited_average_overall_gpa_accepted_previous_year.input,
                    isEditMode: true,
                    notes: field.edited_average_overall_gpa_accepted_previous_year.notes === null ? (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.notes) : field.edited_average_overall_gpa_accepted_previous_year.notes
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    ...field.edited_average_prerequisite_gpa_accepted_previous_year,
                    input: field.edited_average_prerequisite_gpa_accepted_previous_year.input === null ? (originalField.average_prerequisite_gpa_accepted_previous_year && originalField.average_prerequisite_gpa_accepted_previous_year.input) : field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                    isEditMode: true,
                    notes: field.edited_average_overall_gpa_accepted_previous_year.notes === null ? (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.notes) : field.edited_average_overall_gpa_accepted_previous_year.notes,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    ...field.edited_average_science_gpa_accepted_previous_year,
                    input: field.edited_average_science_gpa_accepted_previous_year.input === null ? (originalField.average_science_gpa_accepted_previous_year && originalField.average_science_gpa_accepted_previous_year.input) : field.edited_average_science_gpa_accepted_previous_year.input,
                    isEditMode: true,
                    notes: field.edited_average_science_gpa_accepted_previous_year.notes === null ? (originalField.average_science_gpa_accepted_previous_year && originalField.average_science_gpa_accepted_previous_year.notes) : field.edited_average_science_gpa_accepted_previous_year.notes,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    ...field.edited_average_bcp_gpa_accepted_previous_year,
                    input: field.edited_average_bcp_gpa_accepted_previous_year.input === null ? (originalField.average_bcp_gpa_accepted_previous_year && originalField.average_bcp_gpa_accepted_previous_year.input) : field.edited_average_bcp_gpa_accepted_previous_year.input,
                    isEditMode: true,
                    notes: field.edited_average_bcp_gpa_accepted_previous_year.notes === null ? (originalField.average_bcp_gpa_accepted_previous_year && originalField.average_bcp_gpa_accepted_previous_year.notes) : field.edited_average_bcp_gpa_accepted_previous_year.notes,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_required') {
        const field = newSchool.edited_school_minimum_gpa_required
        const originalField = newSchool.school_minimum_gpa_required
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: newSchool.edited_school_minimum_gpa_required.input === null ? newSchool.school_minimum_gpa_required.input : newSchool.edited_school_minimum_gpa_required.input,
                isEditMode: true,
                edited_school_minimum_overall_gpa_required: {
                    ...field.edited_school_minimum_overall_gpa_required,
                    input: field.edited_school_minimum_overall_gpa_required.input === null ? originalField.school_minimum_overall_gpa_required &&  originalField.school_minimum_overall_gpa_required.input : field.edited_school_minimum_overall_gpa_required.input,
                    isEditMode: true,
                    notes: field.edited_school_minimum_overall_gpa_required.notes === null ? originalField.school_minimum_overall_gpa_required &&  originalField.school_minimum_overall_gpa_required.notes : field.edited_school_minimum_overall_gpa_required.notes,
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    ...field.edited_school_minimum_prerequisite_gpa_required,
                    input: field.edited_school_minimum_prerequisite_gpa_required.input === null ? originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.input : field.edited_school_minimum_prerequisite_gpa_required.input,
                    isEditMode: true,
                    notes: field.edited_school_minimum_prerequisite_gpa_required.notes === null ? originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.notes : field.edited_school_minimum_prerequisite_gpa_required.notes,
                },
                edited_school_minimum_science_gpa_required: {
                    ...field.edited_school_minimum_science_gpa_required,
                    input: field.edited_school_minimum_science_gpa_required.input === null ? originalField.school_minimum_science_gpa_required && originalField.school_minimum_science_gpa_required.input : field.edited_school_minimum_science_gpa_required.input,
                    isEditMode: true,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        const field = newSchool.edited_school_minimum_gpa_recommended
        const originalField = newSchool.school_minimum_gpa_recommended
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: newSchool.edited_school_minimum_gpa_recommended.input === null ? newSchool.school_minimum_gpa_recommended.input : newSchool.edited_school_minimum_gpa_recommended.input,
                isEditMode: true,
                edited_school_minimum_overall_gpa_recommended: {
                    ...field.edited_school_minimum_overall_gpa_recommended,
                    input: field.edited_school_minimum_overall_gpa_recommended.input === null ? originalField.school_minimum_overall_gpa_recommended &&  originalField.school_minimum_overall_gpa_recommended.input : field.edited_school_minimum_overall_gpa_recommended.input,
                    isEditMode: true,
                    notes: field.edited_school_minimum_overall_gpa_recommended.notes === null ? originalField.school_minimum_overall_gpa_recommended &&  originalField.school_minimum_overall_gpa_recommended.notes : field.edited_school_minimum_overall_gpa_recommended.notes,

                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    ...field.edited_school_minimum_prerequisite_gpa_recommended,
                    input: field.edited_school_minimum_prerequisite_gpa_recommended.input === null ? originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.input : field.edited_school_minimum_prerequisite_gpa_recommended.input,
                    isEditMode: true,
                    notes: field.edited_school_minimum_prerequisite_gpa_recommended.notes === null ? originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.notes : field.edited_school_minimum_prerequisite_gpa_recommended.notes,

                },
                edited_school_minimum_science_gpa_recommended: {
                    ...field.edited_school_minimum_science_gpa_recommended,
                    input: field.edited_school_minimum_science_gpa_recommended.input === null ? originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.input : field.edited_school_minimum_science_gpa_recommended.input,
                    isEditMode: true,
                    notes: field.edited_school_minimum_science_gpa_recommended.notes === null ? originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.notes : field.edited_school_minimum_science_gpa_recommended.notes,

                }
            }
        })
    } else if (name === 'edited_school_other_types_of_gpa_evaluated') {
        const field = newSchool.edited_school_other_types_of_gpa_evaluated;
        const originalField = newSchool.school_other_types_of_gpa_evaluated;
        setNewSchool({
            ...newSchool,
            edited_school_other_types_of_gpa_evaluated: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(og => ({
                    ...og,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    } else if (name === 'edited_school_minimum_gpa_for_specific_course') {
        const field = newSchool.edited_school_minimum_gpa_for_specific_course;
        const originalField = newSchool.school_minimum_gpa_for_specific_course;
        setNewSchool({
            ...newSchool,
            edited_school_minimum_gpa_for_specific_course: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(og => ({
                    ...og,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    }
}


export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    if (!original) {
        if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
            const field = newSchool.edited_school_average_gpa_accepted_previous_cycle;
            const originalField = newSchool.school_average_gpa_accepted_previous_cycle;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: (field.edited_average_overall_gpa_accepted_previous_year.input === null && field.edited_average_prerequisite_gpa_accepted_previous_year.input === null
                        && field.edited_average_science_gpa_accepted_previous_year.input === null && field.edited_average_bcp_gpa_accepted_previous_year.input === null) ? null : true,
                    isEditMode: false,
                    edited_average_overall_gpa_accepted_previous_year: {
                        ...field.edited_average_overall_gpa_accepted_previous_year,
                        input: field.edited_average_overall_gpa_accepted_previous_year.input === (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.input) ? null : field.edited_average_overall_gpa_accepted_previous_year.input,
                        prev: field.edited_average_overall_gpa_accepted_previous_year.input === (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.input) ? null : field.edited_average_overall_gpa_accepted_previous_year.input,
                        isEditMode: false,
                        notes: field.edited_average_overall_gpa_accepted_previous_year.notes === (originalField.average_overall_gpa_accepted_previous_year && originalField.average_overall_gpa_accepted_previous_year.notes) ? null : field.edited_average_overall_gpa_accepted_previous_year.notes,
                    },
                    edited_average_prerequisite_gpa_accepted_previous_year: {
                        ...field.edited_average_prerequisite_gpa_accepted_previous_year,
                        input: field.edited_average_prerequisite_gpa_accepted_previous_year.input === (originalField.average_prerequisite_gpa_accepted_previous_year && originalField.average_prerequisite_gpa_accepted_previous_year.input) ? null : field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                        prev: field.edited_average_prerequisite_gpa_accepted_previous_year.input === (originalField.average_prerequisite_gpa_accepted_previous_year && originalField.average_prerequisite_gpa_accepted_previous_year.input) ? null : field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                        isEditMode: false,
                        notes: field.edited_average_prerequisite_gpa_accepted_previous_year.notes === (originalField.average_prerequisite_gpa_accepted_previous_year && originalField.average_prerequisite_gpa_accepted_previous_year.notes) ? null : field.edited_average_prerequisite_gpa_accepted_previous_year.notes,
                    },
                    edited_average_science_gpa_accepted_previous_year: {
                        ...field.edited_average_science_gpa_accepted_previous_year,
                        input: field.edited_average_science_gpa_accepted_previous_year.input === (originalField.average_science_gpa_accepted_previous_year && originalField.average_science_gpa_accepted_previous_year.input) ? null : field.edited_average_science_gpa_accepted_previous_year.input,
                        prev: field.edited_average_science_gpa_accepted_previous_year.input === (originalField.average_science_gpa_accepted_previous_year && originalField.average_science_gpa_accepted_previous_year.input) ? null : field.edited_average_science_gpa_accepted_previous_year.input,
                        isEditMode: false,
                        notes: field.edited_average_science_gpa_accepted_previous_year.notes === (originalField.average_science_gpa_accepted_previous_year && originalField.average_science_gpa_accepted_previous_year.notes) ? null : field.edited_average_science_gpa_accepted_previous_year.notes,
                    },
                    edited_average_bcp_gpa_accepted_previous_year: {
                        ...field.edited_average_bcp_gpa_accepted_previous_year,
                        input: field.edited_average_bcp_gpa_accepted_previous_year.input === (originalField.average_bcp_gpa_accepted_previous_year && originalField.average_bcp_gpa_accepted_previous_year.input) ? null : field.edited_average_bcp_gpa_accepted_previous_year.input,
                        prev: field.edited_average_bcp_gpa_accepted_previous_year.input === (originalField.average_bcp_gpa_accepted_previous_year && originalField.average_bcp_gpa_accepted_previous_year.input) ? null : field.edited_average_bcp_gpa_accepted_previous_year.input,
                        isEditMode: false,
                        notes: field.edited_average_bcp_gpa_accepted_previous_year.notes === (originalField.average_bcp_gpa_accepted_previous_year && originalField.average_bcp_gpa_accepted_previous_year.notes) ? null : field.edited_average_bcp_gpa_accepted_previous_year.notes,
                    }
                }
            })
        } else if (name === 'edited_school_minimum_gpa_required') {
            const field = newSchool.edited_school_minimum_gpa_required;
            const originalField = newSchool.school_minimum_gpa_required;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input:field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false, 
                    edited_school_minimum_overall_gpa_required: {
                        ...field.edited_school_minimum_overall_gpa_required,
                        input: field.edited_school_minimum_overall_gpa_required.input === (originalField.school_minimum_overall_gpa_required && originalField.school_minimum_overall_gpa_required.input) ? null : field.edited_school_minimum_overall_gpa_required.input,
                        prev: field.edited_school_minimum_overall_gpa_required.input === (originalField.school_minimum_overall_gpa_required && originalField.school_minimum_overall_gpa_required.input) ? null : field.edited_school_minimum_overall_gpa_required.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_overall_gpa_required.notes === (originalField.school_minimum_overall_gpa_required && originalField.school_minimum_overall_gpa_required.notes) ? null : field.edited_school_minimum_overall_gpa_required.notes,

                    },
                    edited_school_minimum_prerequisite_gpa_required: {
                        ...field.edited_school_minimum_prerequisite_gpa_required,
                        input: field.edited_school_minimum_prerequisite_gpa_required.input === (originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.input) ? null : field.edited_school_minimum_prerequisite_gpa_required.input,
                        prev: field.edited_school_minimum_prerequisite_gpa_required.input === (originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.input) ? null : field.edited_school_minimum_prerequisite_gpa_required.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_prerequisite_gpa_required.notes === (originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.notes) ? null : field.edited_school_minimum_prerequisite_gpa_required.notes,

                    },
                    edited_school_minimum_science_gpa_required: {
                        ...field.edited_school_minimum_science_gpa_required,
                        input: field.edited_school_minimum_science_gpa_required.input === (originalField.school_minimum_science_gpa_required && originalField.school_minimum_science_gpa_required.input) ? null : field.edited_school_minimum_science_gpa_required.input,
                        prev: field.edited_school_minimum_science_gpa_required.input === (originalField.school_minimum_science_gpa_required && originalField.school_minimum_science_gpa_required.input) ? null : field.edited_school_minimum_science_gpa_required.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_science_gpa_required.notes === (originalField.school_minimum_science_gpa_required && originalField.school_minimum_science_gpa_required.notes) ? null : field.edited_school_minimum_science_gpa_required.notes,

                    }
                }
            })
        } else if (name === 'edited_school_minimum_gpa_recommended') {
            const field = newSchool.edited_school_minimum_gpa_recommended;
            const originalField = newSchool[originalName] as Recommended;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false, 
                    edited_school_minimum_overall_gpa_recommended: {
                        ...field.edited_school_minimum_overall_gpa_recommended,
                        input: field.edited_school_minimum_overall_gpa_recommended.input === (originalField.school_minimum_overall_gpa_recommended && originalField.school_minimum_overall_gpa_recommended.input) ? null : field.edited_school_minimum_overall_gpa_recommended.input,
                        prev: field.edited_school_minimum_overall_gpa_recommended.input === (originalField.school_minimum_overall_gpa_recommended && originalField.school_minimum_overall_gpa_recommended.input) ? null : field.edited_school_minimum_overall_gpa_recommended.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_overall_gpa_recommended.notes === (originalField.school_minimum_overall_gpa_recommended && originalField.school_minimum_overall_gpa_recommended.notes) ? null : field.edited_school_minimum_overall_gpa_recommended.notes,

                    },
                    edited_school_minimum_prerequisite_gpa_recommended: {
                        ...field.edited_school_minimum_prerequisite_gpa_recommended,
                        input: field.edited_school_minimum_prerequisite_gpa_recommended.input === (originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.input) ? null : field.edited_school_minimum_prerequisite_gpa_recommended.input,
                        prev: field.edited_school_minimum_prerequisite_gpa_recommended.input === (originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.input) ? null : field.edited_school_minimum_prerequisite_gpa_recommended.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_prerequisite_gpa_recommended.notes === (originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.notes) ? null : field.edited_school_minimum_prerequisite_gpa_recommended.notes,

                    },
                    edited_school_minimum_science_gpa_recommended: {
                        ...field.edited_school_minimum_science_gpa_recommended,
                        input: field.edited_school_minimum_science_gpa_recommended.input === (originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.input) ? null : field.edited_school_minimum_science_gpa_recommended.input,
                        prev: field.edited_school_minimum_science_gpa_recommended.input === (originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.input) ? null : field.edited_school_minimum_science_gpa_recommended.input,
                        isEditMode: false,
                        notes: field.edited_school_minimum_science_gpa_recommended.notes === (originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.notes) ? null : field.edited_school_minimum_science_gpa_recommended.notes,

                    }
                }
            })
        } else if (name === 'edited_school_other_types_of_gpa_evaluated') {
            const field = newSchool.edited_school_other_types_of_gpa_evaluated;
            const originalField = newSchool.school_other_types_of_gpa_evaluated;
            const editedArray = field.input && field.input.map(inp => ({
                gpa_value_required_or_recommended: inp.gpa_value_required_or_recommended,
                minimum_gpa_value_needed: inp.minimum_gpa_value_needed,
                minimum_number_of_credits_evaluated: inp.minimum_number_of_credits_evaluated,
                type_of_gpa_evaluated: inp.type_of_gpa_evaluated,
                notes: inp.notes,
            }))
            setNewSchool({
                ...newSchool,
                edited_school_other_types_of_gpa_evaluated: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        } else if (name === 'edited_school_minimum_gpa_for_specific_course') {
            const field = newSchool.edited_school_minimum_gpa_for_specific_course;
            const originalField = newSchool.school_minimum_gpa_for_specific_course;
            const editedArray = field.input && field.input.map(inp => ({
                minimum_gpa_required_for_course: inp.minimum_gpa_required_for_course,
                courseID: inp.courseID,
                notes: inp.notes,
            }))
            setNewSchool({
                ...newSchool,
                edited_school_minimum_gpa_for_specific_course: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        }
    } else {
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const field = newSchool.edited_school_average_gpa_accepted_previous_cycle;
        const originalField = newSchool.school_average_gpa_accepted_previous_cycle;
        setNewSchool({
            ...newSchool,
            school_average_gpa_accepted_previous_cycle: {
                ...originalField,
                average_overall_gpa_accepted_previous_year: field.edited_average_overall_gpa_accepted_previous_year.input ||  field.edited_average_overall_gpa_accepted_previous_year.notes ? {
                    input: field.edited_average_overall_gpa_accepted_previous_year.input ? field.edited_average_overall_gpa_accepted_previous_year.input : originalField.average_overall_gpa_accepted_previous_year ? originalField.average_overall_gpa_accepted_previous_year.input : 0,
                    notes: field.edited_average_overall_gpa_accepted_previous_year.notes ? field.edited_average_overall_gpa_accepted_previous_year.notes : originalField.average_overall_gpa_accepted_previous_year ? originalField.average_overall_gpa_accepted_previous_year.notes : [],
                } : originalField.average_overall_gpa_accepted_previous_year,
                average_prerequisite_gpa_accepted_previous_year: field.edited_average_prerequisite_gpa_accepted_previous_year.input || field.edited_average_prerequisite_gpa_accepted_previous_year.notes ? {
                    input: field.edited_average_prerequisite_gpa_accepted_previous_year.input ? field.edited_average_prerequisite_gpa_accepted_previous_year.input : originalField.average_prerequisite_gpa_accepted_previous_year ? originalField.average_prerequisite_gpa_accepted_previous_year.input : 0,
                    notes: field.edited_average_prerequisite_gpa_accepted_previous_year.notes ? field.edited_average_prerequisite_gpa_accepted_previous_year.notes : originalField.average_prerequisite_gpa_accepted_previous_year ? originalField.average_prerequisite_gpa_accepted_previous_year.notes : [],
                } : originalField.average_prerequisite_gpa_accepted_previous_year,
                average_science_gpa_accepted_previous_year: field.edited_average_science_gpa_accepted_previous_year.input || field.edited_average_science_gpa_accepted_previous_year.notes ? {
                    input: field.edited_average_science_gpa_accepted_previous_year.input ? field.edited_average_science_gpa_accepted_previous_year.input : originalField.average_science_gpa_accepted_previous_year ? originalField.average_science_gpa_accepted_previous_year.input : 0,
                    notes: field.edited_average_science_gpa_accepted_previous_year.notes ? field.edited_average_science_gpa_accepted_previous_year.notes : originalField.average_science_gpa_accepted_previous_year ? originalField.average_science_gpa_accepted_previous_year.notes : [],
                } : originalField.average_science_gpa_accepted_previous_year,
                average_bcp_gpa_accepted_previous_year: field.edited_average_bcp_gpa_accepted_previous_year.input || field.edited_average_bcp_gpa_accepted_previous_year.notes ? {
                    input: field.edited_average_bcp_gpa_accepted_previous_year.input ? field.edited_average_bcp_gpa_accepted_previous_year.input : originalField.average_bcp_gpa_accepted_previous_year ? originalField.average_bcp_gpa_accepted_previous_year.input : 0,
                    notes: field.edited_average_bcp_gpa_accepted_previous_year.notes ? field.edited_average_bcp_gpa_accepted_previous_year.notes : originalField.average_bcp_gpa_accepted_previous_year ? originalField.average_bcp_gpa_accepted_previous_year.notes : [],
                } : originalField.average_bcp_gpa_accepted_previous_year,
            },
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                edited_average_overall_gpa_accepted_previous_year: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    input: null,                   
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                }
            }
        })
        
    } else if (name === 'edited_school_minimum_gpa_required') {
        const originalField = newSchool.school_minimum_gpa_required;
        const field = newSchool.edited_school_minimum_gpa_required;
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                input: field.input === null ? originalField.input : field.input,
                school_minimum_overall_gpa_required: field.edited_school_minimum_overall_gpa_required.input || field.edited_school_minimum_overall_gpa_required.notes ? {
                    input: field.edited_school_minimum_overall_gpa_required.input ? field.edited_school_minimum_overall_gpa_required.input : originalField.school_minimum_overall_gpa_required ? originalField.school_minimum_overall_gpa_required.input : 0,
                    notes: field.edited_school_minimum_overall_gpa_required.notes ? field.edited_school_minimum_overall_gpa_required.notes : originalField.school_minimum_overall_gpa_required ? originalField.school_minimum_overall_gpa_required.notes : [],
                } : originalField.school_minimum_overall_gpa_required,
                school_minimum_science_gpa_required: field.edited_school_minimum_science_gpa_required.input || field.edited_school_minimum_science_gpa_required.notes ? {
                    input: field.edited_school_minimum_science_gpa_required.input ? field.edited_school_minimum_science_gpa_required.input : originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.input : 0,
                    notes: field.edited_school_minimum_science_gpa_required.notes ? field.edited_school_minimum_science_gpa_required.notes : originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.notes : [],
                } : originalField.school_minimum_science_gpa_required,
                school_minimum_prerequisite_gpa_required: field.edited_school_minimum_prerequisite_gpa_required.input || field.edited_school_minimum_prerequisite_gpa_required.notes ? {
                    input: field.edited_school_minimum_prerequisite_gpa_required.input ? field.edited_school_minimum_prerequisite_gpa_required.input : originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.input : 0,
                    notes: field.edited_school_minimum_prerequisite_gpa_required.notes ? field.edited_school_minimum_prerequisite_gpa_required.notes : originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.notes : [],
                } : originalField.school_minimum_prerequisite_gpa_required,
            },
            [name]: {
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_overall_gpa_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_science_gpa_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        const field = newSchool.edited_school_minimum_gpa_recommended
        const originalField = newSchool.school_minimum_gpa_recommended;
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                input: field.input === null ? originalField.input : field.input,
                school_minimum_overall_gpa_recommended: field.edited_school_minimum_overall_gpa_recommended.input !== null || field.edited_school_minimum_overall_gpa_recommended.notes ? {
                    input: field.edited_school_minimum_overall_gpa_recommended.input ? field.edited_school_minimum_overall_gpa_recommended.input : originalField.school_minimum_overall_gpa_recommended ? originalField.school_minimum_overall_gpa_recommended.input : 0,
                    notes: field.edited_school_minimum_overall_gpa_recommended.notes ? field.edited_school_minimum_overall_gpa_recommended.notes : originalField.school_minimum_overall_gpa_recommended ? originalField.school_minimum_overall_gpa_recommended.notes : [],
                } : originalField.school_minimum_overall_gpa_recommended,
                school_minimum_science_gpa_recommended: field.edited_school_minimum_science_gpa_recommended.input !== null || field.edited_school_minimum_science_gpa_recommended.notes ? {
                    input: field.edited_school_minimum_science_gpa_recommended.input ? field.edited_school_minimum_science_gpa_recommended.input : originalField.school_minimum_science_gpa_recommended? originalField.school_minimum_science_gpa_recommended.input : 0,
                    notes: field.edited_school_minimum_science_gpa_recommended.notes ? field.edited_school_minimum_science_gpa_recommended.notes : originalField.school_minimum_science_gpa_recommended? originalField.school_minimum_science_gpa_recommended.notes : [],
                } : originalField.school_minimum_science_gpa_recommended,
                school_minimum_prerequisite_gpa_recommended: field.edited_school_minimum_prerequisite_gpa_recommended.input !== null || field.edited_school_minimum_science_gpa_recommended.notes ? {
                    input: field.edited_school_minimum_science_gpa_recommended.input ? field.edited_school_minimum_science_gpa_recommended.input : originalField.school_minimum_science_gpa_recommended ? originalField.school_minimum_science_gpa_recommended.input : 0,
                    notes: field.edited_school_minimum_science_gpa_recommended.notes ? field.edited_school_minimum_science_gpa_recommended.notes : originalField.school_minimum_science_gpa_recommended ? originalField.school_minimum_science_gpa_recommended.notes : [],
                } : originalField.school_minimum_prerequisite_gpa_recommended,
            },
            [name]: {
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_overall_gpa_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_science_gpa_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
            },
        })

    } else if (name === 'edited_school_other_types_of_gpa_evaluated') {
        const field = newSchool.edited_school_other_types_of_gpa_evaluated;
        const originalField = newSchool.school_other_types_of_gpa_evaluated;
        const correctList = field.input && field.input.filter(inp => inp.isCorrect)
        setNewSchool({
            ...newSchool,
            school_other_types_of_gpa_evaluated: correctList ? correctList.map(list => ({
                gpa_value_required_or_recommended: list.gpa_value_required_or_recommended,
                minimum_gpa_value_needed: list.minimum_gpa_value_needed,
                minimum_number_of_credits_evaluated: list.minimum_number_of_credits_evaluated,
                type_of_gpa_evaluated: list.type_of_gpa_evaluated,
                notes: list.notes,
            })) : originalField,
            edited_school_other_types_of_gpa_evaluated: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
                
        })
    } else if (name === 'edited_school_minimum_gpa_for_specific_course') {
        const field = newSchool.edited_school_minimum_gpa_for_specific_course;
        const originalField = newSchool.school_minimum_gpa_for_specific_course;
        const correctList = field.input && field.input.filter(inp => inp.isCorrect);
        setNewSchool({
            ...newSchool,
            school_minimum_gpa_for_specific_course: correctList ? correctList.map(list => ({
                minimum_gpa_required_for_course: list.minimum_gpa_required_for_course,
                courseID: list.courseID,
                notes: list.notes,
            })): originalField,
            edited_school_minimum_gpa_for_specific_course: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    }
}

}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                edited_average_overall_gpa_accepted_previous_year: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    input: null,                   
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_required') {
        setNewSchool({
            ...newSchool,
            [name]: {
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_overall_gpa_required: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_science_gpa_required: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        setNewSchool({
            ...newSchool,
            [name]: {
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_overall_gpa_recommended: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                },
                edited_school_minimum_science_gpa_recommended: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                    notes: null,
                }
            }
        })
    } else if (name === 'edited_school_other_types_of_gpa_evaluated') {
        setNewSchool({
            ...newSchool,
            edited_school_other_types_of_gpa_evaluated: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    } else if (name === 'edited_school_minimum_gpa_for_specific_course') {
        setNewSchool({
            ...newSchool,
            edited_school_minimum_gpa_for_specific_course: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    }
}

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const field = newSchool.edited_school_average_gpa_accepted_previous_cycle;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: (field.edited_average_overall_gpa_accepted_previous_year.input === null && field.edited_average_prerequisite_gpa_accepted_previous_year.input === null
                    && field.edited_average_science_gpa_accepted_previous_year.input === null && field.edited_average_bcp_gpa_accepted_previous_year.input === null) ? null : true,
                edited_average_overall_gpa_accepted_previous_year: {
                    ...field.edited_average_overall_gpa_accepted_previous_year,
                    input: field.edited_average_overall_gpa_accepted_previous_year.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    ...field.edited_average_prerequisite_gpa_accepted_previous_year,
                    input: field.edited_average_prerequisite_gpa_accepted_previous_year.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    ...field.edited_average_science_gpa_accepted_previous_year,
                    input: field.edited_average_science_gpa_accepted_previous_year.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    ...field.edited_average_bcp_gpa_accepted_previous_year,
                    input: field.edited_average_bcp_gpa_accepted_previous_year.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_required') {
        const field = newSchool.edited_school_minimum_gpa_required;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_minimum_overall_gpa_required: {
                    ...field.edited_school_minimum_overall_gpa_required,
                    input: field.edited_school_minimum_overall_gpa_required.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    ...field.edited_school_minimum_prerequisite_gpa_required,
                    input: field.edited_school_minimum_prerequisite_gpa_required.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_required: {
                    ...field.edited_school_minimum_science_gpa_required,
                    input: field.edited_school_minimum_science_gpa_required.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        const field = newSchool.edited_school_minimum_gpa_recommended;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_minimum_overall_gpa_recommended: {
                    ...field.edited_school_minimum_overall_gpa_recommended,
                    input: field.edited_school_minimum_overall_gpa_recommended.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    ...field.edited_school_minimum_prerequisite_gpa_recommended,
                    input: field.edited_school_minimum_prerequisite_gpa_recommended.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_recommended: {
                    ...field.edited_school_minimum_science_gpa_recommended,
                    input: field.edited_school_minimum_science_gpa_recommended.prev,
                    prev: null,
                    isEditMode: false,
                }

            }
        })
    } else if (name === 'edited_school_other_types_of_gpa_evaluated') {
        const field = newSchool.edited_school_other_types_of_gpa_evaluated;
        setNewSchool({
            ...newSchool,
            edited_school_other_types_of_gpa_evaluated: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_minimum_gpa_for_specific_course') {
        const field = newSchool.edited_school_minimum_gpa_for_specific_course;
        setNewSchool({
            ...newSchool,
            edited_school_minimum_gpa_for_specific_course: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    }

}

