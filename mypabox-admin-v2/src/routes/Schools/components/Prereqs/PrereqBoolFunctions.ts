import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_pass_fail_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_pass_fail_grade_accepted.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_pass_fail_criteria.school_pass_fail_grade_criteria_note_section : field.notes,
                edited_school_pass_fail_grade_accepted: {
                    ...field.edited_school_pass_fail_grade_accepted,
                    input: field.edited_school_pass_fail_grade_accepted.input === null ? newSchool.school_pass_fail_criteria.school_pass_fail_grade_accepted : field.edited_school_pass_fail_grade_accepted.input,
                }
            }
        })
    } else if (name === 'edited_school_ap_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_ap_courses_accepted.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_ap_criteria.school_ap_courses_criteria_note_section : field.notes,
                edited_school_ap_courses_accepted: {
                    ...field.edited_school_ap_courses_accepted,
                    input: field.edited_school_ap_courses_accepted.input === null ? newSchool.school_ap_criteria.school_ap_courses_accepted : field.edited_school_ap_courses_accepted.input,
                }
            }
        })
    } else if (name === 'edited_school_community_college_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_community_college_credits_accepted.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_community_college_criteria.school_community_college_criteria_note_section : field.notes,
                edited_school_community_college_credits_accepted: {
                    ...field.edited_school_community_college_credits_accepted,
                    input: field.edited_school_community_college_credits_accepted.input === null ? newSchool.school_community_college_criteria.school_community_college_credits_accepted : field.edited_school_community_college_credits_accepted.input,
                }
            }
        })
    } else if (name === 'edited_school_clep_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_clep_credits_accepted.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_clep_criteria.school_clep_credits_criteria_note_section : field.notes,
                edited_school_clep_credits_accepted: {
                    ...field.edited_school_clep_credits_accepted,
                    input: field.edited_school_clep_credits_accepted.input === null ? newSchool.school_clep_criteria.school_clep_credits_accepted : field.edited_school_clep_credits_accepted.input,
                }
            }
        })
    } else if (name === 'edited_school_online_courses_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.edited_school_online_courses_accepted.input === null ? null : true,
                notes: field.notes === null ? newSchool.school_online_courses_criteria.school_online_courses_criteria_note_section : field.notes,
                edited_school_online_courses_accepted: {
                    ...field.edited_school_online_courses_accepted,
                    input: field.edited_school_online_courses_accepted.input === null ? newSchool.school_online_courses_criteria.school_online_courses_accepted : field.edited_school_online_courses_accepted.input,
                }
            }
        })
    }
}


