import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, StringInput, NumberInput, BooleanInput, Note } from "../../../../types/schools.types";

interface EditedString {
    input: string | number | null,
    prev: string | number | null,
    isEditMode: boolean;
    link: string;
    notes: Note[] | null,
}

export const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as EditedString;
    const originalField = newSchool[original] as StringInput | NumberInput;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...newSchool[name] as object,
            input: field.input === null ? originalField.input : field.input,
            isEditMode: true,
            notes: field.notes ===  null ? originalField.notes : field.notes,
        }
    })
};

export const enableEditModeBool = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string, notes: Note[] | null};
    const originalField = newSchool[original] as BooleanInput;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...field,
            input: field.input === null ? originalField.input : field.input,
            isEditMode: true,
            notes: field.notes ===  null ? originalField.notes : field.notes,
        }
    })
}

export const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    const field = newSchool[name] as EditedString;
    const originalField = newSchool[originalName] as StringInput | NumberInput;
    const value = (e.currentTarget as HTMLButtonElement).value;
    
    if (!original) {
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...originalField,
                notes: field.notes,
            },
            [name]: {
                ...field,
                input: field.input === originalField.input ? null : field.input,
                prev: field.input === originalField.input ? null : field.input,
                isEditMode: false,
            }
        })
    } else {
        setNewSchool({
            ...newSchool,
            [original]: {
                ...originalField,
                input: field.input,
                notes: field.notes,
            },
            [name]: {
                ...field,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
            }
        })
    }
    
};

export const confirmEditBool = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string, notes: Note[] | null};
    const originalField = newSchool[originalName] as BooleanInput;
    const value = (e.currentTarget as HTMLButtonElement).value === 'true' ? true : false;
    if (!original) {
        setNewSchool({
            ...newSchool,
            [originalName]: {
                ...newSchool[original as keyof School] as BooleanInput,
                notes: field.notes,
            },
            [name]: {
                ...newSchool[name as keyof School] as object,
                input: field.input === originalField.input ? null : field.input,
                prev: field.input === originalField.input ? null : value,
                isEditMode: false,
            }
        })
    } else {
        setNewSchool({
            ...newSchool,
            [original]: {
                ...newSchool[original as keyof School] as BooleanInput,
                input: field.input,
                notes: field.notes,
            },
            [name]: {
                ...newSchool[name] as object,
                input: null,
                prev: null,
                isEditMode: false,
                link: '',
                notes: null,
            }
        })
    }
}

export const undoEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as EditedString;
    const originalField = newSchool[original] as StringInput | NumberInput;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...newSchool[name as keyof School] as object,
            input: field.input === originalField.input ? null : field.prev,
            prev: null,
            isEditMode: false,
        }
    })
}

export const undoEditBool = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
    const originalField = newSchool[original] as BooleanInput;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...newSchool[name as keyof School] as object,
            input: field.input === originalField.input ? null : field.prev,
            prev: null,
            isEditMode: false,
        }
    })
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
            notes: null,
        }
    })
};

export const revertEditBool = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    setNewSchool({
        ...newSchool,
        [name]: {
            input: null,
            prev: null,
            isEditMode: false,
            link: '',
            notes: null,
        }
    })
};