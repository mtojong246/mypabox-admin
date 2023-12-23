import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, StringInput, NumberInput, BooleanInput } from "../../../../types/schools.types";


export const enableEditMode = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...newSchool[name] as object,
            isEditMode: true,
        }
    })
};

export const enableEditModeBool = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const original = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
    const originalField = newSchool[original] as BooleanInput;
    setNewSchool({
        ...newSchool,
        [name]: {
            ...field,
            input: field.input === null ? originalField.input : field.input,
            isEditMode: true,
        }
    })
}

export const confirmEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    
    if (!original) {
        setNewSchool({
            ...newSchool,
            [name]: {
                ...newSchool[name] as object,
                prev: (e.currentTarget as HTMLButtonElement).value,
                isEditMode: false,
                link: '',
            }
        })
    } else {
        setNewSchool({
            ...newSchool,
            [original]: {
                ...newSchool[original as keyof School] as StringInput | NumberInput,
                input: (e.currentTarget as HTMLButtonElement).value,
            },
            [name]: {
                ...newSchool[name] as object,
                input: '',
                prev: '',
                isEditMode: false,
                link: '',
            }
        })
    }
    
};

export const confirmEditBool = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    const originalName = e.currentTarget.name as keyof School;
    const field = newSchool[name] as {input: boolean | null, prev: boolean | null, isEditMode: boolean, link: string};
    const originalField = newSchool[originalName] as BooleanInput;
    const value = (e.currentTarget as HTMLButtonElement).value === 'true' ? true : false;
    if (!original) {
        setNewSchool({
            ...newSchool,
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
                input: value,
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
}

export const undoEdit = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    setNewSchool({
        ...newSchool,
        [name]: {
            input: (newSchool[name] as {input: string, prev: string, isEditMode: boolean, link: string}).prev,
            prev: '',
            isEditMode: false,
            link: '',
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
            input: '',
            prev: '',
            isEditMode: false,
            link: '',
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
        }
    })
};