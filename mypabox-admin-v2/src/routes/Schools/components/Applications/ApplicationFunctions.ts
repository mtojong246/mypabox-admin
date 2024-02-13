import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, Note } from "../../../../types/schools.types";

interface Caspa  {
    input: boolean;
    school_caspa_application_deadline_date: string | null;
    school_caspa_application_deadline_type: string | null;
    school_caspa_application_notes: Note[];
}

interface EditedCaspa {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    notes: Note[] | null;
    edited_school_caspa_application_deadline_date: {
        input: string | null;
        prev: string | null;
        isEditMode: boolean;
    }
    edited_school_caspa_application_deadline_type: {
        input: string | null;
        prev: string | null;
        isEditMode: boolean;
    }
}

interface Direct {
        input: boolean;
        school_application_direct_to_school_deadline: string | null;
        school_application_direct_to_school_fee: number | string | null;
        school_application_direct_to_school_notes: Note[];
}

interface EditedDirect {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    notes: Note[] | null;
    edited_school_application_direct_to_school_deadline: {
        input: string | null;
        prev: string | null;
        isEditMode: boolean;
    }
    edited_school_application_direct_to_school_fee: {
        input: number | string | null;
        prev: number | string | null;
        isEditMode: boolean;
    }
}

interface Supplemental {
    input: boolean;
    school_supplemental_application_deadline: string | null;
    school_supplemental_application_fee: number | string | null;
    school_supplemental_application_link: string | null;
    school_supplemental_application_link_provided_with_invite_only: boolean | null;
    school_supplemental_application_notes: Note[];
}

interface EditedSupplemental {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    notes: Note[] | null;
    edited_school_supplemental_application_deadline: {
        input: string | null;
        prev: string | null;
        isEditMode: boolean;
    }
    edited_school_supplemental_application_fee: {
        input: string | number | null;
        prev: string | number | null;
        isEditMode: boolean;
    }
    edited_school_supplemental_application_link: {
        input: string | null;
        prev: string | null;
        isEditMode: boolean;
    }
    edited_school_supplemental_application_link_provided_with_invite_only: {
        input: boolean | null;
        prev: boolean | null;
        isEditMode: boolean;
    }
}



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    if (name === 'edited_school_supplemental_application_required') {
        const field = newSchool[name] as EditedSupplemental;
        const originalField = newSchool[original] as Supplemental;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_supplemental_application_notes : field.notes,
                edited_school_supplemental_application_deadline: {
                    ...field.edited_school_supplemental_application_deadline,
                    input: field.edited_school_supplemental_application_deadline.input === null ? originalField.school_supplemental_application_deadline : field.edited_school_supplemental_application_deadline.input,
                    isEditMode: true,
                },
                edited_school_supplemental_application_fee: {
                    ...field.edited_school_supplemental_application_fee,
                    input: field.edited_school_supplemental_application_fee.input === null ? originalField.school_supplemental_application_fee : field.edited_school_supplemental_application_fee.input,
                    isEditMode: true,
                },
                edited_school_supplemental_application_link: {
                    ...field.edited_school_supplemental_application_link,
                    input: field.edited_school_supplemental_application_link.input === null ? originalField.school_supplemental_application_link : field.edited_school_supplemental_application_link.input,
                    isEditMode: true,
                },
                edited_school_supplemental_application_link_provided_with_invite_only: {
                    ...field.edited_school_supplemental_application_link_provided_with_invite_only,
                    input: field.edited_school_supplemental_application_link_provided_with_invite_only.input === null ? originalField.school_supplemental_application_link_provided_with_invite_only : field.edited_school_supplemental_application_link_provided_with_invite_only.input,
                    isEditMode: true,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_on_caspa') {
        const field = newSchool[name] as EditedCaspa;
        const originalField = newSchool[original] as Caspa;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_caspa_application_notes : field.notes,
                edited_school_caspa_application_deadline_date: {
                    ...field.edited_school_caspa_application_deadline_date,
                    input: field.edited_school_caspa_application_deadline_date.input ? originalField.school_caspa_application_deadline_date : field.edited_school_caspa_application_deadline_date.input,
                    isEditMode: true,
                },
                edited_school_caspa_application_deadline_type: {
                    ...field.edited_school_caspa_application_deadline_type,
                    input: field.edited_school_caspa_application_deadline_type.input === null ? originalField.school_caspa_application_deadline_type : field.edited_school_caspa_application_deadline_type.input,
                    isEditMode: true,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_directly_to_school') {
        const field = newSchool[name] as EditedDirect;
        const originalField = newSchool[original] as Direct;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true,
                notes: field.notes === null ? originalField.school_application_direct_to_school_notes : field.notes,
                edited_school_application_direct_to_school_deadline: {
                    ...field.edited_school_application_direct_to_school_deadline,
                    input: field.edited_school_application_direct_to_school_deadline.input === null ? originalField.school_application_direct_to_school_deadline : field.edited_school_application_direct_to_school_deadline.input,
                    isEditMode: true,
                },
                edited_school_application_direct_to_school_fee: {
                    ...field.edited_school_application_direct_to_school_fee,
                    input: field.edited_school_application_direct_to_school_fee.input === null ? originalField.school_application_direct_to_school_fee : field.edited_school_application_direct_to_school_fee.input,
                    isEditMode: true,
                }
            }
        })
    }
}



