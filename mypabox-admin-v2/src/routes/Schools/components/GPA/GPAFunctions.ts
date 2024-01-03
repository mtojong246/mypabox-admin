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



// export const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
//     e.preventDefault();
//     const name = `edited_${e.currentTarget.name}` as keyof School;
//     const original = e.currentTarget.name as keyof School;
//     const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
//     const originalField = newSchool[original] as PreviousCycle
//     setNewSchool({
//         ...newSchool,
//         [name]: {
//             ...field,
//             input: field.input === null ? originalField.input : field.input,
//             isEditMode: true,
//         }
//     })
// };

export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const field = newSchool[name] as EditedPreviousCycle;
        const originalField = newSchool[original] as PreviousCycle;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                edited_average_overall_gpa_accepted_previous_year: {
                    ...field.edited_average_overall_gpa_accepted_previous_year,
                    input: field.edited_average_overall_gpa_accepted_previous_year.input === null ? originalField.average_overall_gpa_accepted_previous_year.input : field.edited_average_overall_gpa_accepted_previous_year.input,
                    isEditMode: true,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    ...field.edited_average_prerequisite_gpa_accepted_previous_year,
                    input: field.edited_average_prerequisite_gpa_accepted_previous_year.input === null ? originalField.average_prerequisite_gpa_accepted_previous_year.input : field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                    isEditMode: true,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    ...field.edited_average_science_gpa_accepted_previous_year,
                    input: field.edited_average_science_gpa_accepted_previous_year.input === null ? originalField.average_science_gpa_accepted_previous_year.input : field.edited_average_science_gpa_accepted_previous_year.input,
                    isEditMode: true,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    ...field.edited_average_bcp_gpa_accepted_previous_year,
                    input: field.edited_average_bcp_gpa_accepted_previous_year.input === null ? originalField.average_bcp_gpa_accepted_previous_year.input : field.edited_average_bcp_gpa_accepted_previous_year.input,
                    isEditMode: true,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_required') {
        const field = newSchool[name] as EditedRequired;
        const originalField = newSchool[original] as Required;
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
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    ...field.edited_school_minimum_prerequisite_gpa_required,
                    input: field.edited_school_minimum_prerequisite_gpa_required.input === null ? originalField.school_minimum_prerequisite_gpa_required && originalField.school_minimum_prerequisite_gpa_required.input : field.edited_school_minimum_prerequisite_gpa_required.input,
                    isEditMode: true,
                },
                edited_school_minimum_science_gpa_required: {
                    ...field.edited_school_minimum_science_gpa_required,
                    input: field.edited_school_minimum_science_gpa_required.input === null ? originalField.school_minimum_science_gpa_required && originalField.school_minimum_science_gpa_required.input : field.edited_school_minimum_science_gpa_required.input,
                    isEditMode: true,
                }
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        const field = newSchool[name] as EditedRecommended;
        const originalField = newSchool[original] as Recommended;
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
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    ...field.edited_school_minimum_prerequisite_gpa_recommended,
                    input: field.edited_school_minimum_prerequisite_gpa_recommended.input === null ? originalField.school_minimum_prerequisite_gpa_recommended && originalField.school_minimum_prerequisite_gpa_recommended.input : field.edited_school_minimum_prerequisite_gpa_recommended.input,
                    isEditMode: true,
                },
                edited_school_minimum_science_gpa_recommended: {
                    ...field.edited_school_minimum_science_gpa_recommended,
                    input: field.edited_school_minimum_science_gpa_recommended.input === null ? originalField.school_minimum_science_gpa_recommended && originalField.school_minimum_science_gpa_recommended.input : field.edited_school_minimum_science_gpa_recommended.input,
                    isEditMode: true,
                }
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
            const field = newSchool[name] as EditedPreviousCycle;
            const originalField = newSchool[originalName] as PreviousCycle;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    isEditMode: false,
                    edited_average_overall_gpa_accepted_previous_year: {
                        ...field.edited_average_overall_gpa_accepted_previous_year,
                        input: field.edited_average_overall_gpa_accepted_previous_year.input,
                        prev: field.edited_average_overall_gpa_accepted_previous_year.input,
                        isEditMode: false,
                    },
                    edited_average_prerequisite_gpa_accepted_previous_year: {
                        ...field.edited_average_prerequisite_gpa_accepted_previous_year,
                        input: field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                        prev: field.edited_average_prerequisite_gpa_accepted_previous_year.input,
                        isEditMode: false,
                    },
                    edited_average_science_gpa_accepted_previous_year: {
                        ...field.edited_average_science_gpa_accepted_previous_year,
                        input: field.edited_average_science_gpa_accepted_previous_year.input,
                        prev: field.edited_average_science_gpa_accepted_previous_year.input,
                        isEditMode: false,
                    },
                    edited_average_bcp_gpa_accepted_previous_year: {
                        ...field.edited_average_bcp_gpa_accepted_previous_year,
                        input: field.edited_average_bcp_gpa_accepted_previous_year.input,
                        prev: field.edited_average_bcp_gpa_accepted_previous_year.input,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_minimum_gpa_required') {
            const field = newSchool[name] as EditedRequired;
            const originalField = newSchool[originalName] as Required;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input:field.input,
                    prev: field.input,
                    isEditMode: false, 
                    edited_school_minimum_overall_gpa_required: {
                        ...field.edited_school_minimum_overall_gpa_required,
                        input: field.edited_school_minimum_overall_gpa_required.input,
                        prev: field.edited_school_minimum_overall_gpa_required.input,
                        isEditMode: false,
                    },
                    edited_school_minimum_prerequisite_gpa_required: {
                        ...field.edited_school_minimum_prerequisite_gpa_required,
                        input: field.edited_school_minimum_prerequisite_gpa_required.input,
                        prev: field.edited_school_minimum_prerequisite_gpa_required.input,
                        isEditMode: false,
                    },
                    edited_school_minimum_science_gpa_required: {
                        ...field.edited_school_minimum_science_gpa_required,
                        input: field.edited_school_minimum_science_gpa_required.input,
                        prev: field.edited_school_minimum_science_gpa_required.input,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_minimum_gpa_recommended') {
            const field = newSchool[name] as EditedRecommended;
            const originalField = newSchool[originalName] as Recommended;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input: field.input,
                    prev: field.input,
                    isEditMode: false, 
                    edited_school_minimum_overall_gpa_recommended: {
                        ...field.edited_school_minimum_overall_gpa_recommended,
                        input: field.edited_school_minimum_overall_gpa_recommended.input,
                        prev: field.edited_school_minimum_overall_gpa_recommended.input,
                        isEditMode: false,
                    },
                    edited_school_minimum_prerequisite_gpa_recommended: {
                        ...field.edited_school_minimum_prerequisite_gpa_recommended,
                        input: field.edited_school_minimum_prerequisite_gpa_recommended.input,
                        prev: field.edited_school_minimum_prerequisite_gpa_recommended.input,
                        isEditMode: false,
                    },
                    edited_school_minimum_science_gpa_recommended: {
                        ...field.edited_school_minimum_science_gpa_recommended,
                        input: field.edited_school_minimum_science_gpa_recommended.input,
                        prev: field.edited_school_minimum_science_gpa_recommended.input,
                        isEditMode: false,
                    }
                }
            })
        }
    } else {
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const originalField = newSchool[originalName] as PreviousCycle;
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                average_overall_gpa_accepted_previous_year: newSchool.edited_school_average_gpa_accepted_previous_cycle.edited_average_overall_gpa_accepted_previous_year.input,
                average_prerequisite_gpa_accepted_previous_year: newSchool.edited_school_average_gpa_accepted_previous_cycle.edited_average_prerequisite_gpa_accepted_previous_year.input,
                average_science_gpa_accepted_previous_year: newSchool.edited_school_average_gpa_accepted_previous_cycle.edited_average_science_gpa_accepted_previous_year.input,
                average_bcp_gpa_accepted_previous_year: newSchool.edited_school_average_gpa_accepted_previous_cycle.edited_average_bcp_gpa_accepted_previous_year.input,
            },
            [name]: {
                link: '',
                isEditMode: false,
                edited_average_overall_gpa_accepted_previous_year: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    input: null,                   
                    prev: null,
                    isEditMode: false,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                }
            }
        })
        
    } else if (name === 'edited_school_minimum_gpa_required') {
        const originalField = newSchool[originalName] as Required;
        const field = newSchool[name] as EditedRequired;
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                input: field.input,
                school_minimum_overall_gpa_required: field.edited_school_minimum_overall_gpa_required.input ? {
                    input: field.edited_school_minimum_overall_gpa_required.input,
                    notes: originalField.school_minimum_overall_gpa_required ? originalField.school_minimum_overall_gpa_required.notes : [],
                } : originalField.school_minimum_overall_gpa_required,
                school_minimum_science_gpa_required: field.edited_school_minimum_science_gpa_required.input ? {
                    input: field.edited_school_minimum_science_gpa_required.input,
                    notes: originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.notes : [],
                } : originalField.school_minimum_science_gpa_required,
                school_minimum_prerequisite_gpa_required: field.edited_school_minimum_prerequisite_gpa_required.input ? {
                    input: field.edited_school_minimum_science_gpa_required.input,
                    notes: originalField.school_minimum_science_gpa_required ? originalField.school_minimum_science_gpa_required.notes : [],
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
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_required: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
            }
        })
    } else if (name === 'edited_school_minimum_gpa_recommended') {
        const field = newSchool[name] as EditedRecommended;
        const originalField = newSchool[originalName] as Recommended;
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                input: field.input,
                school_minimum_overall_gpa_recommended: field.edited_school_minimum_overall_gpa_recommended.input !== null ? {
                    input: field.edited_school_minimum_overall_gpa_recommended.input,
                    notes: originalField.school_minimum_overall_gpa_recommended ? originalField.school_minimum_overall_gpa_recommended.notes : [],
                } : originalField.school_minimum_overall_gpa_recommended,
                school_minimum_science_gpa_recommended: field.edited_school_minimum_science_gpa_recommended.input !== null ? {
                    input: field.edited_school_minimum_science_gpa_recommended.input,
                    notes: originalField.school_minimum_science_gpa_recommended? originalField.school_minimum_science_gpa_recommended.notes : [],
                } : originalField.school_minimum_science_gpa_recommended,
                school_minimum_prerequisite_gpa_recommended: field.edited_school_minimum_prerequisite_gpa_recommended.input !== null ? {
                    input: field.edited_school_minimum_science_gpa_recommended.input,
                    notes: originalField.school_minimum_science_gpa_recommended ? originalField.school_minimum_science_gpa_recommended.notes : [],
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
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
            },
        })
        console.log(field, originalField)

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
                edited_average_overall_gpa_accepted_previous_year: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_average_prerequisite_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                },
                edited_average_science_gpa_accepted_previous_year: {
                    input: null,                   
                    prev: null,
                    isEditMode: false,
                },
                edited_average_bcp_gpa_accepted_previous_year: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
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
                },
                edited_school_minimum_prerequisite_gpa_required: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_required: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
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
                },
                edited_school_minimum_prerequisite_gpa_recommended: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                },
                edited_school_minimum_science_gpa_recommended: {
                    input: null,                    
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    }
}

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_average_gpa_accepted_previous_cycle') {
        const field = newSchool[name] as EditedPreviousCycle;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
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
        const field = newSchool[name] as EditedRequired;
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
        const field = newSchool[name] as EditedRecommended;
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
    }

}

