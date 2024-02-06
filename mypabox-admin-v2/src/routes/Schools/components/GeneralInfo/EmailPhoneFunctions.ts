import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School } from "../../../../types/schools.types";


export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_phone_number') {
        const field = newSchool.edited_school_phone_number;
        const originalField = newSchool.school_phone_number;
        setNewSchool({
            ...newSchool,
            edited_school_phone_number: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.input.map(inp => ({
                    category: inp.category,
                    number: inp.number,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
                notes: field.notes === null ? originalField.notes : field.notes,
            }
        })
    } else if (name === 'edited_school_email') {
        const field = newSchool.edited_school_email;
        const originalField = newSchool.school_email;
        setNewSchool({
            ...newSchool,
            edited_school_email: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.input.map(inp => ({
                    category: inp.category,
                    email: inp.email,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
                notes: field.notes === null ? originalField.notes : field.notes,
            }
        })
    } else if (name === 'edited_school_type_of_degree_offered') {
        const field = newSchool.edited_school_type_of_degree_offered;
        const originalField = newSchool.school_type_of_degree_offered;
        setNewSchool({
            ...newSchool,
            edited_school_type_of_degree_offered: {
                ...newSchool.edited_school_type_of_degree_offered,
                isEditMode: true,
                input: field.input === null ? originalField.fields.map(inp => ({
                    name: inp,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    }
}

export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();;
    if (!original) {
        const name = `edited_${e.currentTarget.name}` as keyof School;
        if (name === 'edited_school_phone_number') {
            const field = newSchool.edited_school_phone_number;
            setNewSchool({
                ...newSchool,
                school_phone_number: {
                    ...newSchool.school_phone_number,
                    notes: field.notes ? field.notes : newSchool.school_phone_number.notes,
                },
                edited_school_phone_number: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        } else if (name === 'edited_school_email') {
            const field = newSchool.edited_school_email;
            setNewSchool({
                ...newSchool,
                school_email: {
                    ...newSchool.school_email,
                    notes: field.notes ? field.notes : newSchool.school_email.notes,
                },
                edited_school_email: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        } else if (name === 'edited_school_type_of_degree_offered') {
            const field = newSchool.edited_school_type_of_degree_offered;
            setNewSchool({
                ...newSchool,
                edited_school_type_of_degree_offered: {
                    ...newSchool.edited_school_type_of_degree_offered,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        }
    } else {
        const name = `edited_${e.currentTarget.name}` as keyof School;
        if (name === 'edited_school_phone_number') {
            const field = newSchool.edited_school_phone_number;
            const originalField = newSchool.school_phone_number;
            const correctList = field.input!.filter(opt => opt.isCorrect);
            setNewSchool({
                ...newSchool,
                school_phone_number: {
                    ...originalField,
                    input: field.input ?  correctList.map(list => ({
                        category: list.category,
                        number: list.number
                    })) : originalField.input,
                    notes: field.notes === null ? originalField.notes : field.notes,
                },
                edited_school_phone_number: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                    notes: null,
                }
            })
        } else if (name === 'edited_school_email') {
            const field = newSchool.edited_school_email;
            const originalField = newSchool.school_email;
            const correctList = field.input!.filter(opt => opt.isCorrect);
            setNewSchool({
                ...newSchool,
                school_email: {
                    ...originalField,
                    input: field.input ? correctList.map(list => ({
                        category: list.category,
                        email: list.email,
                    })) : originalField.input,
                    notes: field.notes === null ? originalField.notes : field.notes,
                },
                edited_school_email: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                    notes: null,
                }
            })
        } else if (name === 'edited_school_type_of_degree_offered') {
            const field = newSchool.edited_school_type_of_degree_offered;
            const originalField = newSchool.school_type_of_degree_offered;
            const correctList = field.input!.filter(opt => opt.isCorrect);
            setNewSchool({
                ...newSchool,
                school_type_of_degree_offered: {
                    ...originalField,
                    fields: correctList ? correctList.map(list => list.name) : originalField.fields,
                },
                edited_school_type_of_degree_offered: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                }
            })
        }
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_phone_number') {
        const field = newSchool.edited_school_phone_number;
        setNewSchool({
            ...newSchool,
            edited_school_phone_number: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_email') {
        const field = newSchool.edited_school_email;
        setNewSchool({
            ...newSchool,
            edited_school_email: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_type_of_degree_offered') {
        const field = newSchool.edited_school_type_of_degree_offered;
        setNewSchool({
            ...newSchool,
            edited_school_type_of_degree_offered: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    }
}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_phone_number') {
        setNewSchool({
            ...newSchool,
            edited_school_phone_number: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
                notes: null,
            }
        })
    } else if (name === 'edited_school_email') {
        setNewSchool({
            ...newSchool,
            edited_school_email: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
                notes: null,
            }
        })
    } else if (name === 'edited_school_type_of_degree_offered') {
        setNewSchool({
            ...newSchool,
            edited_school_type_of_degree_offered: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    }
}

