import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, Note } from "../../../../types/schools.types";

interface PreviousCycle {
    input: number;
    school_average_pa_shadowing_hours_accepted_previous_cycle_notes: Note[]
}

interface Recommended {
    input: boolean;
    school_minimum_pa_shadowing_hours_recommended: number | null;
    school_minimum_pa_shadowing_hours_recommended_notes: Note[];
}

interface Required {
    input: boolean;
    school_minimum_pa_shadowing_hours_required: number | null;
    school_minimum_pa_shadowing_hours_required_notes: Note[];
}

interface EditRequired {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    edited_school_minimum_pa_shadowing_hours_required: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
}

interface EditRecommended {
    input: boolean | null;
    prev: boolean | null;
    isEditMode: boolean;
    link: string;
    edited_school_minimum_pa_shadowing_hours_recommended: {
        input: number | null;
        prev: number | null;
        isEditMode: boolean;
    }
}


export const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
    const originalField = newSchool[original] as PreviousCycle
    setNewSchool({
        ...newSchool,
        [name]: {
            ...field,
            input: field.input === null ? originalField.input : field.input,
            isEditMode: true,
        }
    })
};

export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    if (name === 'edited_school_pa_shadowing_required') {
        const field = newSchool[name] as EditRequired;
        const originalField = newSchool[original] as Required;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true,
                edited_school_minimum_pa_shadowing_hours_required: {
                    ...field.edited_school_minimum_pa_shadowing_hours_required,
                    input: field.edited_school_minimum_pa_shadowing_hours_required.input === null ? originalField.school_minimum_pa_shadowing_hours_required : field.edited_school_minimum_pa_shadowing_hours_required.input,
                    isEditMode: true,
                }
            }
        })
    } else {
        const field = newSchool[name] as EditRecommended;
        const originalField = newSchool[original] as Recommended;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                input: field.input === null ? originalField.input : field.input,
                isEditMode: true,
                edited_school_minimum_pa_shadowing_hours_recommended: {
                    ...field.edited_school_minimum_pa_shadowing_hours_recommended,
                    input: field.edited_school_minimum_pa_shadowing_hours_recommended.input === null ? originalField.school_minimum_pa_shadowing_hours_recommended : field.edited_school_minimum_pa_shadowing_hours_recommended.input,
                    isEditMode: true,
                }
            }
        })
    }
}

export const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
    const originalField = newSchool[originalName] as PreviousCycle;
    if (!original) {
        setNewSchool({
            ...newSchool,
            [name]: {
                ...newSchool[name as keyof School] as object,
                input: field.input === originalField.input ? null : field.input,
                prev: field.input === originalField.input ? null : field.input,
                isEditMode: false,
            }
        })
    } else {
        setNewSchool({
            ...newSchool,
            [original]: {
                ...newSchool[original as keyof School] as PreviousCycle,
                input: field.input === null ? originalField.input : field.input,
            },
            [name]: {
                ...newSchool[name] as object,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
            }
        })
    }
};

