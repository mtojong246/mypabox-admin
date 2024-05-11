import { School, EditedField, OriginalField, EditedArrInputObj } from "../../types/schools.types";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { UserObject } from "../../types/users.types";

import { simpleArrays, simpleConditionalNestedObjects, simpleInputs, simpleNestedObjects } from "../../data/defaultValues";


const input = 'input' as keyof object;
const notes = 'notes' as keyof object;
const field = 'fields' as keyof object;

const useEditButtons = ({ newSchool, setNewSchool, loggedInUser }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
 }) => {


    const getField = (name: string) => {
        return newSchool[name as keyof School];
    }

    

    const enableEditObjects = (e:MouseEvent<HTMLButtonElement>, fieldNames?: string[], altInputName?: string, altNoteName?: string) => {
        e.preventDefault();
        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof object;

        const originalField = getField(name) as OriginalField;
        const editedField = getField(editedName) as EditedField;


        let editedFieldObj: EditedField = {...editedField, isEditMode: true};

        if (simpleInputs.includes(name)) {
            const originalInput = originalField[altInputName ? altInputName : input];

            if (altInputName) {
                editedFieldObj[input] = true;
                const obj = editedField[`edited_${altInputName}`] as object;
                const editedInput = obj[input];
                editedFieldObj[`edited_${altInputName}`] = {
                    ...obj, 
                    input: editedInput === null ? originalInput : editedInput
                }
            } else {
                const editedInput = editedField[input];
                editedFieldObj[input] = editedInput === null ? originalInput : editedInput
            }

            if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                const editedNotes = editedField[notes];
                const originalNotes = originalField[altNoteName ? altNoteName : notes]
                editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
            }

        } else if (simpleArrays.includes(name)) {
            const originalInput = originalField[input].map((inp: object) => ({...inp, isCorrect: true, isNew: false}))
            const editedInput = editedField[input];
            editedFieldObj[input] = editedInput === null ? originalInput : editedInput
        
            if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                const editedNotes = editedField[notes];
                const originalNotes = originalField[altNoteName ? altNoteName : notes]
                editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
            }
        } else if (simpleNestedObjects.includes(name) && fieldNames !== undefined) {
            editedFieldObj[input] = true;
            fieldNames.forEach(n => {
                const originalInput = originalField[n][input] === undefined ? originalField[n] : originalField[n][input];
                const obj = editedField[`edited_${n}`]
                const editedInput = [obj][input];
                editedFieldObj[`edited_${n}`] = {
                    ...obj,
                    input: editedInput === null ? originalInput : editedInput
                }

                if (originalField[n][notes] !== undefined) {
                    const originalNotes = originalField[n][notes];
                    const editedNotes = editedField[`edited_${n}`][notes];
                    editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                }
            })

            if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                const editedNotes = editedField[notes];
                const originalNotes = originalField[altNoteName ? altNoteName : notes];
                editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
            }
        } else if (simpleConditionalNestedObjects.includes(name) && fieldNames)  {
            editedFieldObj[input] = editedField[input] === null ? originalField[input] : editedField[input] === null;
            fieldNames.forEach(n => {
                const obj = editedField[`edited_${n}`]
                const editedInput = [obj][input];
                if (!Array.isArray(editedInput)) {
                    const originalInput = originalField[n][input] === undefined ? originalField[n] : originalField[n][input];
                    editedFieldObj[`edited_${n}`] = {
                        ...obj,
                        input: editedInput === null ? originalInput : editedInput
                    }
    
                    if (originalField[n][notes] !== undefined) {
                        const originalNotes = originalField[n][notes];
                        const editedNotes = editedField[`edited_${n}`][notes];
                        editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                    }

                } else {
                    const originalInput = originalField[n] === null ? null : originalField[n].map((inp: object) => ({...inp, isCorrect: true, isNew: false}));
                    editedFieldObj[`edited_${n}`] = {
                        ...obj,
                        input: editedInput === null ? originalInput : editedInput
                    }
    
                    if (originalField[n][notes] !== undefined) {
                        const originalNotes = originalField[n][notes];
                        const editedNotes = editedField[`edited_${n}`][notes];
                        editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                    }
                }
            })
        }

        setNewSchool({...newSchool, [editedName]: editedFieldObj});
    }



    const confirmEditObjects = (e:MouseEvent<HTMLButtonElement>, fieldNames?: string[], altInputName?: string, altNoteName?: string) => {
        e.preventDefault();
        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof object;

        const originalField = getField(name) as OriginalField;
        const editedField = getField(editedName) as EditedField;

        let editedFieldObj: EditedField = {...editedField, isEditMode: false};
        let originalFieldObj: OriginalField = {...originalField};

        if (loggedInUser.permissions.canVerify) {

            editedFieldObj[input] = null;
            editedFieldObj['prev'] = null;
            editedFieldObj['link'] = '';

            if (simpleInputs.includes(name)) {
    
                if (altInputName) {
                    const originalInput = originalField[altInputName];
                    const editedInput = editedField[`edited_${altInputName}`][input];
                    originalFieldObj[altInputName] = editedInput === originalInput ? null : editedInput;
                    editedFieldObj[`edited_${altInputName}`] = {input: null, prev: null};
                } else {
                    const originalInput = originalField[input];
                    const editedInput = editedField[input];
                    originalFieldObj[input] = editedInput === originalInput ? null : editedInput;
                }
    
                if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                    const editedNotes = editedField[notes];
                    const originalNotes = originalField[altNoteName ? altNoteName : notes]
                    editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
                }
    
            } else if (simpleArrays.includes(name)) {
                const originalInput = originalField[input].map((inp: object) => ({...inp, isCorrect: true, isNew: false}))
                const editedInput = editedField[input];
                editedFieldObj[input] = editedInput === null ? originalInput : editedInput
            
                if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                    const editedNotes = editedField[notes];
                    const originalNotes = originalField[altNoteName ? altNoteName : notes]
                    editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
                }
            } else if (simpleNestedObjects.includes(name) && fieldNames !== undefined) {
                editedFieldObj[input] = true;
                fieldNames.forEach(n => {
                    const originalInput = originalField[n][input] === undefined ? originalField[n] : originalField[n][input];
                    const obj = editedField[`edited_${n}`]
                    const editedInput = [obj][input];
                    editedFieldObj[`edited_${n}`] = {
                        ...obj,
                        input: editedInput === null ? originalInput : editedInput
                    }
    
                    if (originalField[n][notes] !== undefined) {
                        const originalNotes = originalField[n][notes];
                        const editedNotes = editedField[`edited_${n}`][notes];
                        editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                    }
                })
    
                if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                    const editedNotes = editedField[notes];
                    const originalNotes = originalField[altNoteName ? altNoteName : notes];
                    editedFieldObj[notes] = editedNotes === null ? originalNotes : editedNotes
                }
            } else if (simpleConditionalNestedObjects.includes(name) && fieldNames)  {
                editedFieldObj[input] = editedField[input] === null ? originalField[input] : editedField[input] === null;
                fieldNames.forEach(n => {
                    const obj = editedField[`edited_${n}`]
                    const editedInput = [obj][input];
                    if (!Array.isArray(editedInput)) {
                        const originalInput = originalField[n][input] === undefined ? originalField[n] : originalField[n][input];
                        editedFieldObj[`edited_${n}`] = {
                            ...obj,
                            input: editedInput === null ? originalInput : editedInput
                        }
        
                        if (originalField[n][notes] !== undefined) {
                            const originalNotes = originalField[n][notes];
                            const editedNotes = editedField[`edited_${n}`][notes];
                            editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                        }
    
                    } else {
                        const originalInput = originalField[n] === null ? null : originalField[n].map((inp: object) => ({...inp, isCorrect: true, isNew: false}));
                        editedFieldObj[`edited_${n}`] = {
                            ...obj,
                            input: editedInput === null ? originalInput : editedInput
                        }
        
                        if (originalField[n][notes] !== undefined) {
                            const originalNotes = originalField[n][notes];
                            const editedNotes = editedField[`edited_${n}`][notes];
                            editedFieldObj[`edited_${n}`][notes] = editedNotes === null ? originalNotes : editedNotes
                        }
                    }
                })
            }

            if (fieldNames === undefined) {

                let originalFieldInput: any = '';
                if (originalField[field] !== undefined) {
                    originalFieldInput = originalField[field]
                } else {
                    originalFieldInput = originalField[altInputName ? altInputName : input];
                }

                if (Array.isArray(originalFieldInput)) {
                    const correctList = (editedField[input] as EditedArrInputObj[]).filter(inp => inp.isCorrect);
                    let editedFieldInput:any[] = [];
                    correctList.forEach(l => {
                        let obj:any = {};
                        Object.keys(l).forEach(key => {
                            if (key !== 'isCorrect' && key !== 'isNew') {
                                obj[key] = l[key];
                            }
                        })
                        editedFieldInput.push(obj);
                    })
                    if (originalField[field] !== undefined) {
                        originalFieldObj[field] = editedFieldInput;
                    } else {
                        originalFieldObj[altInputName ? altInputName : input] = editedFieldInput;
                    }
                } else {
                    originalFieldObj[altInputName ? altInputName : input] = editedField[input] === originalField[altInputName ? altInputName : input] ? null : editedField[input]
                }


                if (altInputName) {
                    editedFieldObj[`edited_${altInputName}`] = {input: null, prev: null};
                }

                if (editedField[notes] !== undefined) {
                    originalFieldObj[altNoteName ? altNoteName : notes] = editedField[notes] === null ? originalField[altNoteName ? altNoteName : notes] : editedField[notes];
                }

            } else {
                

                if (originalField[input] !== undefined) {
                    originalFieldObj[input] = editedField[input] === null ? originalField[input] : editedField[input];
                }

                if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                    originalFieldObj[altNoteName ? altNoteName : notes] = editedField[notes] === null ? originalFieldObj[altNoteName ? altNoteName : notes] : editedField[notes]
                }

                fieldNames.forEach(name => {

                    editedFieldObj[`edited_${name}`][input] = null;
                    editedFieldObj[`edited_${name}`]['prev'] = null;

                    const originalInput = originalField[name][input] === undefined ? originalField[name] : originalField[name][input];
                    const editedInput = editedField[`edited_${name}`][input];                       
                    
                    if (editedField[`edited_${name}`][notes] !== undefined && originalInput === null && editedInput !== null) {
                        originalFieldObj[name] = { 
                            input: editedInput, 
                            notes: editedField[`edited_${name}`][notes] === null ? [] : editedField[`edited_${name}`][notes] 
                        }
                    } else if (editedField[`edited_${name}`][notes] !== undefined && originalInput !== null) {
                        originalFieldObj[name] = { 
                            input: editedInput === null ? originalInput : editedInput,
                            notes: editedField[`edited_${name}`][notes] === null ? originalField[name][notes] : editedField[`edited_${name}`][notes]
                        }
                    } else {
                        originalFieldObj[name] = editedInput === null ? originalInput : editedInput;
                    }
    
                });

            }
            
            setNewSchool({...newSchool, [name]: originalFieldObj, [editedName]: editedFieldObj})

        } else {

            if (fieldNames === undefined) {
                const editedInput = editedField[altInputName ? `edited_${altInputName}` : input];
                const originalInput = originalField[altInputName ? altInputName : input];
                if (!altInputName) {
                    editedFieldObj[input] = editedInput === originalInput ? null : editedInput;
                    editedFieldObj['prev'] = editedInput === originalInput ? null : editedInput;
                } else {
                    editedFieldObj[`edited_${altInputName}`] = { 
                        input: editedInput === originalInput ? null : editedInput,
                        prev: editedInput === originalInput ? null : editedInput,
                    }

                    if (editedField[`edited_${altInputName}`][input] !== null) {
                        editedFieldObj[input] = true;
                    } else {
                        editedFieldObj[input] = null;
                    }
                }
            } else {

                let editedFieldInputs = [];
                
                fieldNames.forEach(name => {
                    if (editedField[`edited_${name}`][input] !== null) {
                        editedFieldInputs.push(editedField[`edited_${name}`][input]);
                    }

                    const originalInput = originalField[name][input] === undefined ? originalField[name] : originalField[name][input];
                    const editedInput = editedField[`edited_${name}`][input]; 

                    if (originalInput !== null) {
                        editedFieldObj[`edited_${name}`][input] = editedInput === originalInput ? null : editedInput;
                        editedFieldObj[`edited_${name}`]['prev'] = editedInput === originalInput ? null : editedInput;
                    }
                    
                })

                if (!editedFieldInputs.length) {
                    editedFieldObj[input] = null;
                } else {
                    editedFieldObj[input] = true;
                }

            }

            setNewSchool({...newSchool, [editedName]: editedFieldObj})
        }
    }

    const undoEditObjects = (e:MouseEvent<HTMLButtonElement>, altInputName?: string, innerFieldNames?: string[]) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}`;

        const editedField = getField(name) as EditedField;

        let fieldObj: EditedField = {...editedField, isEditMode: false};

        if (innerFieldNames === undefined && altInputName === undefined) {
            fieldObj[input] = editedField['prev'];
            fieldObj['prev'] = null;
        } else if (altInputName) {
            const editedInnerField = editedField[`edited_${altInputName}`];
            let obj = {
                ...editedInnerField,
                input: editedInnerField['prev'],
                prev: null,
            }
            fieldObj[input] = editedInnerField['prev'] === null ? null : true;
            fieldObj[`edited_${altInputName}`] = obj;

        } else if (innerFieldNames !== undefined) {
            let editedFieldInputs = [];

            const editedFieldNames = innerFieldNames.map(name => `edited_${name}`);
            editedFieldNames.forEach(name => {
                const editedInnerField = editedField[name];
                const editedInnerPrevInput = editedField[name]['prev'];

                let obj = {
                    ...editedInnerField,
                    input: editedInnerPrevInput,
                    prev: null,
                }

                if (editedInnerField.isEditMode !== undefined) {
                    obj.isEditMode = false;
                }

                fieldObj[name] = obj;

                if (editedInnerPrevInput !== null) {
                    editedFieldInputs.push(editedInnerPrevInput)
                }
            });

            if (!editedFieldInputs.length) {
                fieldObj[input] = null;
            } else {
                fieldObj[input] = true;
            }
        }

        setNewSchool({...newSchool, [name]: fieldObj});
    }

    const revertEditObjects = (e:MouseEvent<HTMLButtonElement>, innerFieldNames?: string[]) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}`;
        const notes = 'notes' as keyof object;

        let fieldObj: EditedField = {
            input: null,
            prev: null,
            isEditMode: false,
            link: '',
        }
        const editedField = getField(name) as EditedField;

        if (innerFieldNames) {
            innerFieldNames.forEach(name => {
                let innerObj = editedField[name]

                Object.keys(innerObj).forEach(key => {
                    innerObj[key] = null;
                })

                fieldObj[name as keyof object] = innerObj;
            })
        }

        if (editedField[notes] !== undefined) {
            fieldObj[notes] = null;
        }

        setNewSchool({...newSchool, [name]: fieldObj});

    }

    return {
        enableEditObjects,
        confirmEditObjects,
        undoEditObjects,
        revertEditObjects,
    }
    

}

export default useEditButtons;