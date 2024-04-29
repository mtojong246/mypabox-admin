import { EditedField, School } from "../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const useInput = ({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
 }) => {

    const handleStringOrNumberInput = (e: ChangeEvent<HTMLInputElement>,  isEditMode: boolean, innerFieldName?: string) => {
        const name = e.target.name as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const value = e.target.value;

        if (innerFieldName === undefined) {
            setNewSchool({
                ...newSchool, 
                [isEditMode ? editedName : name] : {
                    ...field,
                    input: typeof value === 'string' ? value : Number(value),
                }})
        } else {
            if (isEditMode) {
                const editedInnerField = `edited_${innerFieldName}` as keyof object;
                const editedInnerObj = field[editedInnerField] as object;

                setNewSchool({
                    ...newSchool, 
                    [editedName]: {
                        ...field, 
                        [editedInnerField]: {...editedInnerObj, input: typeof value === 'string' ? value : Number(value)}
                    }})
            } else {
                if (typeof field[innerFieldName as keyof object] === ('string' || 'number')) {
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: typeof value === 'string' ? value : Number(value),
                        }
                    })
                } else {
                    const innerObj = field[innerFieldName as keyof object] as object;
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: {
                                ...innerObj,
                                input: typeof value === 'string' ? value : Number(value),
                            }
                        }
                    })
                }
            }
        }
    };

    const handleBooleanValue = (e: ChangeEvent<HTMLInputElement>, isEditMode: boolean, innerFieldName?: string) => {
        const name = e.target.name as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const value = e.target.checked;

        if (innerFieldName === undefined) {
            setNewSchool({
                ...newSchool, 
                [isEditMode ? editedName : name] : {
                    ...field,
                    input: value,
                }})
        } else {
            if (isEditMode) {
                const editedInnerField = `edited_${innerFieldName}` as keyof object;
                const editedInnerObj = field[editedInnerField] as object;

                setNewSchool({
                    ...newSchool, 
                    [editedName]: {
                        ...field, 
                        [editedInnerField]: {...editedInnerObj, input: value}
                    }})
            } else {
                if (typeof field[innerFieldName as keyof object] === 'boolean') {
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: value,
                        }
                    })
                } else {
                    const innerObj = field[innerFieldName as keyof object] as object;
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: {
                                ...innerObj,
                                input: value,
                            }
                        }
                    })
                }
            }
        }
    }

    const handleSelectInput = (e: any, fieldName: string, isEditMode: boolean, innerFieldName?: string) => {
        const name = fieldName as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const field = newSchool[isEditMode ? editedName : name] as object;
        const value = e.value;

        if (innerFieldName === undefined) {
            setNewSchool({
                ...newSchool, 
                [isEditMode ? editedName : name] : {
                    ...field,
                    input: value,
                }})
        } else {
            if (isEditMode) {
                const editedInnerField = `edited_${innerFieldName}` as keyof object;
                const editedInnerObj = field[editedInnerField] as object;

                setNewSchool({
                    ...newSchool, 
                    [editedName]: {
                        ...field, 
                        [editedInnerField]: {...editedInnerObj, input: value}
                    }})
            } else {
                if (typeof field[innerFieldName as keyof object] === 'string') {
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: value,
                        }
                    })
                } else {
                    const innerObj = field[innerFieldName as keyof object] as object;
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...field,
                            [innerFieldName]: {
                                ...innerObj,
                                input: value,
                            }
                        }
                    })
                }
            }
        }
    }

    const handleQuill = (e:any, name: string) => {
        const fieldName = name as keyof School;

        setNewSchool({
            ...newSchool,
            [fieldName]: e,
        })
    };
    

    return {
        handleStringOrNumberInput,
        handleBooleanValue,
        handleSelectInput,
        handleQuill
    }

}

export default useInput;