import { EditedField, OriginalField, School, Note } from "../../../types/schools.types";
import BooleanFields from "./BooleanFields";
import InputFields from "./InputFields";
import NoteFields from "./NoteFields";
import ArrayFields from "./ArrayFields";
import Select from 'react-select';
import useInput from "../../../app/hooks/useInput";
import { Dispatch, SetStateAction, MouseEvent, useState } from "react";
import { UserObject } from "../../../types/users.types";
import useOpen from "../../../app/hooks/useOpen";
import useNotes from "../../../app/hooks/useNotes";
import useArrayFields from "../../../app/hooks/useArrayFields";
import { isDisabled } from "../../../data/functions";


const certOptions = [
    {value: 'CPR', label: 'CPR'},
    {value: 'BLS', label: 'BLS'},
    {value: 'ACLS', label: 'ACLS'},
]

export default function ConditionFields({ fieldName, inputValue, editedValue, isEdit, newSchool, setNewSchool, loggedInUser, innerFields }: { 
    fieldName: string, 
    inputValue: boolean, 
    editedValue: boolean,
    isEdit: boolean,
    newSchool: School,
    setNewSchool: Dispatch<SetStateAction<School>>,
    loggedInUser: UserObject,
    innerFields: {label: string, name: string}[]
}) {

    const [ inputText, setInputText ] = useState('');

    const {
        handleBooleanValue,
        handleStringOrNumberInput,
    } = useInput({newSchool, setNewSchool});

    const {
        addField,
        deleteField,
        undoDeleteField
    } = useArrayFields({ newSchool, setNewSchool })

    const {
        addNewNote,
        setNoteInfoObj,
        toggleNotePopup,
        deleteNoteObj
    } = useNotes({newSchool, setNewSchool})

    const {
        isOpen
    } = useOpen({ input: inputValue, editedInput: editedValue, name: fieldName, newSchool, setNewSchool, fieldNames: innerFields.map(n => n.name) });

    const getOptions = (value: string) => {
        if (value === 'school_certifications_required_options') {
            return certOptions;
        } else return [];
    }

    
    return (
        <>
                    {isOpen && (
                        <>
                        {innerFields.map(n => {
                            const { label, name } = n;
                            const field = newSchool[fieldName as keyof School] as OriginalField;
                            const editedField = newSchool[`edited_${fieldName}` as keyof School] as EditedField;
                            const input = 'input' as keyof object;
                            const notes = 'notes' as keyof object;
                            const inputVal = field[name];
                            const editedVal = editedField[`edited_${name}`][input];
                            const noteValue = field[name][notes] as Note[] | undefined;
                            const editedNoteValue = editedField[`edited_${name}`][notes] as Note[] | null;

                            return (
                                <>
                                <div className={`mt-7 relative max-w-[900px] border-2 p-4 block rounded border-[#545454]`}>
                                    <label className="absolute top-[-16px] text-xl font-medium bg-white">{label}</label> 
                                    <div className='flex justify-center items-start gap-3'>
                                    {typeof inputValue === 'string' || typeof inputVal === 'number' ? (
                                        <InputFields label={label} name={fieldName} innerFieldName={name} value={inputVal} editedValue={editedVal} handleInputChange={handleStringOrNumberInput} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                    ) : ['school_certifications_required_options'].includes(name) ? (
                                        <>
                                            <Select onChange={(e:any) => setInputText(e.value)} options={getOptions(name)} className="w-full grow focus:outline-none rounded" />
                                            <button name={fieldName} onClick={(e:MouseEvent<HTMLButtonElement>) => {addField(e, editedField.isEditMode, {name: inputText}, name); setInputText('');}} className='border rounded border-[#4573D2] text-[#4573D2] px-5 h-[50px] text-xl hover:text-white hover:bg-[#4573D2] text-nowrap'>Add Certification</button>
                                        </>
                                    ) : (
                                        <BooleanFields label={label} name={fieldName} innerFieldName={name} value={inputVal} editedValue={editedVal} handleInputChange={handleBooleanValue} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                    )}
                                    {noteValue !== undefined && (
                                        <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true)}  className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                            Add Note
                                        </button>
                                    )}
                                    </div>
                                    {['school_certifications_required_options'].includes(name) && (
                                        <ArrayFields name={fieldName} innerFieldName={name} values={field[name as keyof object]} editedValues={editedVal} deleteFunc={deleteField} undoDeleteFunc={undoDeleteField} k='name' newSchool={newSchool}/>
                                    )}
                                    {noteValue !== undefined && (
                                        <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} 
                                        newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />
                                    )}
                                </div>
                                
                                </>
                            )
                        })}     
                        </>    
                    )}
        </>
    )
}