export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_pass_fail_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_pass_fail_criteria: {
                    ...newSchool.school_pass_fail_criteria,
                    school_pass_fail_grade_criteria_note_section: field.notes ? field.notes : newSchool.school_pass_fail_criteria.school_pass_fail_grade_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_pass_fail_grade_accepted.input === null ? null : true,
                    edited_school_pass_fail_grade_accepted: {
                        ...field.edited_school_pass_fail_grade_accepted,
                        input: field.edited_school_pass_fail_grade_accepted.input,
                        prev: field.edited_school_pass_fail_grade_accepted.input,
                    }
                }
            })
         } else if (name === 'edited_school_ap_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_ap_criteria: {
                    ...newSchool.school_ap_criteria,
                    school_ap_courses_criteria_note_section: field.notes ? field.notes : newSchool.school_ap_criteria.school_ap_courses_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_ap_courses_accepted.input === null ? null : true,
                    edited_school_ap_courses_accepted: {
                        ...field.edited_school_ap_courses_accepted,
                        input: field.edited_school_ap_courses_accepted.input,
                        prev: field.edited_school_ap_courses_accepted.input,
                    }
                }
            })
        } else if (name === 'edited_school_community_college_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_community_college_criteria: {
                    ...newSchool.school_community_college_criteria,
                    school_community_college_criteria_note_section: field.notes ? field.notes : newSchool.school_community_college_criteria.school_community_college_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_community_college_credits_accepted.input === null ? null : true,
                    edited_school_community_college_credits_accepted: {
                        ...field.edited_school_community_college_credits_accepted,
                        input: field.edited_school_community_college_credits_accepted.input,
                        prev: field.edited_school_community_college_credits_accepted.input,
                    }
                }
            })
        } else if (name === 'edited_school_clep_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_clep_criteria: {
                    ...newSchool.school_clep_criteria,
                    school_clep_credits_criteria_note_section: field.notes ? field.notes : newSchool.school_clep_criteria.school_clep_credits_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_clep_credits_accepted.input === null ? null : true,
                    edited_school_clep_credits_accepted: {
                        ...field.edited_school_clep_credits_accepted,
                        input: field.edited_school_clep_credits_accepted.input,
                        prev: field.edited_school_clep_credits_accepted.input,
                    }
                }
            })
        } else if (name === 'edited_school_online_courses_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_online_courses_criteria: {
                    ...newSchool.school_online_courses_criteria,
                    school_online_courses_criteria_note_section: field.notes ? field.notes : newSchool.school_online_courses_criteria.school_online_courses_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.edited_school_online_courses_accepted.input === null ? null : true,
                    edited_school_online_courses_accepted: {
                        ...field.edited_school_online_courses_accepted,
                        input: field.edited_school_online_courses_accepted.input,
                        prev: field.edited_school_online_courses_accepted.input,
                    }
                }
            })
        }
    } else {
        if (name === 'edited_school_pass_fail_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_pass_fail_criteria: {
                    ...newSchool.school_pass_fail_criteria,
                    school_pass_fail_grade_accepted: field.edited_school_pass_fail_grade_accepted.input!,
                    school_pass_fail_grade_criteria_note_section: field.notes ? field.notes : newSchool.school_pass_fail_criteria.school_pass_fail_grade_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_pass_fail_grade_accepted: {
                        ...field.edited_school_pass_fail_grade_accepted,
                        input: null,
                        prev: null,
                    }
                }
            })
         } else if (name === 'edited_school_ap_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_ap_criteria: {
                    ...newSchool.school_ap_criteria,
                    school_ap_courses_accepted: field.edited_school_ap_courses_accepted.input!,
                    school_ap_courses_criteria_note_section: field.notes ? field.notes : newSchool.school_ap_criteria.school_ap_courses_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_ap_courses_accepted: {
                        ...field.edited_school_ap_courses_accepted,
                        input: null,
                        prev: null,
                    }
                }
            })
        } else if (name === 'edited_school_community_college_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_community_college_criteria: {
                    ...newSchool.school_community_college_criteria,
                    school_community_college_credits_accepted: field.edited_school_community_college_credits_accepted.input!,
                    school_community_college_criteria_note_section: field.notes ? field.notes : newSchool.school_community_college_criteria.school_community_college_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_community_college_credits_accepted: {
                        ...field.edited_school_community_college_credits_accepted,
                        input: null,
                        prev: null,
                    }
                }
            })
        } else if (name === 'edited_school_clep_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_clep_criteria: {
                    ...newSchool.school_clep_criteria,
                    school_clep_credits_accepted: field.edited_school_clep_credits_accepted.input!,
                    school_clep_credits_criteria_note_section: field.notes ? field.notes : newSchool.school_clep_criteria.school_clep_credits_criteria_note_section,
                },  
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_clep_credits_accepted: {
                        ...field.edited_school_clep_credits_accepted,
                        input: null,
                        prev: null,
                    }
                }
            })
        } else if (name === 'edited_school_online_courses_criteria') {
            const field = newSchool[name];
            setNewSchool({
                ...newSchool,
                school_online_courses_criteria: {
                    ...newSchool.school_online_courses_criteria,
                    school_online_courses_accepted: field.edited_school_online_courses_accepted.input!,
                    school_online_courses_criteria_note_section: field.notes ? field.notes : newSchool.school_online_courses_criteria.school_online_courses_criteria_note_section,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: null,
                    notes: null,
                    edited_school_online_courses_accepted: {
                        ...field.edited_school_online_courses_accepted,
                        input: null,
                        prev: null,
                    }
                }
            })
        }
}

}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_pass_fail_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_pass_fail_grade_accepted: {
                    ...field.edited_school_pass_fail_grade_accepted,
                    input: null,
                    prev: null,
                }
            }
        })
     } else if (name === 'edited_school_ap_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_ap_courses_accepted: {
                    ...field.edited_school_ap_courses_accepted,
                    input: null,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_community_college_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_community_college_credits_accepted: {
                    ...field.edited_school_community_college_credits_accepted,
                    input: null,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_clep_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_clep_credits_accepted: {
                    ...field.edited_school_clep_credits_accepted,
                    input: null,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_online_courses_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                notes: null,
                edited_school_online_courses_accepted: {
                    ...field.edited_school_online_courses_accepted,
                    input: null,
                    prev: null,
                }
            }
        })
    }

}

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_pass_fail_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_pass_fail_grade_accepted.input === null ? null : true,
                edited_school_pass_fail_grade_accepted: {
                    ...field.edited_school_pass_fail_grade_accepted,
                    input: field.edited_school_pass_fail_grade_accepted.prev,
                    prev: null,
                }
            }
        })
     } else if (name === 'edited_school_ap_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_ap_courses_accepted.input === null ? null : true,
                edited_school_ap_courses_accepted: {
                    ...field.edited_school_ap_courses_accepted,
                    input: field.edited_school_ap_courses_accepted.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_community_college_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_community_college_credits_accepted.input === null ? null : true,
                edited_school_community_college_credits_accepted: {
                    ...field.edited_school_community_college_credits_accepted,
                    input: field.edited_school_community_college_credits_accepted.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_clep_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_clep_credits_accepted.input === null ? null : true,
                edited_school_clep_credits_accepted: {
                    ...field.edited_school_clep_credits_accepted,
                    input: field.edited_school_clep_credits_accepted.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_online_courses_criteria') {
        const field = newSchool[name];
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: false,
                input: field.edited_school_online_courses_accepted.input === null ? null : true,
                edited_school_online_courses_accepted: {
                    ...field.edited_school_online_courses_accepted,
                    input: field.edited_school_online_courses_accepted.prev,
                    prev: null,
                }
            }
        })
    }

}