export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();

    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    // const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
    // const originalField = newSchool[originalName] as PreviousCycle;
    if (!original) {
        if (name === 'edited_school_supplemental_application_required') {
            const field = newSchool.edited_school_supplemental_application_required
            const originalField = newSchool.school_supplemental_application_required
            setNewSchool({
                ...newSchool,
                school_supplemental_application_required: {
                    ...newSchool.school_supplemental_application_required,
                    school_supplemental_application_notes: field.notes ? field.notes : newSchool.school_supplemental_application_required.school_supplemental_application_notes,
                },
                [name]: {
                    ...field,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false,
                    edited_school_supplemental_application_deadline: {
                        ...field.edited_school_supplemental_application_deadline,
                        input: field.edited_school_supplemental_application_deadline.input === originalField.school_supplemental_application_deadline ? null : field.edited_school_supplemental_application_deadline.input,
                        prev: field.edited_school_supplemental_application_deadline.input === originalField.school_supplemental_application_deadline ? null : field.edited_school_supplemental_application_deadline.input,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_fee: {
                        ...field.edited_school_supplemental_application_fee,
                        input: field.edited_school_supplemental_application_fee.input === originalField.school_supplemental_application_fee ? null : field.edited_school_supplemental_application_fee.input,
                        prev: field.edited_school_supplemental_application_fee.input === originalField.school_supplemental_application_fee ? null : field.edited_school_supplemental_application_fee.input,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_link: {
                        ...field.edited_school_supplemental_application_link,
                        input: field.edited_school_supplemental_application_link.input === originalField.school_supplemental_application_link ? null : field.edited_school_supplemental_application_link.input,
                        prev: field.edited_school_supplemental_application_link.input === originalField.school_supplemental_application_link ? null : field.edited_school_supplemental_application_link.input,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_link_provided_with_invite_only: {
                        ...field.edited_school_supplemental_application_link_provided_with_invite_only,
                        input: field.edited_school_supplemental_application_link_provided_with_invite_only.input === originalField.school_supplemental_application_link_provided_with_invite_only ? null : field.edited_school_supplemental_application_link_provided_with_invite_only.input,
                        prev: field.edited_school_supplemental_application_link_provided_with_invite_only.input === originalField.school_supplemental_application_link_provided_with_invite_only ? null : field.edited_school_supplemental_application_link_provided_with_invite_only.input,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_application_submitted_on_caspa') {
            const field = newSchool[name] as EditedCaspa;
            const originalField = newSchool[originalName] as Caspa;
            setNewSchool({
                ...newSchool,
                school_application_submitted_on_caspa: {
                    ...newSchool.school_application_submitted_on_caspa,
                    school_caspa_application_notes: field.notes ? field.notes : newSchool.school_application_submitted_on_caspa.school_caspa_application_notes,
                },
                [name]: {
                    ...field,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false,
                    edited_school_caspa_application_deadline_date: {
                        ...field.edited_school_caspa_application_deadline_date,
                        input: field.edited_school_caspa_application_deadline_date.input === originalField.school_caspa_application_deadline_date ? null : field.edited_school_caspa_application_deadline_date.input,
                        prev: field.edited_school_caspa_application_deadline_date.input === originalField.school_caspa_application_deadline_date ? null : field.edited_school_caspa_application_deadline_date.input,
                        isEditMode: false,
                    },
                    edited_school_caspa_application_deadline_type: {
                        ...field.edited_school_caspa_application_deadline_type,
                        input: field.edited_school_caspa_application_deadline_type.input === originalField.school_caspa_application_deadline_type ? null : field.edited_school_caspa_application_deadline_type.input,
                        prev: field.edited_school_caspa_application_deadline_type.input === originalField.school_caspa_application_deadline_type ? null : field.edited_school_caspa_application_deadline_type.input,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_application_submitted_directly_to_school') {
            const field = newSchool[name] as EditedDirect;
            const originalField = newSchool[originalName] as Direct;
            setNewSchool({
                ...newSchool,
                school_application_submitted_directly_to_school: {
                    ...newSchool.school_application_submitted_directly_to_school,
                    school_application_direct_to_school_notes: field.notes ? field.notes : newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes,
                },
                [name]: {
                    ...field,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false,
                    edited_school_application_direct_to_school_deadline: {
                        ...field.edited_school_application_direct_to_school_deadline,
                        input: field.edited_school_application_direct_to_school_deadline.input === originalField.school_application_direct_to_school_deadline ? null : field.edited_school_application_direct_to_school_deadline.input,
                        prev: field.edited_school_application_direct_to_school_deadline.input === originalField.school_application_direct_to_school_deadline ? null : field.edited_school_application_direct_to_school_deadline.input,
                        isEditMode: false,
                    },
                    edited_school_application_direct_to_school_fee: {
                        ...field.edited_school_application_direct_to_school_fee,
                        input: field.edited_school_application_direct_to_school_fee.input === originalField.school_application_direct_to_school_fee ? null : field.edited_school_application_direct_to_school_fee.input,
                        prev: field.edited_school_application_direct_to_school_fee.input === originalField.school_application_direct_to_school_fee ? null : field.edited_school_application_direct_to_school_fee.input,
                        isEditMode: false,
                    }
                }
            })
        }
    } else {
        if (name === 'edited_school_supplemental_application_required') {
            const field = newSchool[name] as EditedSupplemental;
            const originalField = newSchool[originalName] as Supplemental;
            setNewSchool({
                ...newSchool,
                [originalName]: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_supplemental_application_notes: field.notes ? field.notes : newSchool.school_supplemental_application_required.school_supplemental_application_notes,
                    school_supplemental_application_deadline: field.edited_school_supplemental_application_deadline.input === null ? originalField.school_supplemental_application_deadline : field.edited_school_supplemental_application_deadline.input,
                    school_supplemental_application_fee: field.edited_school_supplemental_application_fee.input === null ? originalField.school_supplemental_application_fee : field.edited_school_supplemental_application_fee.input,
                    school_supplemental_application_link: field.edited_school_supplemental_application_link.input === null ? originalField.school_supplemental_application_link : field.edited_school_supplemental_application_link.input,
                    school_supplemental_application_link_provided_with_invite_only: field.edited_school_supplemental_application_link_provided_with_invite_only.input === null ? originalField.school_supplemental_application_link_provided_with_invite_only : field.edited_school_supplemental_application_link_provided_with_invite_only.input,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    notes: null,
                    edited_school_supplemental_application_deadline: {
                        ...field.edited_school_supplemental_application_deadline,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_fee: {
                        ...field.edited_school_supplemental_application_fee,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_link: {
                        ...field.edited_school_supplemental_application_link,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_supplemental_application_link_provided_with_invite_only: {
                        ...field.edited_school_supplemental_application_link_provided_with_invite_only,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_application_submitted_on_caspa') {
            const field = newSchool[name] as EditedCaspa;
            const originalField = newSchool[originalName] as Caspa;
            setNewSchool({
                ...newSchool,
                [originalName]: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_caspa_application_notes: field.notes ? field.notes : newSchool.school_application_submitted_on_caspa.school_caspa_application_notes,
                    school_caspa_application_deadline_date: field.edited_school_caspa_application_deadline_date.input === null ? originalField.school_caspa_application_deadline_date : field.edited_school_caspa_application_deadline_date.input,
                    school_caspa_application_deadline_type: field.edited_school_caspa_application_deadline_type.input === null ? originalField.school_caspa_application_deadline_type : field.edited_school_caspa_application_deadline_type.input,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    notes: null,
                    edited_school_caspa_application_deadline_date: {
                        ...field.edited_school_caspa_application_deadline_date,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_caspa_application_deadline_type: {
                        ...field.edited_school_caspa_application_deadline_type,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_application_submitted_directly_to_school') {
            const field = newSchool[name] as EditedDirect;
            const originalField = newSchool[originalName] as Direct;
            setNewSchool({
                ...newSchool,
                [originalName]: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_application_direct_to_school_notes: field.notes ? field.notes : newSchool.school_application_submitted_directly_to_school.school_application_direct_to_school_notes,
                    school_application_direct_to_school_deadline: field.edited_school_application_direct_to_school_deadline.input === null ? originalField.school_application_direct_to_school_deadline : field.edited_school_application_direct_to_school_deadline.input,
                    school_application_direct_to_school_fee: field.edited_school_application_direct_to_school_fee.input === null ? originalField.school_application_direct_to_school_fee : field.edited_school_application_direct_to_school_fee.input,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    notes: null,
                    edited_school_application_direct_to_school_deadline: {
                        ...field.edited_school_application_direct_to_school_deadline,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    },
                    edited_school_application_direct_to_school_fee: {
                        ...field.edited_school_application_direct_to_school_fee,
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        }
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_supplemental_application_required') {
        const field = newSchool[name] as EditedSupplemental;
        setNewSchool({
            ...newSchool,
            edited_school_supplemental_application_required: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_supplemental_application_deadline: {
                    ...field.edited_school_supplemental_application_deadline,
                    input: field.edited_school_supplemental_application_deadline.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_fee: {
                    ...field.edited_school_supplemental_application_fee,
                    input: field.edited_school_supplemental_application_fee.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_link: {
                    ...field.edited_school_supplemental_application_link,
                    input: field.edited_school_supplemental_application_link.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_link_provided_with_invite_only: {
                    ...field.edited_school_supplemental_application_link_provided_with_invite_only,
                    input: field.edited_school_supplemental_application_link_provided_with_invite_only.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_on_caspa') {
        const field = newSchool[name] as EditedCaspa;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_caspa_application_deadline_date: {
                    ...field.edited_school_caspa_application_deadline_date,
                    input: field.edited_school_caspa_application_deadline_date.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_caspa_application_deadline_type: {
                    ...field.edited_school_caspa_application_deadline_type,
                    input: field.edited_school_caspa_application_deadline_type.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_directly_to_school') {
        const field = newSchool[name] as EditedDirect;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_application_direct_to_school_deadline: {
                    ...field.edited_school_application_direct_to_school_deadline,
                    input: field.edited_school_application_direct_to_school_deadline.prev,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_application_direct_to_school_fee: {
                    ...field.edited_school_application_direct_to_school_fee,
                    input: field.edited_school_application_direct_to_school_fee.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    }
}


export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_supplemental_application_required') {
        const field = newSchool[name] as EditedSupplemental;
        setNewSchool({
            ...newSchool,
            edited_school_supplemental_application_required: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
                edited_school_supplemental_application_deadline: {
                    ...field.edited_school_supplemental_application_deadline,
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_fee: {
                    ...field.edited_school_supplemental_application_fee,
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_link: {
                    ...field.edited_school_supplemental_application_link,
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_supplemental_application_link_provided_with_invite_only: {
                    ...field.edited_school_supplemental_application_link_provided_with_invite_only,
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_on_caspa') {
        const field = newSchool[name] as EditedCaspa;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
                edited_school_caspa_application_deadline_date: {
                    ...field.edited_school_caspa_application_deadline_date,
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_caspa_application_deadline_type: {
                    ...field.edited_school_caspa_application_deadline_type,
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else if (name === 'edited_school_application_submitted_directly_to_school') {
        const field = newSchool[name] as EditedDirect;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
                edited_school_application_direct_to_school_deadline: {
                    ...field.edited_school_application_direct_to_school_deadline,
                    input: null,
                    prev: null,
                    isEditMode: false,
                },
                edited_school_application_direct_to_school_fee: {
                    ...field.edited_school_application_direct_to_school_fee,
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    }
}