export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();

    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    // const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
    // const originalField = newSchool[originalName] as PreviousCycle;
    if (!original) {
        if (name === 'edited_school_pa_shadowing_required') {
            const field = newSchool[name] as EditRequired;
            const originalField = newSchool[originalName] as Required;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input:field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false,
                    edited_school_minimum_pa_shadowing_hours_required: {
                        input: field.edited_school_minimum_pa_shadowing_hours_required.input === originalField.school_minimum_pa_shadowing_hours_required ? null : field.edited_school_minimum_pa_shadowing_hours_required.input,
                        prev: field.edited_school_minimum_pa_shadowing_hours_required.input === originalField.school_minimum_pa_shadowing_hours_required ? null : field.edited_school_minimum_pa_shadowing_hours_required.input,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_pa_shadowing_recommended') {
            const field = newSchool[name] as EditRecommended;
            const originalField = newSchool[originalName] as Recommended;
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    input:field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    isEditMode: false,
                    edited_school_minimum_pa_shadowing_hours_recommended: {
                        input: field.edited_school_minimum_pa_shadowing_hours_recommended.input === originalField.school_minimum_pa_shadowing_hours_recommended ? null : field.edited_school_minimum_pa_shadowing_hours_recommended.input,
                        prev: field.edited_school_minimum_pa_shadowing_hours_recommended.input === originalField.school_minimum_pa_shadowing_hours_recommended ? null : field.edited_school_minimum_pa_shadowing_hours_recommended.input,
                        isEditMode: false,
                    }
                }
            })
        }
    } else {

        if (name === 'edited_school_pa_shadowing_required') {
            const field = newSchool[name] as EditRequired;
            const originalField = newSchool[originalName] as Required;
            setNewSchool({
                ...newSchool,
                [originalName]: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_minimum_pa_shadowing_hours_required: field.edited_school_minimum_pa_shadowing_hours_required.input === null ? originalField.school_minimum_pa_shadowing_hours_required : field.edited_school_minimum_pa_shadowing_hours_required.input,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    edited_school_minimum_pa_shadowing_hours_required: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        } else if (name === 'edited_school_pa_shadowing_recommended') {
            const field = newSchool[name] as EditRecommended;
            const originalField = newSchool[originalName] as Recommended;
            setNewSchool({
                ...newSchool,
                [originalName]: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_minimum_pa_shadowing_hours_recommended: field.edited_school_minimum_pa_shadowing_hours_recommended.input === null ? originalField.school_minimum_pa_shadowing_hours_recommended : field.edited_school_minimum_pa_shadowing_hours_recommended.input,
                },
                [name]: {
                    ...field,
                    input: null,
                    prev: null,
                    isEditMode: false,
                    link: '',
                    edited_school_minimum_pa_shadowing_hours_recommended: {
                        input: null,
                        prev: null,
                        isEditMode: false,
                    }
                }
            })
        }
    }

}

export const undoEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const field = newSchool[name] as {input: number | null, prev: number | null, isEditMode: boolean, link: string};
    setNewSchool({
        ...newSchool,
        [name]: {
            ...newSchool[name as keyof School] as object,
            input: field.prev,
            prev: null,
            isEditMode: false,
        }
    })
};

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_pa_shadowing_required') {
        const field = newSchool[name] as EditRequired;
        setNewSchool({
            ...newSchool,
            edited_school_pa_shadowing_required: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_minimum_pa_shadowing_hours_required: {
                    ...field.edited_school_minimum_pa_shadowing_hours_required,
                    input: field.edited_school_minimum_pa_shadowing_hours_required.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    } else {
        const field = newSchool[name] as EditRecommended;
        setNewSchool({
            ...newSchool,
            edited_school_pa_shadowing_recommended: {
                ...field,
                input: field.prev,
                prev: null,
                isEditMode: false,
                edited_school_minimum_pa_shadowing_hours_recommended: {
                    ...field.edited_school_minimum_pa_shadowing_hours_recommended,
                    input: field.edited_school_minimum_pa_shadowing_hours_recommended.prev,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    }
}

export const revertEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    setNewSchool({
        ...newSchool,
        [name]: {
            input: null,
            prev: null,
            isEditMode: false,
            link: '',
        }
    })
};

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_pa_shadowing_required') {
        const field = newSchool[name] as EditRequired;
        setNewSchool({
            ...newSchool,
            edited_school_pa_shadowing_required: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_pa_shadowing_hours_required: {
                    input: null,
                    prev: null,
                    isEditMode: false
                }
            }
        })
    } else {
        const field = newSchool[name] as EditRecommended;
        setNewSchool({
            ...newSchool,
            edited_school_pa_shadowing_recommended: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                edited_school_minimum_pa_shadowing_hours_recommended: {
                    input: null,
                    prev: null,
                    isEditMode: false,
                }
            }
        })
    }
}

