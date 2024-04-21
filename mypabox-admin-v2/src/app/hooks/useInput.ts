import { School } from "../../types/schools.types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const useInput = ({ newSchool, setNewSchool }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
 }) => {

    const handleStringOrNumberInput = (e: ChangeEvent<HTMLInputElement>, innerFieldName?: string) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name];

        if (field) {
            if (typeof field === 'string') {
                setNewSchool({...newSchool, [name]: e.target.value})
                
            } else {
                const input = 'input' as keyof object;
                const objField = field as object;

                if (Object.keys(field).includes('input')) {

                    if (typeof field[input] === 'string') {
                        setNewSchool({...newSchool, [name]: {...objField, input: e.target.value}})
                        
                    } else if (typeof field[input] === 'number') {
                        setNewSchool({...newSchool, [name]: {...objField, input: Number(e.target.value)}})

                    } else if (innerFieldName !== undefined) {
                        const inputObject = field[input] as object; 
                        const inputFieldName = innerFieldName as keyof object;

                        setNewSchool({...newSchool, [name]: {...objField, input: {...inputObject, [inputFieldName]: e.target.value}}})

                    }
                } else if (innerFieldName !== undefined) {
                    const inputFieldName = innerFieldName as keyof object;

                    if (typeof field[inputFieldName] === 'string') {
                        setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: e.target.value}});

                    } else if (typeof field[inputFieldName] === 'number') {
                        setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: Number(e.target.value)}});
                    } else {
                        const innerInputField = field[inputFieldName] as object;

                        if (Object.keys(innerInputField).includes('input')) {
                            setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: {...innerInputField, input: e.target.value}}})
                        }
                    }
                }
            } 
        }
    };

    const handleBooleanValue = (e: ChangeEvent<HTMLInputElement>, innerFieldName?: string) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name];

        if (field) {
            if (typeof field === 'boolean') {
                setNewSchool({...newSchool, [name]: e.target.checked})
                
            } else {
                const input = 'input' as keyof object;
                const objField = field as object;

                if (Object.keys(field).includes('input')) {

                    if (typeof field[input] === 'boolean') {
                        setNewSchool({...newSchool, [name]: {...objField, input: e.target.checked}})

                    } else if (innerFieldName !== undefined) {
                        const inputObject = field[input] as object; 
                        const inputFieldName = innerFieldName as keyof object;

                        setNewSchool({...newSchool, [name]: {...objField, input: {...inputObject, [inputFieldName]: e.target.checked}}})

                    }
                } else if (innerFieldName !== undefined) {
                    const inputFieldName = innerFieldName as keyof object;

                    if (typeof field[inputFieldName] === 'boolean') {
                        setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: e.target.checked}});

                    } else {
                        const innerInputField = field[inputFieldName] as object;

                        if (Object.keys(innerInputField).includes('input')) {
                            setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: {...innerInputField, input: e.target.checked}}})
                        }
                    }
                }
            }
        }
    }

    const handleSelectInput = (e: any, innerFieldName?: string) => {
        const name = e.target.name as keyof School;
        const field = newSchool[name];

        if (field) {
            if (typeof field === 'string') {
                setNewSchool({...newSchool, [name]: e.value})
                
            } else {
                const input = 'input' as keyof object;
                const objField = field as object;

                if (Object.keys(field).includes('input')) {

                    if (typeof field[input] === 'string') {
                        setNewSchool({...newSchool, [name]: {...objField, input: e.value}})

                    } else if (innerFieldName !== undefined) {
                        const inputObject = field[input] as object; 
                        const inputFieldName = innerFieldName as keyof object;

                        setNewSchool({...newSchool, [name]: {...objField, input: {...inputObject, [inputFieldName]: e.value}}})

                    }
                } else if (innerFieldName !== undefined) {
                    const inputFieldName = innerFieldName as keyof object;

                    if (typeof field[inputFieldName] === 'string') {
                        setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: e.value}});

                    } else {
                        const innerInputField = field[inputFieldName] as object;

                        if (Object.keys(innerInputField).includes('input')) {
                            setNewSchool({...newSchool, [name]: {...objField, [inputFieldName]: {...innerInputField, input: e.value}}})
                        }
                    }
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