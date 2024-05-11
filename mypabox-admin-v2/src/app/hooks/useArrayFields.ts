import { School, EditedArrInputObj, EditedField } from "../../types/schools.types";
import { Dispatch, SetStateAction, MouseEvent } from "react";

const useArrayFields = ({ newSchool, setNewSchool }: {
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
}) => {

    const addField = (e: MouseEvent<HTMLButtonElement>, isEditMode: boolean, newField: any, innerFieldName?: string) => {
        e.preventDefault();

        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const input = 'input' as keyof object;
        const field = 'fields' as keyof object;
        const fieldObj = newSchool[isEditMode ? editedName : name];


        if (innerFieldName === undefined) {
            if (isEditMode) {
                const updatedInput = (fieldObj[input] as EditedArrInputObj[]).concat({
                    ...newField,
                    isCorrect: true,
                    isNew: true,
                } as EditedArrInputObj);

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...(fieldObj as object),
                        input: updatedInput,

                    }
                })
            } else {
                if (Array.isArray(fieldObj)) {
                    const updatedInput = (fieldObj as any[]).concat(newField);
                    setNewSchool({
                        ...newSchool,
                        [editedName]: updatedInput,
                    })
                } if (fieldObj[field] !== undefined) {
                    const stringInput = Object.values(newField)[0];
                    const updatedInput = (fieldObj[field] as any[]).concat(stringInput);
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...(fieldObj as object),
                            [field]: updatedInput,
                        }
                    })
                } else {
                    const updatedInput = (fieldObj[input] as any[]).concat(newField);
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...(fieldObj as object),
                            [input]: updatedInput,
                        }
                    })
                }
            }
        } else {
            if (isEditMode) {
                const innerField = `edited_${innerFieldName}` as keyof object;
                const innerFieldObj = fieldObj[innerField] as EditedField;
                const updatedInput = (innerFieldObj[input] as EditedArrInputObj[]).concat({
                    ...newField,
                    isCorrect: true,
                    isNew: true,
                } as EditedArrInputObj);
                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...(fieldObj as object),
                        [innerField]: {
                            ...innerFieldObj,
                            input: updatedInput,
                        }
                    }
                })
            } else {
                const innerField = innerFieldName as keyof object;
                const innerFieldObj = fieldObj[innerField] as any[];
                const stringInput = Object.values(newField)[0];
                const updatedInput = innerFieldObj.concat(stringInput);
                console.log(innerField, fieldObj, innerFieldObj,updatedInput)
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...(fieldObj as object),
                        [innerField]: updatedInput, 
                    }
                })
            }
        }
    }

    const deleteField = (e: MouseEvent<HTMLButtonElement>, isEditMode: boolean, isNew: boolean, index: number, innerFieldName?: string) => {
        e.preventDefault();

        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const input = 'input' as keyof object;
        const field = 'fields' as keyof object;
        const fieldObj = newSchool[isEditMode ? editedName : name];


        if (innerFieldName === undefined) {
            if (isEditMode) {
                const updatedInput = isNew ? (fieldObj[input] as EditedArrInputObj[]).filter((n,i) => i !== index)
                    : (fieldObj[input] as EditedArrInputObj[]).map((n,i) => {
                        if (i === index) {
                            return {...n, isCorrect: false}
                        } else {
                            return {...n}
                        }
                })

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...(fieldObj as object),
                        input: updatedInput,

                    }
                })
            } else {
                
                if (Array.isArray(fieldObj)) {
                    const updatedInput = (fieldObj as any[]).filter((n,i) => i !== index);
                    setNewSchool({
                        ...newSchool,
                        [editedName]: updatedInput,
                    })
                } if (fieldObj[field] !== undefined) {
                    const updatedInput = (fieldObj[field] as any[]).filter((n,i) => i !== index);
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...(fieldObj as object),
                            [field]: updatedInput,
                        }
                    })
                } else {
                    const updatedInput = (fieldObj[input] as any[]).filter((n,i) => i !== index);
                    setNewSchool({
                        ...newSchool,
                        [name]: {
                            ...(fieldObj as object),
                            [input]: updatedInput,
                        }
                    })
                }
            }
        } else {
            if (isEditMode) {
                const innerField = `edited_${innerFieldName}` as keyof object;
                const innerFieldObj = fieldObj[innerField] as EditedField;
                const updatedInput = isNew ? (innerFieldObj[input] as EditedArrInputObj[]).filter((n,i) => i !== index)
                    : (fieldObj[input] as EditedArrInputObj[]).map((n,i) => {
                        if (i === index) {
                            return {...n, isCorrect: false}
                        } else {
                            return {...n}
                        }
                })

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...(fieldObj as object),
                        [innerField]: {
                            ...innerFieldObj,
                            input: updatedInput,
                        }
                    }
                })
            } else {
                const innerField = innerFieldName as keyof object;
                const innerFieldObj = fieldObj[innerField] as any[];

                const updatedInput = (innerFieldObj as any[]).filter((n,i) => i !== index);
                setNewSchool({
                    ...newSchool,
                    [name]: {
                        ...(fieldObj as object),
                        [innerField]: updatedInput, 
                    }
                })
            }
        }
    }


    const undoDeleteField = (e: MouseEvent<HTMLButtonElement>, index: number, innerFieldName?: string) => {
        e.preventDefault();

        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof School;
        const input = 'input' as keyof object;
        const fieldObj = newSchool[editedName];


        if (innerFieldName === undefined) {

                const updatedInput = (fieldObj[input] as EditedArrInputObj[]).map((n,i) => {
                        if (i === index) {
                            return {...n, isCorrect: true}
                        } else {
                            return {...n}
                        }
                })

                setNewSchool({
                    ...newSchool,
                    [editedName]: {
                        ...(fieldObj as object),
                        input: updatedInput,

                    }
                })
            
        } else {

            const innerField = `edited_${innerFieldName}` as keyof object;
            const innerFieldObj = fieldObj[innerField] as EditedField;
            const updatedInput = (fieldObj[input] as EditedArrInputObj[]).map((n,i) => {
                    if (i === index) {
                        return {...n, isCorrect: true}
                    } else {
                        return {...n}
                    }
            })

            setNewSchool({
                ...newSchool,
                [editedName]: {
                    ...(fieldObj as object),
                    [innerField]: {
                        ...innerFieldObj,
                        input: updatedInput,
                    }
                }
            })
            
        }
    }

    return {
        addField,
        deleteField,
        undoDeleteField
    }

}

export default useArrayFields;