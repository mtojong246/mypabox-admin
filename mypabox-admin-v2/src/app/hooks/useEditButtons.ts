import { School, EditedField, OriginalField } from "../../types/schools.types";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { UserObject } from "../../types/users.types";

const isEditFieldType = (obj: any): obj is EditedField => {
    if (obj.isEditMode !== undefined) {
        return true;
    } else {
        return false;
    }
}

const input = 'input' as keyof object;
const notes = 'notes' as keyof object;

const useEditButtons = ({ newSchool, setNewSchool, loggedInUser }: { 
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
 }) => {


    const getField = (name: string) => {
        return newSchool[name as keyof School];
    }

    const getInput = (field: any, innerFieldName?: string) => {
        const input = 'input' as keyof object;
        if (isEditFieldType(field)) {

            if (innerFieldName !== undefined) {
                return field[innerFieldName as keyof object][input];
            } else {
                return field[input]
            }
        } else {
            if (field[input] !== undefined) {
                return field[input]
            } else if (innerFieldName !== undefined) {
                return field[innerFieldName as keyof object][input];
            } else {
                return field;
            }
        }
    }

    const getPrev = (field: any, innerFieldName?: string) => {
        const prev = 'prev' as keyof object;
        if (innerFieldName !== undefined) {
            return field[innerFieldName as keyof object][prev];
        } else {
            return field[prev]
        }
    }

    const getNotes = (field:any, innerFieldName?: string, innerNoteFieldName?: string) => {
        const notes = 'notes' as keyof object;
        if (innerFieldName !== undefined) {
            if (field[innerFieldName as keyof object][notes] === undefined) {
                return undefined;
            } else {
                if (innerNoteFieldName !== undefined) {
                    return field[innerFieldName as keyof object][innerNoteFieldName as keyof object];
                } else {
                    return field[notes];
                }
            }
        } else {
            if (field[notes] === undefined) {
                return undefined;
            } else {
                if (innerNoteFieldName !== undefined) {
                    return field[innerNoteFieldName as keyof object];
                } else {
                    return field[notes];
                }
            }
        }
    }



    const enableEditObjects = (e:MouseEvent<HTMLButtonElement>, fieldNames?: string[], altNoteName?: string) => {
        e.preventDefault();
        const name = e.currentTarget.name as keyof School;
        const editedName = `edited_${name}` as keyof object;

        const originalField = getField(name) as OriginalField;
        const editedField = getField(editedName) as EditedField;

        let editedFieldObj: EditedField = {...editedField, isEditMode: true};

        if (fieldNames === undefined) {
            
            editedFieldObj[input] = editedField[input] === null ? originalField[input] : editedField[input];

            if (originalField[altNoteName ? altNoteName : notes] !== undefined) {
                editedFieldObj[notes] = editedField[notes] === null ? originalField[altNoteName ? altNoteName : notes] : editedField[notes];
            }

        } else {

            editedFieldObj = {
                ...editedField,
                isEditMode: true,
                input: true,
            }


            fieldNames.forEach(name => {

                const originalInput = originalField[name][input] === undefined ? originalField[name] : originalField[name][input];
                const editedInput = editedField[`edited_${name}`][input];             

                editedFieldObj![`edited_${name}`] = {
                    ...editedField[`edited_${name}`],
                    input: editedInput === null ? originalInput : editedInput
                }

                if (originalField[name][notes] !== undefined) {
                    const editedNotes = editedField[`edited_${name}`][notes];
                    const originalNotes = originalField[name][notes];
                    editedFieldObj![`edited_${name}`][notes] = editedNotes === null ? originalNotes : editedNotes;
                }


            });        

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

            if (fieldNames === undefined) {

                originalFieldObj[altInputName ? altInputName : input] = editedField[input] === originalField[input] ? null : editedField[input]
                

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

    const undoEditObjects = (e:MouseEvent<HTMLButtonElement>, innerFieldNames?: string[]) => {
        e.preventDefault();
        const name = `edited_${e.currentTarget.name}`;

        const editedField = getField(name) as EditedField;

        let fieldObj: EditedField = {...editedField, isEditMode: false};

        if (innerFieldNames === undefined) {
            fieldObj[input] = editedField['prev'];
            fieldObj['prev'] = null;
        } else {
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